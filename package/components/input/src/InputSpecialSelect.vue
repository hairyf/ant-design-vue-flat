<!--
 * @Author: Mr.wang
 * @Date: 2021-07-15 15:07:42
 * @LastEditTime: 2021-07-15 15:19:13
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-select
    class="cal-page-select"
    v-model:value="inputValue"
    dropdownClassName="cal-page-select-option "
    v-bind="props"
    :style="{ width: analyUnit(width) }"
  >
    <slot />
  </a-select>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalInputSpecialSelect' })
</script>
<script lang="ts" setup>
  import { analyUnit } from '@tuimao/utils'
  import { useTheme } from '../../../utils/theme'
  import { computed, defineProps, defineEmits } from 'vue'
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: ' '
    },
    width: {
      type: [Number, String],
      default: 116
    }
  })
  const emit = defineEmits(['update:modelValue'])
  const inputValue = computed({
    get: () => (props.modelValue ? props.modelValue : undefined),
    set(value) {
      emit('update:modelValue', value)
    }
  })
  useTheme('Common')
  useTheme('PageSelect')
</script>
<style lang="scss">
  .cal-page-select {
    &.ant-select {
      .ant-select-arrow {
        transform: rotateZ(0deg);
        transition: transform 0.2s;
      }
    }
    &.ant-select-open {
      .ant-select-arrow {
        transform: rotateZ(180deg);
      }
    }
    .ant-select-selection-search-input::-webkit-input-placeholder {
      @apply text-gray-500;
    }
    .anticon {
      color: #001426;
    }

    // 选择前的样式
    .ant-select-selector {
      background: none !important;
      border-color: #d9d9d9 !important;
      border-radius: 10000px !important;
      &:hover {
        border-color: var(--common-primary-color) !important;
      }
    }

    // 选择后的样式
    &.ant-select-focused {
      .ant-select-selector {
        border-color: var(--common-primary-color) !important;
        box-shadow: 0 2px 0 0 var(--common-primary-color-light-8) !important;
      }
    }
    .ant-select-selection-item {
      color: rgba(0, 20, 38, 1) !important;
    }
  }

  .cal-page-select-option {
    background-color: transparent !important;
    box-shadow: none !important;
    padding: 10px 0 0 !important;
    &.ant-select-dropdown {
      border-radius: 5px;
      overflow: initial !important;
    }
    .ant-select-dropdown-content {
      background-color: #ffffff !important;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05), 0px 0px 20px rgba(0, 0, 0, 0.02);
      padding: 4px 0 !important;
      position: relative;
      border-radius: 5px;
      &::before {
        content: '';
        width: 0;
        height: 0;
        left: 0;
        right: 0;
        top: -5px;
        margin: auto;
        position: absolute;
        border-radius: 4px;
        transform: rotateZ(45deg);
        border: transparent solid 10px;
        border-top-color: #fff;
        border-left-color: #fff;
      }
    }

    .ant-select-item-option-selected {
      background-color: #ffffff !important;
      font-weight: 400 !important;
    }
    .ant-select-item-option-active {
      background-color: var(--common-primary-color) !important;
      color: var(--pageSelect-solid-color) !important;
    }
  }
</style>
