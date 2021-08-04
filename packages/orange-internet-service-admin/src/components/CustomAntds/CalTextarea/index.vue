<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-29 09:32:12
 * @LastEditTime: 2021-06-16 14:31:08
 * @Description: 富文本
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-textarea class="cal-textarea" v-bind="props" v-model:value="inputValue" />
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import { Input } from 'ant-design-vue'
  const ATextarea = Input.TextArea
  import { useModelRef } from '@/hooks/use-modelRef'
  const props = defineProps({
    modelValue: [String, Number]
  })
  const inputValue = useModelRef(props, 'modelValue')
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
    border-color: var(--color-primary) !important;
  }
  .ant-input:focus {
    border-color: var(--color-primary) !important;
    box-shadow: none !important;
  }
</style>
