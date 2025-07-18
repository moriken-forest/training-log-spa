const { execFileSync } = require('child_process');

function pad(n) {
  return n.toString().padStart(2, '0');
}

let date = new Date('2025-04-01');

for (let i = 0; i < 60; i++) {
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const isoDate = `${yyyy}-${mm}-${dd}`;
  const log = {
    date: isoDate,
    block: 'Test Block',
    week: Math.floor(i / 3) + 1,
    day: (i % 3) + 1,
    notes: '自動生成ログ',
    sessions: [
      {
        type: 'ベンチプレス（メイン）',
        lift: 'ベンチプレス',
        sets: [
          { weight: 100 + i, reps: 5, rpe: 7, comment: '' }
        ]
      },
      {
        type: 'スクワット（メイン）',
        lift: 'ハイバースクワット',
        sets: [
          { weight: 140 + i, reps: 5, rpe: 7, comment: '' }
        ]
      },
      {
        type: 'デッドリフト（メイン）',
        lift: 'デッドリフト',
        sets: [
          { weight: 180 + i, reps: 5, rpe: 7, comment: '' }
        ]
      },
      {
        type: 'アクセサリー種目',
        lift: 'アームカール',
        sets: [
          { weight: 20 + (i % 10), reps: 10, rpe: 7, comment: '' }
        ]
      }
    ]
  };

  execFileSync('node', ['scripts/updateLog.js'], {
    env: { ...process.env, JSON_PAYLOAD: JSON.stringify(log), LOG_USER: 'testuser' },
    stdio: 'inherit'
  });

  // advance date
  const step = i % 2 === 0 ? 2 : 3;
  date.setDate(date.getDate() + step);
}
