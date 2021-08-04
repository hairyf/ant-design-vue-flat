<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-18 19:35:54
 * @LastEditTime: 2021-01-19 09:59:20
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="configure-password">
    <u-cell-item
      @click="$navigateTo('/pages/users/setPassword')"
      bg-color="#ffffff"
      title="设置支付密码"
    />
    <u-cell-item
      @click="$navigateTo('/pages/users/editPassword')"
      bg-color="#ffffff"
      title="修改支付密码"
    />
    <u-cell-item
      @click="$navigateTo('/pages/users/resetPassword')"
      bg-color="#ffffff"
      title="重置支付密码"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({}),
  computed: {},
  methods: {},
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
@include full-page(configure-password);
</style>
