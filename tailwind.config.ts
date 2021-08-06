/*
 * @Author: Mr.Mao
 * @Date: 2021-05-26 14:15:49
 * @LastEditTime: 2021-08-06 17:27:57
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import getPresets from '@tuimao/tailwind-config-preset'
const { colors } = require('./package/tailwind')

const presets = getPresets({
  theme: <any>{
    colors: {
      ...colors,
      gray: { 450: '#8c8c8c' }
    }
  },
  important: false
})

module.exports = {
  presets: [presets]
}
