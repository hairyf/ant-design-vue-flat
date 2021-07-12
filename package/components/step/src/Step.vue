<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 19:33:54
 * @LastEditTime: 2021-07-12 19:46:00
 * @Description: 步进器项
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-step class="cal-step" v-bind="props">
    <template #icon>
      <i class="nr-after text-4xl" />
      <i class="nr-step-await text-common-primary-color-light-5" style="font-size: 40px" />
    </template>
    <template #description>
      <slot name="description" />
    </template>
    <slot />
  </a-step>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalStep' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  const props = defineProps({})
  import { useTheme } from '../../../utils/theme'
  useTheme('Common')
</script>
<style lang="scss">
  .nr-after {
    display: none;
  }
  .ant-steps-item-custom.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon,
  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: var(--common-primary-color) !important;
    .nr-after {
      display: inline-block;
    }
    .nr-step-await {
      display: none;
    }
  }
</style>
