<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-22 14:18:13
 * @LastEditTime: 2021-07-20 10:21:09
 * @Description: 按钮
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-button class="cal-btn" v-bind="props" :size='props.antdSize'>
    <slot></slot>
  </a-button>
</template>
<script lang="ts">
  import { computed, defineComponent, useCssVars } from 'vue'
  export default defineComponent({ name: 'CalButton' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { Button as AButton } from 'ant-design-vue'
  import { useTheme } from '../../../utils/theme'
  import { analySize } from '@tuimao/utils'
  import type { AnalySizeOption } from '@tuimao/utils'

  const props = defineProps({
    ...AButton.props,
    /** 子元素大小 */
    size: {
      type: Object as () => AnalySizeOption,
      default: '100%'
    },
    shape: {
      type: String,
      default: 'round'
    }, 
    antdSize: {
     type: String as () => 'large' | 'middle' | 'small' ,
     default:'middle'
    }
  })

  // 宽高
  const wh = computed(() => analySize(props.size))

  useCssVars(()=>wh.value)
  useTheme('Common')
</script>
<style lang="scss" scoped>
  .cal-btn {
    width: var(--width);
    height:var(--height);
    &.ant-btn-sm {
      font-size: 12px !important;
    }
    color: var(--common-primary-color);
    border-color: var(--common-primary-color-light-2);
    &:hover,
    &:focus {
      color: var(--common-primary-color);
      background-color: #fff;
      border-color: var(--common-primary-color);
    }
    &.ant-btn-primary {
      color: #ffffff;
      background-color: var(--common-primary-color);
      border-color: var(--common-primary-color);
      &:hover,
      &:focus {
        color: #ffffff;
        background-color: var(--common-primary-color-light-2);
        border-color: var(--common-primary-color-light-2);
      }
    }
    &.ant-btn-danger {
      color: var(--color-solid);
      border-color: #ff7875;
      color: var(--color-solid);
      &:hover,
      &:focus {
        background-color: #ffa39e;
        border-color: #ffa39e;
      }
    }
    &.ant-btn-link {
      background-color: transparent;
      border-color: transparent;
      &:hover,
      &:focus {
        color: var(--common-primary-color);
        background-color: transparent;
        border-color: transparent;
      }
    }
    :deep(.anticon-loading) {
      transform: translateY(-3px);
    }
  }
</style>
