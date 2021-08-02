<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 16:10:32
 * @LastEditTime: 2021-07-16 17:26:05
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="flex h-36" :style="{ width: analyUnit(width) }">
    <cal-input :placeholder="placeholder" v-model="minValue" />
    <div class="text-center text-sm text-gray-450 my-auto" style="min-width: 32px">-</div>
    <cal-input :placeholder="placeholder" v-model="maxValue" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalInputSection' })
</script>
<script lang="ts" setup>
  import { defineProps, watch } from 'vue'
  import CalInput from './Input.vue'
  import { useShakeDataHandel } from '../utils/use-shakeDataHandel'
  import { analyUnit, filterPrice } from '@tuimao/utils'
  import { useVModel } from '@vueuse/core'
  import { useTheme } from '../../../utils/theme'
  const emit = defineEmits([])
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
  const modelValue = useVModel(props, 'modelValue', emit)
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
  useTheme('Input')
</script>
