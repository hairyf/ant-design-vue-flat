/*
 * @Author: Mr.Mao
 * @Date: 2021-06-02 09:18:07
 * @LastEditTime: 2021-06-25 09:30:26
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config'

/** 账号密码登录 */
export const reqAuthLogin = (option: { account: string; password: string }) => {
  return http.post<BaseRes<UserInfo>>('business/Services/login', option)
}


export const reqGetServiceCopy = (option: { }) => {
  return http.get<BaseRes<CopyInfo>>('business/Config/getServiceCopy', option)
}
