<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-24 20:33:04
 * @LastEditTime: 2021-05-12 18:55:36
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="auth-container u-flex u-row-center">
    <image class="logo-image" mode="aspectFill" :src="logo" />
    <div class="title u-m-t-40">微匠工</div>
    <div class="tips grey u-m-t-20">为您提供优质的购物体验</div>
    <template v-if="isNeedAuthUser">
      <u-button
        class="login-button"
        type="primary"
        shape="circle"
        :custom-style="{
          boxShadow: '0px 4px 20px rgba(254, 155, 42, 0.2)',
        }"
        @click="onAuthWeChatRegister"
      >
        登录
      </u-button>
      <div class="u-m-t-28 u-text-center tips" v-if="agreement">
        <span class="grey">登录代表您已同意</span>
        <span class="blue" @click="seeAgreement">《用户使用协议》</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { navigateTo, reLaunch } from '@/utils';
import { computed, defineComponent } from '@vue/composition-api';
export default defineComponent({
  setup: () => {
    const isNeedAuthUser = computed(
      (): boolean => store.getters.isNeedAuthUser
    );
    store.dispatch('getWeChartUserInfo').then(() => reLaunch('/pages/empty'));
    // 微信小程序授权信息注册
    const onAuthWeChatRegister = async () => {
      const { encryptedData, iv } = await wx.getUserProfile({
        desc: '获取你的用户信息',
      });
      try {
        await store.dispatch('registerWeChartUserInfo', [encryptedData, iv]);
      } catch (error) {
        navigateTo('/pages/users/authAccount');
      }
    };
    // 查看协议
    const seeAgreement = () => {
      navigateTo('/pages/commons/richText', {
        title: '注册协议',
        html: store.state.common.shopset.registerSet.content,
      });
    };
    const logo = computed(() => {
      return store.state.common.shopset.shopSet.logo;
    });
    const agreement = computed(() => {
      return store.state.common.shopset.registerSet.agreement == '1';
    });
    return {
      isNeedAuthUser,
      onAuthWeChatRegister,
      seeAgreement,
      logo,
      agreement,
    };
  },
});
</script>

<style lang="scss">
page {
  height: 100%;
}
.auth-container {
  flex-direction: column;
  padding-top: 13vh;
}
.logo-image {
  position: relative;
  display: block;
  width: 176rpx;
  height: 176rpx;
  border-radius: 50%;
  overflow: hidden;
}
.login-button {
  margin-top: 100rpx;
  width: 640rpx;
}
.title {
  font-size: 40rpx;
}
.tips {
  font-size: 26rpx;
}
.grey {
  color: #9c9c9c;
}
.blue {
  color: #3f8cff;
}
</style>
