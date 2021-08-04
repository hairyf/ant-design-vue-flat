/*
 * @Author: Mr.wang
 * @Date: 2021-05-24 10:55:44
 * @LastEditTime: 2021-07-01 09:31:53
 * @Description:用户模块路由
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Layout from '@/layout/index.vue'

import { RouteRecordRaw } from 'vue-router'
const route: RouteRecordRaw = {
  path: '/user',
  name: 'yong-hu-guan-li-UrPi74OkSz',
  component: Layout,
  meta: { title: '用户管理', icon: 'nr-user' },
  children: [
    {
      path: 'userManagement',
      name: 'yong-hu-guan-li-UcOoScomNx',
      component: () => import('@/view/user/userManagement.vue'),
      meta: { title: '用户管理' }
    },
    {
      path: 'newUser',
      name: 'xin-zeng-yong-hu-3PWcNKcNvj',
      component: () => import('@/view/user/newUser.vue'),
      meta: { title: '新增用户', hidden: true }
    },
    {
      path: 'userDetails',
      name: 'yong-hu-xiang-qing-WllG4QBzJf',
      component: () => import('@/view/user/userDetails.vue'),
      meta: { title: '用户详情', hidden: true }
    },
    {
      path: 'loginSettings',
      name: 'deng-lu-zhu-ce-she-zhi-P5F7olKaek',
      component: () => import('@/view/user/loginSettings.vue'),
      meta: { title: '登录注册设置' }
    }
  ]
}
export default route
