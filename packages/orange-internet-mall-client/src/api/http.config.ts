/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-07 10:18:13
 * @LastEditTime: 2021-05-17 17:57:04
 * @Description: 全局请求配置
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
// 使用具体参考luch-request官网: https://www.quanzhan.co/luch-request/guide/3.x/#example
import { PLATFORM } from '@/utils';
import Http from 'luch-request';
import { errorStrategy } from './error.strategy';
import siteinfo from '@/config/siteinfo';
const sourceFrom: Record<any, any> = {
  'mp-weixin': 'wx-mini',
  h5: 'h5',
};

/** 定义默认配置 */
const http = new Http({
  header: {
    from: sourceFrom[PLATFORM || ''],
    version: '1.0',
  },
});

if (process.env.NODE_ENV === 'development' && http.config.header) {
  http.config.baseURL =
    // 'https://tiyan.juzishop.cn/addons/weitshop_shop/weshop/public/index.php';
    // 'https://wq.weitshop.cn/addons/weitshop_shop/weshop/public/index.php/';
    'http://192.168.1.5:82/addons/weitshop_shop/weshop/public/index.php/';
  http.config.header['shopid'] = 14;
} else if (http.config.header) {
  http.config.baseURL = PLATFORM === 'h5' ? 'index.php/' : siteinfo.siteroot;
  http.config.header['shopid'] =
    PLATFORM === 'h5' ? window?.config?.shopid : siteinfo.shopid;
}

/** 添加请求拦截器 */
http.interceptors.request.use((config) => {
  if (config.custom?.loading) {
    uni.showLoading({ title: '加载中...' });
  }
  return config;
});

/** 添加响应拦截器 */
http.interceptors.response.use(
  (response) => {
    if (response.config.custom?.loading) uni.hideLoading();
    if (response.data.code != 0) {
      if (!response.config.custom?.preventToast) {
        const status = response.data.code || response.statusCode;
        errorStrategy[status]
          ? errorStrategy[status](response)
          : errorStrategy[1010101](response);
      }
      return Promise.reject(response);
    }
    return response;
  },
  (error) => {
    if (error.config.custom?.loading) uni.hideLoading();
    if (!error.config.custom?.preventToast) {
      const status = error?.data?.code || error?.statusCode;
      errorStrategy[status]
        ? errorStrategy[status](error)
        : errorStrategy[1010101](error);
    }

    return Promise.reject(error);
  }
);

export default http;
