<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-10 10:39:56
 * @LastEditTime: 2021-06-25 09:48:36
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-card
    class="h-400 rounded-2xl"
    :style="{ backgroundImage: toLinearGradient(option.content.color) }"
  >
    <div class="flex items-center mb-20 mt-4">
      <theme-item
        :color="option.content.linearGradientColor || option.content.color"
        :linear-gradient="!option.content.linearGradientColor"
        :hover="false"
      />
      <span class="ml-14 font-semibold">{{ option.content.text }}</span>
    </div>
    <div
      class="h-128 rounded-2xl overflow-hidden mb-28"
      :style="{ border: `2px solid ${blendColor(option.content.color, '#ffffff', 0.5)}` }"
    >
      <cal-image :src="option.logo" />
    </div>
    <div class="text-sm text-gray-500 brief-text">
      {{ option.remark }}
    </div>
    <div class="absolute bottom-24 left-24 right-24">
      <slot name="footer" />
    </div>
  </a-card>
</template>
<script lang="ts" setup>
  import { blendColor } from '@/utils'
  import { computed, defineProps } from 'vue'
  import ThemeItem from './ThemeItem.vue'
  // import type { ThemeItemType } from '@/api/theme'
  const props = defineProps({
    option: {
      type: Object,
      required: true
    }
  })
  const option = computed((): any => props.option as any)
  // 获取背景渐变色
  const toLinearGradient = (color: string) => {
    console.log(color)
    return `linear-gradient(\
      180deg,\
      #fff 0%,\
      ${blendColor(color, '#ffffff', 0.95)} 45.83%,\
      #fff 100%\
    )`
  }
</script>
<style lang="scss"></style>
