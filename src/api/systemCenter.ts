/*
 * @Author: Mr.wang
 * @Date: 2021-06-22 09:24:56
 * @LastEditTime: 2021-06-24 15:37:16
 * @Description:
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config'

/** 版本列表 */
export const reqVersionList = (option: ListReqOpts) => {
  return http.get<BaseRes<ListRes>>('admin/SystemVersion/index', { params: option })
}
/** 授权列表 */
export const reqAuthorizationList = (option: ListReqOpts) => {
  return http.get<BaseRes<ListRes>>('admin/System/index', { params: option })
}

/** 上下架等操作 */
export const reqVersionOperation = (option: { ids: Key[]; params: any }) => {
  return http.post<BaseRes<ListRes>>('admin/SystemVersion/multi', option)
}
