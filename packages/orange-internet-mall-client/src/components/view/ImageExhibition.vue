<!--
 * @Author: Zhilong
 * @Date: 2021-04-09 09:27:07
 * @LastEditTime: 2021-05-11 18:16:25
 * @Description: 图片展播 视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="image-exhibition-container" :style="{ padding, background }">
    <div style="overflow: auto; display: flex">
      <link-controller
        v-for="item in carouselSetting.imageList"
        :key="item.CACHE_KEY_LIST"
        :data="item.link"
      >
        <div
          class="u-m-r-8"
          :style="{ borderRadius, overflow: 'hidden', minWidth: '184rpx' }"
        >
          <view-image
            :src="item.image"
            :empty-type="1"
            :size="{
              width: 92 * 2,
              height: 100 * 2,
            }"
          >
            <template slot="bottomText" v-if="carouselSetting.title">
              <div
                class="item-title"
                :class="{
                  'text-align-left': carouselSetting.align === 'left',
                  'text-align-center': carouselSetting.align === 'center',
                  'text-align-right': carouselSetting.align === 'right',
                }"
                :style="{ color: carouselSetting.color.title }"
              >
                {{ item.title }}
              </div>
            </template>
          </view-image>
          <div
            v-if="carouselSetting.subTitle"
            class="item-title"
            style="background-color: #fff"
            :class="{
              'text-align-left': carouselSetting.align === 'left',
              'text-align-center': carouselSetting.align === 'center',
              'text-align-right': carouselSetting.align === 'right',
            }"
            :style="{ color: carouselSetting.color.subTitle }"
          >
            {{ item.subTitle }}
          </div>
        </div>
      </link-controller>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { imageExhibitionOption } from 'orange-components-config/options';
import { useBackgroundColor, usePaddingRadius } from '@/hooks/use-view-style';

export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof imageExhibitionOption,
      required: true,
    },
  },
  setup(props) {
    // 导出配置为常量 供视图使用
    const { carouselSetting } = props.option;
    // 使用hoos获得基本配置
    const { background } = useBackgroundColor(props.option.colorStyle);
    const { padding, borderRadius } = usePaddingRadius(props.option);
    return {
      carouselSetting,
      background,
      padding,
      borderRadius,
    };
  },
});
</script>
<style lang="scss" scoped>
.image-exhibition-container {
  .item-title {
    @include text-ellipsis(100%);
    line-height: toRpx(25);
    padding: toRpx(0) toRpx(8);
    letter-spacing: -0.03em;
    font-size: toRpx(12);
  }

  .text-align-left {
    text-align: left;
  }
  .text-align-center {
    text-align: center;
  }
  .text-align-right {
    text-align: right;
  }
}
</style>
