const fs = require('fs');
const path = require('path');

const payload = process.env.JSON_PAYLOAD;
if (!payload) {
  console.error('JSON_PAYLOAD env var is required');
  process.exit(1);
}

let body = payload.trim();
body = body.replace(/```(?:json)?/gi, '').replace(/```/g, '');

let username = null;
let jsonString = body;

const match = body.match(/^([A-Za-z0-9_-]+)\s*(\{[\s\S]*\})/);
if (match) {
  username = match[1];
  jsonString = match[2];
} else if (!body.startsWith('{')) {
  const m = body.match(/\{[\s\S]*\}/);
  if (m) {
    jsonString = m[0];
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

const repoRoot = path.join(__dirname, '..');
const user = username || process.env.LOG_USER || 'kenta';
const scheduleDir = path.join(repoRoot, 'public', 'schedule', user);
if (!fs.existsSync(scheduleDir)) {
  fs.mkdirSync(scheduleDir, { recursive: true });
}

const filePath = path.join(scheduleDir, 'training-schedule.json');
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

