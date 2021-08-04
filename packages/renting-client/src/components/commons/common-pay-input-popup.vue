<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-23 14:55:18
 * @LastEditTime: 2021-01-23 15:50:11
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <u-popup
    :value="value"
    @close="$emit('input', false)"
    mode="center"
    border-radius="14"
    closeable
  >
    <div class="u-popup-slot">
      <div class="title u-m-b-30">请输入支付密码</div>
      <div class="title u-m-b-30" v-if="title">{{ title }}</div>
      <div class="price u-m-b-30">￥ {{ price }}</div>
      <div
        class="link u-m-b-30 u-text-center"
        v-if="forget"
        @click="$navigateTo('/pages/users/setPassword')"
      >
        忘记密码?
      </div>
      <div class="u-flex u-row-between u-m-b-30">
        <span class="tips">支付方式</span>
        <span>余额支付</span>
      </div>
      <u-message-input
        dot-fill
        focus
        :value="initValue"
        :maxlength="6"
        @finish="onFinish"
      />
    </div>
  </u-popup>
</template>

<script lang="ts">
import { reqCheckpwd } from '@/api';
import Vue from 'vue';
export default Vue.extend({
  props: {
    title: String,
    value: Boolean,
    price: String,
  },
  data: () => ({
    initValue: '',
    forget: false,
  }),
  computed: {},
  methods: {
    async onFinish(value: string) {
      try {
        await reqCheckpwd(value);
        this.$emit('input', false);
        this.$emit('finish');
      } catch (error) {
        this.forget = true;
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

<style lang="scss">
.u-popup-slot {
  padding: 30rpx;
  .title {
    text-align: center;
  }
  .price {
    text-align: center;
    font-size: 45rpx;
    font-weight: bold;
  }
  .link {
    color: #2979ff;
  }
  .tips {
    color: #adadad;
  }
}
</style>
