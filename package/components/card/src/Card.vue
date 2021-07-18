<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-07-12 17:02:15
 * @LastEditTime: 2021-07-18 10:19:43
 * @Description: 
 * @LastEditors: Mr.wang
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
  import { analyUnit } from '@tuimao/utils'
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
  }

  .card-style-none {
    border: none;
    :deep(.ant-card-body) {
      padding: 0;
    }
  }
</style>
