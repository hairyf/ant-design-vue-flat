/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-11 18:42:22
 * @LastEditTime: 2021-05-12 14:48:27
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { paramsAnaly } from '.';

/** uniapp 路由跳转封装 */
export const navigateTo = (url: string, params: WillObject = {}) => {
  uni.navigateTo({ url: paramsAnaly(url, params) });
};
/** uniapp 路由跳转封装 */
export const reLaunch = (url: string, params: WillObject = {}) => {
  uni.reLaunch({ url: paramsAnaly(url, params) });
};
/** uniapp 路由跳转封装 */
export const switchTab = (url: string, params: WillObject = {}) => {
  uni.switchTab({ url: paramsAnaly(url, params) });
};
/** uniapp 路由跳转封装 */
export const redirectTo = (url: string, params: WillObject = {}) => {
  uni.redirectTo({ url: paramsAnaly(url, params) });
};
/** uniapp 路由跳转封装 */
export const navigateBack = (delta = 1) => {
  uni.navigateBack({ delta });
};
/** uniapp 修复异步类型 */
export const $uni = (uni as any) as PromiseUni<UniApp.Uni>;

/**
 * 跳转查看地图(自动转换类型)
 * @param latitude 精度
 * @param longitude 维度
 * @returns 查看地图
 */
export const openLocation = (latitude: Key, longitude: Key) => {
  if (typeof latitude === 'string') latitude = Number(latitude);
  if (typeof longitude === 'string') longitude = Number(longitude);
  return $uni.openLocation({ latitude, longitude });
};

/**
 * 弹出提示窗
 * @param options 提示窗配置
 * @returns Promise<true>
 */
export const showToast = (options: UniApp.ShowToastOptions) => {
  const duration = options.duration || 1500;
  uni.showToast({
    ...options,
    duration,
  });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
};

/**
 * 当前环境信息
 */
export const PLATFORM =
  typeof process !== 'undefined'
    ? (process?.env?.VUE_APP_PLATFORM as UniPlatforms)
    : undefined;

/**
 * 拨打电话
 * @param phoneNumber 电话号码
 */
export const makePhoneCall = (phoneNumber: string) => {
  if (PLATFORM === 'h5') {
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = `tel:${phoneNumber}`;
    document.body.appendChild(link);
    link.click();
  } else {
    uni.makePhoneCall({ phoneNumber });
  }
};
