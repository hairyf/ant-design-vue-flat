<!--
 * @Author: Zhilong
 * @Date: 2021-05-28 18:16:47
 * @LastEditTime: 2021-05-28 19:58:03
 * @Description: 数字标签图标
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <a-tag
    v-if="state"
    class="
      rounded-md
      text-white
      border-primary border-solid border
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
      text-primary
      border-primary border-solid border
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
  import { defineProps } from 'vue-demi'
  const props = defineProps(['state'])
</script>
