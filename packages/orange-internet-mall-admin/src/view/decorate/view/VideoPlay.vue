<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:19:15
 * @LastEditTime: 2021-05-12 15:39:51
 * @Description: 视频播放视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div>
    <div
      class="video-play-container"
      :style="{
        boxShadow,
        border,
        padding,
        background
      }"
    >
      <div class="video-play-view" :style="{ height: `${contentHeight}px`, borderRadius }">
        <view-image
          :size="{ width: '100%', height: '100%' }"
          class="background-image"
          :src="option.addVideo.image"
          alt=""
          fit="cover"
        />
        <view-image
          :size="56"
          class="play-image"
          src="/custom-assets/images/decorate/play.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, defineProps } from '@vue/runtime-core'
  import { videoPlayOption } from '@/view/decorate/config/options'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'
  import {
    useBackgroundColor,
    usePaddingRadius,
    useComponentModalStyle
  } from '@/view/decorate/hooks/use-view-style'
  const props = defineProps({
    option: {
      type: Object as () => typeof videoPlayOption,
      required: true
    }
  })
  //导出配置为常量 供视图使用
  const { componentStyle, colorStyle } = props.option
  const { background } = useBackgroundColor(colorStyle)
  const { padding, borderRadius } = usePaddingRadius(props.option)
  const { boxShadow, border } = useComponentModalStyle(componentStyle)
  const contentHeight = computed(() => {
    const proportion = props.option.addVideo.proportion
    if (proportion === '1:1') {
      return 375
    } else if (proportion === '4:3') {
      return 281
    }
    return 211
  })
</script>
<style lang="scss" scoped>
  .video-play-view {
    overflow: hidden;
    position: relative;
    .play-image {
      position: absolute;
      width: 56px;
      height: 56px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
    .background-image {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
</style>
