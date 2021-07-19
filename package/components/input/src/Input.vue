<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 16:11:30
 * @LastEditTime: 2021-07-19 15:16:32
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-input class="cal-input" v-bind="props" v-model:value="inputValue" @change="inputChange">
    <slot />
    <template #suffix>
      <slot v-if="slots['suffix']" name="suffix" />
      <div v-else-if="showCount" class="flex items-center text-gray-darkmin">
        <span class="text-gray-500">{{ currentFontNumber }}</span>
        <span class="text-gray-500">/{{ maxLength }}</span>
      </div>
    </template>
  </a-input>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalInput' })
</script>
<script lang="ts" setup>
  import { Input as AInput } from 'ant-design-vue'
  import { defineProps, ref, useSlots, watch } from 'vue'
  import { useVModel } from '@vueuse/core'
  import { useTheme } from '../../../utils/theme'
  const slots = useSlots()
  const emit = defineEmits([])
  const props = defineProps({
    modelValue: [String, Number],
    showCount: Boolean,
    maxLength: Number,
    placeholder: String
  })
  const inputValue = useVModel(props, 'modelValue', emit)
  // 储存当前字数
  const currentFontNumber = ref(0)
  // 监听字数
  const inputChange = ({ target: { value } }: any) => {
    currentFontNumber.value = value?.length || 0
  }
  // 计算当前字数
  watch(
    () => props.modelValue,
    (value: any) => {
      currentFontNumber.value = value?.length || 0
    },
    { immediate: true }
  )
  useTheme('Input')
</script>
<style lang="scss">
  .cal-input {
    &.ant-input,
    &.ant-input-affix-wrapper,
    &.ant-input-affix-wrapper-focused {
      background: none !important;
      border-top: none !important;
      border-left: none !important;
      border-right: none !important;
      border-color: #8c8c8c !important;
      @apply rounded-none;
      color: #001426;
      &::-webkit-input-placeholder {
        @apply text-gray-500;
      }
      &:focus,
      &:hover {
        border-color: var(--input-hover-color) !important;
      }
      &:focus {
        box-shadow: 0 2px 0 0 var(--input-focus-color) !important;
      }
    }
    .ant-input {
      background-color: transparent;
      border: 1px solid #8c8c8c !important;
    }
    &.ant-input-affix-wrapper-focused {
      border-color: var(--input-hover-color) !important;
      box-shadow: 0 2px 0 0 var(--input-focus-color) !important;
    }
    &.ant-input-affix-wrapper > input.ant-input {
      border: none !important;
    }
  }
  input {
    &::placeholder {
      color: #8c8c8c !important;
    }
  }
</style>
