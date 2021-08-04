/*
 * @Author: Mr.wang
 * @Date: 2021-05-24 18:16:03
 * @LastEditTime: 2021-07-01 09:34:28
 * @Description:店铺模块路由
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Layout from '@/layout/index.vue'
import EmptyLayout from '@/layout/EmptyLayout.vue'

import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/shop',
  name: 'dian-pu-guan-li-U6hCkkWXuL',
  component: Layout,
  meta: { title: '店铺管理', icon: 'nr-shop' },
  children: [
    {
      path: 'shopList',
      name: 'dian-pu-lie-biao-249b1ubqyg',
      component: () => import('@/view/shop/shopList.vue'),
      meta: { title: '店铺列表' }
    },
    {
      path: 'pendingShop',
      name: 'dai-chu-li-dian-pu-wL3WedX7uL',
      component: () => import('@/view/shop/pendingShop.vue'),
      meta: { title: '待处理店铺' }
    },
    {
      path: 'addShop',
      name: 'xin-zeng-dian-pu-jrMyi2ni4U',
      component: () => import('@/view/shop/addShop.vue'),
      meta: { title: '新增店铺', hidden: true }
    },
    {
      path: 'detail',
      name: 'dian-pu-xiang-qing-di1ZOMEHr6',
      component: () => import('@/view/shop/detail.vue'),
      meta: { title: '店铺详情', hidden: true }
    },
    {
      path: 'pendDetail',
      name: 'dai-chu-li-dian-pu-xiang-qing-RfES9wtbfS',
      component: () => import('@/view/shop/pendDetail.vue'),
      meta: { title: '待处理店铺详情', hidden: true }
    }
  ]
}
export default route
