/*
 * @Author: Mr.Mao
 * @LastEditors: Zhilong
 * @Date: 2020-11-30 13:48:00
 * @LastEditTime: 2021-07-05 11:22:54
 * @Description: 请求错误处理
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { debounce } from 'lodash'
import { message } from 'ant-design-vue'
import { AxiosResponse } from 'axios'
import router from '@/router'
import store from '@/store'

/** 防抖函数 */
const debounceErr = <T>(func: T extends (...args: any[]) => void ? any : any) => {
  return debounce(func, 500, { leading: true, trailing: false })
}

/** 错误处理策略 */
export const ERROR_STRATEGY: Record<string, (error: any) => void> = {
  /** 默认处理函数(如果不需要处理的错误码都将经过这里) */
  // 默认处理函数(如果不需要处理的错误码都将经过这里)
  1010101: debounceErr((response: AxiosResponse<any>) => {
    if (response?.data?.msg) {
      message.error(response.data.msg)
    } else {
      message.error(`请求异常, 错误码: ${response?.status}`)
    }
  }),
  /** 该请求参数不正确 */
  400: debounceErr((err: any) => {}),
  /** 该请求需要用户登录 */
  401: debounceErr(async (err: any) => {
    await ERROR_STRATEGY['1010101'](err)
    store.dispatch('signOutUserInfo')
    router.replace('/auth')
  }),
  /** 该请求未得到授权 */
  403: debounceErr((err: any) => {}),
  /** 该请求地址不存在 */
  404: debounceErr((err: any) => {}),
  /** 服务器内部异常 */
  500: debounceErr((err: any) => {}),
  /** 服务器请求超时 */
  1000: debounceErr((err: any) => {}),
  /** 用户不存在 */
  10000: debounceErr((err: any) => message.error(err.data.msg))
}
