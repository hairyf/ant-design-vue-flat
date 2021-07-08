<!--
 * @Author: Mr.wang
 * @Date: 2021-06-01 16:18:53
 * @LastEditTime: 2021-06-23 11:46:09
 * @Description: 权限组件
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-cascader-panel v-bind="props" />
</template>
<script setup lang="ts">
  import { defineProps } from 'vue-demi'
  import { ElCascaderPanel, ElForm, ElFormItem } from 'element-plus'
  import 'element-plus/lib/theme-chalk/el-cascader-panel.css'
  import 'element-plus/lib/theme-chalk/el-form.css'
  import 'element-plus/lib/theme-chalk/el-form-item.css'
  import 'element-plus/lib/theme-chalk/el-icon.css'
  const props = defineProps()
</script>
<style lang="scss" scoped>
  .el-cascader-panel {
    border-radius: 0;
    border: 1px dashed #c5c5c5 !important;
  }
  :deep(.el-cascader-menu__wrap) {
    height: 150px;
  }
  :deep(.el-cascader-menu) {
    min-width: 160px;
  }
  :deep(.el-cascader-node.is-active) {
    color: var(--color-primary) !important;
  }
  :deep(.el-cascader-node.in-active-path) {
    color: var(--color-primary) !important;
  }
  :deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner) {
    border-color: var(--color-primary) !important;
    background-color: var(--color-primary) !important;
  }
  :deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner::before) {
    background-color: #fff !important;
  }
  :deep(.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate
      .el-checkbox__inner) {
    background-color: var(--color-primary) !important;
    border-color: var(--color-primary) !important;
  }
  :deep(.el-checkbox__inner:hover) {
    border-color: var(--color-primary) !important;
  }
  :deep(.el-cascader-menu) {
    border: none;
  }
</style>
