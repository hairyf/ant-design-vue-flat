<!--
 * @Author: Zhilong
 * @Date: 2021-04-07 10:23:44
 * @LastEditTime: 2021-04-15 09:47:16
 * @Description: 精品推荐 视图区
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="boutique-recommend-container" :style="{ padding, background }">
    <!-- 风格 > single -->
    <div
      v-if="componentStyle.styleType === 'single'"
      class="type-single-view"
      :style="{
        borderRadius,
        boxShadow,
        border,
        backgroundImage: `url(${contentStyle.list[0].image})`
      }"
    >
      <div
        class="oe-m-b-4"
        :style="{
          fontWeight: 700,
          fontSize: '13px',
          color: contentStyle.list[0].color.subTitle
        }"
        >{{ contentStyle.list[0].subTitle }}
      </div>
      <div
        class="oe-m-b-6"
        :style="{
          fontWeight: 700,
          fontSize: '19px',
          color: contentStyle.list[0].color.title
        }"
        >{{ contentStyle.list[0].title }}
      </div>
      <span
        class="single-item-btn"
        :style="{
          backgroundColor: contentStyle.list[0].color.btn,
          color: contentStyle.list[0].color.text
        }"
        >更多商品<i class="el-icon-caret-right" />
      </span>
    </div>
    <!-- 风格 > array -->
    <div v-if="componentStyle.styleType === 'array'" class="type-array-view">
      <div
        v-for="item in contentStyle.list"
        :key="item.CACHE_KEY_LIST"
        :style="{
          borderRadius,
          boxShadow,
          border,
          backgroundColor: item.color.background
        }"
      >
        <div class="oe-flex" style="padding: 12px 7px 12px 12px">
          <div class="item-top-left-view">
            <div
              :style="{ fontSize: '16px', fontWeight: 700, color: item.color.title }"
              class="oe-m-b-4"
            >
              {{ item.title }}
            </div>
            <div :style="{ fontSize: '12px', color: item.color.subTitle }">{{ item.subTitle }}</div>
          </div>
          <i class="oe-right-solid item-top-right-icon" :style="{ color: item.color.btn }" />
        </div>
        <div :style="{ backgroundImage: `url(${item.image})` }" class="item-image-view" />
      </div>
    </div>
    <!-- 风格 > custom -->
    <div v-if="componentStyle.styleType === 'custom'" class="type-custom-view">
      <!-- 左边的样式 -->
      <div
        class="type-custom-view-left"
        :style="{
          borderRadius,
          boxShadow,
          border,
          backgroundColor: contentStyle.list[0].color.background
        }"
      >
        <div class="oe-flex" style="padding: 12px 7px 12px 12px">
          <div class="item-top-left-view">
            <div
              :style="{
                fontSize: '16px',
                fontWeight: 700,
                color: contentStyle.list[0].color.title
              }"
              class="oe-m-b-4"
            >
              {{ contentStyle.list[0].title }}
            </div>
            <div :style="{ fontSize: '12px', color: contentStyle.list[0].color.subTitle }">
              {{ contentStyle.list[0].subTitle }}
            </div>
          </div>
          <i
            class="oe-right-solid item-top-right-icon"
            :style="{ color: contentStyle.list[0].color.btn }"
          />
        </div>
        <div
          :style="{ backgroundImage: `url(${contentStyle.list[0].image})` }"
          class="item-image-view"
        />
      </div>
      <!-- 右边的样式 -->
      <div class="type-custom-view-right">
        <div
          class="oe-flex oe-row-between"
          :style="{
            flex: 1,
            borderRadius,
            boxShadow,
            border,
            backgroundColor: contentStyle.list[1].color.background
          }"
        >
          <div class="item-right-text">
            <div
              :style="{
                fontSize: '16px',
                fontWeight: 700,
                color: contentStyle.list[1].color.title
              }"
              class="oe-m-b-5"
              >{{ contentStyle.list[1].title }}
            </div>
            <div
              :style="{ fontSize: '12px', color: contentStyle.list[1].color.subTitle }"
              class="oe-m-b-8"
              >{{ contentStyle.list[1].subTitle }}
            </div>
            <i
              class="oe-right-solid item-top-right-icon"
              :style="{ color: contentStyle.list[1].color.btn }"
            />
          </div>
          <div
            :style="{ backgroundImage: `url(${contentStyle.list[1].image})` }"
            class="item-image-view"
          />
        </div>
        <div
          class="oe-flex oe-m-t-10 oe-row-between"
          :style="{
            flex: 1,
            borderRadius,
            boxShadow,
            border,
            backgroundColor: contentStyle.list[2].color.background
          }"
        >
          <div class="item-right-text">
            <div
              :style="{
                fontSize: '16px',
                fontWeight: 700,
                color: contentStyle.list[2].color.title
              }"
              class="oe-m-b-8"
              >{{ contentStyle.list[2].title }}
            </div>
            <div
              :style="{ fontSize: '12px', color: contentStyle.list[2].color.subTitle }"
              class="oe-m-b-4"
              >{{ contentStyle.list[2].subTitle }}
            </div>
            <div class="oe-flex oe-row-right">
              <i
                class="oe-right-solid item-top-right-icon"
                :style="{ color: contentStyle.list[2].color.btn }"
              />
            </div>
          </div>
          <div
            :style="{ backgroundImage: `url(${contentStyle.list[2].image})` }"
            class="item-image-view oe-m-r-5"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { boutiqueRecommendOption } from '@/view/decorate/config/options'
  import {
    useBackgroundColor,
    useComponentModalStyle,
    usePaddingRadius
  } from '@/view/decorate/hooks/use-view-style'
  const props = defineProps({
    option: {
      type: Object as () => typeof boutiqueRecommendOption,
      required: true
    }
  })
  // 导出配置为常量 供视图使用
  const { contentStyle, componentStyle } = props.option
  // 使用hook获得基本配置
  const { padding, borderRadius } = usePaddingRadius(props.option)
  const { background } = useBackgroundColor(props.option.colorStyle)
  const { boxShadow, border } = useComponentModalStyle(props.option.contentStyle)
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .boutique-recommend-container {
    font-family: '微软雅黑' !important;
    .type-single-view {
      /* 风格一 */
      padding: 13px;
      background-position: center center;
      background-size: cover;
      .single-item-btn {
        font-size: 12px;
        border: 1px solid #ffffff;
        box-sizing: border-box;
        border-radius: 49px;
        padding: 2px 15px;
      }
    }
    .type-array-view {
      /* 风格二 */
      display: flex;
      flex-wrap: wrap;
      > div {
        /* item 每个框... */
        width: 48.75%;
        &:nth-child(n + 3) {
          /* 第三个开始 有个向上的分隔 */
          margin-top: 10px !important;
        }
        &:nth-child(odd) {
          /* 单数 有向右的间隔 */
          margin-right: 2.5%;
        }

        .item-top-left-view {
          /* 文字和按钮 */
          flex: 1;
          > div {
            @include text-ellipsis(115px);
          }
        }
        .item-top-right-icon {
          float: right;
          font-size: 30px;
        }

        > .item-image-view {
          /* 图片 */
          height: 80px;
          display: flex;
          margin: 0 10px 10px 10px;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          background-color: #fff;
          border-radius: 5px;
        }
      }
    }
    .type-custom-view {
      /* 风格三 */
      display: flex;
      flex-wrap: wrap;
      > .type-custom-view-left {
        /* 左边的div */
        // width: 48.75%;
        width: 45%;
        margin-right: 2.5%;
        .item-top-left-view {
          /* 文字和按钮 */
          flex: 1;
          > div {
            @include text-ellipsis(115px);
          }
        }
        .item-top-right-icon {
          font-size: 30px;
        }
        > .item-image-view {
          /* 图片 */
          height: 140px;
          display: flex;
          margin: 0 10px 10px 10px;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          background-color: #fff;
          border-radius: 5px;
        }
      }
      > .type-custom-view-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        > div {
          padding: 10px;
          .item-image-view {
            width: 70px;
            height: 80px;
            display: flex;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
          }
          .item-top-right-icon {
            font-size: 30px;
          }
          .item-right-text {
            width: 80px;
            > div {
              @include text-ellipsis(80px);
            }
          }
        }
      }
    }
  }
</style>
