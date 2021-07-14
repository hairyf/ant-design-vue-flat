<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 10:49:16
 * @LastEditTime: 2021-07-13 11:24:41
 * @Description: 数字标签图标
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-tag
    v-if="state"
    class="
      rounded-md
      text-white
      border-common-primary-color border-solid border
      box-border
      bg-primary
      text-xs
      ml-10
      mr-0
    "
  >
    <slot />
  </a-tag>
  <a-tag
    v-else
    class="
      rounded-md
      text-common-primary-color
      border-common-primary-color border-solid border
      box-border
      text-xs
      ml-10
      mr-0
      bg-white
    "
  >
    <slot />
  </a-tag>
</template>
<script lang="ts" setup>
  import { useTheme } from '../../../utils/theme'
  import { defineProps } from 'vue'
  const props = defineProps(['state'])
  useTheme('Common')
</script>
