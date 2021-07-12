<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 14:47:41
 * @LastEditTime: 2021-07-12 14:56:37
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-input-password v-bind="props" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalInputPassword' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  const props = defineProps()
</script>
<style lang="scss">
  .ant-input-password {
    &.ant-input-affix-wrapper,
    &.ant-input-affix-wrapper-focused {
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
    &.ant-input-affix-wrapper-focused {
      border-color: var(--color-primary) !important;
      box-shadow: 0 2px 0 0 var(--color-primary-light-opacity-8) !important;
    }
    .ant-input {
      background-color: transparent;
    }
    &.ant-input-affix-wrapper-focused {
      box-shadow: 0 2px 0 0 var(--color-primary-light-opacity-8) !important;
    }
  }
  .cal-input-number-off-handel {
    .ant-input-number-handler-wrap {
      display: none;
    }
  }
</style>
