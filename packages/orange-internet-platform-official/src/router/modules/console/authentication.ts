/*
 * @Author: Mr.wang
 * @Date: 2021-06-09 11:34:09
 * @LastEditTime: 2021-06-15 09:18:30
 * @Description:
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Layout from '@/layout/ConsoleLayout.vue'

import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: 'authentication',
  component: Layout,
  meta: { title: '资质认证', icon: 'pf-authentication' },
  children: [
    {
      path: 'index',
      component: () => import('@/view/authentication/index.vue'),
      meta: { title: '资质认证' }
    }
  ]
}

export default route
