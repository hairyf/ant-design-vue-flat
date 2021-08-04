<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-18 14:17:19
 * @LastEditTime: 2021-01-23 11:09:20
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="login">
    <div class="header-container">
      <div class="title">手机号登录</div>
      <div class="tips">未注册过的手机将自动创建账户</div>
    </div>
    <div class="form-container">
      <u-field v-model="form.phone" placeholder="手机号码" label-width="0" />
      <custom-code-input
        type="mobilelogin"
        :phone="form.phone"
        v-model="form.code"
      />
    </div>
    <div class="agreement-tips">
      <span>登录即表示您已阅读并同意</span>
      <span class="btns">《用户服务协议》</span>
    </div>
    <div class="submit-btns">
      <u-button type="primary" shape="circle" @click="onLoginOrRegister"
        >登录</u-button
      >
    </div>
    <div class="or-content">or</div>
    <div
      class="wechat-login"
      @click="$navigateTo('/pages/commons/weChatLogin', { delta: 2 })"
    >
      <custom-icon name="wechat" :size="80" />
      <div>微信登录</div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    // 再次发送验证码时间 0 则代表可以发送验证码
    countDownNumber: 0,
    // 表单信息
    form: {
      phone: '',
      code: '',
    },

    // 授权成功跳转页面, 默认返回首页
    path: '',
    // 授权成功跳转类型, 默认返回上一页
    type: '',
    // 返回页数, 默认为1
    delta: 1,
  }),
  computed: {},
  methods: {
    async onLoginOrRegister() {
      await store.dispatch('mobileLogin', [this.form.phone, this.form.code]);
      await showToast({ title: '登录成功!', mask: true });
      if (this.type === 'redirect') uni.redirectTo({ url: this.path });
      if (this.type === 'back') uni.navigateBack({ delta: this.delta });
      // 登录埋点（友盟+）
      this.$uma.trackEvent('Um_Event_LoginSuc', {
        Um_Key_LoginType: '手机号登录',
        Um_Key_UserID: store.state.user.info.user_id.toString(),
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(opts: { type: string; delta: string; path: string }) {
    this.path =
      (opts.path && decodeURIComponent(opts.path)) || '/pages/index/index';
    this.type = opts.type || 'back';
    this.delta = opts.delta ? Number(opts.delta) : 1;
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
.login {
  padding: 80rpx 40rpx;
}
/* 头部容器 */
.header-container {
  margin-bottom: 140rpx;
  .title {
    margin-bottom: 20rpx;
    font-size: 40rpx;
    font-weight: bold;
  }
  .tips {
    font-size: 24rpx;
    color: #acacac;
  }
}
/* 表单容器 */
.form-container {
  margin-bottom: 140rpx;
}
/* 提示信息 */
.agreement-tips {
  margin-bottom: 34rpx;
  text-align: center;
  color: #acacac;
  font-size: 24rpx;
  .btns {
    color: #ff7e5f;
  }
}
/* 提交按钮 */
.submit-btns {
  margin-bottom: 80rpx;
}
.or-content {
  margin-bottom: 80rpx;
  text-align: center;
  font-size: 24rpx;
}
/* 微信登录 */
.wechat-login {
  margin: 0 auto;
  width: 120rpx;
  text-align: center;
}
</style>
