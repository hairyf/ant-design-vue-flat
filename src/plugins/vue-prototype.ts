/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-09 10:05:28
 * @LastEditTime: 2021-02-24 09:35:26
 * @Description: 原型挂载方法, 便于模板中直接使用数据和方法
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Vue from 'vue';
import {
  filterOutNumber,
  navigateBack,
  navigateTo,
  redirectTo,
  reLaunch,
  switchTab,
  format,
  lookMap,
  numberToChinese,
} from '@/utils';
import siteinfo from '@/siteinfo';
const systemInfo = uni.getSystemInfoSync();
// 挂载系统设置信息
Vue.prototype.$systemInfo = systemInfo;
// 自定义头部导航栏顶部偏移值
Vue.prototype.$customNavbarOffsetTop =
  systemInfo.platform == 'ios' ? 44 : 48 + systemInfo.statusBarHeight;
// 自定义底部导航栏高度值
Vue.prototype.$customTabBarHeight =
  systemInfo.model.search('iPhone X') !== -1 ? 82 : 50;
// 挂载跳转方法
Vue.prototype.$navigateBack = navigateBack;
Vue.prototype.$navigateTo = navigateTo;
Vue.prototype.$redirectTo = redirectTo;
Vue.prototype.$reLaunch = reLaunch;
Vue.prototype.$switchTab = switchTab;
// 挂载过滤方法
Vue.prototype.$filterOutNumber = filterOutNumber;
Vue.prototype.$format = format;
Vue.prototype.$lookMap = lookMap;
Vue.prototype.$numberToChinese = numberToChinese;
Vue.prototype.$siteinfo = siteinfo;
