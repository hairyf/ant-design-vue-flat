<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-07-21 09:10:04
 * @LastEditTime: 2021-07-30 10:17:09
 * @Description: 
 * @LastEditors: Mr.Mao
-->
<template>
  <a-tree-select
    class="cal-custom-tree-select"
    v-bind="props"
    :show-checked-strategy="SHOW_PARENT"
  />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalInputTreeSelect' })
</script>
<script lang="ts" setup>
  import ATreeSelect from 'ant-design-vue/es/tree-select'
  import { defineProps } from 'vue'
  import { useTheme } from '../../../utils/theme'
  const SHOW_PARENT = ATreeSelect.SHOW_PARENT
  const props = defineProps()
  useTheme('Input')
</script>
<style lang="scss">
  .cal-custom-tree-select {
    &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
      border-radius: 0 !important;
    }
    &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
      .ant-select-selector {
      box-shadow: none !important;
    }
    .ant-select-selector {
      background: none !important;
      border-top: none !important;
      border-left: none !important;
      border-right: none !important;
      border-color: #8c8c8c !important;
      border-radius: none !important;
      color: #001426;
      &::-webkit-input-placeholder {
        @apply text-gray-500;
      }
      &:focus,
      &:hover {
        border-color: var(--input-hover-color) !important;
      }
    }
  }

  .ant-select-tree li span.ant-select-tree-switcher,
  .ant-select-tree li span.ant-select-tree-iconEle {
    line-height: 16px !important;
  }
</style>
