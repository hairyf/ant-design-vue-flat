<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 10:49:23
 * @LastEditTime: 2021-07-13 11:12:41
 * @Description: 优惠券主题图标
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="offers-container">
    <div class="offers-view"> 优惠券 </div>
  </div>
</template>
<script lang="ts">
  import { useTheme } from '../../../utils/theme'
  useTheme('Common')
  useTheme('Tabs')
</script>

<style lang="scss" scoped>
  .offers-container {
    width: 60px;
    height: 30px;

    font-size: 14px;
    line-height: 30px;
    text-align: center;
    border-radius: 1px;
    box-sizing: border-box;
    color: var(--tabs-hollow-color, var(--common-primary-color));
    position: relative;
    overflow: hidden;
    background: radial-gradient(circle at left, transparent 5px, var(--common-primary-color) 0)
        center left / 50% 100% no-repeat,
      radial-gradient(circle at right, transparent 5px, var(--common-primary-color) 0) center right /
        50% 100% no-repeat;
    &::before {
      position: absolute;
      content: '';
      left: -4px;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      box-sizing: border-box;
      border: 1px solid var(--common-primary-color);
    }
    &::after {
      position: absolute;
      content: '';
      right: -4px;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      box-sizing: border-box;
      border: 1px solid var(--common-primary-color);
    }
    .offers-view {
      margin: 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100% - 2px);
      box-sizing: border-box;
      background: radial-gradient(
            circle at left,
            transparent 5.5px,
            var(--common-primary-color-light-8) 0
          )
          center left / 50% 100% no-repeat,
        radial-gradient(circle at right, transparent 5.5px, var(--common-primary-color-light-8) 0)
          center right / 50% 100% no-repeat;
      position: relative;
      overflow: hidden;

      &::before {
        position: absolute;
        content: '';
        left: -6px;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        box-sizing: border-box;
        border: 1px solid var(--common-primary-color-light-8);
      }
      &::after {
        position: absolute;
        content: '';
        right: -6px;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        box-sizing: border-box;
        border: 1px solid var(--common-primary-color-light-8);
      }
    }
  }
</style>
