/*
 * @Author: Mr.Mao
 * @Date: 2021-04-07 14:34:54
 * @LastEditTime: 2021-05-06 11:33:17
 * @Description:
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'
export default {
  path: '/',
  name: 'index',
  component: Layout,
  children: [
    { path: 'index', meta: { title: '概览' }, component: () => import('@/view/index/index.vue') }
  ],
  meta: { title: '首页', icon: 'home' }
} as RouteRecordRaw
