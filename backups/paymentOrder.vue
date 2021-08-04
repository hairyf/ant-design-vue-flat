<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-18 17:19:35
 * @LastEditTime: 2021-01-23 14:49:48
 * @Description: 支付订单(押金-第一次租房)
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="right-off-rent">
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
    <!-- 账单明细 -->
    <u-card :show-foot="false" :border="false" margin="18rpx 32rpx">
      <div class="card-order-head" slot="head">
        <div class="title">账单明细</div>
      </div>
      <div class="card-order-body" slot="body">
        <div
          v-for="(item, index) in detail.detail"
          :key="index"
          class="info-layer"
        >
          <template v-if="item.type == '5'">
            <span class="tips">房租</span>
            <span class="text">{{ item.amount }}元</span>
          </template>
          <template v-if="item.type == '1'">
            <div class="left-column">
              <div class="tips">
                <span>水费</span>
                <span class="tips-sm">（{{ item.price }}元/吨）</span>
              </div>
              <div class="tips-sm">
                用水量：{{ item.variable }}吨（上期{{ item.before }}/本期{{
                  item.after
                }}）
              </div>
            </div>
            <span class="text">{{ item.amount }}元</span>
          </template>
          <template v-if="item.type == '3'">
            <div class="left-column">
              <div class="tips">
                <span>燃气</span>
                <span class="tips-sm">（{{ item.price }}元/方）</span>
              </div>
              <div class="tips-sm">
                用气量：{{ item.variable }}方（上期{{ item.before }}/本期{{
                  item.after
                }}）
              </div>
            </div>
            <span class="text">{{ item.amount }}元</span>
          </template>
          <template v-if="item.type == '2'">
            <div class="left-column">
              <div class="tips">
                <span>电费</span>
                <span class="tips-sm">（（{{ item.price }}元/度）</span>
              </div>
              <div class="tips-sm">
                用电量：{{ item.variable }}度（上期{{ item.before }}/本期{{
                  item.after
                }}）
              </div>
            </div>
            <span class="text">{{ item.amount }}元</span>
          </template>
          <template v-if="item.type == '4'">
            <span class="tips">物业费</span>
            <span class="text">{{ item.amount }}元</span>
          </template>
          <template v-if="item.type == '6'">
            <span class="tips">押金</span>
            <span class="text">{{ item.amount }}元</span>
          </template>
        </div>
      </div>
    </u-card>
    <!-- 缴费信息 -->
    <u-card :show-foot="false" :border="false" margin="18rpx 32rpx">
      <div class="card-order-head" slot="head">
        <div class="title">缴费信息</div>
      </div>
      <div class="card-order-body" slot="body">
        <div class="info-layer">
          <span class="tips">订单号</span>
          <span class="text">{{ detail.order_sn }}</span>
        </div>
        <div class="info-layer">
          <span class="tips">缴费方式</span>
          <span class="text">余额支付</span>
        </div>
        <div class="info-layer" v-if="detail.pay_time">
          <span class="tips">缴费时间</span>
          <span class="text">{{ $format(detail.pay_time) }}</span>
        </div>
      </div>
    </u-card>
    <!-- 延期明细 -->
    <u-card
      :show-foot="false"
      :border="false"
      margin="18rpx 32rpx"
      v-if="detail.delay"
    >
      <div class="card-order-head" slot="head">
        <div class="title">延期明细</div>
      </div>
      <div class="card-order-body" slot="body">
        <div class="info-layer">
          <span class="tips">延期时间</span>
          <span class="text"
            >{{ $numberToChinese(detail.delay.delay_time) }}天</span
          >
        </div>
        <div class="explain-layer">
          <div class="tips">延期原因</div>
          <div class="text">
            {{ detail.delay.delay_reason }}
          </div>
        </div>
      </div>
    </u-card>
    <!-- 底部操作栏 -->
    <common-fixed-footer :flex="false">
      <u-button
        shape="circle"
        type="primary"
        @click="$navigateTo('/pages/orders/paymentComplete')"
      >
        {{ '确认支付' }}
      </u-button>
    </common-fixed-footer>
  </div>
</template>

<script lang="ts">
import { reqOrderDetail } from '@/api';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    detail: {} as any,
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
    // 初始化详情数据
    async initDetail(id: string) {
      const { data: detail } = await reqOrderDetail(id);
      this.detail = detail;
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
  onShow() {
    if (this.detail.order_sn) this.initDetail(this.detail.order_sn);
  },
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
@include full-page(right-off-rent);
.right-off-rent {
  padding-top: 1rpx;
}
.header-container {
  margin: 0 32rpx;
  margin-top: 40rpx;
  margin-bottom: 20rpx;
  background-color: #ffffff;
}
</style>
