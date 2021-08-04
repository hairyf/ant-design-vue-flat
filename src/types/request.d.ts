/*
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-12 14:01:09
 * @LastEditTime: 2021-05-07 10:38:41
 * @Description:
 * @LastEditors: Pan.Yu.Lin
 */
/* 请求配置/响应的补充说明 */
interface BaseRes<T = any> {
  code: number
  data: T
}
type ListReqOpts<T = { [key: string]: any }> = {
  page?: number
  limit?: number
  search?:
    | string
    | {
        [key: string]: string
      }
} & T
type BatchOperationOpts<T = { [key: string]: any }> = {
  goodsId?: Key[]
  param?: any
}
interface ListRes {
  current_page: number
  data: any[]
  last_page: number
  per_page: number
  total: number
  status: Key
  link: string
  value: Record<string, any>
}
interface UserInfo {
  avatar: string
  email: string
  id: number
  is_merchant: number
  joinip: string
  loginfailure: number
  loginip: string
  maxsuccessions: number
  mobile: string
  nickname: string
  shop_nums: number
  status: string
  successions: number
  token: string
  logintime: number
  createtime: string
  jointime: string
  prevtime: string
  updatetime: string
  username: string
}
// 订单筛选条件
type orderQuery<T = { [key: string]: any }> = {
  type?: string
  order_sn?: string
  phone?: string
  consignee?: string
  status?: string
  pay_type?: string
  paytime?: Key
  createtime?: Key
  shipments_time?: Key
  finish_time?: Key
  is_after_sale?: string
  user_id?: string
} & T
// 店铺装修信息
type DecorateInfo<T> = {
  content: T
  expire_time: number
  id: number
  img: string
  is_publish: number
  manager_id: number
  name: string
  publish_time: number
  sale_type: string
  shop_channel_code: string[]
  shop_id: number
  shop_template_id: number
  style_type: number
}

interface CommonType {
  shopStatus: {
    run_status: {
      type: string
      value: string
    }
    business_hours: {
      type: string
      value: string[]
    }
    index_data: string
  }
  shopSet: {
    shop_name: string
    logo: string
    introduce: string
    load_image: {
      type: string
      value: string
    }
    image_preview: string
  }
  registerSet: {
    agreement: string
    title: string
    content: string
  }
  auth: {
    auth_login: string
    show_login: number
  }
}

interface KeepOnRecord {
  footerright: string
  footerleft: string
  copyright: {
    icp: string
    domain: string
    policeicp_location: string
    policeicp_code: string
    electronic_license: string
  }
}
