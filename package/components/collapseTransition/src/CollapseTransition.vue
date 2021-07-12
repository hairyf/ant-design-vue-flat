<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-22 14:18:13
 * @LastEditTime: 2021-07-12 19:53:40
 * @Description: 按钮
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <transition v-on="on">
    <slot></slot>
  </transition>
</template>
<!-- <script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalCollapseTransition' })
</script> -->
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'CalCollapseTransition',
    setup() {
      return {
        on: {
          beforeEnter(el: HTMLDivElement) {
            el.classList.add('collapse-transition')
            if (!el.dataset) (el.dataset as any) = {}

            el.dataset.oldPaddingTop = el.style.paddingTop
            el.dataset.oldPaddingBottom = el.style.paddingBottom

            el.style.height = '0'
            el.style.paddingTop = '0'
            el.style.paddingBottom = '0'
          },

          enter(el: HTMLDivElement) {
            el.dataset.oldOverflow = el.style.overflow
            if (el.scrollHeight !== 0) {
              el.style.height = el.scrollHeight + 'px'
              el.style.paddingTop = el.dataset.oldPaddingTop || '0'
              el.style.paddingBottom = el.dataset.oldPaddingBottom || '0'
            } else {
              el.style.height = ''
              el.style.paddingTop = el.dataset.oldPaddingTop || '0'
              el.style.paddingBottom = el.dataset.oldPaddingBottom || '0'
            }

            el.style.overflow = 'hidden'
          },

          afterEnter(el: HTMLDivElement) {
            // for safari: remove class then reset height is necessary
            el.classList.remove('collapse-transition')
            el.style.height = ''
            el.style.overflow = el.dataset.oldOverflow || '0'
          },

          beforeLeave(el: HTMLDivElement) {
            if (!el.dataset) (el.dataset as any) = {}
            el.dataset.oldPaddingTop = el.style.paddingTop
            el.dataset.oldPaddingBottom = el.style.paddingBottom
            el.dataset.oldOverflow = el.style.overflow

            el.style.height = el.scrollHeight + 'px'
            el.style.overflow = 'hidden'
          },

          leave(el: HTMLDivElement) {
            if (el.scrollHeight !== 0) {
              // for safari: add class after set height, or it will jump to zero height suddenly, weired
              el.classList.add('collapse-transition')
              // fix #968 collapse animation failure.
              // in vue3.0.4, transitionProperty is set 'none' to avoid 'v-leave-from' issue
              el.style.transitionProperty = 'height'
              el.style.height = '0'
              el.style.paddingTop = '0'
              el.style.paddingBottom = '0'
            }
          },

          afterLeave(el: HTMLDivElement) {
            el.classList.remove('collapse-transition')
            el.style.height = ''
            el.style.overflow = el.dataset.oldOverflow || '0'
            el.style.paddingTop = el.dataset.oldPaddingTop || '0'
            el.style.paddingBottom = el.dataset.oldPaddingBottom || '0'
          }
        }
      }
    }
  })
</script>
<style>
  .collapse-transition {
    transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out,
      0.3s padding-bottom ease-in-out;
  }
</style>
