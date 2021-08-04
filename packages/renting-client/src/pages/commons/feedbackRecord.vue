<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-19 15:25:23
 * @LastEditTime: 2021-01-19 15:30:31
 * @Description: 反馈记录
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="feedback-record">
    <u-card :border="false" margin="40rpx 32rpx" :foot-border-top="false">
      <div class="card-order-body" slot="head">反馈时间：2021-01-15</div>
      <div class="card-order-body" slot="body">问题描述</div>
      <div class="card-order-body" slot="foot">
        请输入您要反馈的问题请输入您要反馈的问题请输入您要反馈的问题请输入您要反馈的问题
      </div>
    </u-card>
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
@include full-page(feedback-record);
.feedback-record {
  padding-top: 1rpx;
}
.u-card__foot {
  padding-top: 0 !important;
}
</style>
