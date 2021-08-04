<!--
 * @Author: Mr.wang
 * @Date: 2021-04-20 21:08:00
 * @LastEditTime: 2021-04-26 16:21:44
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="custom-card-container">
    <!-- 地址信息 -->
    <u-card
      :show-foot="showFoot"
      :show-head="isShowHead"
      :head-border-bottom="false"
      :foot-border-top="false"
      :border="false"
      :body-style="{ padding: '0 40rpx' }"
      :padding="isShowHead ? 40 : 0"
      margin="20rpx 34rpx"
    >
      <div slot="head" class="head-between">
        <div :class="isLength ? 'title' : 'long-title'">{{ title }}</div>
        <slot name="head-right" />
      </div>
      <div slot="body">
        <slot name="body" />
      </div>
      <div slot="foot">
        <slot name="foot" />
      </div>
    </u-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    showFoot: {
      type: Boolean,
      default: true,
    },
    isShowHead: {
      type: Boolean,
      default: true,
    },
    isLength: {
      type: Boolean,
      default: true,
    },
    title: String,
  },
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
.custom-card-container {
  .head-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .head-right {
      color: #acacac;
    }
  }
  .title {
    font-size: 28rpx;
    font-weight: bold;
  }
  .long-title {
    font-size: 22rpx;
    font-weight: bold;
  }
}
</style>
