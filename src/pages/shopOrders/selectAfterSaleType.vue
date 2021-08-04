<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-01-11 10:57:59
 * @LastEditTime: 2021-05-10 15:20:16
 * @Description: 选择售后类型
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="select-after-sale-type">
    <u-card
      :show-head="false"
      :border="false"
      padding="20"
      margin="20rpx 34rpx"
    >
      <div class="after-sales-order-container u-flex" slot="body">
        <div class="left-column">
          <u-image
            width="120"
            height="120"
            :border-radius="10"
            :src="goodsOrderInfo.goods_image"
          />
        </div>
        <div class="right-column">
          <div class="title">
            {{ goodsOrderInfo.goods_title }}
          </div>
          <div class="price-count">
            <span class="price u-margin-right-10"
              >单价：¥{{ goodsOrderInfo.goods_price }}</span
            >
            <span class="count">购买数量：{{ goodsOrderInfo.goods_num }}</span>
          </div>
        </div>
      </div>
    </u-card>
    <u-card :show-head="false" :border="false" padding="0" margin="20rpx 34rpx">
      <!-- 换货 -->
      <div
        class="after-sale-type-container u-flex u-row-between"
        slot="body"
        @click="
          $navigateTo('/pages/shopOrders/exchangeGood', {
            type: 3,
            orderId,
            goodsId,
            goodsOrderId,
            afterSalesId,
          })
        "
        v-if="goodsOrderInfo.dispatch_status != 1"
      >
        <div class="left-column">
          <view-icon class="u-margin-right-15" name="cl-exchange" size="35" />
          <span class="status-text">换货</span>
        </div>
        <div class="right-column">
          <span class="status-tips u-margin-right-20">更换收到的产品</span>
          <u-icon
            class="u-margin-right-15"
            name="arrow-right"
            size="30"
            color="#acacac"
          />
        </div>
      </div>
      <!-- 退货退款 -->
      <div
        v-if="goodsOrderInfo.dispatch_status != 1"
        class="after-sale-type-container u-flex u-row-between"
        slot="body"
        @click="
          $navigateTo('/pages/shopOrders/refundReturnGoods', {
            type: 2,
            orderId,
            goodsId,
            goodsOrderId,
            afterSalesId,
          })
        "
      >
        <div class="left-column">
          <view-icon class="u-margin-right-15" name="cl-return" size="35" />
          <span class="status-text">退货退款</span>
        </div>
        <div class="right-column">
          <span class="status-tips u-margin-right-20">退回收到的产品</span>
          <u-icon
            class="u-margin-right-15"
            name="arrow-right"
            size="30"
            color="#acacac"
          />
        </div>
      </div>
      <!-- 仅退款 -->
      <div
        class="after-sale-type-container u-flex u-row-between"
        slot="body"
        @click="
          $navigateTo('/pages/shopOrders/refund', {
            type: 1,
            orderId,
            goodsId,
            goodsOrderId,
            afterSalesId,
          })
        "
      >
        <div class="left-column">
          <view-icon
            class="u-margin-right-15"
            name="cl-return-money"
            size="35"
          />
          <span class="status-text">仅退款</span>
        </div>
        <div class="right-column">
          <span class="status-tips u-margin-right-20">
            未收到货或卖家协商同意
          </span>
          <u-icon
            class="u-margin-right-15"
            name="arrow-right"
            size="30"
            color="#acacac"
          />
        </div>
      </div>
    </u-card>
    <u-select
      v-model="showSelect"
      :list="selectTypes"
      @confirm="onSelectConfirm"
    ></u-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { reqOrderInfo } from '@/api';

export default Vue.extend({
  components: {},
  data: () => ({
    showSelect: false,
    selectTypes: [
      { value: '1', label: '江' },
      { value: '2', label: '湖' },
    ],
    // 维权id
    afterSalesId: '',
    // 订单Id和商品Id
    orderId: 0,
    goodsId: 0,
    goodsOrderId: 0,
    // 商品订单信息
    goodsOrderInfo: {} as any,
  }),
  computed: {},
  methods: {
    // 回调参数为包含多个元素的数组，每个元素分别反应每一列的选择情况
    // onSelectConfirm(event: [{ value: string; label: string }]) {
    //   const selectItem = event[0];
    //   // console.log(selectItem);
    // },
    // 请求商品详情
    async getGoodsDetail(id: number) {
      const { data } = await reqOrderInfo(id);
      this.goodsOrderInfo = data.data;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: {
    orderId: number;
    goodsId: number;
    goodsOrderId: number;
    afterSalesId: string;
  }) {
    this.orderId = options.orderId;
    this.goodsId = options.goodsId;
    this.goodsOrderId = options.goodsOrderId;
    this.afterSalesId = options.afterSalesId ? options.afterSalesId : '';
    this.getGoodsDetail(options.goodsOrderId);
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
@include full-page('select-after-sale-type', #f8f8f8);
.select-after-sale-type {
  padding-top: 15rpx;
}

.after-sale-type-container {
  margin: 40rpx;
  .status-tips {
    color: #acacac;
  }
}
</style>
