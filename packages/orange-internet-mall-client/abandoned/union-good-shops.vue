<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-11 16:35:07
 * @LastEditTime: 2021-01-11 16:35:18
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="union-good-shops">
    <u-divider bg-color="#F8F8F8" :margin-top="56" :margin-bottom="28"
      >精品好货</u-divider
    >
    <common-grid-good-list :list="hotDoodsData" />
    <u-loadmore
      :load-text="{
        loadmore: '轻轻上拉',
        loading: '努力加载中',
        nomore: '没有更多了~',
      }"
      color="#ACACAC"
      margin-top="48"
      margin-bottom="48"
    />
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
