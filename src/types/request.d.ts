/*
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-12 14:01:09
 * @LastEditTime: 2021-06-24 19:58:15
 * @Description:
 * @LastEditors: Mr.Mao
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
interface ServiceProviderInfo {
  auth_time: number
  create_time: number
  duration: number
  duration_type: number
  host: string
  icps: string
  id: number
  identity_key: string
  order_id: number
  over_status: number
  over_time: number
  status: number
  system_status: number
  update_time: number
  user_id: number
}
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
type ProductType = 'application' | 'theme' | 'channel' | 'template'
interface ProductItem {
  // 模板ID
  id: Key
  // 模板名称
  name: string
  // 模板一级分类ID
  template_class_one_id: Key
  // 模板二级分类ID
  template_class_two_id: Key
  // 模板logo
  logo: string
  // 模板主图 多图用逗号分开 最多10张
  img: string[]
  // 模板内容
  content: string
  // 简介
  remark: string
  // 图文介绍 富文本编辑器
  introduce: string
  // 价格
  price: string
  // 购买方式: 1 在线支付(线上) 2 联系客服（线下）
  buy_type: any[]
  [key: string]: any
}
interface UserInfo {
  avatar: string
  createtime: number
  email: string
  group_id: Key
  id: Key
  joinip: string
  jointime: number
  loginfailure: Key
  loginip: string
  logintime: number
  manager_id: Key
  maxsuccessions: Key
  mobile: string
  nickname: string
  prevtime: number
  status: Key
  successions: Key
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
  /** 对应的订单类型: 1:应用订单、2:渠道订单、3:模板订单、4:主题订单 5:套餐订单 */
  type: 1 | 2 | 3 | 4 | 5
  system_id: Key
  code?: Key
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

interface CommonType {
  service_domain: {
    group: number
    id: number
    key: string
    name: string
    remark: string
    status: string
    value: string
  }
  shop_domain: {
    group: number
    id: number
    key: string
    name: string
    remark: string
    status: string
    value: string
  }
}
