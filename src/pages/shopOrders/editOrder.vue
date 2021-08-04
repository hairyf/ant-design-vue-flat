<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-11 10:57:59
 * @LastEditTime: 2021-05-13 17:51:41
 * @Description: 填写订单
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="edit-order">
    <!-- 地址选择 -->
    <u-card :show-head="false" padding="40" :border="false">
      <div class="address-select-container" slot="body">
        <div class="layer l1" v-if="completeAddress">
          <u-tag
            v-if="addressDetail.is_default === 1"
            type="error"
            mode="dark"
            size="mini"
            text="默认"
          />
          <span class="tips u-margin-left-10">
            {{ completeAddress }}
          </span>
        </div>

        <div
          class="layer l2 u-flex u-row-between"
          @click="
            $navigateTo('/pages/users/addressList', {
              select: true,
              addressDetail: 1,
              placeAnRrders: JSON.stringify(goods),
            })
          "
        >
          <span class="title">
            {{ addressDetail.address || '请点击选择地址' }}
          </span>
          <u-icon name="arrow-right" color="#acacac" size="30" />
        </div>
        <div
          class="layer l3"
          v-if="addressDetail.consignee && addressDetail.phone"
        >
          <span class="tips">
            {{ addressDetail.consignee || '' }}
            {{ addressDetail.phone || '' }}
          </span>
        </div>
      </div>
    </u-card>
    <!-- 商品信息 -->
    <u-card
      :show-head="false"
      padding="40"
      :border="false"
      v-for="(item, index) in shopList"
      :key="index"
    >
      <div class="shop-info-container" slot="body">
        <div class="layer l1 u-flex u-row-between">
          <u-image
            :width="200"
            :height="200"
            :border-radius="10"
            :src="item.main_picture"
          />
          <div class="right-column u-flex u-flex-1 over-text">
            <div class="title u-margin-bottom-10">
              {{ item.title }}
            </div>
            <div class="service-tips">
              {{ item.skuName || '单规格商品' }}
            </div>
            <div class="controls u-flex u-row-between">
              <span class="price">￥{{ item.discountPrice }}</span>
              <u-number-box
                :min="1"
                bg-color="#ffffff"
                v-model="item.buynum"
                @change="selectCouponEvent"
              />
            </div>
          </div>
        </div>
        <div class="layer l2">
          <div class="u-flex u-row-between u-m-b-18">
            <span class="layer-title">配送方式</span>
            <span class="layer-title" v-if="true">快递发货</span>
            <span class="layer-title" v-if="item.logistics_type == 2"
              >同城配送</span
            >
            <span class="layer-title" v-if="item.logistics_type == 3"
              >上门自取</span
            >
          </div>
          <div class="u-flex u-row-between u-m-b-18">
            <span class="layer-title">运费</span>
            <span class="layer-title">¥{{ item.expressFee }}</span>
          </div>
        </div>
      </div>
    </u-card>
    <u-card :show-head="false" padding="40" :border="false">
      <div slot="body">
        <!-- 选择优惠卷 -->
        <div class="layer u-flex u-row-between">
          <span class="layer-title">优惠折扣</span>
          <span @click="showDiscounts = true">
            <span v-if="isShowCoupon" class="layer-tips u-margin-right-30">
              {{ '请选择' }}
            </span>
            <span v-else class="layer-tips u-margin-right-30">
              <u-tag
                v-if="couponInfo.coupon.type === 1"
                text="满减劵"
                mode="dark"
                :show="true"
                type="warning"
                bg-color="#FE9B2A"
                size="mini"
                class="u-m-r-15"
              />
              <u-tag
                v-else
                text="折扣卷"
                mode="dark"
                :show="true"
                type="error"
                bg-color="#FF6F6F"
                size="mini"
                class="u-m-r-15"
              />
              <span style="color: #000; font-size: 24rpx">
                {{
                  couponInfo.coupon.type === 1
                    ? `满${couponInfo.coupon.condition_order_amount - 0}元减${
                        couponInfo.coupon.money - 0
                      }元`
                    : `满${couponInfo.coupon.condition_order_amount - 0}元打${
                        couponInfo.coupon.money - 0
                      }折`
                }}</span
              >
            </span>
            <u-icon name="arrow-right" color="#acacac" size="25" />
          </span>
        </div>
        <div class="layer u-flex u-row-between">
          <span class="layer-title">备注</span>
          <u-input
            type="text"
            placeholder="给商家留言"
            :height="50"
            :border="false"
            v-model="remark"
            :custom-style="{ textAlign: 'right' }"
          />
        </div>
      </div>
    </u-card>
    <!-- 商品金额统计 -->
    <u-card :show-head="false" padding="40" :border="false">
      <div class="count-container" slot="body">
        <div class="layer l1 u-flex u-row-between">
          <span class="layer-title">商品金额</span>
          <span class="layer-count"
            >¥ {{ settlementInfo.totalDiscountPrice }}</span
          >
        </div>
        <div class="layer l2 u-flex u-row-between">
          <span class="layer-title">运费</span>
          <span class="layer-count">
            ¥ {{ settlementInfo.totalExpressFee }}
          </span>
        </div>
        <div class="layer l3 u-flex u-row-between" v-if="isShow">
          <span class="layer-title">优惠折扣</span>
          <span class="layer-count" style="color: red">
            <!-- 优惠之后的总价-订单原总价= 优惠的价格-->
            ¥
            {{ (0 - settlementInfo.coupons.current_fee).toFixed(2) }}
          </span>
        </div>
        <div class="layer l4 u-flex u-row-right u-border-top">
          <span>
            <span class="layer-title">合计：</span>
            <span
              class="layer-price"
              :style="{ color: $hexColor['--color-primary'] }"
            >
              ¥
              {{ priceTotal }}
            </span>
          </span>
        </div>
      </div>
    </u-card>
    <!-- 底部操作栏 -->
    <union-blank :height="118" />
    <custom-fixed-footer>
      <div class="footer-container u-flex u-row-between">
        <span class="price u-flex-1"
          >¥
          {{ priceTotal }}
        </span>
        <u-button
          type="primary"
          shape="circle"
          :custom-style="{
            padding: '0 72rpx',
            background: $hexColor['--color-primary'],
          }"
          @click="onPlaceAnOrder"
          ripple
        >
          提交订单
        </u-button>
      </div>
    </custom-fixed-footer>

    <!-- 优惠卷选择器 -->
    <common-coupon-select
      type="use"
      v-model="showDiscounts"
      :couponList="coupons"
      @select="selectCouponEvent"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { reqPlaceOrder, reqSettleAccounts } from '@/api';
