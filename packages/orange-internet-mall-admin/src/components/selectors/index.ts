/*
 * @Author: Mr.Mao
 * @Date: 2021-03-30 14:05:49
 * @LastEditTime: 2021-05-08 16:37:56
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { createApp, Component, ComponentPublicInstance, createVNode, render } from 'vue'
import IconSelectConstructor from './icon-select.vue'
import MaterialSelectConstructor from './material-select.vue'
import LinkSelectConstructor from './link-select.vue'
import MemberSelectConstructor from './member-select.vue'
import TemplateSelectConstructor from './template-select.vue'
import { subscribe } from 'pubsub-js'

// 新增VNODE虚拟节点
function createModalInstance(Constructor: Component, subscribeTarget: string) {
  return (option?: Record<string, any>) => {
    const container = document.createElement('div')
    const vm = createVNode(Constructor, {
      ...option,
      clone: () => {
        setTimeout(() => document.body.removeChild(container), 500)
      }
    })
    render(vm, container)
    container.className = 'select-container'
    if (container.firstElementChild) document.body.appendChild(container)
    return new Promise<any>((resolve, reject) => {
      subscribe(`${subscribeTarget}-confirm`, (message: string, info: any) => resolve(info))
      subscribe(`${subscribeTarget}-clone`, (message: string, info: any) => reject(info))
    })
  }
}

export const IconSelect = createModalInstance(IconSelectConstructor, 'icon')
export const MaterialSelect = createModalInstance(MaterialSelectConstructor, 'material')
export const LinkSelect = createModalInstance(LinkSelectConstructor, 'link')
export const MemberSelect = createModalInstance(MemberSelectConstructor, 'member')
export const TemplateSelect = createModalInstance(TemplateSelectConstructor, 'template')
