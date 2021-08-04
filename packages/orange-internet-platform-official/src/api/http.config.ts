/*
 * @Author: Mr.Mao
 * @LastEditors: Zhilong
 * @Date: 2020-10-14 11:54:15
 * @LastEditTime: 2021-06-25 15:32:40
 * @Description: 全局接口配置, axios文档: https://www.kancloud.cn/yunye/axios/234845
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
declare module 'axios' {
  interface AxiosRequestConfig {
    custom?: any
  }
}

import { axiosPolling } from 'axios-polling'
import { default as http } from 'axios'
import { ERROR_STRATEGY } from './http.error.strategy'

// 初始化 axios-polling
axiosPolling(http, {
  retryLimit: 15
})

/** 定义默认配置 */
if (import.meta.env.MODE === 'development') {
  http.defaults.baseURL = 'http://192.168.1.5:181/api/'
} else {
  http.defaults.baseURL = 'api/'
}

/** 定义默认请求头 */
http.defaults.headers.common = {
  from: 'server-h5',
  version: '1.0'
}

/** 添加拦截器 loading 处理 start */
http.interceptors.request.use((config) => {
  if (config.custom?.loading) {
    throw Error('未处理请求加载')
  }
  return config
})
http.interceptors.response.use(
  (response) => {
    if (response.config?.custom?.loading) {
      throw Error('未处理请求加载')
    }
    return response
  },
  (error) => {
    if (error.config?.custom?.loading) {
      error.config.custom.loadingInstance.close()
    }
    return error
  }
)
/** 添加拦截器 loading 处理 end */

/** 添加响应拦截器错误处理 start */
http.interceptors.response.use(
  (response) => {
    const status = response.data.code ?? response.status
    const isHandleError = status !== 0
    if (isHandleError) {
      !response.config?.custom?.preventHandleError &&
        ERROR_STRATEGY[ERROR_STRATEGY[status] ? status : 1010101](response)
      return Promise.reject(response)
    }
    return response
  },
  (error) => {
    const status = error.response?.data?.code ?? error.response?.status
    const isHandleError = !error.config?.custom?.preventHandleError
    if (isHandleError) {
      ERROR_STRATEGY[ERROR_STRATEGY[status] ? status : 1010101](error.response)
    }
    return Promise.reject(error)
  }
)
/** 添加响应拦截器错误处理 end */

// 暴露请求方法
export { http }
// 暴露请求配置
export const httpConfig = http.defaults
