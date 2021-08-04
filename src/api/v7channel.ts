/*
 * @Author: Pan.Yu.Lin
 * @Date: 2021-04-23 21:01:47
 * @LastEditTime: 2021-05-07 16:59:08
 * @Description:
 * @LastEditors: Pan.Yu.Lin
 */
import http from './http.config'

/** 更换小程序状态 */
export const reqChannelMiniStatus = (option: { status: Key }) => {
  return http.post<BaseRes<ListRes>>('shop/Channel/miniStatus', option)
}
/** 更换公众号状态 */
export const reqChannelWechatStatus = (option: { status: Key }) => {
  return http.post<BaseRes<ListRes>>('shop/Channel/wechatStatus', option)
}
/** 更换H5状态 */
export const reqChannelHfStatus = (option: { status: Key }) => {
  return http.post<BaseRes<ListRes>>('shop/Channel/hfStatus', option)
}
/** 获取小程序配置 */
export const reqChannelMini = () => {
  return http.get<BaseRes<ListRes>>('shop/Channel/mini')
}
/** 保存小程序配置 */
export const reqChannelMiniPreservation = (option: { app_id: string; secret: string }) => {
  return http.post<BaseRes<ListRes>>('shop/Channel/mini', option)
}
/** 获取渠道列表 */
export const reqChannelList = () => {
  return http.get<BaseRes<any>>('shop/Channel/list')
}
/** 获取小程序版本记录 */
export const reqChannelMiniVersions = () => {
  return http.get<BaseRes<any>>('shop/Channel/miniVersions')
}
/** 获取小程序登录二维码 */
export const reqChannelLogin = () => {
  return http.get<BaseRes<any>>('shop/Channel/login')
}
/** 获取小程序登录状态 */
export const reqChannelLoginStatus = () => {
  return http.get<BaseRes<any>>('shop/Channel/loginStatus')
}
/** 上传代码 */
export const reqChannelUpload = (option: any) => {
  return http.post<BaseRes<ListRes>>('shop/Channel/upload', option)
}
/** 获取小程序最新发布信息 */
export const reqChannelMiniLog = () => {
  return http.get<BaseRes<any>>('shop/Channel/miniLog')
}
