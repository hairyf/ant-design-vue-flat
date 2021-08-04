/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-24 11:19:04
 * @LastEditTime: 2021-02-24 11:19:26
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
