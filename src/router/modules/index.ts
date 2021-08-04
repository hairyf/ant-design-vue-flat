/*
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:09:24
 * @LastEditTime: 2021-07-01 09:30:16
 * @Description: 主页模块
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Layout from '@/layout/index.vue'

import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/',
  name: 'gai-lan-lGYwzQTjWp',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'gai-lan-vbkE5dzEXD',
      meta: { title: '概览', hiddenTitle: true },
      component: () => import('@/view/index/index.vue')
    }
  ],
  meta: { title: '概览', icon: 'nr-home' }
}

export default route
