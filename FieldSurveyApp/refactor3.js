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
  
  // Fix imports
  content = content.replace(/\.\.\/\.\.\/\.\.\/context/g, '../../context');
  content = content.replace(/\.\.\/\.\.\/\.\.\/components/g, '../../components');
  content = content.replace(/\"\.\.\/\.\.\/context/g, '"../context');
  content = content.replace(/\"\.\.\/\.\.\/components/g, '"../components');
  
  if (file === 'app/preview.tsx') {
    content = content.replace(/\"\.\.\/context/g, '"./context');
    content = content.replace(/\"\.\.\/components/g, '"./components');
  }

  // Fix activeOpacity
  content = content.replace(/activeOpacity=\{[0-9.]+\}/g, '');

  // Fix RefreshControl in contacts.tsx
  if (file === 'app/(drawer)/contacts.tsx') {
    content = content.replace(/placeholderTextColor=\{colors.textMuted\}/g, '');
  }

  fs.writeFileSync(filePath, content);
});
