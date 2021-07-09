<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-22 14:18:13
 * @LastEditTime: 2021-07-09 13:57:16
 * @Description: 按钮
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <layout class="cal-layout">
    <slot></slot>
  </layout>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalLayout' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import { Layout } from 'ant-design-vue'
  const props = defineProps({
    ...(Layout.props as {}),
    iconClass: String
  })
</script>
<style lang="scss" scoped></style>
