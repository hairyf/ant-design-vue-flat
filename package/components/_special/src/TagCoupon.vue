<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 10:48:54
 * @LastEditTime: 2021-07-17 16:45:03
 * @Description: 折扣券主题图标
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="coupon-container">
    <div class="coupon-view"> 折扣券 </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalTagCoupon' })
</script>
<script lang="ts" setup>
  import { useTheme } from '../../../utils/theme'
  import { Tag as ATag } from 'ant-design-vue'
  useTheme('Common')
  useTheme('Tabs')
</script>
<style lang="scss" scoped>
  .coupon-container {
    width: 60px;
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 12px;
    text-align: center;
    border-radius: 1px;
    box-sizing: border-box;
    color: var(--common-primary-color);
    background-color: var(--common-primary-color);
    position: relative;
    &::after {
      position: absolute;
      content: '';
      right: -11px;
      transform: rotateZ(45deg);
      top: 0;
      bottom: 0;
      margin: auto;
      width: 22px;
      height: 22px;
      box-sizing: border-box;
      border: 1px solid var(--common-primary-color);
      border-bottom: none;
      border-left: none;
      border-top-right-radius: 4px;
    }
    .coupon-view {
      flex: 1;
      padding-left: 10px;
      margin: 0px 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100% - 2px);
      box-sizing: border-box;
      background-color: var(--common-primary-color-light-8);
      position: relative;

      &::after {
        position: absolute;
        content: '';
        right: -32px;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 0;
        height: 0;
        box-sizing: border-box;
        border: 16px solid transparent;
        border-left: 16px solid var(--common-primary-color-light-8);
        border-radius: 4px;
      }
    }
  }
</style>
