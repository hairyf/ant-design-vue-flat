<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 09:09:40
 * @LastEditTime: 2021-07-20 21:49:50
 * @Description: 分栏项
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="cal-tab-pane bg-tabs-background-color p-24 flex flex-col"
    :style="{ minHeight: analyUnit(minHeight || '') }"
    v-if="alone"
  >
    <div class="cal-tab-pane__content flex-1">
      <slot></slot>
    </div>
    <div class="cal-tab-pane__sticky">
      <slot name="sticky" />
    </div>
  </div>
  <a-tab-pane
    class="cal-tab-pane bg-tabs-background-color p-24 flex flex-col"
    :style="{ minHeight: analyUnit(minHeight || '') }"
    v-bind="props"
    v-else-if="!isHide"
  >
    <template #tab>
      <slot name="tab" />
    </template>
    <div class="cal-tab-pane__content flex-1">
      <slot></slot>
    </div>
    <div class="cal-tab-pane__sticky">
      <slot name="sticky" />
    </div>
  </a-tab-pane>
</template>
<script lang="ts">
  import { computed, defineComponent, inject } from 'vue'
  export default defineComponent({ name: 'CalTabPane' })
</script>
<script lang="ts" setup>
  import { analyUnit } from '@tuimao/utils'
  import { defineProps } from 'vue'
  import { Tabs as ATabs } from 'ant-design-vue'
  const ATabPane = ATabs.TabPane
  const props = defineProps({
    /** 是否单独使用 */
    alone: Boolean,
    /** 是否隐藏内容 */
    hide: Boolean,
    /** 最低高度 */
    minHeight: [Number, String]
  })
  const isHide = computed(() => inject('hideTab') || props.hide)
</script>
<style lang="scss">
  .cal-tab-pane {
    border-radius: 0px 20px 20px 20px;
    &.ant-tabs-tabpane-inactive {
      display: none !important;
    }
  }
  .ant-tabs-nav .ant-tabs-tab {
    margin: 0 12px 0 0 !important;
  }
  .ant-tabs-tab {
    font-size: 16px;
  }
</style>
