import nProgress from 'nprogress'
import router from '@/router'

/*
 * @Author: Mr.Mao
 * @Date: 2021-04-06 09:37:28
 * @LastEditTime: 2021-06-02 15:10:06
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  nProgress.start()
  next()
})
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  nProgress.done()
})
