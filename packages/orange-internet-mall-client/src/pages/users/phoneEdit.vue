<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-22 18:55:13
 * @LastEditTime: 2021-05-11 15:27:56
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="phone-edit">
    <div class="form-container" v-if="isAuthPhoneCode">
      <div class="old-phone">
        <div class="u-m-b-20">绑定中的手机号：{{ hidePhone }}</div>
        <div class="tips">更换手机号后，下次登录时请使用新绑定的手机号登录</div>
      </div>
    </div>
    <div class="form-container">
      <u-field
        required
        placeholder="请输入手机号"
        :label="isAuthPhoneCode ? '新手机号' : '手机号'"
        v-model="newPhone"
      />
      <custom-code-input
        required
        v-model="code"
        :type="isAuthPhoneCode ? 'resetMobile' : 'bindMobile'"
        :phone="newPhone"
      />
    </div>
    <custom-fixed-footer position="none" bg-color="none">
      <u-button shape="circle" type="primary" @click="onEditPhone">
        {{ isAuthPhoneCode ? '确认修改' : '确认绑定' }}
      </u-button>
    </custom-fixed-footer>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { navigateBack, showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    code: '',
    newPhone: '',
  }),
  computed: {
    phone: () => store.state.user.info.mobile,
    hidePhone: () => {
      const mobile = store.state.user.info.mobile;
      return mobile
        ? `${mobile.substring(0, 3)}****${mobile.substring(7, 11)}`
        : '暂无手机号码';
    },
    isAuthPhoneCode: (): boolean => store.getters.isAuthPhoneCode,
  },
  methods: {
    async onEditPhone() {
      if (this.code == '') {
        return uni.$u.toast('请输入验证码');
      }
      if (!uni.$u.test.mobile(this.newPhone)) {
        return uni.$u.toast('请输入正确的新手机号');
      }
      if (this.isAuthPhoneCode) {
        await store.dispatch('editPhoneInfo', [this.newPhone, this.code]);
      } else {
        await store.dispatch('bindPhoneInfo', [this.newPhone, this.code]);
      }
      await showToast({ title: '修改成功!' });
      navigateBack();
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    if (this.isAuthPhoneCode) {
      uni.setNavigationBarTitle({ title: '修改手机号' });
    } else {
      uni.setNavigationBarTitle({ title: '绑定手机号' });
    }
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
.old-phone {
  padding: 40rpx 30rpx;
  background-color: #f7f7f7;
}
.tips {
  font-size: 24rpx;
  color: #acacac;
}
@include full-page(phone-edit);
</style>
