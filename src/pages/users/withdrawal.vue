<!--
 * @Author: Mr.wang
 * @Date: 2021-04-21 10:50:13
 * @LastEditTime: 2021-05-12 14:57:35
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="withdrawal" v-if="supportList.length">
    <image
      class="background-img"
      src="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/Intersect.png"
      alt=""
    />
    <div class="content">
      <div class="withdrawal-box">
        <div class="withdrawal-box-text">提现金额</div>
        <div class="money-inp">
          <u-input
            v-model="value"
            type="number"
            placeholder="¥0.00"
            :clearable="false"
          />
          <div
            class="tips-right"
            @click="value = $store.state.user.money.banlance"
            :style="{ color: $hexColor['--color-primary'] }"
          >
            全部提现
          </div>
        </div>
        <div class="tips-text">
          <div class="tips-left">
            目前余额：
            <span :style="{ color: $hexColor['--color-primary'] }">{{
              banlance ? banlance : 0.0
            }}</span>
            元
          </div>
        </div>
      </div>
      <div class="limit">
        提示：提现金额区间为{{
          depositWithdrawal.withdrawal.lowest_withdrawal_money
        }}到{{ depositWithdrawal.withdrawal.single_highest_withdrawal_money }}元
      </div>
      <div class="withdrawal-box method-box">
        <div class="withdrawal-box-text">提现方式</div>
        <div class="choice" v-for="(item, index) in supportList" :key="index">
          <div class="choice-left">
            <image
              v-if="item.pay_code == 'WxPay'"
              class="identification"
              src="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/%E5%BE%AE%E4%BF%A1%20%E6%94%AF%E4%BB%98%201.png"
              alt=""
            />
            <image
              v-if="item.pay_code == 'AliPay'"
              class="identification"
              src="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/%E6%94%AF%E4%BB%98%E5%AE%9D%201.png"
              alt=""
            />
            <span class="choice-text" v-if="item.pay_code == 'WxPay'">
              微信支付
            </span>
            <span class="choice-text" v-if="item.pay_code == 'AliPay'">
              支付宝
            </span>
          </div>
          <span @click="switchSelect(item.pay_code)">
            <u-checkbox
              shape="circle"
              :value="current == item.pay_code"
              :active-color="$hexColor['--color-primary']"
            />
          </span>
        </div>
        <!-- <div class="choice">
          <div>
            <image
              class="identification"
              src="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/%E6%94%AF%E4%BB%98%E5%AE%9D%201.png"
              alt=""
            />
            <span class="choice-text">支付宝</span>
          </div>
          <span @click="switchSelect('alipay')">
            <u-checkbox shape="circle" :value="current == 'alipay'" />
          </span>
        </div> -->
      </div>

      <template v-if="current == 'AliPay'">
        <div class="withdrawal-box">
          <div class="alipay-info">
            <image
              class="alipay-img"
              src="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/Vector%20(3).png"
              alt=""
            />
            <div class="withdrawal-box-text">支付宝信息</div>
          </div>
          <div class="public-inp">
            <div>支付宝账号</div>
            <u-input
              placeholder="请输入支付宝账号"
              v-model="accountNumber"
              :clearable="false"
            />
          </div>
          <div class="public-inp">
            <div>收款人姓名</div>
            <u-input
              placeholder="请输入收款人姓名"
              v-model="fullName"
              :clearable="false"
            />
          </div>
        </div>
        <div class="limit">
          提示：填写后请认真核对支付宝账号信息，避免提现失败
        </div>
      </template>
      <u-button
        type="warning"
        @click="withdrawalBtn"
        ripple
        :custom-style="{
          background: $hexColor['--color-primary'],
        }"
      >
        立即提现
      </u-button>
    </div>
    <u-popup
      v-model="show"
      mode="center"
      border-radius="10"
      width="580rpx"
      height="440rpx"
    >
      <div class="popup-box">
        <image
          class="popup-img"
          src="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/Monochrome.png"
          alt=""
        />
        <div class="popup-title">提现申请已提交，等待人工审核</div>
        <div class="popup-text">我们将在三个工作日内处理您的提现申请</div>
        <u-button type="warning" @click="applyComplete">完成</u-button>
      </div>
    </u-popup>
    <u-toast ref="uToast" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { reqAvailableWithdrawal, reqImmediateWithdrawal } from '@/api/user';
