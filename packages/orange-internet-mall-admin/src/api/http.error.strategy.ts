import { ElMessage } from 'element-plus'
import { AxiosResponse } from 'axios'
import store from '@/store'
import { debounce } from 'lodash'

/*
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-27 21:56:52
 * @LastEditTime: 2021-05-10 15:13:13
 * @Description:
 * @LastEditors: Mr.wang
 */

const debounceErr = <T>(func: T extends (...args: any[]) => void ? any : any) => {
  return debounce(func, 500, { leading: true, trailing: false })
}

export const errorStrategy: any = {
  // 默认处理函数(如果不需要处理的错误码都将经过这里)
  1010101: debounceErr((response: AxiosResponse<any>) => {
    if (response?.data?.msg) {
      if (response?.config.url != 'business/Auth/checkPwd') {
        ElMessage.error(response.data.msg)
      }
    } else {
      ElMessage.error(`请求异常, 错误码: ${response?.status}`)
    }
  }),
  // 当前登录过期
  401: debounceErr((response: AxiosResponse<any>) => {
    ElMessage.error({
      type: 'error',
      message: response.data.msg,
      duration: 2000
    })
    setTimeout(() => {
      store.dispatch('signOutUserInfo')
    }, 2000)
  })
}
