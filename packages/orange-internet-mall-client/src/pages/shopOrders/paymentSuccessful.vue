<!--
 * @Author: Mr.wang
 * @Date: 2021-04-23 19:15:41
 * @LastEditTime: 2021-05-14 15:59:41
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="payment-successful">
    <div class="information-box" v-if="succesInfo.total_fee">
      <div class="information-list">
        <div class="left-text">支付金额</div>
        <div class="right-text">¥ {{ succesInfo.total_fee }}</div>
      </div>
      <div class="information-list">
        <div class="left-text">支付方式</div>
        <div class="right-text">{{ succesInfo.pay_type }}</div>
      </div>
      <div class="information-list">
        <div class="left-text">收货人</div>
        <div class="right-text">{{ succesInfo.consignee }}</div>
      </div>
      <div class="information-list">
        <div class="left-text">手机号</div>
        <div class="right-text">{{ succesInfo.phone }}</div>
      </div>
      <!-- <div class="information-list">
        <div class="left-text">收货地址</div>
        <div class="right-text">
          深圳市龙岗区龙城街道龙城街道办爱联畬吓村东二区三巷1号店
        </div>
      </div> -->
      <div class="operation-btn">
        <u-button
          type="default"
          shape="circle"
          @click="$navigateTo('/pages/shopOrders/myOrders', { id: 2 })"
          >查看订单</u-button
        >
        <u-button
          type="default"
          shape="circle"
          @click="$navigateTo('/pages/baseTabBars/homePage')"
          >返回首页</u-button
        >
      </div>
    </div>
    <!-- <u-divider color="#000" bg-color="#f7f7f7">猜你喜欢</u-divider> -->
    <view-shops-recommend type="支付成功" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { reqPaySuccess } from '@/api';
export default Vue.extend({
  components: {},
  data: () => ({
    succesInfo: {} as any,
  }),
  computed: {},
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  async onLoad(options: { ids: Key }) {
    const { data } = await reqPaySuccess((options.ids + '').split(','));
    this.succesInfo = data.data;
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
page {
  background-color: #f7f7f7;
}
.payment-successful {
  // min-height: 100vh;
  padding: 72rpx 34rpx 0 34rpx;
  background-color: #f7f7f7;
  .information-box {
    padding: 40rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .information-list {
    display: flex;
    margin-bottom: 28rpx;
    .left-text {
      min-width: 112rpx;
      white-space: nowrap;
      font-size: 28rpx;
      color: #acacac;
    }
    .right-text {
      margin-left: 28rpx;
      font-size: 28rpx;
      color: #000000;
    }
  }
  .operation-btn {
    margin-top: 72rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .u-btn--default {
      color: #000;
    }
  }
  .u-divider {
    margin-top: 56rpx !important;
  }
}
</style>
