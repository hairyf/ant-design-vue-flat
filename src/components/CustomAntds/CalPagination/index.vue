<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-25 15:25:24
 * @LastEditTime: 2021-06-07 16:22:23
 * @Description: 分页选择
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-pagination class="cal-pagination" v-bind="props" v-model:current="modelValue" />
</template>
<script lang="ts" setup>
  import { useModelRef } from '@/hooks/use-modelRef'
  import { Pagination as APagination } from 'ant-design-vue'
  import { defineProps } from 'vue-demi'
  const props = defineProps({
    modelValue: Number
  })
  const modelValue = useModelRef(props, 'modelValue')
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
      color: var(--color-primary);
      background: var(--color-primary-light-opacity-8);
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
