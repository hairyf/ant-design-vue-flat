<!--
 * @Author: Mr.wang
 * @Date: 2021-06-10 15:36:17
 * @LastEditTime: 2021-06-22 16:52:24
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-tabs class="cal-tabs" v-bind="props" :animated="false">
    <slot></slot>
  </a-tabs>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  const props = defineProps({})
</script>
<style lang="scss">
  .cal-tabs {
    .ant-tabs-tab:hover {
      color: #e89026 !important;
    }
    .ant-tabs-nav .ant-tabs-tab-active {
      @apply rounded-full  text-center leading-6;
      color: #fff !important;
      padding: 0 24px !important;
      height: 24px !important;
      border: none;
      background: linear-gradient(90deg, #e89026 0%, #ffc28a 104.61%);
      box-shadow: 0px 2px 4px rgba(247, 163, 85, 0.15);
    }
    .ant-tabs-ink-bar {
      display: none !important;
    }
    .ant-tabs-bar {
      margin-bottom: 0;
      border-bottom: none;
    }
  }
</style>
