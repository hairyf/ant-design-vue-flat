/*
 * @Author: Mr.wang
 * @Date: 2021-05-24 18:14:28
 * @LastEditTime: 2021-07-01 09:32:08
 * @Description: 应用模块路由
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Layout from '@/layout/index.vue'
import EmptyLayout from '@/layout/EmptyLayout.vue'

import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  name: 'ying-yong-guan-li-m0WZLpkRN0',
  path: '/application',
  component: Layout,
  meta: { title: '应用管理', icon: 'nr-application' },
  children: [
    {
      name: 'ying-yong-shi-chang-f9PmhnCMIH',
      path: 'market',
      component: () => import('@/view/application/market.vue'),
      meta: { title: '应用市场' }
    },
    {
      name: 'yi-gou-ying-yong-dgpIbY83ir',
      path: 'purchased',
      component: () => import('@/view/application/purchased.vue'),
      meta: { title: '已购应用' }
    },
    {
      name: 'she-zhi-ying-yong-oUThMGTS1d',
      path: 'setUp',
      component: () => import('@/view/application/setUp.vue'),
      meta: { title: '设置应用', hidden: true }
    }
  ]
}

export default route
