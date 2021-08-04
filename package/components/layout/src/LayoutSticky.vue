<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-29 16:26:48
 * @LastEditTime: 2021-07-19 14:43:44
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="cal-sticky-layout flex flex-col"
    :style="[
      height ? { height: analyUnit(height || '') } : { minHeight: analyUnit(minHeight || '') }
    ]"
  >
    <div class="cal-sticky-layout__content flex-1 overflow-y-auto relative">
      <slot />
    </div>
    <div class="cal-sticky-layout__sticky">
      <slot name="sticky" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalLayoutSticky' })
</script>
<script lang="ts" setup>
  import { analyUnit } from '@tuimao/utils'
  import { defineProps } from 'vue'
  defineProps({
    height: {
      type: [String, Number]
    },
    minHeight: {
      type: [String, Number]
    }
  })
</script>
<style lang="scss">
  .cal-sticky-layout__content {
    // 滚动条凹槽的颜色，还可以设置边框属性
    &::-webkit-scrollbar-track-piece {
      background-color: none;
    }
    // 滚动条的宽度
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    // 滚动条的设置
    &::-webkit-scrollbar-thumb {
      background-color: #dddddd;
      background-clip: padding-box;
      min-height: 28px;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: #bbb;
    }
  }
</style>
