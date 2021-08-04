<!--
 * @Author: Zhilong
 * @Date: 2021-06-17 15:45:17
 * @LastEditTime: 2021-06-18 10:15:13
 * @Description: 首页 布局
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <TabBar></TabBar>
  <RouterView />
</template>
<script lang="ts" setup>
  import TabBar from './components/home/TabBar.vue'
  import SideBar from './components/console/SideBar.vue'
  import AppMain from './components/console/AppMain.vue'
</script>
