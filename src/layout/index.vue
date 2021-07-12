<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-18 15:49:53
 * @LastEditTime: 2021-07-09 20:00:17
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-layout class="h-screen relative bg-transparent">
    <tab-bar class="relative" />
    <a-layout class="relative pb-12 bg-transparent">
      <side-bar />
      <app-main />
    </a-layout>
    <cal-background />
  </a-layout>
</template>
<script lang="ts" setup>
  import TabBar from './components/TabBar.vue'
  import SideBar from './components/SideBar.vue'
  import AppMain from './components/AppMain.vue'
</script>
<style lang="scss" scoped>
  .cal-layout-bg {
    transition: 0.2s background;
    background: var(--main-background);
    filter: blur(var(--blur-size));
    z-index: -1;
  }
</style>
