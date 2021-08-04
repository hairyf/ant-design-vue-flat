/*
 * @Author: Mr.Mao
 * @Date: 2021-03-19 16:56:06
 * @LastEditTime: 2021-04-30 16:31:08
 * @Description: 初始化执行
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

// 全局样式引入
import 'normalize.css/normalize.css'
// import '@/assets/custom-assets/style/reset.css'
import '@/style/class.scss'

// 初始化执行
import '@/components/selectors'
import '@/router/permission'
import '@/router/nprogress'
import { httpConfig } from '@/api/http.config'
import { App } from '@vue/runtime-core'
import store from '@/store'
import { RECEVE_USER_INFO } from '@/store/types'

// 携带请求头参数
const params = new URLSearchParams(location.search)
const shopid = params.get('shopid')
if (shopid && httpConfig.headers['common']) httpConfig.headers['common']['shopid'] = shopid
if (window.config.userInfo) {
  store.commit(RECEVE_USER_INFO, window.config.userInfo)
}

if (store.state.user.userInfo) {
  store.dispatch('generalSettings', { key: 'ShopSet' })
  store.dispatch('getIcpAgreement')
}

export const useInitialize = (app: App<Element>) => {
  app.directive('focus', {
    mounted: (el) => {
      el.focus?.()
      el.querySelector('input')?.focus()
    }
  })
}
