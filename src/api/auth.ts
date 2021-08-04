/*
 * @Author: Mr.Mao
 * @Date: 2021-06-02 09:18:07
 * @LastEditTime: 2021-06-22 16:06:37
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config'

/** 账号密码登录 */
export const reqAuthLogin = (option: { account: string; password: string }) => {
  return http.post<BaseRes<UserInfo>>('admin/Auth/login', option)
}

/** 服务商后台系统初始化 */
export const reqCommonInit = () => {
  return http.get<BaseRes<UserInfo>>('admin/Common/init')
}
