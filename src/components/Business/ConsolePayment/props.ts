/*
 * @Author: Mr.Mao
 * @Date: 2021-06-17 14:08:51
 * @LastEditTime: 2021-06-24 15:14:28
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import { Ref } from 'vue'

/** 模态框固定 props 参数, 用于调用模态框成功|关闭|销毁 */
export const modalProps = {
  // 是否展示组件
  modelValue: {
    type: Boolean as () => boolean | Ref<boolean>
  },
  // 组件消失时(实例方法 > 移除实例)
  vanish: Function,
  // 组件调用成功事件
  resolve: Function,
  // 组件调用失败事件
  reject: Function
}

/** 组件内传入 props 参数, 用于模态框自定义功能 */
export const componentProps = {
  /** 支付标题名字 */
  title: {
    type: String,
    default: '购买系统'
  },
  /** 支付订单id */
  id: {
    type: [Number],
    required: true as any as true
  },
  type: {
    type: [Number],
    required: true as any as true
  },
  price: String
  /** 支付接口 */
  // payApi: String
}

/** 组件内所有 Props 参数, 合并参数 */
export const props = { ...modalProps, ...componentProps }
