<!--
 * @Author: Zhilong
 * @Date: 2021-05-27 17:31:30
 * @LastEditTime: 2021-05-29 17:52:09
 * @Description: 排序箭头
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <span class="relative cursor-pointer" @click="onClick">
    <slot />
    <i
      class="nr-Shape ml-4"
      :class="[status === 1 && 'text-primary']"
      :style="{ fontSize: `${size}px`, letterSpacing: `${(size / 3) * -1}px` }"
    />
    <i
      class="nr-Shape transform rotate-180 absolute"
      :class="[status === 2 && 'text-primary']"
      :style="{ fontSize: `${size}px` }"
    />
  </span>
</template>
<script lang="ts" setup>
  import { useModelRef } from '@/hooks/use-modelRef'
  import { defineProps, ref } from 'vue-demi'
  const props = defineProps({
    modelValue: {
      type: Number as () => 0 | 1 | 2,
      default: 0
    },
    size: {
      type: Number,
      default: 12
    },
    text: String
  })
  const status = useModelRef(props, 'modelValue')
  const onClick = () => {
    let index = status.value
    ++index > 2 ? (status.value = 0) : ++status.value
  }
</script>
