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
  
  // Calculate correct relative path for components
  const parts = file.split('/');
  const depth = parts.length - 1; 
  
  let relPathToComponents = '';
  if (depth === 1) {
    relPathToComponents = '../'; // app/preview.tsx -> root/components
  } else {
    // app/(drawer)/camera.tsx -> depth 2 -> ../../components
    // app/(drawer)/(tabs)/survey.tsx -> depth 3 -> ../../../components
    relPathToComponents = '../'.repeat(depth);
  }
  
  // Replace the wrong components import
  content = content.replace(/from\s+['"](?:\.\.\/|\.\/)*components\/AnimatedPressable['"]/g, `from "${relPathToComponents}components/AnimatedPressable"`);

  fs.writeFileSync(filePath, content);
});
