/*
 * @Author: Mr.Mao
 * @Date: 2021-05-26 14:15:49
 * @LastEditTime: 2021-08-01 10:09:53
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
const getPresets = require('@tuimao/tailwind-config-preset').default
const { colors } = require('./package/tailwind')

const presets = getPresets({
  theme: {
    colors: {
      ...colors,
      gray: {
        450: '#8c8c8c'
      }
    }
  },
  important: false
})

module.exports = {
  presets: [presets]
}
