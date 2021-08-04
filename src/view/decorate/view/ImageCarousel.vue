<!--
 * @Author: Zhilong
 * @Date: 2021-04-08 09:21:12
 * @LastEditTime: 2021-05-13 18:02:06
 * @Description: 图片轮播视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ...什么时候是个头啊~
-->
<template>
  <div :style="{ padding, background }">
    <div class="image-carousel-container">
      <div
        :class="{
          'view-center-default': componentStyle.styleType === 'default',
          'view-center-column': componentStyle.styleType === 'column',
          'view-center-projection': componentStyle.styleType === 'projection'
        }"
      >
        <!-- 展示框A -->
        <view-image
          class="oe-flex-1 item-view-left"
          :empty-type="2"
          :style="{ boxShadow, border, borderRadius }"
          :src="carouselSetting.imageList[2].image"
          v-if="carouselSetting.imageList?.[2]"
        />
        <div class="item-view-center">
          <view-image
            class="oe-flex-1"
            style="display: flex"
            :empty-type="2"
            :style="{
              borderRadius,
              margin: `0 ${option.padding.image}px`,
              height: `${heightSetting.height}px`
            }"
            :src="carouselSetting.imageList[0].image"
            v-if="carouselSetting.imageList?.[0]"
          />
          <div
            v-if="carouselSetting.pagingSpot === '显示'"
            class="spot-view"
            :class="{ 'spot-center': carouselSetting.position === 'center' }"
            :style="{
              left: carouselSetting.position === 'left' ? 15 + option.padding.image + 'px' : '',
              right: carouselSetting.position === 'right' ? 15 + option.padding.image + 'px' : ''
            }"
          >
            <div class="spot-item spot-number" v-if="carouselSetting.spotStyle === 'number'">
              1/{{ carouselSetting.imageList.length }}
            </div>
            <div
              v-else
              class="spot-item"
              :class="{
                'spot-transverse': carouselSetting.spotStyle === 'transverse',
                'spot-spot': carouselSetting.spotStyle === 'spot',
                'spot-ellipse': carouselSetting.spotStyle === 'ellipse',
                'spot-hollow': carouselSetting.spotStyle === 'hollow'
              }"
              :style="{
                backgroundColor: i === 0 ? carouselSetting.selectColor : '',
                width: i === 0 && carouselSetting.spotStyle === 'ellipse' ? '18px' : ''
              }"
              v-for="(v, i) in carouselSetting.imageList"
              :key="i"
            >
            </div>
          </div>
        </div>
        <!-- 展示框B -->
        <view-image
          class="oe-flex-1 item-view-right"
          :empty-type="2"
          :style="{ borderRadius, boxShadow, border }"
          :src="carouselSetting.imageList[1].image"
          v-if="carouselSetting.imageList?.[1]"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { imageCarouselOption } from '@/view/decorate/config/options'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'
  import {
    useBackgroundColor,
    useComponentModalStyle,
    usePaddingRadius
  } from '@/view/decorate/hooks/use-view-style'

  const props = defineProps({
    option: {
      type: Object as () => typeof imageCarouselOption,
      required: true
    }
  })
  // 导出配置为常量 供视图使用
  const { carouselSetting, componentStyle, heightSetting } = props.option
  // 使用Hook获得基础配置
  const { background } = useBackgroundColor(props.option.colorStyle)
  const { padding, borderRadius } = usePaddingRadius(props.option)
  const { boxShadow, border } = useComponentModalStyle(props.option.componentStyle)
</script>
<style lang="scss" scoped>
  .image-carousel-container {
    overflow: hidden;
    display: flex;
    justify-content: center;
    div.item-view-center {
      position: relative;
      .spot-view {
        position: absolute;
        bottom: 10px;
        display: flex;
      }

      .spot-transverse {
        width: 16px;
        height: 4px;
        border-radius: 2px;
        background-color: rgba(0, 0, 0, 0.4);
      }
      .spot-spot {
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.4);
      }
      .spot-ellipse {
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.4);
      }
      .spot-hollow {
        width: 8px;
        height: 8px;
        border-radius: 4px;
        box-sizing: border-box;
        border: 2px solid rgba(0, 0, 0, 0.4);
      }
      .spot-number {
        width: 41px;
        height: 20px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 38px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
      }

      .spot-item {
        &:not(:last-child) {
          margin-right: 8px;
        }
      }

      .spot-left {
        left: 15px;
      }
      .spot-center {
        left: 0;
        right: 0;
        justify-content: center;
      }

      .spot-right {
        right: 15px;
      }
    }
    .view-center-default {
      position: relative;
      width: 100%;

      .item-view-left {
        width: 100%;
        left: -100%;
        position: absolute;
      }
      .item-view-right {
        position: absolute;
      }
    }
    .view-center-column {
      position: relative;
      width: 80%;

      .item-view-left {
        width: 85%;
        height: 85%;
        left: -85%;
        top: 0;
        bottom: 0;
        margin: auto;
        position: absolute;
      }
      .item-view-right {
        width: 85%;
        height: 85%;
        right: -85%;
        top: 0;
        bottom: 0;
        margin: auto;
        position: absolute;
      }
    }
    .view-center-projection {
      position: relative;
      width: 80%;

      .item-view-left {
        width: 100%;
        height: 100%;
        left: -100%;
        top: 0;
        bottom: 0;
        margin: auto;
        position: absolute;
      }
      .item-view-right {
        width: 100%;
        height: 100%;
        right: -100%;
        top: 0;
        bottom: 0;
        margin: auto;
        position: absolute;
      }
    }
  }
</style>
