/*
 * @Author: Mr.Mao
 * @Date: 2021-07-07 15:17:55
 * @LastEditTime: 2021-07-15 09:50:21
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import vue from 'rollup-plugin-vue'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'
import json from '@rollup/plugin-json'
import postcssImport from 'postcss-import'
// 处理 apply 以及内置 mixin
import tailwindcss from 'tailwindcss'
import { name } from '../package.json'
const tailwindConfig = require('../tailwind.config')
const file = (type) => `dist/${name}.${type}.js`
import vueJsx from 'rollup-plugin-vue-jsx-compat'

export { name, file }
export default defineConfig({
  input: 'package/index.ts',
  output: {
    name,
    file: file('esm'),
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    vueJsx(),
    esbuild({ jsxFactory: 'vueJsxCompat' }),
    vue(),
    json(),
    postcss({
      extensions: ['.css'],
      extract: true,
      plugins: [
        postcssImport(),
        tailwindcss({
          presets: tailwindConfig.presets
          // purge: {
          //   enabled: true,
          //   content: ['**/*.html', '**/*.vue', '**/*.jsx', '**/*.js']
          // }
        })
      ]
    }),
    commonjs({
      include: ['node_modules/**', 'node_modules/**/*', 'package/**', 'package/**/*']
    })
  ],
  external: ['vue', 'echarts', 'ant-design-vue', 'naive-ui', 'lodash', 'element-plus']
})
