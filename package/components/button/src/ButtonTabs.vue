<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-18 16:56:41
 * @LastEditTime: 2021-07-28 19:24:35
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <n-space lass="cal-button-tabs" v-bind="props">
    <div class="cal-button-item" v-for="(item, index) in tabs" :key="index">
      <cal-button
        v-bind="props"
        :type="currentModel === item.value ? activeType : defaultType"
        @click="currentModel = item.value"
        :style="{ width: analyUnit(buttonWidth) }"
      >
        {{ item.label }}
      </cal-button>
    </div>
  </n-space>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalButtonTabs' })
</script>
<script lang="ts" setup>
  import { useVModel } from '@vueuse/core'
  import { NSpace } from 'naive-ui/es/space'
  import type { VNodeChild } from 'vue'
  import CalButton from './Button.vue'
  import { inheritProps } from '../../../utils'
  import { analyUnit } from '@tuimao/utils'
  const props = defineProps({
    ...inheritProps(NSpace),
    ...(inheritProps(CalButton) as {}),
    tabs: {
      type: Object as () => { value: Key; label: string; suffix?: () => VNodeChild }[],
      default: []
    },
    current: Object as () => Key,
    buttonWidth: {
      type: [String, Number],
      default: '110px'
    },
    defaultType: {
      type: String,
      default: ''
    },
    activeType: {
      type: String,
      default: 'primary'
    },
    size: {
      type: Object as () => number | [number, number] | 'small' | 'medium' | 'large',
      default: 28
    }
  })
  const currentModel = useVModel(props, 'current')
</script>

<style lang="scss" scoped></style>
