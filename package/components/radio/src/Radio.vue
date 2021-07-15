<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 19:25:11
 * @LastEditTime: 2021-07-15 10:29:14
 * @Description: 单选
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-radio class="cal-radio" v-bind="props">
    <slot></slot>
  </a-radio>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalRadio' })
</script>
<script lang="ts" setup>
  import { useTheme } from '../../../utils/theme'
  import { defineProps } from 'vue'
  const props = defineProps()
  useTheme('Common')
</script>
<style lang="scss" scoped>
  :deep(.ant-radio-inner::after) {
    background-color: var(--common-primary-color) !important;
  }
  :deep(.ant-radio-checked::after) {
    border: 1px solid var(--common-primary-color) !important;
  }
  :deep(.ant-radio-checked .ant-radio-inner) {
    border-color: var(--common-primary-color) !important;
  }
  :deep(.ant-radio) {
    transform: translateY(-1.5px);
  }
  :deep(.ant-radio:hover .ant-radio-inner) {
    border-color: var(--common-primary-color) !important;
  }
  :deep(.ant-radio-input:focus + .ant-radio-inner) {
    box-shadow: none;
  }
</style>
