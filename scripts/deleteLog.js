const fs = require('fs');
const path = require('path');

const payload = process.env.JSON_PAYLOAD;
if (!payload) {
  console.error('JSON_PAYLOAD env var is required');
  process.exit(1);
}

let dates = [];

let jsonString = payload.trim();
if (!jsonString.startsWith('{') && !jsonString.startsWith('[')) {
  jsonString = jsonString.replace(/```(?:json)?/gi, '').replace(/```/g, '');
  const match = jsonString.match(/\{[\s\S]*\}/);
  if (match) {
    jsonString = match[0];
  }
}

if (jsonString.startsWith('{') || jsonString.startsWith('[')) {
  try {
    const data = JSON.parse(jsonString);
    if (Array.isArray(data)) {
      dates = data;
    } else if (Array.isArray(data.dates)) {
      dates = data.dates;
    } else if (data.date) {
      dates = [data.date];
    }
  } catch (e) {
    // fallback to pattern extraction below
  }
}

if (!dates.length) {
  const matches = payload.match(/\d{4}[/-]\d{2}[/-]\d{2}/g);
  if (matches) {
    dates = Array.from(new Set(matches.map(d => d.replace(/\//g, '-'))));
  }
}

if (!dates.length) {
  console.log('no valid dates found, skipping');
  process.exit(0);
}

const repoRoot = path.join(__dirname, '..');

// extract username from issue body
let user = null;
const userMatch = payload.match(/username\s*[:=]\s*([A-Za-z0-9_-]+)/i);
if (userMatch) {
  user = userMatch[1];
} else {
  const simple = payload.trim().match(/^([A-Za-z0-9_-]+)[^\d]*(\d{4}[/-]\d{2}[/-]\d{2})/);
  if (simple) {
    user = simple[1];
  } else if (process.env.LOG_USER) {
    user = process.env.LOG_USER;
  }
}

if (!user) {
  console.log('username not found, skipping');
  process.exit(0);
}

const logDir = path.join(repoRoot, 'public', 'logs', user);
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

