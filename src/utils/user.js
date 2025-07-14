export const USERS = ['demo-user', 'test-user']

export function getUser() {
  return localStorage.getItem('log-user') || import.meta.env.VITE_LOG_USER || USERS[0]
}

export function getUsers() {
  return USERS
}

export function setUser(user) {
  if (USERS.includes(user)) {
    localStorage.setItem('log-user', user)
  }
}

export function toggleUser() {
  const current = getUser()
  const idx = USERS.indexOf(current)
  const next = USERS[(idx + 1) % USERS.length]
  localStorage.setItem('log-user', next)
}
