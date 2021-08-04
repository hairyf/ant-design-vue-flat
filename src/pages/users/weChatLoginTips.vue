<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-02 16:08:35
 * @LastEditTime: 2021-04-08 13:55:48
 * @Description: 微信登录提示
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="we-chat-login-tips">
    <div class="tips-container u-flex">
      <custom-icon class="u-m-r-20" name="wechart-icon" size="110" />
      <span class="text">请到微信客户端登录</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="scss">
.tips-container {
  flex-direction: column;
  margin-top: calc(50vh - 100px);
}
</style>
