<!--
 * @Author: Zhilong
 * @Date: 2021-04-08 19:23:03
 * @LastEditTime: 2021-05-13 18:18:31
 * @Description: 轮播搜索 视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div :style="{ padding, background }">
    <div class="image-carousel-container" :style="{ borderRadius }">
      <div class="view-center-default">
        <div class="item-view-center">
          <swiper
            circular
            autoplay
            :interval="5000"
            @change="onSwiperChange"
            style="width: 100%"
            :style="{ height: `${heightSetting.height * 2}rpx` }"
          >
            <swiper-item
              v-for="(item, i) in carouselSetting.imageList"
              :key="i"
            >
              <link-controller :data="item.link">
                <view-image
                  class="u-flex-1"
                  :empty-type="2"
                  :src="item.image"
                  v-if="carouselSetting.imageList && item"
                  fit="aspectFill"
                  :size="{
                    width: '100%',
                    height: `${heightSetting.height * 2}rpx`,
                  }"
                />
              </link-controller>
            </swiper-item>
          </swiper>
          <!-- 搜索框(搬!) -->
          <div
            class="search-input-container"
            :style="{ opacity: searchSetting.opacity / 100 }"
            @click="$navigateTo('/pages/commons/search')"
          >
            <div class="input-view">
              <div
                v-if="searchSetting.positionShow !== '不显示'"
                :style="{
                  order: searchSetting.positionShow === '左侧' ? 0 : 1,
                  padding:
                    searchSetting.positionShow === '左侧'
                      ? '0 16rpx 0 0'
                      : '0 0 0 16rpx',
                }"
              >
                <view-icon
                  name="oe-location-outline"
                  :color="searchSetting.addressColor"
                />
                <span
                  class="address-text"
                  :style="{ color: searchSetting.addressColor }"
                >
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
                class="search-container u-flex-1"
                :style="{
                  boxShadow,
                  border,
                  justifyContent: searchSetting.contentPosition,
                  borderColor: '#FFFFF' /* colorStyle.color.border */,
                  borderRadius: `${
                    componentStyle.styleType === 'fillet'
                      ? 10
                      : componentStyle.styleType === 'ellipse'
                      ? 200
                      : 0
                  }rpx`,
                }"
              >
                <view-icon
                  name="oe-search"
                  class="u-m-r-8 u-m-t-3"
                  :style="{ color: '#FFFFF' /* colorStyle.color.icon */ }"
                />
                <span
                  :style="{ color: '#FFFFF' /* colorStyle.color.text */ }"
                  >{{ searchSetting.tipsContent }}</span
                >
              </div>
            </div>
          </div>
          <!-- 切换点 * * * -->
          <div
            v-if="carouselSetting.pagingSpot === '显示'"
            class="spot-view"
            :class="{ 'spot-center': carouselSetting.position === 'center' }"
            :style="{
              left: carouselSetting.position === 'left' ? '30rpx' : '',
              right: carouselSetting.position === 'right' ? '30rpx' : '',
            }"
          >
            <div
              class="spot-item spot-number"
              v-if="carouselSetting.spotStyle === 'number'"
            >
              {{ currentPosition }}/{{ carouselSetting.imageList.length }}
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
                  i === currentPosition ? carouselSetting.selectColor : '',
                width:
                  i === currentPosition &&
                  carouselSetting.spotStyle === 'ellipse'
                    ? '36rpx'
                    : '',
              }"
              v-for="(v, i) in carouselSetting.imageList"
              :key="i"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { carouselSearchOption } from 'orange-components-config/options';
import {
  useBackgroundColor,
  useComponentModalStyle,
  usePaddingRadius,
} from '@/hooks/use-view-style';

export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof carouselSearchOption,
      required: true,
    },
  },
  methods: {
    onSwiperChange({ detail: { current } }: { detail: { current: number } }) {
      this.currentPosition = current;
    },
  },
  setup(props) {
    // 导出配置为常量 供视图使用
    const {
      carouselSetting,
      componentStyle,
      searchSetting,
      heightSetting,
    } = props.option;
    // 使用Hook获得基础配置
    const { background } = useBackgroundColor(props.option.colorStyle);
    const { padding, borderRadius } = usePaddingRadius(props.option);
    const { boxShadow, border } = useComponentModalStyle(
      props.option.componentStyle
    );
    const currentPosition = ref(0);
    return {
      heightSetting,
      currentPosition,
      carouselSetting,
      componentStyle,
      searchSetting,
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
.image-carousel-container {
  overflow: hidden;
  display: flex;
  justify-content: center;
  .search-input-container {
    position: absolute;
    top: toRpx(12);
    left: toRpx(20);
    right: toRpx(20);
    .title-text {
      float: right;
      font-size: toRpx(14);
    }
    .input-view {
      clear: right;
      display: flex;
      align-items: center;
      > div {
        display: flex;
        align-items: center;
        .address-text {
          font-size: toRpx(14);
          white-space: nowrap;
          padding-left: toRpx(5);
        }
      }
      .search-container {
        background-color: #fff;
        text-align: center;
        color: #999;
        padding: toRpx(8) toRpx(14);
        font-size: toRpx(12);
        display: flex;
        align-items: center;
        border: toRpx(1) solid rgba(0, 0, 0, 0);
      }
    }
  }
  .item-view-center {
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
    width: 100%;
  }
}
</style>
