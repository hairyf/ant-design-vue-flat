<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-29 09:53:01
 * @LastEditTime: 2021-06-07 16:22:34
 * @Description: 单选组
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-radio-group class="cal-radio-group" v-model:value="value">
    <slot></slot>
  </a-radio-group>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import { useModelRef } from '@/hooks/use-modelRef'
  const props = defineProps({
    modelValue: [String, Number]
  })
  const value = useModelRef(props, 'modelValue')
</script>
<style lang="scss">
  .cal-radio-group {
  }
</style>
