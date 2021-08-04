<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-31 14:24:21
 * @LastEditTime: 2021-06-10 18:00:06
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="py-24 px-32" :class="{ 'theme-item-limit': limit }">
    <div class="flex items-center">
      <slot />
      <span class="ml-14"> {{ text }} </span>
    </div>
    <img class="w-176 h-100 mt-14" :src="src" style="border-radius: 20px" />
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  defineProps({
    item: Object,
    limit: Boolean,
    text: String,
    src: String
  })
</script>
<style lang="scss" scoped>
  .theme-item-limit {
    position: relative;
    &::before {
      top: 0;
      right: 0;
      width: 72px;
      height: 32px;
      color: white;
      content: '限定';
      font-size: 12px;
      line-height: 32px;
      text-align: center;
      position: absolute;
      border-top-right-radius: 20px;
      border-bottom-left-radius: 20px;
      background-color: #f77c55;
    }
  }
</style>
