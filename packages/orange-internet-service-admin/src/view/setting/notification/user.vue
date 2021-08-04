<!--
 * @Author: Zhilong
 * @Date: 2021-05-27 09:52:46
 * @LastEditTime: 2021-06-16 18:03:56
 * @Description: 商户端通知
 * @LastEditors: Pan.Yu.Lin
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <!-- table固定内容 -->
  <cal-tabs v-model:activeKey="activeKey">
    <cal-tab-pane tab="买家通知" :key="4" hide></cal-tab-pane>
    <cal-tab-pane tab="卖家通知" :key="3" hide></cal-tab-pane>
  </cal-tabs>
  <cal-tab-pane alone :min-height="500">
    <div class="flex justify-between items-center">
      <div class="flex flex-col justify-center">
        <span class="mb-10">
          当前正在使用：{{ list[0]?.services_use_config == 'TXY' ? '腾讯云' : '阿里云' }}
        </span>
        <span class="text-gray-darkmin text-xs">如切换短信服务商，则需更新所有模板信息</span>
      </div>
      <cal-page-select v-model="pageSize" />
    </div>
    <cal-table class="mt-28" contentAlign="left" :list="list" sync-space>
      <cal-table-option title="序号" max-width="60" min-width="60">
        <template #default="scoped">
          {{ scoped.index + 1 }}
        </template>
      </cal-table-option>
      <cal-table-option title="通知名称" min-width="200" index="title"></cal-table-option>
      <cal-table-option title="签名名称" min-width="156">
        <template #default="scoped">
          {{
            scoped.item.services_use_config == 'TXY'
              ? scoped.item.txy_signature_title
              : scoped.item.alidayu_signature_title
          }}
        </template>
      </cal-table-option>
      <cal-table-option title="模板ID" min-width="156">
        <template #default="scoped">
          {{
            scoped.item.services_use_config == 'TXY'
              ? scoped.item.txy_template_id
              : scoped.item.alidayu_template_id
          }}
        </template>
      </cal-table-option>
      <cal-table-option title="模板内容" min-width="400" index="content"></cal-table-option>
      <cal-table-option title="通知状态" min-width="156">
        <template #default="scoped">
          <div>
            <cal-switch @change="changeStatus(scoped.item)" v-model="scoped.item.status" />
          </div>
        </template>
      </cal-table-option>
      <cal-table-option title="操作" max-width="80" min-width="80" border-left v-slot="{ item }">
        <div>
          <cal-button
            size="small"
            style="width: 76px"
            class="my-6"
            @click=";(dialogSuccess = !dialogSuccess), (form.id = item.id)"
          >
            绑定
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
  <!-- 绑定弹框 -->
  <cal-message-dialog v-model="dialogSuccess" title="绑定" @ok="confirmModify">
    <a-form ref="merchantBindingRef" :model="form" :rules="rules" :label-col="{ span: 8 }">
      <a-form-item label="短信签名" name="signature_title">
        <cal-input v-model="form.signature_title" placeholder="输入短信签名"></cal-input>
      </a-form-item>
      <a-form-item label="模板ID" name="template_id">
        <cal-input v-model="form.template_id" placeholder="输入模板ID"></cal-input>
      </a-form-item>
    </a-form>
  </cal-message-dialog>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue-demi'
  import { reqSMSIndexShop, reqSMSUpdateStatus, reqSMSSmsParam } from '@/api/setting'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { message } from 'ant-design-vue'
  import { useAntdForm } from '@/hooks/use-antd-form'
  const activeKey = ref(3)

  /** 表格*/
  const { list, total, currentPage, resetList, pageSize } = useListPagination({
    getList: async ({ currentPage, total, pageSize }) => {
      const { data } = await reqSMSIndexShop({
        page: currentPage.value,
        limit: pageSize.value,
        type: activeKey.value
      })
      total.value = data.data.total
      return data.data.data
    }
  })
  // 更改状态
  const changeStatus = async (data: any) => {
    try {
      await reqSMSUpdateStatus({ id: data.id, status: data.status })
      message.success('更改成功')
      resetList()
    } catch (error) {
      resetList()
    }
  }

  // 绑定弹框
  const dialogSuccess = ref(false)
  const confirmModify = async () => {
    try {
      await validate()
      await reqSMSSmsParam(form.value)
      message.success('绑定成功')
      resetList()
    } catch (error) {
      return Promise.reject()
    }
  }
  const merchantBindingRef = ref()
  const { rules, validate } = useAntdForm(merchantBindingRef, {
    template_id: [{ required: true, message: '输入短信签名', trigger: 'blur' }],
    signature_title: [{ required: true, message: '输入模板ID', trigger: 'blur' }]
  })
  const form = ref({
    id: '' as Key,
    signature_title: '',
    template_id: ''
  })
  watch(activeKey, resetList)
</script>
