<!--
 * @Author: Zhilong
 * @Date: 2021-05-22 15:53:16
 * @LastEditTime: 2021-07-07 17:46:16
 * @Description: 志龙写的 ! 2021年5月22日 15:53:28
 * @LastEditors: Pan.Yu.Lin
 * @autograph: ?
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
<script lang="ts" setup>
  import { InputNumber as AInputNumber } from 'ant-design-vue'
  import { defineEmit, defineProps, ref, useContext } from 'vue-demi'
  import { useModelRef } from '@/hooks/use-modelRef'
  const emit = defineEmit()
  const { slots } = useContext()
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
    &.ant-input-number-focused {
      border-color: var(--color-primary) !important;
      box-shadow: 0 2px 0 0 var(--color-primary-light-opacity-8) !important;
    }
    .ant-input {
      background-color: transparent;
    }
    &.ant-input-affix-wrapper-focused {
      box-shadow: 0 2px 0 0 var(--color-primary-light-opacity-8) !important;
    }
  }
  .cal-input-number-off-handel {
    .ant-input-number-handler-wrap {
      display: none;
    }
  }
</style>
