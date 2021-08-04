/*
 * @Author: Mr.Mao
 * @Date: 2021-03-19 16:35:30
 * @LastEditTime: 2021-06-10 12:02:54
 * @Description: 引入全局组件
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { App } from 'vue'
import ECharts from 'vue-echarts'
import 'echarts'

export const useComponents = (app: App<Element>) => {
  /** 第三方组件导入 start */
  app.component('VCharts', ECharts)
  /** 第三方组件导入 end */
}
