/*
 * @Author: Zhilong
 * @Date: 2021-06-17 15:51:59
 * @LastEditTime: 2021-06-18 12:04:28
 * @Description:关于我们
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */

import { RouteRecordRaw } from 'vue-router'
const route: RouteRecordRaw = {
  path: 'aboutUs',
  component: () => import('@/view/aboutUs/index.vue'),
  meta: { title: '关于' }
}
export default route
