/*
 * @Author: Mr.Mao
 * @Date: 2021-04-12 20:42:43
 * @LastEditTime: 2021-05-11 21:30:56
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import { defaultContentOption } from 'orange-components-config/options';
import http from './http.config';

/** 返回全局配置 */
export const reqCommonInfo = () => {
  return http.get<BaseRes<Common>>('shop/Common/init');
};
/** 城市列表 */
export const reqCitiesList = (data: { classify: Key; parent_id: Key }) => {
  return http.post<BaseRes>('/shop/Dispatch/cityIndex', data);
};
/** 热门搜索关键词 */
export const reqHotKeyWord = () => {
  return http.get('shop/Common/hotSearch');
};
/** 获得可用充值支付类型 */
export const reqGetDeposit = () => {
  return http.get<BaseRes>('shop/ShopUserDeposit/gotoRecharge', {
    custom: { loading: true },
  });
};
/** 立即充值 */
export const reqFastRecharge = (options: Recharge) => {
  return http.post<BaseRes>('shop/ShopUserDeposit/doRecharge', options);
};
/** 获取模板以及diy页面 */
export const reqGetDiyPage = () => {
  type Template = BaseRes<TemplateInfo<typeof defaultContentOption>>;
  return http.get<Template>('/shop/ShopDiyTemplate/template');
};
/** 文件上传 */
export const reqUpload = (filePath: string, group_type?: Key) => {
  return http.upload<BaseRes>('shop/clientUpload/add', {
    filePath,
    name: 'file',
    formData: {
      group_type: group_type || 1,
    },
    custom: { loading: true },
  });
};
/* 获取商城公告 */
export const reqShopNotice = (params: TNotice) => {
  return http.get<BaseRes>('shop/Notice/list', { params });
};
/* 获取商城版权信息 */
export const reqIndexGetCopyright = () => {
  return http.get<BaseRes>('shop/Index/getCopyright');
};
/**
 * 获取虚拟会员下单信息
 * @param {number} goods_id
 * @param {number} limit
 */
export const reqCompleteOrderInfo = (params: {
  goods_id?: number;
  limit?: number;
}) => {
  return http.get<BaseRes>('/shop/virtualUser/list', { params });
};
