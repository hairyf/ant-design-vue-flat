/*
 * @Author: Zhilong
 * @Date: 2021-07-08 17:04:50
 * @LastEditTime: 2021-07-12 15:48:02
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */
import { defineComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
/** 所有路由信息 */
export const allRoutes: RouteRecordRaw[] = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Layout,
    meta: { title: '组件' },
    children: [
      { path: 'index', meta: { title: 'index' }, component: () => import('@/view/index.vue') }
    ]
  }
]
