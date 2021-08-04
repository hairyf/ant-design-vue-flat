/*
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:45:01
 * @LastEditTime: 2021-07-05 15:56:15
 * @Description: 用户数据管理
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { createModule } from '@/utils/vue-utils'
import { reqGetServiceCopy } from '@/api/auth'
import { RECEVE_COPY_INFO,DELETE_COPY_INFO } from '../types'


export default createModule({
  state: {
    info: window.config?.copyInfo
  },
  mutations: {

    [RECEVE_COPY_INFO]: (state, copyInfo) => (state.info = copyInfo),
    [DELETE_COPY_INFO]: (state) => (state.info = undefined)
  },
  actions: {
    copySelect:async ({ commit,state })=>{
      const { data } = await reqGetServiceCopy()
      commit(RECEVE_COPY_INFO, data.data.config.shop)
    },

  },
  getters: {

  }
})
