import { reqSystemInit, reqPlatformContactWay } from './../../api/common'
import { createModule } from '@/utils/vue-utils'

/*
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:45:01
 * @LastEditTime: 2021-06-30 09:11:30
 * @Description: 公用数据管理
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { RECEVE_COMMIT, RECEVE_CUSTOMER } from '../types'

export default createModule({
  state: {
    info: {} as SystemInin,
    service: {} as PlatformContact
  },
  mutations: {
    [RECEVE_COMMIT]: (state, data) => (state.info = data),
    [RECEVE_CUSTOMER]: (state, data) => (state.service = data)
  },
  actions: {
    // 初始化数据
    getSystemInin: async ({ commit }) => {
      const { data } = await reqSystemInit()
      // console.log('请求支付数据', data)
      commit(RECEVE_COMMIT, data.data)
    },
    // 获取客服数据
    getPlatformMode: async ({ commit }) => {
      const { data } = await reqPlatformContactWay()
      commit(RECEVE_CUSTOMER, data.data)
    }
  }
})
