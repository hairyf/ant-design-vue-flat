<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-10 10:39:56
 * @LastEditTime: 2021-07-09 19:38:51
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-card
    class=""
    style="height: 491px; width: 292px"
    :style="{ backgroundImage: toLinearGradient(option.content.color) }"
  >
    <div class="flex items-center mb-20 mt-4">
      <theme-item
        :color="option.content.linearGradientColor || option.content.color"
        :linear-gradient="!option.content.linearGradientColor"
        :hover="false"
      />
      <span class="ml-14 font-semibold text-base">{{ option.name }}</span>
    </div>
    <div
      class="rounded-2xl overflow-hidden mb-28"
      style="width: 244px; height: 138px"
      :style="{ border: `2px solid ${blendColor(option.content.color, '#ffffff', 0.5)}` }"
    >
      <cal-image :src="option.logo" />
    </div>
    <div class="flex mb-14 text-sm">
      <div class="w-56 mr-14">售卖价格</div>
      <span class="text-red">{{ option?.sale_spec?.price || option.price || '暂无' }}</span>
    </div>
    <div class="flex mb-14 text-sm" v-if="option?.sale_spec?.time">
      <div class="w-56 mr-14">使用时限</div>
      <span>{{ option?.sale_spec?.time || '暂无' }}</span>
    </div>
    <div class="flex mt-24 text-sm">
      <div class="w-56 mr-14 flex-shrink-0">主题简介</div>
      <span>{{ option.remark }}</span>
    </div>
    <div class="absolute bottom-24 left-24 right-24">
      <slot name="footer" />
    </div>
  </cal-card>
</template>
<script lang="ts" setup>
  import { blendColor } from '@/utils'
  import { computed, defineProps } from 'vue-demi'
  import ThemeItem from '@/layout/components/ThemeItem.vue'
  import type { ThemeItemType } from '@/api/theme'
  const props = defineProps({
    option: {
      type: Object,
      required: true
    }
  })
  const option = computed((): ThemeItemType => props.option as any)
  // 获取背景渐变色
  const toLinearGradient = (color: string) => {
    return `linear-gradient(\
      180deg,\
      var(--background) 0%,\
      ${blendColor(color, '#ffffff', 0.95)} 45.83%,\
      var(--background) 100%\
    )`
  }
</script>
<style lang="scss"></style>
