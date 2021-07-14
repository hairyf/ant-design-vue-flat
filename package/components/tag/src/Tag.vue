<!--
 * @Author: Mr.wang
 * @Date: 2021-07-14 10:00:25
 * @LastEditTime: 2021-07-14 10:22:20
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-tag v-bind="props">
    <slot />
  </a-tag>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalTag' })
</script>
<script setup lang="ts">
  import { defineProps } from 'vue'
  import { useTheme } from '../../../utils/theme'
  const props = defineProps({})
  useTheme('Common')
</script>

<style lang="scss">
  .ant-tag {
    padding: 0 4px;
    font-size: 12px;
    margin-right: 10px;
    background-color: var(--common-primary-color) !important;
    color: #fff !important;
    border: none !important;
  }
</style>
