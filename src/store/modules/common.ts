import { createModule } from '@/utils/vue-utils'

/*
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:45:01
 * @LastEditTime: 2021-06-21 14:59:15
 * @Description: 公用数据管理
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { reqCommonInit } from '@/api/auth'
import { RECEVE_COMMIT } from '../types'

export default createModule({
  state: {
    info: {} as CommonType
  },
  mutations: {
    [RECEVE_COMMIT]: (state, data) => (state.info = data)
  },
  actions: {
    // 初始化数据
    getCommonInit: async ({ commit }) => {
      // const { data } = await reqCommonInit()
      // commit(RECEVE_COMMIT, data.data)
    }
  }
})
