<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-18 19:16:49
 * @LastEditTime: 2021-01-29 14:00:26
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="set-password">
    <div class="form-container">
      <u-field
        label-width="0"
        v-model="form.newpassword"
        :maxlength="6"
        password
        placeholder="请输入密码"
      />
      <u-field
        label-width="0"
        v-model="form.comfirmpassword"
        :maxlength="6"
        password
        placeholder="请输入重复密码"
      />
      <u-field
        disabled
        @click="onGoToAuthPath"
        label-width="0"
        v-model="userInfo.mobile"
        placeholder="请授权手机号码"
      />
      <custom-code-input
        :phone="userInfo.mobile"
        type="resetpwd"
        v-model="form.captcha"
      />
    </div>
    <div class="edit-btns-container">
      <u-button type="primary" shape="circle" @click="onSubmit">提交</u-button>
    </div>
  </div>
</template>

<script lang="ts">
import { httpConfig, reqResetpwd } from '@/api';
import { plotForm } from '@/plugins/form-strategy';
import store from '@/store';
import { showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    // 表单信息
    form: {
      newpassword: '',
      comfirmpassword: '',
      mobile: '',
      captcha: '',
    },
  }),
  computed: {
    isAuthPhoneCode: (): boolean => store.getters.isAuthPhoneCode,
    userInfo: () => store.state.user.info,
  },
  methods: {
    // 提交信息
    async onSubmit() {
      this.form.mobile = store.state.user.info.mobile;
      const validate = plotForm.validateAll(
        ['empty', this.form.newpassword, '支付密码'],
        ['min', this.form.newpassword, '支付密码', 6],
        ['empty', this.form.comfirmpassword, '支付密码'],
        ['min', this.form.comfirmpassword, '支付密码', 6],
        ['phone', this.form.mobile],
        ['empty', this.form.captcha, '验证码']
      ).validate;
      if (!validate) return false;
      const { data } = await reqResetpwd(this.form);
      if (httpConfig.header) {
        httpConfig.header['token'] = data.token;
      }
      await store.dispatch('refreshUserInfo');
      await showToast({ title: '重置成功!' });
      this.$navigateBack();
    },
    // 点击判断是否跳转到授权页面
    onGoToAuthPath() {
      !this.isAuthPhoneCode && this.$navigateTo('/pages/commons/weChatLogin');
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
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
@include full-page(set-password);
</style>
