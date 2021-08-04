<!--
 * @Author: Zhilong
 * @Date: 2021-05-27 09:52:46
 * @LastEditTime: 2021-06-22 15:11:27
 * @Description: 系统日志
 * @LastEditors: Mr.wang
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <a-form class="-ml-40 flex flex-wrap">
    <a-form-item>
      <cal-input-select placeholder="操作模块" v-model="form.type" class="w-192 mx-40">
        <a-select-option :value="1">修改模块</a-select-option>
        <a-select-option :value="2">登入账号</a-select-option>
      </cal-input-select>
    </a-form-item>
    <a-form-item>
      <cal-input-select placeholder="操作员" v-model="form.status" class="w-192 mx-40">
        <a-select-option :value="1">超级管理员</a-select-option>
        <a-select-option :value="2">管理员</a-select-option>
      </cal-input-select>
    </a-form-item>
  </a-form>
  <div class="mb-28">
    <cal-button type="primary" class="w-112 mr-28" @click="onFilter">筛选</cal-button>
    <cal-button class="w-112" @click="resetFields">重置条件</cal-button>
  </div>
  <!-- table固定内容 -->
  <cal-tab-pane alone :min-height="500">
    <div class="flex justify-between">
      <cal-button class="w-144" type="primary">导出</cal-button>
      <cal-page-select v-model="pageSize" />
    </div>
    <cal-table class="mt-28" contentAlign="left" :list="list" sync-space>
      <cal-table-option title="操作时间" min-width="182"> 2021-05-15 12:00:00 </cal-table-option>
      <cal-table-option title="操作模块" min-width="182"> 修改模块 </cal-table-option>
      <cal-table-option title="操作事件" min-width="182"> 修改模块图片 </cal-table-option>
      <cal-table-option title="操作人" min-width="182"> 超级管理员 </cal-table-option>
      <cal-table-option title="IP地址" min-width="182"> 121.60.42.199 </cal-table-option>
      <cal-table-option title="操作" min-width="100" max-width="100" border-left v-slot="{ item }">
        <div>
          <cal-button
            size="small"
            style="width: 76px"
            class="my-6"
            @click=";(isSeeDialog = !isSeeDialog), (seeData = item)"
          >
            查看
          </cal-button>
        </div>
      </cal-table-option>
    </cal-table>
    <template #sticky>
      <div class="flex justify-center">
        <cal-pagination v-model:current="currentPage" :total="total" v-model:pageSize="pageSize" />
      </div>
    </template>
  </cal-tab-pane>

  <!-- 查看弹框 -->
  <cal-message-dialog v-model="isSeeDialog" title="查看系统日志" class="w-804">
    <a-form :label-col="{ span: 11 }" class="modality-box">
      <a-form-item label="操作人名称："> {{ seeData.title }} </a-form-item>
      <a-form-item label="操作事件："> 修改模块图片 </a-form-item>
      <a-form-item label="操作模块："> 修改模块 </a-form-item>
      <a-form-item label="操作IP："> 192.168.1.7 </a-form-item>
      <a-form-item label="操作人权限："> 超级管理员 </a-form-item>
      <a-form-item label="操作人时间："> 2021-05-01 16:00;04 </a-form-item>
    </a-form>
    <template #footer>
      <div></div>
    </template>
  </cal-message-dialog>
</template>
<script lang="ts" setup>
  import { ref } from 'vue-demi'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { useForm } from '@ant-design-vue/use'
  import { reqSMSIndex } from '@/api/setting'
  import CalMessageDialog from '~/CustomAntds/CalMessageDialog/index.vue'
  const form = ref({
    type: '',
    status: ''
  })
  const { resetFields } = useForm(form.value, {})
  // 开始筛选
  const onFilter = () => {
    resetList()
  }

  /** 表格*/
  const { list, total, currentPage, resetList, pageSize } = useListPagination({
    getList: async ({ currentPage, total, pageSize }) => {
      const { data } = await reqSMSIndex({
        page: currentPage.value,
        limit: pageSize.value,
        type: 1
      })
      total.value = data.data.total
      return data.data.data
    }
  })

  // 查看弹框
  const isSeeDialog = ref(false)
  const seeData = ref<any>({})
</script>
<style lang="scss" scoped>
  :deep(.ant-form-item-label > label) {
    color: #8c8c8c;
  }
  .modality-box {
    :deep(.ant-form-item) {
      margin-bottom: 15px;
    }
  }
</style>
