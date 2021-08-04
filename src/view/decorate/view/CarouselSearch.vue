<!--
 * @Author: Zhilong
 * @Date: 2021-04-08 19:23:03
 * @LastEditTime: 2021-05-13 18:14:10
 * @Description: 轮播搜索 视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div :style="{ padding, background }">
    <div class="image-carousel-container" :style="{ borderRadius }">
      <div class="view-center-default">
        <div class="item-view-center">
          <view-image
            class="oe-flex-1"
            style="display: flex"
            :style="{ height: `${heightSetting.height}px` }"
            :empty-type="2"
            :src="carouselSetting.imageList[0].image"
            v-if="carouselSetting.imageList?.[0]"
            fit="cover"
          />
          <!-- 搜索框(搬!) -->
          <div class="search-input-container" :style="{ opacity: searchSetting.opacity / 100 }">
            <div class="input-view">
              <div
                v-if="searchSetting.positionShow !== '不显示'"
                :style="{
                  order: searchSetting.positionShow === '左侧' ? 0 : 1,
                  padding: searchSetting.positionShow === '左侧' ? '0 8px 0 0' : '0 0 0 8px'
                }"
              >
                <i
                  class="el-icon-location-outline"
                  :style="{ color: searchSetting.addressColor }"
                />
                <span class="address-text" :style="{ color: searchSetting.addressColor }">
                  {{
                    searchSetting.showAddress === '省'
                      ? '广东省'
                      : searchSetting.showAddress === '市'
                      ? '深圳市'
                      : '龙岗区'
                  }}
                </span>
              </div>
              <div
                class="search-container oe-flex-1"
                :style="{
                  boxShadow,
                  border,
                  justifyContent: searchSetting.contentPosition,
                  borderColor: '#FFFFF' /* colorStyle.color.border */,
                  borderRadius: `${
                    componentStyle.styleType === 'fillet'
                      ? 5
                      : componentStyle.styleType === 'ellipse'
                      ? 100
                      : 0
                  }px`
                }"
              >
                <i
                  class="el-icon-search oe-m-r-8 oe-m-t-3"
                  :style="{ color: '#FFFFF' /* colorStyle.color.icon */ }"
                />
                <span :style="{ color: '#FFFFF' /* colorStyle.color.text */ }">{{
                  searchSetting.tipsContent
                }}</span>
              </div>
            </div>
          </div>
          <!-- 切换点 * * * -->
          <div
            v-if="carouselSetting.pagingSpot === '显示'"
            class="spot-view"
            :class="{ 'spot-center': carouselSetting.position === 'center' }"
            :style="{
              left: carouselSetting.position === 'left' ? '15px' : '',
              right: carouselSetting.position === 'right' ? '15px' : ''
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
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { carouselSearchOption } from '@/view/decorate/config/options'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'
  import {
    useBackgroundColor,
    useComponentModalStyle,
    usePaddingRadius
  } from '@/view/decorate/hooks/use-view-style'

  const props = defineProps({
    option: {
      type: Object as () => typeof carouselSearchOption,
      required: true
    }
  })
  // 导出配置为常量 供视图使用
  const { carouselSetting, componentStyle, searchSetting, heightSetting } = props.option
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
    .search-input-container {
      position: absolute;
      top: 12px;
      left: 20px;
      right: 20px;
      > .title-text {
        float: right;
        font-size: 14px;
      }
      > .input-view {
        clear: right;
        display: flex;
        align-items: center;
        > div {
          display: flex;
          align-items: center;
          > .address-text {
            font-size: 14px;
            white-space: nowrap;
            padding-left: 5px;
          }
        }
        > div.search-container {
          background-color: #fff;
          text-align: center;
          color: #999;
          padding: 8px 14px;
          font-size: 12px;
          display: flex;
          align-items: center;
          border: 1px solid rgba(0, 0, 0, 0);
        }
      }
    }
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
      width: 100%;
    }
  }
</style>
