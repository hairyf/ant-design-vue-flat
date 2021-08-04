<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-22 18:48:21
 * @LastEditTime: 2021-05-10 19:23:49
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="settings">
    <u-cell-group>
      <u-cell-item
        @click="$navigateTo('/pages/users/userInfo')"
        title="用户设置"
      />
      <u-cell-item
        @click="$navigateTo('/pages/users/addressList')"
        title="我的收货地址"
      />
      <u-cell-item
        @click="$navigateTo('/pages/users/phoneEdit')"
        title="手机号"
      >
        {{ isAuthPhoneCode ? '修改手机号' : '绑定手机号' }}
      </u-cell-item>
    </u-cell-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
export default Vue.extend({
  components: {},
  data: () => ({}),
  computed: {
    isAuthPhoneCode: (): boolean => store.getters.isAuthPhoneCode,
  },
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
.settings {
  position: relative;
  padding-bottom: 30px;
  height: 100vh;
}
</style>
