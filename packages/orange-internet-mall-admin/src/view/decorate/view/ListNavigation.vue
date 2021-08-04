<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:19:15
 * @LastEditTime: 2021-04-27 11:04:18
 * @Description: 弹窗视图区
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="list-navigation-container"
    :style="{
      padding,
      borderRadius,
      background
    }"
  >
    <div
      class="list-navigation-view"
      :style="{ backgroundColor: option.colorStyle.color.subBackground }"
    >
      <div
        class="navigation-item oe-flex"
        v-for="item in option.listContent.list"
        :key="item.CACHE_KEY_LIST"
        :style="{
          color: option.colorStyle.color.text,
          borderBottomColor: option.colorStyle.color.line
        }"
      >
        <view-image
          class="image oe-m-r-8"
          :label-color="option.colorStyle.color.icon"
          v-if="option.listContent.iconStatus && item.image"
          :src="item.image"
        />
        <div class="text oe-flex-1">
          {{ item.title }}
        </div>
        <i class="oe-arrow-right" style="font-size: 14px; color: #9f9f9f" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { listNavigationOption } from '@/view/decorate/config/options'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'
  import {
    useBackgroundColor,
    usePaddingRadius,
    useComponentModalStyle
  } from '@/view/decorate/hooks/use-view-style'
  const props = defineProps({
    option: {
      type: Object as () => typeof listNavigationOption,
      required: true
    }
  })
  //导出配置为常量 供视图使用
  const { colorStyle } = props.option
  const { background } = useBackgroundColor(colorStyle)
  const { padding, borderRadius } = usePaddingRadius(props.option)
</script>
<style lang="scss" scoped>
  .navigation-item {
    border-bottom: solid 1px #eeeeee;
    padding: 15px;
    &:last-child {
      border: none;
    }
  }
  .image {
    width: 16px;
    height: 16px;
  }
  .text {
    font-size: 14px;
  }
</style>
