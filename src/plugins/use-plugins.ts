/*
 * @Author: Mr.Mao
 * @Date: 2021-03-19 16:35:43
 * @LastEditTime: 2021-07-25 18:14:34
 * @Description: 引入插件
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { App } from 'vue'
import router from '@/router'
import 'animate.css'

// 全量引入 ant-design-vue-flat 组件库

const buildTest = import.meta.env.VITE_APP_BUILD_TEST === 'buildTest'
if (buildTest) {
  import('../../dist/ant-design-vue-flat.esm.css')
} else {
  import('~/main.scss')
}

import AntdFlat from '~/index'
// import '~/main.scss'
import AntdFlatBuild from '../../dist/ant-design-vue-flat.esm.js'
// import '../../dist/ant-design-vue-flat.esm.css'

console.log(import.meta.env)

// 汉化element-plus
import ElementPlus from 'element-plus'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// 引入颜色选择框
import 'vanilla-colorful'

export const usePlugins = (app: App<Element>) => {
  // 引入插件
  app.use(router)
  app.use(buildTest ? AntdFlatBuild : AntdFlat)
  app.use(ElementPlus, { locale })
}
