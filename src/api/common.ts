/*
 * @Author: Mr.Mao
 * @Date: 2021-06-21 14:23:38
 * @LastEditTime: 2021-06-25 17:53:35
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/*
 * @Author: Mr.Mao
 * @Date: 2021-06-04 11:13:21
 * @LastEditTime: 2021-06-09 10:17:53
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import http from './http.config'

/** 请求城市列表 */
export const reqCityList = (option?: {
  code_id?: Key
  parent_id?: Key
  name?: string
  level?: Key
  classify?: string
}) => {
  return http.post<BaseRes>('/admin/City/cityIndex', { ...option, limit: 10000000 })
}
/** 单文件上传 */
export const reqUploadFile = (file: File, type = '1') => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', type)
  return http.post<BaseRes>('/admin/upload/add/0', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
/** 获取图片列表 */
export const reqImageList = (
  option: ListReqOpts<
    unknown,
    { group_id?: Key; page?: number; limit?: number; searchname?: string; type?: Key }
  >
) => {
  return http.get<BaseRes<{ count: number; list: any[] }>>('/admin/upload/list', {
    params: option
  })
}
/** 删除指定图片 */
export const reqDeleteImage = (option: {
  type: Key
  is_real: Key
  delete_groups: Key[]
  delete_ids: Key[]
}) => {
  return http.post<BaseRes>('/admin/upload/delete', option)
}

/** 验证登录密码 */
export const reqVerification = (option: ListReqOpts<{ confirmPwd: Key }>) => {
  return http.post<BaseRes<ListRes>>('/admin/Services/checkPwd', option)
}

/** 验证密码 */
export const reqAuthCheckPwd = (admin_password: string) => {
  return http.post<BaseRes>('admin/Auth/checkPwd', { admin_password })
}

/** 获取权限 */
export const reqInitTree = () => {
  return http.get<BaseRes>('admin/Auth/initTree')
}
