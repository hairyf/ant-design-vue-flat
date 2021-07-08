/*
 * @Author: Mr.Mao
 * @Date: 2021-06-24 10:12:52
 * @LastEditTime: 2021-06-25 14:16:48
 * @Description:
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import http from './http.config'

/** 服务商列表 */
export const reqProviderList = (
  option: ListReqOpts<{
    account?: string
    over_status?: Key
    system_status?: Key
    auth_time?: Key
    over_time?: Key
    type?: Key
  }>
) => {
  return http.get<BaseRes<ListRes>>('admin/Service/index', { params: option })
}

/** 服务商详情 */
export const reqProviderDetail = (option: { id?: Key; user_id?: Key }) => {
  return http.get<BaseRes<ServiceProviderInfo>>('admin/Service/read', {
    params: option,
    custom: { preventHandleError: true }
  })
}
/** 服务商相关详情统计 */
export const reqServiceCount = (option: { user_id: Key }) => {
  return http.get<BaseRes>('admin/service/count', { params: option })
}
/** 服务商启用|禁用 */
export const reqServiceMulti = (option: {
  ids: Key[]
  params: { system_status: Key }
  admin_password: string
}) => {
  return http.post('admin/Service/multi', option)
}
/** 服务商商品启用|禁用 */
export const reqOrderItemsMulti = (option: {
  ids: Key[]
  params: { status: Key }
  admin_password: string
}) => {
  return http.post('admin/OrderItems/multi', option)
}
/** 服务商商品相关列表 */
export const reqProviderOrderList = (
  option: ListReqOpts<{ associate?: Key; type?: Key; user_id: Key }>
) => {
  return http.get<BaseRes<ListRes>>('admin/OrderItems/index', { params: option })
}
