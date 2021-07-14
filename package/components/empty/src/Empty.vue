<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-22 14:18:13
 * @LastEditTime: 2021-07-12 19:58:48
 * @Description: 按钮
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-empty v-bind="props" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalEmpty' })
</script>
<script lang="ts" setup>
  import { Empty as AEmpty } from 'ant-design-vue'
  import { defineProps } from 'vue'
  const props = defineProps()
</script>
