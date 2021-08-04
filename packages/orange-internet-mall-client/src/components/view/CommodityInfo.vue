<!--
 * @Author: Zhilong
 * @Date: 2021-04-19 16:57:46
 * @LastEditTime: 2021-05-18 16:30:49
 * @Description: 商品信息 视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="commodity-info-container">
    <div class="commodity-info-view">
      <div class="view-carousel-map">
        <swiper
          style="height: 750rpx; width: 750rpx; overflow: hidden"
          :duration="500"
          :interval="4000"
          @change="onChangeSwiper"
        >
          <swiper-item
            v-if="shopDetailsInfo.video"
            @click="onVideoClick"
            class="video-play-view"
          >
            <video
              id="video-play"
              :src="shopDetailsInfo.video"
              :poster="shopDetailsInfo.video_cover"
              style="height: 750rpx; width: 750rpx"
              :enable-progress-gesture="false"
              :controls="false"
              :show-center-play-btn="false"
              @play="videoStatus = true"
              @pause="videoStatus = false"
            />
            <div class="video-popup" v-if="!videoStatus">
              <image class="play-image" :src="$spliceStaticUrl('play.png')" />
            </div>
          </swiper-item>
          <swiper-item v-for="(item, i) in shopDetailsInfo.slideshow" :key="i">
            <image
              :src="item"
              style="width: 750rpx; height: 750rpx"
              mode="aspectFill"
              width="750"
              height="750"
            />
          </swiper-item>
        </swiper>
        <div
          v-if="list"
          class="view-carousel-spot"
          :style="{
            bottom: componentStyle.styleType === 'one' ? '44rpx' : '24rpx',
            right: '24rpx',
            left: componentStyle.styleType === 'three' ? '24rpx' : '',
            justifyContent:
              componentStyle.styleType === 'three' ? 'center' : '',
          }"
        >
          <div
            class="spot-item spot-number"
            v-if="componentStyle.styleType !== 'three'"
          >
            {{ currentIndex }}/
            {{ shopDetailsInfo.video ? list.length + 1 : list.length }}
          </div>
          <div
            v-else
            class="spot-item spot-spot"
            v-for="(v, k) in list.length || 0"
            :style="{
              backgroundColor: v === currentIndex ? '#fff' : undefined,
            }"
            :key="k"
          ></div>
        </div>
      </div>
      <div
        class="view-content"
        :class="{ threeStyle: componentStyle.styleType === 'three' }"
      >
        <div :class="'view-content-' + componentStyle.styleType">
          <!-- 价格 and 分享 -->
          <div class="content-price-share">
            <div class="u-flex" style="align-items: flex-end">
              <!-- 是多规格商品 有区间价格 -->
              <span
                style="font-weight: 500; font-size: 34rpx; color: #ff3d00"
                class="u-m-r-20"
                v-if="shopDetailsInfo.norms_type === 1"
              >
                <span class="u-f-s-26" style="margin-right: -3rpx">￥</span>
                {{ shopDetailsInfo.price_interval.min }}
                <template
                  v-if="
                    contentEdit.productPrice === '区间' &&
                    shopDetailsInfo.price_interval.min !==
                      shopDetailsInfo.price_interval.max
                  "
                >
                  <span class="u-f-s-26" style="margin-right: -3rpx">~￥</span>
                  {{ shopDetailsInfo.price_interval.max }}
                </template>
              </span>
              <!-- 不是多规格商品  没有区间价格 -->
              <template v-else>
                <span
                  style="font-weight: 500; font-size: 34rpx; color: #ff3d00"
                  class="u-m-r-20"
                >
                  <span class="u-f-s-26" style="margin-right: -3rpx">￥</span>
                  {{ shopDetailsInfo.price }}
                </span>
                <span
                  v-if="shopDetailsInfo.original_price !== '0.00'"
                  style="
                    font-size: 26rpx;
                    text-decoration-line: line-through;
                    color: #999;
                  "
                >
                  {{ shopDetailsInfo.original_price }}
                </span>
              </template>
              <!-- 会员价 -->
              <div class="content-member-price" v-if="memberPrice">
                <div
                  class="member-price-view"
                  :style="{ color: '#FF3D00', backgroundColor: '#ff3d0032' }"
                >
                  <span class="u-f-s-24" v-if="onlymemberType === 2">
                    会员价￥
                  </span>
                  <span class="u-f-s-24" v-if="onlymemberType === 3">
                    折扣价￥
                  </span>
                  <span class="u-f-s-34">{{ memberPrice }}</span>
                </div>
              </div>
            </div>
            <div v-if="contentEdit.share" style="font-size: 24rpx; color: #999">
              <auth-controller>
                <view-icon
                  name="oe-share"
                  class="u-m-r-16"
                  style="font-size: 24rpx"
                />
                分享
              </auth-controller>
            </div>
          </div>
          <!-- 标题 -->
          <div class="content-title u-f-s-32">{{ shopDetailsInfo.title }}</div>
          <!-- 副标题 -->
          <div class="content-title-sub u-f-s-24">
            {{ shopDetailsInfo.vice_title }}
          </div>
          <!-- 保障 -->
          <div
            class="content-ensure"
            v-if="
              shopDetailsInfo.serviceName &&
              !!shopDetailsInfo.serviceName.length
            "
            @click="showEnsurePopup = true"
          >
            <div class="u-flex content">
              <span
                style="font-size: 26rpx; color: #666; white-space: nowrap"
                class="u-m-r-16"
              >
                保障
              </span>
              <div
                class="u-flex"
                v-for="(i, k) in shopDetailsInfo.serviceName"
                :key="k"
                :class="
                  componentStyle.styleType === 'one' ? 'u-m-r-30' : 'u-m-r-8'
                "
              >
                <view-icon
                  name="oe-hook"
                  class="ensure-hook-icon u-m-r-6"
                  v-if="componentStyle.styleType === 'one'"
                />
                <span class="ensure-hook-text">{{ i.name }}</span>
              </div>
            </div>
            <view-icon name="oe-arrow-right" />
          </div>
          <!-- 费用 -->
          <div class="content-cost">
            <template v-if="shopDetailsInfo.postage === 1">
              <div
                style="white-space: nowrap"
                v-if="shopDetailsInfo.express_fee !== 1"
              >
                运费:￥{{ shopDetailsInfo.freight }}
                <!--
                <span v-if="contentEdit.express === '区间'">
                  ~ ￥{{ shopDetailsInfo.freight }}
                </span>
                -->
              </div>
            </template>
            <div style="white-space: nowrap" v-else>运费:包邮</div>
            <div v-if="shopDetailsInfo.sales_show === 1">
              销量:{{
                Number(shopDetailsInfo.sales) +
                Number(shopDetailsInfo.virtual_sales)
              }}
            </div>
            <div v-if="shopDetailsInfo.stock_show === 1">
              库存:{{ shopDetailsInfo.stock }}
            </div>
          </div>
        </div>
      </div>
      <!-- 详情|参数 -->
      <u-tabs
        :active-color="$hexColor['--color-primary']"
        :list="tabs"
        :active-item-style="{ color: '#000' }"
        :is-scroll="false"
        :current="currentTab"
        :bold="false"
        @change="currentTab = $event"
      />
      <div
        class="detail-rich-text"
        v-show="
          tabs[currentTab] &&
          tabs[currentTab].name === '详情' &&
          shopDetailsInfo.goods_detail
        "
      >
        <u-parse :html="shopDetailsInfo.goods_detail" />
      </div>
      <div
        class="detail-parameter"
        v-show="tabs[currentTab] && tabs[currentTab].name === '参数'"
      >
        <u-table
          v-if="
            shopDetailsInfo.goods_param_type == 2 ||
            shopDetailsInfo.goods_param_type == 4
          "
        >
          <u-tr class="u-tr" v-for="(item, i) in tableList" :key="i">
            <u-td class="u-td">
              {{ item.name }}
            </u-td>
            <u-td class="u-td">
              {{ item.value || item.summarize || '暂无' }}
            </u-td>
          </u-tr>
        </u-table>
        <u-image
          width="100%"
          height="auto"
          mode="widthFix"
          v-else
          :src="shopDetailsInfo.goods_param"
        />
      </div>
    </div>
    <common-shop-params
      v-model="showEnsurePopup"
      :list="shopDetailsInfo.serviceName"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  inject,
  computed,
  Ref,
  ComputedRef,
} from '@vue/composition-api';
import { commodityInfoOption } from 'orange-components-config/options';
import { reqGoodsParam } from '@/api';
import store from '@/store';
import { Big } from 'big.js';
let video: UniApp.VideoContext | null;
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof commodityInfoOption,
      required: true,
    },
  },
  methods: {
    onVideoClick() {
      if (!video) video = uni.createVideoContext('video-play', this);
      this.videoStatus ? video?.pause() : video?.play();
    },
    onChangeSwiper({ target: { current } }: any) {
      this.currentIndex = current + 1;
      if (this.shopDetailsInfo.video && current >= 1 && this.videoStatus) {
        if (!video) video = uni.createVideoContext('video-play', this);
        video?.pause();
      }
    },
  },
  destroyed() {
    video = null;
  },
  setup({ option }) {
    type ShopDetailsInfo = {
      id: string;
      stock: number;
      spec: any[];
      price: number;
      main_picture: string;
      thumb: string;
      option: any[];
      status?: boolean;
      slideshow: any[];
      serviceName: any[];
      freight: string;
      sales: string;
      title: string;
      vice_title: string;
      original_price: string;
      goods_detail: string;
      virtual_sales: number;
      stock_show: number;
      sales_show: number;
      postage: number;
      goods_param: any;
      goods_param_type: Key;
      express_fee: number;
      norms_type: number;
      price_interval: { max: number; min: number };
      vip_price_type: number;
      goods_state: number;
      vip_price: any;
      video: string;
      video_cover: string;
      UserLevelDiscount: {
        discount: number;
        level: number;
      };
      member_equities: string[];
    };
    const { componentStyle, contentEdit } = option;
    const shopDetailsInfo = inject('shopDetailsInfo') as Ref<ShopDetailsInfo>;
    const currentIndex = ref(1);
    const showEnsurePopup = ref(false);
    // 视频播放状态
    const videoStatus = ref(false);
    // 是否是多规格
    // const isMultiSpec = computed(() => shopDetailsInfo.value.norms_type === 1);
    // 会员价格优先级
    const memberTypePriority: (1 | 2 | 3)[] = [1, 2, 3];
    // 会员类型(不同折扣的类型)
    const memberTypeList = shopDetailsInfo.value?.member_equities || [];
    // 使用的会员价类型
    const onlymemberType = memberTypePriority.find((levelList) => {
      // 从优先级开始查找对应的会员价
      return memberTypeList.find((typeList) => +typeList === levelList);
    });
    const memberPrice: ComputedRef<string | boolean> = computed(() => {
      // 没有会员价格
      if (!shopDetailsInfo?.value?.UserLevelDiscount?.level) return false;
      // 我的会员价格
      let memberPriceInfo;
      switch (onlymemberType) {
        case 1:
          break;
        case 2:
          // 查看是否参与会员价格
          if (shopDetailsInfo.value.vip_price_type !== 1) return false;
          // 查询对应会员价格
          memberPriceInfo = shopDetailsInfo.value.vip_price?.info?.find(
            (i: any) =>
              i.level_id === shopDetailsInfo?.value?.UserLevelDiscount?.level
          );
          break;
        case 3:
          memberPriceInfo = {
            ...shopDetailsInfo.value,
            price: Big(+shopDetailsInfo.value.price)
              .times(shopDetailsInfo?.value?.UserLevelDiscount?.discount)
              .times(0.01)
              .toFixed(2),
          };
          break;
        default:
          return false;
      }
      if (memberPriceInfo === undefined || memberPriceInfo === null) {
        // 没有对应会员价格
        return false;
      }
      // 我的会员价格
      return memberPriceInfo.price;
    });

    const list = computed(() => {
      return (
        shopDetailsInfo.value?.slideshow?.map?.((v: string) => ({
          image: v,
        })) || []
      );
    });
    const onSwitchCarousel = (i: number) => (currentIndex.value = i + 1);
    // 参数配置
    const tabs = computed(() => {
      const current = [
        !!shopDetailsInfo.value.goods_detail && { name: '详情' },
        shopDetailsInfo.value.goods_param_type !== 5 && { name: '参数' },
      ];
      return current.filter((v) => v) as { name: string }[];
    });
    const currentTab = ref(0);

    // 参数列表内容
    const tableList = ref<any[]>([]);
    if (shopDetailsInfo.value.goods_param_type == 2) {
      reqGoodsParam(shopDetailsInfo.value.goods_param).then(({ data }) => {
        tableList.value = data.data.data?.[0]?.summarize;
      });
    } else if (shopDetailsInfo.value.goods_param_type == 4) {
      tableList.value = shopDetailsInfo.value.goods_param;
    }
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return {
      $hexColor,
      componentStyle,
      contentEdit,
      onSwitchCarousel,
      list,
      currentIndex,
      shopDetailsInfo,
      tabs,
      currentTab,
      tableList,
      memberPrice,
      onlymemberType,
      videoStatus,
      showEnsurePopup,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.commodity-info-container {
  .commodity-info-view {
    .view-carousel-map {
      width: toRpx(375);
      height: toRpx(375);
      position: relative;
      overflow: hidden;
      .view-carousel-spot {
        position: absolute;
        display: flex;
        margin: auto;

        .spot-item {
          &:not(:last-child) {
            margin-right: toRpx(8);
          }
        }
        .spot-spot {
          width: toRpx(6);
          height: toRpx(6);
          border-radius: toRpx(3);
          background-color: rgba(0, 0, 0, 0.4);
        }
        .spot-number {
          width: toRpx(41);
          height: toRpx(20);
          color: #fff;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: toRpx(38);
          line-height: toRpx(20);
          text-align: center;
          font-size: toRpx(12);
        }
      }
    }
    .threeStyle {
      box-shadow: toRpx(0) toRpx(1) toRpx(2) toRpx(1) rgba(0, 0, 0, 0.03);
      border-radius: toRpx(0) toRpx(0) toRpx(5) toRpx(5);
      margin-bottom: toRpx(14);
    }
    .view-content {
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: toRpx(12);
      > div {
        display: flex;
        flex-direction: column;
        > div:not(:last-child) {
          margin-bottom: toRpx(7);
        }
        .content-price-share {
          display: flex;
          justify-content: space-between;
          order: 10;
          .content-member-price {
            margin-left: toRpx(8);
            font-weight: 700;
            .member-price-view {
              padding: toRpx(2) toRpx(10);
              border-radius: toRpx(500);
            }
          }
        }

        .content-title {
          max-height: toRpx(40);
          line-height: toRpx(20);
          @include text-hidden-line(2);
          word-wrap: break-word;
          color: #000000;
          order: 20;
        }

        .content-title-sub {
          max-height: toRpx(36);
          line-height: toRpx(18);
          @include text-hidden-line(2);
          word-wrap: break-word;
          color: #999999;
          order: 30;
        }

        .content-ensure {
          line-height: 36rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          order: 40;
          .content {
            @include text-ellipsis(620rpx);
          }
          .ensure-hook-icon {
            color: #1ad370;
            font-size: toRpx(11);
          }
          .ensure-hook-text {
            color: #999999;
            font-size: toRpx(12);
            white-space: nowrap;
          }
        }
        .content-cost {
          order: 50;
          display: flex;
          // justify-content: space-between;
          font-size: toRpx(12);
          color: #777777;
          padding: toRpx(5) toRpx(0);
          > div {
            width: 33.33%;
            &:nth-child(1) {
              text-align: left;
            }
            &:nth-child(2) {
              text-align: center;
            }
            &:nth-child(3) {
              text-align: right;
            }
          }
        }
      }
      .view-content-one {
        width: 100%;
        box-sizing: border-box;
        padding: toRpx(12);
        position: relative;
        margin-bottom: toRpx(-24);
        top: toRpx(-24);
        background: #ffffff;
        box-shadow: toRpx(0) toRpx(1) toRpx(2) toRpx(1) rgba(0, 0, 0, 0.03);
        border-radius: toRpx(5);
        .content-ensure {
          margin-top: toRpx(15);
          margin-bottom: toRpx(15);
        }
      }
      .view-content-two {
        .content-price-share {
          order: 35;
        }
        .content-cost {
          justify-content: space-between;
          font-size: toRpx(12);
          color: #777777;
          background: linear-gradient(
            197deg,
            rgba(247, 248, 250, 0) 38.08%,
            #f7f8fa 88.29%
          );
          border-radius: toRpx(35);
          padding: toRpx(5) toRpx(20);
        }
        .content-ensure {
          margin-top: toRpx(15);
          margin-bottom: toRpx(15);
        }
      }
      .view-content-three {
        .content-price-share {
          order: 35;
        }
        .content-cost {
          justify-content: space-between;
          font-size: toRpx(12);
          color: #777777;
          padding: toRpx(5) toRpx(20);
        }
        .content-ensure {
          margin-top: toRpx(15);
          margin-bottom: toRpx(15);
        }
      }
    }
  }
  .video-play-view {
    position: relative;
    .video-popup {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
    }
    .play-image {
      position: absolute;
      width: toRpx(56);
      height: toRpx(56);
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
}
</style>
