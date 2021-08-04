<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-09 12:02:48
 * @LastEditTime: 2021-04-27 13:54:29
 * @Description: 页面组合-服务导航
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="union-serve-navi">
    <u-card padding="10" :head-border-bottom="false" :show-head="false">
      <u-grid class="custom-cart-body" :col="4" :border="false" slot="body">
        <u-grid-item @click="$navigateTo('/pages/users/userSignIn')">
          <custom-icon name="sign-in" size="45" />
          <span>签到</span>
        </u-grid-item>
        <u-grid-item @click="$navigateTo('/pages/users/wallet')">
          <custom-icon name="wallet" size="45" />
          <span>钱包</span>
        </u-grid-item>
        <u-grid-item @click="$navigateTo('/pages/users/addressList')">
          <custom-icon name="address" size="45" />
          <span>收货地址</span>
        </u-grid-item>
        <u-grid-item @click="$navigateTo('/pages/commons/feedbackSubmit')">
          <custom-icon name="feedback" size="45" />
          <span>反馈</span>
        </u-grid-item>
        <u-grid-item @click="customerService">
          <custom-icon name="server" size="45" />
          <span>客服</span>
        </u-grid-item>
        <u-grid-item @click="$navigateTo('/pages/commons/help')">
          <custom-icon name="help" size="45" />
          <span>帮助中心</span>
        </u-grid-item>
      </u-grid>
    </u-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { PLATFORM } from '@/utils';
import { reqCustomerService } from '@/api/user';
export default Vue.extend({
  props: {},
  data: () => ({}),
  computed: {},
  methods: {
    // 客服链接
    async customerService() {
      const { data } = await reqCustomerService();
      if (PLATFORM == 'h5') {
        window.open(data.data.content);
      } else {
        this.$navigateTo('/pages/commons/h5BasePage', {
          url: data.data.content,
        });
      }
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
});
</script>

<style lang="scss"></style>
