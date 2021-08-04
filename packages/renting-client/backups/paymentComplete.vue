<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-18 17:19:35
 * @LastEditTime: 2021-01-19 18:11:26
 * @Description: 支付完成(押金-第一次租房)
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="payment-complete">
    <!-- 订单状态 -->
    <u-card
      :show-head="false"
      :show-foot="false"
      :border="false"
      margin="18rpx 32rpx"
    >
      <div class="card-status-body" slot="body">
        <image src="/static/tests/payment-complete.png" />
        <div class="tips">支付成功</div>
      </div>
    </u-card>
    <!-- 订单细节 -->
    <u-card
      :show-head="false"
      :show-foot="false"
      :border="false"
      margin="18rpx 32rpx"
    >
      <div class="card-order-body" slot="body">
        <div class="info-layer">
          <span class="tips">订单号</span>
          <span class="text">ES20200911200056175209</span>
        </div>
        <div class="info-layer">
          <span class="tips">支付金额</span>
          <span class="text">2300.00元</span>
        </div>
        <div class="info-layer">
          <span class="tips">支付方式</span>
          <span class="text">余额支付</span>
        </div>
        <div class="info-layer">
          <span class="tips">剩余余额</span>
          <span class="text">125.12元</span>
        </div>
      </div>
    </u-card>
    <div class="footer-buttons">
      <u-button type="primary" shape="circle">查看订单</u-button>
      <custom-blank :height="40" />
      <u-button type="info" shape="circle">返回</u-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({}),
  computed: {},
  methods: {},
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
@include full-page(payment-complete);
.payment-complete {
  padding-top: 1rpx;
}
.card-status-body {
  text-align: center;
  image {
    display: block;
    margin: 50rpx auto;
    width: 400rpx;
    height: 400rpx;
  }
  .tips {
    font-size: 40rpx;
    color: #ff7e5f;
  }
}
/* 订单信息 */
.card-order-body {
  color: #000;
  .title {
    font-weight: bold;
    margin-bottom: 30rpx;
  }
  .info-layer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    .text {
      font-weight: bold;
    }
  }
}
/* 底部按钮组 */
.footer-buttons {
  margin: 0 32rpx;
  margin-top: 80rpx;
  padding-bottom: 40rpx;
}
</style>
