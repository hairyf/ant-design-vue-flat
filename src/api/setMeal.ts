/*
 * @Author: Zhilong
 * @Date: 2021-06-03 15:51:04
 * @LastEditTime: 2021-06-25 11:36:03
 * @LastEditors: Pan.Yu.Lin
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */

import http from './http.config'

/** 获取套餐选择列表
 * @name 套餐选择列表
 */
export const reqSetMealSelectList = (option?: ListReqOpts) => {
  return http.get<BaseRes<ListRes>>('/admin/Combo/select', { params: option })
}

/** 获取套餐列表
 * @name 套餐列表
 */
export const reqSetMealList = (
  option: ListReqOpts<{
    // 套餐名
    keyword?: string
    // 价格区间
    price?: Key[] | string
    // 店铺数量
    use_num?: Key[] | string
    // 上下架
    is_sale?: Key
    // 	创建时间(时间戳)
    createtime?: string
  }>
) => {
  return http.get<BaseRes<ListRes>>('/admin/Combo/index', {
    params: option
  })
}

/** 获取套餐详情
 * @name 套餐详情
 */
export const reqSetMealDetails = (id: number) => {
  return http.get<BaseRes>('/admin/Combo/read', {
    params: { id }
  })
}

/** 判断套餐是否能设置容量限制
 * @name 套餐限制容量
 */
export const reqCanLimitCapacity = () => http.get<BaseRes>('/admin/Common/canLimitCapacity', {})

interface IAddTryout {
  //	套餐名
  name: string
  // 套餐标题
  // title: string
  // 是否限制容量
  is_limit_capacity: Key
  //	是否限制员工数
  is_limit_assistant: Key
  //	是否限制商品数
  is_limit_goods: Key
  //	限制容量大小(GB)
  limit_capacity: Key
  //	限制员工数
  limit_assistant: Key
  //	限制商品数
  limit_goods: Key
  //	简介
  remark: string
  //	试用天数
  tryout_days: Key
  //	主题id集合
  ui_ids: Key[]
  //	渠道id集合
  channel_ids: Key[]
  //	应用id集合
  addon_ids: Key[]
  //	模板id集合
  template_ids: Key[]
  //	1:上架 0:下架
  is_sale: Key
  //	短信数
  free_msg: Key
}
/** 添加试用套餐
 * @name 添加试用套餐
 */
export const reqAddTryout = (option: IAddTryout) => {
  return http.post<BaseRes>('/admin/Combo/addTryout', option)
}

/** 添加正式套餐
 * @name 添加正式套餐
 */
export const reqAddSetMeal = (option: { [key: string]: any }) => {
  return http.post<BaseRes>('/admin/Combo/add', option)
}

/** 编辑试用套餐
 * @name 编辑试用套餐
 */
export const reqEditTryout = (option: IAddTryout & { id: number }) => {
  return http.post<BaseRes>('/admin/Combo/editTryout', option)
}

/** 编辑正式套餐
 * @name 编辑正式套餐
 */
export const reqEditSetMeal = (option: { [key: string]: any }) => {
  return http.post<BaseRes>('/admin/Combo/edit', option)
}

/** 批量上下架套餐
 * @name 上下架套餐
 */
export const reqSwitchSetMeal = (option: {
  // 套餐id集合
  ids: number[]
  // 1上架 0下架
  is_sale: number
}) => http.post<BaseRes>('/admin/Combo/switch', option)

/** 批量删除套餐
 * @name 删除套餐
 */
export const reqDeleteSetMeal = (option: {
  // 套餐id集合
  ids: number[]
}) => http.post<BaseRes>('/admin/Combo/delete', option)

/** 获取可选择的渠道列表
 * @name 渠道列表
 */
export const reqChannelList = (option: ListReqOpts<null>) => {
  return http.get<BaseRes<ListRes>>('/admin/channel/select', { params: option })
}

/** 获取可选择的模板列表
 * @name 模板列表
 */
export const reqTemplateList = (option: ListReqOpts<any>) => {
  return http.get<BaseRes<ListRes>>('/admin/template/select', { params: option })
}

/** 获取可选择的主题列表
 * @name 主题列表
 */
export const reqThemeList = (option: ListReqOpts<null>) => {
  return http.get<BaseRes<ListRes>>('/admin/backendui/select', { params: option })
}

/** 获取可选择的应用列表
 * @name 应用列表
 */
export const reqAddonsList = (option: ListReqOpts<any>) => {
  return http.get<BaseRes<ListRes>>('/admin/addons/select', { params: option })
}

/** 保存试用套餐
 * @name 试用套餐
 */
export const reqSaveTryout = (option: IAddTryout) => {
  return http.post<BaseRes>('/admin/Combo/saveTryout', option)
}

/** 试用套餐详情
 * @name 试用套餐
 */
export const reqTryoutDetails = () => {
  return http.get<BaseRes>('/admin/Combo/getTryout')
}

/** 更新上架状态
 * @name 套餐列表
 */
export const reqComboMulti = (option: { id: Key; params: { sale_status: Key } }) => {
  return http.post<BaseRes>('/admin/combo/multi', option)
}
/** 复制套餐
 * @name 套餐列表
 */
export const reqComboCopy = (option: { id: Key }) => {
  return http.post<BaseRes>('/admin/combo/copy', option)
}
/** 修改套餐价格
 * @name 套餐列表
 */
export const reqComboEdit = (option: { id: Key; price?: Key; spec?: any[]; scene?: string }) => {
  return http.post<BaseRes>('/admin/combo/edit', option)
}
/** 模板分类列表
 * @name 新增套餐
 */
export const reqTemplateClassIndex = () => {
  return http.post<BaseRes>('/admin/TemplateClass/index')
}
/** 应用分类列表
 * @name 新增套餐
 */
export const reqAddonsClassIndex = () => {
  return http.post<BaseRes>('/admin/AddonsClass/index')
}
/** 查看套餐
 * @name 套餐详情
 */
export const reqComboRead = (option: { id: Key }) => {
  return http.get<BaseRes>('/admin/combo/read', { params: option })
}
