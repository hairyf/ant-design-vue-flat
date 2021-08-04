/*
 * @Author: Pan.Yu.Lin
 * @Date: 2021-06-04 15:17:51
 * @LastEditTime: 2021-06-15 09:38:22
 * @Description:
 * @LastEditors: Pan.Yu.Lin
 */
import http from './http.config'

/** 模板市场列表 */
export const reqProductAddons = (option: {
  page?: number
  limit?: number
  search?: { [key: string]: any }
}) => {
  return http.get<BaseRes>('business/product/list', { params: { type: 'template', ...option } })
}

/** 已购模板市场列表 */
export const reqTemplateIndex = (option: {
  page?: number
  limit?: number
  search?: { [key: string]: any }
}) => {
  return http.get<BaseRes>('business/Template/index', { params: option })
}
/** 已购买模板详情 */
export const reqTemplateRead = (option: { id: any }) => {
  return http.get<BaseRes>('business/Template/read', { params: option })
}
/** 设置模板 */
export const reqTemplateEdit = (option: any) => {
  return http.post<BaseRes>('business/template/edit', option)
}

/** 模板分类列表 */
export const reqTemplateClassIndex = () => {
  return http.post<BaseRes>('/business/TemplateClass/index')
}
/** 下单购买市场应用 */
export const reqPaypay = (option: any) => {
  return http.post<BaseRes>('/api/pay/pay', {
    type: 3,
    service_manager_id: 1,
    system_id: 1,
    ...option
  })
}
/** 修改已购模板上下架状态 */
export const reqTemplateMulti = (option: { id: Key; params: { [key: string]: any } }) => {
  return http.post<BaseRes>('business/template/multi', option)
}
