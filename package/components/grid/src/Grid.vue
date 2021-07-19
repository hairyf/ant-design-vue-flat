<!--
 * @Author: Zhilong
 * @Date: 2021-07-12 15:53:35
 * @LastEditTime: 2021-07-19 14:57:42
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="cal-grid__container">
    <div class="cal-grid__view">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
  import { analyUnit } from '@tuimao/utils'
  import { computed, defineComponent, useCssVars } from 'vue'
  export default defineComponent({ name: 'CalGrid' })
</script>
<script lang="ts" setup>
  import { toSize } from '../../../utils/common'
  import type { ToSizeOption } from '../../../utils/common'
  const props = defineProps({
    /** 子元素大小 */
    size: {
      type: Object as () => ToSizeOption,
      required: true
    },
    gap: {
      type: Number,
      default: 24
    },
    justifyContent: {
      type: String,
      default: 'space-evenly'
    },
    alignItems: {
      type: String,
      default: 'initial'
    }
  })

  // 宽高
  const handelSize = computed(() => toSize(props.size))
  useCssVars(() => ({
    ...handelSize.value,
    gap: analyUnit(props.gap),
    'justify-content': props.justifyContent,
    'align-items': props.alignItems
  }))
</script>
<style lang="scss">
  .cal-grid__view {
    display: grid;
    grid-template-columns: repeat(auto-fill, var(--width));
    gap: var(--gap);
    justify-content: var(--justify-content);
    align-items: var(--align-items);
    & > * {
      height: var(--height);
    }
  }
</style>
