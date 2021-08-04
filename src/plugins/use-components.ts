/*
 * @Author: Mr.Mao
 * @Date: 2021-03-19 16:35:30
 * @LastEditTime: 2021-05-08 17:27:51
 * @Description: 引入全局组件
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { App } from 'vue'
import ECharts from 'vue-echarts'
import ColorPickr from '@/components/color-pickr/color-pickr.vue'
import MobileIframe from '@/components/mobile-iframe/mobile-iframe.vue'
import MobileEmulator from '@/components/mobile-emulator/mobile-emulator.vue'
import QrCode from '@/components/qr-code/qr-code.vue'
import CountItem from '@/components/common/count-item.vue'
import CustomButton from '@/components/common/custom-button.vue'
import IconSelect from '@/components/selectors/icon-select.vue'
import LinkSelect from '@/components/selectors/link-select.vue'
import EditChannel from '@/components/shop-model/edit-channel.vue'
import TinymceEditor from '@/components/tinymce-editor/tinymce-editor.vue'
export const useComponents = (app: App<Element>) => {
  app.component('TinymceEditor', TinymceEditor)
  app.component('VCharts', ECharts)
  app.component('CountItem', CountItem)
  app.component('ColorPickr', ColorPickr)
  app.component('MobileIframe', MobileIframe)
  app.component('MobileEmulator', MobileEmulator)
  app.component('CustomButton', CustomButton)
  app.component('IconSelect', IconSelect)
  app.component('LinkSelect', LinkSelect)
  app.component('QrCode', QrCode)
  app.component('EditChannel', EditChannel)
}
