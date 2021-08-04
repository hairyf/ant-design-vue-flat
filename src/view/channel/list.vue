<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-06-08 16:51:55
 * @LastEditTime: 2021-06-23 09:30:17
 * @Description: 小程序列表
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <div class="cal-list">
    <!-- table 固定内容 -->
    <cal-tab-pane alone min-height="600">
      <div class="flex justify-end">
        <cal-page-select v-model="pageSize" />
      </div>
      <cal-table class="mt-28" :list="list">
        <cal-table-option title="版本号" min-width="182" index="user_version"> </cal-table-option>
        <cal-table-option title="模板描述" index="user_desc"> </cal-table-option>
        <cal-table-option title="上传开发者" index="developer"> </cal-table-option>
        <cal-table-option title="提交时间" sort v-slot="{ item }">
          {{ $formatUnix(item.create_time) }}
        </cal-table-option>
        <cal-table-option title="操作" min-width="100" border-left v-slot="{ item }">
          <div>
            <cal-button size="small" class="w-100" @click="addTemplateLibrary(item.draft_id)"
              >添加到模板库</cal-button
            >
          </div>
        </cal-table-option>
      </cal-table>
      <template #sticky>
        <div class="flex justify-center mt-16">
          <cal-pagination v-model:current="currentPage" :total="total" v-model:pageSize="pageSize">
          </cal-pagination>
        </div>
      </template>
    </cal-tab-pane>
  </div>
</template>
<script lang="ts" setup>
  import { reqCodeDraftList, reqMoveLibrary } from '@/api/channel'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { ref } from 'vue-demi'
  import { message } from 'ant-design-vue'
  import dayjs from 'dayjs'
  /** 表格 start */
  const { list, total, currentPage, pageSize } = useListPagination({
    getList: async ({ currentPage, total, pageSize }) => {
      const { data } = await reqCodeDraftList({
        page: currentPage.value,
        limit: pageSize.value
      })
      total.value = data.data.total
      return data.data.data
    }
  })
  // 添加代码到模板库
  const addTemplateLibrary = async (draft_id: any) => {
    await reqMoveLibrary({
      draft_id
    })
    message.success('操作成功！')
  }
</script>
<style lang="scss" scoped></style>
