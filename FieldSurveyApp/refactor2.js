const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/(drawer)/(tabs)/survey.tsx',
  'app/(drawer)/clipboard.tsx',
  'app/(drawer)/contacts.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join('C:/Users/zeelk/OneDrive/Desktop/React_Native/React_Native/FieldSurveyApp', file);
  if (!fs.existsSync(filePath)) {
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/=\{colors\.\}/g, 'placeholderTextColor={colors.textMuted}');
  
  // Actually, wait, were there other attributes? 
  // Contacts and Clipboard both use Search input so it's definitely placeholderTextColor.
  // Wait, let's also fix underlayColor if any?
  content = content.replace(/underlayColor=\{colors\.\}/g, 'underlayColor={colors.border}');
  
  fs.writeFileSync(filePath, content);
});
