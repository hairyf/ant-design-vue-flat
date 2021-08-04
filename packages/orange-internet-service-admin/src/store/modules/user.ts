/*
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:45:01
 * @LastEditTime: 2021-07-05 15:56:15
 * @Description: 用户数据管理
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { createModule } from '@/utils/vue-utils'
import { reqAuthLogin } from '@/api/auth'
import {
  DELETE_USER_INFO,
  RECEVE_USER_INFO,
  DELETE_USER_ROUTES,
  MODIFY_USER_AVATAR,
  MODIFY_USER_NAME
} from '../types'
import { awaitPromise } from '@/utils'

export default createModule({
  state: {
    info: window.config?.userInfo,
    avater: '',
    name:''
  },
  mutations: {
    [RECEVE_USER_INFO]: (state, userInfo) => (state.info = userInfo),
    [DELETE_USER_INFO]: (state) => (state.info = undefined),
    [MODIFY_USER_AVATAR]: (state, avater) => (state.avater = avater),
    [MODIFY_USER_NAME]: (state, name) => (state.name = name)
  },
  actions: {
    // 账号登录
    accountLogin: async ({ commit, dispatch }, accountInfo) => {
      const { data } = await reqAuthLogin(accountInfo)
      commit(RECEVE_USER_INFO, data.data)
      commit(MODIFY_USER_AVATAR, data.data.avatar)
      commit(MODIFY_USER_NAME, data.data.name)
      await awaitPromise(50)
      await Promise.all([
        dispatch('getSystemInin'),
        dispatch('setUserRoutes'),
        dispatch('getPlatformMode')
      ])
    },
    // 退出, 清除用户数据
    signOutUserInfo: ({ commit }) => {
      commit(DELETE_USER_INFO)
      commit(DELETE_USER_ROUTES)
    },
    modifyPortrait: ({ commit }, avater) => {
      commit(MODIFY_USER_AVATAR, avater)
    },
    modifyName: ({ commit }, name) => {
      commit(MODIFY_USER_NAME, name)
    }
  },
  getters: {
    // 当前是否登录
    isLogin(state) {
      return typeof state.info !== 'undefined'
    }
  }
})
