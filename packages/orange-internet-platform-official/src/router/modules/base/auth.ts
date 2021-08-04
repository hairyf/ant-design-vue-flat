/*
 * @Author: Zhilong
 * @Date: 2021-06-17 15:52:46
 * @LastEditTime: 2021-06-18 18:39:56
 * @Description:验证登录 and...
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */
import { RouteRecordRaw } from 'vue-router'
const route: RouteRecordRaw = {
  path: '/auth',
  component: () => import('@/layout/LoginLayout.vue'),
  children: [
    {
      path: 'login',
      component: () => import('@/view/auth/login.vue')
    },
    {
      path: 'register',
      component: () => import('@/view/auth/register.vue')
    },
    {
      path: 'retrieve',
      component: () => import('@/view/auth/retrieve.vue')
    }
  ]
}
export default route
