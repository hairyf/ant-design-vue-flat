/*
 * @Author: Mr.Mao
 * @Date: 2021-07-12 17:51:26
 * @LastEditTime: 2021-07-16 10:08:17
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { DefineComponent } from 'vue'

/**
 * 继承 Props
 * @param Component
 * @returns Props
 */
export const inheritProps = <T>(Component: T) => {
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
