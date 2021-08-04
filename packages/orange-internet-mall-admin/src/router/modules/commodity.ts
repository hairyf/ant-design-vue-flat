/*
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-02-23 19:07:17
 * @LastEditTime: 2021-05-06 11:37:39
 * @Description: 商品路由模块
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
export default {
  path: '/commodity',
  name: 'commodity',
  component: Layout,
  meta: { title: '商品', icon: 'commodity', activeMenu: '/commodity' },
  children: [
    {
      path: 'admin',
      component: () => import('@/view/commodity/admin.vue'),
      meta: { title: '商品管理' }
    },
    {
      path: 'addGoods',
      component: () => import('@/view/commodity/addGoods.vue'),
      meta: { hidden: true, title: '新增商品' }
    },
    {
      path: 'classification',
      component: () => import('@/view/commodity/classification.vue'),
      meta: { title: '商品分类' }
    },
    {
      path: 'editClassification',
      component: () => import('@/view/commodity/editClassification.vue'),
      meta: { hidden: true, title: '编辑分类' }
    },
    {
      path: 'productLabeling',
      component: () => import('@/view/commodity/productLabeling.vue'),
      meta: { title: '商品标签' }
    },
    {
      path: 'addProductLabeling',
      component: () => import('@/view/commodity/addProductLabeling.vue'),
      meta: { hidden: true, title: '新增标签' }
    },
    {
      path: 'grouping',
      component: () => import('@/view/commodity/grouping.vue'),
      meta: { title: '商品分组' }
    },
    {
      path: 'addGrouping',
      component: () => import('@/view/commodity/addGrouping.vue'),
      meta: { hidden: true, title: '新增分组' }
    },
    {
      path: 'support',
      component: () => import('@/view/commodity/support.vue'),
      meta: { title: '服务支持' }
    },
    {
      path: 'addSupport',
      component: () => import('@/view/commodity/addSupport.vue'),
      meta: { hidden: true, title: '新增支持' }
    },
    {
      path: 'parame',
      component: () => import('@/view/commodity/parame.vue'),
      meta: { title: '参数管理' }
    },
    {
      path: 'addParame',
      component: () => import('@/view/commodity/addParame.vue'),
      meta: { hidden: true, title: '添加商品参数' }
    },
    {
      path: 'recycle-bin',
      component: () => import('@/view/commodity/recycle-bin.vue'),
      meta: { title: '批量操作' }
    },
    {
      path: 'recovery',
      component: () => import('@/view/commodity/recovery.vue'),
      meta: { title: '回收站' }
    }
  ]
} as RouteRecordRaw
