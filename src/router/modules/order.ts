/*
 * @Author: Zhilong
 * @Date: 2021-05-24 09:26:24
 * @LastEditTime: 2021-07-01 09:36:07
 * @Description:订单路由模块
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
 */
import Layout from '@/layout/index.vue'
import EmptyLayout from '@/layout/EmptyLayout.vue'

import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/order',
  name: 'ding-dan-guan-li-TOgPEai4rE',
  component: Layout,
  meta: { title: '订单管理', icon: 'nr-order' },
  children: [
    {
      path: 'merchant',
      name: 'shang-hu-ding-dan-pe4D7EqsWD',
      component: EmptyLayout,
      meta: { title: '商户订单' },
      children: [
        {
          path: 'businessShop',
          name: 'ying-ye-dian-pu-zHU0dhz3zp',
          component: () => import('@/view/order/merchant/businessShop.vue'),
          meta: { title: '营业店铺' }
        },
        {
          path: 'onTrialShop',
          name: 'shi-yong-dian-pu-rms2wMMrEC',
          component: () => import('@/view/order/merchant/onTrialShop.vue'),
          meta: { title: '试用店铺' }
        },
        {
          path: 'orderSetting',
          name: 'ding-dan-she-zhi-05kO6poxqR',
          component: () => import('@/view/order/merchant/orderSetting.vue'),
          meta: { title: '订单设置' }
        },
        {
          path: 'orderDetail',
          name: 'ding-dan-xiang-qing-MR8vapWRsP',
          component: () => import('@/view/order/merchant/detail.vue'),
          meta: { title: '订单详情', hidden: true }
        }
      ]
    },
    {
      path: 'platformOrder',
      name: 'ping-tai-ding-dan-gtYkXzbXQR',
      component: () => import('@/view/order/platformOrder.vue'),
      meta: { title: '平台订单' }
    },
    {
      path: 'orderDetail',
      name: 'ding-dan-xiang-qing-l2Jf3sjKqe',
      component: () => import('@/view/order/detail.vue'),
      meta: { title: '订单详情', hidden: true }
    }
  ]
}

export default route
