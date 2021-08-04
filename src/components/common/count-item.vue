<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-02-26 11:17:43
 * @LastEditTime: 2021-05-12 14:29:23
 * @Description: 统计项
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="count-item" :class="{ 'oe-row-center': center == 'center' }">
    <div class="icon-container hidden-md-and-down">
      <i :class="['ad-' + icon]"></i>
    </div>
    <div :class="{ 'info-container': center != 'center' }" class="info-left">
      <div class="tips" v-if="showTips">
        <slot name="tips" />
      </div>
      <div class="count">{{ count }}</div>
      <div class="title">{{ title }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps, useContext } from 'vue'
  const context = useContext()
  const showTips = !!context.slots.tips
  defineProps({
    icon: String,
    count: [Number, String],
    title: String,
    center: String
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .count-item {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tips {
    margin-bottom: 8px;
    transform: translateX(-10px);
    font-size: 12px;
    color: #8c8c8c;
  }
  .icon-container {
    // flex-wrap: 0;
    // width: 81px;
    // height: 81px;
    // line-height: 81px;
    // text-align: center;
    // border-radius: 50%;
    // background-color: var(--color-primary-light-9);
    i {
      font-size: 70px;
      color: var(--color-primary);
      margin-right: 30px;
    }
  }
  .info-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .info-left {
    @include self-md-lg(margin-left, 0, 15px);
    @include self-lg-xl(margin-left, 15px, 27px);
  }
  .info-container {
    margin-left: 0px;
    // flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .count {
    margin-bottom: 14px;
    font-size: 40px;
    font-weight: bold;
    color: var(--color-primary);
  }
  .title {
    font-size: 14px;
    color: #000;
  }
</style>
