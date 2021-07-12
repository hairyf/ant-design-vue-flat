<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-19 16:47:02
 * @LastEditTime: 2021-07-12 15:00:25
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-layout-sider class="rounded-3xl" :collapsed="collapsed" :collapsed-width="64" :width="100">
    <cal-menu>
      <cal-icon type="collapsed" />
    </cal-menu>
  </cal-layout-sider>
</template>
<script lang="ts" setup>
  import { ref } from 'vue-demi'
  const collapsed = ref(false)
</script>
<style lang="scss" scoped></style>
