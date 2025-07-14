const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const safeParser = require('postcss-safe-parser');

const themesDir = path.join(__dirname, '../src/shared/themes');
const files = fs
  .readdirSync(themesDir)
  .filter((f) => f.endsWith('.css'))
  .map((f) => path.join(themesDir, f));

function extractGroupsFromFiles(files, filterProp) {
  let groups = {};
  let currentGroup = null;
  function walkNodes(nodes) {
    nodes.forEach((node) => {
      if (node.type === 'comment' && node.text.includes('@tokens')) {
        const match = node.text.match(/@tokens\s+([\w-]+)/);
        if (match) currentGroup = match[1].trim();
      }
      if (node.type === 'decl' && currentGroup) {
        if (!filterProp || node.prop.startsWith(filterProp)) {
          if (!groups[currentGroup]) groups[currentGroup] = {};
          groups[currentGroup][node.prop] = node.value;
        }
      }
      if (node.nodes) {
        walkNodes(node.nodes);
      }
    });
  }
  files.forEach((file) => {
    const css = fs.readFileSync(file, 'utf8');
    const root = postcss.parse(css, { parser: safeParser });
    walkNodes(root.nodes);
  });
  Object.keys(groups).forEach((key) => {
    if (Object.keys(groups[key]).length === 0) {
      delete groups[key];
    }
  });
  return groups;
}

const generatedDir = path.join(themesDir, 'generated');
if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir);
}

// Colors
const colorFiles = files.filter((f) => f.includes('color') || f.includes('Theme'));
const colorGroups = extractGroupsFromFiles(colorFiles, '--color-');
const colorOutPath = path.join(generatedDir, 'colors.generated.ts');
fs.writeFileSync(colorOutPath, 'export const colorGroups = ' + JSON.stringify(colorGroups, null, 2) + '\n');
console.log('Color palette generated to', colorOutPath);

// Spacing
const spacingFiles = files.filter((f) => f.includes('spacing'));
const spacingGroups = extractGroupsFromFiles(spacingFiles, '--spacing-');
const spacingOutPath = path.join(generatedDir, 'spacing.generated.ts');
fs.writeFileSync(spacingOutPath, 'export const spacingGroups = ' + JSON.stringify(spacingGroups, null, 2) + '\n');
console.log('Spacing palette generated to', spacingOutPath);

// Border Radius (from spacing.css, but with --border-radius-)
const borderRadiusGroups = extractGroupsFromFiles(spacingFiles, '--border-radius-');
const borderRadiusOutPath = path.join(generatedDir, 'borderRadius.generated.ts');
fs.writeFileSync(
  borderRadiusOutPath,
  'export const borderRadiusGroups = ' + JSON.stringify(borderRadiusGroups, null, 2) + '\n',
);
console.log('Border radius palette generated to', borderRadiusOutPath);

// Typography
const typographyFiles = files.filter((f) => f.includes('typography'));
const typographyGroups = extractGroupsFromFiles(typographyFiles, '--font-');
const typographyOutPath = path.join(generatedDir, 'typography.generated.ts');
fs.writeFileSync(
  typographyOutPath,
  'export const typographyGroups = ' + JSON.stringify(typographyGroups, null, 2) + '\n',
);
console.log('Typography palette generated to', typographyOutPath);

// Line Height (from typography.css, but with --line-height-)
const lineHeightGroups = extractGroupsFromFiles(typographyFiles, '--line-height-');
const lineHeightOutPath = path.join(generatedDir, 'lineHeight.generated.ts');
fs.writeFileSync(
  lineHeightOutPath,
  'export const lineHeightGroups = ' + JSON.stringify(lineHeightGroups, null, 2) + '\n',
);
console.log('Line height palette generated to', lineHeightOutPath);
