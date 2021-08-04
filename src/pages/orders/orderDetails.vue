<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-19 18:55:06
 * @LastEditTime: 2021-02-05 14:07:09
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="order-details">
    <common-empty-page text="订单已丢失" :empty="!(detail && detail.order_sn)">
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
            <span class="text" :style="{ color: statusText.color }">
              {{ detail.order.status == 3 ? '已取消' : statusText.text }}
            </span>
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
            <span class="text">微信支付</span>
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
            <div class="text">{{ detail.delay.delay_reason }}</div>
          </div>
        </div>
      </u-card>
      <!-- 底部操作栏 -->
      <common-fixed-footer
        v-if="
          (detail.status == 0 || detail.status == 2) &&
          type == 'user' &&
          detail.order.status != 3 &&
          detail.status != 2
        "
      >
        <u-button
          :disabled="detail.status == 2"
          v-if="detail.order_type == 2"
          class="u-flex-1 u-m-r-20"
          type="primary"
          shape="circle"
          @click="
            $navigateTo('/pages/orders/applyDelay', {
              order_sn: detail.order_sn,
            })
          "
          >申请延期</u-button
        >
        <u-button
          v-if="detail.status == 0 && detail.order_type == 1"
          class="u-flex-1 u-m-r-20"
          type="primary"
          shape="circle"
          @click="onCancelOrder"
          >取消订单</u-button
        >
        <u-button
          class="u-flex-1"
          type="warning"
          shape="circle"
          @click="onPayment"
          >去支付</u-button
        >
      </common-fixed-footer>
      <common-fixed-footer v-if="detail.status == 0 && type == 'admin'">
        <u-button
          :disabled="detail.status == 2"
          class="u-flex-1 u-m-r-20"
          type="primary"
          shape="circle"
          @click="onRefuseDelay"
          >拒绝延期</u-button
        >
        <u-button
          class="u-flex-1"
          type="warning"
          shape="circle"
          @click="onAgreeDelay"
          >同意延期</u-button
        >
      </common-fixed-footer>
    </common-empty-page>
  </div>
</template>

<script lang="ts">
import {
  reqAgreeDelay,
  reqCancelOrder,
  reqOrderDetail,
  reqPaymentOrder,
  reqRefuseDelay,
} from '@/api';
import store from '@/store';
import { $uni, showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    detail: {} as any,
    type: 'user',
  }),
  computed: {
    statusText() {
      const status = this.detail.delay_status == 'no' ? this.detail.status : 3;
      return {
        0: {
          text: '待付款',
          color: '#FF7E5F',
        },
        1: {
          text: '已付款',
          color: '#6FD471',
        },
        2: {
          text: '已取消',
          color: '#E5E5E5',
        },
        3: {
          text: '已延期',
          color: '#FEB47B',
        },
      }[status as 1];
    },
  },
  methods: {
    // 初始化详情数据
    async initDetail(id: string) {
      const { data: detail } = await reqOrderDetail(id);
      this.detail = detail;
    },
    // 支付账单
    async onPayment() {
      const { data: detail } = await reqPaymentOrder(
        this.detail.id,
        this.detail.order_id
      );
      await $uni.requestPayment({
        timeStamp: detail.config.timestamp,
        nonceStr: detail.config.nonceStr,
        package: detail.config.package,
        paySign: detail.config.paySign,
        signType: detail.config.signType,
        success: async () => {
          await showToast({ title: '支付成功!', mask: true });
          this.initDetail(this.detail.order_sn);
          this.$uma.trackEvent('Um_Event_Payment', {
            Um_Key_UserID: store.state.user.info?.user_id.toString(),
            Um_Key_OrderID: this.detail.order_sn,
            Um_Key_ItemName: this.detail.house.name,
            Um_Key_ItemID: this.detail.id,
            Um_Key_ItemPrice: this.detail.amount,
            Um_Key_OrderPrice: this.detail.amount,
          });
        },
      });
    },
    // 同意延期
    async onAgreeDelay() {
      await reqAgreeDelay(this.detail.delay.id);
      await showToast({ title: '拒绝延期成功!', mask: true });
      this.initDetail(this.detail.order_sn);
      this.$uma.trackEvent('Um_Event_RefuseDelay', {
        Um_Key_UserID: store.state.user.info?.user_id.toString(),
        Um_Key_OrderID: this.detail.order_sn,
        Um_Key_ItemName: this.detail.house.name,
        Um_Key_ItemID: this.detail.id,
        Um_Key_ItemPrice: this.detail.amount,
        Um_Key_OrderPrice: this.detail.amount,
      });
    },
    // 拒绝延期
    async onRefuseDelay() {
      await reqRefuseDelay(this.detail.delay.id);
      await showToast({ title: '同意延期成功!', mask: true });
      this.initDetail(this.detail.order_sn);
      this.$uma.trackEvent('Um_Event_RefuseDelay', {
        Um_Key_UserID: store.state.user.info?.user_id.toString(),
        Um_Key_OrderID: this.detail.order_sn,
        Um_Key_ItemName: this.detail.house.name,
        Um_Key_ItemID: this.detail.id,
        Um_Key_ItemPrice: this.detail.amount,
        Um_Key_OrderPrice: this.detail.amount,
      });
    },
    // 取消订单
    async onCancelOrder() {
      await reqCancelOrder(this.detail.order_id, this.detail.id);
      await showToast({ title: '取消成功!', mask: true });
      this.$navigateBack();
      this.$uma.trackEvent('Um_Event_CancleOrder', {
        Um_Key_UserID: store.state.user.info?.user_id.toString(),
        Um_Key_OrderID: this.detail.order_sn,
        Um_Key_ItemName: this.detail.house.name,
        Um_Key_ItemID: this.detail.id,
        Um_Key_ItemPrice: this.detail.amount,
        Um_Key_OrderPrice: this.detail.amount,
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { order_sn: string; type?: string }) {
    this.type = options.type || this.type;
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
@include full-page(order-details);
</style>
