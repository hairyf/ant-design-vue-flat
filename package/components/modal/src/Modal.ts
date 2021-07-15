/*
 * @Author: Mr.Mao
 * @Date: 2021-05-25 09:35:19
 * @LastEditTime: 2021-07-15 16:20:08
 * @Description:模态框二次封装
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import { renderInstance } from '@tuimao/utils/package/vue-utils/utils'
import CalMessageDialogConstructor from './Dialog.vue'

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
const CalModel = (props: CalMessageDialogProps) => {
  return new Promise<boolean>((resolve, reject) => {
    renderInstance(CalMessageDialogConstructor, {
      ...props,
      modelValue: true,
      onResolve: resolve,
      onReject: reject
    })
  })
}
CalModel.confirm = (props: CalMessageDialogProps) => {
  return CalModel({ ...props, type: 'confirm' })
}
CalModel.warning = (props: CalMessageDialogProps) => {
  return CalModel({ ...props, type: 'warning' })
}
CalModel.success = (props: CalMessageDialogProps) => {
  return CalModel({ ...props, type: 'success' })
}
export default CalModel
