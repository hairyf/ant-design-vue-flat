<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-04 10:02:59
 * @LastEditTime: 2021-06-07 16:18:45
 * @Description: 级联选择器
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-cascader class="cal-cascader" v-bind="props" />
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  const props = defineProps()
</script>
<style lang="scss">
  .cal-cascader {
    &:focus {
      .ant-cascader-input {
        box-shadow: 0 2px 0 0 rgb(255 77 79 / 20%) !important;
      }
    }
    .ant-input {
      background: none;
      border-top: none;
      border-left: none;
      border-right: none;
      @apply rounded-none;
      @apply border-gray-darkmin;
      &::-webkit-input-placeholder {
        @apply text-gray-darkmin;
      }
      &:focus,
      &:hover {
        border-color: var(--color-primary) !important;
      }
      &:focus {
        box-shadow: 0 2px 0 0 var(--color-primary-light-opacity-8) !important;
      }
    }
    .ant-input {
      background-color: transparent;
    }
    &.ant-cascader-picker:focus .ant-cascader-input {
      border-top: none;
      border-left: none;
      border-right: none;
      border-color: var(--color-primary);
      border-right-width: 1px !important;
      outline: 0;
      box-shadow: none;
    }
    .ant-cascader-picker-label {
      padding: 0 35px 0 12px;
    }
  }
</style>
