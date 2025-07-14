export function getUser() {
  return localStorage.getItem('log-user') || import.meta.env.VITE_LOG_USER || 'demo-user'
}

export function toggleUser() {
  const current = getUser()
  const next = current === 'demo-user' ? 'test-user' : 'demo-user'
  localStorage.setItem('log-user', next)
}
