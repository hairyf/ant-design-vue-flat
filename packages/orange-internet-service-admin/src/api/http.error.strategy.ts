import { AxiosResponse } from 'axios'
import store from '@/store'
import { debounce } from 'lodash'
import { message } from 'ant-design-vue'
import router from '@/router'
/*
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-27 21:56:52
 * @LastEditTime: 2021-07-01 09:17:07
 * @Description:
 * @LastEditors: Mr.Mao
 */

const debounceErr = <T extends (...args: any[]) => void>(func: T) => {
  return debounce<T>(func, 500, { leading: true, trailing: false })
}

export const errorStrategy = {
  // 默认处理函数(如果不需要处理的错误码都将经过这里)
  1010101: debounceErr(async (response: AxiosResponse<any>) => {
    if (response?.data?.msg) {
      await message.error(response.data.msg)
    } else {
      await message.error(`请求异常, 错误码: ${response?.status}`)
    }
  }),
  401: debounceErr(async (response: AxiosResponse<any>) => {
    await errorStrategy['1010101'](response)
    await store.dispatch('signOutUserInfo')
    router.replace('/auth')
  })
}
