/*
 * @Author: Mr.Mao
 * @Date: 2021-05-25 09:35:19
 * @LastEditTime: 2021-06-23 10:39:56
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import { renderInstance } from '@/utils/vue-utils'
import ConfirmPayment from './ConfirmPayment.vue'
import CloseOrder from './CloseOrder.vue'
import FillInRemark from './FillInRemark.vue'
import PaymentOrder from './PaymentOrder.vue'

/** 组件中 props 类型 */
interface Props {
  multiple: boolean
}

/** 组件中调用成功结果 */
interface Result {
  [key: string]: any
}

/**
 * 组件调用方法
 * @param props 组件参数
 */
const CalConfirmPayment = (props?: Props) => {
  return new Promise<Result>((resolve, reject) => {
    renderInstance(ConfirmPayment, {
      ...props,
      modelValue: true,
      onResolve: resolve,
      onReject: reject
    })
  })
}

/**
 * 组件调用方法
 * @param props 组件参数
 */
const CalCloseOrder = (props?: Props) => {
  return new Promise<Result>((resolve, reject) => {
    renderInstance(CloseOrder, {
      ...props,
      modelValue: true,
      onResolve: resolve,
      onReject: reject
    })
  })
}

/**
 * 组件调用方法
 * @param props 组件参数
 */
const CalFillInRemark = (props?: Props) => {
  return new Promise<Result>((resolve, reject) => {
    renderInstance(FillInRemark, {
      ...props,
      modelValue: true,
      onResolve: resolve,
      onReject: reject
    })
  })
}

/**
 * 组件调用方法
 * @param props 组件参数
 */
const CalPaymentOrder = (props?: Props) => {
  return new Promise<Result>((resolve, reject) => {
    renderInstance(PaymentOrder, {
      ...props,
      modelValue: true,
      onResolve: resolve,
      onReject: reject
    })
  })
}

/**
 * 组件调用方法
 * @param props 组件参数
 */
const CalPaymentResult = (props?: Props & { result: boolean }) => {
  return new Promise<Result>((resolve, reject) => {
    renderInstance(PaymentOrder, {
      ...props,
      modelValue: true,
      onResolve: resolve,
      onReject: reject
    })
  })
}

export { CalConfirmPayment, CalCloseOrder, CalFillInRemark, CalPaymentOrder, CalPaymentResult }
