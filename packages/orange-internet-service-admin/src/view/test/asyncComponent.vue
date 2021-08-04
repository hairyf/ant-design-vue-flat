<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-09 10:53:06
 * @LastEditTime: 2021-06-09 11:00:55
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <suspense>
    <template #default>
      <await-component />
    </template>
    <template #fallback> 正在拼了命的加载... </template>
  </suspense>
</template>
<script lang="ts" setup>
  import AwaitComponent from './components/awaitComponent.vue'
</script>
