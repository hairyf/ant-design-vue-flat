<!--
 * @Author: Zhilong
 * @Date: 2021-06-01 18:09:49
 * @LastEditTime: 2021-06-21 18:32:13
 * @Description: 添加某个东西
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="border-grey-light rounded-lg cursor-pointer"
    :class="[!showSlot && 'border']"
    :style="{ borderStyle }"
  >
    <div class="w-full h-full" :style="{ padding: showSlot ? '1px' : 0 }">
      <slot v-if="showSlot" />
      <div class="w-full h-full relative" v-else>
        <i
          :class="[iconClass]"
          class="
            absolute
            left-0
            right-0
            top-0
            bottom-0
            m-auto
            text-3xl
            h-36
            text-center text-primary
          "
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'

  const porps = defineProps({
    /** 显示插槽内容 */
    showSlot: Boolean,
    /** 图标类名 */
    iconClass: {
      type: String,
      default: 'nr-increase'
    },
    /** 宽度 也可以直接写样式 */
    width: [Number, String],
    /** 高度 也可以直接写样式 */
    height: [Number, String],
    /** 边框样式 */
    borderStyle: {
      type: String as () => 'none' | 'solid' | 'dashed' | 'dotted' | 'double',
      default: 'dashed'
    }
  })
</script>
