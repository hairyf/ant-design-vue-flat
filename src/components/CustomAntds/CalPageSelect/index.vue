<!--
 * @Author: Zhilong
 * @Date: 2021-05-29 08:56:06
 * @LastEditTime: 2021-07-15 09:18:16
 * @Description: 页选择按钮
 * @LastEditors: Mr.wang
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
    <a-select-option :value="5">5条数据</a-select-option>
    <a-select-option :value="10">10条数据</a-select-option
    ><a-select-option :value="15">15条数据</a-select-option
    ><a-select-option :value="20">20条数据</a-select-option>
  </a-select>
</template>
<script lang="ts" setup>
  import { analyUnit } from '@/utils'
  import { computed, defineProps, defineEmits } from 'vue-demi'
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
  const emit = defineEmits(['update:modelValue'])
  const inputValue = computed({
    get: () => (props.modelValue ? props.modelValue : undefined),
    set(value) {
      emit('update:modelValue', value)
    }
  })
</script>
<style lang="scss">
  .cal-page-select {
    .ant-select-selection-search-input::-webkit-input-placeholder {
      @apply text-grey-darkmin;
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
  }

  .cal-page-select-option {
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
