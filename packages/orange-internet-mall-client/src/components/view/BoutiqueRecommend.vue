<!--
 * @Author: Zhilong
 * @Date: 2021-04-07 10:23:44
 * @LastEditTime: 2021-05-11 19:24:47
 * @Description: 精品推荐 视图区
 * @LastEditors: Zhilong
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
        backgroundImage: `url(${contentStyle.list[0].image})`,
      }"
    >
      <div
        class="u-m-b-4"
        :style="{
          fontWeight: 700,
          fontSize: '26rpx',
          color: contentStyle.list[0].color.subTitle,
        }"
      >
        {{ contentStyle.list[0].subTitle }}
      </div>
      <div
        class="u-m-b-6"
        :style="{
          fontWeight: 700,
          fontSize: '38rpx',
          color: contentStyle.list[0].color.title,
        }"
      >
        {{ contentStyle.list[0].title }}
      </div>
      <link-controller
        :data="contentStyle.list[0].link"
        class="single-item-btn"
        :style="{
          backgroundColor: contentStyle.list[0].color.btn,
          color: contentStyle.list[0].color.text,
          display: 'inline-block',
        }"
      >
        更多商品
        <view-icon name="oe-caret-right" class="u-f-s-12" />
      </link-controller>
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
          backgroundColor: item.color.background,
        }"
      >
        <div class="u-flex" style="padding: 24rpx 14rpx 24rpx 24rpx">
          <div class="item-top-left-view">
            <div
              :style="{
                fontSize: '32rpx',
                fontWeight: 700,
                color: item.color.title,
              }"
              class="u-m-b-4"
            >
              {{ item.title }}
            </div>
            <div :style="{ fontSize: '24rpx', color: item.color.subTitle }">
              {{ item.subTitle }}
            </div>
          </div>
          <link-controller :data="item.link">
            <view-icon
              name="oe-right-solid"
              class="item-top-right-icon"
              :style="{ color: item.color.btn }"
            />
          </link-controller>
        </div>
        <link-controller :data="item.link">
          <div
            :style="{ backgroundImage: `url(${item.image})` }"
            class="item-image-view"
          />
        </link-controller>
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
          backgroundColor: contentStyle.list[0].color.background,
        }"
      >
        <div class="u-flex" style="padding: 24rpx 14rpx 24rpx 24rpx">
          <div class="item-top-left-view">
            <div
              :style="{
                fontSize: '32rpx',
                fontWeight: 700,
                color: contentStyle.list[0].color.title,
              }"
              class="u-m-b-4"
            >
              {{ contentStyle.list[0].title }}
            </div>
            <div
              :style="{
                fontSize: '24rpx',
                color: contentStyle.list[0].color.subTitle,
              }"
            >
              {{ contentStyle.list[0].subTitle }}
            </div>
          </div>
          <link-controller :data="contentStyle.list[0].link">
            <view-icon
              name="oe-right-solid"
              class="item-top-right-icon"
              :style="{ color: contentStyle.list[0].color.btn }"
            />
          </link-controller>
        </div>
        <link-controller :data="contentStyle.list[0].link">
          <div
            :style="{ backgroundImage: `url(${contentStyle.list[0].image})` }"
            class="item-image-view"
          />
        </link-controller>
      </div>
      <!-- 右边的样式 -->
      <div class="type-custom-view-right">
        <div
          class="u-flex u-row-between"
          :style="{
            flex: 1,
            borderRadius,
            boxShadow,
            border,
            backgroundColor: contentStyle.list[1].color.background,
          }"
        >
          <div class="item-right-text">
            <div
              :style="{
                fontSize: '32rpx',
                fontWeight: 700,
                color: contentStyle.list[1].color.title,
              }"
              class="u-m-b-5"
            >
              {{ contentStyle.list[1].title }}
            </div>
            <div
              :style="{
                fontSize: '24rpx',
                color: contentStyle.list[1].color.subTitle,
              }"
              class="u-m-b-8"
            >
              {{ contentStyle.list[1].subTitle }}
            </div>
            <link-controller :data="contentStyle.list[1].link">
              <view-icon
                name="oe-right-solid"
                class="item-top-right-icon"
                :style="{ color: contentStyle.list[1].color.btn }"
              />
            </link-controller>
          </div>
          <link-controller :data="contentStyle.list[1].link">
            <div
              :style="{ backgroundImage: `url(${contentStyle.list[1].image})` }"
              class="item-image-view"
            />
          </link-controller>
        </div>
        <div
          class="u-flex u-m-t-10 u-row-between"
          :style="{
            flex: 1,
            borderRadius,
            boxShadow,
            border,
            backgroundColor: contentStyle.list[2].color.background,
          }"
        >
          <div class="item-right-text" style="order: 1">
            <div
              :style="{
                fontSize: '32rpx',
                fontWeight: 700,
                color: contentStyle.list[2].color.title,
              }"
              class="u-m-b-8"
            >
              {{ contentStyle.list[2].title }}
            </div>
            <div
              :style="{
                fontSize: '24rpx',
                color: contentStyle.list[2].color.subTitle,
              }"
              class="u-m-b-4"
            >
              {{ contentStyle.list[2].subTitle }}
            </div>
            <div class="u-flex u-row-right">
              <link-controller :data="contentStyle.list[2].link">
                <view-icon
                  name="oe-right-solid"
                  class="item-top-right-icon"
                  :style="{ color: contentStyle.list[2].color.btn }"
                />
              </link-controller>
            </div>
          </div>
          <link-controller :data="contentStyle.list[2].link">
            <div
              :style="{ backgroundImage: `url(${contentStyle.list[2].image})` }"
              class="item-image-view u-m-r-5"
            />
          </link-controller>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { boutiqueRecommendOption } from 'orange-components-config/options';
