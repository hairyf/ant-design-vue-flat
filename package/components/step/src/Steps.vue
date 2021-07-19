<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 19:34:01
 * @LastEditTime: 2021-07-19 19:46:49
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <steps class="cal-steps" v-bind="props">
    <slot></slot>
  </steps>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalSteps' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  const props = defineProps()
  import { useTheme } from '../../../utils/theme'
  import { Steps } from 'ant-design-vue'
  useTheme('Common')
</script>
<style lang="scss">
  .cal-steps {
    .circular {
      border: 2px solid var(--common-primary-color-light-8);
      border-radius: 50%;
    }
    .ant-steps-item-wait {
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
    .ant-steps-item-process {
      &.ant-steps-item-process + .ant-steps-item-wait {
        .ant-steps-item-title {
          color: #001426 !important;
        }
      }
    }
    .ant-steps-item-tail {
      padding: 3.5px 28px;
    }
    .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
      height: 4px;
      border-radius: 8px;
      background-color: var(--common-primary-color-light-2);
    }

    .ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-tail::after,
    .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-tail::after {
      width: 100%;
      height: 2px;
      background-color: transparent;
      background-image: linear-gradient(
        to right,
        var(--common-primary-color-light-4) 0%,
        var(--common-primary-color-light-4) 50%,
        transparent 50%
      ) !important;
      background-size: 35px 5px;
      background-repeat: repeat-x;
    }
    .ant-steps-item-title {
      color: #001426;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
    }
    .ant-steps-item-wait .ant-steps-item-container .ant-steps-item-content > .ant-steps-item-title {
      color: var(--common-primary-color-light-8);
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
    }
    .ant-steps-item-description {
      color: #8c8c8c;
      font-size: 13px;
      margin-top: 2px;
      white-space: nowrap;
    }
    .ant-steps-item-content {
      width: 126px;
    }
    .ant-steps-item-icon {
      margin-top: -4px;
      margin-left: 37px !important;
    }
  }
</style>
