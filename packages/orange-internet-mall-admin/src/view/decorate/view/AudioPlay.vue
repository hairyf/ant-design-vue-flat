<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:19:15
 * @LastEditTime: 2021-04-26 18:31:35
 * @Description: 音频视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="audio-play-container"
    :style="{
      padding,
      background
    }"
  >
    <div class="audio-play-view">
      <div
        class="type-select-view"
        :style="{
          borderRadius,
          borderColor: colorStyle.color.border,
          backgroundColor: colorStyle.color.subBackground
        }"
      >
        <!-- 样式one -->
        <div class="audio-style-one-view" v-if="componentStyle.styleType === 'styleOne'">
          <div>
            <span
              style="font-size: 14px; margin-right: 10px; color: #000"
              :style="{ color: colorStyle.color.title }"
            >
              {{ contentEdit.text }}
            </span>
            <span
              style="font-size: 12px; color: #8c8c8c"
              :style="{ color: colorStyle.color.subTitle }"
            >
              {{ contentEdit.subText }}
            </span>
          </div>
          <!-- <i class="oe-suspend" /> -->
          <i class="oe-play" :style="{ color: colorStyle.color.btn }" />
        </div>
        <!-- 样式two-->
        <div class="audio-style-two-view" v-if="componentStyle.styleType === 'styleTwo'">
          <div class="oe-flex">
            <div class="view-play-image">
              <view-image
                :size="20"
                src="/custom-assets/images/decorate/play.png"
                alt=""
              />
            </div>
            <div style="line-height: 23px; margin-left: 14px">
              <div
                style="font-size: 14px; margin-right: 10px; color: #000"
                :style="{ color: colorStyle.color.title }"
              >
                {{ option.contentEdit.text }}
              </div>
              <div
                style="font-size: 12px; color: #8c8c8c"
                :style="{ color: colorStyle.color.subTitle }"
              >
                {{ option.contentEdit.subText }}
              </div>
            </div>
          </div>
          <div style="font-size: 12px; color: #8c8c8c; margin-right: 21px">11:30</div>
        </div>
        <!-- 样式three-- -->
        <div class="audio-style-one-view" v-if="option.componentStyle.styleType === 'styleThree'">
          <div>
            <span
              style="font-size: 14px; margin-right: 10px; color: #000"
              :style="{ color: colorStyle.color.title }"
            >
              {{ option.contentEdit.text }}
            </span>
            <span
              style="font-size: 12px; color: #8c8c8c"
              :style="{ color: colorStyle.color.subTitle }"
            >
              {{ option.contentEdit.subText }}
            </span>
          </div>
          <div style="font-size: 12px; color: #8c8c8c; margin-right: 21px">11:30</div>
          <!-- 加载条线 -->
          <div :style="{ width: '30%' }" class="audio-progress-bar" />
        </div>
        <!-- 样式four-->
        <div class="audio-style-two-view" v-if="option.componentStyle.styleType === 'styleFour'">
          <div class="oe-flex">
            <div class="view-play-image" />
            <div style="line-height: 23px; margin-left: 14px">
              <div
                style="font-size: 14px; margin-right: 10px; color: #000"
                :style="{ color: colorStyle.color.title }"
              >
                {{ option.contentEdit.text }}
              </div>
              <div
                style="font-size: 12px; color: #8c8c8c"
                :style="{ color: colorStyle.color.subTitle }"
              >
                {{ option.contentEdit.subText }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { audioPlayOption } from '@/view/decorate/config/options'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'
  import { useBackgroundColor, usePaddingRadius } from '@/view/decorate/hooks/use-view-style'
  const props = defineProps({
    option: {
      type: Object as () => typeof audioPlayOption,
      required: true
    }
  })
  //导出配置为常量 供视图使用
  const { componentStyle, colorStyle, contentEdit } = props.option
  const { background } = useBackgroundColor(colorStyle)
  const { padding, borderRadius } = usePaddingRadius(props.option)
</script>
<style lang="scss" scoped>
  .audio-play-container {
    .audio-play-view {
      .type-select-view {
        display: flex;
        width: 100%;
        align-items: center;
        box-sizing: border-box;
        background: #ffffff;
        border: 1px solid #d9d9d9;
        overflow: hidden;

        .audio-style-one-view {
          position: relative;
          align-items: center;
          display: flex;
          padding: 15px;
          flex: 1;
          justify-content: space-between;
          box-sizing: border-box;
          .audio-progress-bar {
            position: absolute;
            height: 2px;
            left: 0;
            bottom: -1px;
            background-color: #000000;
            transition: 1s;
          }
        }
        .audio-style-two-view {
          display: flex;
          flex: 1;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          .view-play-image {
            width: 62px;
            height: 62px;
            background: #c4c4c4;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
</style>
