/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-11 18:42:22
 * @LastEditTime: 2021-01-22 14:44:18
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { paramsAnaly } from './calculation';

// 微信路由跳转封装
export const navigateTo = (url: string, params: WillObject = {}) => {
  uni.navigateTo({ url: paramsAnaly(url, params) });
};
export const reLaunch = (url: string, params: WillObject = {}) => {
  uni.reLaunch({ url: paramsAnaly(url, params) });
};
export const switchTab = (url: string, params: WillObject = {}) => {
  uni.switchTab({ url: paramsAnaly(url, params) });
};
export const redirectTo = (url: string, params: WillObject = {}) => {
  uni.redirectTo({ url: paramsAnaly(url, params) });
};
export const navigateBack = (delta = 1) => {
  uni.navigateBack({ delta });
};
export const $uni = (uni as any) as PromiseUni<UniApp.Uni>;

export const lookMap = (
  latitude: string | number,
  longitude: string | number
) => {
  if (typeof latitude === 'string') latitude = Number(latitude);
  if (typeof longitude === 'string') longitude = Number(longitude);
  return $uni.openLocation({ latitude, longitude });
};
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

export const PLATFORM =
  typeof process !== 'undefined'
    ? (process?.env?.VUE_APP_PLATFORM as UniPlatforms)
    : undefined;
