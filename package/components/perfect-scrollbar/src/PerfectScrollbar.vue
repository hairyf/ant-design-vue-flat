<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-20 11:26:55
 * @LastEditTime: 2021-07-20 14:51:33
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-perfect-scrollbar relative">
    <div class="cal-perfect-scrollbar__content w-full h-full overflow-auto" v-if="original">
      <slot></slot>
    </div>
    <perfect-scrollbar class="cal-perfect-scrollbar__content w-full h-full" v-bind="props" v-else>
      <slot></slot>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalPerfectScrollbar' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
  import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
  import '../style/perfect-scrollbar.scss'
  const props = defineProps({
    ...((PerfectScrollbar as any).props as {}),
    /** 是否开启原生滚动条 */
    original: Boolean
  })
</script>

<style lang="scss" scoped>
  .cal-perfect-scrollbar__content {
    position: absolute;
  }
</style>
