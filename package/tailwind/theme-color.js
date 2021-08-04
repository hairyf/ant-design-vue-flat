/*
 * @Author: Mr.Mao
 * @Date: 2021-05-17 17:15:30
 * @LastEditTime: 2021-07-14 20:02:28
 * @Description: 背景配置
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
const colors = require('../theme/default/_colors.json')
const utils = require('./utils')
module.exports = utils.transformTailwindColors(colors)
