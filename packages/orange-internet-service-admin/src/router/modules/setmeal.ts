/*
 * @Author: Mr.wang
 * @Date: 2021-05-24 18:14:28
 * @LastEditTime: 2021-07-01 09:43:03
 * @Description: 套餐
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Layout from '@/layout/index.vue'

import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/setMeal',
  name: 'tao-can-guan-li-1Vt54iw5pv',
  component: Layout,
  meta: { title: '套餐管理', icon: 'nr-setmeal' },
  children: [
    {
      path: 'formalSetMeal',
      name: 'tao-can-lie-biao-rrHrdYwBk6',
      component: () => import('@/view/setMeal/FormalSetMeal.vue'),
      meta: { title: '套餐列表' }
    },
    {
      path: 'SetMealDetails',
      name: 'tao-can-xiang-qing-tUkGDZjwyA',
      component: () => import('@/view/setMeal/SetMealDetails.vue'),
      meta: { title: '套餐详情', hidden: true }
    }
    // {
    //   path: 'onTrialSetMeal',
    //   component: () => import('@/view/setMeal/OnTrialSetMeal.vue'),
    //   meta: { title: '试用套餐' }
    // }
  ]
}

export default route
