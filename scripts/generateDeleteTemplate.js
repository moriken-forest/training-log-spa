const fs = require('fs');
const path = require('path');

// Resolve paths relative to the repository root
const repoRoot = path.join(__dirname, '..');
const user = process.env.LOG_USER || 'kenta';
const indexPath = path.join(repoRoot, 'public', 'logs', user, 'index.json');
const templateDir = path.join(repoRoot, '.github', 'ISSUE_TEMPLATE');
const templatePath = path.join(templateDir, 'delete-log.yml');

// Read available log dates
let dates = [];
try {
  dates = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
} catch (e) {
  // If index.json does not exist or is invalid, leave dates empty
}

// Ensure unique dates sorted newest first
dates = Array.from(new Set(dates));
dates.sort().reverse();

// Ensure the template directory exists
if (!fs.existsSync(templateDir)) {
  fs.mkdirSync(templateDir, { recursive: true });
}

const yamlLines = [
  'name: "Delete Training Log"',
  'description: "Remove an existing training log by date"',
  'title: "Delete Training Log"',
  'labels: ["delete-training-log"]',
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
