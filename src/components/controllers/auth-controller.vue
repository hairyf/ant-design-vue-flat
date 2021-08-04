<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-12 16:01:10
 * @LastEditTime: 2021-05-14 15:49:01
 * @Description: 登录权限模板
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div>
    <div class="common-auth-container">
      <div class="common-auth-mask" v-if="!isAuthUserInfo" @click="modalBox" />
      <slot />
    </div>
    <!-- <u-modal
      v-model="showLoginModal"
      show-cancel-button
      content="登录后查看更多信息"
      @confirm="redirectToLogin"
    /> -->
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { redirectToLogin } from '@/utils';

import Vue from 'vue';
export default Vue.extend({
  props: {
    identif: {
      type: String,
      default: 'show-login-modal-default',
    },
  },
  data: () => ({
    showLoginModal: false,
  }),
  computed: {
    isAuthUserInfo: (): boolean => store.getters.isAuthUserInfo,
  },
  methods: {
    // 跳转至登录页面
    redirectToLogin,
    modalBox() {
      uni.showModal({
        title: '提示',
        content: '登录后查看更多信息',
        success(res) {
          if (res.confirm) {
            redirectToLogin();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        },
      });
    },
  },
  mounted() {
    uni.$on(this.identif, () => {
      console.log(48);
      // this.showLoginModal = true;
      this.modalBox();
    });
  },
});
</script>

<style lang="scss">
.common-auth-container {
  position: relative;
}
.common-auth-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>
