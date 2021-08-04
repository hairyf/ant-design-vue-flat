/*
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:09:24
 * @LastEditTime: 2021-06-09 10:57:12
 * @Description: 主页模块
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Layout from '@/layout/index.vue'

import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/test',
  component: Layout,
  meta: { title: '测试', icon: 'nr-ceshi' },
  children: [
    {
      path: 'index',
      component: () => import('@/view/test/base.vue'),
      meta: { title: '基本组件' }
    },
    {
      path: 'hook',
      component: () => import('@/view/test/hook.vue'),
      meta: { title: '逻辑钩子' }
    },
    {
      path: 'asyncComponent',
      component: () => import('@/view/test/asyncComponent.vue'),
      meta: { title: '异步组件' }
    }
  ]
}

export default route
