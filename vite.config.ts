/*
 * @Author: Mr.Mao
 * @Date: 2021-03-12 13:58:29
 * @LastEditTime: 2021-05-14 10:49:41
 * @Description:
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.3.168:81',
    //     changeOrigin: true,
    //     ws: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
  base: '/addons/weitshop_shop/weshop/public/home/backend/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'src')
    }
  },
  plugins: [vue()]
})
