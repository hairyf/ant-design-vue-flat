<!--
 * @Author: Mr.wang
 * @Date: 2021-06-10 15:33:50
 * @LastEditTime: 2021-06-10 15:53:28
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-tab-pane class="cal-tab-pane bg-background py-10 flex flex-col" v-bind="props">
    <template #tab>
      <slot name="tab" />
    </template>
    <div class="cal-tab-pane__content">
      <slot></slot>
    </div>
    <div class="cal-tab-pane__sticky">
      <slot name="sticky" />
    </div>
  </a-tab-pane>
</template>
<script setup lang="ts">
  import { defineProps } from 'vue'
  const props = defineProps({})
</script>

<style lang="scss"></style>
