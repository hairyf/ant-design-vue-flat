<!--
 * @Author: Zhilong
 * @Date: 2021-04-17 14:29:58
 * @LastEditTime: 2021-05-06 10:26:26
 * @Description: 门店定位视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="store-loacation-container">
    <div class="store-loacation-view" :style="{ background }">
      <!-- 左边定位和距离 -->
      <div class="view-left">
        <!-- 定位Icon 文字 箭头按钮 -->
        <div>
          <i class="oe-location-outline oe-m-r-8" :style="{ color: colorStyle.color.icon }" />
          <div class="oe-m-r-6">
            <div class="oe-m-b-6" :style="{ color: colorStyle.color.title }">糖艺(嘉心糖店)</div>
            <div style="font-size: 12px; zoom: 0.9" :style="{ color: colorStyle.color.text }">
              距您140m
            </div>
          </div>
          <i class="oe-arrow-down" :style="{ color: colorStyle.color.subIcon }" @click.stop />
        </div>
      </div>
      <!-- 右边按钮 -->
      <div class="view-right" :style="{ color: colorStyle.color.btn }" @click.stop>
        <i class="oe-location-border oe-m-r-5" />
        <div> 重新定位</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { storeLocationOption } from '@/view/decorate/config/options'
  import { useBackgroundColor } from '@/view/decorate/hooks/use-view-style'
  const props = defineProps({
    option: {
      type: Object as () => typeof storeLocationOption,
      required: true
    }
  })
  //导出配置为常量 供视图使用
  const { colorStyle } = props.option
  const { background } = useBackgroundColor(props.option.colorStyle)
</script>
<style lang="scss" scoped>
  .store-loacation-container {
    .store-loacation-view {
      display: flex;
      justify-content: space-between;
      padding: 12px;

      .view-left {
        padding: 3px;
        font-size: 14px;
        color: #000000;
        > div {
          display: flex;
        }
      }
      .view-right {
        color: #555555;
        font-size: 12px;
        padding: 3px 0;
        display: flex;
      }
    }
  }
</style>
