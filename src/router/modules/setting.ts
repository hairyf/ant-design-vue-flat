/*
 * @Author: Mr.wang
 * @Date: 2021-05-24 11:27:39
 * @LastEditTime: 2021-07-01 09:41:41
 * @Description:设置路由模块
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import Layout from '@/layout/index.vue'
import EmptyLayout from '@/layout/EmptyLayout.vue'

import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  name: 'xi-tong-guan-li-ZaDH9rqz3w',
  path: '/setting',
  component: Layout,
  meta: { title: '系统管理', icon: 'nr-setting' },
  children: [
    {
      name: 'ban-quan-she-zhi-7ZQJdl7N3H',
      path: 'copyright',
      component: () => import('@/view/setting/copyright.vue'),
      meta: { title: '版权设置' }
    },
    {
      name: 'ping-tai-she-zhi-gqkCqTpjlY',
      path: 'platform',
      component: EmptyLayout,
      meta: { title: '平台设置' },
      children: [
        {
          name: 'dian-pu-she-zhi-OdTECp3v98',
          path: 'shop',
          component: () => import('@/view/setting/platform/shop.vue'),
          meta: { title: '店铺设置' }
        },
        {
          name: 'fen-lei-she-zhi-8N4n69hiwK',
          path: 'classification',
          component: () => import('@/view/setting/platform/classification.vue'),
          meta: { title: '分类设置' }
        },
        {
          name: 'xin-zeng-fen-lei-I5ZtCNGPB1',
          path: 'editClassification',
          component: () => import('@/view/setting/platform/editClassification.vue'),
          meta: { title: '新增分类', hidden: true }
        }
      ]
    },
    {
      name: 'jue-se-quan-xian-Pu98q0j8xA',
      path: 'jurisdiction',
      component: EmptyLayout,
      meta: { title: '角色权限' },
      children: [
        {
          name: 'jue-se-lie-biao-bgmR3oZlox',
          path: 'role',
          component: () => import('@/view/setting/jurisdiction/role.vue'),
          meta: { title: '角色列表' }
        },
        {
          name: 'xin-zeng-jue-se-Gw9n0aYDiy',
          path: 'newRole',
          component: () => import('@/view/setting/jurisdiction/newRole.vue'),
          meta: { title: '新增角色', hidden: true }
        },
        {
          name: 'yuan-gong-lie-biao-agaEsRmVEz',
          path: 'staff',
          component: () => import('@/view/setting/jurisdiction/staff.vue'),
          meta: { title: '员工列表' }
        },
        {
          name: 'xin-zeng-yuan-gong-sdf8hbiWnX',
          path: 'newStaff',
          component: () => import('@/view/setting/jurisdiction/newStaff.vue'),
          meta: { title: '新增员工', hidden: true }
        },
        {
          name: 'yuan-gong-xiang-qing-wSBXk3a7vM',
          path: 'statffDetails',
          component: () => import('@/view/setting/jurisdiction/statffDetails.vue'),
          meta: { title: '员工详情', hidden: true }
        }
      ]
    },
    {
      name: 'zhi-fu-she-zhi-48es80MX1K',
      path: 'payment',
      component: () => import('@/view/setting/payment.vue'),
      meta: { title: '支付设置' }
    },
    {
      name: 'xiao-xi-tong-zhi-IVk7KDXlfb',
      path: 'notification',
      component: EmptyLayout,
      meta: { title: '消息通知' },
      children: [
        {
          name: 'duan-xin-she-zhi-nV0RQ8b0JN',
          path: 'short',
          component: () => import('@/view/setting/notification/short.vue'),
          meta: { title: '短信设置' }
        },
        // {
        //   path: 'editUser',
        //   component: () => import('@/view/setting/notification/editUser.vue'),
        //   meta: { title: '编辑用户通知', hidden: true }
        // },
        {
          name: 'fu-wu-shang-duan-tong-zhi-mHNb4B8N8O',
          path: 'provider',
          component: () => import('@/view/setting/notification/provider.vue'),
          meta: { title: '服务商端通知' }
        },
        {
          name: 'shang-hu-duan-tong-zhi-QDpy2Pgk0K',
          path: 'user',
          component: () => import('@/view/setting/notification/user.vue'),
          meta: { title: '商户端通知' }
        },
        {
          name: 'duan-xin-tao-can-beuQfYnBmW',
          path: 'smsPackage',
          component: () => import('@/view/setting/notification/smsPackage.vue'),
          meta: { title: '短信套餐' }
        },
        {
          name: 'duan-xin-gou-mai-lie-biao-EwkqcUxTFr',
          path: 'smsPurchaseList',
          component: () => import('@/view/setting/notification/smsPurchaseList.vue'),
          meta: { title: '短信购买列表' }
        }
        // {
        //   path: 'editProvider',
        //   component: () => import('@/view/setting/notification/editProvider.vue'),
        //   meta: { title: '编辑服务商通知', hidden: true }
        // }
      ]
    },
    {
      name: 'fu-jian-she-zhi-6vgOdUGszq',
      path: 'enclosure',
      component: () => import('@/view/setting/enclosure.vue'),
      meta: { title: '附件设置' }
    },
    {
      name: 'xi-tong-she-zhi-Mpdgtv40QQ',
      path: 'system',
      component: () => import('@/view/setting/system.vue'),
      meta: { title: '系统设置' }
    },
    {
      name: 'cun-chu-guan-li-hO86FG4xgj',
      path: 'storageManagement',
      component: EmptyLayout,
      meta: { title: '存储管理' },
      children: [
        {
          name: 'cun-chu-she-zhi-kW8N03Yaru',
          path: 'saveSetting',
          component: () => import('@/view/setting/storageManagement/saveSetting.vue'),
          meta: { title: '存储设置' }
        },
        {
          name: 'cun-chu-rong-liang-vYSFTaEDVP',
          path: 'storageCapacity',
          component: () => import('@/view/setting/storageManagement/storageCapacity.vue'),
          meta: { title: '存储容量' }
        },
        {
          name: 'rong-liang-she-zhi-aTiyJ1HhCO',
          path: 'capacitySetting',
          component: () => import('@/view/setting/storageManagement/capacitySetting.vue'),
          meta: { title: '容量设置' }
        }
        // {
        //   path: 'capacityMeal',
        //   component: () => import('@/view/setting/storageManagement/capacityMeal.vue'),
        //   meta: { title: '容量套餐' }
        // }
      ]
    },
    {
      name: 'qi-ta-she-zhi-xNhCJAyx24',
      path: 'other',
      component: () => import('@/view/setting/other.vue'),
      meta: { title: '其他设置' }
    },
    {
      name: 'xi-tong-wei-hu-LoF0Ykn5rO',
      path: 'maintain',
      component: () => import('@/view/setting/maintain.vue'),
      meta: { title: '系统维护' }
    }
    // {
    //   path: 'journal',
    //   component: () => import('@/view/setting/journal.vue'),
    //   meta: { title: '系统日志' }
    // }
  ]
}

export default route
