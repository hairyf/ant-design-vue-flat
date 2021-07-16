<!--
 * @Author: Mr.wang
 * @Date: 2021-07-15 17:40:10
 * @LastEditTime: 2021-07-15 19:15:48
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <radio-button v-bind="props" class="cal-radios-button">
    <slot />
  </radio-button>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalRadioButton' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { useTheme } from '../../../utils/theme'
  import { RadioButton } from 'ant-design-vue'
  const props = defineProps()
  useTheme('Common')
</script>

<style lang="scss">
  .cal-radios-button {
    border-radius: 29px !important;
    margin-right: 28px !important;
    border-left: 1px solid #d9d9d9 !important;
    color: #001426;
    min-width: 76px;
    height: 24px !important;
    font-size: 12px !important;
    line-height: 21px !important;
    text-align: center;
    &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
      border-color: var(--common-primary-color) !important;
      background-color: var(--common-primary-color);
      color: var(--common-base-color) !important;
    }
    &.ant-radio-button-wrapper:hover {
      color: var(--common-base-color) !important;
      background-color: var(--common-primary-color);
    }
    &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
      color: var(--common-base-color);
      border-color: var(--common-primary-color) !important;
    }
    &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover::before {
      background-color: var(--common-primary-color);
    }
    &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):focus-within {
      box-shadow: none;
    }
    &.ant-radio-button-wrapper:not(:first-child)::before {
      display: none;
    }
    &.ant-radio-button-wrapper-disabled {
      border: none !important;
      background: #d9d9d9;
      color: #8c8c8c !important;
    }
    &.ant-radio-button-wrapper-disabled:hover {
      border: none !important;
      background: #d9d9d9;
      color: #8c8c8c !important;
    }
  }
</style>
