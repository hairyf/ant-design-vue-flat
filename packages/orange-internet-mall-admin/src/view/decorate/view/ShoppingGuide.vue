<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:19:15
 * @LastEditTime: 2021-05-12 15:28:47
 * @Description: 导购视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="shopping-guide-container"
    :style="{
      boxShadow,
      border,
      padding
    }"
  >
    <div class="shopping-guide-view oe-flex" :style="{ borderRadius }">
      <view-image :size="80" :src="option.contentEdit.image" />
      <div class="content oe-flex-1 oe-flex oe-m-l-10">
        <div class="title oe-m-b-5" :style="{ color: option.contentEdit.color.background }">
          {{ option.contentEdit.title }}
        </div>
        <div class="tips oe-flex-1" :style="{ color: option.contentEdit.color.subBackground }">
          {{ option.contentEdit.subTitle }}
        </div>
        <div class="tips">
          {{ option.contentEdit.contactName }}：{{ option.contentEdit.contactContent }}
        </div>
      </div>
      <div
        class="button"
        v-if="option.contentEdit.btnText"
        :style="{
          color: option.contentEdit.color.text,
          backgroundColor: option.contentEdit.color.btn
        }"
      >
        {{ option.contentEdit.btnText }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { shoppingGuideOption } from '@/view/decorate/config/options'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'
  import {
    useBackgroundColor,
    usePaddingRadius,
    useComponentModalStyle
  } from '@/view/decorate/hooks/use-view-style'
  const props = defineProps({
    option: {
      type: Object as () => typeof shoppingGuideOption,
      required: true
    }
  })
  //导出配置为常量 供视图使用
  const { componentStyle } = props.option
  const { padding, borderRadius } = usePaddingRadius(props.option)
  const { boxShadow, border } = useComponentModalStyle(componentStyle)
</script>
<style lang="scss" scoped>
  .shopping-guide-container {
    .shopping-guide-view {
      position: relative;
      padding: 15px 13px;
      background-color: #ffffff;
    }
    .title {
      font-size: 14px;
    }
    .tips {
      font-size: 12px;
      color: #acacac;
    }
    .content {
      height: 80px;
      flex-direction: column;
      align-items: flex-start;
    }
    .button {
      position: absolute;
      padding: 6px 8px;
      bottom: 10px;
      right: 0;
      background: #ff3d00;
      border-radius: 15px 15px 15px 1px;
      font-size: 12px;
    }
  }
</style>
