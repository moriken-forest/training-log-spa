const fs = require('fs');
const path = require('path');

function computeBench1RM(w, r) {
  return w * r / 40 + w;
}
function computeBenchE1RM(w, r, rpe) {
  return w * (r + 10 - rpe) / 40 + w;
}
function computeSd1RM(w, r) {
  return w * r / 33.3 + w;
}
function computeSdE1RM(w, r, rpe) {
  return w * (r + 10 - rpe) / 33.3 + w;
}

function floorInt(n) {
  return Math.floor(n);
}

const payload = process.env.JSON_PAYLOAD;
if (!payload) {
  console.error('JSON_PAYLOAD env var is required');
  process.exit(1);
}

let body = payload.trim();
body = body.replace(/```(?:json)?/gi, '').replace(/```/g, '');

let username = null;
let jsonString = body;

const userJsonMatch = body.match(/^([A-Za-z0-9_-]+)\s*(\{[\s\S]*\})/);
if (userJsonMatch) {
  username = userJsonMatch[1];
  jsonString = userJsonMatch[2];
} else if (!body.startsWith('{')) {
  const match = body.match(/\{[\s\S]*\}/);
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

if (!data.date) {
  console.error('date field is required');
  process.exit(1);
}

// compute 1RM and e1RM
for (const session of data.sessions || []) {
  const type = session.type || '';
  const isAccessory = type.includes('アクセサリー');
  for (const set of session.sets || []) {
    if (isAccessory) continue;
    const w = set.weight;
    const r = set.reps;
    const rpe = set.rpe;
    if (type.includes('ベンチ')) {
      set['1RM'] = floorInt(computeBench1RM(w, r));
      set.e1RM = floorInt(computeBenchE1RM(w, r, rpe));
    } else {
      set['1RM'] = floorInt(computeSd1RM(w, r));
      set.e1RM = floorInt(computeSdE1RM(w, r, rpe));
    }
  }
}

const repoRoot = path.join(__dirname, '..');
const user = username || process.env.LOG_USER || 'kenta';
const logDir = path.join(repoRoot, 'public', 'logs', user);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const filePath = path.join(logDir, `${data.date}.json`);
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

const indexPath = path.join(logDir, 'index.json');
let index = [];
if (fs.existsSync(indexPath)) {
  index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
}
if (!index.includes(data.date)) {
  index.push(data.date);
  index.sort();
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
}
