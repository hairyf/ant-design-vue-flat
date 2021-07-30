<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-07-12 17:02:15
 * @LastEditTime: 2021-07-30 16:52:59
 * @Description: 
 * @LastEditors: Mr.Mao
-->
<template>
  <a-card
    class="bg-card-bg-color"
    :class="[isHidden ? 'cal-card ' : 'card-style-none', leftBorder ? 'card-side-strip' : '']"
    v-bind="props"
  >
    <template v-for="(_, key) in $slots" :key="key" #[key]>
      <slot :name="key" />
    </template>
  </a-card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalCard' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { useTheme } from '../../../utils/theme'
  import ACard from 'ant-design-vue/es/card'
  const props = defineProps({
    isHidden: {
      type: Boolean,
      default: true
    },
    leftBorder: Boolean
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
    &.ant-card-bordered {
      border: none;
    }
  }
  .card-style-none {
    border: none;
    :deep(.ant-card-body) {
      padding: 0;
    }
  }
  .card-side-strip {
    position: relative;
    &::before {
      border-radius: 10000px;
      position: absolute;
      content: '';
      left: 0;
      top: 24px;
      bottom: 24px;
      width: 4px;
      background: var(--common-primary-color);
    }
  }
</style>
