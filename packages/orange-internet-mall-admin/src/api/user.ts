/*
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-22 15:33:15
 * @LastEditTime: 2021-05-07 14:13:40
 * @Description: 用户数据接口
 * @LastEditors: Mr.Mao
 */

import http from './http.config'

/** 获取图片登录图片验证码 */
export const reqCaptcha = () => {
  return http.get<BaseRes>('captcha')
}
/** 获取邮箱注册图片验证码 */
export const reqAuthSendRegisterEmail = (option: { email: string }) => {
  return http.post<BaseRes>('business/Auth/sendRegisterEmail', option)
}

/** 账号密码登录 */
export const reqAuthLogin = (option: {
  account: string
  password: string
  captcha: string
  captchakey: string
}) => {
  return http.post<BaseRes<UserInfo>>('business/auth/login', option)
}
/** v7账号密码登录 */
export const wqAuthLogin = (option: {
  account: string
  password: string
  captcha: string
  captchakey: string
}) => {
  return http.post<BaseRes<UserInfo>>('wq/Auth/login', option)
}
/** 帐号注册 */
export const reqAuthRegister = (option: {
  account: string
  password: string
  repassword: string
  email: string
  code: string
}) => {
  return http.post<BaseRes<UserInfo>>('business/Auth/register', option)
}

/** 手机号登录 */
export const reqAuthMobileLogin = (option: { mobile: string; code: string }) => {
  return http.post<BaseRes<UserInfo>>('business/Auth/mobileLogin', option)
}

/** 发送登录验证码，用于手机号登录接口填写 */
export const reqAuthSendLoginCode = (option: { mobile: string }) => {
  return http.post<BaseRes>('business/Auth/sendLoginCode', option)
}

/** 手机号注册 */
export const reqAuthMobileRegister = (option: {
  mobile: string
  password: string
  repassword: string
  code: string
}) => {
  return http.post<BaseRes<UserInfo>>('business/Auth/mobileRegister', option)
}

/** 发送手机号注册验证码，用于手机号注册 */
export const reqAuthSendRegisterMobile = (option: { mobile: string }) => {
  return http.post<BaseRes>('business/Auth/sendRegisterMobile', option)
}

/** 发送邮箱重置密码 */
export const reqAuthSendResetByEmail = (option: { email: string }) => {
  return http.post<BaseRes>('business/Auth/sendResetByEmail', option)
}

/** 邮箱重置密码 */
export const reqAuthResetByEmail = (option: {
  email: string
  password: string
  repassword: string
  code: string
}) => {
  return http.post<BaseRes>('business/Auth/resetByEmail', option)
}

/** 发送手机号重置密码 */
export const reqAuthSendResetByMobile = (option: { mobile: string }) => {
  return http.post<BaseRes>('business/Auth/sendResetByMobile', option)
}

/** 手机号重置密码 */
export const reqAuthResetByMobile = (option: {
  mobile: string
  password: string
  repassword: string
  code: string
}) => {
  return http.post<BaseRes>('business/Auth/resetByMobile', option)
}
/**  修改账号密码 */
export const reqModifyAccountPassword = (option: {
  account: string
  password: string
  repassword: string
}) => {
  return http.post<BaseRes>('wq/Auth/resetPassword', option)
}
/** 初始化获取员工权限 */
export const reqRulesInitTree = () => {
  return http.get<BaseRes>('shop/Rules/initTree', {
    custom: { preventHandleError: true, loading: true }
  })
}
