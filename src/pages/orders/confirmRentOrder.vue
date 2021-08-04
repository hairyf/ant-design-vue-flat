<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-18 17:19:35
 * @LastEditTime: 2021-02-05 10:05:51
 * @Description: 支付订单(押金-第一次租房)
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="right-off-rent">
    <common-empty-page text="房源已下架或已出租" :empty="!detail.house">
      <!-- 租房项(首次租房) -->
      <div class="header-container">
        <common-house-item :item="detail.house" />
      </div>
      <!-- 订单细节(首次支付) -->
      <u-card :show-head="false" :border="false" margin="18rpx 32rpx">
        <div class="card-order-body" slot="body">
          <div class="info-layer">
            <span class="tips">付款周期</span>
            <span class="text"
              >{{
                $numberToChinese(detail.house && detail.house.pay_month)
              }}月一付</span
            >
          </div>
          <div
            class="info-layer"
            v-for="(item, index) in detail.detail"
            :key="index"
          >
            <span class="tips">{{
              statusToText(item.type) || item.remark
            }}</span>
            <span class="text">{{
              item.type == 5
                ? item.price + '元 * ' + detail.house.pay_month
                : item.amount + '元'
            }}</span>
          </div>
          <!-- <div class="info-layer">
            <span class="tips">房租</span>
            <span class="text">{{ detail.house.price }}元/月</span>
          </div>
          <div class="info-layer">
            <span class="tips">房屋押金</span>
            <span class="text">{{ detail.house.deposit }}元</span>
          </div> -->
          <div class="price-text">总计：{{ detail.total_amount }}元</div>
        </div>
        <div class="card-order-foot u-flex u-row-between" slot="foot">
          <div class="left-column u-flex">
            <custom-icon name="payment-wechat" :size="35" />
            <span class="tips">微信支付</span>
          </div>
          <u-checkbox class="right-cloumn" :value="true" shape="circle" />
        </div>
      </u-card>
      <!-- 底部操作栏 -->
      <common-fixed-footer :flex="false">
        <u-button shape="circle" type="primary" @click="onPayment">
          {{ '确认支付' }}
        </u-button>
      </common-fixed-footer>
    </common-empty-page>
  </div>
</template>

<script lang="ts">
import { reqCreateOneOrder, reqOrderPre } from '@/api';
import store from '@/store';
import { $uni, showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    detail: {} as any,
  }),
  computed: {},
  methods: {
    statusToText(status: number) {
      return ({
        1: '水费',
        2: '电费',
        3: '燃气费',
        5: '房租',
        6: '押金',
      } as Record<any, any>)[status];
    },
    // 初始化详情数据
    async initDetail(id: Key) {
      const { data: detail } = await reqOrderPre(id);
      detail.house.lng = Number(detail.house.lng);
      detail.house.lat = Number(detail.house.lat);
      this.detail = detail;
    },
    // 进行下单
    async onPayment() {
      try {
        uni.showLoading({
          title: '订单创建中....',
        });
        const { data: detail } = await reqCreateOneOrder(this.detail.house.id);
        await $uni.requestPayment({
          timeStamp: detail.config.timestamp,
          nonceStr: detail.config.nonceStr,
          package: detail.config.package,
          paySign: detail.config.paySign,
          signType: detail.config.signType,
        });
        uni.hideLoading();
        await showToast({ title: '订单创建成功!' });
        this.$redirectTo('/pages/orders/orderDetails', {
          order_sn: detail.order_sn,
        });
        // 提交订单详情埋点（友盟+）
        this.$uma.trackEvent('Um_Event_SubmitOrderDetail', {
          Um_Key_ItemName: this.detail.house.name,
          Um_Key_ItemID: this.detail.id,
          Um_Key_ItemPrice: this.detail.amount,
          Um_Key_UserID: store.state.user.info?.user_id.toString(),
        });
      } catch (error) {
        uni.hideLoading();
        this.$redirectTo('/pages/orders/myOrders');
      }
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
