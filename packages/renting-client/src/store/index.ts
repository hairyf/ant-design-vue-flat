/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-07 10:18:13
 * @LastEditTime: 2021-02-05 16:09:25
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/* sotre>index.ts 统一规范
 * 1. 定义数据行为需在mutations-type中定义常量
 * 2. 储存数据保持精简，actions每个方法中需要添加注释
 * 至于为何需要添加mutations-type常量, 请在官网中寻找答案:
 * https://vuex.vuejs.org/zh/guide/mutations.html#使用常量代替-mutation-事件类型
 */
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { httpConfig } from '@/api';
import createPersistedState from 'vuex-persistedstate';
import common from './modules/common';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { common, user },
  plugins: [
    createPersistedState({
      key: '_store_',
      storage: {
        getItem: (key) => {
          const store = uni.getStorageSync(key) || {};
          const jsonStore = JSON.stringify(store);
          if (httpConfig['header'] && store?.user?.info?.token) {
            httpConfig['header']['token'] = store.user.info.token;
          }
          return jsonStore;
        },
        setItem: (key, jsonStore) => {
          const store = JSON.parse(jsonStore || '{}');
          if (httpConfig['header'] && store?.user?.info?.token) {
            httpConfig['header']['token'] = store.user.info.token;
          }
          uni.setStorage({ key, data: store });
        },
        removeItem: (key) => uni.removeStorage({ key }),
      },
    }),
  ],
}) as Store<State>;

/** 定义 state 的参数类型 */
export type State = {
  common: typeof common.state;
  user: typeof user.state;
};

export default store;
