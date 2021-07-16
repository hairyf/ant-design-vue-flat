<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 19:34:01
 * @LastEditTime: 2021-07-16 17:29:58
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-steps class="cal-steps" v-bind="props">
    <slot></slot>
  </a-steps>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalSteps' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  const props = defineProps({})
  import { useTheme } from '../../../utils/theme'
  import { Steps as ASteps } from 'ant-design-vue'
  useTheme('Common')
</script>
<style lang="scss" scoped>
  .cal-steps {
    .circular {
      border: 2px solid var(--common-primary-color-light-8);
      border-radius: 50%;
    }
    :deep(.ant-steps-item-wait) {
      &.ant-steps-item-wait:first-child {
        color: #001426;
        .ant-steps-item-title {
          color: #001426 !important;
          font-weight: 600;
          font-size: 16px;
          line-height: 12px;
        }
      }
    }
    :deep(.ant-steps-item-process) {
      &.ant-steps-item-process + .ant-steps-item-wait {
        .ant-steps-item-title {
          color: #001426 !important;
        }
      }
    }
    :deep(.ant-steps-item-tail) {
      padding: 3.5px 28px;
    }
    :deep(.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after) {
      height: 4px;
      border-radius: 8px;
      background-color: var(--common-primary-color-light-8);
    }

    :deep(.ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-tail::after),
    :deep(.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-tail::after) {
      width: 100%;
      height: 2px;
      background-color: transparent;
      background-image: linear-gradient(
        to right,
        var(--common-primary-color-light-4) 0%,
        var(--common-primary-color-light-4) 50%,
        transparent 50%
      );
      background-size: 35px 5px;
      background-repeat: repeat-x;
    }
    :deep(.ant-steps-item-title) {
      color: #001426;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
    }
    :deep(.ant-steps-item-wait
        > .ant-steps-item-container
        > .ant-steps-item-content
        > .ant-steps-item-title) {
      color: var(--common-primary-color-light-8);
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
    }
    :deep(.ant-steps-item-description) {
      color: #8c8c8c;
      font-size: 13px;
      margin-top: 2px;
      white-space: nowrap;
    }
    :deep(.ant-steps-item-content) {
      width: 126px;
    }
  }
</style>
