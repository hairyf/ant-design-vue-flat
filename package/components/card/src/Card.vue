<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-07-12 17:02:15
 * @LastEditTime: 2021-07-24 16:33:25
 * @Description: 
 * @LastEditors: Mr.Mao
-->
<template>
  <a-card
    class="bg-card-bg-color"
    :class="[isHidden ? 'cal-card ' : 'card-style-none']"
    v-bind="props"
  >
    <slot></slot>
  </a-card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalCard' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { useTheme } from '../../../utils/theme'
  import { Card as ACard } from 'ant-design-vue'
  const props = defineProps({
    isHidden: {
      type: Boolean,
      default: true
    }
  })
  useTheme('Card')
</script>
<style lang="scss" scoped>
  .cal-card {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05), 0px 0px 20px rgba(0, 0, 0, 0.02);
    border-radius: 20px;
    :deep(.ant-card-body) {
      height: 100%;
      width: 100%;
    }
    :deep(.ant-card-head) {
      border-bottom: none;
      min-height: auto;
      .ant-card-head-title {
        padding-bottom: 0;
      }
    }
  }
  .card-style-none {
    border: none;
    :deep(.ant-card-body) {
      padding: 0;
    }
  }
</style>
