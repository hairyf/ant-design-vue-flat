/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2020-10-14 11:54:15
 * @LastEditTime: 2021-06-26 10:58:01
 * @Description: 全局接口配置, axios文档: https://www.kancloud.cn/yunye/axios/234845
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
declare module 'axios' {
  interface AxiosRequestConfig {
    custom?: {
      preventHandleError?: boolean
      loading?: boolean
    }
  }
}
import { devBaseUrl, headers, proBaseUrl } from '@/config'
import { default as http } from 'axios'
import { errorStrategy } from './http.error.strategy'
import { axiosPolling } from 'axios-polling/index'

// axios 轮询扩展
axiosPolling(http)

/** 定义默认配置 */
if (import.meta.env.MODE === 'development') {
  http.defaults.baseURL = devBaseUrl
} else {
  http.defaults.baseURL = proBaseUrl
}
/** 定义默认请求头 */
http.defaults.headers.common = headers

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
    const status = response?.data?.code ?? response.status
    const isHandleError = status !== 0
    const strategy = errorStrategy as any as Record<string, any>
    if (isHandleError) {
      !response.config?.custom?.preventHandleError &&
        strategy[strategy[status] ? status : 1010101](response)
      return Promise.reject(response)
    }
    return response
  },
  (error) => {
    const status = error.response?.data?.code ?? error.response?.status
    const isHandleError = !error.config?.custom?.preventHandleError
    const strategy = errorStrategy as any as Record<string, any>
    if (isHandleError) {
      strategy[strategy[status] ? status : 1010101](error.response)
    }
    return Promise.reject(error)
  }
)
/** 添加响应拦截器错误处理 end */

// 暴露请求方法
export default http

// 暴露请求配置
export const httpConfig = http.defaults
