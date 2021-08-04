<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-19 17:05:44
 * @LastEditTime: 2021-03-31 09:07:42
 * @Description: 商品选择器
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="custom-center-card center">
    <div @click="show = true">点击展开</div>
    <link-select v-model:show="show" @select="onSelectLinkItem" :option="{ commodity: true }" />
  </el-card>
</template>
<script lang="ts" setup>
  import { ref } from '@vue/reactivity'
  const show = ref(true)
  const onSelectLinkItem = (option: any) => {}
</script>
<style lang="scss"></style>
