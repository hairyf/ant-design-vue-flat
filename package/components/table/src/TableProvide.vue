<!--
 * @Author: Zhilong
 * @Date: 2021-05-26 16:20:45
 * @LastEditTime: 2021-07-13 11:16:48
 * @Description: 表格注入
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <slot />
</template>
<script lang="ts" setup>
  import { defineProps, provide } from 'vue'
  const props = defineProps({
    item: Object as <T>() => T,
    index: Number
  })
  provide('itemObject', { item: props.item, index: props.index })
</script>
