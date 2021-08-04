<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-09 11:55:39
 * @LastEditTime: 2021-03-22 17:14:47
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="union-volume-integral u-flex">
    <div
      class="cart-cotnent u-flex"
      @click="$navigateTo('/pages/users/coupons', { myFlag: 0 })"
    >
      <div class="left-column u-flex">
        <div class="title">红包卡劵</div>
        <div class="tips">领取优惠卷</div>
      </div>
      <div class="right-column">
        <custom-icon name="red-envelopes" size="80" />
      </div>
    </div>
    <div
      class="cart-cotnent u-flex"
      @click="$navigateTo('/pages/users/integral')"
    >
      <div class="left-column u-flex">
        <div class="title">我的积分</div>
        <div class="tips">积分明细</div>
      </div>
      <div class="right-column">
        <custom-icon name="integral" size="80" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {},
  data: () => ({}),
  computed: {},
  methods: {},
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
/* 卡劵与积分 */
.union-volume-integral {
  position: relative;
  z-index: 10;
  margin: 0 36rpx;
}
.cart-cotnent {
  flex: 1;
  justify-content: space-between;
  padding: 28rpx 40rpx;
  background: #ffffff;
  box-shadow: 0 0 16rpx rgba(254, 155, 42, 0.1);
  border-radius: 10rpx;
  &:nth-child(1) {
    margin-right: 20rpx;
  }
}
.left-column {
  display: flex;
  flex-direction: column;
  .title {
    margin-bottom: 4rpx;
  }
  .tips {
    font-size: 20rpx;
    color: #fe9b2a;
  }
}
.right-column {
  image {
    width: 80rpx;
    height: 80rpx;
  }
}
</style>
