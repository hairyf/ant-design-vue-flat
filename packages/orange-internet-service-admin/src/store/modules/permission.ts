/*
 * @Author: Mr.Mao
 * @Date: 2021-04-07 11:22:17
 * @LastEditTime: 2021-07-07 14:00:49
 * @Description: 路由权限数据管理
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import router, { mainRoutes, baseRoutes } from '@/router'
import {
  calculRouterActive,
  compareRoutes,
  createModule,
  setDefaultHomeRoute,
  setDefaultRoutes
} from '@/utils/vue-utils'
import { RouteRecordRaw } from 'vue-router'
import { DELETE_USER_ROUTES, RECEVE_USER_ROUTES } from '@/store/types'
import { cloneDeep } from 'lodash'
import { reqInitTree } from '@/api/common'
import routesSurface from '@/router/routes-surface.json'
export default createModule({
  state: {
    // 当前路由信息
    userRoutes: [] as RouteRecordRaw[],
    // 当前路由映射
    surfRoutes: [] as RouteRecordRaw[]
  },
  mutations: {
    // 接收路由映射, 并改变路由配置
    [RECEVE_USER_ROUTES]: (state, routes?: RouteRecordRaw[]) => {
      if (routes) state.surfRoutes = routes
      state.userRoutes = compareRoutes(cloneDeep(mainRoutes), state.surfRoutes)
      setDefaultRoutes(state.userRoutes)
      setDefaultHomeRoute(state.userRoutes)
      calculRouterActive(state.userRoutes)
      // addRoute 遍历添加路由项
      state.userRoutes.forEach((route) => router.addRoute(route))
      // addRoute 不会进行同步路由配置, 手动同步路由配置, 兼容侧边栏显示
      router.options.routes.push(...state.userRoutes)
    },
    // 清除用户路由
    [DELETE_USER_ROUTES]: (state) => {
      state.userRoutes.forEach((route) => route.name && router.removeRoute(route.name))
      state.userRoutes = []
      router.options.routes = baseRoutes
      // console.log(router.options.routes, baseRoutes)
    }
  },
  actions: {
    // 设置用户路由配置, 现默认指定当前路由表(未接入数据) commit(RECEVE_USER_ROUTES, data)
    setUserRoutes: async ({ commit }) => {
      const { data } = await reqInitTree()
      /* 使用测试用数据(routesSurface) */
      // commit(RECEVE_USER_ROUTES, /* data.data */ routesSurface)
      commit(RECEVE_USER_ROUTES, data.data)
    }
  },
  getters: {
    // 当前首页路径
    baseHomePath: (store) => {
      return store.userRoutes[0]?.path || router.options.routes[0]?.path || '/user/login'
    }
  }
})
