import store from '@/store';
import { DELETE_USER_INFO, RECEVE_AUTH_PHONE_CODE } from '@/store/types';
import { HttpResponse } from 'luch-request';
import { redirectToLogin } from '@/utils';
/*
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-27 21:56:52
 * @LastEditTime: 2021-04-29 21:16:36
 * @Description:
 * @LastEditors: Mr.Mao
 */
export const errorStrategy: any = {
  // 默认处理函数(如果不需要处理的错误码都将经过这里)
  1010101: (response: HttpResponse<any>) => {
    if (response?.data?.msg) {
      uni.showToast({ title: response.data.msg, icon: 'none' });
    } else {
      uni.showToast({
        title: `请求异常, 错误码: ${response?.statusCode}`,
        icon: 'none',
      });
    }
  },
  // 当前登录过期
  403: () => {
    store.commit(DELETE_USER_INFO);
    redirectToLogin();
  },
  401: () => {
    store.commit(DELETE_USER_INFO);
    redirectToLogin();
  },
  5000: () => {},
  // 需要再次授权信息
  20006: () => {
    store.commit(RECEVE_AUTH_PHONE_CODE, true);
    redirectToLogin();
  },
};
