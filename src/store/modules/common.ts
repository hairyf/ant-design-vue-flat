/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-07 10:38:14
 * @LastEditTime: 2021-05-14 15:48:06
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import createModule from '@/utils/vue-utils';
import { getThemeColor } from '@/utils';
import { reqCommonInfo, reqGetDiyPage } from '@/api';
import { RECEIVE_COMMON, RECEIVE_TEMPLATE } from '@/store/types';
import { defaultContentOption } from 'orange-components-config/options';
import { paramsAnaly, redirectTo } from '@/utils';
let templateLoading = true;
export default createModule({
  state: {
    // 注册设置
    register: {} as Common['register'],
    // 客服设置
    customer: {} as Common['customer'],
    // 反馈设置
    feedback: {} as Common['feedback'],
    // 商城设置
    shopset: {} as Common['shopset'],
    // 支付设置
    depositWithdrawal: {} as Common['depositWithdrawal'],
    // 评价设置
    commentSet: {} as Common['commentSet'],
    // 交易设置
    OrderBaseParam: {} as Common['OrderBaseParam'],
    // 导航配置
    navigation: {} as typeof defaultContentOption['navigation'],
    // 当前样式
    style: '',
    // 当前视图区
    views: [] as typeof defaultContentOption['views'],
    // 广告配置
    advertisement: {} as typeof defaultContentOption['advertisement'],
    // 推荐配置
    recommend: {} as typeof defaultContentOption['recommend'],
  },
  mutations: {
    [RECEIVE_COMMON]: (state, common: Common) => {
      state.register = common.register;
      state.customer = common.customer;
      state.feedback = common.feedback;
      state.shopset = common.shopset;
      state.depositWithdrawal = common.depositWithdrawal;
      state.commentSet = common.commentSet;
      state.OrderBaseParam = common.OrderBaseParam;
    },
    [RECEIVE_TEMPLATE]: (state, content) => {
      state.views = content.views;
      state.advertisement = content?.advertisement;
      state.style = content?.style;
      state.recommend = content?.recommend;
      state.navigation = content?.navigation;
    },
  },
  actions: {
    /** 获取商城配置 */
    getShopCommon: async ({ commit }) => {
      const { data } = await reqCommonInfo();
      commit(RECEIVE_COMMON, data.data);
    },
    /** 点击导航时, 切换对应页面, 如当前页则不切换 */
    setTabBarIndex({ state, dispatch }, index?: number) {
      // 模板初次未加载完毕, 等待加载完毕再次调用
      if (templateLoading) {
        uni.$once('get-template-complete', () => dispatch('setTabBarIndex'));
        return false;
      }
      const pages = getCurrentPages();
      const beforePath = '/' + pages[pages.length - 1]?.route;
      const afterPath = state.navigation.contentEdit.navis[index ?? 0].pagePath;
      beforePath !== afterPath && redirectTo(afterPath);
    },
    /* 获得模板信息 */
    getTemplateInfo: async ({ commit, state }) => {
      const { data } = await reqGetDiyPage();
      if (!data.data.content) return false;
      data.data.content?.navigation.contentEdit.navis.forEach((v) => {
        v.pagePath = paramsAnaly(v.link.value.path, v.link.value.params);
      });
      commit(RECEIVE_TEMPLATE, data.data.content);
      if (state.advertisement.showForm === '每次') {
        uni.setStorageSync('advertisement', undefined);
      }
      // 模板初次加载完毕, 更改加载状态
      templateLoading = false;
      uni.$emit('get-template-complete');
    },
  },
  getters: {
    // 是否强制授权手机号
    forceAuthPhone: (state) => !!(state.register?.bind_phone === '1'),
    // 当前主题配色
    hexColor: (state) => getThemeColor(state.style).cssLightVariables,
    // 当前主题配色(rgba)
    rgbaColor: (state) => getThemeColor(state.style).cssLightOpacitys,
    // 主题边框矩形
    lineRectStyle: (state, getters) => {
      return {
        backgroundColor: getters.hexColor['--color-primary-light-9'],
        color: getters.hexColor['--color-primary'],
        borderColor: getters.hexColor['--color-primary'],
      };
    },
  },
});
