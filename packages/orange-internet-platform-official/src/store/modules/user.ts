import { reqPhoneLogin } from './../../api/auth'
/*
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:45:01
 * @LastEditTime: 2021-06-22 11:27:31
 * @Description: 用户数据管理
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { reqLogin } from '@/api/auth'
import { createModule } from '@/utils/vue-utils'
import { DELETE_USER_INFO, RECEVE_USER_INFO } from '../types'

export default createModule({
  state: {
    info: undefined as UserInfo | undefined
  },
  mutations: {
    [RECEVE_USER_INFO]: (state, userInfo) => (state.info = userInfo),
    [DELETE_USER_INFO]: (state) => (state.info = undefined)
  },
  actions: {
    // 账号登录
    accountLogin: async ({ commit }, accountInfo) => {
      const { data } = await reqLogin(accountInfo)
      commit(RECEVE_USER_INFO, data.data)
    },
    phoneLogin: async ({ commit }, phoneInfo) => {
      const { data } = await reqPhoneLogin(phoneInfo)
      commit(RECEVE_USER_INFO, data.data)
    },
    // 退出, 清除用户数据
    signOutUserInfo: ({ commit }) => {
      commit(DELETE_USER_INFO)
    }
  },
  getters: {
    // 当前是否登录
    isLogin(state) {
      return typeof state.info !== 'undefined' && state.info
    }
  }
})
