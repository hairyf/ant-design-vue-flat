<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-19 17:14:52
 * @LastEditTime: 2021-01-28 15:53:18
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="look-house-details">
    <div class="header-container">
      <common-house-item :item="detail.house" />
    </div>
    <u-card :show-head="false" :show-foot="false" padding="40">
      <div slot="body">
        <div class="info-layer">
          <div class="tips">房源名称</div>
          <div class="text">{{ detail.house.name }}</div>
        </div>
        <div class="info-layer">
          <div class="tips">看房时间</div>
          <div class="text">
            {{ $format(detail.appoint_time, 'YYYY-MM-DD mm:ss') }}
          </div>
        </div>
        <div class="info-layer">
          <div class="tips">预约人</div>
          <div class="text">{{ detail.name }}</div>
        </div>
        <div class="info-layer">
          <div class="tips">备注</div>
          <div class="text">{{ detail.remark || '暂无' }}</div>
        </div>
      </div>
    </u-card>
  </div>
</template>

<script lang="ts">
import { reqAppointDetail } from '@/api';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    detail: {} as any,
  }),
  computed: {},
  methods: {
    // 获取详情信息
    async initDetail(id: Key) {
      const { data: detail } = await reqAppointDetail(id);
      this.detail = detail;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { id: string }) {
    this.initDetail(options.id);
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
@include full-page(look-house-details);
.look-house-details {
  padding-top: 1rpx;
}
.header-container {
  margin: 0 32rpx;
  margin-top: 40rpx;
  margin-bottom: 20rpx;
  background-color: #ffffff;
}
.info-layer {
  display: flex;
  justify-content: space-between;
  color: #000000;
  @include not-last-child(margin-bottom, 25rpx);
  .text {
    font-weight: bold;
    max-width: 400rpx;
  }
}
</style>
