/*
 * @Author: Mr.Mao
 * @Date: 2021-05-17 18:48:39
 * @LastEditTime: 2021-06-15 09:45:13
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { createApp } from 'vue'
import App from './App.vue'
// 引入全局组件, 全局插件, 初始化执行
import { useComponents } from '@/plugins/use-components'
import { usePlugins } from '@/plugins/use-plugins'
import { useInitialize } from '@/plugins/use-initialize'

// 生成应用; 挂载全局组件与扩展
export const app = createApp(App)

useInitialize(app)
useComponents(app)
usePlugins(app)

app.mount('#app')
