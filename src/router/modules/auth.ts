/*
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:09:24
 * @LastEditTime: 2021-06-25 14:01:42
 * @Description: 认证模块（登录，用户信息等）
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import LoginLayout from '@/layout/LoginLayout.vue'
import Login from '@/view/auth/login.vue'

import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/auth',
  component: LoginLayout,
  meta: { auth: true },
  children: [
    {
      path: 'login',
      component: Login
    }
  ]
}

export default route
