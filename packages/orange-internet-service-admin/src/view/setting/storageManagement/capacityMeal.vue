<!--
 * @Author: Mr.wang
 * @Date: 2021-05-31 11:30:42
 * @LastEditTime: 2021-06-22 15:12:56
 * @Description: 容量套餐
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-form class="-ml-40 flex flex-wrap">
    <a-form-item>
      <cal-input placeholder="套餐名称" v-model="form.name" class="w-192 mx-40" />
    </a-form-item>
  </a-form>
  <div class="mb-28">
    <cal-button type="primary" class="w-112 mr-28" @click="onFilter">筛选</cal-button>
    <cal-button class="w-112" @click="resetFields">重置条件</cal-button>
  </div>
  <cal-card class="mt-24">
    <div class="flex flex-row-reverse">
      <cal-page-select />
    </div>
    <cal-sticky-layout>
      <cal-table class="mt-28" :list="list" sync-space>
        <cal-table-option title="套餐名称" min-width="280px" index="name"></cal-table-option>
        <cal-table-option title="存储方式" min-width="280px">七牛云</cal-table-option>
        <cal-table-option title="售价" min-width="280px">王小二</cal-table-option>
        <cal-table-option title="容量" min-width="280px"> 138-2365-6512 </cal-table-option>
        <cal-table-option title="出售次数" min-width="200px"> 2 </cal-table-option>
      </cal-table>
      <template #sticky>
        <div class="flex justify-center mt-20">
          <cal-pagination v-model:current="activeKey" :total="50"> </cal-pagination>
        </div>
      </template>
    </cal-sticky-layout>
  </cal-card>
</template>
<script setup lang="ts">
  import { ref } from 'vue-demi'
  const list = [{ name: 545 }, 0, 0, 0]
  const activeKey = ref(1)
  const form = ref({
    name: ''
  })
  const onFilter = () => {
    console.log(5463415253)
  }

  const resetFields = () => {
    console.log(4165130)
  }
</script>
<style lang="scss" scoped></style>
