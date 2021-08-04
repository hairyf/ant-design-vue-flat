/*
 * @Author: Mr.wang
 * @Date: 2021-05-24 18:01:12
 * @LastEditTime: 2021-07-10 17:03:56
 * @Description: 渠道模块路由
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Layout from '@/layout/index.vue'
import EmptyLayout from '@/layout/EmptyLayout.vue'

import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  name: 'qu-dao-guan-li-klrzLXHoCV',
  path: '/channel',
  component: Layout,
  meta: { title: '渠道管理', icon: 'nr-channel' },
  children: [
    {
      name: 'qu-dao-shi-chang-qQN2hnSx7q',
      path: 'market',
      component: () => import('@/view/channel/market.vue'),
      meta: { title: '渠道市场' }
    },
    {
      name: 'yi-gou-qu-dao-skojnYUbhm',
      path: 'purchased',
      component: () => import('@/view/channel/purchased.vue'),
      meta: { title: '已购渠道' }
    },
    {
      name: 'she-zhi-qu-dao-Ul0TCN7ko2',
      path: 'setup',
      component: () => import('@/view/channel/setup.vue'),
      meta: { title: '设置渠道', hidden: true }
    },
    {
      name: 'guan-li-xiao-cheng-xu-P7WC5qZkyo',
      path: 'administrationApplets',
      component: () => import('@/view/channel/administrationApplets.vue'),
      meta: { title: '管理小程序', hidden: true }
    },
    {
      name: 'di-san-fang-she-zhi-WluaRBgrcc',
      path: 'settings',
      component: () => import('@/view/channel/settings.vue'),
      meta: { title: '第三方设置' }
    },
    {
      name: 'xiao-cheng-xu-dai-ma-cYtyEl6Ici',
      path: 'code',
      component: () => import('@/view/channel/code.vue'),
      meta: { title: '小程序代码', hidden: true }
    }
    // {
    //   path: 'list',
    //   component: () => import('@/view/channel/list.vue'),
    //   meta: { title: '小程序列表' }
    // }
  ]
}

export default route
