<!--
 * @Author: Mr.wang
 * @Date: 2021-07-13 10:23:56
 * @LastEditTime: 2021-07-13 17:14:16
 * @Description: 树状图
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-tree v-bind="props"> </a-tree>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalTree' })
</script>
<script lang="ts" setup>
  import { useTheme } from '../../../utils/theme'
  import { defineProps } from 'vue'
  const props = defineProps()
  useTheme('Common')
</script>

<style lang="scss">
  .ant-tree-checkbox-wrapper:hover .ant-tree-checkbox-inner,
  .ant-tree-checkbox:hover .ant-tree-checkbox-inner,
  .ant-tree-checkbox-input:focus + .ant-tree-checkbox-inner {
    border-color: var(--common-primary-color) !important;
  }
  .ant-tree-checkbox-checked .ant-tree-checkbox-inner {
    background-color: var(--common-primary-color) !important;
    border-color: var(--common-primary-color) !important;
  }
  .ant-tree-checkbox-checked::after {
    border: 1px solid var(--common-primary-color) !important;
  }
  .ant-tree li span.ant-tree-switcher,
  .ant-tree li span.ant-tree-iconEle {
    line-height: 18px !important;
  }
  .ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner::after {
    background-color: var(--common-primary-color) !important;
  }
  .ant-tree-treenode-checkbox-checked {
    .ant-tree-checkbox-disabled {
      .ant-tree-checkbox-inner {
        border: 1px solid #d9d9d9;
        background-color: #d9d9d9;
      }
      .ant-tree-checkbox-inner::after {
        border-color: #fff;
      }
    }
  }
</style>
