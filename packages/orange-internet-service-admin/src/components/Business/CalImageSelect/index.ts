/*
 * @Author: Mr.Mao
 * @Date: 2021-05-25 09:35:19
 * @LastEditTime: 2021-06-15 15:44:37
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import { renderInstance } from '@/utils/vue-utils'
import Constructor from './index.vue'

/** 组件中 props 类型 */
interface Props {
  // 是否多选
  multiple: boolean
}

/**
 * 组件调用方法
 * @param props 组件参数
 */
const CalImageSelect = (props?: Props) => {
  return new Promise<ImageSelectItem[]>((resolve, reject) => {
    renderInstance(Constructor, {
      ...props,
      modelValue: true,
      onResolve: resolve,
      onReject: reject
    })
  })
}

export { CalImageSelect }
