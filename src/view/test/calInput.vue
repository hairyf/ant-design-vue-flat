<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-22 16:01:45
 * @LastEditTime: 2021-06-04 14:25:02
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-card title="输入框">
    <cal-input />
  </a-card>
  <a-card title="时间选择器">
    <cal-input-date />
  </a-card>
  <a-card title="区间输入框">
    <cal-input-section v-mode="a" placeholder="输入区间" />
  </a-card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue-demi'

  const onBlur = ({ target }: any) => {
    console.log('????', target.value)
  }
  const a = ref(['', ''])

  setInterval(() => {
    console.log(a.value, `a.value => ${a.value}`)
  }, 2000)
</script>
<style></style>
