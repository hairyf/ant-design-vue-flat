/*
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:08:30
 * @LastEditTime: 2021-07-07 16:50:04
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

/** 定义 RouteMeta 类型 */
declare module 'vue-router' {
  interface RouteMeta {
    /** 完整路径信息 */
    completePath?: string
    /** 路径映射 */
    pathMaps?: string[]
    /** 当前组件是否隐藏(侧边栏) */
    hidden?: boolean
    /** 授权(登录页) */
    auth?: boolean
  }
}
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { calculRouterActive, setDefaultRoutes } from '@/utils/vue-utils'
import auth from './modules/auth'
import order from './modules/order'
import index from './modules/index'
import user from './modules/user'
import setmeal from './modules/setmeal'
import channel from './modules/channel'
import theme from './modules/theme'
import application from './modules/application'
import template from './modules/template'
// import service from './modules/service'
import shop from './modules/shop'
import setting from './modules/setting'
import test from './modules/test'
import { cloneDeep } from 'lodash'

/** 基本一级路由(登录页, 错误页) */
export const baseRoutes: RouteRecordRaw[] = [auth]
/** 基本多级路由(侧边栏导航页面) */
export const mainRoutes: RouteRecordRaw[] = [
  index,
  user,
  shop,
  order,
  setmeal,
  application,
  template,
  channel,
  theme,
  // service,
  setting
]
// 测试
if (import.meta.env.DEV) mainRoutes.push(test)
/** 所有路由信息 */
export const allRoutes: RouteRecordRaw[] = [...mainRoutes, ...baseRoutes]

/** 处理 Element-Menu 菜单高亮路径问题 */
calculRouterActive(allRoutes)
/** 处理所有路由默认重定向地址 */
setDefaultRoutes(allRoutes)

/** Vue-Router 路由器 */
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: cloneDeep(baseRoutes)
})
export default router
