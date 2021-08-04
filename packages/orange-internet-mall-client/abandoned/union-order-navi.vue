<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-08 15:54:52
 * @LastEditTime: 2021-04-23 12:13:01
 * @Description: 页面组合-订单导航
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <u-card class="union-order-navi" padding="10" :head-border-bottom="false">
    <div class="custom-cart-head" slot="head">我的订单</div>
    <u-grid class="custom-cart-body" :col="4" :border="false" slot="body">
      <u-grid-item
        @click="$navigateTo('/pages/shopOrders/myOrders', { id: 1 })"
      >
        <custom-icon name="await-payment" size="45" />
        <span>待支付</span>
      </u-grid-item>
      <u-grid-item
        @click="$navigateTo('/pages/shopOrders/myOrders', { id: 2 })"
      >
        <custom-icon name="await-delivery" size="45" />
        <span>待发货</span>
      </u-grid-item>
      <u-grid-item
        @click="$navigateTo('/pages/shopOrders/myOrders', { id: 3 })"
      >
        <custom-icon name="await-accept" size="45" />
        <span>待收货</span>
      </u-grid-item>
      <u-grid-item @click="$navigateTo('/pages/shopOrders/afterSales')">
        <custom-icon name="after-sales" size="45" />
        <span>退款/售后</span>
      </u-grid-item>
    </u-grid>
  </u-card>
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

<style lang="scss"></style>
