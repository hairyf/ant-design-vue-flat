<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-09 10:54:56
 * @LastEditTime: 2021-06-09 10:55:41
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div>测试组件-等待组件</div>
</template>
<script lang="ts" setup>
  import { awaitPromise } from '@/utils'
  await awaitPromise(2000)
</script>
