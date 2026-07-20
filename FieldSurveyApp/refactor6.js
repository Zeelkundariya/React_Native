const fs = require('fs');
const path = require('path');

const rootDir = 'C:/Users/zeelk/OneDrive/Desktop/React_Native/React_Native/FieldSurveyApp';

// 1. Move ThemeContext.tsx out of app/
const newContextDir = path.join(rootDir, 'context');
if (!fs.existsSync(newContextDir)) {
  fs.mkdirSync(newContextDir);
}

const oldPath = path.join(rootDir, 'app', 'context', 'ThemeContext.tsx');
const newPath = path.join(newContextDir, 'ThemeContext.tsx');

if (fs.existsSync(oldPath)) {
  fs.renameSync(oldPath, newPath);
  
  // also try to remove the empty app/context folder
  try {
    fs.rmdirSync(path.join(rootDir, 'app', 'context'));
  } catch(e) {}
}

// 2. Fix useNativeDriver warning in AnimatedPressable
const animatedPath = path.join(rootDir, 'components', 'AnimatedPressable.tsx');
if (fs.existsSync(animatedPath)) {
  let content = fs.readFileSync(animatedPath, 'utf8');
  if (!content.includes('import { Animated, Pressable, PressableProps, StyleProp, ViewStyle, Platform }')) {
    content = content.replace(
      'import { Animated, Pressable, PressableProps, StyleProp, ViewStyle } from \'react-native\';',
      'import { Animated, Pressable, PressableProps, StyleProp, ViewStyle, Platform } from \'react-native\';'
    );
    content = content.replace(/useNativeDriver: true/g, 'useNativeDriver: Platform.OS !== \'web\'');
    fs.writeFileSync(animatedPath, content);
  }
}

// 3. Fix all imports in app/ to point to the new context location
const filesToUpdate = [
  'app/(drawer)/(tabs)/_layout.tsx',
  'app/(drawer)/(tabs)/index.tsx',
  'app/(drawer)/(tabs)/survey.tsx',
  'app/(drawer)/(tabs)/history.tsx',
  'app/(drawer)/(tabs)/profile.tsx',
  'app/(drawer)/camera.tsx',
  'app/(drawer)/location.tsx',
  'app/(drawer)/contacts.tsx',
  'app/(drawer)/clipboard.tsx',
  'app/(drawer)/setting.tsx',
  'app/preview.tsx',
  'app/_layout.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  const parts = file.split('/');
  const depth = parts.length - 1; 
  
  let relPathToRootContext = '../'.repeat(depth);
  
  content = content.replace(/from\s+['"](?:\.\.\/|\.\/)*context\/ThemeContext['"]/g, `from "${relPathToRootContext}context/ThemeContext"`);
  
  fs.writeFileSync(filePath, content);
});
