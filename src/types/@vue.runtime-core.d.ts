/*
 * @Author: Mr.Mao
 * @Date: 2021-06-02 10:12:00
 * @LastEditTime: 2021-06-24 16:25:21
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import store from '@/store'
import { formatUnix, filterPrice, filterInteger } from '@/utils'
import { ComponentCustomProperties } from 'vue'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: typeof store
    $formatUnix: typeof formatUnix
    $filterPrice: typeof filterPrice
    $filterInteger: typeof filterInteger
    $outEvents: (...values: any[]) => void
  }
}
