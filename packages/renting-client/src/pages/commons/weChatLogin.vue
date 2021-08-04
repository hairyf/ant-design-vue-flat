<template>
  <div class="login">
    <div class="header">
      <image :src="common.logo" />
      <div class="tips">{{ common.name }} 申请使用</div>
    </div>
    <div class="main">
      <div class="title">以下信息</div>
      <u-checkbox v-model="isConfirmAuth" shape="circle" active-color="#00a050"
        >你的微信绑定手机号与账号信息(昵称、头像、地区及性别)</u-checkbox
      >
    </div>
    <div class="footer">
      <!-- 授权用户信息 -->
      <button
        class="setting-btn"
        v-if="!isAuthUserInfo"
        :disabled="!isConfirmAuth"
        @click="onGetUserInfo"
      >
        同意授权用户信息
      </button>
      <!-- 授权手机号码 -->
      <button
        class="setting-btn"
        open-type="getPhoneNumber"
        v-else-if="!isAuthPhoneCode"
        :disabled="!isConfirmAuth"
        @getphonenumber="onGetPhoneCode"
      >
        同意授权手机号码
      </button>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { staticUrls } from '@/config';
import store from '@/store';
import { showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    logImage: staticUrls['logo'],

    // 是否同意授权
    isConfirmAuth: true,
    // 授权成功跳转页面, 默认返回首页
    path: '',
    // 授权成功跳转类型, 默认返回上一页
    type: '',
    // 返回页数, 默认为1
    delta: 1,
  }),
  computed: {
    user: () => store.state.user,
    isAuthUserInfo: (): boolean => store.getters.isAuthUserInfo,
    isAuthPhoneCode: (): boolean => store.getters.isAuthPhoneCode,
    common: () => store.state.common,
  },
  methods: {
    // 授权账号信息
    async onGetUserInfo(ev: { detail: UniApp.GetUserInfoRes }) {
      uni.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: async (res: any) => {
          console.log(res,'------------------')
          if (res.errMsg === 'getUserInfo:fail auth deny') {
            return false;
          }
          await store.dispatch('registerUserInfo', [res.encryptedData, res.iv]);
          await showToast({
            title: '授权成功! 再次点击授权手机号！',
            mask: true,
            icon: 'none',
          });
          if (this.isAuthPhoneCode) {
            if (this.type === 'redirect') uni.redirectTo({ url: this.path });
            if (this.type === 'back') uni.navigateBack({ delta: this.delta });
          }
          // 登录埋点（友盟+）
          this.$uma.trackEvent('Um_Event_LoginSuc', {
            Um_Key_LoginType: '微信授权登录',
            Um_Key_UserID: store.state.user.info.user_id.toString(),
          });
        },
      });
    },
    // 授权手机号码
    async onGetPhoneCode(ev: any) {
      if (ev.detail.errMsg !== 'getPhoneNumber:ok') {
        return false;
      }
      const encryptedData = ev.detail.encryptedData as string;
      const iv = ev.detail.iv as string;
      await store.dispatch('authPhoneCode', [encryptedData, iv]);
      await showToast({ title: '授权成功!', mask: true });
      if (this.type === 'redirect') uni.redirectTo({ url: this.path });
      if (this.type === 'back') uni.navigateBack({ delta: this.delta });
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
  /* onShareAppMessage() {}, */
});
</script>

<style lang="scss">
page {
  height: 100%;
}
.login {
  display: flex;
  min-height: calc(100% - 100rpx);
  padding: 50rpx 46rpx;
  flex-direction: column;
  justify-content: center;
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 60rpx;
  image {
    width: 149rpx;
    height: 149rpx;
    margin-bottom: 20rpx;
  }
  .tips {
    font-size: 32rpx;
    color: #333333;
  }
}
.main {
  flex: 1;
  .title {
    margin-bottom: 25rpx;
    font-size: 48rpx;
    font-weight: bold;
    color: #333333;
  }
  /* 自定义单选框 */
  .u-checkbox {
    .u-checkbox__label {
      font-size: 32rpx !important;
      color: #333333;
    }
  }
}
.footer {
  display: flex;
  justify-content: center;
  /* 自定义授权按钮框 */
  .setting-btn {
    display: inline-block;
    padding: 5rpx 135rpx;
    transition: 0.5s;
    background: #00c260;
    color: #ffffff;
    font-size: 32rpx;
    font-weight: bold;
    &.button-hover {
      background: #00a050;
    }
    &[disabled] {
      background: #f2f2f2 !important;
      color: #00c260 !important;
    }
  }
}
</style>
