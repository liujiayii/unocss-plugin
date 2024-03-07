import { definePreset } from '@unocss/core'

const remRE = /(-?[\.\d]+)rem/g

export interface RemToPxOptions {
  /**
   * 1rem = n rpx
   * @default 16
   */
  baseFontSize?: number
}

export const presetRemToPx = definePreset((options: RemToPxOptions = {}) => {
  const {
    baseFontSize = 16,
  } = options

  return {
    name: '@unocss/preset-rem-to-rpx',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (typeof value === 'string' && remRE.test(value))
          i[1] = value.replace(remRE, (_, p1) => `${p1 * baseFontSize}rpx`)
      })
    },
  }
})

export default presetRemToPx