import {
  useBackgroundColor,
  useComponentModalStyle,
  usePaddingRadius,
} from '@/hooks/use-view-style';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof boutiqueRecommendOption,
      required: true,
    },
  },
  setup(props) {
    // 导出配置为常量 供视图使用
    const { contentStyle, componentStyle } = props.option;
    // 使用hook获得基本配置
    const { padding, borderRadius } = usePaddingRadius(props.option);
    const { background } = useBackgroundColor(props.option.colorStyle);
    const { boxShadow, border } = useComponentModalStyle(
      props.option.contentStyle
    );
    return {
      contentStyle,
      componentStyle,
      padding,
      borderRadius,
      background,
      boxShadow,
      border,
    };
  },
});
</script>
<style lang="scss" scoped>
.boutique-recommend-container {
  font-family: '微软雅黑' !important;
  .type-single-view {
    /* 风格一 */
    padding: toRpx(13);
    background-position: center center;
    background-size: cover;
    .single-item-btn {
      font-size: toRpx(12);
      border: toRpx(1) solid #ffffff;
      box-sizing: border-box;
      border-radius: toRpx(49);
      padding: toRpx(2) toRpx(15);
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
        margin-top: toRpx(10) !important;
      }
      &:nth-child(odd) {
        /* 单数 有向右的间隔 */
        margin-right: 2.5%;
      }

      .item-top-left-view {
        /* 文字和按钮 */
        flex: 1;
        > div {
          @include text-ellipsis(toRpx(115));
        }
      }
      .item-top-right-icon {
        float: right;
        font-size: toRpx(30);
      }

      .item-image-view {
        /* 图片 */
        height: toRpx(80);
        display: flex;
        margin: 0 toRpx(10) toRpx(10) toRpx(10);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        background-color: #fff;
        border-radius: toRpx(5);
      }
    }
  }
  .type-custom-view {
    /* 风格三 */
    display: flex;
    flex-wrap: wrap;
    .type-custom-view-left {
      /* 左边的div */
      // width: 48.75%;
      width: 45%;
      margin-right: 2.5%;
      .item-top-left-view {
        /* 文字和按钮 */
        flex: 1;
        > div {
          @include text-ellipsis(toRpx(115));
        }
      }
      .item-top-right-icon {
        font-size: toRpx(30);
      }
      .item-image-view {
        /* 图片 */
        height: toRpx(140);
        display: flex;
        margin: 0 toRpx(10) toRpx(10) toRpx(10);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        background-color: #fff;
        border-radius: toRpx(5);
      }
    }
    .type-custom-view-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      > div {
        padding: toRpx(10);
        .item-image-view {
          width: toRpx(70);
          height: toRpx(80);
          display: flex;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .item-top-right-icon {
          font-size: toRpx(30);
        }
        .item-right-text {
          width: toRpx(80);
          > div {
            @include text-ellipsis(toRpx(80));
          }
        }
      }
    }
  }
}
</style>
