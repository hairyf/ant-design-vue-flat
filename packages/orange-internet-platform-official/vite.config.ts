/*
 * @Author: Mr.Mao
 * @Date: 2021-05-17 18:48:39
 * @LastEditTime: 2021-06-23 15:40:05
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import ViteComponents from 'vite-plugin-components'

const viteComponentsPlugin = ViteComponents({
  dirs: ['src/components'],
  extensions: ['vue'],
  deep: true,
  globalComponentsDeclaration: true
})
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'src/components')
    }
  },
  base: '/',
  plugins: [viteComponentsPlugin, vue(), vueJsx()],
  server: { port: 3300, host: '0.0.0.0' }
})
