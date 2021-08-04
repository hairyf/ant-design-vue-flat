<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:19:15
 * @LastEditTime: 2021-05-11 18:24:35
 * @Description: 瓷片区视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="tile-region-container" :style="{ padding, background }">
    <div
      class="tile-region-view u-flex"
      :style="{ borderRadius }"
      v-if="contentEdit[4]"
    >
      <div class="tile-one-view">
        <link-controller :data="contentEdit[0].link">
          <view-image
            isImage
            :size="{
              width: 140 * 2,
              height: componentStyle.borderStatus ? 240 * 2 : 236 * 2,
            }"
            :style="{ boxShadow, border }"
            :src="contentEdit[0].image"
            :empty-type="1"
          >
            <div class="view-content">
              <div
                class="view-title"
                :style="{ color: contentEdit[0].background }"
              >
                {{ contentEdit[0].title }}
              </div>
              <div class="view-subTitle" v-if="contentEdit[0].subTitle">
                <span :style="{ color: contentEdit[0].subBackground }">
                  {{ contentEdit[0].subTitle }}
                </span>
              </div>
            </div>
          </view-image>
        </link-controller>
      </div>
      <div
        class="tile-two-view"
        :style="{ margin: componentStyle.borderStatus ? '0 8rpx' : '0' }"
      >
        <link-controller :data="contentEdit[1].link">
          <view-image
            isImage
            :size="{ width: 101 * 2, height: 118 * 2 }"
            :class="{ 'u-m-b-8': componentStyle.borderStatus }"
            :style="{ boxShadow, border }"
            :src="contentEdit[1].image"
            :empty-type="1"
          >
            <div class="view-content">
              <div
                class="view-title"
                :style="{ color: contentEdit[1].background }"
              >
                {{ contentEdit[1].title }}
              </div>
              <div class="view-subTitle" v-if="contentEdit[1].subTitle">
                <span :style="{ color: contentEdit[1].subBackground }">
                  {{ contentEdit[1].subTitle }}
                </span>
              </div>
            </div>
          </view-image>
        </link-controller>
        <link-controller :data="contentEdit[2].link">
          <view-image
            isImage
            :size="{ width: 101 * 2, height: 118 * 2 }"
            :style="{ boxShadow, border }"
            :src="contentEdit[2].image"
            :empty-type="1"
          >
            <div class="view-content">
              <div
                class="view-title"
                :style="{ color: contentEdit[2].background }"
              >
                {{ contentEdit[2].title }}
              </div>
              <div class="view-subTitle" v-if="contentEdit[2].subTitle">
                <span :style="{ color: contentEdit[2].subBackground }">
                  {{ contentEdit[2].subTitle }}
                </span>
              </div>
            </div>
          </view-image>
        </link-controller>
      </div>
      <div class="tile-three-view">
        <link-controller :data="contentEdit[3].link">
          <view-image
            isImage
            :size="{ width: 101 * 2, height: 118 * 2 }"
            :class="{ 'u-m-b-8': componentStyle.borderStatus }"
            :style="{ boxShadow, border }"
            :src="contentEdit[3].image"
            :empty-type="1"
          >
            <div class="view-content">
              <div
                class="view-title"
                :style="{ color: contentEdit[3].background }"
              >
                {{ contentEdit[3].title }}
              </div>
              <div class="view-subTitle" v-if="contentEdit[3].subTitle">
                <span :style="{ color: contentEdit[3].subBackground }">
                  {{ contentEdit[3].subTitle }}
                </span>
              </div>
            </div>
          </view-image></link-controller
        >
        <link-controller :data="contentEdit[4].link">
          <view-image
            isImage
            :size="{ width: 101 * 2, height: 118 * 2 }"
            :style="{ boxShadow, border }"
            :src="contentEdit[4].image"
            :empty-type="1"
          >
            <div class="view-content">
              <div
                class="view-title"
                :style="{ color: contentEdit[4].background }"
              >
                {{ contentEdit[4].title }}
              </div>
              <div class="view-subTitle" v-if="contentEdit[4].subTitle">
                <span :style="{ color: contentEdit[4].subBackground }">
                  {{ contentEdit[4].subTitle }}
                </span>
              </div>
            </div>
          </view-image>
        </link-controller>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { tileRegionOption } from 'orange-components-config/options';
import {
  useBackgroundColor,
  usePaddingRadius,
  useComponentModalStyle,
} from '@/hooks/use-view-style';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof tileRegionOption,
      required: true,
    },
  },
  setup(props) {
    //导出配置为常量 供视图使用
    const { componentStyle, colorStyle, contentEdit } = props.option;
    const { background } = useBackgroundColor(colorStyle);
    const { padding, borderRadius } = usePaddingRadius(props.option);
    const { boxShadow, border } = useComponentModalStyle(componentStyle);
    return {
      componentStyle,
      colorStyle,
      contentEdit,
      background,
      padding,
      borderRadius,
      boxShadow,
      border,
    };
  },
});
</script>
<style lang="scss" scoped>
.tile-region-container {
  display: flex;
  .tile-region-view {
    margin: auto;
    overflow: hidden;
    > div {
      height: 100%;
    }
    .tile-one-view {
      width: toRpx(140);
    }
    .view-content {
      position: relative;
      padding: toRpx(14) toRpx(10);
      display: flex;
      flex-direction: column;
      align-items: left;
    }
    .view-title {
      font-weight: bold;
      font-size: toRpx(14);
      line-height: toRpx(20);
    }
    .view-subTitle {
      margin-top: toRpx(4);
      border: toRpx(0.5) solid #c4c4c4;
      width: fit-content;
      padding: toRpx(1) toRpx(8);
      box-sizing: border-box;
      border-radius: toRpx(2);
      font-size: toRpx(12);
    }
  }
}
</style>
