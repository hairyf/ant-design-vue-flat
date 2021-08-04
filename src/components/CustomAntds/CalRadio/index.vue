<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-29 09:53:01
 * @LastEditTime: 2021-07-06 10:12:34
 * @Description: 单选
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-radio class="cal-radio" v-bind="props">
    <slot></slot>
  </a-radio>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  const props = defineProps({})
</script>
<style lang="scss" scoped>
  :deep(.ant-radio-inner::after) {
    background-color: var(--color-primary) !important;
  }
  :deep(.ant-radio-checked::after) {
    border: 1px solid var(--color-primary) !important;
  }
  :deep(.ant-radio-checked .ant-radio-inner) {
    border-color: var(--color-primary) !important;
  }
  :deep(.ant-radio) {
    transform: translateY(-1.5px);
  }
  :deep(.ant-radio:hover .ant-radio-inner) {
    border-color: var(--color-primary) !important;
  }
  :deep(.ant-radio-input:focus + .ant-radio-inner) {
    box-shadow: none;
  }
</style>
