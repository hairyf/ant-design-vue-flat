/*
 * @Author: Mr.wang
 * @Date: 2021-06-02 15:22:17
 * @LastEditTime: 2021-07-07 15:07:22
 * @Description:用户接口
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config'

/** 获取登录注册设置 */
export const reqLoginRegistration = () => {
  return http.post<BaseRes>('business/Config/getLoginRegistration')
}

/** 设置登录注册设置 */
export const reqSetLoginRegistration = (option: { status: Key; value: any }) => {
  return http.post<BaseRes>('business/Config/setLoginRegistration', option)
}
/** 用户列表 */
export const reqUserList = (option: {
  search: Key
  shop_nums?: any
  createtime?: Key
  page: Key
  limit: Key
  is_member?: Key
}) => {
  return http.post<BaseRes>('business/Manager/shopUser', option)
}

/** 添加会员 */
export const reqNewMembers = (option: {
  username: Key
  nickname: Key
  mobile: Key
  password: Key
  repassword: Key
}) => {
  return http.post<BaseRes>('business/Manager/add', option)
}
/** 会员详情 */
export const reqUserDetails = (option: { id: Key }) => {
  return http.get<BaseRes>('business/Manager/read', { params: option })
}

/** 会员 详情 店铺信息 */
export const reqMemberShopList = (option: ListReqOpts<{ id: Key }>) => {
  return http.get<BaseRes>('business/Manager/readShop', { params: option })
}

/** 修改会员信息 */
export const reqModifyInformation = (option: { name: Key; value: Key; id: Key; remarks: Key }) => {
  return http.post<BaseRes>('business/Manager/editInfo', option)
}
/** 用户导出 */
export const reqUserExport = (option: {
  search: Key
  shop_nums?: any
  createtime?: Key
  page: Key
  limit: Key
  is_member?: Key
}) => {
  return http.post('business/Educe/ManagerEduce', option, { responseType: 'arraybuffer' })
}
/**设置QQ邮箱 */
export const reqSetQqEmail = (option: { status: Key; value: any }) => {
  return http.post<BaseRes>('business/Config/setQqEmail', option)
}
/**获取QQ邮箱 */
export const reqGetQqEmail = () => {
  return http.post<BaseRes>('business/Config/getQqEmail')
}

/**设置163邮箱 */
export const reqSet163Email = (option: { status: Key; value: any }) => {
  return http.post<BaseRes>('business/Config/set163Email', option)
}
/**获取163邮箱 */
export const reqGet163email = () => {
  return http.post<BaseRes>('business/Config/get163email')
}
