const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const indexPath = path.join(repoRoot, 'public', 'logs', 'index.json');
const templatePath = path.join(repoRoot, '.github', 'ISSUE_TEMPLATE', 'delete-log.yml');

let dates = [];
if (fs.existsSync(indexPath)) {
  dates = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
}

dates.sort();

const yamlLines = [
  'name: "Delete Training Log"',
  'description: "Remove an existing training log by date"',
  'title: "Delete Training Log"',
  'labels: ["delete-log"]',
  'body:',
  '  - type: dropdown',
  '    id: dates',
  '    attributes:',
  '      label: "Select log dates to delete"',
  '      description: "Choose one or more dates"',
  '      multiple: true',
  '      options:'
];
for (const d of dates) {
  yamlLines.push(`        - ${d}`);
}
yamlLines.push('    validations:');
yamlLines.push('      required: true');

fs.writeFileSync(templatePath, yamlLines.join('\n') + '\n');
