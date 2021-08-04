/*
 * @Author: Zhilong
 * @Date: 2021-06-21 11:59:42
 * @LastEditTime: 2021-06-29 15:51:48
 * @Description: 验证
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */

import { http } from './http.config'

/** 账号密码登录
 *  @name 彭海 - 账号密码登录
 */
export const reqLogin = (option: {
  // 账号
  account: string
  // 密码
  password: string
}) => http.post<BaseRes>('api/Auth/login', option)

/** 手机号登录
 * @name 彭海 - 手机号登录
 */
export const reqPhoneLogin = (option: {
  // 手机号
  mobile: string
  // 验证码
  code: string
}) => http.post('api/Auth/loginByMobile', option)

/** 退出登录
 * @name 彭海 - 登出
 */
export const reqLogout = () => {
  return http.get<BaseRes>('api/Auth/logout')
}

/** 发送验证码
 * @name 彭海 - 发送验证码
 * @description 已固定事件的值,传phone即可
 */
export const reqSendCode = (option: {
  // 手机号
  phone: string
  // 验证码事件：对应下一个接口的名称（手机号注册=registerByMobile，手机号登录=loginByMobile，找回密码=resetByMobile）
  event: 'registerByMobile' | 'loginByMobile' | 'resetByMobile'
}) => http.post<BaseRes>('api/Auth/send', option)

interface IReUser {
  // 手机号
  mobile: string
  // 验证码
  code: string
  // 密码
  password: string
  // 确认密码
  repassword: string
}

/**手机号注册
 * @description 彭海 - 手机号注册
 */
export const reqPhoneRegister = (option: IReUser) => {
  return http.post<BaseRes>('api/Auth/registerByMobile', option)
}

/**找回密码
 * @description 彭海 - 找回密码
 */
export const reqPhoneReset = (option: IReUser) => {
  return http.post('api/Auth/resetByMobile', option)
}
