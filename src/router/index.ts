/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-02-23 19:07:17
 * @LastEditTime: 2021-05-14 13:56:50
 * @Description: 路由入口
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import shopRoute from '@/router/modules/shop'
import commodityRoute from '@/router/modules/commodity'
import orderRoute from '@/router/modules/order'
import markeRoute from '@/router/modules/marke'
import memberRoute from '@/router/modules/member'
import dataRoute from '@/router/modules/data'
import financeRoute from '@/router/modules/finance'
// import channelRoute from '@/router/modules/channel'
import channelRoute from '@/router/modules/v7channel'
import applicationRoute from '@/router/modules/application'
import systemRoute from '@/router/modules/system'
import testsRoute from '@/router/modules/tests'
import userRoute from '@/router/modules/user'
import errorRoutes from '@/router/modules/error'
import indexRoute from '@/router/modules/index'
import { calculRouterActive, outputRoutes, setDefaultRoutes } from '@/utils/vue-utils'
/** 基本路由(只有一级页) */
const baseRouter: Array<RouteRecordRaw> = [
  // 用户类路由
  userRoute,
  // 错误页面路由
  ...errorRoutes,
  // 指向不存在页面将重定向为404
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

/** 后台路由(多级页面) */
const mainRouter: Array<RouteRecordRaw> = [
  // 后台首页
  indexRoute,
  // 店铺
  shopRoute,
  // 商品
  commodityRoute,
  // 订单
  orderRoute,
  // 营销
  markeRoute,
  // 会员
  memberRoute,
  // 数据
  dataRoute,
  // 财务
  financeRoute,
  // 渠道
  channelRoute,
  // 应用
  applicationRoute,
  // 配置
  systemRoute,
  // 测试
  testsRoute
]
// 处理Element-Menu菜单高亮路径问题
calculRouterActive(mainRouter)
// setDefaultRoutes(mainRouter)
// 输出当前路由权限表
// outputRoutes(mainRouter)
// 新增路由
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // 上线时要改成baseRouter
  routes: baseRouter
})

export { mainRouter, baseRouter }
export default router
