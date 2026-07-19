const fs = require('fs');
const path = require('path');

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
  'app/preview.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join('C:/Users/zeelk/OneDrive/Desktop/React_Native/React_Native/FieldSurveyApp', file);
  if (!fs.existsSync(filePath)) {
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Calculate correct relative path
  // app/(drawer)/(tabs)/survey.tsx -> depth 3. Need to go up 2 times to reach app/. So ../../
  const parts = file.split('/');
  const depth = parts.length - 1; // For preview.tsx, depth=1. Need './'
  
  let relPath = '';
  if (depth === 1) {
    relPath = './';
  } else {
    // For depth 2 (app/(drawer)/camera.tsx), need '../'
    // For depth 3 (app/(drawer)/(tabs)/survey.tsx), need '../../'
    relPath = '../'.repeat(depth - 1);
  }
  
  // Replace all wrong imports with correct ones
  content = content.replace(/from\s+['"](?:\.\.\/|\.\/)*context\/ThemeContext['"]/g, `from "${relPath}context/ThemeContext"`);
  content = content.replace(/from\s+['"](?:\.\.\/|\.\/)*components\/AnimatedPressable['"]/g, `from "${relPath}components/AnimatedPressable"`);

  fs.writeFileSync(filePath, content);
});
