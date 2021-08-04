<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-02 16:49:31
 * @LastEditTime: 2021-07-09 10:55:45
 * @Description: 显示内容为空
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-empty v-bind="props" />
</template>
<script lang="ts" setup>
  import { Empty as AEmpty } from 'ant-design-vue'
  import { defineProps } from 'vue-demi'
  const props = defineProps()
</script>
<style lang="scss">
  .ant-empty-image {
    margin: 0 auto;
    width: 275px;
    height: 250px;
    img {
      text-align: center;
    }
  }
  .ant-empty-description {
    display: none;
  }
</style>
