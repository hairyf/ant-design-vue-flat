/*
 * @Author: Mr.wang
 * @Date: 2021-04-01 17:41:43
 * @LastEditTime: 2021-05-11 16:23:25
 * @Description:会员接口
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config'
/** 会员管理 */
export const reqrManagementList = (option: ListReqOpts) => {
  return http.get<BaseRes>('shop/shopUser/index', { params: option })
}
/** 等级列表 */
export const reqGradeList = (option: ListReqOpts<{ order?: Key; sort?: Key }>) => {
  return http.get<BaseRes>('shop/shopUserLevel/index', { params: option })
}
/** 标签列表 */
export const reqLabelList = (option: ListReqOpts<{ order?: Key; sort?: Key }>) => {
  return http.get<BaseRes>('shop/shopUserLabel/index', { params: option })
}
/** 会员渠道 */
export const reqMembershipChannel = (option: ListReqOpts) => {
  return http.get<BaseRes>('shop/shopUserChannel/index', { params: option })
}
/** 获取用户基础数据 */
export const reqBasicData = (option: { id: any }) => {
  return http.get<BaseRes>('shop/shopUser/read', { params: option })
}
/** ID获取用户来源渠道 */
export const reqUserChannel = (option: { id: any }) => {
  return http.get<BaseRes>('shop/shopUser/channel', { params: option })
}
/** ID获取用户第三方信息 */
export const reqThirdParty = (option: { id: any }) => {
  return http.get<BaseRes>('shop/shopUser/third', { params: option })
}
/** ID获取用户收货地址 */
export const reqReceivingAddress = (option: { id: any }) => {
  return http.get<BaseRes>('shop/shopUser/defaultAddr', { params: option })
}
/** 获取用户上级简单信息 */
export const reqSuperior = (option: { id: any }) => {
  return http.get<BaseRes>('shop/shopUser/parent', { params: option })
}
/** 获取用户下面一级的简单信息 */
export const reqSubordinate = (option: { id: any }) => {
  return http.get<BaseRes>('shop/shopUser/sons', { params: option })
}
/** ID获取用户可使用优惠券 */
export const reqCoupon = (option: { id: any }) => {
  return http.get<BaseRes>('shop/shopUser/coupon', { params: option })
}
/** 用户余额变更 */
export const reqBalanceChange = (option: {
  change_type: Key
  change_val: Key
  manager_remark: Key
  id: any
}) => {
  return http.post<BaseRes>('shop/shopUser/change/money', option)
}
/** 用户积分变更 */
export const reqIntegralChange = (option: {
  change_type: Key
  change_val: Key
  manager_remark: Key
  id: any
}) => {
  return http.post<BaseRes>('shop/shopUser/change/score', option)
}
/** 用户当前等级 */
export const reqUserLevel = (option: { id: any; status: Key }) => {
  return http.get<BaseRes>('shop/shopUser/levels', { params: option })
}
/** 用户当前等级变更 */
export const reqChangeGrade = (option: { id: Key; level_id: Key }) => {
  return http.post<BaseRes>('shop/shopUser/changeCurrenLevel', option)
}
/** 等级禁用或者启动 */
export const reqRankStatus = (option: { ids: Key[]; params: any }) => {
  return http.post<BaseRes>('shop/shopUserLevel/multi', option)
}
/** 用户当前标签 */
export const reqUserLabel = (option: { id: any; status: Key }) => {
  return http.get<BaseRes>('shop/shopUser/labels', { params: option })
}
/** 改变用户当前标签 */
export const reqChangeLabel = (option: { id: Key; labels: Key[] }) => {
  return http.post<BaseRes>('shop/shopUser/labels/change', option)
}
/** 批量增加标签 */
export const reqBatchIncreaseLabel = (option: { ids: Key[]; labels: Key[] }) => {
  return http.post<BaseRes>('shop/shopUser/labels/addAll', option)
}
/** 批量修改当前等级 */
export const reqBatchIncreaseGrade = (option: { ids: Key[]; level_id: Key }) => {
  return http.post<BaseRes>('shop/shopUser/changeLevel', option)
}
/** 标签删除 */
export const reqdeleteTap = (option: { ids: Key[] }) => {
  return http.post<BaseRes>('shop/shopUserLabel/delete', option)
}
/** 多用户拉黑 /恢复*/
export const reqSwitchBlacklist = (option: { uids: Key[]; status: Key }) => {
  return http.post<BaseRes>('shop/shopUser/changeStatusAll', option)
}
/** 用户删除 */
export const reqDeleteUser = (option: { uids: Key[] }) => {
  return http.post<BaseRes>('shop/shopUser/delAll', option)
}
/** 等级下用户整组移动/删除 */
export const reqMemberMobileDelete = (option: {
  old_id: Key
  new_id?: Key
  is_delete_old: Key
}) => {
  return http.post<BaseRes>('shop/shopUser/levels/move', option)
}
/** 会员等级新增 */
export const reqMemberLevelCreation = (option: {
  name: Key
  level_name: Key
  discount: Key
  remark: Key
  type: Key
  condition_need: Key
  condition: string
}) => {
  return http.post<BaseRes>('shop/shopUserLevel/add', option)
}
/** 获取会员等级详情数据 */
export const reqGradeRequirement = (option: { id: Key }) => {
  return http.get<BaseRes>('shop/shopUserLevel/read', { params: option })
}
/** 会员等级编辑 */
export const reqMemberEditor = (option: {
  id: Key
  name: Key
  level_name: Key
  discount: Key
  remark: Key
  type: Key
  condition_need: Key
  condition: string
}) => {
  return http.post<BaseRes>('shop/shopUserLevel/edit', option)
}
/** 会员标签添加 */
export const reqLabelCreation = (option: {
  name: Key
  remark: Key
  is_need_condition: Key
  condition_need: Key
  condition: string
}) => {
  return http.post<BaseRes>('shop/shopUserLabel/add', option)
}
/** 单条标签信息 */
export const reqLabelDetails = (option: { id: Key }) => {
  return http.get<BaseRes>('shop/shopUserLabel/read', { params: option })
}
/** 标签编辑 */
export const reqLabelEditing = (option: {
  id: Key
  name: Key
  remark: Key
  is_need_condition: Key
  condition_need: Key
  condition: string
}) => {
  return http.post<BaseRes>('shop/shopUserLabel/edit', option)
}
/** 商品列表 */
export const reqMembershipPriceList = (
  option: ListReqOpts<{
    id?: Key
    title?: Key
    goods_type?: Key
    sales?: Key[]
    price?: Key[]
    goods_state?: Key
    stock?: Key
  }>
) => {
  return http.post<BaseRes<ListRes>>('shop/Goods/interior_list', option)
}
/** 商品添加会员价 */
export const reqAddMemberPrice = (option: { goods_id: Key; status: Key; member_price: any[] }) => {
  return http.post<BaseRes>('shop/shopUser/memberPrice', option)
}
/** 会员价批量取消 */
export const reqMemberPriceBatch = (option: { goods_ids: Key[] }) => {
  return http.post<BaseRes>('shop/shopUser/cancelMemberPrice', option)
}

