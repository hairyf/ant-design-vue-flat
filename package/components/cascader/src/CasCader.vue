<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-07-12 17:37:56
 * @LastEditTime: 2021-07-12 18:24:23
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <a-cascader class="cal-cascader" v-bind="props" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalCasCader' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import { useTheme } from '../../../utils/theme'
  import { Cascader as ACascader } from 'ant-design-vue'
  const props = defineProps()
  useTheme('Common')
</script>
<style lang="scss">
  .cal-cascader {
    &:focus {
      .ant-cascader-input {
        @apply shadow;
      }
    }
    .ant-input {
      background: none;
      border-top: none;
      border-left: none;
      border-right: none;
      @apply rounded-none;
      @apply border-gray-500;
      &::-webkit-input-placeholder {
        @apply text-gray-500;
      }
      &:focus,
      &:hover {
        border-color: var(--common-primary-color) !important;
      }
      &:focus {
        box-shadow: 0 2px 0 0 var(--common-primary-color-opacity-8) !important;
      }
    }
    .ant-input {
      background-color: transparent;
    }
    &.ant-cascader-picker:focus .ant-cascader-input {
      border-top: none;
      border-left: none;
      border-right: none;
      border-color: var(--common-primary-color);
      border-right-width: 1px !important;
      outline: 0;
      box-shadow: none;
    }
    .ant-cascader-picker-label {
      padding: 0 35px 0 12px;
    }
  }
</style>
