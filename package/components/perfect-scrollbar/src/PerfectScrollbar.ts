/*
 * @Author: Mr.Mao
 * @Date: 2021-07-15 14:05:38
 * @LastEditTime: 2021-07-15 14:19:06
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
// 引入滚动条组件
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import '../style/perfect-scrollbar.scss'
;(PerfectScrollbar as any).name = 'CalPerfectScrollbar'

export default PerfectScrollbar
