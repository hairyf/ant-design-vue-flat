import store from '@/store'
import router from '@/router'

/*
 * @Author: Mr.Mao
 * @Date: 2021-04-06 09:37:28
 * @LastEditTime: 2021-06-25 17:43:36
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

// 是否进行路由对比
let contrastFlag = false

// 判断是否为登录状态, 以及是否已获取路由权限表, 否则等待获取路由权限表
router.beforeEach(async (to, from, next) => {
  if (store.getters.isLogin && !contrastFlag) {
    contrastFlag = true
    await store.dispatch('setUserRoutes')
    return next(to.fullPath)
  }
  next()
})

// 判断是否为登录状态, 否则跳转至登陆页
router.beforeEach(async (to, from, next) => {
  const isLoginPath = to.matched.some((v) => v.meta.auth)
  if (store.getters.isLogin && isLoginPath) {
    return next('/index')
  }
  if (!store.getters.isLogin && !isLoginPath) {
    return next('/auth/login')
  }
  next()
})
