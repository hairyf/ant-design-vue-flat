/*
 * @Author: Zhilong
 * @Date: 2021-06-17 17:37:48
 * @LastEditTime: 2021-06-23 09:34:59
 * @Description: 路由
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */

import { RouteRecordRaw } from 'vue-router'
import EmptyLayout from '@/layout/EmptyLayout.vue'
import HomeLayout from '@/layout/HomeLayout.vue'

import auth from './modules/base/auth'
import more from './modules/home/more'
import home from './modules/home/home'
import aboutUs from './modules/home/aboutUs'
import solution from './modules/home/solution'
import setMeal from './modules/console/setMeal'
import serviceMarket from './modules/home/serviceMarket'
import authorizedQuery from './modules/home/authorizedQuery'
import authentication from './modules/console/authentication'
import productIntroduce from './modules/home/productIntroduce'
import channelCooperation from './modules/home/channelCooperation'

/** 基本一级路由(登录页, 错误页) */
export const baseRoutes: RouteRecordRaw[] = [
  { path: '/', redirect: '/console/setMeal/index' },
  auth
]

/** 控制台多级路由(侧边栏导航页面) */
export const consoleRoute: RouteRecordRaw = {
  path: '/console',
  component: EmptyLayout,
  children: [setMeal, authentication]
}

/** 首页多级路由(顶部栏导航页面) */
// export const homeRoutes: RouteRecordRaw = {
//   path: '/home',
//   component: HomeLayout,
//   children: [
//     home,
//     productIntroduce,
//     solution,
//     channelCooperation,
//     authorizedQuery,
//     serviceMarket,
//     aboutUs,
//     more
//   ]
// }

/** 所有路由信息 */
export const allRoutes: RouteRecordRaw[] = [consoleRoute, ...baseRoutes]
