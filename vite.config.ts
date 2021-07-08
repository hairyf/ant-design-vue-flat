import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import ViteComponents from 'vite-plugin-components'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'package')
    }
  },
  plugins: [vue(), vueJsx()]
})
