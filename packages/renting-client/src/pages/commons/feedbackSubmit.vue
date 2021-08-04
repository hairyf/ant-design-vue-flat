<template>
  <div class="feedback-submit">
    <div class="header-container">
      <u-subsection
        bg-color="none"
        inactive-color="#B7B7B7"
        active-color="#ffffff"
        button-color="#FF7E5F"
        :list="list"
        :current="1"
        @change="current = $event"
      ></u-subsection>
    </div>
    <u-card
      :show-head="false"
      :show-foot="false"
      :border="false"
      margin="0rpx 32rpx"
      :padding="40"
    >
      <div class="card-order-body" slot="body">
        <custom-textarea label="问题描述">
          <span class="label-slot" slot="left">*</span>
        </custom-textarea>
      </div>
    </u-card>
    <u-card
      :show-head="false"
      :show-foot="false"
      :border="false"
      margin="20rpx 32rpx"
      :padding="40"
    >
      <div class="card-order-body" slot="body">
        <u-field required label="手机号" placeholder="请输入手机号码" />
      </div>
    </u-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    list: [
      { id: 0, name: 'bug问题' },
      { id: 0, name: '功能问题' },
      { id: 0, name: '其他' },
    ],
    current: 1,
  }),
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
@include full-page(feedback-submit);
.header-container {
  margin: 40rpx 32rpx;
}
.feedback-submit {
  padding-top: 1rpx;
}
</style>
