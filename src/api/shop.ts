/*
 * @Author: Mr.Mao
 * @Date: 2021-03-25 17:24:46
 * @LastEditTime: 2021-05-10 17:45:39
 * @Description: 店铺接口
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config'
/* api->index.js 统一命名规范
 * 1. 接口暴露前缀统一为req -> request(请求)
 * 2. 需详细描述数据时, 在src/types/response.d.ts中声明
 * Template: export const req[name] = () => http.get("/api/list")
 */

/** 我的店铺(店铺diy模板列表) */
export const reqShopTemplateList = (
  option?: ListReqOpts<{ shop_channel_code?: string; name?: string }>
) => {
  return http.get<BaseRes<ListRes>>('shop/ShopDiyTemplate/getList', { params: option })
}

/** 可用店铺模板(购买和免费的) */
export const reqShopCanUseTemplate = (
  option?: ListReqOpts<{ get_buy?: Key; is_free?: Key; order_by?: Key; time?: Key }>
) => {
  return http.get<BaseRes<ListRes>>('shop/ServicesShopTemplate/getList', {
    params: option
  })
}

/** 我的店铺-购买模板 */
export const reqBuyTemplate = (option: { code: string; id: Key; sale_type: Key }) => {
  return http.post<BaseRes>('shop/ServicesShopTemplate/buyTemplate', option)
}

/** 我的店铺-查询支付订单 */
export const reqTemplateOrder = (sn: Key) => {
  return http.post<BaseRes>('shop/ServicesShopTemplate/chkOrder', { sn })
}

/** 我的店铺-模板分类 */
export const reqTemplateClass = () => {
  return http.get<BaseRes>('shop/ServicesTemplateClass/getList')
}

/** 我的店铺-选择模板列表 */
export const reqSeleteTemplates = (option?: ListReqOpts<{ search?: { name: string } }>) => {
  return http.get<BaseRes<ListRes>>('shop/ShopTemplate/shopCanUseTemplate', {
    params: option,
    custom: { loading: true }
  })
}

/** 我的店铺-选择模板 */
export const reqSeleteTemplateItem = (shop_template_id: Key) => {
  return http.post<BaseRes>('shop/ShopDiyTemplate/add', { shop_template_id })
}

/** 我的店铺-获取购买弹窗信息 */
export const reqPurchaseInfo = (id: Key) => {
  return http.get<BaseRes>('shop/ServicesShopTemplate/goToBuy', { params: { id } })
}

/** 我的店铺-获取店铺装修列表 */
export const reqDecorateInfo = (id: Key) => {
  return http.get<BaseRes>('shop/ShopDiyTemplate/getTemInfo', {
    params: { id },
    custom: { loading: true }
  })
}

/** 我的店铺-保存模板(修改渠道) */
export const reqDecorateSave = (option: {
  id: Key
  content?: any
  channel_list?: Key[]
  name?: string
}) => {
  option.content = JSON.stringify(option.content)
  return http.post<BaseRes>('shop/ShopDiyTemplate/up', option, { custom: { loading: true } })
}

/** 我的店铺-浏览 */
export const reqDecorateBrowse = (option: { type: 'browse'; id: Key }) => {
  return http.get<BaseRes>('shop/ShopDiyTemplate/getBrowseUrl', {
    params: option
  })
}

/** 我的店铺-发布模板 */
export const reqShopDiyTemplate = (option: {
  id: Key
  is_publish_and_save?: Key
  content?: any
  is_timing?: Key
  time?: string
}) => {
  return http.post<BaseRes>('shop/ShopDiyTemplate/publish', option, { custom: { loading: true } })
}

/** 我的店铺-删除模板 */
export const reqDelDiyTemplate = (id: Key) => {
  return http.post<BaseRes>('shop/ShopDiyTemplate/del', { id }, { custom: { loading: true } })
}
