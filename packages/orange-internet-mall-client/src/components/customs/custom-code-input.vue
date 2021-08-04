<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-19 10:08:46
 * @LastEditTime: 2021-05-10 19:22:28
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="custom-code-input">
    <u-field
      :value="value"
      @input="$emit('input', $event)"
      placeholder="短信验证码"
      label="验证码"
      :clearable="false"
      :required="required"
    />
    <div
      class="send-code-btns"
      @click="onSendCode"
      :style="{
        color: countDownNumber == 0 ? $hexColor['--color-primary'] : '#acacac',
      }"
    >
      {{
        countDownNumber == 0 ? '获取验证码' : countDownNumber + '秒后重新获取'
      }}
    </div>
  </div>
</template>

<script lang="ts">
import { reqSendCode } from '@/api';
import store from '@/store';
import { computed, defineComponent } from '@vue/composition-api';
export default defineComponent({
  props: {
    value: String,
    phone: {
      type: String,
      default: '',
    },
    type: String,
    required: Boolean,
  },
  data: () => ({
    // 再次发送验证码时间 0 则代表可以发送验证码
    countDownNumber: 0,
  }),
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
  methods: {
    // 发送验证码
    async onSendCode() {
      if (this.countDownNumber) return false;
      try {
        await reqSendCode(this.phone, this.type as any);
      } catch (error) {
        return false;
      }
      this.countDownNumber = 60;
      const timer = setInterval(() => {
        this.countDownNumber -= 1;
        if (!this.countDownNumber) clearInterval(timer);
      }, 1000);
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

<style lang="scss">
.custom-code-input {
  position: relative;
}
.send-code-btns {
  padding-right: 28rpx;
  height: 35rpx;
  z-index: 100;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>
