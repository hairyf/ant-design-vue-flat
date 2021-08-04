<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-29 16:26:48
 * @LastEditTime: 2021-06-02 09:58:15
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-sticky-layout flex flex-col" :style="{ minHeight: analyUnit(minHeight) }">
    <div class="cal-sticky-layout__content flex-1">
      <slot />
    </div>
    <div class="cal-sticky-layout__sticky">
      <slot name="sticky" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { analyUnit } from '@/utils'
  import { defineProps } from 'vue-demi'
  defineProps({
    minHeight: {
      type: [String, Number],
      required: true
    }
  })
</script>
