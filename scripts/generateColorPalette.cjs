const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const safeParser = require('postcss-safe-parser');

const themesDir = path.join(__dirname, '../src/shared/themes');
const files = fs
  .readdirSync(themesDir)
  .filter((f) => f.endsWith('.css'))
  .map((f) => path.join(themesDir, f));

let groups = {};
let currentGroup = null;

function walkNodes(nodes) {
  nodes.forEach((node) => {
    if (node.type === 'comment' && node.text.includes('@tokens')) {
      const match = node.text.match(/@tokens\s+([\w-]+)/);
      if (match) currentGroup = match[1].trim();
    }
    if (node.type === 'decl' && currentGroup) {
      if (node.prop.startsWith('--color-')) {
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

const outPath = path.join(themesDir, 'colors.generated.ts');
fs.writeFileSync(outPath, 'export const colorGroups = ' + JSON.stringify(groups, null, 2) + '\n');

console.log('Color palette generated to', outPath);
