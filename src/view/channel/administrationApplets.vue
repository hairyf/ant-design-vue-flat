<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-29 18:36:39
 * @LastEditTime: 2021-07-07 18:08:01
 * @Description: 管理小程序
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <cal-card class="mb-28">
    <a-form :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }">
      <a-row>
        <a-col :span="12" style="border-right: 1px solid #d9d9d9">
          <div class="text-base font-bold">最新版本</div>
          <a-row>
            <a-col :span="12">
              <a-form-item label="最新版本">
                <span>{{ wxData.version_code }}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="版本描述" class="describe">
                <div class="mt-10">{{ wxData.desc || '暂无描述' }}</div>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item
            label="开发者小程序APP ID"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 19 }"
          >
            <div class="flex items-center">
              <div>{{ appId }}</div>
              <cal-button type="link" class="pr-0 pl-14" @click="show = true">编辑</cal-button>
            </div>
          </a-form-item>
          <div class="flex" v-if="wxData.is_upload == 1">
            <cal-button type="primary" class="w-176" @click="router.push('/channel/code')"
              >上传</cal-button
            >
          </div>
        </a-col>
        <a-col :span="12" class="pl-24">
          <div class="text-base font-bold">线上版本</div>
          <a-row>
            <a-col :span="12">
              <a-form-item label="线上版本" :label-col="{ span: 14 }" :wrapper-col="{ span: 10 }">
                <span>{{ onLineData.user_version }}</span>
              </a-form-item>
              <a-form-item label="模板描述" :label-col="{ span: 14 }" :wrapper-col="{ span: 10 }">
                <span>{{ onLineData.user_desc }}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="版本发布时间"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <div>{{ $formatUnix(onLineData.issue_time) }}</div>
              </a-form-item>
              <a-form-item
                label="版本生成时间"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <div>{{ $formatUnix(onLineData.create_time) }}</div>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-form>
  </cal-card>
  <cal-tabs v-model:activeKey="activeKey">
    <cal-tab-pane v-for="(item, i) in tabs" :key="i" hide>
      <template #tab>
        <span>{{ item.title }}</span>
      </template>
    </cal-tab-pane>
  </cal-tabs>
  <!-- table固定内容 -->
  <cal-tab-pane alone :min-height="500">
    <!-- <div class="flex justify-end">
      <cal-page-select v-model="pageSize" />
    </div> -->
    <cal-table class="mt-28" contentAlign="left" :list="list" sync-space>
      <template v-if="activeKey == 0">
        <cal-table-option title="版本号" min-width="182" v-slot="{ item }">
          <div class="flex items-center">
            <div>{{ item.user_version }}</div>
            <div
              v-if="item.is_issue == 1"
              class="w-48 h-20 text-xs text-center ml-4 rounded-sm leading-5 bg-primary text-white"
              >已发布</div
            >
          </div>
        </cal-table-option>
        <cal-table-option title="版本描述" index="user_desc" min-width="86"> </cal-table-option>
        <cal-table-option title="TemplateID" index="template_id" min-width="66" />
        <cal-table-option title="添加时间" min-width="145" sort v-slot="{ item }">
          {{ $formatUnix(item.create_time) }}
        </cal-table-option>
        <cal-table-option title="发布时间" min-width="145" sort v-slot="{ item }">
          <div v-if="item.is_issue == 0"> - </div>
          <div v-else>
            {{ $formatUnix(item.issue_time) }}
          </div>
        </cal-table-option>
        <cal-table-option title="操作" min-width="186" border-left v-slot="{ item }">
          <div>
            <cal-button
              v-if="item.is_issue == 0"
              size="small"
              style="width: 76px"
              class="mr-14 my-6"
              @click="releaseBtn(item.template_id, item.type)"
              >发布</cal-button
            >
            <cal-button
              size="small"
              style="width: 76px"
              class="mr-14 my-6"
              @click="deleteBtn(item.template_id)"
              >删除</cal-button
            >
          </div>
        </cal-table-option>
      </template>
      <template v-else>
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
      </template>
    </cal-table>
    <!-- <template #sticky>
      <div class="flex justify-center">
        <cal-pagination v-model:current="currentPage" :total="total" v-model:pageSize="pageSize">
        </cal-pagination>
      </div>
    </template> -->
  </cal-tab-pane>
  <cal-message-dialog title="编辑小程序App ID" v-model="show" class="w-500" @ok="modifyAppId">
    <a-form :model="formStae" :rules="rules" ref="formRef">
      <a-form-item label="小程序App ID" name="appId">
        <cal-input v-model:value="formStae.appId"> </cal-input>
        <div class="text-xs text-gray-darkmin">修改小程序App ID后，以前的小程序将不可用</div>
      </a-form-item>
    </a-form>
  </cal-message-dialog>
