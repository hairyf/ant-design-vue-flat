<!--
 * @Author: Mr.wang
 * @Date: 2021-07-09 15:44:51
 * @LastEditTime: 2021-07-13 17:13:47
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-tree v-bind="props"> </a-tree>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  const props = defineProps()
</script>

<style lang="scss">
  .ant-tree-checkbox-wrapper:hover .ant-tree-checkbox-inner,
  .ant-tree-checkbox:hover .ant-tree-checkbox-inner,
  .ant-tree-checkbox-input:focus + .ant-tree-checkbox-inner {
    border-color: var(--color-primary);
  }
  .ant-tree-checkbox-checked .ant-tree-checkbox-inner {
    background-color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }
  .ant-tree-checkbox-checked::after {
    border: 1px solid var(--color-primary);
  }
  .ant-tree li span.ant-tree-switcher,
  .ant-tree li span.ant-tree-iconEle {
    line-height: 19px;
  }
  .ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner::after {
    background-color: var(--color-primary);
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
