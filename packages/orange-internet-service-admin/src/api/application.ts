/*
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-28 14:25:15
 * @LastEditTime: 2021-06-29 15:21:17
 * @Description: 应用接口
 * @LastEditors: Pan.Yu.Lin
 */
import http from './http.config'

/** 应用市场列表 */
export const reqProductAddons = (option: {
  page?: number
  limit?: number
  search?: { [key: string]: any }
}) => {
  return http.get<BaseRes>('business/product/list', { params: { type: 'addons', ...option } })
}

/** 已购买应用列表 */
export const reqAddonsIndex = (option: {
  page: number
  limit: number
  search?: { [key: string]: any }
}) => {
  return http.get<BaseRes>('business/addons/index', { params: option })
}

/** 已购买应用详情 */
export const reqAddonsRead = (option: { id: any }) => {
  return http.get<BaseRes>('business/addons/read', { params: option })
}

/** 修改已购应用上下架状态 */
export const reqAddonsMulti = (option: { id: any; params: { is_sale: Key } }) => {
  return http.post<BaseRes>('business/addons/multi', option)
}

/** 设置应用 */
export const reqAddonsEdit = (option: any) => {
  return http.post<BaseRes>('business/addons/edit', option)
}

/** 应用分类列表 */
export const reqAddonsClassIndex = () => {
  return http.post<BaseRes>('business/AddonsClass/index')
}
/** 行业分类列表 */
export const reqIndustryClassIndex = () => {
  return http.post<BaseRes>('business/IndustryClass/index')
}
/** 下单购买市场应用 */
export const reqPaypay = (option: any) => {
  return http.post<BaseRes>('api/pay/pay', {
    type: 1,
    service_manager_id: 1,
    system_id: 1,
    ...option
  })
}
/** 应用安装 */
export const reqSystemInstallAddons = (option: { unique_key: string }) => {
  return http.post<BaseRes>('business/System/installAddons', option)
}
