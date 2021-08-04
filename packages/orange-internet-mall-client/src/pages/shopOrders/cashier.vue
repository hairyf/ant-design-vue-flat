<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-11 10:57:59
 * @LastEditTime: 2021-05-11 11:29:28
 * @Description: 收银台
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cashier" v-if="order || payPrice">
    <u-card
      :show-head="false"
      :border="false"
      padding="44"
      margin="20rpx 34rpx"
    >
      <div class="cashier-container" slot="body">
        <div class="order-code"></div>
        <div class="order-price" v-if="payPrice">
          ¥{{ Number(payPrice).toFixed(2) }}
        </div>
        <div v-if="order.total_fee" class="order-price">
          ¥{{ Number(order.total_fee).toFixed(2) }}
        </div>
        <div
          class="payment-type"
          v-for="(item, index) in listPay"
          :key="index"
          @click="type = item.pay_code"
        >
          <div class="u-flex">
            <u-icon
              :name="item.showInfo.icon"
              :color="item.showInfo.color"
              size="40"
            />
            <span class="u-margin-left-20 u-flex-1">
              {{ item.showInfo.text }}
            </span>
            <u-checkbox
              shape="circle"
              size="40"
              icon-size="30"
              :value="type == item.pay_code"
              :active-color="$hexColor['--color-primary']"
            />
          </div>
          <span class="balance-tips" v-if="item.money">
            可用余额 {{ item.money }}
          </span>
        </div>
      </div>
    </u-card>
    <!-- 底部操作按钮 -->
    <union-blank :height="120" />
    <custom-fixed-footer>
      <u-button
        shape="circle"
        type="primary"
        @click="onClickPaymentSubmit"
        ripple
        :custom-style="{
          background: $hexColor['--color-primary'],
        }"
      >
        提交
      </u-button>
    </custom-fixed-footer>
  </div>
</template>

<script lang="ts">
import { reqGetOrderDetial, reqToPay, reqGetPayMethod } from '@/api';
import store from '@/store';
import { showToast } from '@/utils';
import { computed } from '@vue/composition-api';
import Vue from 'vue';
export default Vue.extend({
  props: {},
  components: {},
  data: () => ({
    type: 'BalancePay' as 'WxPay' | 'AliPay' | 'BalancePay',
    order: {} as Record<string, any>,
    listPay: [] as any[],
    // 支付金额
    payPrice: '',
    // 订单id
    ids: '',
  }),
  computed: {},
  methods: {
    // 获取对应图标
    getPayTypeIcon(key: string) {
      const strategy: Record<string, any> = {
        WxPay: {
          text: '微信支付',
          icon: 'weixin-circle-fill',
          color: '#41B035',
        },
        AliPay: {
          text: '支付宝',
          icon: 'zhifubao-circle-fill',
          color: '#108EE9',
        },
        BalancePay: {
          text: '余额支付',
          icon: 'rmb-circle',
          color: '#FE9B2A',
        },
      };
      return strategy[key];
    },
    // 获取订单详情
    async getOrderDetial(id: Key) {
      const { data } = await reqGetOrderDetial(id);
      this.order = data.data.order[0];
      console.log(this.order);
    },
    // 获取支付
    async getPaymentTypes() {
      const { data: res } = await reqGetPayMethod();
      this.listPay = res.data.map((item: any) => {
        item.showInfo = this.getPayTypeIcon(item.pay_code);
        return item;
      });
    },
    // 微信支付
    onWeChatPayment(data: any) {
      uni.requestPayment({
        timeStamp: data.timestamp,
        nonceStr: data.nonce_str,
        package: 'prepay_id=' + data.prepay_id,
        signType: 'MD5',
        paySign: data.paySign,
        success: async () => {
          await showToast({ title: '支付成功!', mask: true });
          this.$redirectTo('/pages/shopOrders/paymentSuccessful', {
            ids: this.ids,
          });
          // this.$redirectTo('/pages/shopOrders/myOrders', { id: 0 });
        },
      });
    },
    // 支付宝支付
    onAlipayPayment(data: string) {
      const divForm = document.getElementsByTagName('divform');
      if (divForm.length) document.body.removeChild(divForm[0]);
      const div = document.createElement('divform');
      div.innerHTML = data;
      document.body.appendChild(div);
      // document
      //   .getElementById('alipay_submit')
      //   ?.setAttribute('target', '_blank');
      (document.getElementById('alipay_submit') as any).submit();
      this.$redirectTo('/pages/shopOrders/paymentSuccessful', {
        ids: this.ids,
      });
      // this.$redirectTo('/pages/shopOrders/myOrders', { id: 0 });
    },
    // 点击提交支付
    async onClickPaymentSubmit() {
      const { data } = await reqToPay(this.ids, this.type);
      if (this.type == 'BalancePay') {
        await showToast({ title: '支付成功' });
        store.dispatch('getMoney');
        this.$redirectTo('/pages/shopOrders/paymentSuccessful', {
          ids: this.ids,
        });
        // this.$redirectTo('/pages/shopOrders/myOrders', { id: 0 });
      }
      // 调起URL支付
      if (data.data.type == 'url') {
        location.href = data.data.data;
        this.$redirectTo('/pages/shopOrders/myOrders', { id: 0 });
        return false;
      }
      // 调起微信支付
      if (data.data.type == 'data') {
        data.data.data.timestamp = data.timestamp.toString();
        this.onWeChatPayment(data.data.data);
      }
      // 支付宝
      if (data.data.type == 'form') {
        this.onAlipayPayment(data.data.data);
      }
    },
  },
  watch: {},
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
  // 页面周期函数--监听页面加载
  onLoad(options: { orderInfo: any; id: string }) {
    /** 下订单和待付款 区分 */
    if (options.orderInfo != undefined) {
      this.ids = JSON.parse(decodeURIComponent(options.orderInfo)).id;
      this.payPrice = JSON.parse(
        decodeURIComponent(options.orderInfo)
      ).payPrice;
    } else {
      this.ids = options.id;
      this.getOrderDetial(options.id);
    }

    this.getPaymentTypes();
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
/* 全局容器 */
@include full-page('cashier', #f8f8f8);
.cashier {
  padding-top: 15rpx;
}
.order-code {
  margin-top: 20rpx;
  margin-bottom: 28rpx;
  text-align: center;
}
.order-price {
  text-align: center;
  font-size: 80rpx;
  color: #ff3d00;
  font-weight: bold;
  margin-bottom: 200rpx;
}
.payment-type {
  @include not-last-child(margin-bottom, 40rpx);
  .u-checkbox-container {
    margin-right: -30rpx;
  }
}
.balance-tips {
  color: #acacac;
  font-size: 24rpx;
  margin-left: 60rpx;
}
/* 底部操作栏 */
.footer-btns {
  position: fixed;
  padding: 20rpx 56rpx;
  background-color: #fff;
  width: 100%;
  bottom: 0;
}
</style>
