import { httpConfig } from './../api/http.config'
import store from '@/store'
/*
 * @Author: Mr.Mao
 * @Date: 2021-03-19 16:56:06
 * @LastEditTime: 2021-06-23 20:12:04
 * @Description: 初始化执行
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

// 全局样式引入
import '@/index.scss'
import '@/router/permission'

import { formatUnix } from '@/utils'
import { App, watchEffect } from 'vue'

export const useInitialize = (app: App<Element>) => {
  // 挂载时间戳转换
  app.config.globalProperties.$formatUnix = formatUnix
  // 挂载输出 event 数据
  app.config.globalProperties.$outEvents = (...vs: any) => console.log(...vs)

  /** 自动存入 token 至 axios 请求头 */
  watchEffect(() => {
    const userInfo = store.state?.user.info
    if (userInfo?.token) {
      httpConfig.headers.common['Authorization'] = 'Bearer ' + userInfo.token
    } else {
      delete httpConfig.headers.common['Authorization']
    }
  })
}
