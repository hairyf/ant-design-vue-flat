<template>
  <el-time-picker
    class="cal-time-picker"
    is-range
    v-bind="props"
    popper-class="cal-time-range-picke"
  >
  </el-time-picker>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalInputTimePicker' })
</script>
<script setup lang="ts">
  import { ElTimePicker } from 'element-plus'
  import 'element-plus/lib/theme-chalk/el-icon.css'
  import 'element-plus/lib/theme-chalk/el-time-picker.css'
  import { useTheme } from '../../../utils/theme'
  import { defineProps } from 'vue'
  const props = defineProps()
  useTheme('Input')
  useTheme('Common')
</script>

<style lang="scss">
  .cal-time-range-picke {
    .el-time-panel__footer {
      border: none !important;
      text-align: center;
      padding: 0 10px;
      height: 50px;
      .el-time-panel__btn {
        width: 100px;
        border-radius: 50px;
        color: var(--common-primary-color);
        border: 1px solid var(--input-hover-color);
      }
      .cancel {
        color: var(--common-primary-color);
      }
      .confirm {
        background-color: var(--input-hover-color);
        color: #fff;
      }
    }
  }
  .cal-time-picker {
    &.el-input__inner {
      background: none !important;
      border-top: none !important;
      border-left: none !important;
      border-right: none !important;
      border-color: #8c8c8c !important;
      border-radius: 0;
      &:focus,
      &:hover {
        border-color: var(--input-hover-color) !important;
      }
      &:focus {
        box-shadow: 0 2px 0 0 var(--input-focus-color) !important;
      }
    }
    .el-range-separator {
      display: none !important;
    }
    .el-range-input {
      width: 50%;
      background: none !important;
    }
    .el-icon-time {
      display: none !important;
    }
    .el-range__close-icon {
      color: #8c8c8c;
    }
  }
</style>
