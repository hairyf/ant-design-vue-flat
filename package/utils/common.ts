/*
 * @Author: Mr.Mao
 * @Date: 2021-07-12 17:51:26
 * @LastEditTime: 2021-07-12 18:04:26
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
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
