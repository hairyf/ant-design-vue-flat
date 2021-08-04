/*
 * @Author: Mr.Mao
 * @Date: 2021-06-02 09:58:10
 * @LastEditTime: 2021-07-07 15:50:47
 * @Description:
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config'

/** 店铺列表 */
export const reqShopList = (option: ListReqOpts) => {
  return http.get<BaseRes<ListRes>>('business/Store/index', { params: option })
}
/** 编辑基本信息 */
export const reqEditBasicinformation = (option: {
  id: Key
  name?: Key
  status?: Key
  logo_path?: Key
  change_remark?: Key
}) => {
  return http.post<BaseRes<ListRes>>('business/Store/edit', option)
}
/** 店铺详情 */
export const reqShopDetails = (option: { id: Key }) => {
  return http.get<BaseRes<ListRes>>('business/Store/read', { params: option })
}

/** 新增店铺 */
export const reqNewStores = (option: AddShop) => {
  return http.post<BaseRes<ListRes>>('business/Store/add', option)
}

/** 待处理列表 */
export const reqPendingList = (option: ListReqOpts) => {
  return http.get<BaseRes<ListRes>>('business/shopverify/index', { params: option })
}

/** 待处理店铺详情 */
export const reqPendShopDetails = (option: { id: Key }) => {
  return http.get<BaseRes<ListRes>>('business/shopverify/read', { params: option })
}

/** 编辑店铺名称 */
export const reqEditStoreName = (option: { id: Key; name: Key }) => {
  return http.post<BaseRes<ListRes>>('business/shopverify/edit', option)
}

/** 待处理店铺同意/拒绝审核 */
export const reqpenShopExamine = (option: { id: Key; status: Key; refuse_reason: Key }) => {
  return http.post<BaseRes<ListRes>>('business/shopverify/check', option)
}

/** 店铺主题，渠道，应用，模板，列表 */
export const reqShopDetailsList = (option: ListReqOpts<{ type: Key; shop_id: Key }>) => {
  return http.get<BaseRes<ListRes>>('business/ShopExt/index', { params: option })
}
/** 扩展编辑 */
export const reqEditExtension = (option: { id: Key; ext_id: Key; switch: Key; deadline: Key }) => {
  return http.post<BaseRes<ListRes>>('business/Store/changeExt', option)
}

/** 验证登录密码 */
export const reqVerification = (option: { confirmPwd: Key }) => {
  return http.post<BaseRes>('business/Services/checkPwd', option, {
    custom: { preventHandleError: true }
  })
}
/** 历史套餐 */
export const reqHistoryPackage = (option: ListReqOpts<{ id: Key }>) => {
  return http.get<BaseRes<ListRes>>('business/Store/getComboHistory', { params: option })
}

/** 套餐切换前的必须操作 */
export const reqComboCheck = (option: {
  id: Key
  combo_id: Key
  combo_sale_id: Key
  combo_deadline: Key
}) => {
  return http.get<BaseRes<ListRes>>('business/Store/beforeChangeComboCheck', { params: option })
}
/** 套餐切换 */
export const reqPackageSwitching = (option: {
  id: Key
  combo_id: Key
  combo_sale_spec_id: Key
  expire_type: Key
  expire_time: Key
  is_delete_unused_combo: Key
  unused_combo_order_id: Key
  ext_diff: Key[]
}) => {
  return http.post<BaseRes<ListRes>>('business/Store/changeCombo', option)
}
/** 待处理店铺导出列表 */
export const reqExportList = (option: ListReqOpts) => {
  return http.get('business/shopverify/export', {
    params: option,
    responseType: 'arraybuffer'
  })
}
