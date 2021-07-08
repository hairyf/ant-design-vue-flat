import vue from 'rollup-plugin-vue'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'
import postcssImport from 'postcss-import'
// 处理 apply 以及内置 mixin
import tailwindcss from 'tailwindcss'
import { name } from '../package.json'
const tailwindConfig = require('../tailwind.config')
const file = (type) => `dist/${name}.${type}.js`

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
    esbuild(),
    vue(),
    postcss({
      extensions: ['.css'],
      extract: true,
      plugins: [
        postcssImport(),
        tailwindcss({
          presets: tailwindConfig.presets,
          purge: {
            enabled: true,
            content: ['**/*.html', '**/*.vue', '**/*.jsx', '**/*.js']
          }
        })
      ]
    }),
    commonjs({
      include: ['node_modules/**', 'node_modules/**/*']
    })
  ],
  external: ['vue', 'echarts', 'lodash-es', 'ant-design-vue']
})
