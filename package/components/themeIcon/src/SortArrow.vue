<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 10:49:36
 * @LastEditTime: 2021-07-13 11:18:09
 * @Description: 排序箭头
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <span class="relative cursor-pointer" @click="onClick">
    <slot />
    <i
      class="nr-Shape ml-4"
      :class="[status === 1 && 'text-common-primary-color']"
      :style="{
        fontSize: `${size}px`,
        letterSpacing: `${(size / 3) * -1}px`,
        marginBottom: '0.5px'
      }"
    />
    <i
      class="nr-Shape transform rotate-180 absolute"
      :class="[status === 2 && 'text-common-primary-color']"
      :style="{ fontSize: `${size}px`, marginTop: '0.5px' }"
    />
  </span>
</template>

<script lang="ts" setup>
  import { useModelRef } from '@/hooks/use-modelRef'
  import { defineProps, ref } from 'vue'
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