/** 会员导入列表数据 */
export const reqImportList = (option: ListReqOpts<{ order: Key; sort: Key }>) => {
  return http.get<BaseRes>('shop/userExcel/index', { params: option })
}
/** 会员导入 */
export const reqMemberImport = (option: FormData) => {
  return http.post<BaseRes>('shop/userExcel/add', option, {
    headers: {
      ['Content-Type']: 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
}
/** 获取下载模板 */
export const reqDownloadTemplate = (option: { type: Key }) => {
  return http.get<BaseRes>('shop/userExcel/templet', { params: option })
}
/** 会员慨览 */
export const reqMemberProfile = () => {
  return http.post<BaseRes>('shop/Index/userStatistics')
}
/** 会员慨览获取沉默活跃设置 */
export const reqSilenceSettings = () => {
  return http.post<BaseRes>('shop/Dispatch/getActiveSilence')
}
/** 会员慨览修改沉默活跃设置 */
export const reqModifySilenceSettings = (option: { activeValue: Key; silenceValue: Key }) => {
  return http.post<BaseRes>('shop/Dispatch/setActiveSilence', option)
}
/** 获取当前会与等级可用的 */
export const reqLevelAvailable = () => {
  return http.get<BaseRes>('/shop/shopUser/levels/getHasWeight')
}
/** 修改用户密码 */
export const reqChangeUserPassword = (option: { id: Key; password: Key; manager_remark: Key }) => {
  return http.post<BaseRes>('shop/ShopUser/changePw', option)
}
