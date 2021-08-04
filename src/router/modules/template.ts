/*
 * @Author: Mr.wang
 * @Date: 2021-05-24 18:14:28
 * @LastEditTime: 2021-07-01 09:33:40
 * @Description: 模板
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Layout from '@/layout/index.vue'
import EmptyLayout from '@/layout/EmptyLayout.vue'

import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  name: 'mu-ban-guan-li-PvwbgukjG8',
  path: '/template',
  component: Layout,
  meta: { title: '模板管理', icon: 'nr-template' },
  children: [
    {
      name: 'mu-ban-shi-chang-SRzxpdzT8A',
      path: 'market',
      component: () => import('@/view/template/market.vue'),
      meta: { title: '模板市场' }
    },
    {
      name: 'yi-gou-mu-ban-zbusFdEBEf',
      path: 'purchased',
      component: () => import('@/view/template/purchased.vue'),
      meta: { title: '已购模板' }
    },
    {
      name: 'she-zhi-mu-ban-H7ckspzAW5',
      path: 'setTemplate',
      component: () => import('@/view/template/setTemplate.vue'),
      meta: { title: '设置模板', hidden: true }
    }
  ]
}

export default route
