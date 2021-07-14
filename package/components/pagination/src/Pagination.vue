<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 18:30:28
 * @LastEditTime: 2021-07-13 18:32:53
 * @Description: 分页选择
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-pagination class="cal-pagination" v-bind="props" v-model:current="modelValue" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalPagination' })
</script>
<script lang="ts" setup>
  import { useTheme } from '../../../utils/theme'
  import { useVModel } from '@vueuse/core'
  import { Pagination as APagination } from 'ant-design-vue'
  import { defineProps } from 'vue'
  const props = defineProps({
    modelValue: Number
  })
  const modelValue = useVModel(props, 'modelValue')
  useTheme('Common')
</script>
<style lang="scss">
  .cal-pagination {
    .ant-pagination-prev .ant-pagination-item-link,
    .ant-pagination-next .ant-pagination-item-link,
    .ant-pagination-item {
      border-radius: 50%;
      border: none;
      background: none;
    }
    .ant-pagination-item:focus a,
    .ant-pagination-item:hover a,
    .ant-pagination-prev:focus .ant-pagination-item-link,
    .ant-pagination-next:focus .ant-pagination-item-link,
    .ant-pagination-prev:hover .ant-pagination-item-link,
    .ant-pagination-next:hover .ant-pagination-item-link,
    .ant-pagination-item-active a {
      color: var(--common-primary-color);
      background: var(--common-primary-color-light-8);
      border-radius: 50%;
    }
    .ant-pagination-disabled.ant-pagination-prev:focus .ant-pagination-item-link,
    .ant-pagination-disabled.ant-pagination-next:focus .ant-pagination-item-link,
    .ant-pagination-disabled.ant-pagination-prev:hover .ant-pagination-item-link,
    .ant-pagination-disabled.ant-pagination-next:hover .ant-pagination-item-link {
      color: #d9d9d9;
      background: transparent;
    }
    .anticon,
    .anticon-right {
      transform: translateY(-2px);
    }
  }
</style>
