/*
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-02-23 17:20:30
 * @LastEditTime: 2021-05-11 14:06:48
 * @Description: 应用入口
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { createApp } from 'vue'
import App from './App.vue'

// 引入全局组件, 全局插件, 初始化执行
import { useComponents } from '@/plugins/use-components'
import { usePlugins } from '@/plugins/use-plugins'
import { useInitialize } from '@/plugins/use-initialize'
// 生成应用; 挂载全局组件与扩展
const app = createApp(App)

useInitialize(app)
useComponents(app)
usePlugins(app)

app.mount('#app')
