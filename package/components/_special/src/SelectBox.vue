<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 10:49:30
 * @LastEditTime: 2021-07-30 10:47:02
 * @Description: 选择状态框
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="cal-select-box relative inline-block overflow-hidden"
    :style="{ borderRadius: analyUnit(borderRadius) }"
  >
    <slot />
    <!-- 选中状态盒子 -->
    <div
      v-if="select"
      class="
        absolute
        left-0
        right-0
        bottom-0
        top-0
        box-border
        border-common-primary-color border-solid
        overflow-hidden
        flex
        items-center
        justify-center
      "
      :style="{
        borderWidth: border && select ? '2px' : '0',
        borderRadius: analyUnit(borderRadius)
      }"
    >
      <slot name="select" />
      <div class="absolute text-right" :style="[positionStyle, tagBoxSize]">
        <div v-if="select" class="absolute border-solid" :style="[triangleStyle]" />
        <cal-icon
          v-if="select"
          class="absolute"
          type="yes"
          color="#ffffff"
          size="30"
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
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalSelectBox' })
</script>
<script lang="ts" setup>
  import { analyUnit } from '@tuimao/utils'
  import { computed, defineProps } from 'vue'
  import { useTheme } from '../../../utils/theme'
  import CalIcon from '../../icon/src/Icon.vue'
  import type { PropType } from 'vue'
  import type { AnalySizeOption } from '@tuimao/utils'
  const props = defineProps({
    // 是否展示状态
    select: Boolean,
    // 是否开启容器圆角
    border: {
      type: Boolean,
      default: true
    },
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
    borderTopColor: /top/i.test(props.position) ? 'var(--common-primary-color)' : 'transparent',
    borderRightColor: /right/i.test(props.position) ? 'var(--common-primary-color)' : 'transparent',
    borderBottomColor: /bottom/i.test(props.position)
      ? 'var(--common-primary-color)'
      : 'transparent',
    borderLeftColor: /left/i.test(props.position) ? 'var(--common-primary-color)' : 'transparent'
  }))
  // icon 样式
  const iconStyle = computed(() => ({
    top: /top/i.test(props.position) ? `calc(${analyUnit(props.tagSize)} / 4)` : 'none',
    right: /right/i.test(props.position) ? `calc(${analyUnit(props.tagSize)} / 4)` : 'none',
    bottom: /bottom/i.test(props.position) ? `calc(${analyUnit(props.tagSize)} / 4)` : 'none',
    left: /left/i.test(props.position) ? `calc(${analyUnit(props.tagSize)} / 4)` : 'none'
  }))
  useTheme('Common')
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
