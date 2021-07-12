<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-07-12 18:35:38
 * @LastEditTime: 2021-07-12 19:21:42
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <el-cascader-panel v-bind="props" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalCasCaderPanel' })
</script>
<script setup lang="ts">
  import { defineProps } from 'vue-demi'
  import { ElCascaderPanel, ElForm, ElFormItem } from 'element-plus'
  import 'element-plus/lib/theme-chalk/el-cascader-panel.css'
  import 'element-plus/lib/theme-chalk/el-form.css'
  import 'element-plus/lib/theme-chalk/el-form-item.css'
  import 'element-plus/lib/theme-chalk/el-icon.css'
  import { useTheme } from '../../../utils/theme'
  const props = defineProps()
  useTheme('Common')
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
    color: var(--common-primary-color) !important;
  }
  :deep(.el-cascader-node.in-active-path) {
    color: var(--common-primary-color) !important;
  }
  :deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner) {
    border-color: var(--common-primary-color) !important;
    background-color: var(--common-primary-color) !important;
  }
  :deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner::before) {
    background-color: #fff !important;
  }
  :deep(.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate
      .el-checkbox__inner) {
    background-color: var(--common-primary-color) !important;
    border-color: var(--common-primary-color) !important;
  }
  :deep(.el-checkbox__inner:hover) {
    border-color: var(--common-primary-color) !important;
  }
  :deep(.el-cascader-menu) {
    border: none;
  }
</style>
