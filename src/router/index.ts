/*
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:08:30
 * @LastEditTime: 2021-06-25 18:00:28
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
  }
}
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { calculRouterActive, setDefaultRoutes } from '@/utils/vue-utils'
import { allRoutes } from './routes'

/** 处理 Element-Menu 菜单高亮路径问题 */
calculRouterActive(allRoutes)
/** 处理所有路由默认重定向地址 */
setDefaultRoutes(allRoutes)

/** Vue-Router 路由器 */
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: allRoutes
})
export default router
