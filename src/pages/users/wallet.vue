<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-02-20 14:55:29
 * @LastEditTime: 2021-05-17 15:28:41
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <view-controller>
    <div class="wallet">
      <div class="wallet-content">
        <div class="tips">钱包余额（元）</div>
        <div class="money">
          {{ banlance ? banlance : 0.0 }}
        </div>
        <image
          class="wallet-bg"
          src="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/wallet-bg.png"
        />
      </div>
      <u-cell-item
        title="提现"
        @click="$navigateTo('/pages/users/withdrawal')"
        v-if="showData.withdrawal == '1'"
      >
        <custom-icon class="u-m-r-10" name="withdrawal" size="48" slot="icon" />
      </u-cell-item>
      <u-cell-item
        title="充值"
        @click="$navigateTo('/pages/users/recharge')"
        v-if="showData.deposit == '1'"
      >
        <custom-icon class="u-m-r-10" name="recharge" size="48" slot="icon" />
      </u-cell-item>
      <u-cell-item title="账单明细" @click="$navigateTo('/pages/users/bills')">
        <custom-icon class="u-m-r-10" name="bill" size="48" slot="icon" />
      </u-cell-item>
    </div>
  </view-controller>
</template>

<script lang="ts">
import Vue from 'vue';
import { reqWallet } from '@/api/user';
import store from '@/store';
export default Vue.extend({
  components: {},
  data: () => ({
    balance: '',
    // 充值提现是否出现
    showData: {} as any,
  }),
  computed: {
    banlance: () => {
      return store.state.user.money.banlance;
    },
  },
  methods: {
    // 获取卡劵余额积分角标
    // getCreditCount() {
    //   const data = store.state.user.money;
    //   this.balance = data.banlance;
    // },
    async getWallet() {
      store.dispatch('getMoney');
      const { data } = await reqWallet();
      this.showData = data.data;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    // this.getCreditCount();
    this.getWallet();
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
.wallet {
  overflow: hidden;
}
.wallet-content {
  position: relative;
  width: 100%;
  height: 320rpx;
  padding: 0 50rpx;
  .tips,
  .money {
    position: relative;
    z-index: 1;
    color: #ffffff;
  }
  .tips {
    padding-top: 106rpx;
    font-size: 24rpx;
  }
  .money {
    margin-top: 10rpx;
    font-size: 60rpx;
    font-weight: 700;
  }
}
.u-cell {
  align-items: center;
  custom-icon {
    margin-top: 15rpx;
    margin-right: 15rpx;
  }
}
.wallet-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
