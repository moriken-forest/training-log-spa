const INDEX_KEY = 'local-log-index';

export function getStoredDates() {
  try {
    return JSON.parse(localStorage.getItem(INDEX_KEY)) || [];
  } catch {
    return [];
  }
}

export function getStoredLog(date) {
  const str = localStorage.getItem(`log:${date}`);
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

export function saveLog(log) {
  let dates = getStoredDates();
  if (!dates.includes(log.date)) {
    dates.push(log.date);
    dates.sort();
    localStorage.setItem(INDEX_KEY, JSON.stringify(dates));
  }
  localStorage.setItem(`log:${log.date}`, JSON.stringify(log));
}

export function deleteLog(date) {
  const dates = getStoredDates().filter(d => d !== date);
  localStorage.setItem(INDEX_KEY, JSON.stringify(dates));
  localStorage.removeItem(`log:${date}`);
}

function bench1RM(w, r) {
  return w * r / 40 + w;
}
function benchE1RM(w, r, rpe) {
  return w * (r + 10 - rpe) / 40 + w;
}
function sd1RM(w, r) {
  return w * r / 33.3 + w;
}
function sdE1RM(w, r, rpe) {
  return w * (r + 10 - rpe) / 33.3 + w;
}

export function addCalcFields(log) {
  for (const session of log.sessions || []) {
    const type = session.type || '';
    const isAccessory = type.includes('アクセサリー');
    for (const set of session.sets || []) {
      if (isAccessory) continue;
      const w = set.weight;
      const r = set.reps;
      const rpe = set.rpe;
      if (type.includes('ベンチ')) {
        set['1RM'] = Math.floor(bench1RM(w, r));
        set.e1RM = Math.floor(benchE1RM(w, r, rpe));
      } else {
        set['1RM'] = Math.floor(sd1RM(w, r));
        set.e1RM = Math.floor(sdE1RM(w, r, rpe));
      }
    }
  }
}
