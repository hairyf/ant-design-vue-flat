<!--
 * @Author: Zhilong
 * @Date: 2021-07-12 15:53:35
 * @LastEditTime: 2021-07-12 17:55:13
 * @Description: 
 * @LastEditors: Zhilong
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
  import { analyUnit } from '@/utils'
  import { computed, defineComponent, useCssVars } from 'vue'
  export default defineComponent({ name: 'CalGrid' })
</script>
<script lang="ts" setup>
  const props = defineProps({
    /** 子元素大小 */
    size: {
      type: [Number, String, Object as () => { width: Key; height: Key }],
      require: true
    },
    gap: {
      type: Number,
      default: 24
    }
  })

  // 宽高
  const handelSize = computed((): { width: string; height: string } => {
    if (typeof props.size === 'string' || typeof props.size === 'number') {
      // 正方形的单条数据
      return { width: analyUnit(props.size), height: analyUnit(props.size) }
    } else if (typeof props.size === 'object') {
      // 对象类型的数据
      return {
        width: analyUnit(props.size?.width || '0'),
        height: analyUnit(props.size?.height || '0')
      }
    }
    // 默认数据
    return { width: '', height: '' }
  })
  useCssVars(() => ({
    ...handelSize.value,
    gap: analyUnit(props.gap)
  }))
</script>
<style lang="scss">
  .cal-grid__view {
    display: grid;
    grid-template-columns: repeat(auto-fill, var(--width));
    // grid-template-rows: repeat(auto-fit, var(--height));
    gap: var(--gap);
    justify-content: space-evenly;
    & > * {
      height: var(--height);
    }
  }
</style>
