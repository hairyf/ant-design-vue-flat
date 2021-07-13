/*
 * @Author: Zhilong
 * @Date: 2021-07-08 17:04:50
 * @LastEditTime: 2021-07-13 11:11:24
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import EmptyLayout from '@/layout/EmptyLayout.vue'

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
      },
      {
        path: 'multistage',
        meta: { title: 'multistage', icon: 'icon' },
        component: EmptyLayout,
        children: [
          {
            path: 'icon1',
            meta: { title: 'Icon', icon: 'icon' },
            component: () => import('@/view/component.vue')
          },
          {
            path: 'icon2',
            meta: { title: 'Icon', icon: 'icon' },
            component: () => import('@/view/component.vue')
          }
        ]
      }
    ]
  }
]
