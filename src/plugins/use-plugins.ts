/*
 * @Author: Mr.Mao
 * @Date: 2021-03-19 16:35:43
 * @LastEditTime: 2021-07-19 20:57:03
 * @Description: 引入插件
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { App } from 'vue'
import router from '@/router'
import store from '@/store'
import 'animate.css'

// 全量引入 ant-design-vue-flat 组件库
import AntdFlat from '~/index'
import '~/main.scss'

// 引入颜色选择框
import 'vanilla-colorful'

export const usePlugins = (app: App<Element>) => {
  // 引入插件
  app.use(router)
  app.use(store)
  app.use(AntdFlat)
}
