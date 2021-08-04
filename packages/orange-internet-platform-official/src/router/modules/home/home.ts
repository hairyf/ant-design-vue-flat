/*
 * @Author: Zhilong
 * @Date: 2021-06-17 16:36:57
 * @LastEditTime: 2021-06-18 11:17:19
 * @Description: 首页
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */
import { RouteRecordRaw } from 'vue-router'
const route: RouteRecordRaw = {
  path: 'index',
  component: () => import('@/view/index/index.vue'),
  meta: { title: '首页', hidden: true }
}
export default route
