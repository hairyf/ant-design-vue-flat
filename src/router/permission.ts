import store from '@/store'
import router from '@/router'

/*
 * @Author: Mr.Mao
 * @Date: 2021-04-06 09:37:28
 * @LastEditTime: 2021-06-23 09:37:29
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

// 判断是否为登录状态, 否则跳转至登陆页
// router.beforeEach(async (to, from, next) => {
//   const isLoginPath = !!['/auth/login', '/auth/register', '/auth/retrieve'].some(
//     (path) => to.path === path
//   )
//   if (store.getters.isLogin && isLoginPath) {
//     return next('/home')
//   }

//   const isConsolePath = !!['/console/'].some((path) => to.path.indexOf(path) !== -1)
//   if (!store.getters.isLogin && isConsolePath) {
//     return next('/auth/login')
//   }
//   next()
// })

// 判断是否为登录状态, 否则跳转至登陆页
router.beforeEach(async (to, from, next) => {
  const isLogin = store.getters.isLogin
  const isLoginPath = !!['/auth/login', '/auth/register', '/auth/retrieve'].some(
    (path) => to.path === path
  )
  if (isLogin && isLoginPath) {
    // return next('/home')
    return next('/console')
  }
  const isConsolePath = !!['/console/'].some((path) => to.path.indexOf(path) !== -1)
  if (!isLogin && isConsolePath) {
    return next('/auth/login')
  }
  next()
})
