<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 10:48:41
 * @LastEditTime: 2021-07-30 10:46:32
 * @Description: 添加某个东西
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="
      border border-grey-light
      rounded-lg
      cursor-pointer
      flex flex-col
      justify-center
      items-center
    "
    :style="{ borderStyle, width: wh.width, height: wh.height }"
  >
    <cal-icon type="increase" color="var(--common-primary-color)" size="24" />
    <slot />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  export default defineComponent({ name: 'CalIncreaseBox' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import type { PropType } from 'vue'
  import type { AnalySizeOption } from '@tuimao/utils'
  import { analySize } from '@tuimao/utils'
  import { useTheme } from '../../../utils/theme'
  import CalIcon from '../../icon/src/Icon.vue'
  const props = defineProps({
    /** 显示插槽内容 */
    showSlot: Boolean,
    /** 边框样式 */
    borderStyle: {
      type: String as () => 'none' | 'solid' | 'dashed' | 'dotted' | 'double',
      default: 'dashed'
    },
    size: {
      type: [Number, String, Array, Object] as PropType<AnalySizeOption>
    }
  })
  const wh = computed(() => analySize(props.size || ''))
  useTheme('Common')
</script>
