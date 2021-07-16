<!--
 * @Author: Mr.wang
 * @Date: 2021-07-14 09:29:24
 * @LastEditTime: 2021-07-16 17:24:11
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <input-search v-bind="props" class="cal-input-search" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalInputSearch' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { useTheme } from '../../../utils/theme'
  import { InputSearch } from 'ant-design-vue'
  const props = defineProps()
  useTheme('Input')
</script>
<style lang="scss">
  .cal-input-search {
    &.ant-input-search {
      border-radius: 20px !important;
    }
    &.ant-input-affix-wrapper > input.ant-input {
      border: none !important;
    }
    &.ant-input-affix-wrapper:hover {
      border-color: var(--input-hover-color) !important;
    }
    &.ant-input-affix-wrapper:focus {
      border-color: var(--input-hover-color);
      box-shadow: 0 2px 0 0 var(--input-focus-color) !important;
    }
    &.ant-input-affix-wrapper-focused {
      border-color: var(--input-hover-color) !important;
      box-shadow: 0 2px 0 0 var(--input-focus-color) !important;
    }
    &.ant-input-search-icon {
      font-size: 15px;
      color: #8c8c8c;
    }
    input {
      &::placeholder {
        color: #8c8c8c !important;
      }
    }
  }
</style>
