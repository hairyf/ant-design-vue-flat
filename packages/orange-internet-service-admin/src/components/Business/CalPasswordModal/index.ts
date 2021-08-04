/*
 * @Author: Mr.Mao
 * @Date: 2021-06-17 10:59:40
 * @LastEditTime: 2021-06-24 18:27:08
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import { ExtractPropTypes, ref } from 'vue'
import Index from './index.vue'
import { componentProps } from './props'
import { renderInstance } from '@/utils/vue-utils'

/** 组件 Props 类型, ExtractPropTypes 可将 Constructor 转换为对应值类型 */
type Props = Partial<ExtractPropTypes<typeof componentProps>>

/** 组件调用 resolve 返回结果 */
type Result = { remark: string; password: string; check: boolean }

/**
 * 模态框调用方法
 * @param props
 * @returns {Promise}
 */
export const CalPasswordModal = (props?: Props) => {
  return new Promise<Result>((resolve, reject) => {
    renderInstance(Index, {
      // 这里 modelValue, 为了使组件可改, 需要传入 ref
      modelValue: ref(true),
      ...props,
      resolve,
      reject
    })
  })
}
