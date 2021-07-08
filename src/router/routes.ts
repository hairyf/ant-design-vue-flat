import { defineComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
/** 所有路由信息 */
export const allRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: Layout,
    meta: { title: '组件' },
    children: [
      { path: 'index', meta: { title: 'index' }, component: () => import('@/view/index.vue') }
    ]
  }
]
