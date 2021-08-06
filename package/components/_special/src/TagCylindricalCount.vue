<!--
 * @Author: Zhilong
 * @Date: 2021-08-06 16:51:39
 * @LastEditTime: 2021-08-06 17:39:06
 * @Description: 柱形统计图标
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="cal-cylindrical-count-container flex items-end transition-all"
    :style="{ width: handelSize.width, height: handelSize.height }"
  >
    <div
      class="flex-1 rounded-t-full duration-200"
      :class="[!state ? 'h-full' : 'h-3/5']"
      :style="{ backgroundColor: color ? color : `var(--common-primary-color)` }"
    >
    </div>
    <div
      class="flex-1 rounded-t-full opacity-25 duration-200"
      :class="[state ? 'h-full' : 'h-3/5']"
      :style="{ backgroundColor: color ? color : `var(--common-primary-color)` }"
    >
    </div>
  </div>
</template>
<script lang="ts">
  import { analySize } from '@tuimao/utils'
  import { defineComponent } from 'vue'
  import type { AnalySizeOption } from '@tuimao/utils'
  import type { PropType } from 'vue'
  import { useTheme } from '../../../utils'
  export default defineComponent({ name: 'CalTagCylindricalCount' })
</script>
<script lang="ts" setup>
  const props = defineProps({
    state: Boolean,
    size: {
      type: [Number, String, Array, Object] as PropType<AnalySizeOption>,
      default: [16, 22]
    },
    color: String
  })
  const handelSize = analySize(props.size)
  useTheme('Common')
</script>
