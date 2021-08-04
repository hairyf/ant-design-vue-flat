<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-19 10:08:46
 * @LastEditTime: 2021-01-23 11:00:31
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="custom-code-input">
    <div class="u-flex">
      <u-field
        :value="value"
        @input="$emit('input', $event)"
        placeholder="短信验证码"
        label-width="0"
      />
      <div
        class="send-code-btns"
        @click="onSendCode"
        :style="{ color: countDownNumber == 0 ? '#ff7e5f' : '#acacac' }"
      >
        {{
          countDownNumber == 0 ? '获取验证码' : countDownNumber + '秒后重新获取'
        }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reqSendCode } from '@/api';
import Vue from 'vue';
export default Vue.extend({
  props: {
    value: String,
    phone: String,
    type: String,
  },
  data: () => ({
    // 再次发送验证码时间 0 则代表可以发送验证码
    countDownNumber: 0,
  }),
  computed: {},
  methods: {
    // 发送验证码
    async onSendCode() {
      if (this.countDownNumber) {
        return false;
      }
      this.countDownNumber = 60;
      const timer = setInterval(() => {
        this.countDownNumber -= 1;
        if (!this.countDownNumber) {
          clearInterval(timer);
        }
      }, 1000);
      reqSendCode(this.phone, this.type as 'resetpwd');
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
