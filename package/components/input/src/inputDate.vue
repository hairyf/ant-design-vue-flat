<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 14:37:14
 * @LastEditTime: 2021-07-12 14:57:35
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-date-picker
    v-bind="props"
    :placeholder="placeholder"
    v-model:value="inputValue"
  ></a-date-picker>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalInputDate' })
</script>
<script lang="ts" setup>
  import moment from 'moment'
  import type { unitOfTime } from 'moment'
  import { computed, defineEmits, defineProps } from 'vue'
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
</script>
<style lang="scss" scoped>
  :deep(.ant-input) {
    background: none;
    border-top: none;
    border-left: none;
    border-right: none;
    @apply rounded-none;
    @apply border-gray-darkmin;
    &::-webkit-input-placeholder {
      @apply text-gray-darkmin;
    }
    &:focus,
    &:hover {
      border-color: var(--color-primary) !important;
    }
    &:focus {
      box-shadow: 0 2px 0 0 var(--color-primary-light-opacity-8) !important;
    }
  }
</style>
