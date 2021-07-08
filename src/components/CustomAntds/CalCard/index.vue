<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-22 16:01:45
 * @LastEditTime: 2021-06-24 15:36:21
 * @Description: 卡片
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-card
    class="bg-background rounded-3xl"
    :class="[isHidden ? 'cal-card ' : 'card-style-none']"
    v-bind="props"
    :style="{ minHeight: analyUnit(minHeight || '') }"
  >
    <slot></slot>
  </a-card>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import { analyUnit } from '@/utils'
  import { Card as ACard } from 'ant-design-vue'
  const props = defineProps({
    minHeight: [Number, String],
    isHidden: {
      type: Boolean,
      default: true
    }
  })
</script>
<style lang="scss" scoped>
  .cal-card {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05), 0px 0px 20px rgba(0, 0, 0, 0.02);
    :deep(.ant-card-body) {
      height: 100%;
      width: 100%;
    }
  }

  .card-style-none {
    border: none;
    :deep(.ant-card-body) {
      padding: 0;
    }
  }
</style>
