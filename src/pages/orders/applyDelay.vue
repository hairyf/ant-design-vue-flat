<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-19 19:39:25
 * @LastEditTime: 2021-01-23 14:45:24
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="apply-delay">
    <!-- 账单信息(交租) -->
    <u-card :show-foot="false" :border="false" margin="18rpx 32rpx">
      <div class="card-order-head" slot="head">
        <div class="title">{{ detail.house.name }}</div>
      </div>
      <div class="card-order-body" slot="body">
        <div class="info-layer">
          <span class="tips">缴费周期</span>
          <span class="text">
            {{ $format(detail.begintime) }}
            至
            {{ $format(detail.endtime) }}
          </span>
        </div>
        <div class="info-layer">
          <span class="tips">应缴费用</span>
          <span class="text">{{ detail.amount }}元</span>
        </div>
        <div class="info-layer">
          <span class="tips">实缴费用</span>
          <span class="text">{{ detail.fee }}元</span>
        </div>
        <div class="info-layer">
          <span class="tips">应缴日期</span>
          <span class="text">{{ $format(detail.should_time) }}</span>
        </div>
        <div class="info-layer">
          <span class="tips">实缴日期</span>
          <span class="text" :style="{ color: statusText.color }">{{
            statusText.text
          }}</span>
        </div>
      </div>
    </u-card>
    <u-card :show-foot="false" :border="false" margin="18rpx 32rpx">
      <div
        class="card-order-head u-flex u-row-between"
        slot="head"
        @click="daySelectShow = true"
      >
        <div class="u-flex">
          <span class="label-slot">*</span>
          <span>延期时间</span>
        </div>
        <div class="tips">
          <span>{{ $numberToChinese(form.day) }}天</span>
          <u-icon class="u-m-l-20" color="#ADADAD" name="arrow-right" />
        </div>
      </div>
      <div class="card-order-body" slot="body">
        <custom-textarea
          v-model="form.value"
          label="问题描述"
          placeholder="请输入问题描述"
        >
          <span class="label-slot" slot="left">*</span>
        </custom-textarea>
      </div>
    </u-card>
    <u-select v-model="daySelectShow" :list="days" @confirm="onGenderSelect" />
    <common-fixed-footer :flex="false">
      <u-button type="primary" shape="circle" @click="onsubmit"
        >确认申请</u-button
      >
    </common-fixed-footer>
  </div>
</template>

<script lang="ts">
import { reqApplyDelay, reqOrderDetail } from '@/api';
import { showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    daySelectShow: false,
    days: [
      { value: 1, label: '1 天' },
      { value: 3, label: '3 天' },
      { value: 7, label: '7 天' },
    ],
    detail: {} as any,
    form: {
      value: '',
      day: 1,
    },
  }),
  computed: {
    statusText() {
      const status = this.detail.status;
      return {
        0: {
          text: '待付款',
          color: '#FF7E5F',
        },
        1: {
          text: '已付款',
          color: '#FF7E5F',
        },
        2: {
          text: '延期中',
          color: '#FEB47B',
        },
      }[status as 0 | 1 | 2];
    },
  },
  methods: {
    // 处理选择天数
    onGenderSelect(ev: [{ value: number; label: string }]) {
      const value = ev[0].value;
      this.form.day = value;
    },
    // 初始化详情数据
    async initDetail(id: string) {
      const { data: detail } = await reqOrderDetail(id);
      this.detail = detail;
    },
    // 提交信息
    async onsubmit() {
      await reqApplyDelay({
        order_id: this.detail.order_id,
        item_id: this.detail.id,
        delay_time: this.form.day,
        delay_reason: this.form.value,
      });
      await showToast({ title: '提交成功!' });
      this.$navigateBack();
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { order_sn: string }) {
    this.initDetail(options.order_sn);
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
@include full-page(apply-delay);
</style>
