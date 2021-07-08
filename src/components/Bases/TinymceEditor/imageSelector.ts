/*
 * @Author: Mr.Mao
 * @Date: 2021-05-18 10:31:08
 * @LastEditTime: 2021-06-26 14:51:21
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import * as t from 'tinymce'
import { forEach } from 'lodash'
import { CalImageSelect } from '@/components/Business/CalImageSelect'
export default function imageSelector(editor: t.Editor) {
  editor.ui.registry.addButton('imageSelector', {
    icon: 'image',
    tooltip: 'select image from image lib',
    async onAction() {
      const images = await CalImageSelect()
      forEach(images, ({ path: { url } }) => {
        console.log(url)
        const imageLabel = `<img alt="Smiley face" width="100%" src="${url}"/>`
        editor.execCommand('mceInsertContent', false, imageLabel)
      })
    }
  })
}
