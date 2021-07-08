import { App } from 'vue'
import { components } from './components'
import antd from 'ant-design-vue'

// 引入样式
// import './main.scss'

// 导出
export * from 'ant-design-vue'
export * from './components'

// 全局注册
const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
  app.use(antd)
}
// 局部注册
export { install }
export default { install }
