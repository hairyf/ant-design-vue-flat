<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 14:37:14
 * @LastEditTime: 2021-07-30 10:12:23
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <date-picker v-bind="props" :placeholder="placeholder" v-model:value="inputValue"></date-picker>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalInputDate' })
</script>
<script lang="ts" setup>
  import moment from 'moment'
  import type { unitOfTime } from 'moment'
  import DatePicker from 'ant-design-vue/es/date-picker'
  import { computed, defineEmits, defineProps } from 'vue'
  import { useTheme } from '../../../utils/theme'
  const props = defineProps({
    modelValue: [Number, String],
    placeholder: {
      type: String,
      default: ''
    },
    /* 时间精确度 */
    startOf: {
      type: String as () => unitOfTime.StartOf,
      default: 'day'
    },
    /* 格式转换为秒 */
    toSecond: Boolean
  })
  const emit = defineEmits(['update:modelValue'])
  const inputValue = computed({
    get() {
      if (props.modelValue) {
        return props.toSecond ? moment(+props.modelValue * 1000) : moment(+props.modelValue)
      }
      return undefined
    },
    set(moments: moment.Moment | undefined) {
      if (moments) {
        props.toSecond
          ? emit('update:modelValue', +moments.startOf(props.startOf).format('X'))
          : emit('update:modelValue', +moments.format('x'))
      } else {
        emit('update:modelValue', '')
      }
    }
  })
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
  :deep(.ant-input:focus) {
    box-shadow: none;
  }
  input {
    &::placeholder {
      color: #8c8c8c !important;
    }
  }
</style>
