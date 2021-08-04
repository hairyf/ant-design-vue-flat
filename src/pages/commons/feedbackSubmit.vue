<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-02-22 17:58:04
 * @LastEditTime: 2021-05-17 15:26:57
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <view-controller>
    <div class="feedback-submit">
      <div class="header-container">
        <u-subsection
          bg-color="none"
          inactive-color="#B7B7B7"
          active-color="#ffffff"
          :button-color="$hexColor['--color-primary']"
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
        :padding="20"
      >
        <div class="card-order-body" slot="body">
          <u-field
            required
            label="联系方式"
            placeholder="请输入手机号码"
            input-align="right"
            :border-bottom="false"
          />
        </div>
      </u-card>
    </div>
  </view-controller>
</template>

<script lang="ts">
import store from '@/store';
import { computed } from '@vue/composition-api';
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
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
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
