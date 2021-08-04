<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-26 11:17:43
 * @LastEditTime: 2021-03-19 14:00:31
 * @Description: 统计项
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="shop-item" :class="{ 'oe-row-center': center == 'center' }">
    <div class="icon-container hidden-lg-and-down">
      <i :class="['ad-' + icon]"></i>
    </div>
    <div :class="{ 'info-container': center != 'center' }" class="info-left">
      <div class="tips" v-if="showTips">
        <slot name="tips" />
      </div>
      <div class="info-text">
        <div class="title">
          <span>{{ title }}</span>
          <el-button size="mini" v-if="isMerchant">多商户</el-button>
        </div>
        <div class="detail">{{ detail }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps, useContext } from 'vue'
  const context = useContext()
  const showTips = !!context.slots.tips
  defineProps({
    icon: String,
    title: [Number, String],
    detail: String,
    center: String,
    isMerchant: Boolean
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .shop-item {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .tips {
    margin-bottom: 8px;
    font-size: 12px;
    color: #8c8c8c;
  }
  .icon-container {
    flex-wrap: 0;
    width: 81px;
    height: 81px;
    line-height: 81px;
    text-align: center;
    border-radius: 10px;
    background-color: $_color-primary;
    font-size: 40px;
    color: $_text-color-inverse;
  }
  .info-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .info-left {
    @include self-md-lg(margin-left, 0, 15px);
    @include self-lg-xl(margin-left, 15px, 27px);
  }
  .info-text {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 60%;
    margin-left: 10px;
  }
  .info-container {
    margin-left: 0px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height, or 137% */
    color: #000000;
    min-width: 120px;
    .el-button {
      /* Rectangle 68 */
      width: 100x;
      border: 0.5px solid var(--color-primary-light-3);
      color: var(--color-primary-light-3);
      box-sizing: border-box;
      border-radius: 5px;
      margin-left: 20px;
    }
  }
  .detail {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    /* or 133% */
    color: #8c8c8c;
  }
</style>
