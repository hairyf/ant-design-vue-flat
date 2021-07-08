/*
 * @Author: Mr.Mao
 * @Date: 2021-05-26 14:15:49
 * @LastEditTime: 2021-06-18 15:50:16
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
const getPresets = require('@tuimao/tailwind-config-preset').default
const base = require('./tailwind-config/theme-base.js')
const colors = require('./tailwind-config/theme-color.js')
const background = require('./tailwind-config/theme-background.js')

const presets = getPresets({
  theme: {
    ...base,
    ...colors,
    ...background
  }
})

module.exports = {
  presets: [presets]
}
