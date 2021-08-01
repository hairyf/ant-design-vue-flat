<!--
 * @Author: Mr.wang
 * @Date: 2021-07-18 15:20:09
 * @LastEditTime: 2021-07-30 10:35:27
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <range-picker v-bind="props" :placeholder="placeholder" class="cal-input-range-picker">
    <template #suffixIcon>
      <cal-icon type="date" size="20" color="#8C8C8C"> </cal-icon>
    </template>
  </range-picker>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalInputRangePicker' })
</script>
<script lang="ts" setup>
  import DetePicker from 'ant-design-vue/es/date-picker'
  import { defineEmits, defineProps } from 'vue'
  import { useTheme } from '../../../utils/theme'
  import CalIcon from '../../icon/src/Icon.vue'
  const RangePicker = DetePicker.RangePicker
  const props = defineProps({
    placeholder: {
      type: Object as () => [string, string],
      default: ''
    }
  })
  const emit = defineEmits(['update:modelValue'])
  useTheme('Input')
</script>
<style lang="scss" scoped>
  :deep(.ant-input) {
    background: none !important;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-color: #8c8c8c !important;
    @apply rounded-none;
    @apply text-gray-450;
    &::-webkit-input-placeholder {
      @apply text-gray-450;
    }
    &:focus,
    &:hover {
      border-color: var(--input-hover-color) !important;
    }
    &:focus {
      box-shadow: 0 2px 0 0 var(--input-focus-color) !important;
    }
  }
  :deep(.ant-calendar-picker-clear) {
    right: 0px;
    background-color: inherit !important;
  }
  :deep(.ant-calendar-picker-input:not(.ant-input-disabled)) {
    box-shadow: none !important;
  }
  input {
    &::placeholder {
      color: #8c8c8c !important;
    }
  }
</style>
