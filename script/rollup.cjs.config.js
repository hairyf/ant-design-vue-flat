/*
 * @Author: Mr.Mao
 * @Date: 2021-07-15 11:14:39
 * @LastEditTime: 2021-07-15 11:15:27
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import basicConfig, { name, file } from './rollup.config'
import { defineConfig } from 'rollup'

export default defineConfig({
  ...basicConfig,
  output: {
    name,
    file: file('cjs'),
    format: 'cjs'
  }
})
