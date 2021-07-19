<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 19:33:54
 * @LastEditTime: 2021-07-19 21:07:25
 * @Description: 步进器项
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <step class="cal-step" v-bind="props">
    <template #icon>
      <!-- <i class="nr-after text-4xl" /> -->
      <cal-icon class="after" type="step-highlight" size="37"> </cal-icon>
      <cal-icon
        class="step-await text-common-primary-color-light-4 transform translate-y-2"
        type="step-not"
        size="40"
      >
      </cal-icon>
      <!-- <i class="nr-step-await text-common-primary-color-light-4" style="font-size: 40px" /> -->
    </template>
    <template #description>
      <slot name="description" />
    </template>
    <slot />
  </step>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalStep' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  const props = defineProps()
  import CalIcon from '../../icon/src/Icon.vue'
  import { Step } from 'ant-design-vue'
  import { useTheme } from '../../../utils/theme'
  // const AStep = Steps.Step
  useTheme('Common')
</script>
<style lang="scss">
  .after {
    display: none !important;
  }
  .ant-steps-item-custom.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon,
  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: var(--common-primary-color) !important;
    .after {
      display: inline-block !important;
    }
    .step-await {
      display: none !important;
    }
  }
</style>
