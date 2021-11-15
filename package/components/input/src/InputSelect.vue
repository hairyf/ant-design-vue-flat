<!--
 * @Author: Mr.wang
 * @Date: 2021-07-15 14:48:30
 * @LastEditTime: 2021-07-30 10:15:33
 * @Description: 选择框
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
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
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalInputSelect' })
</script>
<script lang="ts" setup>
  import { analyUnit } from '@tuimao/utils'
  import { computed, defineProps, defineEmits } from 'vue-demi'
  import ASelect from 'ant-design-vue/es/select'
  import { useTheme } from '../../../utils/theme'
  const props = defineProps({
    modelValue: [String, Number],
    width: {
      type: [Number, String],
      default: 175
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
  useTheme('Input')
</script>
<style lang="scss">
  .cal-select {
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

    .ant-select-selection-placeholder {
      color: #8c8c8c !important;
    }
    .anticon {
      @apply text-gray-450;
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
        border-color: var(--common-primary-color-light-8) !important;
      }
    }

    // 选择后的样式
    &.ant-select-focused {
      .ant-select-selector {
        border-color: var(--common-primary-color-light-8) !important;
        box-shadow: 0 2px 0 0 var(--common-primary-color-light-8) !important;
      }
    }
    ::placeholder {
      color: #8c8c8c !important;
    }
  }

  .cal-select-option {
    background-color: transparent !important;
    box-shadow: none !important;
    padding: 7px 0 0 !important;
    &.ant-select-dropdown-placement-bottomLeft {
      overflow: initial !important;
    }
    .ant-select-dropdown-content {
      background-color: #ffffff !important;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05), 0px 0px 20px rgba(0, 0, 0, 0.02);
      border-radius: 5px;
      padding: 8px 0 !important;
      position: relative;
      &::before {
        content: '';
        width: 0;
        height: 0;
        left: 0;
        right: 0;
        top: -2.5px;
        margin: auto;
        position: absolute;
        border-radius: 4px;
        transform: rotateZ(45deg);
        border: transparent solid 10px;
        border-top-color: #fff;
        border-left-color: #fff;
      }
      .ant-select-item-empty {
        color: #8c8c8c !important;
      }
    }

    .ant-select-item-option-selected {
      background-color: #ffffff !important;
      font-weight: 400 !important;
    }
    .ant-select-item-option-active {
      background-color: var(--common-primary-color-light-8) !important;
      color: #000 !important;
    }
  }
</style>
