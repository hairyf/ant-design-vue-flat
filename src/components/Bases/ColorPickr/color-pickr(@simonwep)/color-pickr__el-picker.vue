<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-26 11:17:43
 * @LastEditTime: 2021-05-23 15:53:25
 * @Description: 颜色选择器
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-color-picker
    class="color-puckr-container"
    :style="{ width, height }"
    v-model="color"
    :showAlpha="showAlpha"
  />
</template>
<script lang="ts" setup>
  import { computed, defineEmit, defineProps } from '@vue/runtime-core'
  const props = defineProps({
    width: {
      type: String,
      default: '50px'
    },
    height: {
      type: String,
      default: '50px'
    },
    modelValue: String,
    // 是否动态更改值
    dynamic: {
      type: Boolean,
      default: false
    },
    // 是否允许透明色
    showAlpha: Boolean
  })
  const emit = defineEmit()
  const color = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })
</script>
<style lang="scss">
  .color-puckr-container {
    .el-color-picker__icon.el-icon-arrow-down {
      display: none;
    }
    .el-color-picker__trigger {
      width: 100%;
      height: 100%;
    }
  }
</style>
