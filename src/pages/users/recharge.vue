<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-11 10:57:59
 * @LastEditTime: 2021-05-10 18:34:59
 * @Description: 换货
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="recharge" v-if="list.length">
    <u-card :show-head="false" :border="false" padding="28" margin="20rpx 0">
      <div class="recharge-card" slot="body">
        <div class="title">充值金额</div>
        <u-field
          label-width="0"
          placeholder="￥"
          :value="rechargAmount"
          :icon-style="{ fontSize: '44rpx' }"
          :field-style="{ fontSize: '44rpx' }"
          @input="monitor"
        />
        <div class="tips">
          目前余额：<span :style="{ color: $hexColor['--color-primary'] }">{{
            balance
          }}</span
          >元
        </div>
      </div>
    </u-card>
    <union-blank height="10" />
    <div class="limit">
      提示：充值金额不得低于{{
        depositWithdrawal.deposit.lowest_deposit_money
      }}元
    </div>
    <u-card :show-head="false" :border="false" padding="28" margin="20rpx 0">
      <div class="recharge-card" slot="body">
        <div class="title">充值方式</div>
        <div class="payment-type">
          <div
            class="payment-item u-flex"
            v-for="(item, index) in list"
            @click="paymentMethod = item.pay_code"
            :key="index"
          >
            <view-icon
              v-if="item.pay_code == 'WxPay'"
              class="u-m-r-10"
              name="cl-wechat-payment"
              size="32"
              color="#09BB07"
            />
            <view-icon
              v-if="item.pay_code == 'AliPay'"
              class="u-m-r-10"
              name="cl-alipay"
              size="32"
              color="#108EE9"
            />
            <!-- <u-icon
              name="rmb-circle-fill"
              v-if="item.pay_code == 'BalancePay'"
              class="font-style u-m-r-10"
              :style="{
                color: $hexColor['--color-primary'],
              }"
            /> -->
            <span>{{ item.name }}</span>
            <span class="u-flex-1" />
            <u-checkbox
              :value="item.pay_code === paymentMethod"
              :active-color="$hexColor['--color-primary']"
              shape="circle"
              :size="40"
            />
          </div>
        </div>
      </div>
    </u-card>
    <div class="limit">提示：赠送优惠券详细信息可进入优惠券页面详细查看</div>
    <union-blank height="30" />
    <!-- 按钮组 -->
    <div class="button-container u-flex">
      <u-button
        class="u-flex-1"
        shape="circle"
        @click="fastRecharge"
        type="primary"
        ripple
        :custom-style="{
          background: $hexColor['--color-primary'],
        }"
      >
        立即充值
      </u-button>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { reqGetDeposit, reqFastRecharge } from '@/api';
import { showToast } from '@/utils';
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: {},
  data: () => ({
    list: [] as any[],
    depositWithdrawal: store.state.common.depositWithdrawal,
    balance: '',
    paymentMethod: '',
    rechargAmount: '',
  }),
  computed: {},
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
  methods: {
    monitor(value: string) {
      const newValue = value
        .replace(/^\./, '')
        .replace(/[^\d{1,}.\d{1,}|\d{1,}]/g, '')
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
        .replace(/\.{2,}/g, '.')
        .replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
      if (this.rechargAmount === newValue) {
        this.rechargAmount = '----';
      }
      this.$nextTick(() => {
        this.rechargAmount = newValue;
      });
    },
    // 获取卡劵余额积分角标
    async getCreditCount() {
      store.dispatch('getMoney');
      const data = store.state.user.money;
      this.balance = data.banlance;
    },
    // 获取可支付类型
    async getCanDeposit() {
      const { data } = await reqGetDeposit();
      this.list = data.data;
      this.paymentMethod = this.list[0].pay_code;
    },
    // 立即充值
    async fastRecharge() {
      if (this.rechargAmount != '') {
        if (
          Number(this.rechargAmount) <
          Number(this.depositWithdrawal.deposit.lowest_deposit_money)
        ) {
          showToast({
            icon: 'none',
            title: `充值的金额不能小于${this.depositWithdrawal.deposit.lowest_deposit_money}元`,
          });
        } else {
          const { data } = await reqFastRecharge({
            code: this.paymentMethod,
            money: this.rechargAmount,
          });
          const req = data.data.data;
          // url
          if (data.data.type == 'url') {
            location.href = req;
          }
          // 微信充值
          if (data.data.type == 'data') {
            uni.requestPayment({
              timeStamp: data.timestamp.toString(),
              nonceStr: req.nonce_str,
              package: 'prepay_id=' + req.prepay_id,
              signType: 'MD5',
              paySign: req.paySign,
              async success() {
                store.dispatch('getMoney');
                await showToast({ title: '充值成功!', mask: true });
              },
            });
          }
          // 支付宝
          if (data.data.type == 'form') {
            // 支付宝支付 表单支付
            if (data.data.type == 'form') {
              const divForm = document.getElementsByTagName('divform');
              if (divForm.length) document.body.removeChild(divForm[0]);
              const div = document.createElement('divform');
              div.innerHTML = data.data.data;
              document.body.appendChild(div);
              // console.log(document.getElementById('alipay_submit'));
              // document
              //   .getElementById('alipay_submit')
              //   ?.setAttribute('target', '_blank');
              (document.getElementById('alipay_submit') as any).submit();
            }
          }
        }
      } else {
        showToast({
          title: '请输入充值金额',
          icon: 'none',
        });
      }
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.getCreditCount();
    this.getCanDeposit();
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
/* 全局容器 */
@include full-page('recharge', #f8f8f8);
.recharge {
  padding: 15rpx 34rpx 0 34rpx;
}
.recharge-card {
  min-height: 200rpx;
  .payment-item {
    padding: 24rpx 0;
    custom-icon {
      margin-right: 25rpx;
      margin-top: 8rpx;
    }
    .font-style {
      margin-right: 25rpx;
      margin-top: 8rpx;
      font-size: 15px;
    }
  }

  .title {
    padding-top: 10rpx;
    font-weight: bold;
  }
  .tips {
    padding-top: 25rpx;
    font-size: 24rpx;
    color: #acacac;
  }
  .u-field {
    font-size: 44rpx !important;
    .u-label {
      color: #acacac !important;
    }
    font-weight: bold;
  }
}
.limit {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 20rpx;
  line-height: 28rpx;
  color: #acacac;
}
.button-container {
  margin: 90rpx 25rpx 0 25rpx;
}
</style>
