<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 20:25:49
 * @LastEditTime: 2021-07-13 20:26:35
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-card class="" style="border-radius: 10px">
    <div class="flex items-center py-10">
      <cal-checkbox v-model="value" class="ml-4"></cal-checkbox>
      <div class="ml-10">标签名称名称称</div>
    </div>
  </cal-card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  const props = defineProps({})
  const value = ref(false)
</script>
<style lang="scss" scoped>
  :deep(.ant-card-body) {
    padding: 10px;
  }
  // :deep(.ant-card) {
  //   border-radius: 10px !important;
  // }
  :deep(.ant-card-body::after) {
    content: '';
    height: calc(100% - 48px);
    transform: matrix(-1, 0, 0, 1, 0, 0);
    background: red;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0.25rem;
    border-radius: 9999px;
    margin: auto;
    min-height: 41px;
    position: absolute;
  }
</style>
