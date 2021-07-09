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
export * from './utils/theme'
export { install }
