<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-18 19:16:36
 * @LastEditTime: 2021-01-20 17:25:37
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="edit-password">
    <div class="form-container">
      <u-field
        input-align="right"
        v-model="form.currentPassword"
        password
        label="当前密码"
        placeholder="请输入当前密码"
      />
      <u-field
        input-align="right"
        v-model="form.newPassword"
        password
        label="新的密码"
        placeholder="请输入新的密码"
      />
      <u-field
        input-align="right"
        v-model="form.repeatPassword"
        password
        label="重复密码"
        placeholder="请输入重复密码"
      />
      <u-field
        input-align="right"
        v-model="form.code"
        label="手机号"
        placeholder="请输入手机号码"
      />
      <custom-code-input v-model="form.code" />
    </div>
    <div class="edit-btns-container">
      <u-button type="primary" shape="circle">提交</u-button>
    </div>
  </div>
</template>

<script lang="ts">
import { plotForm } from '@/plugins/form-strategy';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    form: {
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
      phone: '',
      code: '',
    },
  }),
  computed: {},
  methods: {
    onSubmit() {
      const validate = plotForm.validateAll(
        ['empty', this.form.currentPassword, '当前密码'],
        ['empty', this.form.newPassword, '新的密码'],
        ['empty', this.form.repeatPassword, '重复密码'],
        ['phone', this.form.phone],
        ['empty', this.form.code, '验证码']
      ).validate;
      if (validate) return false;
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
@include full-page(edit-password);
</style>
