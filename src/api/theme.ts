/*
 * @Author: Mr.Mao
 * @Date: 2021-06-10 15:46:08
 * @LastEditTime: 2021-06-30 10:10:26
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import { platBaseUrl } from '@/config'
import store from '@/store'
import { defaultThemeOption } from '@/store/modules/theme'
import http from './http.config'

export type ThemeItemType = { [key: string]: any; content: typeof defaultThemeOption }
export type ThemeListResType = BaseRes<ListRes<ThemeItemType>>

/** 产品市场（主题） */
export const reqProductThemeList = (
  option: ListReqOpts<{ name?: string; price?: string }, { type: string }>
) => {
  return http.get<ThemeListResType>('/business/product/list', {
    params: option
  })
}

// /** 下单购买主题 */
// export const reqPlaceThemeOrder = (option: PlaceAnOrderConfig) => {
//   return http.post<BaseRes<PaymentConfig>>('/business/product/pay', option, {
//     baseURL: store.state.common.info.service_domain
//   })
// }
/** 下单购买主题 */
export const reqPlaceThemeOrder = (option: PlaceAnOrderConfig) => {
  return http.post<BaseRes<PaymentConfig>>('/business/product/pay', option)
}
/** 已购买主题 */
export const reqBackendUiThemeList = (option: ListReqOpts<{ name?: string }>) => {
  return http.get<BaseRes<ListRes>>('/business/backendUi/index', {
    params: option
  })
}

/** 续费支付 */
export const reqGoPayOrder = (option: IGoPayOrder) => {
  return http.post<BaseRes<PaymentConfig>>('/business/product/gopay', option)
}

/** 修改上下架状态 */
export const reqEditThemeItemMulti = (id: Key, is_sale: Key) => {
  return http.post<BaseRes>('business/backendui/multi', { id, params: { is_sale } })
}

/** 设置主题配置 */
export const reqEditThemeItemOption = (option: {
  id: Key
  name: string
  remark: string
  is_sale: Key
  sale_spec: any[]
  buy_type: any[]
}) => {
  return http.post<BaseRes>('business/backendui/edit', option)
}

/** 获取主题详情 */
export const reqThemeItemDetail = (id: Key) => {
  return http.get<BaseRes>('business/backendUi/read', { params: { id } })
}
