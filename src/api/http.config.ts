/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-11 18:42:22
 * @LastEditTime: 2021-05-29 15:35:54
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
// 使用具体参考luch-request官网: https://www.quanzhan.co/luch-request/guide/3.x/#example
import Http from 'luch-request';
import { ERROR_STRATEGY, STRATEGY_KEYS } from '@/api/error.strategy';
import siteinfo from '@/siteinfo';
import { w7RequestStrategy } from './w7.stategy';
// const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {};
// console.log('extConfig', extConfig);

/** 定义默认配置 */
const http = new Http({
  //http://192.168.3.183/app/index.php/
  baseURL: siteinfo.siteroot,
  header: {
    ...siteinfo,
  },
});

/** 添加请求拦截器 */
http.interceptors.request.use((config) => {
  // config.url = 'api/' + config.url;
  if (config.params) {
    type W7RequestKey = keyof typeof w7RequestStrategy;
    config.params.i = siteinfo.uniacid;
    config.params.c = 'entry';
    config.params.a = 'wxapp';
    config.params.m = 'rent_systems';
    const url = config?.url?.split('/api/');
    config.params.do =
      w7RequestStrategy[(url?.[1] || url?.[0]) as W7RequestKey];
    console.log(config.params.do, config.url, 'do');
    config.url = '';
  }
  if (config.custom?.loading) {
    uni.showLoading({ title: '加载中...' });
  }
  return config;
});
/** 添加响应拦截器 */
http.interceptors.response.use(
  (response) => {
    if (response.config.custom?.loading) {
      uni.hideLoading();
    }
    response.data = response.data.data;
    console.log(response, 'rre');
    return response;
  },
  (error) => {
    if (error.config.custom?.loading) {
      uni.hideLoading();
    }
    console.log(error, 'error');
    // 处理所有错误信息
    if (
      typeof error.config.custom?.errorhandle === 'undefined' ||
      error.config.custom?.errorhandle
    )
      ERROR_STRATEGY[(error.statusCode ?? 1000) as STRATEGY_KEYS](error);
    return Promise.reject(error);
  }
);

export default http;
