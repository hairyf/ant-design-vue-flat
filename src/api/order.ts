/*
 * @Author: Mr.wang
 * @Date: 2021-06-17 15:50:33
 * @LastEditTime: 2021-06-24 15:09:20
 * @Description:
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/*
 * @Author: Zhilong
 * @Date: 2021-06-08 17:59:03
 * @LastEditTime: 2021-06-10 16:38:27
 * @Description:订单api
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */

import http from './http.config'
/** 订单列表
 * @description 张泽林-- 订单列表
 */
export const reqBusinessOrderList = (
  option: ListReqOpts<{
    //	订单号。产品名称
    osid?: string
    //	订单类型: 1插件(应用) 2模板 3渠道 4.主题 5容量 6:套餐订单
    type?: Key
    //	订单状态:-1=已取消,0=未支付,2=已完成
    status?: Key
    //	支付标识 WxPay AliPay BalancePay
    pay_code?: string
    //	创建时间
    createtime?: Key[] | Key
  }>
) => http.get<BaseRes<ListRes>>('/admin/Order/index', { params: option })

/** 取消订单
 * @description 张泽林-取消订单
 */
export const reqCancelOrder = (option: { id: Key }) => {
  return http.post<BaseRes>('/admin/Order/cancel', option)
}
/** 确认支付
 * @description 张泽林-- 确认支付
 */
export const reqConfirmPayment = (option: { id: Key; admin_password: Key }) => {
  return http.post<BaseRes>('/admin/Order/confirmPayment', option)
}
/** 订单列表详细
 * @description 张泽林-- 订单列表详细
 */
export const reqOrderDetails = (option: { id: Key }) => {
  return http.post<BaseRes>('/admin/Order/orderDetail', option)
}
