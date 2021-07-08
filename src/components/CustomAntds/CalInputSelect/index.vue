<!--
 * @Author: Zhilong
 * @Date: 2021-05-25 11:09:20
 * @LastEditTime: 2021-06-16 16:10:15
 * @Description: 选择框
 * @LastEditors: Pan.Yu.Lin
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <a-select
    class="cal-select"
    v-model:value="inputValue"
    dropdownClassName="cal-select-option"
    v-bind="props"
    :style="{ width: analyUnit(width) }"
    allowClear
  >
    <slot />
  </a-select>
</template>
<script lang="ts" setup>
  import { analyUnit } from '@/utils'
  import { computed, defineProps, useContext } from 'vue-demi'
  const props = defineProps({
    modelValue: [String, Number],
    width: {
      type: [Number, String],
      default: 175
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
  .cal-select {
    .ant-select-selection-search-input::-webkit-input-placeholder {
      @apply text-grey-darkmin;
    }
    .anticon {
      @apply text-grey-darkmin;
    }

    // 选择前的样式
    .ant-select-selector {
      background: none !important;
      border-top: none !important;
      border-left: none !important;
      border-right: none !important;
      border-color: #8c8c8c !important;
      border-radius: 0 !important;

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
  }

  .cal-select-option {
    background-color: transparent !important;
    box-shadow: none !important;
    padding: 10px 0 0 !important;
    .ant-select-dropdown-content {
      background-color: #ffffff !important;
      box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
      padding: 4px 0 !important;
      position: relative;
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
