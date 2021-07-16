/*
 * @Author: Mr.Mao
 * @Date: 2021-07-12 17:51:26
 * @LastEditTime: 2021-07-16 22:23:01
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { analyUnit } from '@tuimao/utils'
import { DefineComponent } from 'vue'

/**
 * 继承 NaiveUi Props
 * @param Component
 * @returns Props
 */
export const inheritNaiveUiProps = <T>(Component: T) => {
  type Props = T extends DefineComponent<infer V, any, any> ? V : any
  const props: Props = (Component as any)['props']
  return props
}

/**
 * 随机字符串
 * @param size 字符串长度
 * @returns { string }
 */
export const randomString = (size = 5) => {
  let stringLength: number
  stringLength = size > 9 ? 9 : size
  stringLength = size < 1 ? 1 : size
  const randomString = Math.random().toString(36)
  return randomString.slice(stringLength * -1, randomString.length)
}

/**
 * 将size转换
 * @param { Number | String | { width:Number|String,height:Number|String } | { w:Number|String,h:Number|String } }
 * @returns { width , height } 的对象
 */
type Key = string | number
type ToSizeObject = { width: Key; height: Key } | { w: Key; h: Key }
export type ToSize = Key | ToSizeObject
export const toSize = (size: ToSize) => {
  if (typeof size === 'string' || typeof size === 'number') {
    // 正方形的单条数据
    return { width: analyUnit(size), height: analyUnit(size) }
  }
  if (typeof size === 'object') {
    // 对象类型的数据
    return {
      width: analyUnit((size as any)?.width || (size as any)?.w || '0'),
      height: analyUnit((size as any)?.height || (size as any)?.h || '0')
    }
  }
  // 默认数据
  return { width: '', height: '' }
}
