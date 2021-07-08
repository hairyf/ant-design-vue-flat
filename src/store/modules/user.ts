import { awaitPromise } from './../../utils/index'
/*
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:45:01
 * @LastEditTime: 2021-06-29 10:16:27
 * @Description: 用户数据管理
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { createModule } from '@/utils/vue-utils'
import { reqAuthLogin } from '@/api/auth'
import { DELETE_USER_INFO, RECEVE_USER_INFO, RECEVE_COMMIT, DELETE_USER_ROUTES } from '../types'

export default createModule({
  state: {
    info: window.config?.userInfo
  },
  mutations: {
    [RECEVE_USER_INFO]: (state, userInfo) => (state.info = userInfo),
    [DELETE_USER_INFO]: (state) => (state.info = undefined)
  },
  actions: {
    // 账号登录
    accountLogin: async ({ commit, dispatch }, accountInfo) => {
      const { data } = await reqAuthLogin(accountInfo)
      commit(RECEVE_USER_INFO, data.data)
      await awaitPromise(50)
      await Promise.all([dispatch('getCommonInit'), dispatch('setUserRoutes')])
    },
    // 退出, 清除用户数据
    signOutUserInfo: ({ commit }) => {
      commit(DELETE_USER_INFO)
      commit(DELETE_USER_ROUTES)
    }
  },
  getters: {
    // 当前是否登录
    isLogin(state) {
      return typeof state.info !== 'undefined'
    }
  }
})
