/*
 * @Author: Zhilong
 * @Date: 2021-06-17 15:48:39
 * @LastEditTime: 2021-06-18 11:54:43
 * @Description:产品介绍
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */
import { RouteRecordRaw } from 'vue-router'
const route: RouteRecordRaw = {
  path: 'productIntroduce',
  component: () => import('@/view/productIntroduce/index.vue'),
  meta: { title: '产品介绍' }
}
export default route
