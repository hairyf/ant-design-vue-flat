<!--
 * @Author: Mr.wang
 * @Date: 2021-04-20 21:08:00
 * @LastEditTime: 2021-05-10 11:50:20
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="money-to">
    <custom-card-container>
      <div slot="body">
        <div>
          <span class="u-order-time u-margin-right-15">退款金额</span> ￥
          <span class="going-text"> {{ momeyInfo.total_refund_money }}</span>
        </div>
        <div class="u-margin-top-15">
          <span class="u-order-time u-margin-right-15">支付渠道</span>
          <span v-if="momeyInfo.pay_type == 'BalancePay'" class="going-text1"
            >账户余额</span
          >
          <span v-if="momeyInfo.pay_type == 'AliPay'" class="going-text1"
            >支付宝</span
          >
          <span v-if="momeyInfo.pay_type == 'WxPay'" class="going-text1"
            >微信</span
          >
        </div>
        <div class="u-margin-top-15">
          <span class="u-order-time u-margin-right-15">退款账户</span>
          <span v-if="momeyInfo.pay_type == 'BalancePay'" class="going-text1"
            >账户余额</span
          >
          <span v-if="momeyInfo.pay_type == 'AliPay'" class="going-text1"
            >支付宝</span
          >
          <span v-if="momeyInfo.pay_type == 'WxPay'" class="going-text1"
            >微信</span
          >
        </div>
        <div class="layout-center">
          <u-time-line>
            <u-time-line-item>
              <template slot="node">
                <view
                  class="u-node"
                  style="background: #acacac"
                  v-if="momeyInfo.status != 1"
                />
                <view
                  class="u-node"
                  :style="{ background: $hexColor['--color-primary'] }"
                  v-if="momeyInfo.status == 1"
                />
              </template>
              <div slot="content">
                <div class="u-order-title">到账成功</div>
                <div class="u-order-time">
                  已退到
                  <span v-if="momeyInfo.pay_type == 'BalancePay'"
                    >账户余额</span
                  >
                  <span v-if="momeyInfo.pay_type == 'AliPay'">支付宝</span>
                  <span v-if="momeyInfo.pay_type == 'WxPay'">微信</span>
                  ,到账时间以
                  <span v-if="momeyInfo.pay_type == 'BalancePay'"
                    >账户余额</span
                  >
                  <span v-if="momeyInfo.pay_type == 'AliPay'">支付宝</span>
                  <span v-if="momeyInfo.pay_type == 'WxPay'">微信</span>
                  处理时间为准,可前往“
                  <span v-if="momeyInfo.pay_type == 'BalancePay'"
                    >账户余额</span
                  >
                  <span v-if="momeyInfo.pay_type == 'AliPay'">支付宝</span>
                  <span v-if="momeyInfo.pay_type == 'WxPay'">微信</span>
                  一账单”查看
                </div>
                <div class="u-order-time">
                  {{ $formatUnix(momeyInfo.refund_time) }}
                </div>
              </div>
            </u-time-line-item>
            <u-time-line-item>
              <view
                slot="node"
                class="u-node"
                :style="{ background: $hexColor['--color-primary'] }"
              />
              <div slot="content">
                <div class="u-order-title">
                  已退款，
                  <span v-if="momeyInfo.pay_type == 'BalancePay'"
                    >账户余额</span
                  >
                  <span v-if="momeyInfo.pay_type == 'AliPay'">支付宝</span>
                  <span v-if="momeyInfo.pay_type == 'WxPay'">微信</span>
                  处理中
                </div>
                <div class="u-order-time">
                  微匠工已将退款资金提交给
                  <span v-if="momeyInfo.pay_type == 'BalancePay'"
                    >账户余额</span
                  >
                  <span v-if="momeyInfo.pay_type == 'AliPay'">支付宝</span>
                  <span v-if="momeyInfo.pay_type == 'WxPay'">微信</span>
                  处理,通常情况下,退款会原路退回您的支付账户,余额/余额宝会在20分钟内到账,花呗/银行卡等会在2-7天内到账
                </div>
                <div class="u-order-time">
                  {{ $formatUnix(momeyInfo.createtime) }}
                </div>
              </div>
            </u-time-line-item>
            <u-time-line-item>
              <view
                slot="node"
                class="u-node"
                :style="{ background: $hexColor['--color-primary'] }"
              />
              <div slot="content">
                <div class="u-order-title">商家同意退款</div>
                <div class="u-order-time">
                  系统会在1-2天内提交
                  <span v-if="momeyInfo.pay_type == 'BalancePay'"
                    >账户余额</span
                  >
                  <span v-if="momeyInfo.pay_type == 'AliPay'">支付宝</span>
                  <span v-if="momeyInfo.pay_type == 'WxPay'">微信</span>
                  处理
                </div>
                <div class="u-order-time">
                  {{ $formatUnix(momeyInfo.createtime) }}
                </div>
              </div>
            </u-time-line-item>
          </u-time-line>
        </div>
      </div>
    </custom-card-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { reqRefundStatus } from '@/api';
import { computed } from '@vue/composition-api';
import store from '@/store';
export default Vue.extend({
  components: {},
  data: () => ({
    momeyInfo: {} as any,
  }),
  computed: {},
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
  methods: {
    // 钱款去向
    async moneyTo(orderId: Key, shopId: Key) {
      const { data } = await reqRefundStatus(orderId, shopId);
      this.momeyInfo = data.data;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { order_id: number; order_item_id: number }) {
    this.moneyTo(options.order_id, options.order_item_id);
  },
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
@include full-page('money-to', #f2f2f2);
.money-to {
  border-top: 1rpx solid #f2f2f2;
}
.layout-center {
  display: flex;
  justify-content: center;
  margin-top: 48rpx;
}
.u-node {
  height: 24rpx;
  width: 24rpx;
  border-radius: 50%;
  background-color: #acacac;
}
.u-order-title {
  font-size: 24rpx;
  color: #000;
  font-weight: bold;
}
.u-order-time {
  font-size: 22rpx;
  color: #acacac;
}
.going-text {
  font-weight: 800;
  font-size: 34rpx;
  color: #000;
}
.going-text1 {
  font-size: 28rpx;
  color: #000;
}
</style>
