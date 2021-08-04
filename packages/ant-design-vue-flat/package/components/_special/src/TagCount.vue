<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 10:49:16
 * @LastEditTime: 2021-07-30 10:29:53
 * @Description: 数字标签图标
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-tag
    v-if="!ghost"
    class="
      rounded-md
      text-common-primary-color
      border-common-primary-color border-solid border
      box-border
      bg-white
      text-xs
      ml-10
      mr-0
    "
  >
    <slot />
  </a-tag>
  <a-tag
    v-else
    color="var(--common-primary-color)"
    class="rounded-md box-border text-xs ml-10 mr-0"
  >
    <slot />
  </a-tag>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalTagCount' })
</script>
<script lang="ts" setup>
  import { useTheme } from '../../../utils/theme'
  import { defineProps } from 'vue'
  import ATag from 'ant-design-vue/es/tag'
  defineProps({
    // 幽灵模式, 背景空白
    ghost: Boolean
  })
  useTheme('Common')
</script>
