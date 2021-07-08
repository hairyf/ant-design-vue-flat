<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-20 17:54:55
 * @LastEditTime: 2021-06-17 17:22:12
 * @Description: 菜单栏
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <ul class="cal-menu transition-all duration-200">
    <slot />
  </ul>
</template>
<script lang="ts" setup>
  import { defineProps, provide, toRef } from 'vue-demi'
  const props = defineProps({
    /** 收起宽度 */
    collapseWidth: {
      type: [Number, String],
      default: 66
    },
    collapse: Boolean,
    /** 默认高亮項 */
    defaultActive: {
      type: Array as () => string[],
      default: []
    }
  })
  provide('collapse', toRef(props, 'collapse'))
  provide('defaultActive', toRef(props, 'defaultActive'))
</script>
<style lang="scss" scoped></style>
