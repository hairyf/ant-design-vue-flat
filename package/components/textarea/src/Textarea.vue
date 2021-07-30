<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 10:05:56
 * @LastEditTime: 2021-07-30 10:23:25
 * @Description: 富文本
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-textarea class="cal-textarea" v-bind="props" v-model:value="inputValue" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalTextarea' })
</script>
<script lang="ts" setup>
  import { useTheme } from '../../../utils/theme'
  import { defineProps } from 'vue'
  import Input from 'ant-design-vue/es/input'
  const ATextarea = Input.TextArea
  import { useVModel } from '@vueuse/core'
  const props = defineProps({
    modelValue: [String, Number]
  })
  const inputValue = useVModel(props, 'modelValue')
  useTheme('Common')
</script>
<style lang="scss">
  .cal-textarea {
    &.ant-input {
      padding: 14px;
      border-radius: inherit;
      border: 1px solid #8c8c8c !important;
    }
    &.ant-input-textarea {
      position: relative;
    }
    &.ant-input-textarea-show-count::after {
      position: absolute !important;
      right: 14px;
      bottom: 9px;
      font-size: 14px;
      color: #8c8c8c;
    }
    &.ant-input:hover {
      border-color: var(--common-primary-color) !important;
    }
    &.ant-input:focus {
      border-color: var(--common-primary-color) !important;
      box-shadow: none !important;
    }
    .ant-input {
      padding: 14px;
      border-radius: inherit;
      border: 1px solid #8c8c8c !important;
    }
    .ant-input:hover {
      border-color: var(--common-primary-color) !important;
    }
    .ant-input:focus {
      border-color: var(--common-primary-color) !important;
      box-shadow: none !important;
    }
    .ant-input:hover {
      border-color: var(--common-primary-color) !important;
    }
    .ant-input-textarea-show-count::after {
      position: absolute !important;
      right: 14px;
      bottom: 9px;
      font-size: 14px;
      color: #8c8c8c;
    }
  }
  textarea {
    height: 100% !important;
    resize: none !important;
  }
  textarea {
    &::placeholder {
      color: #8c8c8c !important;
    }
  }
</style>
