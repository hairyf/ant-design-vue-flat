/*
 * @Author: Mr.wang
 * @Date: 2021-05-24 18:14:28
 * @LastEditTime: 2021-06-09 16:49:45
 * @Description: 客服
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Layout from '@/layout/index.vue'
import EmptyLayout from '@/layout/EmptyLayout.vue'

import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/service',
  component: Layout,
  meta: { title: '客服管理', icon: 'nr-service' },
  children: [
    {
      path: 'compliance',
      component: () => import('@/view/service/compliance.vue'),
      meta: { title: '合从客服' }
    }
  ]
}

export default route
