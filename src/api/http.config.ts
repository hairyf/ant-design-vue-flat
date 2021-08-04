/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2020-10-14 11:54:15
 * @LastEditTime: 2021-05-13 16:20:11
 * @Description: 全局接口配置, axios文档: https://www.kancloud.cn/yunye/axios/234845
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import store from '@/store'
import { watchEffect } from '@vue/runtime-core'
import { default as http } from 'axios'
import { ElLoading } from 'element-plus'
import { errorStrategy } from './http.error.strategy'

/** 定义默认配置 */
if (import.meta.env.MODE === 'development') {
  // http.defaults.baseURL = 'http://192.168.1.5:81'
  http.defaults.baseURL = 'http://192.168.1.5:82/addons/weitshop_shop/weshop/public/index.php/'
  // http.defaults.baseURL = 'https://wq.weitshop.cn/addons/weitshop_shop/weshop/public/index.php/'
  // http.defaults.baseURL = 'https://tiyan.juzishop.cn/addons/weitshop_shop/weshop/public/index.php'
} else {
  http.defaults.baseURL = 'index.php/'
}
/** 定义默认请求头 */
http.defaults.headers.common = {
  from: 'shop-h5',
  version: '1.0',
  // shopid: window.config.shopid || ''
  shopid: 14
}

/** 添加请求拦截器 */
http.interceptors.request.use((config) => {
  if (config.custom?.loading) {
    config.custom.loadingInstance = ElLoading.service({
      background: 'rgba(0,0,0,0.1)',
      text: '拼命加载中....',
      spinner: 'el-icon-loading'
    })
  }
  return config
})

/** 添加响应拦截器 */
http.interceptors.response.use(
  (response) => {
    if (response.config?.custom?.loading) {
      response.config.custom.loadingInstance.close()
    }
    const isHandleError =
      typeof response.data.code !== 'undefined' &&
      response.data.code != 0 &&
      !response.config?.custom?.preventHandleError
    if (isHandleError) {
      const status = response.data.code || response.status
      errorStrategy[status] ? errorStrategy[status](response) : errorStrategy[1010101](response)
      return Promise.reject(response)
    }
    return response
  },
  (error) => {
    if (error.config?.custom?.loading) {
      error.config.custom.loadingInstance.close()
    }
    const isHandleError = !error.config?.custom?.preventHandleError
    if (isHandleError) {
      const status = error.response?.data?.code || error.response?.status
      errorStrategy[status]
        ? errorStrategy[status](error.response)
        : errorStrategy[1010101](error.response)
    }
    return Promise.reject(error)
  }
)

// 暴露请求方法
export default http
// 暴露请求配置
export const httpConfig = http.defaults

/** 自动存入 token 至 axios 请求头 */
watchEffect(() => {
  const userInfo = store.state?.user.userInfo
  if (typeof userInfo?.token !== 'undefined') {
    httpConfig.headers.common['Authorization'] = 'Bearer ' + userInfo.token
  } else {
    delete httpConfig.headers.common['Authorization']
  }
})
