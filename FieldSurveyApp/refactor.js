const fs = require('fs');
const path = require('path');

const filesToUpdate = [
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
    console.log('Not found:', file);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  const depth = file.split('/').length - 1;
  const relPath = '../'.repeat(depth);

  // 1. Imports
  if (!content.includes('useTheme')) {
    content = content.replace(
      'import { Ionicons } from "@expo/vector-icons";',
      `import { Ionicons } from "@expo/vector-icons";\nimport { useTheme, Colors } from "${relPath}context/ThemeContext";\nimport { AnimatedPressable } from "${relPath}components/AnimatedPressable";`
    );
  }
  
  // 2. Component signature (hack for finding export default function Name() { )
  content = content.replace(/export default function ([a-zA-Z0-9_]+)\(\) \{/g, (match, p1) => {
    return `export default function ${p1}() {\n  const { colors, isDark } = useTheme();\n  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);`;
  });

  // 3. Stylesheet creation
  content = content.replace('const styles = StyleSheet.create({', 'const createStyles = (colors: Colors, isDark: boolean) => StyleSheet.create({');

  // 4. Color replacements inside styles and components
  // background colors
  content = content.replace(/#F8FAFC/g, 'colors.background');
  content = content.replace(/#047857/g, 'colors.primary');
  content = content.replace(/#FFFFFF/g, 'colors.card');
  content = content.replace(/#0F172A/g, 'colors.text');
  content = content.replace(/#1E293B/g, 'colors.text');
  content = content.replace(/#64748B/g, 'colors.textSecondary');
  content = content.replace(/#94A3B8/g, 'colors.textMuted');
  content = content.replace(/#E2E8F0/g, 'colors.border');
  content = content.replace(/#059669/g, 'colors.primaryLight');
  content = content.replace(/#ECFDF5/g, 'colors.primaryHighlight');
  content = content.replace(/#EF4444/g, 'colors.danger');

  // 5. Replace TouchableOpacity with AnimatedPressable
  content = content.replace(/<TouchableOpacity/g, '<AnimatedPressable');
  content = content.replace(/<\/TouchableOpacity>/g, '</AnimatedPressable>');
  
  // 6. Fix any React not imported if we use React.useMemo
  if (!content.includes('import React')) {
    content = 'import React from "react";\n' + content;
  }

  // 7. Fix color string literals that got replaced without quotes (since they are in JSX or Style objects)
  // For JSX like color="colors.primary", we need to fix it to color={colors.primary}
  content = content.replace(/color="colors\.([a-zA-Z0-9]+)"/g, 'color={colors.$1}');
  
  // Also backgroundColor: "colors.xxx" to backgroundColor: colors.xxx
  content = content.replace(/"colors\.([a-zA-Z0-9]+)"/g, 'colors.$1');
  
  // Fix nested conditionals like shadowOpacity: isDark ? 0.3 : 0.05
  // We can just add them properly inside the replaced component body. Wait, no I didn't replace them globally, 
  // they were hardcoded numbers. That's fine for now, we can update shadowOpacity manually if needed.

  fs.writeFileSync(filePath, content);
  console.log('Updated:', file);
});
