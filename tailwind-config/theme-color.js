/*
 * @Author: Mr.Mao
 * @Date: 2021-05-17 17:15:30
 * @LastEditTime: 2021-07-09 11:04:51
 * @Description: 背景配置
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
const option = require('../package/theme/default/colors.json')
const _ = require('lodash')
const transformTheme2CssKeys = (theme) => {
  const result = []
  const keys = []
  const recursion = (option) => {
    _.forIn(option, (v, k) => {
      const isObject = typeof v === 'object'
      keys.push(k)
      if (isObject) {
        recursion(v)
      } else {
        const key = keys
          .map((v) => _.capitalize(v))
          .join('')
          .trim()
        result.push(key)
        keys.splice(keys.length - 1, 1)
      }
    })
  }
  recursion(theme)
  return result
}
const themeColors = transformTheme2CssKeys(option).reduce((total, value) => {
  total[value] = `var(--${value})`
  return total
}, {})
module.exports = {
  /**
   * 背景图片配置 class="bg-[key]"
   * @template 
   * [key]: {
      darkest: '',  // 最暗
      dark: '',     // 暗
      darkmin:'',   // 一点点暗
      DEFAULT: '',  // 默认
      lightmin:'',  // 一点亮
      light: '',    // 亮
      lightest: ''  // 最亮
    }
   * @link https://www.tailwindcss.cn/docs/background-image
   */
  colors: {
    ...themeColors
  }
}
