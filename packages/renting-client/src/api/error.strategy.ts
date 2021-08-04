/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2020-11-30 13:40:09
 * @LastEditTime: 2021-02-05 18:32:15
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import store from '@/store';
import { navigateTo, redirectTo } from '@/utils';
import { HttpError } from 'luch-request';
const loggerError = (errMsg: string, callback?: () => void) => {
  uni.showToast({ title: errMsg, icon: 'none', mask: true });
  setTimeout(() => callback?.(), 1500);
};
export const ERROR_STRATEGY = {
  /** 该请求参数不正确 */
  400: (err: HttpError) => loggerError(err.data?.msg ?? '请求错误'),
  /** 该请求需要用户登录 */
  401: (err: HttpError) => {
    store.dispatch('delectUserInfo');
    loggerError('登录已过期, 请重新登录!', () => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (/baseTabBars/.test(currentPage.route || '')) {
        navigateTo('/pages/commons/login');
      } else {
        redirectTo('/pages/commons/login');
      }
    });
  },
  /** 该请求未得到授权 */
  403: (err: HttpError) => loggerError('未得到授权!'),
  /** 该请求地址不存在 */
  404: (err: HttpError) => loggerError('请求地址不存在!'),
  /** 该请求验证错误 */
  422: (err: HttpError) => loggerError(err.data?.msg || '该请求验证错误'),
  /** 服务器内部异常 */
  500: (err: HttpError) => loggerError('服务器内部异常, 请联系技术人员!'),
  /** 服务器授权异常 */
  501: (err: HttpError) => loggerError('解析手机号错误, 请点击再次授权'),
  /** 服务器请求超时 */
  1000: (err: HttpError) => loggerError('服务器请求超时!'),
};

export type STRATEGY_KEYS = keyof typeof ERROR_STRATEGY;
