/*
 * @Author: Mr.Mao
 * @Date: 2021-05-25 09:35:19
 * @LastEditTime: 2021-06-15 18:09:05
 * @Description:模态框二次封装
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import { renderInstance } from '@/utils/vue-utils'
import CalMessageDialogConstructor from './index.vue'

/** 组件中 props 类型 */
interface CalMessageDialogProps {
  type?: 'warning' | 'confirm' | 'success'
  title?: string
  description?: string
  content?: string
  showCancel?: boolean
  showFooter?: boolean
  closable?: boolean
  onOk?: () => Promise<any>
}

/**
 * 组件调用方法
 * @param props 组件参数
 */
const CalMessageDialog = (props: CalMessageDialogProps) => {
  return new Promise<boolean>((resolve, reject) => {
    renderInstance(CalMessageDialogConstructor, {
      ...props,
      modelValue: true,
      onResolve: resolve,
      onReject: reject
    })
  })
}
CalMessageDialog.confirm = (props: CalMessageDialogProps) => {
  return CalMessageDialog({ ...props, type: 'confirm' })
}
CalMessageDialog.warning = (props: CalMessageDialogProps) => {
  return CalMessageDialog({ ...props, type: 'warning' })
}
CalMessageDialog.success = (props: CalMessageDialogProps) => {
  return CalMessageDialog({ ...props, type: 'success' })
}
export { CalMessageDialog }
