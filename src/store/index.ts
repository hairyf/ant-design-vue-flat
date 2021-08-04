/*
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:43:17
 * @LastEditTime: 2021-07-13 17:31:40
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import { createStore, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import theme from './modules/theme'
import common from './modules/common'
import permission from './modules/permission'
import copy from './modules/copy'

/** Vuex 数据管理 */
const store = createStore({
  modules: { theme, common, user, permission ,copy},
  plugins: [createPersistedState({ paths: ['common', 'theme', 'user','copy'] })]
}) as Store<StoreType>

/** 完整数据管理类型 */
type StoreType = {
  user: typeof user.state
  theme: typeof theme.state
  common: typeof common.state
  permission: typeof permission.state
  copy: typeof copy.state
}

/** 覆盖 useStore 类型 */
declare module 'vuex' {
  export function useStore<S = StoreType>(): Store<S>
}

export default store
