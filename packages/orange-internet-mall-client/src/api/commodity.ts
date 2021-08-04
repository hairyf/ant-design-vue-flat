/*
 * @Author: Mr.Mao
 * @Date: 2021-04-12 20:42:11
 * @LastEditTime: 2021-05-08 11:09:06
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import http from './http.config';

/** 商品参数列表 */
export const reqGoodsParam = (id: Key) => {
  return http.post<BaseRes<ListRes>>('/shop/AppGoods/goodsParam', {
    id,
    limit: 100000,
  });
};
/** 商品详情 */
export const reqGoodsDetail = (id: Key) => {
  return http.post<BaseRes>('shop/AppGoods/list', { id });
};
/** 商品分类列表 */
export const reqGoodClassList = () => {
  return http.post<BaseRes<ListRes>>(
    'shop/AppGoods/classIndex',
    {},
    { custom: { loading: true } }
  );
};
/** 商品列表 */
export const reqGoodsList = (id: Key) => {
  return http.post<BaseRes<ListRes>>('shop/appGoods/list', {
    classId: id,
  });
};
/** 筛选商品列表*/
export const reqGoodsScreenList = (options: ScreenParameter) => {
  return http.post<BaseRes<ListRes>>('/shop/appGoods/list', options);
};
export const reqSearchGoods = (options: Key) => {
  return http.post<BaseRes>('/shop/appGoods/list', { title: options });
};
/** 推荐商品列表 */
export const reqHotGoods = () => {
  // return http.post();
};
