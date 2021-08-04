<!--
 * @Author: Zhilong
 * @Date: 2021-05-29 08:56:06
 * @LastEditTime: 2021-07-06 11:32:59
 * @Description: 页选择按钮
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <a-select
    class="cal-page-select"
    v-model:value="inputValue"
    dropdownClassName="cal-page-select-option"
    v-bind="props"
    :style="{ width: analyUnit(width) }"
  >
    <a-select-option :value="5">5条/页</a-select-option>
    <a-select-option :value="10">10条/页</a-select-option>
    <a-select-option :value="15">15条/页</a-select-option>
    <a-select-option :value="30">30条/页</a-select-option>
    <a-select-option :value="50">50条/页</a-select-option>
    <a-select-option :value="100">100条/页</a-select-option>
  </a-select>
</template>
<script lang="ts" setup>
  import { analyUnit } from '@/utils'
  import { computed, defineProps, useContext } from 'vue-demi'
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: 10
    },
    width: {
      type: [Number, String],
      default: 116
    }
  })
  const { emit } = useContext()
  const inputValue = computed({
    get: () => (props.modelValue ? props.modelValue : undefined),
    set(value) {
      emit('update:modelValue', value)
    }
  })
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
      @apply text-gray-darkmin;
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
        border-color: var(--color-primary) !important;
      }
    }

    // 选择后的样式
    &.ant-select-focused {
      .ant-select-selector {
        border-color: var(--color-primary) !important;
        box-shadow: 0 2px 0 0 var(--color-primary-light-opacity-8) !important;
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
      background-color: var(--color-primary) !important;
      color: var(--color-solid) !important;
    }
  }
</style>
