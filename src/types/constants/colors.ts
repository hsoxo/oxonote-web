interface Color {
  colorEn: string
  colorZh: string
  value: string
}
export const color100: Array<Color> = require('./color.json')

export const tagColorList: Array<string> = color100.map(x => x.value)
