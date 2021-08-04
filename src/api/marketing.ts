/*
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-02-24 11:18:41
 * @LastEditTime: 2021-05-07 09:59:34
 * @Description: 营销接口管理
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config'
/* api->index.js 统一命名规范
 * 1. 接口暴露前缀统一为req -> request(请求)
 * 2. 需详细描述数据时, 在src/types/response.d.ts中声明
 * Template: export const req[name] = () => http.get("/api/list")
 */

/** 优惠券列表 */
export const reqCouponIndex = (
  option: ListReqOpts<{
    order?: Key
    sort?: Key
    status?: Key
  }>
) => {
  return http.get<BaseRes<ListRes>>('shop/Coupon/index', { params: option })
}
/** 快速搜索列表 */
export const reqCouponSelect = (
  option: ListReqOpts<{
    order?: Key
    sort?: Key
  }>
) => {
  return http.get<BaseRes<ListRes>>('shop/Coupon/select', { params: option })
}
/** 发券记录列表 */
export const reqShopUserCouponIndex = (
  option: ListReqOpts<{
    order?: Key
    sort?: Key
  }>
) => {
  return http.get<BaseRes<ListRes>>('shop/ShopUserCoupon/index', { params: option })
}
/** 删除优惠券 */
export const reqCouponDelete = (option: { ids: string | number }) => {
  return http.post<BaseRes<ListRes>>('shop/Coupon/delete', option)
}
/** 新增优惠券 */
export const reqCouponAdd = (option: any) => {
  return http.post<BaseRes<ListRes>>('shop/Coupon/add', option)
}
/** 优惠券详情 */
export const reqCouponRead = (option: { id: Key }) => {
  return http.get<BaseRes<ListRes>>('shop/Coupon/read', { params: option })
}
/** 商品分组列表*/
export const reqGoodsGroupList = (option?: any) => {
  return http.post<BaseRes<ListRes>>('shop/GoodsGroup/interior_list', option)
}
/** 商品分类列表*/
export const reqGoodsClassList = (option?: any) => {
  return http.post<BaseRes<ListRes>>('shop/GoodsClass/interior_list', option)
}
/** 商品列表*/
export const reqGoodsList = (option?: any) => {
  return http.post<BaseRes<ListRes>>('shop/Goods/interior_list', option)
}
/** 手动发券*/
export const reqCouponSendCoupon = (option?: any) => {
  return http.post<BaseRes<ListRes>>('shop/Coupon/sendCoupon', option)
}

/** 群体管理列表数据*/
export const reqShopGroupManagementIndex = (option?: any) => {
  return http.get<BaseRes<ListRes>>('shop/ShopGroupManagement/index', { params: option })
}

/** 群体管理列表数据*/
export const reqShopGroupManagementFlush = (option: { id: Key }) => {
  return http.post<BaseRes<ListRes>>('shop/ShopGroupManagement/flush', option)
}

/** 群体管理列表数据*/
export const reqShopGroupManagementDelete = (option: { ids: Key[] }) => {
  return http.post<BaseRes<ListRes>>('shop/ShopGroupManagement/delete', option)
}

/** 单条群体用户数据导出*/
export const reqShopGroupManagementExport = (option: { id: Key; export_type: Key }) => {
  return http.get<BaseRes<ListRes>>('shop/ShopGroupManagement/export', {
    params: option,
    responseType: 'arraybuffer'
  })
}
/** 新增群体*/
export const reqShopGroupManagementAdd = (option?: any) => {
  return http.post<BaseRes<ListRes>>('shop/ShopGroupManagement/add', option)
}
/** 编辑群体*/
export const reqShopGroupManagementEdit = (option?: any) => {
  return http.post<BaseRes<ListRes>>('shop/ShopGroupManagement/edit', option)
}
/** 会员渠道列表*/
export const reqshopUserChannelIndex = (option?: any) => {
  return http.get<BaseRes<ListRes>>('shop/shopUserChannel/index', { params: option })
}
/** 会员等级列表*/
export const reqshopUserLevelIndex = (option?: any) => {
  return http.get<BaseRes<ListRes>>('shop/shopUserLevel/index', { params: option })
}
/** 会员标签列表*/
export const reqshopUserLabelIndex = (option?: any) => {
  return http.get<BaseRes<ListRes>>('shop/shopUserLabel/index', { params: option })
}
/** 会员列表*/
export const reqshopUserIndex = (option?: any) => {
  return http.get<BaseRes<ListRes>>('shop/shopUser/index', { params: option })
}
/** 单个数据查询*/
export const reqShopGroupManagementRead = (option?: any) => {
  return http.get<BaseRes<ListRes>>('shop/ShopGroupManagement/read', { params: option })
}
/** 汇总*/
export const reqShopGroupManagementGather = (option?: any) => {
  return http.post<BaseRes<ListRes>>('shop/ShopGroupManagement/gather', option)
}
