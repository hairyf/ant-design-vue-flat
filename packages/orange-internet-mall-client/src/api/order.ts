/*
 * @Author: Mr.Mao
 * @Date: 2021-04-12 20:40:14
 * @LastEditTime: 2021-05-14 12:32:50
 * @Description:
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import http from './http.config';

/** 下单 */
export const reqPlaceOrder = (data: {
  discountsID?: Key;
  addresId?: Key;
  goods: any[];
  remark: string;
  source?: any;
}) => {
  return http.post<BaseRes>('/shop/AppOrder/downOrder', { param: data });
};
/** 获取订单列表 */
export const reqGetOrderList = (option: ListReqOpts<{ status?: Key }>) => {
  return http.post<BaseRes>('/shop/AppOrder/orderIndex', option, {
    custom: { loading: true },
  });
};
/** 确定收货 */
export const reqConfirmReceipt = (id: number) => {
  return http.post<BaseRes>('/shop/AppOrder/takeDelivery', { id });
};
/** 获取订单详情 */
export const reqGetOrderDetial = (id: Key, goodsId?: Key) => {
  return http.post(
    '/shop/AppOrder/orderDetail',
    { id, order_item_id: goodsId },
    { custom: { loading: true } }
  );
};
/** 查看物流接口 */
export const reqSeeLogiStics = (id: Key) => {
  return http.post<BaseRes>('/shop/AppOrder/logistics', { id });
};
/** 取消订单 */
export const reqCancelOrder = (id: Key) => {
  return http.post<BaseRes>('/shop/AppOrder/cancel', { id });
};
/** 去支付 */
export const reqToPay = (ids: Key, payType: Key) => {
  return http.post<BaseRes>('/shop/AppOrder/pay', { ids, payType });
};
/** 维权申请和修改申请 */
export const reqApplyRight = (options: any) => {
  return http.post<BaseRes>('/shop/AppOrder/applyAfterSales', options);
};
// 订单商品信息
export const reqOrderInfo = (id: number) => {
  return http.post<BaseRes>('/shop/AppOrder/orderGoods', { id });
};
// 获取维权列表
export const reqRightsList = (options?: CollectList) => {
  return http.post<BaseRes>('/shop/AppOrder/afterSalesIndex', options);
};
// 结算
export const reqSettleAccounts = (data: {
  discountsID?: Key;
  addresId?: Key;
  goods: any[];
}) => {
  return http.post<BaseRes>('/shop/AppOrder/settleAccounts', { param: data });
};
// 修改订单地址
export const reqEditOrderAddress = (data: any) => {
  return http.post<BaseRes>('/shop/AppOrder/orderEditAddres', data, {
    custom: { loading: true },
  });
};
// 获取支付方式
export const reqGetPayMethod = () => {
  return http.post<BaseRes>('/shop/AppOrder/getPayType');
};
// 获得评价列表
export const reqGetComment = (data: ListReqOpts<{ goods_id: Key }>) => {
  return http.get<BaseRes>('shop/comment/clist', {
    params: data,
  });
};
// 添加售后评价
export const reqSubmitAfter = (options: {
  after_sale_id: Key;
  score: Key;
  content: Key;
}) => {
  return http.post<BaseRes>('shop/commentSale/save', options);
};

// 维权订单删除
export const reqDeleteRecord = (options: { id: Key }) => {
  return http.post<BaseRes>('shop/AppOrder/afterSaleOrderDel', options);
};
// 协调记录
export const reqCoordinationRecord = (options: {
  order_id: Key;
  order_item_id: Key;
  order_after_sale_id: Key;
}) => {
  return http.post<BaseRes>('shop/AppOrder/afterSaleLog', options);
};
// 换货确定收货
export const reqExchangeGoods = (options: {
  order_after_sale_id: Key;
  order_id: Key;
  order_item_id: Key;
}) => {
  return http.post<BaseRes>(
    'shop/AppOrder/applyAfterSalesLogisticsTakeDelivery',
    options
  );
};
// 获取可评价的列表
export const reqEvaluatedList = (options: { order_id: Key }) => {
  return http.get<BaseRes>('shop/comment/manyClist', { params: options });
};
// 添加多个商品评价
export const reqAddComments = (options: { row: Key[] }) => {
  return http.post<BaseRes>('shop/comment/adds', options);
};
/** 维权再次申请 */
export const reqApplyProtectionAgain = (options: any) => {
  return http.post<BaseRes>('shop/AppOrder/againapplyAfterSales', options);
};
/**支付成功 */
export const reqPaySuccess = (ids: Key[]) => {
  return http.post('shop/AppOrder/orderSucces', { ids });
};
