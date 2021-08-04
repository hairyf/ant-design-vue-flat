<!--
 * @Author: Zhilong
 * @Date: 2021-04-08 09:21:12
 * @LastEditTime: 2021-05-13 18:17:39
 * @Description: 图片轮播视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ...什么时候是个头啊~
-->
<template>
  <div :style="{ padding, background }">
    <div class="image-carousel-container">
      <div :class="'view-center-default'">
        <div class="item-view-center">
          <view-swiper
            autoplay
            :height="heightSetting.height * 2"
            :interval="5000"
            :class="[
              componentStyle.styleType === 'projection'
                ? 'projection-swiper'
                : componentStyle.styleType === 'column'
                ? 'column-swiper'
                : '',
            ]"
            :list="carouselSetting.imageList"
            :effect3d="effect3d"
            mode="none"
            :border-radius="10"
            :effect3d-previous-margin="100"
            @change="onChangeSwiper"
            @click="onClickSwiper"
            img-mode="aspectFill"
            :imageMargin="option.padding.image * 2"
            bgColor="#0000"
            :borderRadiusStyle="borderRadius"
          />
          <div
            v-if="carouselSetting.pagingSpot === '显示'"
            class="spot-view"
            :class="{ 'spot-center': carouselSetting.position === 'center' }"
            :style="{
              left:
                carouselSetting.position === 'left'
                  ? (15 + option.padding.image) * 2 + 'rpx'
                  : '',
              right:
                carouselSetting.position === 'right'
                  ? (15 + option.padding.image) * 2 + 'rpx'
                  : '',
            }"
          >
            <div
              class="spot-item spot-number"
              v-if="carouselSetting.spotStyle === 'number'"
            >
              {{ currentIndex + 1 }}/{{ carouselSetting.imageList.length }}
            </div>
            <div
              v-else
              class="spot-item"
              :class="{
                'spot-transverse': carouselSetting.spotStyle === 'transverse',
                'spot-spot': carouselSetting.spotStyle === 'spot',
                'spot-ellipse': carouselSetting.spotStyle === 'ellipse',
                'spot-hollow': carouselSetting.spotStyle === 'hollow',
              }"
              :style="{
                backgroundColor:
                  i === currentIndex ? carouselSetting.selectColor : '',
                width:
                  i === currentIndex && carouselSetting.spotStyle === 'ellipse'
                    ? '36rpx'
                    : '',
              }"
              v-for="(v, i) in carouselSetting.imageList"
              :key="i"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { imageCarouselOption } from 'orange-components-config/options';
import {
  useBackgroundColor,
  useComponentModalStyle,
  usePaddingRadius,
} from '@/hooks/use-view-style';

export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof imageCarouselOption,
      required: true,
    },
  },
  methods: {
    onChangeSwiper(index: number) {
      this.currentIndex = index;
    },
    onClickSwiper(index: number) {
      this.$handleLink(this.carouselSetting.imageList[index].link);
    },
  },
  setup(props) {
    // 导出配置为常量 供视图使用
    const { carouselSetting, componentStyle, heightSetting } = props.option;
    // 使用Hook获得基础配置
    const { background } = useBackgroundColor(props.option.colorStyle);
    const { padding, borderRadius } = usePaddingRadius(props.option);
    const { boxShadow, border } = useComponentModalStyle(
      props.option.componentStyle
    );
    // 当前轮播图索引
    const currentIndex = ref(0);
    const effect3d = computed(() => componentStyle.styleType !== 'default');
    return {
      heightSetting,
      carouselSetting,
      componentStyle,
      background,
      padding,
      borderRadius,
      boxShadow,
      border,
      effect3d,
      currentIndex,
    };
  },
});
</script>
<style lang="scss" scoped>
.projection-swiper {
  ::v-deep .u-list-scale {
    transform: scaleY(1) !important;
  }
}
.column-swiper {
  ::v-deep .u-list-scale {
    transform: scaleY(0.85) !important;
  }
}

.image-carousel-container {
  overflow: hidden;
  display: flex;
  justify-content: center;
  div.item-view-center {
    position: relative;
    .spot-view {
      position: absolute;
      bottom: toRpx(10);
      display: flex;
    }

    .spot-transverse {
      width: toRpx(16);
      height: toRpx(4);
      border-radius: toRpx(2);
      background-color: rgba(0, 0, 0, 0.4);
    }
    .spot-spot {
      width: toRpx(6);
      height: toRpx(6);
      border-radius: toRpx(3);
      background-color: rgba(0, 0, 0, 0.4);
    }
    .spot-ellipse {
      width: toRpx(6);
      height: toRpx(6);
      border-radius: toRpx(3);
      background-color: rgba(0, 0, 0, 0.4);
    }
    .spot-hollow {
      width: toRpx(8);
      height: toRpx(8);
      border-radius: toRpx(4);
      box-sizing: border-box;
      border: toRpx(2) solid rgba(0, 0, 0, 0.4);
    }
    .spot-number {
      width: toRpx(41);
      height: toRpx(20);
      color: #fff;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: toRpx(38);
      line-height: toRpx(20);
      text-align: center;
      font-size: toRpx(12);
    }

    .spot-item {
      &:not(:last-child) {
        margin-right: toRpx(8);
      }
    }

    .spot-left {
      left: toRpx(15);
    }
    .spot-center {
      left: 0;
      right: 0;
      justify-content: center;
    }

    .spot-right {
      right: toRpx(15);
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
}
</style>
