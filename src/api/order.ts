/*
 * @Author: Zhilong
 * @Date: 2021-06-08 17:59:03
 * @LastEditTime: 2021-06-29 10:47:23
 * @Description:订单api
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */

import http from './http.config'

interface shopListFilter {
  //	订单号。产品名称
  osid?: Key
  //	订单类型: 1插件(应用) 2模板 3渠道 4.主题 5容量 6:套餐订单
  type?: Key
  //	订单状态:-1=已取消,0=未支付,2=已完成
  status?: Key
  //	支付标识 WxPay AliPay BalancePay
  pay_code?: string
  //	创建时间
  createtime?: Key[] | Key
  //	完成时间
  finshtime?: Key[] | Key
  //	取消时间
  canceltime?: Key[] | Key
}

/** 获取营业店铺列表
 * @description 张泽林-营业店铺
 */
export const reqBusinessOrderList = (option: ListReqOpts<shopListFilter>) =>
  http.post<BaseRes<ListRes>>('/business/ServicesShopOrder/businessShop', option)

/** 获取试用店铺列表
 * @description 张泽林-试用店铺
 */
export const reqTryOutOrderList = (option: ListReqOpts<shopListFilter>) =>
  http.post<BaseRes<ListRes>>('/business/ServicesShopOrder/tryOutShop', option)

/** 获取营业店铺详情
 * @description 张泽林-营业店铺查看
 */
export const reqBusinessShopDetails = (option: { search: { id: string } }) => {
  return http.post<BaseRes<ListRes>>('/business/ServicesShopOrder/businessShop', option)
}

/** 获取试用店铺详情
 * @description 张泽林-试用店铺查看
 */
export const reqTryOutShopDetails = (option: { search: { id: Key } }) => {
  return http.post<BaseRes>('/business/ServicesShopOrder/tryOutShop', option)
}

/** 设置订单备注
 * @description 张泽林-订单备注
 */
export const reqOrderRemark = (option: { id: Key; service_remark: string }) => {
  return http.post<BaseRes>('/business/ServicesShopOrder/serviceRemark', option)
}

/** 取消订单
 * @description 张泽林-取消订单
 */
export const reqCancelOrder = (option: { id: Key; cancel_remark: string }) => {
  return http.post<BaseRes>('/business/ServicesShopOrder/cancel', option)
}

/** 获取平台订单列表
 * @description 张泽林-平台订单
 */
export const reqPlatformOrderList = (option: ListReqOpts<shopListFilter>) => {
  return http.get<BaseRes<ListRes>>('/business/ServicesShopOrder/platformShop', { params: option })
}

/** 平台取消订单
 * @description 张泽林-平台取消订单
 */
export const reqCancelPlatformOrder = (option: { id: Key }) => {
  return http.get<BaseRes>('/business/ServicesShopOrder/platformCancel', { params: option })
}

/** 获取营业店铺详情
 * @description 张泽林-营业店铺查看
 */
export const reqPlatformOrderDetails = (option: { id: Key }) => {
  return http.get<BaseRes<ListRes>>('/business/ServicesShopOrder/platformShopDetail', {
    params: option
  })
}

/** 获取订单设置
 * @description 张泽林-获取订单设置
 */
export const reqOrderSetting = () => http.post<BaseRes>('/business/Config/getOrder')

/** 保存订单设置
 * @description 张泽林-设置订单设置
 */
export const reqSetOrder = (option: {
  // 	0禁用1开启 默认开启
  status: Key
  value: {
    // 1 开启 0 关闭
    type: Key
    //  时间 单位分钟
    time: Key
  }
}) => http.post<BaseRes>('/business/Config/setOrder', option)

/** 获取支付方式
 * @description 张泽林 --获取支付方式
 */
export const reqOrderPaymentMode = () => {
  return http.get<BaseRes>('/business/ServicesShopOrder/getpay')
}

/** 获取平台支付方式
 * @description 张泽林 --获取平台支付方式
 */
export const reqPlatformPaymentMode = () => {
  return http.get<BaseRes>('/business/ServicesShopOrder/getPlatformPay')
}

/** 订单确认支付
 * @description 张泽林 --订单确认支付
 * @param type {number} 0=营业店铺 1=短信列表 2=试用店铺
 */
export const reqConfirmPayment = (option: {
  // 订单ID
  id: Key
  // 原因
  admin_pay_remark: string
  // 订单类型
  type: number
}) => {
  const typeArr = ['confirmPayment', 'buySmsConfirmPayment', 'tryOutShopConfirmPayment']
  http.post<BaseRes>('/business/ServicesShopOrder/' + typeArr[option.type], {
    id: option.id,
    admin_pay_remark: option.admin_pay_remark
  })
}

/** 营业订单导出
 * @description 张泽林 --营业订单导出
 */
export const reqBusinessExport = (option: ListReqOpts<shopListFilter>) => {
  return http.post('/business/Educe/businessShopEduce', option, { responseType: 'arraybuffer' })
}

/** 试用订单导出
 * @description 张泽林 -- 试用订单导出
 */
export const reqTryOutExport = (option: ListReqOpts<shopListFilter>) => {
  return http.post('/business/Educe/tryOutShopEduce', option, { responseType: 'arraybuffer' })
}

/** 短信订单导出
 * @description 张泽林 --短信订单导出
 */
export const reqSMSExport = (option: ListReqOpts<shopListFilter>) => {
  return http.post('/business/Educe/buySmsEduce', option, { responseType: 'arraybuffer' })
}

/** 平台订单导出
 * @description 张泽林 --平台订单导出
 */
export const reqPlatformExport = (params: ListReqOpts<shopListFilter>) => {
  return http.get('/business/Educe/platformShopEduce', { params, responseType: 'arraybuffer' })
}
