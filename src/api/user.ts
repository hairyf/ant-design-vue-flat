/*
 * @Author: Mr.wang
 * @Date: 2021-06-23 18:03:04
 * @LastEditTime: 2021-06-24 15:19:51
 * @Description:
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config'

/**  用户列表 */
export const reqUserList = (option: ListReqOpts) => {
  return http.get<BaseRes<ListRes>>('admin/User/index', { params: option })
}

/**  启用禁用 */
export const reqStartDisable = (option: { ids: Key[]; params: any }) => {
  return http.post<BaseRes<ListRes>>('admin/User/multi', option)
}

/**  用户审核列表 */
export const reqUserAuditList = (option: ListReqOpts) => {
  return http.get<BaseRes<ListRes>>('admin/UserIdentity/index', { params: option })
}

/**  审核通过拒绝 */
export const reqAuditOperation = (option: { ids: Key[]; params: any; reason?: Key }) => {
  return http.post<BaseRes>('admin/UserIdentity/multi', option)
}

/**  审核详情 */
export const reqAuditDetails = (option: { id?: Key; user_id?: Key }) => {
  return http.get<BaseRes>('admin/UserIdentity/read', {
    params: option,
    custom: {
      preventHandleError: true
    }
  })
}

/**  会员添加 */
export const reqUserAdd = (option: { user: any; identity: any }) => {
  return http.post<BaseRes>('admin/User/add', option)
}

/**  用户详情 */
export const reqUserRead = (option: { id: Key }) => {
  return http.get<BaseRes>('admin/User/read', { params: option })
}

/**  修改密码 */
export const reqResetPassword = (option: {
  mobile: Key
  password: Key
  repassword: Key
  admin_password: Key
}) => {
  return http.post<BaseRes>('admin/User/resetPassword', option)
}

/**  修改手机号 */
export const reqresetMobile = (option: {
  id: Key
  mobile: Key
  remobile: Key
  admin_password: Key
}) => {
  return http.post<BaseRes>('admin/User/resetMobile', option)
}

/**  会员认证编辑 */
export const reqEditAuth = (option: {
  type?: Key
  name?: Key
  idcard?: Key
  phone?: Key
  address?: Key
  idcard_front?: Key
  idcard_back?: Key
  business_license?: Key
  company_code?: Key
  company_name?: Key
  user_id: Key
}) => {
  return http.post<BaseRes>('admin/User/editAuth', option)
}
