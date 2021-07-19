<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 14:47:41
 * @LastEditTime: 2021-07-19 17:02:12
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <input-password v-bind="props" class="cal-password" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalInputPassword' })
</script>
<script lang="ts" setup>
  import { useTheme } from '../../../utils/theme'
  import { defineProps } from 'vue'
  import { InputPassword } from 'ant-design-vue'
  const props = defineProps()
  useTheme('Input')
</script>

<style lang="scss">
  .cal-password {
    &.ant-input-password {
      &.ant-input-affix-wrapper,
      &.ant-input-affix-wrapper-focused {
        background: none !important;
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
        border-color: #8c8c8c !important;
        @apply rounded-none;
        @apply text-gray-500;
        &::-webkit-input-placeholder {
          @apply text-gray-500;
        }
        &:focus,
        &:hover {
          border-color: var(--input-hover-color) !important;
        }
        &:focus {
          box-shadow: 0 2px 0 0 var(--input-focus-color) !important;
        }
      }
      &.ant-input-affix-wrapper-focused {
        border-color: var(--input-hover-color) !important;
        box-shadow: 0 2px 0 0 var(--input-focus-color) !important;
      }
      &.ant-input-affix-wrapper .ant-input {
        border: none !important;
      }
      .ant-input {
        background-color: transparent;
      }
      &.ant-input-affix-wrapper-focused {
        box-shadow: 0 2px 0 0 var(--input-focus-color) !important;
      }
      &.ant-input-affix-wrapper > input.ant-input {
        border: none !important;
      }
    }
    .cal-input-number-off-handel {
      .ant-input-number-handler-wrap {
        display: none;
      }
    }
    input {
      &::placeholder {
        color: #8c8c8c !important;
      }
    }
  }
</style>
