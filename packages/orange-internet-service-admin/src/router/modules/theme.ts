/*
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:09:24
 * @LastEditTime: 2021-07-01 09:36:19
 * @Description: 主页模块
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Layout from '@/layout/index.vue'

import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  name: 'zhu-ti-guan-li-IEdkCJOc5P',
  path: '/theme',
  component: Layout,
  meta: { title: '主题管理', icon: 'nr-theme' },
  children: [
    {
      name: 'zhu-ti-shi-chang-OmPGJ69hfW',
      path: 'market',
      component: () => import('@/view/theme/market.vue'),
      meta: { title: '主题市场' }
    },
    {
      name: 'yi-gou-zhu-ti-Uz9XaBFVuh',
      path: 'purchased',
      component: () => import('@/view/theme/purchased.vue'),
      meta: { title: '已购主题' }
    },
    {
      name: 'bian-ji-zhu-ti-DYjKYGv16M',
      path: 'editTheme',
      component: () => import('@/view/theme/editTheme.vue'),
      meta: { title: '编辑主题', hidden: true }
    }
  ]
}

export default route
