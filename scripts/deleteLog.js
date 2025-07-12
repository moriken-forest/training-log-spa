const fs = require('fs');
const path = require('path');

const payload = process.env.JSON_PAYLOAD;
if (!payload) {
  console.error('JSON_PAYLOAD env var is required');
  process.exit(1);
}

let jsonString = payload.trim();
if (!jsonString.startsWith('{')) {
  jsonString = jsonString.replace(/```(?:json)?/gi, '').replace(/```/g, '');
  const match = jsonString.match(/\{[\s\S]*\}/);
  if (match) {
    jsonString = match[0];
  } else {
    console.error('Invalid JSON payload');
    process.exit(1);
  }
}

let data;
try {
  data = JSON.parse(jsonString);
} catch (e) {
  console.error('Invalid JSON payload');
  throw e;
}

let dates = [];
if (Array.isArray(data)) {
  dates = data;
} else if (Array.isArray(data.dates)) {
  dates = data.dates;
} else if (data.date) {
  dates = [data.date];
}

if (!dates.length) {
  console.error('date or dates field is required');
  process.exit(1);
}

const repoRoot = path.join(__dirname, '..');
const logDir = path.join(repoRoot, 'public', 'logs');
const indexPath = path.join(logDir, 'index.json');
let index = [];
if (fs.existsSync(indexPath)) {
  index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
}

for (const date of dates) {
  const filePath = path.join(logDir, `${date}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  index = index.filter((d) => d !== date);
}

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));

