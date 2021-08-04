<!--
 * @Author: Mr.wang
 * @Date: 2021-06-11 09:37:33
 * @LastEditTime: 2021-06-11 09:37:42
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="inline-flex flex-col items-center justify-center cursor-pointer"
    :style="{ width: analyUnit(size) }"
  >
    <div
      class="theme-item rounded-2xl box-border inline-block"
      :class="{ 'theme-item-hover': hover }"
    >
      <div
        class="rounded-2xl"
        :style="{ background, width: analyUnit(size), height: analyUnit(size) }"
      />
    </div>
    <div class="text-xs mt-4" :style="{ color: textColor }" v-if="text">{{ text }}</div>
  </div>
</template>
<script lang="ts" setup>
  import { analyUnit, blendColor } from '@/utils'
  import { computed, defineProps } from 'vue'
  const props = defineProps({
    hover: {
      type: Boolean,
      default: true
    },
    text: String,
    textColor: String,
    color: String,
    linearGradient: {
      type: Boolean,
      default: true
    },
    size: {
      type: [Number, String],
      default: 64
    }
  })
  const background = computed(() => {
    const lightColor = blendColor(props.color || '', '#ffffff', 0.7)
    const darkColor = blendColor(props.color || '', '#000000', 0.7)
    const linearGradientColor = `repeating-linear-gradient(
              180deg,
              ${darkColor} 0,
              ${darkColor} 25%,
              ${props.color} 25%,
              ${props.color} 50%,
              ${lightColor} 50%,
              ${lightColor} 75%,
              #E3E7EB 75%,
              #E3E7EB 100%
            )`
    return props.linearGradient ? linearGradientColor : props.color
  })
</script>
<style lang="scss" scoped>
  .theme-item {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: -4px;
      bottom: -4px;
      left: -4px;
      right: -4px;
      border: solid 1px transparent;
      @apply rounded-2xl;
      transition: 0.2s;
    }
  }
  .theme-item-hover {
    &:hover::after {
      border: 2px solid var(--color-primary);
      box-sizing: border-box;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05), 0px 0px 20px rgba(0, 0, 0, 0.02);
      border-radius: 20px;
    }
  }
</style>
