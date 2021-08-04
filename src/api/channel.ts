/*
 * @Author: Mr.wang
 * @Date: 2021-06-04 17:37:46
 * @LastEditTime: 2021-06-29 14:45:23
 * @Description:渠道接口
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import http from './http.config'
/** 获取服务商开发第三方配置 */
export const reqThirdPartySettings = () => {
  return http.post<BaseRes>('business/Config/getWxTripartite')
}
/** 设置服务商开发第三方配置 */
export const reqSettingThirdParty = (option: { status: Key; value: any }) => {
  return http.post<BaseRes>('business/Config/setWxTripartite', option)
}
/** 渠道市场列表 */
export const reqProductAddons = (option: {
  page?: number
  limit?: number
  search?: { [key: string]: any }
}) => {
  return http.get<BaseRes>('business/product/list', { params: { type: 'channel', ...option } })
}

/** 已购买渠道列表 */
export const reqChannelIndex = (option: {
  page: number
  limit: number
  search?: { [key: string]: any }
}) => {
  return http.get<BaseRes>('business/channel/index', { params: option })
}

/** 已购买渠道详情 */
export const reqChannelRead = (option: { id: any }) => {
  return http.get<BaseRes>('business/channel/read', { params: option })
}

/** 设置渠道 */
export const reqChannelEdit = (option: any) => {
  return http.post<BaseRes>('business/channel/edit', option)
}

/** 获取代码草稿列表 */
export const reqCodeDraftList = (option: ListReqOpts) => {
  return http.post<BaseRes>('business/WxTripartite/gettemplatedraftlist', option)
}

/** 获取代码模板列表 */
export const reqCodeTemplateList = (option: ListReqOpts) => {
  return http.post<BaseRes>('business/WxTripartite/gettemplatelist', option)
}

/** 将草稿添加到代码模板库 */
export const reqMoveLibrary = (option: { draft_id: Key }) => {
  return http.post<BaseRes>('business/WxTripartite/addtotemplate', option)
}

/** 删除指定代码模板 */
export const reqDeleteTemplate = (option: { template_id: Key }) => {
  return http.post<BaseRes>('business/WxTripartite/deletetemplate', option)
}

/** 代码模板发布 */
export const reqTemplatePublishing = (option: { type: Key; template_id: Key }) => {
  return http.post<BaseRes>('business/WxTripartite/issueVersions', option)
}
/** 下单购买市场应用 */
export const reqPaypay = (option: any) => {
  return http.post<BaseRes>('/api/pay/pay', {
    type: 2,
    service_manager_id: 1,
    system_id: 1,
    ...option
  })
}
/** 修改已购渠道上下架状态 */
export const reqChannelMulti = (option: { id: Key; params: { [key: string]: any } }) => {
  return http.post<BaseRes>('business/channel/multi', option)
}
/** 张泽林-登录远程开发者工具 */
export const reqWxTripartiteLogin = () => {
  return http.get<BaseRes>('business/WxTripartite/login')
}
/** 张泽林-获取小程序登录状态 */
export const reqWxTripartiteLoginStatus = () => {
  return http.get<BaseRes>('business/WxTripartite/loginStatus', {
    custom: { preventHandleError: true }
  })
}
/** 获取小程序最新版本 */
export const reqWxTripartiteGetNewVersions = () => {
  return http.get<BaseRes>('business/WxTripartite/getNewVersions')
}
/** 张泽林-远程上传小程序代码 */
export const reqWxTripartiteUpload = (option: { uploadkey: string }) => {
  return http.post<BaseRes>('business/WxTripartite/upload', option)
}

/** 获取小程序最新版本 */
export const reqWxNewest = () => {
  return http.get<BaseRes>('business/WxTripartite/getNewVersions')
}
/** 获取配置开放平台AppID */
export const reqConfigureAppId = () => {
  return http.post<BaseRes>('business/Config/getOpenAppId')
}

/** 配置开放平台AppID */
export const reqSetConfigureAppId = (option: { status: Key; value: any }) => {
  return http.post<BaseRes>('business/Config/setOpenAppId', option)
}
/** 应用安装 */
export const reqSystemInstallInstall = (option: { unique_key: string }) => {
  return http.post<BaseRes>('business/System/install', option)
}
