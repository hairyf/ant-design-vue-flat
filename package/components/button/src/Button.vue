<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-22 14:18:13
 * @LastEditTime: 2021-07-12 14:35:58
 * @Description: 按钮
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-button class="cal-btn bg-com" v-bind="{ shape: 'round', ...props }">
    <i v-if="iconClass" :class="iconClass" class="mr-6" />
    <slot></slot>
  </a-button>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalButton' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import { Button as AButton } from 'ant-design-vue'
  import { useTheme } from '~/utils/theme'
  const props = defineProps({
    ...(AButton.props as {}),
    iconClass: String
  })
  useTheme('Common')
</script>
<style lang="scss" scoped>
  .cal-btn {
    &.ant-btn-sm {
      font-size: 12px !important;
    }
    color: var(--color-primary);
    border-color: var(--color-primary-light-3);
    &:hover,
    &:focus {
      color: var(--color-primary);
      background-color: #fff;
      border-color: var(--color-primary);
    }
    &.ant-btn-primary {
      color: #ffffff;
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      &:hover,
      &:focus {
        color: #ffffff;
        background-color: var(--color-primary-light-2);
        border-color: var(--color-primary-light-2);
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
        color: var(--color-primary);
        background-color: transparent;
        border-color: transparent;
      }
    }
    :deep(.anticon-loading) {
      transform: translateY(-3px);
    }
  }
</style>
