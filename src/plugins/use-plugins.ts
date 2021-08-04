/*
 * @Author: Mr.Mao
 * @Date: 2021-03-19 16:35:43
 * @LastEditTime: 2021-06-28 10:07:31
 * @Description: 引入插件
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { App } from 'vue'
import router from '@/router'
import store from '@/store'
import 'animate.css'

// 全量引入 ant-design-vue 组件库
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

export const usePlugins = (app: App<Element>) => {
  // 引入插件
  app.use(Antd)
  app.use(router)
  app.use(store)
}
