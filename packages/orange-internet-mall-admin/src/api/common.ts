/*
 * @Author: Mr.wang
 * @Date: 2021-03-24 21:53:18
 * @LastEditTime: 2021-05-11 15:50:10
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import http from './http.config'
/** 获取分组 */
export const reqUploadMap = (option: {
  need_default_list: number
  default_list_pagesize?: number
  type: Key
}) => {
  return http.post<BaseRes>('shop/upload/groupList', option)
}
/*新增分组*/
export const reqUploadGroup = (option: { group_name: string; type: Key }) => {
  return http.post<BaseRes>('shop/upload/createGroup', option)
}
/** 获取图片列表 */
export const reqUploadList = (
  option: ListReqOpts<{ group_id?: Key; searchname: string; type: Key }>
) => {
  return http.post<BaseRes>('shop/upload/list', option, { custom: { loading: true } })
}
/** 删除分组 */
export const reqDeleteGroup = (option: { group_ids: Key[] }) => {
  return http.post<BaseRes>('shop/upload/deleteGroup', option)
}
/** 删除文件 */
export const reqdeleteUpload = (option: {
  delete_groups: Key[]
  delete_ids: Key[]
  type: Key
  is_real: Key
}) => {
  return http.post<BaseRes>('shop/upload/delete', option)
}

/** 移动分组 */
export const reqMoveAll = (option: {
  old_group_id: Key
  new_group_id: Key
  move_ids: Key[]
  type: Key
}) => {
  return http.post<BaseRes>('shop/upload/moveAll', option)
}

/** 获取容量 */
export const reqContainerSize = (option: { shop_id?: Key }) => {
  return http.post<BaseRes>(`shop/stores/containerSize/${option.shop_id}`)
}
/** 回收站列表数据 */
export const reqRecycleBin = (option: ListReqOpts<{ type: Key; searchName: string }>) => {
  return http.post<BaseRes>('shop/upload/recycleBin', option, { custom: { loading: true } })
}
/** 回收站图片恢复 */
export const reqRecover = (option: { recover_ids: any[]; type: Key }) => {
  return http.post<BaseRes>('shop/upload/recover', option)
}
/** 回收站彻底删除 */
export const reqBinDelete = (option: { delete_ids: any[]; type: Key }) => {
  return http.post<BaseRes>('shop/upload/recycleBinDelete', option)
}
/** 回收站全部删除 */
export const reqYcleBinDelete = (option: { type: Key }) => {
  return http.post<BaseRes>('shop/upload/recycleBinDeleteAll', option)
}
/** 回收站全部还原 */
export const reqRecoverAll = (option: { type: Key }) => {
  return http.post<BaseRes>('/shop/upload/recoverAll', option)
}
/** 城市列表 */
export const reqcitiesList = () => {
  return http.post<BaseRes>('shop/Dispatch/cityIndex')
}
/** 获取系统全部支付 */
export const reqFullPayment = () => {
  return http.post<BaseRes>('shop/Dispatch/getAllPay')
}

/** 会员列表 */
export const reqShopUserIndex = (option: any) => {
  return http.get<BaseRes<ListRes>>('shop/shopUser/index', { params: option })
}
/** 会员等级列表 */
export const reqShopUserLevelIndex = (option: ListReqOpts) => {
  return http.get<BaseRes<ListRes>>('shop/shopUserLevel/index', { params: option })
}
/** 容量套餐列表 */
export const reqPackageList = () => {
  return http.get<BaseRes>('shop/capacity/index')
}
/** 容量扩容 */
export const reqExpansion = (option: { code: Key; capacity_id: Key; capacity_item_id: Key }) => {
  return http.post<BaseRes>('shop/ShopCapacityOrder/expansion', option)
}
/** 容量购买状态 */
export const reqPurchaseStatus = (option: { sn: Key }) => {
  return http.post<BaseRes>('shop/ShopCapacityOrder/check', option)
}

/** 首页慨览 */
export const reqHomePageOverview = (option: {
  order_money_time: Key
  order_num_time: Key
  shop_visitor_volume: Key
}) => {
  return http.post<BaseRes>('shop/Index/indexStatistics', option)
}
/** 首页配置信息点亮 */
export const reqConfigurationInformation = () => {
  return http.get<BaseRes>('shop/Index/setiing')
}
/** 获取备案号信息 */
export const reqAdminInit = () => {
  return http.get<BaseRes<KeepOnRecord>>('shop/Common/adminInit')
}
