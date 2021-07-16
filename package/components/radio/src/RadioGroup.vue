<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 19:28:29
 * @LastEditTime: 2021-07-16 17:28:13
 * @Description: 单选组
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <radio-group class="cal-radio-group" v-model:value="value">
    <slot></slot>
  </radio-group>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalRadioGroup' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { useVModel } from '@vueuse/core'
  import { RadioGroup } from 'ant-design-vue'
  const props = defineProps({
    modelValue: [String, Number]
  })
  const value = useVModel(props, 'modelValue')
</script>
<style lang="scss">
  .cal-radio-group {
  }
</style>
