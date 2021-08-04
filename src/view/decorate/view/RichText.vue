<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:19:15
 * @LastEditTime: 2021-05-14 09:51:58
 * @Description: 富文本视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="richt-ext-container"
    :style="{
      boxShadow,
      border,
      padding,
      borderRadius,
      background
    }"
  >
    <div class="richt-ext-view" v-html="option.contentEdit.value"> </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { richTextOption } from '@/view/decorate/config/options'
  import {
    useBackgroundColor,
    usePaddingRadius,
    useComponentModalStyle
  } from '@/view/decorate/hooks/use-view-style'
  const props = defineProps({
    option: {
      type: Object as () => typeof richTextOption,
      required: true
    }
  })
  //导出配置为常量 供视图使用
  const { componentStyle, colorStyle } = props.option
  const { background } = useBackgroundColor(colorStyle)
  const { padding, borderRadius } = usePaddingRadius(props.option)
  const { boxShadow, border } = useComponentModalStyle(componentStyle)
</script>
<style lang="scss" scoped>
  .richt-ext-container {
    .richt-ext-view {
      overflow: hidden;
    }
  }
</style>
