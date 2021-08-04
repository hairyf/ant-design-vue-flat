<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-07 14:34:50
 * @LastEditTime: 2021-02-20 11:11:37
 * @Description: 页面组合-猜你喜欢
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="union-guess-like">
    <!-- 分割线 -->
    <u-divider
      :bg-color="color || '#f2f2f2'"
      :half-width="200"
      :margin-bottom="28"
    >
      猜你喜欢
    </u-divider>
    <!-- 商品列表 -->
    <div class="like-list">
      <common-grid-good-list :list="hotDoodsData" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    color: String,
  },
  data: () => ({
    hotDoodsData: [],
  }),
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

<style lang="scss"></style>
