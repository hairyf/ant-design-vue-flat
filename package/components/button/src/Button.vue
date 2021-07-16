<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-22 14:18:13
 * @LastEditTime: 2021-07-13 11:37:57
 * @Description: 按钮
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-button class="cal-btn" v-bind="props">
    <slot></slot>
  </a-button>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalButton' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { Button as AButton } from 'ant-design-vue'
  import { useTheme } from '../../../utils/theme'
  const props = defineProps({
    ...AButton.props,
    shape: {
      type: String,
      default: 'round'
    }
  })
  useTheme('Common')
</script>
<style lang="scss" scoped>
  .cal-btn {
    &.ant-btn-sm {
      font-size: 12px !important;
    }
    color: var(--common-primary-color);
    border-color: var(--common-primary-color-light-2);
    &:hover,
    &:focus {
      color: var(--common-primary-color);
      background-color: #fff;
      border-color: var(--common-primary-color);
    }
    &.ant-btn-primary {
      color: #ffffff;
      background-color: var(--common-primary-color);
      border-color: var(--common-primary-color);
      &:hover,
      &:focus {
        color: #ffffff;
        background-color: var(--common-primary-color-light-2);
        border-color: var(--common-primary-color-light-2);
      }
    }
    &.ant-btn-danger {
      color: var(--color-solid);
      border-color: #ff7875;
      color: var(--color-solid);
      &:hover,
      &:focus {
        background-color: #ffa39e;
        border-color: #ffa39e;
      }
    }
    &.ant-btn-link {
      background-color: transparent;
      border-color: transparent;
      &:hover,
      &:focus {
        color: var(--common-primary-color);
        background-color: transparent;
        border-color: transparent;
      }
    }
    :deep(.anticon-loading) {
      transform: translateY(-3px);
    }
  }
</style>
