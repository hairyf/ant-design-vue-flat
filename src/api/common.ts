/*
 * @Author: Mr.Mao
 * @Date: 2021-06-04 11:13:21
 * @LastEditTime: 2021-06-26 17:08:41
 * @Description:
 * @LastEditors: Mr.wang
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
  return http.post<BaseRes>('/business/City/cityIndex', { ...option, limit: 10000000 })
}
/** 单文件上传 */
export const reqUploadFile = (file: File, type = '1') => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', type)
  return http.post<BaseRes>('/business/upload/add/0', formData, {
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
  return http.get<BaseRes<{ count: number; list: any[] }>>('/business/upload/list', {
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
  return http.post<BaseRes>('/business/upload/delete', option)
}

/** 后台系统初始化
 * @name 彭海 - 服务商后台系统初始化
 */
export const reqSystemInit = () => {
  return http.get<BaseRes<SystemInin>>('business/Common/init')
}
/** 获取权限树 */
export const reqInitTree = () => {
  return http.get<BaseRes>('business/Services/initTree')
}

/** 获取平台联系方式 */
export const reqPlatformContactWay = () => {
  return http.get<BaseRes>('business/Common/platformContactWay')
}

/** 获取首页统计 */
export const reqIndexStats = () => {
  return http.get<BaseRes>('business/Index/index')
}

/** 获取首页统计-插件排行榜 */
export const reqAddonsRanking = (option: {
  addonsHot:Key
}) => {
  return http.post<BaseRes>('business/Index/addonsRanking',option)
}

/** 获取首页统计-模板排行榜 */
export const reqTemplateRanking = (option: {
  templateHot:Key
}) => {
  return http.post<BaseRes>('business/Index/templateRanking',option)
}

/** 获取服务商版权配置信息 */
export const reqGetServiceCopy = () => {
  return http.get<BaseRes>('business/Config/getServiceCopy')
}