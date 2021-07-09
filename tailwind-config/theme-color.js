/*
 * @Author: Mr.Mao
 * @Date: 2021-05-17 17:15:30
 * @LastEditTime: 2021-07-09 16:37:15
 * @Description: 背景配置
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
const colors = require('../package/theme/default/_colors.json')
const _ = require('lodash')
const utils = require('./utils')
const themeColors = utils.transformTailwindColors(colors)
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
