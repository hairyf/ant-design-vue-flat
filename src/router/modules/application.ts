/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-23 19:07:17
 * @LastEditTime: 2021-05-11 11:04:10
 * @Description: 应用路由模块
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
export default {
  path: '/application',
  name: 'application',
  component: Layout,
  children: [
    {
      path: 'index',
      meta: { title: '应用中心' },
      component: () => import('@/view/application/application-center.vue')
    }
  ],
  meta: { title: '应用', icon: 'application' }
} as RouteRecordRaw
