/*
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-12 14:01:09
 * @LastEditTime: 2021-06-22 14:44:47
 * @Description:
 * @LastEditors: Zhilong
 */
/* 请求配置/响应的补充说明 */
interface BaseRes<T = any> {
  code: number
  data: T
}
type ListReqOpts<T = { [key: string]: any }> = {
  page?: number
  limit?: number
  search?: T
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
  id: number
  username: string
  avatar: string //头像
  mobile: string //手机号
  loginfailure: number //登录失败次数
  logintime: number //登录时间
  loginip: string //登录IP
  createtime: number //创建时间
  updatetime: number //更新时间
  token: string
  status: number //状态：状态:0=禁用,1=正常
  successions: number //连续登录天数
  maxsuccessions: number //最大登录天数
  prevtime: number //上次登录时间
  add_manager_id: number //添加的管理员ID
  name: string //姓名
  group_id: number //角色ID
}
