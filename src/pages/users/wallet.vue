<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-22 14:01:03
 * @LastEditTime: 2021-02-05 16:09:33
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="wallet">
    <div class="header-container u-flex u-row-center">
      <image :src="walletImage" />
      <div class="tips u-m-b-10">余额</div>
      <div class="money">{{ wallet }}</div>
      <div class="tips u-m-t-10">请联系客服进行充值</div>
    </div>
    <div class="body-container u-m-t-20">
      <u-cell-item
        @click="$navigateTo('/pages/users/walletLog', { type: 'recharge' })"
        bg-color="#ffffff"
        title="充值记录"
      />
      <u-cell-item
        @click="$navigateTo('/pages/users/walletLog', { type: 'consume' })"
        bg-color="#ffffff"
        title="消费记录"
      />
      <u-cell-item
        bg-color="#ffffff"
        title="联系客服"
        @click="serverPopupShow = true"
      />
      <common-contacts v-model="serverPopupShow" />
    </div>
  </div>
</template>

<script lang="ts">
import { staticUrls } from '@/config';
import store from '@/store';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    serverPopupShow: false,
    walletImage: staticUrls['wallet'],
  }),
  computed: {
    wallet: () => store.state.user.balance,
  },
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
@include full-page(wallet);
.header-container {
  position: relative;
  height: 300rpx;
  flex-direction: column;
  .tips {
    font-size: 20rpx;
  }
  .money {
    font-size: 60rpx;
    font-weight: bold;
  }
  .tips,
  .money {
    position: relative;
    z-index: 10;
    color: #ffffff;
  }
  image {
    position: absolute;
    width: 100%;
    height: 300rpx;
  }
}
</style>
