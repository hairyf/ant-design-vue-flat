<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-12 17:50:50
 * @LastEditTime: 2021-07-12 19:02:07
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <n-space class="cal-space" v-bind="props">
    <slot />
  </n-space>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalSpace' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { NSpace } from 'naive-ui'
  import { inheritProps } from '../../../utils/common'
  const props = defineProps({
    ...inheritProps(NSpace)
  })
</script>

<style lang="scss" scoped></style>
