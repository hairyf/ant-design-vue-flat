/*
 * @Author: Mr.Mao
 * @Date: 2021-05-25 09:35:19
 * @LastEditTime: 2021-06-30 09:57:35
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import { renderInstance } from '@/utils/vue-utils'
import Constructor from './index.vue'

/** 组件中 props 类型 */
interface Props {
  title?: string
  price?: string
  type?: string
  params: PlaceAnOrderConfig | IGoPayOrder
}

/** 组件中调用成功结果 */
interface Result {
  [key: string]: any
}

/**
 * 支付消息弹窗
 * @param props 组件参数
 */
const CalPaymentMessage = (props?: Props) => {
  return new Promise<Result>((resolve, reject) => {
    renderInstance(Constructor, {
      ...props,
      modelValue: true,
      onResolve: resolve,
      onReject: reject
    })
  })
}

export { CalPaymentMessage }
