<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 09:09:40
 * @LastEditTime: 2021-07-15 10:35:07
 * @Description: 分栏组
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-tabs class="cal-tabs" v-bind="props" :animated="false">
    <slot></slot>
  </a-tabs>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalTabs' })
</script>
<script lang="ts" setup>
  import { useTheme } from '../../../utils/theme'
  import { defineProps } from 'vue'
  import { Tabs as ATabs } from 'ant-design-vue'
  const props = defineProps()
  useTheme('Common')
  useTheme('Tabs')
</script>
<style lang="scss">
  .cal-tabs {
    .ant-tabs-bar {
      margin-bottom: 0;
      border-bottom: none;
    }
    .ant-tabs-nav-wrap {
      margin-bottom: -5px;
    }
    .ant-tabs-nav .ant-tabs-tab {
      border-radius: 20px 20px 0px 0px;
      font-weight: normal;
      overflow: hidden;
      min-width: 124px;
      padding: 10px 30px !important;
      text-align: center;
      height: 44px !important;
      text-align: center;
      transition: 0.5s;
      color: var(--tabs-hollow-color, var(--common-primary-color));
      background: var(--common-primary-color-light-8);
      &.ant-tabs-tab-active {
        font-weight: 600;
        background: var(--tabs-background-color);
        color: var(--tabs-hollow-color, var(--common-primary-color));
      }
      &:hover {
        color: var(--tabs-hollow-color, var(--common-primary-color));
      }
      &:active {
        color: var(--tabs-hollow-color, var(--common-primary-color));
      }
    }
    .ant-tabs-ink-bar {
      display: none !important;
    }
  }
</style>
