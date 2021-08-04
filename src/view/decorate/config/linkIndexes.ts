/*
 * @Author: Mr.Mao
 * @Date: 2021-04-22 14:16:01
 * @LastEditTime: 2021-05-13 12:02:01
 * @Description:
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { linkOption } from './options'

export const baseTabBarLinks = {
  homePage: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '店铺首页',
    value: {
      path: '/pages/baseTabBars/homePage'
    }
  },
  shopMall: <typeof linkOption>{
    type: 'classification',
    label: '店铺页面',
    name: '商品分类',
    value: {
      path: '/pages/baseTabBars/shopMall'
    }
  },
  shopCart: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '购物车',
    value: {
      path: '/pages/baseTabBars/shopCart'
    }
  },
  personal: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '个人中心',
    value: {
      path: '/pages/baseTabBars/personal'
    }
  },
  customPage: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '自定义页面',
    value: {
      path: '/pages/baseTabBars/customPage'
    }
  }
}

export const commonLinks = {
  search: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '搜索',
    value: {
      path: '/pages/commons/search'
    }
  },
  searchResult: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '搜索结果',
    value: {
      path: '/pages/commons/searchResult'
    }
  },
  shopDetails: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '商品详情',
    value: {
      path: '/pages/commons/shopDetails'
    }
  },
  feedbackSubmit: <typeof linkOption>{
    type: 'feedback',
    label: '店铺页面',
    name: '反馈',
    value: {
      path: '/pages/commons/feedbackSubmit'
    }
  },
  help: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '帮助',
    value: {
      path: '/pages/commons/help'
    }
  },
  settings: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '用户设置',
    value: {
      path: '/pages/commons/settings',
      login: true
    }
  }
}

export const shopOrderLinks = {
  myOrders: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '我的订单',
    value: {
      path: '/pages/shopOrders/myOrders',
      login: true
    }
  },
  awaitPayment: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '待付款订单',
    value: {
      path: '/pages/shopOrders/myOrders',
      login: true,
      params: { id: 1 },
      data: {}
    }
  },
  afterSales: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '退款/售后',
    value: {
      path: '/pages/shopOrders/afterSales',
      login: true
    }
  },
  orderDetails: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '订单详情',
    value: {
      path: '/pages/shopOrders/orderDetails',
      login: true
    }
  }
}

export const userLinks = {
  star: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '收藏',
    value: {
      path: '/pages/users/star',
      login: true
    }
  },
  integral: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '积分明细',
    value: {
      path: '/pages/users/integral',
      login: true
    }
  },
  wallet: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '钱包',
    value: {
      path: '/pages/users/wallet',
      login: true
    }
  },
  footprint: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '足迹',
    value: {
      path: '/pages/users/footprint',
      login: true
    }
  },
  followShops: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '关注的商品',
    value: {
      path: '/pages/users/followShops',
      login: true
    }
  },
  coupons: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '红包卡劵',
    value: {
      path: '/pages/users/coupons',
      login: true
    }
  },
  myCoupons: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '我的卡劵',
    value: {
      path: '/pages/users/myCoupons',
      login: true
    }
  },
  addressList: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '收货地址',
    value: {
      path: '/pages/users/addressList',
      login: true
    }
  },
  userInfo: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '用户信息',
    value: {
      path: '/pages/users/userInfo',
      login: true
    }
  },
  phoneEdit: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '修改手机号',
    value: {
      path: '/pages/users/phoneEdit',
      login: true
    }
  },
  userSignIn: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '签到',
    value: {
      path: '/pages/users/userSignIn',
      login: true
    }
  },
  bills: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '账单明细',
    value: {
      path: '/pages/users/bills',
      login: true
    }
  },
  recharge: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '充值',
    value: {
      path: '/pages/users/recharge',
      login: true
    }
  },
  forgetPassword: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '忘记密码',
    value: {
      path: '/pages/users/forgetPassword'
    }
  },
  withdrawal: <typeof linkOption>{
    type: 'shop',
    label: '店铺页面',
    name: '提现',
    value: {
      path: '/pages/users/withdrawal'
    }
  }
}

export const otherLinks = {
  serve: <typeof linkOption>{
    type: 'serve',
    label: '店铺页面',
    name: '客服',
    value: {
      path: '',
      login: true
    }
  }
}
