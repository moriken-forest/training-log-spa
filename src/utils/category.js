export function parseCategory(type = '') {
  const m = type.match(/^(.*)（(.+)）$/)
  if (m) return { base: m[1], variant: m[2] }
  return { base: type, variant: null }
}

export const BASE_ORDER = [
  'スクワット',
  'ベンチプレス',
  'デッドリフト',
  'アクセサリー種目',
  'アクセサリー'
]

export const VARIANT_ORDER = ['メイン', 'サブ']

function indexOrEnd(arr, val) {
  const i = arr.indexOf(val)
  return i === -1 ? arr.length : i
}

export function compareCategories(a, b) {
  const ca = parseCategory(a)
  const cb = parseCategory(b)
  const ba = indexOrEnd(BASE_ORDER, ca.base)
  const bb = indexOrEnd(BASE_ORDER, cb.base)
  if (ba !== bb) return ba - bb
  const va = indexOrEnd(VARIANT_ORDER, ca.variant)
  const vb = indexOrEnd(VARIANT_ORDER, cb.variant)
  return va - vb
}

export function sortCategories(arr) {
  return arr.slice().sort(compareCategories)
}

export function compareBases(a, b) {
  const ia = indexOrEnd(BASE_ORDER, a)
  const ib = indexOrEnd(BASE_ORDER, b)
  return ia - ib
}

export function sortBases(arr) {
  return arr.slice().sort(compareBases)
}

export function compareVariants(a, b) {
  const ia = indexOrEnd(VARIANT_ORDER, a)
  const ib = indexOrEnd(VARIANT_ORDER, b)
  return ia - ib
}

export function sortVariants(arr) {
  return arr.slice().sort(compareVariants)
}
