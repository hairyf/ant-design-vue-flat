<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 19:25:11
 * @LastEditTime: 2021-07-30 10:19:29
 * @Description: 单选
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-radio class="cal-radio" v-bind="props" :value="target">
    <slot v-if="$slots['default']" />
    <template v-else>
      {{ label }}
    </template>
  </a-radio>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  export default defineComponent({ name: 'CalRadio' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { useTheme } from '../../../utils/theme'
  import ARadio from 'ant-design-vue/es/radio'
  const props = defineProps({
    value: String as any,
    label: [String, Number]
  })
  const target = computed(() => (typeof props.value === 'undefined' ? props.label : props.value))
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
