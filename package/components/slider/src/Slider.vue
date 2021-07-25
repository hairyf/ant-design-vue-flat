<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-24 16:36:38
 * @LastEditTime: 2021-07-24 19:45:29
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <n-slider
    class="cal-slider"
    v-bind="props"
    :theme-overrides="{
      handleSize: '16px',
      railHeight: '10px',
      fillColor: 'var(--common-primary-color-light-4)',
      fillColorHover: 'var(--common-primary-color)',
      handleColor: 'var(--common-primary-color)'
    }"
  />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalSlider' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import { NSlider } from 'naive-ui'
  import { inheritProps } from '../../../utils'
  const props = defineProps(inheritProps(NSlider))
</script>

<style lang="scss" scoped>
  .cal-slider {
    :deep(.n-slider-handle) {
      border: 2px solid #ffffff;
    }
  }
</style>
