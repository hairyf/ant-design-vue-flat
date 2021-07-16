<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-07-12 17:02:15
 * @LastEditTime: 2021-07-16 17:36:25
 * @Description: 
 * @LastEditors: Mr.Mao
-->
<template>
  <a-checkbox v-bind="props">
    <slot />
  </a-checkbox>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalCheckbox' })
</script>
<script setup lang="ts">
  import { defineProps } from 'vue'
  import { Checkbox as ACheckbox } from 'ant-design-vue'
  import { useTheme } from '../../../utils/theme'
  const props = defineProps()
  useTheme('Common')
</script>
<style lang="scss">
  .ant-checkbox:hover {
    border-color: var(--common-primary-color) !important;
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: var(--common-primary-color) !important;
  }
  .ant-checkbox .ant-checkbox-inner {
    border-color: #d9d9d9;
  }
  .ant-checkbox-checked::after {
    border-color: var(--common-primary-color) !important;
  }
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: var(--common-primary-color) !important;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: var(--common-primary-color) !important;
    border-color: var(--common-primary-color) !important;
  }
</style>
