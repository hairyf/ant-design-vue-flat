/*
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-12 14:01:09
 * @LastEditTime: 2021-06-30 10:10:54
 * @Description:
 * @LastEditors: Zhilong
 */
/* 请求配置/响应的补充说明 */
interface BaseRes<T = any> {
  code: number
  data: T
}
type ListReqOpts<T = { [key: string]: any }, W = { [key: string]: any }> = {
  page?: number
  limit?: number
  search?: T
} & W
interface ListRes<T = any> {
  current_page: number
  data: T[]
  last_page: number
  per_page: number
  total: number
  status: Key
  link: string
  value: Record<string, any>
  [key: string]: any
}
interface UserInfo {
  add_manager_id: number
  avatar: string
  createtime: number
  deletetime: number
  group_id: number
  id: number
  loginfailure: number
  loginip: string
  logintime: number
  maxsuccessions: number
  mobile: string
  name: string
  prevtime: number
  status: string
  successions: number
  token: string
  updatetime: number
  username: string
}
interface AddShop {
  name: string
  liaisons: string
  liaisons_tel: string
  area_id: Key
  address: string
  manager_id: string
  combo_id: string
  combo_sale_spec_id: string
  industry_class_id: string
  combo_price: string
  info: string
  remark: string
  expire_type: number
  expire_time: number
  extra_params?: Array<any[]>
}
interface PaymentConfig {
  type: string
  data: string
  pay_template_id: Key
  sn: string
  price: string
}
interface PlaceAnOrderConfig {
  service_manager_id: Key
  associate_id: Key
  /** 对应的订单类型: 1:应用订单、3:渠道订单、2:模板订单、4:主题订单 5:套餐订单 */
  type: 1 | 2 | 3 | 4 | 5 | 6
  // system_id: Key
  buy_type: 1 | 2[]
  code?: string
}

interface IGoPayOrder {
  // 订单号
  sn: string
  // 【当前订单的类型】 订单类型: 1:应用订单、2:模板订单、3:渠道订单、4:主题订单 5:套餐订单 6:续费订单
  type: Key
  // 【当前订单的关联表id】
  associate_id: Key
  // 支付标识 微信支付 WxPay 支付宝支付 AliPay
  code: string
}

interface ImageSelectItem {
  createtime: number
  deletetime: number
  group_id: number
  id: number
  name: string
  path: {
    /** 绝对地址 */
    url: string
    /** 相对地址 */
    path: string
  }
  size: number
  type: number
  updatetime: number
}

interface Domain {
  group: number
  id: number
  key: string
  name: string
  remark: string
  status: string
  value: string
}
interface SystemInin {
  //服务商域名
  service_domain: string
  //商户端域名
  shop_domain: string
  //平台端域名
  host: string
}

interface PlatformContact {
  //服务商域名
  service: {
    phone: string
  }
  customer_ervice: {
    phone: string
    wx: string
  }
}
