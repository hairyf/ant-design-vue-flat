<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 14:41:34
 * @LastEditTime: 2021-07-12 15:55:09
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-input-number
    :class="{ 'cal-input-number-off-handel': !showHandel }"
    class="cal-input-number"
    v-bind="props"
    v-model:value="inputValue"
    :precision="precision"
    @change="onChange"
  >
    <slot />
    <template #suffix>
      <slot v-if="slots['suffix']" name="suffix" />
      <div v-else-if="showCount" class="flex items-center text-gray-darkmin">
        <span>{{ currentFontNumber }}</span>
        <span v-if="maxLength">/{{ maxLength }}</span>
      </div>
    </template>
  </a-input-number>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalInputNumber' })
</script>
<script lang="ts" setup>
  import { InputNumber as AInputNumber } from 'ant-design-vue'
  import { defineEmits, defineProps, ref, useSlots } from 'vue'
  import { useModelRef } from '@/hooks/use-modelRef'
  import { useTheme } from '../../../utils/theme'
  const emit = defineEmits(['change'])
  const slots = useSlots()
  const props = defineProps({
    modelValue: [String, Number],
    showCount: Boolean,
    maxLength: Number,
    placeholder: String,
    showHandel: Boolean,
    /* 数字精度 */
    precision: {
      type: Number,
      default: 0
    }
  })
  const inputValue = useModelRef(props, 'modelValue')
  // 储存当前字数
  const currentFontNumber = ref(0)
  // 记录当前字数
  const onChange = (value: any) => {
    const { target } = value
    currentFontNumber.value = target?.value?.length || 0
    emit('change', value)
  }
  useTheme('Input')
</script>
<style lang="scss">
  .cal-input-number {
    &.ant-input-number,
    &.ant-input-number-focused {
      background: none;
      border-top: none;
      border-left: none;
      border-right: none;
      @apply rounded-none;
      @apply text-gray-500;
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
    &.ant-input-number-focused {
      border-color: var(--input-hover-color) !important;
      box-shadow: 0 2px 0 0 var(--input-focus-color) !important;
    }
    .ant-input {
      background-color: transparent;
    }
    &.ant-input-affix-wrapper-focused {
      box-shadow: 0 2px 0 0 var(--input-focus-color) !important;
    }
  }
  .cal-input-number-off-handel {
    .ant-input-number-handler-wrap {
      display: none;
    }
  }
</style>
