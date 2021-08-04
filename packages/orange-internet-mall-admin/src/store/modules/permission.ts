/*
 * @Author: Mr.Mao
 * @Date: 2021-04-07 11:22:17
 * @LastEditTime: 2021-05-12 14:16:17
 * @Description: 路由权限数据管理
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import router, { mainRouter } from '@/router'
import {
  compareRoutes,
  createModule,
  setDefaultHomeRoute,
  setDefaultRoutes
} from '@/utils/vue-utils'
import { cloneDeep } from 'lodash'
import { RouteRecordRaw } from 'vue-router'
import { DELETE_USER_ROUTES, RECEVE_USER_ROUTES } from '@/store/types'
// import surfaceRoutes from '@/router/router-surface.json'
import testsRoute from '@/router/modules/tests'
import { reqRulesInitTree } from '@/api/user'
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
      state.userRoutes = compareRoutes(cloneDeep(mainRouter), state.surfRoutes)
      if (import.meta.env.MODE === 'development') {
        state.userRoutes.push(testsRoute)
      }
      setDefaultRoutes(state.userRoutes)
      setDefaultHomeRoute(state.userRoutes)
      state.userRoutes.forEach((route) => router.addRoute(route))
    },
    // 清除用户路由
    [DELETE_USER_ROUTES]: (state) => {
      state.userRoutes.forEach((route) => {
        route.name && router.removeRoute(route.name)
      })
      state.userRoutes = []
    }
  },
  actions: {
    // 设置用户路由配置, 现默认指定当前路由表(未接入数据)
    setUserRoutes: async ({ commit }) => {
      // 上线时要放开
      const { data } = await reqRulesInitTree()
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
