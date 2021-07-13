/*
 * @Author: Zhilong
 * @Date: 2021-07-08 17:04:50
 * @LastEditTime: 2021-07-12 19:59:57
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */
import { defineComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

/** 基本路由信息 */
export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/docs'
  }
]
/** 所有路由信息 */
export const allRoutes: RouteRecordRaw[] = [
  ...baseRoutes,
  {
    path: '/docs',
    component: Layout,
    meta: { title: '组件', icon: 'puzzle' },
    children: [
      {
        path: 'component',
        meta: { title: '组件', icon: 'puzzle' },
        component: () => import('@/view/component.vue')
      },
      {
        path: 'icon',
        meta: { title: 'Icon', icon: 'icon' },
        component: () => import('@/view/component.vue')
      }
    ]
  }
]
