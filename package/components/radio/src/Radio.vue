<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 19:25:11
 * @LastEditTime: 2021-07-29 15:16:07
 * @Description: 单选
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-radio class="cal-radio" v-bind="props" :value="value || label">
    <slot v-if="$slots['default']" />
    <template v-else>
      {{ label }}
    </template>
  </a-radio>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalRadio' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { useTheme } from '../../../utils/theme'
  import { Radio as ARadio } from 'ant-design-vue'
  const props = defineProps({
    value: String || Number || undefined,
    label: String || Number || undefined
  })
  useTheme('Common')
</script>
<style lang="scss" scoped>
  :deep(.ant-radio-inner::after) {
    background-color: var(--common-primary-color) !important;
  }
  :deep(.ant-radio-checked::after) {
    border: 1px solid var(--common-primary-color) !important;
  }
  :deep(.ant-radio-checked .ant-radio-inner) {
    border-color: var(--common-primary-color) !important;
  }
  :deep(.ant-radio) {
    transform: translateY(-1.5px);
  }
  :deep(.ant-radio:hover .ant-radio-inner) {
    border-color: var(--common-primary-color) !important;
  }
  :deep(.ant-radio-input:focus + .ant-radio-inner) {
    box-shadow: none;
  }
</style>
