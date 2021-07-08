<!--
 * @Author: Zhilong
 * @Date: 2021-05-25 15:48:10
 * @LastEditTime: 2021-05-25 17:41:43
 * @Description: 折扣券主题图标
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="coupon-container">
    <div class="coupon-view"> 折扣券 </div>
  </div>
</template>
<style lang="scss" scoped>
  .coupon-container {
    width: 60px;
    height: 30px;

    display: flex;
    align-items: center;
    font-size: 14px;
    text-align: center;
    border-radius: 1px;
    box-sizing: border-box;
    color: var(--color-hollow, var(--color-primary));
    background-color: var(--color-primary);
    position: relative;
    // overflow: hidden;
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
      border: 1px solid var(--color-primary);
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
      background-color: var(--color-primary-light-8);
      position: relative;

      &::after {
        position: absolute;
        content: '';
        right: -32px;
        // transform: rotateZ(45deg);
        top: 0;
        bottom: 0;
        margin: auto;
        width: 0;
        height: 0;
        box-sizing: border-box;
        border: 16px solid transparent;
        border-left: 16px solid var(--color-primary-light-8);
        border-radius: 4px;
      }
    }
  }
</style>
