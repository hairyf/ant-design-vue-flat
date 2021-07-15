/*
 * @Author: Mr.Mao
 * @Date: 2021-07-08 15:12:41
 * @LastEditTime: 2021-07-15 11:23:27
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { App } from 'vue'
import * as components from './components'
import antd from 'ant-design-vue'
// 引入样式
import './main.scss'

// 全局注册
const install = (app: App) => {
  Object.values(components).forEach((component) => {
    app.component(component.name, component)
  })
  app.use(antd)
}

// 全局导出
export default { install }

// 导出所有配置
export * from 'ant-design-vue'
export * from './components'
export * from './utils'
export * from './hooks'
// export * as tailwindTheme from './tailwind'
export { install }
