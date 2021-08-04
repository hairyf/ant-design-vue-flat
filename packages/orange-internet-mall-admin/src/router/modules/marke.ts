/*
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-02-23 19:07:17
 * @LastEditTime: 2021-05-11 16:41:40
 * @Description: 营销路由模块
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import EmptyLayout from '@/layout/EmptyLayout.vue'
export default {
  path: '/marke',
  name: 'marke',
  component: Layout,
  meta: { title: '营销', icon: 'marketing' },
  children: [
    // {
    //   path: 'markeView',
    //   component: () => import('@/view/marke/markeView.vue'),
    //   meta: { title: '营销概览' }
    // },

    {
      path: 'coupon',
      meta: { title: '优惠券' },
      component: EmptyLayout,
      children: [
        {
          path: 'allCoupon',
          component: () => import('@/view/marke/allCoupon.vue'),
          meta: { title: '全部优惠券' }
        },
        {
          path: 'manualCoupon',
          component: () => import('@/view/marke/manualCoupon.vue'),
          meta: { title: '手动发券' }
        },
        {
          path: 'record',
          component: () => import('@/view/marke/record.vue'),
          meta: { title: '发券记录' }
        },
        {
          path: 'newDiscount',
          component: () => import('@/view/marke/newDiscount.vue'),
          meta: { title: '新增优惠券', hidden: true }
        }
      ]
    },
    {
      path: 'groupManage',
      component: () => import('@/view/marke/groupManage.vue'),
      meta: { title: '群体管理' }
    },
    {
      path: 'addGroup',
      component: () => import('@/view/marke/addGroup.vue'),
      meta: { title: '新增群体', hidden: true }
    }
  ]
} as RouteRecordRaw
