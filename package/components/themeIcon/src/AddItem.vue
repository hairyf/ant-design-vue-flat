<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 10:48:41
 * @LastEditTime: 2021-07-13 11:29:01
 * @Description: 添加某个东西
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
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
            text-center text-common-primary-color
          "
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { useTheme } from '../../../utils/theme'
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
  useTheme('Common')
</script>