import { reLaunch, showToast } from '@/utils';
import { computed } from '@vue/composition-api';
export default Vue.extend({
  components: {},
  data: () => ({
    // 提现金额
    value: '',
    // 控制支付宝的账号
    alipayShow: false,
    // 默认微信
    current: '',
    // 支付宝账号
    accountNumber: '',
    // 收款人姓名
    fullName: '',
    // 弹窗
    show: false,
    // 提现方式
    supportList: [] as any[],
    depositWithdrawal: store.state.common.depositWithdrawal,
  }),
  computed: {},
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    const banlance = computed(() => {
      return store.state.user.money.banlance;
    });
    return { $hexColor, banlance };
  },
  methods: {
    // 切换选中的
    switchSelect(type: string) {
      this.current = type;
    },
    // 提现按钮
    withdrawalBtn() {
      if (
        Number(this.value) <
          Number(this.depositWithdrawal.withdrawal.lowest_withdrawal_money) ||
        Number(this.value) >
          Number(
            this.depositWithdrawal.withdrawal.single_highest_withdrawal_money
          )
      ) {
        (this.$refs.uToast as any).show({
          title: `提现的金额的区间只能在${this.depositWithdrawal.withdrawal.lowest_withdrawal_money}元到${this.depositWithdrawal.withdrawal.single_highest_withdrawal_money}元`,
        });
      } else if (Number(this.value) > Number(store.state.user.money.banlance)) {
        (this.$refs.uToast as any).show({
          title: '提现的金额不能大于余额的金额',
        });
      } else if (this.current == 'AliPay') {
        if (this.accountNumber == '' || this.fullName == '') {
          (this.$refs.uToast as any).show({
            title: '请输入支付宝账号或者姓名',
          });
        } else {
          this.immediateWithdrawal();
        }
      } else {
        this.immediateWithdrawal();
      }
    },
    // 立即提现
    async immediateWithdrawal() {
      const options = {
        code: this.current,
        money: this.value,
      } as any;
      if (this.current == 'AliPay') {
        options.real_name = this.fullName;
        options.account = this.accountNumber;
      }
      await reqImmediateWithdrawal(options);
      this.getBalance();
      if (
        store.state.common.depositWithdrawal.withdrawal.withdrawal_examine ==
        '1'
      ) {
        this.show = true;
      } else {
        await showToast({
          title: '提现成功!',
          mask: true,
          success() {
            setTimeout(() => {
              reLaunch('/pages/users/wallet');
            }, 1500);
          },
        });
      }
    },
    // 获取提现方式
    async getWithdrawalMethod() {
      const { data } = await reqAvailableWithdrawal();
      this.supportList = data.data;
      this.current = this.supportList[0].pay_code;
    },
    getBalance() {
      store.dispatch('getMoney');
    },
    applyComplete() {
      this.show = false;
      reLaunch('/pages/users/wallet');
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getWithdrawalMethod();
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
.u-checkbox__label {
  display: none !important;
}
.withdrawal {
  position: relative;
  min-height: 100vh;
  // padding-bottom: 40rpx;
  background-color: #f7f7f7;
  border-top: 0.01rpx solid #ff5a21;
  .background-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 176rpx;
    z-index: 0;
  }
  .content {
    margin: 80rpx 34rpx 0 34rpx;
  }
  .method-box {
    min-height: 150rpx;
  }
  .withdrawal-box {
    position: relative;
    z-index: 1;
    padding: 40rpx 48rpx;
    margin: 0 0 20rpx 0;
    border-radius: 5px;
    background-color: #fff;
    .withdrawal-box-text {
      color: #000000;
      font-size: 28rpx;
      line-height: 40rpx;
      font-family: PingFang SC;
      font-style: normal;
      font-weight: bold;
    }
    .tips-text {
      margin-top: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tips-left {
        color: #acacac;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        font-size: 20rpx;
        line-height: 28rpx;
      }
    }
    .public-inp {
      display: flex;
      align-items: center;
      margin-top: 6rpx;
      padding-bottom: 8rpx;
      border-bottom: 1rpx solid #ebebeb;
      div {
        margin-right: 28rpx;
        font-size: 28rpx;
        color: #000;
      }
      .u-input__input {
        font-size: 28rpx;
      }
    }
    // .u-input {
    //   border-bottom: 1rpx solid #ebebeb;
    // }
    .alipay-info {
      display: flex;
      align-items: center;
      .alipay-img {
        vertical-align: bottom;
        width: 32rpx;
        height: 32rpx;
        margin-right: 5rpx;
      }
    }
    .money-inp {
      display: flex;
      align-items: center;
      padding: 20rpx 0;
      border-bottom: 1rpx solid #ebebeb;
      .tips-right {
        width: 25%;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        font-size: 24rpx;
      }
      .u-input__input {
        font-size: 58rpx;
      }
    }
  }
  .limit {
    margin-bottom: 20rpx;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 20rpx;
    line-height: 28rpx;
    color: #acacac;
  }
  .u-btn {
    margin-top: 100rpx;
    border-radius: 40rpx;
  }
  .choice {
    margin-top: 40rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .choice-left {
      display: flex;
      align-items: center;
    }
    .choice-text {
      margin: 0 0 0 20rpx;
      font-size: 28rpx;
      color: #000;
    }
    .identification {
      width: 32rpx;
      height: 31rpx;
    }
    .select {
      width: 40rpx;
      height: 40rpx;
    }
  }
  .popup-box {
    // padding: 50rpx 80rpx;
    text-align: center;
    .u-btn {
      margin-top: 0;
      width: 412rpx;
    }
    .popup-img {
      margin-top: 68rpx;
      width: 92rpx;
      height: 92rpx;
    }
    .popup-title {
      margin: 36rpx 0 14rpx 0;
      font-size: 28rpx;
    }
    .popup-text {
      margin-bottom: 32rpx;
      font-size: 24rpx;
      color: #acacac;
    }
  }
}
</style>
