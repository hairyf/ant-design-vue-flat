/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-07 10:38:14
 * @LastEditTime: 2021-05-11 15:30:29
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import createModule from '@/utils/vue-utils';
import {
  RECEVE_USER_INFO,
  DELETE_USER_INFO,
  RECEVE_USER_OPEN_ID,
  RECEVE_AUTH_PHONE_CODE,
  RECEVE_MONEY_INFO,
  DELETE_USER_OPEN_ID,
  DELECT_MONEY_INFO,
} from '@/store/types';
import {
  reqAuthCodeLogin,
  reqOutLogin,
  reqWeChartRegister,
  reqWeChatLogin,
  reqPhoneRegister,
  reqPhoneLogin,
  reqLabelCount,
  reqEditUserInfo,
  reqEditPhoneInfo,
  reqPasswordLogin,
  reqResetPasswrod,
  reqBindPhoneRegister,
  reqAuthAccountBind,
  reqUserInfo,
  reqBindPhoneInfo,
} from '@/api';
import { $uni } from '@/utils';
import { identity, pickBy } from 'lodash';
export default createModule({
  state: {
    // 用户信息
    info: {} as UserInfo,
    // 微信登录凭证
    openid: '',
    // 是否需要验证手机
    authPhoneCode: false,
    // 余额钱包
    money: {} as { coupon: number; banlance: string; score: string },
  },
  mutations: {
    // 用户信息
    [RECEVE_USER_INFO]: (state, userInfo) => (state.info = userInfo),
    [DELETE_USER_INFO]: (state) => (state.info = {} as UserInfo),
    [RECEVE_USER_OPEN_ID]: (state, openid) => (state.openid = openid),
    [DELETE_USER_OPEN_ID]: (state) => (state.openid = ''),
    [RECEVE_AUTH_PHONE_CODE]: (state, bool) => (state.authPhoneCode = bool),
    // 余额钱包
    [RECEVE_MONEY_INFO]: (state, moneyInfo) => (state.money = moneyInfo),
    [DELECT_MONEY_INFO]: (state) => (state.money = {} as any),
  },
  actions: {
    /** 授权注册用户(微信) */
    registerWeChartUserInfo: async ({ commit, state }, [encryptedData, iv]) => {
      try {
        const { data } = await reqWeChartRegister(
          encryptedData,
          iv,
          state.openid
        );
        commit(RECEVE_USER_INFO, data.data);
        commit(DELETE_USER_OPEN_ID);
      } catch (error) {
        commit(RECEVE_USER_OPEN_ID, error.data.data.openid);
        throw Error('需要绑定用户信息');
      }
    },
    /** 授权并解密手机号完成登录(微信) */
    authPhoneWeChartUserInfo: async (
      { commit, state },
      [encryptedData, iv]
    ) => {
      const { data } = await reqAuthCodeLogin(encryptedData, iv, state.openid);
      commit(RECEVE_USER_INFO, data.data);
    },
    /** 获取用户数据(微信) */
    getWeChartUserInfo: async ({ commit }) => {
      try {
        const [, { code }] = await $uni.login({});
        const { data } = await reqWeChatLogin(code);
        commit(RECEVE_USER_INFO, data.data);
        commit(DELETE_USER_OPEN_ID);
      } catch (error) {
        commit(RECEVE_USER_OPEN_ID, error.data.data?.openid);
        throw Error('需要授权信息');
      }
    },
    /** 小程序绑定已有账号 */
    authAccountBindWeChat: async ({ commit, state }, option) => {
      option.openid = state.openid;
      const { data } = await reqAuthAccountBind(option as any);
      commit(RECEVE_USER_INFO, data.data);
    },
    /** 手机密码注册 */
    phoneRegisterUserInfo: async (
      { commit, state },
      option: Record<string, any>
    ) => {
      option.openid = state.openid;
      const { data } = await reqPhoneRegister(option as any);
      commit(RECEVE_USER_INFO, data.data);
    },
    /** 手机密码注册(绑定手机) */
    bindPhoneRegisterUserInfo: async (
      { commit, state },
      option: Record<string, any>
    ) => {
      option.openid = state.openid;
      const { data } = await reqBindPhoneRegister(option as any);
      commit(RECEVE_USER_INFO, data.data);
    },
    /** 手机号码登录 */
    phoneLoginUserInfo: async ({ commit }, [mobile, verifyCode]) => {
      const { data } = await reqPhoneLogin(mobile, verifyCode);
      commit(RECEVE_USER_INFO, data.data);
    },
    /** 手机密码登录 */
    passwordLoginUserInfo: async ({ commit }, [mobile, password]) => {
      const { data } = await reqPasswordLogin(mobile, password);
      commit(RECEVE_USER_INFO, data.data);
    },
    /** 重置密码 */
    resetPassword: async ({ commit }, [mobile, verifyCode, password]) => {
      await reqResetPasswrod(mobile, verifyCode, password);
      commit(DELETE_USER_INFO);
    },
    /** 修改用户信息 */
    editUserInfo: async ({ commit }, [nickname, avatar, gender, birthday]) => {
      const { data } = await reqEditUserInfo(
        pickBy({ nickname, avatar, gender, birthday }, identity)
      );
      commit(RECEVE_USER_INFO, data.data);
    },
    /** 修改手机信息 */
    editPhoneInfo: async ({ commit }, [mobile, verifyCode]) => {
      const { data } = await reqEditPhoneInfo(mobile, verifyCode);
      commit(RECEVE_USER_INFO, data.data);
    },
    /** 绑定手机号 */
    bindPhoneInfo: async ({ commit }, [mobile, verifyCode]) => {
      const { data } = await reqBindPhoneInfo(mobile, verifyCode);
      commit(RECEVE_USER_INFO, data.data);
    },
    /** 退出登录, 并清除用户信息 */
    outLogin: async ({ commit }) => {
      await reqOutLogin();
      commit(DELETE_USER_INFO);
      commit(DELECT_MONEY_INFO);
    },
    /** 获取钱包余额 */
    getMoney: async ({ commit }) => {
      const { data } = await reqLabelCount();
      commit(RECEVE_MONEY_INFO, data.data);
    },
    /* 重新获取用户信息 */
    getUserInfo: async ({ commit }) => {
      const { data } = await reqUserInfo();
      commit(RECEVE_USER_INFO, data.data);
    },
  },
  getters: {
    /** 是否需要授权用户信息 */
    isNeedAuthUser: (state) => {
      return !!state.openid;
    },
    /** 是否已经授权用户信息 */
    isAuthUserInfo: (state) => {
      return !!state.info?.nickname;
    },
    /** 是否已经授权手机号码 */
    isAuthPhoneCode: (state) => {
      return !!state.info.mobile;
    },
    /**获取用户头像*/
    getUserInfo: (state) => {
      return state.info;
    },
  },
});
