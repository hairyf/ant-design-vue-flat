<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-20 11:26:55
 * @LastEditTime: 2021-07-30 15:34:05
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-perfect-scrollbar relative">
    <div class="cal-perfect-scrollbar__content w-full h-full overflow-auto" v-if="original">
      <slot></slot>
    </div>
    <perfect-scrollbar
      class="cal-perfect-scrollbar__content w-full h-full"
      ref="perfectScrollbarRef"
      v-bind="{ ...props, ...events }"
      onps-scroll-y="$outEvents"
      v-else
    >
      <slot></slot>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  export default defineComponent({ name: 'CalPerfectScrollbar' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
  import { capitalize } from 'lodash-es'
  import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
  const props = defineProps({
    ...((PerfectScrollbar as any).props as {}),
    /** 是否开启原生滚动条 */
    original: Boolean
  })
  const perfectScrollbarRef = ref()
  const emit = defineEmits([
    'ps-scroll-y',
    'ps-scroll-x',
    'ps-scroll-up',
    'ps-scroll-down',
    'ps-scroll-left',
    'ps-scroll-right',
    'ps-y-reach-start',
    'ps-y-reach-end',
    'ps-x-reach-start',
    'ps-x-reach-end'
  ])
  const events = [
    'ps-scroll-y',
    'ps-scroll-x',
    'ps-scroll-up',
    'ps-scroll-down',
    'ps-scroll-left',
    'ps-scroll-right',
    'ps-y-reach-start',
    'ps-y-reach-end',
    'ps-x-reach-start',
    'ps-x-reach-end'
  ].reduce((total, ekey) => {
    total[`on${capitalize(ekey)}`] = (...args: any[]) => emit(ekey as 'ps-scroll-y', ...args)
    return total
  }, {} as Record<string, any>)
</script>

<style lang="scss" scoped>
  .cal-perfect-scrollbar__content {
    position: absolute;
  }
  .ps {
    .ps__rail-y {
      z-index: 18;
      &:hover {
        background: none;
      }
    }
  }
</style>
