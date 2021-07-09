/*
 * @Author: Mr.Mao
 * @Date: 2021-07-09 09:56:47
 * @LastEditTime: 2021-07-09 16:15:41
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
const _ = require('lodash')

exports.transformTheme2CssKeys = (theme) => {
  const result = []
  let keys = []
  const recursion = (option) => {
    _.forIn(option, (v, k) => {
      const isObject = typeof v === 'object'
      keys.push(k)
      if (isObject) {
        recursion(v)
        keys = []
      } else {
        const key = keys
          .map((v) => v[0].toUpperCase() + v.slice(1))
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

exports.transformTailwindColors = (theme) => {
  return exports.transformTheme2CssKeys(theme).reduce((total, value) => {
    total[value] = `var(--${value})`
    return total
  }, {})
}
