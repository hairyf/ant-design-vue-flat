/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-07 10:18:13
 * @LastEditTime: 2021-04-12 21:16:20
 * @Description: 接口入口
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config';
/* api->index.ts 统一命名规范
 * 1. 接口暴露前缀统一为req -> request(请求)
 * 2. 需详细描述数据时, 在src/types/response.d.ts中声明
 * Template: export const req[name] = () => http.get("/api/list")
 */
/** 暴露请求配置 */

/**维权详情 */
export const reqLegitimateDetail = (id: Key, goodsId: Key) => {
  return http.post('/shop/AppOrder/applyAfterSalesDetail', {
    id,
    order_item_id: goodsId,
  });
};
/**取消维权 */
export const reqCancelLegitimate = (
  orderId: Key,
  orderItemId: Key,
  orderAfterSaleId: Key
) => {
  return http.post('/shop/AppOrder/afterSalesCancel', {
    order_id: orderId,
    order_item_id: orderItemId,
    order_after_sale_id: orderAfterSaleId,
  });
};
// 单独物流查询
export const reqCheckLogistics = (
  send_express_company_code: Key,
  send_express_sn: Key
) => {
  return http.post<BaseRes>('/shop/Order/snLogistics', {
    send_express_company_code,
    send_express_sn,
  });
};
// 协调记录 没做
export const reqafterSaleLog = (
  orderId: Key,
  orderItemId: Key,
  orderAfterSaleId: Key
) => {
  return http.post<BaseRes>('/shop/Order/afterSaleLog', {
    order_id: orderId,
    order_item_id: orderItemId,
    order_after_sale_id: orderAfterSaleId,
  });
};
// 退款状态
export const reqRefundStatus = (orderId: Key, orderItemId: Key) => {
  return http.post<BaseRes>('/shop/AppOrder/refundStatus', {
    order_id: orderId,
    order_item_id: orderItemId,
  });
};
// 物流公司列表
export const reqLogisticsList = (options: any) => {
  return http.post<BaseRes>('/shop/Order/logisticsList', options);
};
// 维权退货填写物流
export const reqApplyAfterSales = (options: any) => {
  return http.post<BaseRes>(
    '/shop/AppOrder/applyAfterSalesRetreatLogistics',
    options
  );
};
// 添加售后评价
export const reqAddComment = (options: {
  after_sale_id: Key;
  score: string;
  content: string;
}) => {
  return http.post<BaseRes>('/shop/commentSale/save', {
    after_sale_id: options.after_sale_id,
    score: options.score,
    content: options.content,
  });
};
// 协商历史
export const reqNegotiationHitory = (
  orderId: Key,
  orderItemId: Key,
  orderAfterSaleId: Key
) => {
  return http.post<BaseRes>('/shop/AppOrder/afterSaleLog', {
    order_id: orderId,
    order_item_id: orderItemId,
    order_after_sale_id: orderAfterSaleId,
  });
};