</template>
<script lang="ts" setup>
  import {
    reqCodeDraftList,
    reqCodeTemplateList,
    reqDeleteTemplate,
    reqMoveLibrary,
    reqTemplatePublishing,
    reqWxNewest,
    reqConfigureAppId,
    reqSetConfigureAppId
  } from '@/api/channel'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { message } from 'ant-design-vue'
  import { onMounted, ref, watch } from 'vue-demi'
  import { useRouter } from 'vue-router'
  import { CalMessageDialog as CalMessage } from '~/CustomAntds/CalMessageDialog/index'
  const router = useRouter()
  const activeKey = ref(0)
  const onLineData = ref<any>({})
  const appId = ref()
  const show = ref(false)
  //头部tabs
  const tabs = [
    {
      title: '模板库'
    },
    {
      title: '草稿箱'
    }
  ]
  const formStae = ref({
    appId: ''
  })
  const formRef = ref()
  const wxData = ref<any>({})
  const { rules, validate } = useAntdForm(formRef, {
    appId: [{ required: true, message: '请填写微信appId', trigger: 'blur' }]
  })
  /** 表格 start */
  const { list, total, currentPage, resetList, pageSize } = useListPagination({
    getList: async ({ currentPage, total, pageSize }) => {
      if (activeKey.value == 0) {
        const { data } = await reqCodeTemplateList({
          page: currentPage.value,
          limit: pageSize.value
        })
        // total.value = data.data.total
        onLineData.value = data.data.shopXcxTemplate[0]
        return data.data.allTemplate
      }
      const { data } = await reqCodeDraftList({
        page: currentPage.value,
        limit: pageSize.value
      })
      // console.log(data)
      // total.value = data.data.total
      return data.data
    }
  })
  /** 表格 end */

  // 添加代码到模板库
  const addTemplateLibrary = async (draft_id: any) => {
    await reqMoveLibrary({
      draft_id
    })
    message.success('操作成功！')
  }
  // 修改appid
  const modifyAppId = async () => {
    await validate()
    await reqSetConfigureAppId({
      status: 1,
      value: {
        base_appid: formStae.value.appId
      }
    })
    message.success('操作成功！')
    getConfigureAppId()
  }
  // 删除模板
  const deleteBtn = async (template_id: any) => {
    await CalMessage.warning({
      title: '删除模板',
      content: '您确定删除该模板么？删除以后将无法恢复'
    })
    await setDeleteTemplate(template_id)
  }
  const setDeleteTemplate = async (template_id: any) => {
    await reqDeleteTemplate({
      template_id
    })
    message.success('操作成功！')
    resetList()
  }
  // 发布
  const releaseBtn = async (template_id: any, type: any) => {
    await reqTemplatePublishing({
      type,
      template_id
    })
    message.success('操作成功！')
    resetList()
  }
  watch(activeKey, () => {
    resetList()
  })
  const getWxNewset = async () => {
    const { data } = await reqWxNewest()
    wxData.value = data.data
  }
  const getConfigureAppId = async () => {
    const { data } = await reqConfigureAppId()
    appId.value = data.data.config.base_appid
    formStae.value.appId = appId.value
  }
  onMounted(() => {
    getWxNewset()
    getConfigureAppId()
  })
</script>
<style lang="scss" scoped>
  .describe {
    :deep(.ant-form-item-control) {
      line-height: 1.5;
    }
  }
  :deep(.ant-form-item-label > label) {
    color: #8c8c8c;
  }
</style>
