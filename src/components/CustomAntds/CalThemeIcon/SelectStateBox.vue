<!--
 * @Author: Zhilong
 * @Date: 2021-05-31 14:15:48
 * @LastEditTime: 2021-06-07 17:55:39
 * @Description: 选择状态框
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="cal-select-box relative inline-block overflow-hidden"
    :style="{ borderRadius: analyUnit(borderRadius) }"
  >
    <slot />
    <!-- 选中状态盒子 -->
    <div
      v-if="state"
      class="
        absolute
        left-0
        right-0
        bottom-0
        top-0
        box-border
        border-primary border-solid
        overflow-hidden
        flex
        items-center
        justify-center
      "
      :style="{ borderWidth: border && state ? '2px' : '0', borderRadius: analyUnit(borderRadius) }"
    >
      <slot name="state" />
      <div class="absolute text-right" :style="[positionStyle, tagBoxSize]">
        <div v-if="state" class="absolute border-solid" :style="[triangleStyle]" />
        <i
          v-if="state"
          class="absolute text-white text-lg"
          :class="[iconClass]"
          style="zoom: 0.5"
          :style="iconStyle"
        />
      </div>
    </div>
    <!-- hover 效果盒子 -->
    <div class="cal-select-box__hover absolute left-0 right-0 bottom-0 top-0">
      <slot name="hover" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { analyUnit } from '@/utils'
  import { computed, defineProps } from 'vue-demi'
  const props = defineProps({
    // 是否展示状态
    state: Boolean,
    // 是否开启容器圆角
    border: Boolean,
    // 容器圆角
    borderRadius: {
      type: [Number, String],
      default: 20
    },
    // 标签大小
    tagSize: {
      type: [Number, String],
      default: 40
    },
    // 标签位置
    position: {
      type: String as () =>
        | 'leftTop'
        | 'rightTop'
        | 'leftBottom'
        | 'rightBottom'
        | 'topLeft'
        | 'topRight'
        | 'bottomLeft'
        | 'bottomRight',
      default: 'rightTop'
    },
    // icon 类名
    iconClass: {
      type: String,
      default: 'nr-hook'
    }
  })
  // 标签盒子尺寸
  const tagBoxSize = computed(() => ({
    width: analyUnit(props.tagSize),
    height: analyUnit(props.tagSize)
  }))
  // 状态盒子定位
  const positionStyle = computed(() => ({
    top: /top/i.test(props.position) ? 0 : 'none',
    right: /right/i.test(props.position) ? 0 : 'none',
    bottom: /bottom/i.test(props.position) ? 0 : 'none',
    left: /left/i.test(props.position) ? 0 : 'none'
  }))
  // 三角形颜色
  const triangleStyle = computed(() => ({
    borderWidth: `calc(${analyUnit(props.tagSize)} / 2)`,
    borderTopColor: /top/i.test(props.position) ? 'var(--color-primary)' : 'transparent',
    borderRightColor: /right/i.test(props.position) ? 'var(--color-primary)' : 'transparent',
    borderBottomColor: /bottom/i.test(props.position) ? 'var(--color-primary)' : 'transparent',
    borderLeftColor: /left/i.test(props.position) ? 'var(--color-primary)' : 'transparent'
  }))
  // icon 样式
  const iconStyle = computed(() => ({
    top: /top/i.test(props.position) ? `calc(${analyUnit(props.tagSize)} / 4)` : 'none',
    right: /right/i.test(props.position) ? `calc(${analyUnit(props.tagSize)} / 4)` : 'none',
    bottom: /bottom/i.test(props.position) ? `calc(${analyUnit(props.tagSize)} / 4)` : 'none',
    left: /left/i.test(props.position) ? `calc(${analyUnit(props.tagSize)} / 4)` : 'none'
  }))
</script>
<style lang="scss">
  .cal-select-box__hover {
    display: none;
  }
  .cal-select-box:hover {
    .cal-select-box__hover {
      display: block;
    }
  }
</style>
