/*
 * @Author: Mr.Mao
 * @Date: 2021-03-27 16:36:29
 * @LastEditTime: 2021-05-10 09:38:10
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import { computed } from '@vue/runtime-core'
/** 背景颜色钩子 */
export const useBackgroundColor = (option: {
  backgroundType: string
  color: { background: string }
  image: string
}) => {
  return {
    background: computed(() => {
      if (option.backgroundType === '颜色') {
        return option.color.background as string
      }
      if (option.backgroundType === '图片' || option.backgroundType === '背景图片') {
        // console.log(option.backgroundType)
        return `url(${option.image}) no-repeat center center/cover`
      }
      return ''
    })
  }
}
/** 边距与圆角钩子 */
export const usePaddingRadius = (option: {
  padding: {
    top?: number
    leftRight?: number
    bottom?: number
    topRadius?: number
    bottomRadius?: number
  }
}) => {
  return {
    padding: computed(() => {
      return `\
        ${option.padding.top ?? 0}px \
        ${option.padding.leftRight ?? 0}px \
        ${option.padding.bottom ?? 0}px\
        `
    }),
    borderRadius: computed(() => {
      return `\
        ${option.padding.topRadius ?? 0}px \
        ${option.padding.topRadius ?? 0}px \
        ${option.padding.bottomRadius ?? 0}px \
        ${option.padding.bottomRadius ?? 0}px\
        `
    })
  }
}
/**  风格样式钩子 */
export const useComponentModalStyle = (option: { componentModal: string }) => {
  return {
    boxShadow: computed(() =>
      option.componentModal === '投影' ? '0 0 10px rgb(226 231 244 / 70%)' : undefined
    ),
    border: computed(() =>
      option.componentModal === '边框' ? '1px solid rgb(237, 237, 237)' : undefined
    )
  }
}
