<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-12 17:50:50
 * @LastEditTime: 2021-07-13 09:14:17
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <n-descriptions class="cal-descriptions" v-bind="props">
    <slot />
  </n-descriptions>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalDescriptions' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import { NDescriptions } from 'naive-ui'
  import { inheritNaiveUiProps } from '../../../utils/common'

  const props = defineProps({
    ...inheritNaiveUiProps(NDescriptions)
  })
</script>

<style lang="scss" scoped></style>
