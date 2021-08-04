<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-15 19:06:21
 * @LastEditTime: 2021-01-26 15:46:45
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="progress-contaliner u-flex">
    <div class="title">{{ title }}</div>
    <div class="progress-bar u-flex-1">
      <div class="tips">{{ tips }}</div>
      <div
        class="actual"
        :style="{ width: (animation ? 0 : actual) + '%', background: color }"
      />
      <div
        class="increase"
        :style="{
          width: (animation ? 0 : increase < 40 ? 40 : increase) + '%',
          background: color,
          opacity: '0.5',
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    title: String,
    color: String,
    tips: String,
    actual: {
      type: Number,
      default: 0,
    },
    increase: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    animation: true,
  }),
  computed: {},
  methods: {},
  watch: {
    actual: {
      immediate: true,
      handler() {
        (this.animation = true),
          setTimeout(() => (this.animation = false), 400);
      },
    },
  },

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
.progress-contaliner {
  overflow-x: hidden;
  border-radius: 10rpx;
  .title {
    width: 80rpx;
    margin-right: 20rpx;
    font-size: 24rpx;
  }
  .progress-bar {
    position: relative;
    height: 40rpx;
    .tips {
      font-size: 20rpx;
      margin-left: 40rpx;
      color: #fff;
      line-height: 40rpx;
      position: relative;
      z-index: 10;
    }
    .actual {
      transition: 0.8s;
      width: 0%;
      height: 40rpx;
    }
    .increase {
      transition: 0.5s;
      width: 0%;
      height: 40rpx;
    }
    .actual,
    .increase {
      position: absolute;
      border-radius: 10rpx;
      top: 0;
      left: 0;
    }
  }
}
</style>