import { computed } from '@vue/composition-api';
import store from '@/store';
type PlaceAnRrders = {
  goodsId: Key;
  buynum: Key;
  skuId?: Key;
  [key: string]: any;
}[];
export default Vue.extend({
  props: {},
  components: {},
  data: () => ({
    showDiscounts: false,
    // 显示订单优惠卷
    isShowCoupon: true,
    // 优惠卷
    coupons: {} as Record<string, any>,
    // 当前选择规格信息
    goods: [] as PlaceAnRrders[],
    // 订单商品列表
    shopList: [] as any[],
    // 地址信息
    addressDetail: {} as Record<string, any>,
    // 选择的优惠卷信息
    couponInfo: {} as Record<string, any>,
    // 当前结算信息
    settlementInfo: {} as Record<string, any>,
    // 用户备注
    remark: '',
    // 购物车提交订单
    source: '',

    isShow: false,
  }),
  computed: {
    // 计算完整路径地址
    completeAddress() {
      const array = [
        this.addressDetail.province_name,
        this.addressDetail.city_name,
        this.addressDetail.area_name,
      ].filter((v) => v);
      return array.join(' ');
    },
    // 计算总价
    priceTotal() {
      const count: number =
        Number(this.settlementInfo.totalPrice) +
        Number(this.settlementInfo.totalExpressFee) -
        Number(this.settlementInfo.reducePrice);
      return count ? count.toFixed(2) : 0;
    },
  },
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
  methods: {
    // 根据商品列表重置配置列表
    resetGoods(list: any[]) {
      this.goods = (list as any).map((v: any) => ({
        goodsId: v.id as Key,
        buynum: v.buynum as Key,
        skuId: v.skuId as Key,
      }));
    },
    // 结算订单信息
    async selectCouponEvent() {
      if (this.shopList.length) {
        this.resetGoods(this.shopList);
      }
      const { data } = await reqSettleAccounts({
        addresId: this.addressDetail.id,
        discountsID: this.couponInfo.id,
        goods: this.goods,
      });
      this.settlementInfo = data.data;
      this.shopList = this.settlementInfo.goods || [];
      this.coupons = this.settlementInfo.coupons;
      this.couponInfo = this.settlementInfo.coupons.current || {};
      this.addressDetail = this.settlementInfo.expressFeeAddress || {};
      this.resetGoods(this.shopList);
    },
    // 提交订单
    async onPlaceAnOrder() {
      this.resetGoods(this.shopList);
      const { data } = await reqPlaceOrder({
        addresId: this.addressDetail.id,
        discountsID: this.couponInfo.id,
        goods: this.goods,
        source: this.source,
        remark: this.remark,
      });
      this.$redirectTo('/pages/shopOrders/cashier', {
        orderInfo: encodeURIComponent(JSON.stringify(data.data)),
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { placeAnRrders: string; id: string; source: string }) {
    this.source = options.source;
    this.goods = JSON.parse(options.placeAnRrders);
    // console.log(this.goods);

    this.selectCouponEvent();
    // 获取地址信息
    uni.$on('address-select', (item: any) => {
      this.addressDetail = item;
      this.selectCouponEvent();
    });
    // 获取优惠卷信息
    uni.$on('use-now', (item: any) => {
      this.couponInfo = item;
      this.selectCouponEvent();
      this.showDiscounts = false;
      this.isShowCoupon = false;
      this.isShow = true;
    });
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {
    uni.$off('address-select');
    uni.$off('use-now');
  },
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
});
</script>

<style lang="scss">
@include full-page('edit-order');
.edit-order {
  padding-top: 1rpx;
}

.layer:not(:first-child) {
  margin-top: 20rpx;
}
.layer {
  .layer-title {
    font-size: 24rpx;
    color: black;
  }
  .layer-tips {
    font-size: 30rpx;
    color: #acacac;
  }
  .layer-price {
    font-size: 30rpx;
  }
  .layer-count {
    font-size: 30rpx;
    color: black;
    font-weight: 500;
  }
}

/* 地址选择 */
.address-select-container {
  .title {
    font-size: 34rpx;
    font-weight: bold;
  }
}
/* 商品信息 */
.shop-info-container {
  .layer.l1 {
    margin-bottom: 30rpx;
    .right-column {
      margin-left: 25rpx;
      flex-direction: column;
      align-items: flex-start;
      .title {
        @include text-hidden-line(2);
        height: 75rpx;
      }
      .labels {
        font-size: 20rpx;
        color: #acacac;
      }
      .controls {
        width: 100%;
        .price {
          color: #ff3d00;
          font-size: 34rpx;
          font-weight: bold;
        }
        .tips {
          flex: 1;
          font-size: 22rpx;
          color: #acacac;
        }
      }
    }
  }
}
/* 价格统计 */
.count-container {
  .layer.l4 {
    padding-top: 20rpx;
    margin-top: 20rpx;
  }
}
/* 底部操作栏 */
.footer-container {
  .price {
    font-size: 45rpx;
    font-weight: bold;
    color: #ff3d00;
  }
  width: 100%;
  background: #ffffff;
}
// 字体样式
.font-style {
  font-size: 24rpx;
  color: #000;
}
.over-text {
  min-width: 386rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.service-tips {
  color: #acacac;
  font-size: 20rpx;
}
</style>
