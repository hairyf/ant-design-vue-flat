<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 14:41:34
 * @LastEditTime: 2021-07-26 13:58:12
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-input-number flex items-center">
    <n-input-number class="flex-1" v-bind="props" v-model:value="num" :show-button="false" />
    <slot name="suffix" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalInputNumber' })
</script>
<script lang="ts" setup>
  import { NInputNumber } from 'naive-ui'
  import { useTheme, inheritProps } from '../../../utils'
  import { useVModel } from '@vueuse/core'
  const props = defineProps({
    ...inheritProps(NInputNumber),
    modelValue: Number
  })
  const num = useVModel(props, 'modelValue')
  useTheme('Input')
</script>
<style lang="scss">
  .cal-input-number {
    .n-input {
      --border-hover: 1px solid var(--common-primary-color) !important;
      --border-focus: 1px solid var(--common-primary-color) !important;
      --color: transparent !important;
      --color-focus: transparent !important;
      --border-radius: 0 !important;
      --caret-color: #8c8c8c !important;
      .n-input__state-border {
        display: none !important;
      }
      &.n-input--focus,
      &:hover,
      &:focus {
        .n-input__border {
          border-color: var(--common-primary-color) !important;
        }
      }
      .n-input__border {
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #8c8c8c;
      }
      .n-input__placeholder {
        display: none !important;
      }
    }
  }
</style>
