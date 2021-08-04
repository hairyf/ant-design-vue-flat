<!--
 * @Author: Zhilong
 * @Date: 2021-05-22 15:53:16
 * @LastEditTime: 2021-06-09 14:48:42
 * @Description: 志龙写的 ! 2021年5月22日 15:53:28
 * @LastEditors: Zhilong
 * @autograph: ?
-->
<template>
  <a-date-picker
    v-bind="props"
    :placeholder="placeholder"
    v-model:value="inputValue"
  ></a-date-picker>
</template>
<script lang="ts" setup>
  import moment from 'moment'
  import type { unitOfTime } from 'moment'
  import { computed, defineEmit, defineProps } from 'vue-demi'

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
  const emit = defineEmit()
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
