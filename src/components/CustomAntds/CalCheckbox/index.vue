<!--
 * @Author: Mr.wang
 * @Date: 2021-05-29 10:44:15
 * @LastEditTime: 2021-06-26 15:34:58
 * @Description: 多选框组件
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-checkbox v-bind="props">
    <slot />
  </a-checkbox>
</template>
<script setup lang="ts">
  import { defineProps } from 'vue-demi'
  const props = defineProps({})
  import { Checkbox as ACheckbox } from 'ant-design-vue'
</script>
<style lang="scss">
  .ant-checkbox:hover {
    border-color: var(--color-primary) !important;
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: var(--color-primary) !important;
  }
  .ant-checkbox .ant-checkbox-inner {
    border-color: #8c8c8c;
  }
  .ant-checkbox-checked::after {
    border-color: var(--color-primary) !important;
  }
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: var(--color-primary) !important;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: var(--color-primary) !important;
    border-color: var(--color-primary) !important;
  }
</style>
