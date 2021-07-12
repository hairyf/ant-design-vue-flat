<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-07-12 17:02:15
 * @LastEditTime: 2021-07-12 17:12:45
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
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
  <script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({ name: 'CalCard' })
  </script>
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