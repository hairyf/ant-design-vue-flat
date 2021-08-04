<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-08 16:02:39
 * @LastEditTime: 2021-03-27 09:22:34
 * @Description: 页面组合-热销产品
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="union-hot-sale">
    <div class="hot-sale-title">热销产品</div>
    <common-grid-good-list :list="hotDoodsData" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {},
  data: () => ({
    hotDoodsData: [],
  }),
  computed: {},
  methods: {
    getHotDoods() {
      // reqHotGood();
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
/* 热销产品 */
.hot-sale-title {
  margin: 0 34rpx;
  margin-bottom: 28rpx;
  font-size: 34rpx;
  font-weight: 700;
}
</style>
