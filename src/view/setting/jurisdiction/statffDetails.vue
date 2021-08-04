<!--
 * @Author: Mr.wang
 * @Date: 2021-06-01 19:43:31
 * @LastEditTime: 2021-07-06 15:17:35
 * @Description: 员工详情
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <template v-if="staffDetails">
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="{ span: 11 }"
      :wrapper-col="{ span: 13 }"
      class="mx-auto shadow py-48 bg-background"
      style="width: 1212px; border-radius: 20px"
    >
      <a-form-item label="员工ID："> {{ staffDetails?.id }} </a-form-item>
      <a-form-item label="姓名："> {{ staffDetails?.name }} </a-form-item>
      <a-form-item label="手机号："> {{ staffDetails?.mobile }} </a-form-item>
      <a-form-item label="账号："> {{ staffDetails?.username }} </a-form-item>
      <a-form-item label="密码："> ****** </a-form-item>
      <a-form-item label="角色：">
        <div v-if="staffDetails.group">
          {{ staffDetails.group?.name }}
        </div>
      </a-form-item>
      <a-form-item label="创建时间："> {{ $formatUnix(staffDetails?.createtime) }} </a-form-item>
      <a-form-item label="创建者："> {{ staffDetails.addmanager?.name }} </a-form-item>
    </a-form>
  </template>
  <div class="flex justify-center mt-56">
    <cal-button class="w-192 mx-24 h-48" size="large" @click="$router.go(-1)"> 返 回 </cal-button>
  </div>
  <!-- <a-form :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }">
    <cal-tabs v-model:activeKey="activeKey" class="mx-auto" style="width: 1212px">
      <cal-tab-pane tab="基本信息" :key="1" :minHeight="510" class="shadow py-56">
        <a-form-item label="员工ID："> as124512 </a-form-item>
        <a-form-item label="姓名："> as124512 </a-form-item>
        <a-form-item label="手机号："> as124512 </a-form-item>
        <a-form-item label="账号："> as124512 </a-form-item>
        <a-form-item label="密码："> as124512 </a-form-item>
        <a-form-item label="角色："> as124512 </a-form-item>
        <a-form-item label="创建时间："> as124512 </a-form-item>
        <a-form-item label="创建者："> as124512 </a-form-item>
      </cal-tab-pane>
      <cal-tab-pane
        tab="操作日志"
        :key="2"
        :minHeight="670"
        class="shadow overflow-auto"
        style="max-height: 605px"
      >
        <div class="flex flex-row-reverse mb-28"><cal-page-select /></div>
        <cal-sticky-layout>
          <cal-table :list="list" sync-space>
            <cal-table-option title="操作时间">002</cal-table-option>
            <cal-table-option title="操作模块"> 王小二 </cal-table-option>
            <cal-table-option title="操作事件">王小二</cal-table-option>
            <cal-table-option title="IP地址"> 138-2365-6512 </cal-table-option>
          </cal-table>
          <template #sticky>
            <div class="flex justify-center mt-20">
              <cal-pagination v-model:current="activeKey" :total="50"> </cal-pagination>
            </div>
          </template>
        </cal-sticky-layout>
      </cal-tab-pane>
    </cal-tabs>
  </a-form> -->
</template>
<script setup lang="ts">
  import { reqStaffDetails } from '@/api/setting'
  import { onMounted, ref } from 'vue-demi'
  import { useRoute } from 'vue-router'
  import { useAntdForm } from '@/hooks/use-antd-form'
  // const activeKey = ref(1)
  // const list = ref([0, 0, 0, 0, 0, 0])
  const route = useRoute()
  const formRef = ref()
  const staffDetails = ref<any>({})
  const formState = ref()
  const { validate, rules } = useAntdForm(formRef, {})
  const getStaffDetails = async () => {
    const { data } = await reqStaffDetails({
      id: route.query.id
    })
    staffDetails.value = data.data
  }
  onMounted(() => {
    if (route.query.id) {
      getStaffDetails()
    }
  })
</script>
<style lang="scss" scoped>
  :deep(.ant-form-item-label > label::after) {
    content: ':' !important;
  }
  :deep(.ant-form-item) {
    margin-bottom: 10px;
  }
  :deep(.ant-form-item-label > label) {
    color: #001426;
  }
  :deep(.ant-form-item-control) {
    margin-left: 20px;
    color: #001426;
  }
</style>
