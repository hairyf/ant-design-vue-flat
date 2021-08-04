<!--
 * @Author: Zhilong
 * @Date: 2021-08-04 15:10:36
 * @LastEditTime: 2021-08-04 17:29:56
 * @Description: 更多的切换组
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="rounded-xl bg-white h-24 box-border border border-solid border-gray-300 flex relative"
    style="width: max-content"
  >
    <div
      class="absolute switch-select"
      :style="{
        width: analyUnit(selectBoxRef?.clientWidth || 0),
        left: analyUnit(selectBoxRef?.offsetLeft || 0)
      }"
    />
    <div class="flex z-10">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, provide, reactive, ref, watch } from 'vue-demi'
  import type { InjectionKey } from 'vue-demi'
  export default defineComponent({ name: 'CalMoreSwitchGroup' })
  export const switchKey: InjectionKey<typeof value> = Symbol()
</script>
<script lang="ts" setup>
  import { analyUnit } from '@tuimao/utils'
  import { useVModel } from '@vueuse/core'
  import { useTheme } from '../../../utils'
  const props = defineProps({
    gap: {
      type: [Number, String],
      default: 16
    },
    modelValue: {
      type: [Number, String]
    }
  })
  const selectBoxRef = ref<HTMLElement | null>()
  const value = reactive({
    props,
    modelValue: useVModel(props, 'modelValue'),
    selectBoxRef
  })
  provide(switchKey, value)
  useTheme('Common')
</script>
<style lang="scss" scoped>
  .switch-select {
    height: 100%;
    transition: 0.2s;
    @apply rounded-xl bg-common-primary-color;
  }
</style>
