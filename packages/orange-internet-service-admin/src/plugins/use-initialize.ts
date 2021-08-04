/*
 * @Author: Mr.Mao
 * @Date: 2021-03-19 16:56:06
 * @LastEditTime: 2021-06-26 17:13:29
 * @Description: 初始化执行
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

// 全局样式引入
import { httpConfig } from '@/api/http.config'
import '@/index.scss'
import '@/router/permission'
import '@/router/nprogress'
import store from '@/store'
import { formatUnix, setThemeColor, filterPrice, filterInteger } from '@/utils'
import { App, watchEffect } from 'vue'
// 获取初始化数据
if (store.state.user.info) {
  store.dispatch('getSystemInin')
  store.dispatch('getPlatformMode')
}
export const useInitialize = (app: App<Element>) => {
  /** 初始化监听主题配置, 设置 CSS 变量 */
  watchEffect(() => setThemeColor(store.state.theme.option))
  /** 自动存入 token 至 axios 请求头 */
  watchEffect(() => {
    const userInfo = store.state?.user.info
    if (typeof userInfo?.token !== 'undefined') {
      httpConfig.headers.common['Authorization'] = 'Bearer ' + userInfo.token
    } else {
      delete httpConfig.headers.common['Authorization']
    }
  })
  // 挂载时间戳转换
  app.config.globalProperties.$formatUnix = formatUnix
  // 挂载过滤价格
  app.config.globalProperties.$filterPrice = filterPrice
  // 挂载过滤正整数
  app.config.globalProperties.$filterInteger = filterInteger
  // 挂载输出 event 数据
  app.config.globalProperties.$outEvents = (...vs: any) => console.log(...vs)
}
