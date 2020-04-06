export const BULLET_LIST = /((?:^\s*)(?:[*+-]))$/m
export const CODE = /^\s*```(\w+)?$/m
export const CODE_ALT = /^(?: {4}|\t)$/m
export const ORDERED_LIST = /((?:^\s*)(?:\d+\.))$/m
export const BLOCK_QUOTE = /^>$/m
export const H1 = /(^\s*)#$/m
export const H2 = /(^\s*)##$/m
export const H3 = /(^\s*)###$/m
export const H4 = /(^\s*)####$/m
export const H5 = /(^\s*)#####$/m
export const H6 = /(^\s*)######$/m
export const HR = /(^\s*)([*-])(?:[\t ]*\2){2,}$/m

export default {
  BULLET_LIST,
  CODE,
  ORDERED_LIST,
  BLOCK_QUOTE,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  HR,
}
