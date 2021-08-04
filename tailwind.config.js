/*
 * @Author: Zhilong
 * @Date: 2021-05-18 18:31:56
 * @LastEditTime: 2021-06-25 10:21:11
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */
const getPresets = require('@tuimao/tailwind-config-preset').default

const presets = getPresets({
  theme: {
    spacing: {
      100: '100px'
    },
    colors: {
      primary: {
        DEFAULT: '#e89026'
      },
      red: {
        DEFAULT: '#FF0000'
      },
      blue: {
        DEFAULT: '#558BF7',
        light: '#f1f9ff',
        lightest: '#F5F8FF'
      },
      white: {
        darkest: '', // 最暗
        dark: '', // 暗
        darkmin: '#F2F6FA', // 一点点暗
        DEFAULT: '#FFFFFF' // 默认
      },
      black: {
        DEFAULT: '#000000',
        light: '#333333' //亮
      }
    }
  }
})

module.exports = {
  presets: [presets]
}
