export function parseCategory(type = '') {
  const m = type.match(/^(.*)（(.+)）$/)
  if (m) return { base: m[1], variant: m[2] }
  return { base: type, variant: null }
}
