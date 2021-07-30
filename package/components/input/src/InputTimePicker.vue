<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-22 15:33:02
 * @LastEditTime: 2021-07-30 10:16:31
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <!-- <el-config-provider :locale="locale"> -->
  <el-time-picker
    class="cal-time-picker"
    is-range
    v-bind="props"
    popper-class="cal-time-range-picke"
  >
  </el-time-picker>
  <!-- </el-config-provider> -->
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalInputTimePicker' })
</script>
<script setup lang="ts">
  import ElTimePicker from 'element-plus/es/el-time-picker'
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
    .el-picker-panel {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05), 0px 0px 20px rgba(0, 0, 0, 0.02);
      border-radius: 4px;
    }

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
      button:focus {
        outline: none !important;
      }
    }
    .el-time-range-picker__body {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05), 0px 0px 20px rgba(0, 0, 0, 0.02);
      border-radius: 4px;
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
