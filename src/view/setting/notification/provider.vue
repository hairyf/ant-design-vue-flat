<!--
 * @Author: Zhilong
 * @Date: 2021-05-27 09:52:46
 * @LastEditTime: 2021-07-10 15:31:39
 * @Description: 服务商端通知
 * @LastEditors: Mr.wang
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <!-- table固定内容 -->
  <cal-tabs v-model:activeKey="activeKey">
    <cal-tab-pane tab="服务商通知" :key="1" hide></cal-tab-pane>
    <cal-tab-pane tab="商户通知" :key="2" hide></cal-tab-pane>
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
      <cal-table-option title="签名名称" min-width="140">
        <template #default="scoped">
          {{ scoped.item.services_use_sign_name }}
        </template>
      </cal-table-option>
      <cal-table-option title="模板ID" min-width="130">
        <template #default="scoped">
          {{ scoped.item.services_use_template_id }}
        </template>
      </cal-table-option>
      <cal-table-option title="模板内容" min-width="400" index="content"></cal-table-option>
      <cal-table-option title="通知状态" min-width="120">
        <template #default="scoped">
          <div>
            <cal-switch @change="changeStatus(scoped.item)" v-model="scoped.item.status" />
          </div>
        </template>
      </cal-table-option>
      <cal-table-option title="操作" max-width="180" min-width="180" border-left v-slot="{ item }">
        <div>
          <cal-button
            size="small"
            style="width: 76px"
            class="my-6 mr-10"
            @click="
              ;(dialogSuccess = !dialogSuccess),
                (form.id = item.id),
                (form.template_id = item.services_use_template_id),
                (form.signature_title = item.services_use_sign_name)
            "
          >
            绑定
          </cal-button>
          <cal-button
            size="small"
            style="width: 76px"
            class="my-6"
            @click=";(dialogSmsTest = !dialogSmsTest), (formTest.sign = item.sign)"
          >
            测试
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
    <a-form
      ref="ServiceBindingRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 8 }"
      class="ml-12"
    >
      <a-form-item label="短信签名" name="signature_title">
        <cal-input
          v-model="form.signature_title"
          placeholder="输入短信签名"
          class="w-192"
        ></cal-input>
      </a-form-item>
      <a-form-item label="模板ID" name="template_id">
        <cal-input v-model="form.template_id" placeholder="输入模板ID" class="w-192"></cal-input>
      </a-form-item>
    </a-form>
  </cal-message-dialog>
  <!-- 测试弹框 -->
  <cal-message-dialog v-model="dialogSmsTest" title="测试" @ok="confirmSmsTest">
    <a-form ref="smsTestRef" :model="formTest" :rules="smsTestRules" :label-col="{ span: 8 }">
      <a-form-item label="短信唯一标记" name="sign">
        <cal-input v-model="formTest.sign" placeholder="请短信唯一标记" disabled></cal-input>
      </a-form-item>
      <a-form-item label="手机号" name="mobile">
        <cal-input v-model="formTest.mobile" placeholder="手机号"></cal-input>
      </a-form-item>
    </a-form>
  </cal-message-dialog>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue-demi'
  import { reqSMSIndex, reqSMSUpdateStatus, reqSMSSmsParam, reqSMSSendTest } from '@/api/setting'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { message } from 'ant-design-vue'
  import { useAntdForm } from '@/hooks/use-antd-form'

  const activeKey = ref(1)

  /** 表格*/
  const { list, total, currentPage, resetList, pageSize } = useListPagination({
    getList: async ({ currentPage, total, pageSize }) => {
      const { data } = await reqSMSIndex({
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
  const form = ref({
    id: '' as Key,
    template_id: '',
    signature_title: ''
  })
  const ServiceBindingRef = ref()
  const { rules, validate } = useAntdForm(ServiceBindingRef, {
    template_id: [{ required: true, message: '输入短信签名', trigger: 'blur' }],
    signature_title: [{ required: true, message: '输入模板ID', trigger: 'blur' }]
  })
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

  // 测试弹框
  const formTest = ref({
    sign: '',
    mobile: ''
  })
  const smsTestRef = ref()
  const dialogSmsTest = ref(false)
  const { rules: smsTestRules, validate: smsTestValidate } = useAntdForm(smsTestRef, {
    sign: [{ required: true, message: '短信模板ID', trigger: 'blur' }],
    mobile: [{ required: true, message: '手机号', trigger: 'blur' }]
  })
  const confirmSmsTest = async () => {
    try {
      await smsTestValidate()
      await reqSMSSendTest(formTest.value)
      message.success('发送成功')
      resetList()
    } catch (error) {
      return Promise.reject()
    }
  }

  watch(activeKey, resetList)
</script>
