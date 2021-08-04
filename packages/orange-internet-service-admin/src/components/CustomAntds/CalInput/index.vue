<!--
 * @Author: Zhilong
 * @Date: 2021-05-22 15:53:16
 * @LastEditTime: 2021-06-23 14:54:24
 * @Description: 志龙写的 ! 2021年5月22日 15:53:28
 * @LastEditors: Zhilong
 * @autograph: ?
-->
<template>
  <a-input class="cal-input" v-bind="props" v-model:value="inputValue" @change="inputChange">
    <slot />
    <template #suffix>
      <slot v-if="slots['suffix']" name="suffix" />
      <div v-else-if="showCount" class="flex items-center text-gray-darkmin">
        <span>{{ currentFontNumber }}</span>
        <span v-if="maxLength">/{{ maxLength }}</span>
      </div>
    </template>
  </a-input>
</template>
<script lang="ts" setup>
  import { Input as AInput } from 'ant-design-vue'
  import { defineProps, ref, useContext, watch } from 'vue-demi'
  import { useModelRef } from '@/hooks/use-modelRef'
  const { slots } = useContext()
  const props = defineProps({
    modelValue: [String, Number],
    showCount: Boolean,
    maxLength: Number,
    placeholder: String
  })
  const inputValue = useModelRef(props, 'modelValue')
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
</script>
<style lang="scss">
  .cal-input {
    &.ant-input,
    &.ant-input-affix-wrapper,
    &.ant-input-affix-wrapper-focused {
      background: none;
      border-top: none;
      border-left: none;
      border-right: none;
      @apply rounded-none;
      @apply border-gray-darkmin;
      &::-webkit-input-placeholder {
        @apply text-gray-darkmin;
      }
      &:focus,
      &:hover {
        border-color: var(--color-primary) !important;
      }
      &:focus {
        box-shadow: 0 2px 0 0 var(--color-primary-light-opacity-8) !important;
      }
    }
    .ant-input {
      background-color: transparent;
    }
    &.ant-input-affix-wrapper-focused {
      border-color: var(--color-primary) !important;
      box-shadow: 0 2px 0 0 var(--color-primary-light-opacity-8) !important;
    }
  }
</style>
