#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Компоненты UI-kit для замены
const UI_KIT_COMPONENTS = {
  'src/shared/ui-kit/Box/Box': 'Box',
  'src/shared/ui-kit/Button/Button': 'Button',
  'src/shared/ui-kit/ButtonGroup/ButtonGroup': 'ButtonGroup',
  'src/shared/ui-kit/CalculatorButton/CalculatorButton': 'CalculatorButton',
  'src/shared/ui-kit/Card/Card': 'Card',
  'src/shared/ui-kit/Grid/Grid': 'Grid',
  'src/shared/ui-kit/Icon/Icon': 'Icon',
  'src/shared/ui-kit/IconButton/IconButton': 'IconButton',
  'src/shared/ui-kit/IconButton': 'IconButton',
  'src/shared/ui-kit/Input/Input': 'Input',
  'src/shared/ui-kit/Select/Select': 'Select',
  'src/shared/ui-kit/Select': 'Select',
  'src/shared/ui-kit/Stack/Stack': 'Stack',
  'src/shared/ui-kit/Toggle/Toggle': 'Toggle',
  'src/shared/ui-kit/Typography/Typography': 'Typography',
  'src/shared/ui-kit/utils': 'alpha, setAlpha',
};

// Типы для замены
const UI_KIT_TYPES = {
  'src/shared/ui-kit/Icon/types': 'TIconName, TIconSize',
  'src/shared/ui-kit/IconButton/IconButton': 'TIconButtonProps',
  'src/shared/ui-kit/Input/Input': 'TInputProps',
  'src/shared/ui-kit/Select/Select': 'TSelectProps, TOption',
  'src/shared/ui-kit/CalculatorButton/CalculatorButton': 'CalculatorButtonProps',
};

function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;

  // Находим все импорты из UI-kit
  const importRegex = /import\s+([^'"]*)\s+from\s+['"](src\/shared\/ui-kit\/[^'"]*)['"];?/g;
  const imports = [];
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    imports.push({
      fullMatch: match[0],
      importedItems: match[1].trim(),
      path: match[2],
    });
  }

  if (imports.length === 0) {
    return false;
  }

  // Группируем импорты по компонентам и типам
  const componentImports = [];
  const typeImports = [];
  const otherImports = [];

  imports.forEach((importItem) => {
    const path = importItem.path;
    if (UI_KIT_COMPONENTS[path]) {
      componentImports.push({
        ...importItem,
        newName: UI_KIT_COMPONENTS[path],
      });
    } else if (UI_KIT_TYPES[path]) {
      typeImports.push({
        ...importItem,
        newName: UI_KIT_TYPES[path],
      });
    } else {
      otherImports.push(importItem);
    }
  });

  // Удаляем старые импорты
  imports.forEach((importItem) => {
    content = content.replace(importItem.fullMatch, '');
  });

  // Добавляем новые импорты
  let newImports = '';

  if (componentImports.length > 0) {
    const componentNames = componentImports.map((imp) => imp.newName).join(', ');
    newImports += `import { ${componentNames} } from 'src/shared/ui-kit';\n`;
  }

  if (typeImports.length > 0) {
    const typeNames = typeImports.map((imp) => imp.newName).join(', ');
    newImports += `import type { ${typeNames} } from 'src/shared/ui-kit';\n`;
  }

  // Вставляем новые импорты после существующих импортов
  const importBlockEnd = content.indexOf('\n\n');
  if (importBlockEnd !== -1) {
    content = content.slice(0, importBlockEnd) + '\n' + newImports + content.slice(importBlockEnd);
  } else {
    content = newImports + '\n' + content;
  }

  // Очищаем лишние пустые строки
  content = content.replace(/\n\n\n+/g, '\n\n');

  fs.writeFileSync(filePath, content);
  return true;
}

// Находим все TypeScript/TSX файлы
const files = glob.sync('src/**/*.{ts,tsx}', {
  ignore: ['src/shared/ui-kit/**', 'node_modules/**', 'dist/**'],
});

let fixedFiles = 0;

files.forEach((file) => {
  try {
    if (fixImportsInFile(file)) {
      console.log(`✅ Fixed: ${file}`);
      fixedFiles++;
    }
  } catch (error) {
    console.error(`❌ Error fixing ${file}:`, error.message);
  }
});

console.log(`\n🎉 Fixed ${fixedFiles} files!`);
