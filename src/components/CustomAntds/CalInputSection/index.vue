<!--
 * @Author: Zhilong
 * @Date: 2021-05-24 18:12:05
 * @LastEditTime: 2021-06-08 11:01:22
 * @Description: 区间输入框
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="flex h-36" :style="{ width: analyUnit(width) }">
    <cal-input :placeholder="placeholder" v-model="minValue" />
    <div class="text-center text-sm text-grey-darkmin my-auto" style="min-width: 32px">-</div>
    <cal-input :placeholder="placeholder" v-model="maxValue" />
  </div>
</template>
<script lang="ts" setup>
  import { defineProps, watch } from 'vue-demi'
  import { useShakeDataHandel } from '@/hooks/use-shakeDataHandel'
  import { analyUnit, filterPrice } from '@/utils'
  import { useModelRef } from '@/hooks/use-modelRef'

  const props = defineProps({
    placeholder: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: 175
    },
    modelValue: {
      type: Object as () => (string | number)[],
      default: ['', '']
    },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100000 },
    openAutoSize: Boolean
  })
  const modelValue = useModelRef(props, 'modelValue')
  const rangeJudge = (value: number | string) => value > props.max || +value < props.min
  const { virtualValue: minValue, realValue: minRealValue } = useShakeDataHandel(
    ({ value }) => {
      if (value === '') {
        // 允许为空
        modelValue.value[0] = ''
      } else if (props.openAutoSize && +value > +maxValue.value) {
        // 是否需要自动控制区间  且 大小区间不在范围内
        modelValue.value[0] = minRealValue.value = maxValue.value
      } else if (rangeJudge(value)) {
        // 是否不在可用范围内
        modelValue.value[0] = minRealValue.value = value > props.max ? props.max : props.min
      } else {
        modelValue.value[0] = minRealValue.value = filterPrice(value + '')
      }
    },
    { wait: 400 }
  )
  const { virtualValue: maxValue, realValue: maxRealValue } = useShakeDataHandel(
    ({ value }) => {
      if (value === '') {
        // 允许为空
        modelValue.value[1] = ''
      } else if (props.openAutoSize && +value < +minValue.value) {
        // 是否需要自动控制区间  且 大小区间不在范围内
        modelValue.value[1] = maxRealValue.value = minValue.value
      } else if (rangeJudge(value)) {
        // 是否不在可用范围内
        modelValue.value[1] = maxRealValue.value = value > props.max ? props.max : props.min
      } else {
        modelValue.value[1] = maxRealValue.value = filterPrice(value + '')
      }
    },
    { wait: 400 }
  )
  watch(
    () => modelValue.value,
    (value) => {
      minRealValue.value = value[0]
      maxRealValue.value = value[1]
    },
    { immediate: true }
  )
</script>
