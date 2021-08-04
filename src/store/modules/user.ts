/*
 * @Author: Mr.Mao
 * @LastEditors: liupei
 * @Date: 2021-01-07 10:38:14
 * @LastEditTime: 2021-05-28 10:44:20
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import createModule from '@/utils/vuex-create-module';
import Vue from 'vue';
import {
  reqAuthPhoneCode,
  reqBalance,
  reqEditUserInfo,
  reqGetUserInfo,
  reqIdCard,
  reqMobileLogin,
  reqRegister,
  reqUserInfo,
} from '@/api';
import {
  RECEVE_USER_INFO,
  DELETE_USER_INFO,
  RECEVE_USER_OPEN_ID,
  RECEVE_AUTHENTICATION,
  RECEVE_BALANCE,
} from '@/store/types';
import { $uni } from '@/utils';
import { pickBy, identity } from 'lodash';

export default createModule({
  state: {
    info: {} as UserInfo,
    openid: '' as string,
    authentication: {} as Authentication,
    balance: '',
  },
  mutations: {
    [RECEVE_USER_INFO]: (state, userInfo) => (state.info = userInfo),
    [DELETE_USER_INFO]: (state) => (state.info = {} as UserInfo),
    [RECEVE_USER_OPEN_ID]: (state, openid) => {
      state.openid = openid;
      Vue.prototype.$uma.setOpenid(openid);
    },
    [RECEVE_AUTHENTICATION]: (state, auth) => (state.authentication = auth),
    [RECEVE_BALANCE]: (state, balance) => (state.balance = balance),
  },
  actions: {
    /** 手机号登录 */
    mobileLogin: async ({ commit, dispatch }, [mobile, captcha]) => {
      const { data } = await reqMobileLogin(mobile, captcha);
      commit(RECEVE_USER_INFO, data);
      dispatch('getAuthentication');
    },
    /** 授权并注册用户 */
    registerUserInfo: async ({ commit, state }, [encryptedData, iv]) => {
      const { data } = await reqRegister(encryptedData, iv, state.openid);
      commit(RECEVE_USER_INFO, data);
    },
    /** 获取用户数据(微信登录) */
    getUserInfo: async ({ commit, dispatch }) => {
      try {
        const [, { code }] = await $uni.login({});
        const { data } = await reqUserInfo(code);
        commit(RECEVE_USER_INFO, data);
        dispatch('getAuthentication');
      } catch (error) {
        commit(RECEVE_USER_OPEN_ID, error.data.data.openid);
      }
    },
    /** 刷新用户数据 */
    refreshUserInfo: async ({ commit }) => {
      const { data } = await reqGetUserInfo();
      commit(RECEVE_USER_INFO, data);
    },
    /** 修改用户信息 */
    editUserInfo: async (
      { dispatch },
      [nickname, avatar, gender, birthday]
    ) => {
      await reqEditUserInfo(
        pickBy({ nickname, avatar, gender, birthday }, identity)
      );
      dispatch('refreshUserInfo');
    },
    /** 授权手机号码 */
    authPhoneCode: async ({ state, dispatch }, [encryptedData, iv]) => {
      await reqAuthPhoneCode(encryptedData, iv, state.openid);
      await dispatch('refreshUserInfo');
    },
    /** 当前登录状态是否过期(是否登录) */
    getBeOverdueLogin({ state, dispatch, getters }) {
      const isAuthUserInfo = getters.isAuthUserInfo;
      const expiretime = state.info?.expiretime ?? 1;
      const currenttime = Date.now() / 1000;
      const isTokenBeOverdue = expiretime === 0 || expiretime > currenttime;
      !isTokenBeOverdue && dispatch('delectUserInfo');
      const isLogin = isAuthUserInfo && isTokenBeOverdue;
      return isLogin || Promise.reject(isLogin);
    },
    /** 清除用户数据 */
    delectUserInfo: ({ commit }) => commit(DELETE_USER_INFO),
    /** 获取实名认证信息 */
    getAuthentication: async ({ commit }) => {
      const { data } = await reqIdCard();
      commit(RECEVE_AUTHENTICATION, data);
      return data;
    },
    /** 获取钱包余额 */
    getBalance: async ({ commit }) => {
      const { data: wallet } = await reqBalance();
      commit(RECEVE_BALANCE, wallet);
    },
  },
  getters: {
    /** 是否已经授权用户信息 */
    isAuthUserInfo: (state) => {
      return !!state.info?.nickname;
    },
    /** 是否已经授权手机号码 */
    isAuthPhoneCode: (state) => {
      return !!state.info?.mobile;
    },
    /** 是否已实名认证 */
    isAuthentication: (state) => {
      return !!state.authentication?.name;
    },
  },
});
