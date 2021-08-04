/*
 * @Author: Zhilong
 * @Date: 2021-06-21 17:57:12
 * @LastEditTime: 2021-06-29 14:49:07
 * @Description:套餐api‘
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */

import { http } from './http.config'

/** 已购套餐详情
 * @name 文龙-已购套餐详情
 */
export const reqBoughtSetMeal = () => {
  return http.get<BaseRes>('/api/system/detail', { custom: { preventHandleError: true } })
}

/** 系统套餐列表
 * @name 文龙-系统套餐列表
 */
export const reqSetMealList = (params: ListReqOpts) => {
  return http.get<BaseRes<ListRes>>('/api/system/index', { params })
}

/** 购买系统套餐
 * @name 文龙-购买系统套餐
 */
export const reqPaySetMeal = (option: {
  // 对应的产品id
  associate_id: number
  // 对应的订单类型: 1:应用订单、2:渠道订单、3:模板订单、4:主题订单 5:套餐订单
  type: Key
  // 支付标识
  code: string
}) => http.post<BaseRes>('/api/order/pay', option)

/** 单个系统套餐详情
 * @name 文龙-系统套餐列表详情
 */
export const reqSetMealDetail = (params: {
  // 系统套餐ID
  id: Key
}) => http.get<BaseRes>('/api/system/read', { params })

/** 下载安装文件
 * @name 彭海 - 下载安装文件
 */
export const reqDownloadSystemUrl = (option: {
  // 系统ID
  system_id?: Key
}) => http.post<BaseRes>('api/System/downloadInstall', option)

/** 激活确认
 * @name 彭海 - 激活确认
 */
export const reqAuthConfirm = (option: {
  // 系统ID
  system_id?: Key
}) => http.post<BaseRes>('api/System/authConfirm', option)
