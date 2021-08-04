<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-19 16:44:53
 * @LastEditTime: 2021-06-28 14:13:52
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-layout-header class="bg-transparent h-64 p-0 leading-none flex">
    <div class="h-full flex items-center ml-28">
      <div class="w-full flex justify-center">
        <span class="ml-10 text-2xl font-bold"> Weitshop Components </span>
      </div>
    </div>
  </a-layout-header>
</template>
<script lang="ts" setup></script>
<style lang="scss">
  .popover-operation {
    .ant-popover-inner {
      @apply rounded-2xl;
    }
    .ant-popover-inner-content {
      @apply p-0 w-384;
    }
  }
  .popover-message {
    .ant-popover-inner {
      @apply rounded-2xl;
    }
  }
</style>
