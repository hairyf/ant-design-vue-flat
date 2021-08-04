/*
 * @Author: Mr.wang
 * @Date: 2021-06-09 10:08:12
 * @LastEditTime: 2021-06-22 14:38:05
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Layout from '@/layout/ConsoleLayout.vue'
import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: 'setMeal',
  component: Layout,
  meta: { title: '套餐', icon: 'pf-set-meal' },
  children: [
    {
      path: 'index',
      component: () => import('@/view/setMeal/index.vue'),
      meta: { title: '已购买套餐' }
    },
    {
      path: 'payMeal',
      component: () => import('@/view/setMeal/payMeal.vue'),
      meta: {
        title: '购买套餐',
        pathMaps: ['/console', '/console/setMeal', '/console/setMeal/index']
      }
    }
  ]
}

export default route
