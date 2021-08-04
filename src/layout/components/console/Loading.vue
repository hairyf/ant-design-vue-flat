<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-16 10:51:44
 * @LastEditTime: 2021-06-29 15:18:25
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="w-full h-full" v-if="error">
    <iframe
      v-if="/<[\/\!]*[^<>]*>/.test(error?.response?.data || '')"
      :srcdoc="error?.response?.data"
      class="bg-white w-full h-full"
    />
    <cal-card v-else :title="`页面出现错误：${error.message}`">
      <span class="text-gray-darkest">{{ error.stack }}</span>
    </cal-card>
  </div>
  <a-spin
    v-else
    class="w-full h-full flex flex-col items-center justify-center"
    tip="拼命加载中..."
    size="large"
  />
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  defineProps({ error: Object })
</script>
