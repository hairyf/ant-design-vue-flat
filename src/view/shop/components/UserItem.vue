<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-31 14:24:21
 * @LastEditTime: 2021-06-07 10:58:05
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="flex px-10 py-12 relative shadow rounded-xl bg-center bg-cover">
    <!--    <img class="w-64 h-64 mr-10 flex-shrink-0" :src="item.avatar" />-->

    <cal-avatar  class="mr-20" size="48" fit="cover" :src="item.avatar" />

    <div class="flex-1">
      <div class="flex text-xs mb-4">
        <div class="w-48 text-right">用户名</div>
        <span class="ml-10">{{ item.username || '暂无' }}</span>
      </div>
      <div class="flex text-xs mb-4">
        <div class="w-48 text-right">姓名</div>
        <span class="ml-10">{{ item.nickname || '暂无' }}</span>
      </div>
      <div class="flex text-xs mb-4">
        <div class="w-48 text-right whitespace-nowrap">注册时间</div>
        <span class="ml-10 whitespace-nowrap">{{ item.createtime ? formatUnix(item.createtime) : '暂无' }}</span>

      </div>
      <div class="flex text-xs">
        <div class="w-48 text-right">手机号</div>
        <span class="ml-10">{{ item.mobile || '暂无' }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue-demi'
import { formatUnix } from '@/utils/index'
const props = defineProps({
  item: { type: Object, required: true }
})
</script>
<style lang="scss" scoped></style>
