<!--
 * @Author: Mr.wang
 * @Date: 2021-06-09 09:59:16
 * @LastEditTime: 2021-06-17 18:02:22
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-container class="h-screen">
    <el-header>
      <tab-bar />
    </el-header>
    <el-container style="background-color: #f5f5f5" class="pt-48">
      <el-aside>
        <side-bar></side-bar>
      </el-aside>
      <el-main>
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
  import { ElContainer, ElMain, ElAside, ElHeader } from 'element-plus'
  import 'element-plus/lib/theme-chalk/el-container.css'
  import 'element-plus/lib/theme-chalk/el-main.css'
  import 'element-plus/lib/theme-chalk/el-header.css'
  import 'element-plus/lib/theme-chalk/el-aside.css'
  import TabBar from './components/console/TabBar.vue'
  import SideBar from './components/console/SideBar.vue'
  import AppMain from './components/console/AppMain.vue'
</script>
<style lang="scss" scoped>
  header {
    height: 72px !important;
  }
  main {
    transform: translateY(-24px);
  }
</style>
