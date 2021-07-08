<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-24 10:52:23
 * @LastEditTime: 2021-06-24 12:03:50
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-range-picker class="cal-range-picker" v-model:value="times" />
</template>
<script lang="ts" setup>
  import { computed, defineProps, defineEmit, ref, watch, watchEffect } from 'vue-demi'
  import moment from 'moment'
  const props = defineProps({
    modelValue: Array as () => number[]
  })
  const emit = defineEmit(['update:modelValue'])
  const times = computed({
    get: () => props.modelValue?.map((v) => moment(v * 1000)) || [],
    set: (value) =>
      emit(
        'update:modelValue',
        value.map((v) => v.format('X'))
      )
  })
</script>
<style lang="scss">
  .cal-range-picker {
    .ant-calendar-picker-input {
      background-color: transparent;
      background: none;
      border-top: none;
      border-left: none;
      border-right: none;
      @apply rounded-none border-gray-500;
    }
  }
</style>
