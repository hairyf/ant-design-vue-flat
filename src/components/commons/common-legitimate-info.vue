<template>
  <div class="common-legitimate-info">
    <!-- 退款信息 -->
    <u-card
      :show-head="false"
      :border="false"
      padding="40"
      margin="20rpx 34rpx"
    >
      <div slot="body" class="refund-info">
        <div class="title">{{ title }}</div>
        <div class="u-margin-top-20">
          <!-- <div class="refund-lay-image">
            <u-image
              width="60px"
              height="60px"
              :src="returnInfo.orderGoods[0].goods_image"
            ></u-image>
            <div class="u-margin-left-30 refund-info-body">
              <div class="text-style">
                {{ returnInfo.orderGoods[0].goods_title }}
              </div>
              <div class="u-margin-top-15 tips-style">
                {{ returnInfo.orderGoods[0].goods_sku_text }}
              </div>
            </div>
          </div> -->
          <div class="information">
            <image
              class="information-img"
              :src="returnInfo.orderGoods[0].goods_image"
            />
            <div class="information-right">
              <div class="information-right-title">
                {{ returnInfo.orderGoods[0].goods_title }}
              </div>
              <div class="specifications-text">
                {{ returnInfo.orderGoods[0].goods_sku_text }}
              </div>
            </div>
          </div>
          <div class="refund-lay-info u-margin-top-20">
            <u-row>
              <u-col span="3">
                <div class="float-right">订单号:</div>
              </u-col>
              <u-col span="8">
                <div class="over-space">{{ returnInfo.order_sn }}</div>
              </u-col>
              <u-col span="1">
                <div
                  class="font-color float-right"
                  @click="onCopyText(returnInfo.order_sn)"
                >
                  复制
                </div>
              </u-col>
            </u-row>
          </div>
          <div class="refund-lay-info u-margin-top-20">
            <u-row>
              <u-col span="3">
                <div class="float-right">退款原因:</div>
              </u-col>
              <u-col span="6">
                <div>{{ returnInfo.afterSales.shop_user_apply_reason }}</div>
              </u-col>
              <u-col span="3">
                <div class="font-color float-right"></div>
              </u-col>
            </u-row>
          </div>
          <div class="refund-lay-info u-margin-top-20">
            <u-row>
              <u-col span="3">
                <div class="float-right">退款金额:</div>
              </u-col>
              <u-col span="6">
                <div>￥{{ returnInfo.afterSales.refund_money }}</div>
              </u-col>
              <u-col span="3">
                <div class="font-color float-right"></div>
              </u-col>
            </u-row>
          </div>
          <div class="refund-lay-info u-margin-top-20">
            <u-row>
              <u-col span="3">
                <div class="float-right">申请件数:</div>
              </u-col>
              <u-col span="6">
                <div>{{ returnInfo.orderGoods[0].goods_num }}</div>
              </u-col>
              <u-col span="3">
                <div class="font-color float-right"></div>
              </u-col>
            </u-row>
          </div>
          <div class="refund-lay-info u-margin-top-20">
            <u-row>
              <u-col span="3">
                <div class="float-right">申请时间:</div>
              </u-col>
              <u-col span="6">
                <div>
                  {{ $formatUnix(returnInfo.afterSales.createtime) }}
                </div>
              </u-col>
              <u-col
                span="3"
                @click="$makePhoneCall(returnInfo.OrderBaseParam.service_phone)"
              >
                <div class="font-color float-right font-width">
                  <u-icon name="chat"></u-icon>联系商家
                </div>
              </u-col>
            </u-row>
          </div>
        </div>
      </div>
    </u-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { setClipboardData } from 'uni-clipboard';
export default Vue.extend({
  props: {
    returnInfo: Object,
    title: String,
  },
  components: {},
  data: () => ({}),
  computed: {},
  methods: {
    // 复制功能
    onCopyText(number: any) {
      setClipboardData(number);
      uni.hideToast();
      uni.showToast({ title: '复制成功!' });
    },
  },
  watch: {},
  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
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
// 退款信息
.refund-info {
  .title {
    font-size: 32rpx;
    font-weight: 800;
    color: #000000;
  }
  .text-style {
    color: #000000;
    font-size: 28rpx;
  }
  .refund-lay-image {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .refund-info-body {
      width: 100%;
    }
  }
  .information {
    margin: 20rpx 0 32rpx 0;
    display: flex;
    align-items: center;
  }
  .information-img {
    width: 120rpx;
    height: 120rpx;
    border-radius: 10rpx;
  }
  .information-right {
    flex: 1;
    margin-left: 28rpx;
    .information-right-title {
      font-size: 24rpx;
      line-height: 34rpx;
      color: #000;
    }
  }
  .tips-style {
    color: #acacac;
    font-size: 24rpx;
  }
  .refund-lay-info {
    .float-right {
      float: right;
      color: #acacac;
    }
    .font-color {
      color: $u-type-primary;
      white-space: nowrap;
      .u-icon {
        margin-right: 4rpx;
        font-size: 36rpx;
      }
    }
    .font-width {
      display: flex;
      align-items: center;
      white-space: nowrap;
      // width: 160rpx;
    }
  }
  .over-space {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
