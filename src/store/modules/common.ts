/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-07 10:38:14
 * @LastEditTime: 2021-06-18 10:35:49
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { reqCommon, reqLocation, reqOwnerCard } from '@/api';
import { showToast } from '@/utils';
import createModule from '@/utils/vuex-create-module';
import * as t from '../types';
export default createModule({
  state: {
    // 应用名称
    name: '',
    // 应用图标
    logo: '',
    // 地址信息
    city: {} as Commons['citydata'],
    // 版本信息
    version: {} as Commons['versiondata'],
    // 上传信息
    upload: {} as Commons['uploaddata'],
    // 轮播图信息
    cover: {} as Commons['coverdata'],
    // 地址信息
    location: {
      id: '' as Key,
      name: '',
    },
    // 房东列表信息
    houseMasters: {} as HouseMasters,
  },
  mutations: {
    [t.RECEVE_COMMON](state, common: Commons) {
      state.city = common.citydata;
      state.version = common.versiondata;
      state.upload = common.uploaddata;
      state.cover = common.coverdata;
      state.name = common.name;
      state.logo = common.logo;
    },
    [t.RECEVE_LOCATION](state, location) {
      state.location = location;
    },
    [t.RECEVE_HOUSE_MASTER](state, houseMasters) {
      state.houseMasters = houseMasters;
    },
  },
  actions: {
    /** 获取公共配置 */
    async getCommonConfig({ commit }) {
      const { data } = await reqCommon();
      commit(t.RECEVE_COMMON, data);
    },
    /** 获取 IP 地址信息 */
    async getIpLocation({ commit }) {
      const { data } = await reqLocation();
      if (
        this.state.common.location.name != '' &&
        data.name != this.state.common.location.name
      ) {
        uni.showModal({
          content: `位置发生变化，是否定位到${data.name}`,
          success: async (res) => {
            if (res.confirm) {
              commit(t.RECEVE_LOCATION, data);
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          },
        });
      } else {
        console.log(48646484684861);
        commit(t.RECEVE_LOCATION, data);
      }
    },
    /** 获取房东信息 */
    async getAdmins({ commit }) {
      const { data } = await reqOwnerCard();
      commit(t.RECEVE_HOUSE_MASTER, data);
    },
  },
});
