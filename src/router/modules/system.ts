/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-02-23 19:07:17
 * @LastEditTime: 2021-05-11 17:31:42
 * @Description: 系统路由模块
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import EmptyLayout from '@/layout/EmptyLayout.vue'
export default {
  path: '/system',
  name: 'system',
  component: Layout,
  // children: [{ path: 'index', component: () => import('@/view/system/index.vue') }],
  meta: { title: '配置', icon: 'options' },
  children: [
    {
      path: 'shopSet',
      component: EmptyLayout,
      meta: { title: '商城设置' },
      children: [
        {
          path: 'set-general',
          component: () => import('@/view/system/set-general.vue'),
          meta: { title: '通用设置' }
        },
        // {
        //   path: 'storeManagement',
        //   component: () => import('@/view/system/storeManagement.vue'),
        //   meta: { title: '门店管理' }
        // },
        // {
        //   path: 'shareSettings',
        //   component: () => import('@/view/system/shareSettings.vue'),
        //   meta: { title: '分享设置' }
        // },
        {
          path: 'announcement-management',
          component: () => import('@/view/system/announcement-management.vue'),
          meta: { title: '公告管理' }
        },
        {
          path: 'newAnnouncement',
          component: () => import('@/view/system/newAnnouncement.vue'),
          meta: { title: '新增公告', hidden: true }
        }
        // {
        //   path: 'contactUs',
        //   component: () => import('@/view/system/contactUs.vue'),
        //   meta: { title: '联系我们' }
        // }
      ]
    },
    {
      path: 'employeeAuthority',
      meta: { title: '员工权限' },
      component: EmptyLayout,
      children: [
        {
          path: 'staff-list',
          meta: { title: '员工列表' },
          component: () => import('@/view/system/staff-list.vue')
        },
        {
          path: 'staff-details',
          meta: { title: '新增员工', hidden: true },
          component: () => import('@/view/system/staff-details.vue')
        },
        {
          path: 'role-manage',
          meta: { title: '角色管理' },
          component: () => import('@/view/system/role-manage.vue')
        },
        {
          path: 'role-details',
          meta: { title: '新增角色', hidden: true },
          component: () => import('@/view/system/role-details.vue')
        }
      ]
    },
    {
      path: 'transaction-setup',
      meta: { title: '交易设置' },
      component: () => import('@/view/system/transaction-setup.vue')
    },
    {
      path: 'paymentManagement',
      meta: { title: '支付管理' },
      component: EmptyLayout,
      children: [
        {
          path: 'payment-allocation',
          meta: { title: '支付配置' },
          component: () => import('@/view/system/payment-allocation.vue')
        },
        {
          path: 'pay-template',
          meta: { title: '支付模板' },
          component: () => import('@/view/system/pay-template.vue')
        },
        {
          path: 'new-payment-template',
          meta: { title: '新增支付模板', hidden: true },
          component: () => import('@/view/system/new-payment-template.vue')
        }
      ]
    },
    {
      path: 'financial-setup',
      component: EmptyLayout,
      meta: { title: '财务设置' },
      children: [
        {
          path: 'recharge-settings',
          component: () => import('@/view/system/recharge-settings.vue'),
          meta: { title: '充值提现设置' }
        },
        {
          path: 'integral-setting',
          component: () => import('@/view/system/integral-setting.vue'),
          meta: { title: '积分设置' }
        }
      ]
    },
    {
      path: 'logisticsDistribution',
      component: EmptyLayout,
      meta: { title: '物流配送' },
      children: [
        {
          path: 'logistics-setting',
          component: () => import('@/view/system/logistics-setting.vue'),
          meta: { title: '物流配置' }
        },
        {
          path: 'distribution-scope',
          component: () => import('@/view/system/distribution-scope.vue'),
          meta: { title: '配送范围' }
        },
        {
          path: 'newTemplate',
          component: () => import('@/view/system/newTemplate.vue'),
          meta: { title: '新增模板', hidden: true }
        },
        {
          path: 'return-address',
          component: () => import('@/view/system/return-address.vue'),
          meta: { title: '退货地址' }
        },
        {
          path: 'newAddress',
          component: () => import('@/view/system/newAddress.vue'),
          meta: { title: '新增退货地址', hidden: true }
        }
      ]
    },
    {
      path: 'registration-settings',
      component: () => import('@/view/system/registration-settings.vue'),
      meta: { title: '注册设置' }
    },
    {
      path: 'other-settings',
      component: EmptyLayout,
      meta: { title: '其他设置' },
      children: [
        {
          path: 'hot-words',
          component: () => import('@/view/system/hot-words.vue'),
          meta: { title: '搜索热词' }
        },
        {
          path: 'CDN-configure',
          component: () => import('@/view/system/CDN-configure.vue'),
          meta: { title: 'CDN配置' }
        },
        {
          path: 'SMS-configuration',
          component: () => import('@/view/system/SMS-configuration.vue'),
          meta: { title: '短信配置' }
        },
        {
          path: 'mailbox-settings',
          component: () => import('@/view/system/mailbox-settings.vue'),
          meta: { title: '邮箱设置' }
        },
        {
          path: 'customer-service',
          component: () => import('@/view/system/customer-service.vue'),
          meta: { title: '客服设置' }
        },
        {
          path: 'feedback',
          component: () => import('@/view/system/feedback.vue'),
          meta: { title: '反馈设置' }
        }
      ]
    },
    {
      path: 'logging',
      component: EmptyLayout,
      meta: { title: '日志记录' },
      children: [
        {
          path: 'general-log',
          component: () => import('@/view/system/general-log.vue'),
          meta: { title: '常规日志' }
        },
        {
          path: 'special-log',
          component: () => import('@/view/system/special-log.vue'),
          meta: { title: '特殊日志' }
        },
        {
          path: 'log-details',
          component: () => import('@/view/system/log-details.vue'),
          meta: { title: '日志详情', hidden: true }
        }
      ]
    }
  ]
} as RouteRecordRaw
