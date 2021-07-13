<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 10:05:56
 * @LastEditTime: 2021-07-13 10:07:08
 * @Description: 富文本
 * @LastEditors: Mr.wang
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
  import { Input } from 'ant-design-vue'
  const ATextarea = Input.TextArea
  import { useModelRef } from '@/hooks/use-modelRef'
  const props = defineProps({
    modelValue: [String, Number]
  })
  const inputValue = useModelRef(props, 'modelValue')
  useTheme('Common')
</script>
<style lang="scss">
  textarea {
    height: 100% !important;
    resize: none !important;
  }
  .ant-input {
    border-radius: inherit;
  }
  .ant-input-textarea {
    position: relative;
  }
  .ant-input-textarea-show-count::after {
    position: absolute !important;
    right: 14px;
    bottom: 0px;
    font-size: 14px;
    color: #8c8c8c;
  }
  .ant-input:hover {
    border-color: var(--common-primary-color) !important;
  }
  .ant-input:focus {
    border-color: var(--common-primary-color) !important;
    box-shadow: none !important;
  }
</style>
