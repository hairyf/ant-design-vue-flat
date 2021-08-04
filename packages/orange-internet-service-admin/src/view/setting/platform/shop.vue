<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-27 20:32:26
 * @LastEditTime: 2021-07-13 14:31:35
 * @Description: 店铺设置
 * @LastEditors: Mr.wang
-->
<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="{ span: 7 }"
    :wrapper-col="{ span: 14 }"
    class="w-804 mx-auto"
  >
    <cal-tabs v-model:activeKey="activeKey">
      <cal-tab-pane tab="开店审核" :key="1" :minHeight="174">
        <a-form-item label="开店审核" class="mt-24" name="examine">
          <cal-switch v-model:checked="formState.examine" />
          <div class="text-xs text-gray-darkmin">开启后，申请开店需要服务商手动审核</div>
        </a-form-item>
      </cal-tab-pane>
      <cal-tab-pane tab="店铺申请资料" :key="2" :minHeight="400" class="pr-10 special-box">
        <!-- <div class="flex justify-between items-center">
          <cal-button class="w-144" type="primary" icon-class="nr-increase" @click="addSaleSpec">
            新增内容
          </cal-button>
          <div class="text-xs text-gray-darkmin">
            最多可添加 10 项，还能添加 {{ 10 - tableList.length }} 项
          </div>
        </div> -->
        <div class="pr-10">
          <cal-table
            contentAlign="left"
            :list="tableList"
            sync-space
            class="p-24 pr-10"
            style="max-height: 700px; overflow-y: auto"
          >
            <cal-table-option title="名称" min-width="60" index="name"></cal-table-option>
            <cal-table-option title="是否必填" min-width="60">是</cal-table-option>
            <cal-table-option title="是否启用" min-width="60" #default="{ item }">
              <cal-switch
                class="w-48"
                v-if="item.name == '身份证号码' || item.name == '营业执照编号'"
                v-model:checked="item.open"
              />
              <div v-else>是</div>
            </cal-table-option>
          </cal-table>
        </div>
      </cal-tab-pane>
      <cal-tab-pane tab="开店协议" :key="3" :minHeight="400" showCount :maxlength="50">
        <a-form-item label="开店协议" class="mt-24" name="agreement">
          <cal-switch v-model:checked="formState.agreement" />
          <div class="text-xs text-gray-darkmin">开启后，需要勾选同意协议才能申请开店</div>
        </a-form-item>
        <template v-if="formState.agreement">
          <a-form-item label="协议标题" name="title">
            <cal-input v-model="formState.title" placeholder="请输入" class="w-256"></cal-input>
          </a-form-item>
          <a-form-item label="协议内容" name="content">
            <cal-textarea
              class="rounded-xl h-128"
              v-model="formState.content"
              placeholder="请输入"
            ></cal-textarea>
          </a-form-item>
        </template>
      </cal-tab-pane>
    </cal-tabs>
  </a-form>
  <div class="flex justify-center mt-64">
    <cal-button class="w-176 mx-24" size="large" @click="getShopSet">取消</cal-button>
    <cal-button class="w-176 mx-24" size="large" type="primary" @click="submitForm">
      保存
    </cal-button>
  </div>
</template>
<script lang="ts" setup>
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { onMounted, ref } from 'vue-demi'
  import { reqShopSetting, reqSetShop } from '@/api/setting'
  import { message } from 'ant-design-vue'
  const activeKey = ref(1)
  const formRef = ref()
  const formState = ref({
    examine: false,
    agreement: false,
    title: '',
    content: ''
  })
  const { validate, rules } = useAntdForm(formRef, {
    examine: [{ type: 'boolean', required: true, message: '请选择', trigger: 'blur' }],
    agreement: [{ type: 'boolean', required: true, message: '请选择', trigger: 'blur' }],
    title: [{ required: true, message: '请填写协议标题', trigger: 'blur' }],
    content: [{ required: true, message: '请填写协议内容', trigger: 'blur' }]
  })
  // tableList列表数据
  const tableList = ref([
    { name: '店铺名称' },
    { name: '店铺联系人' },
    { name: '主营类目' },
    { name: '店铺地址' },
    { name: '店铺详细地址' },
    { name: '联系人电话' },
    { name: '身份证号码', open: false },
    { name: '营业执照编号', open: false }
  ])

  // 提交表单
  const submitForm = async () => {
    await validate()
    if (activeKey.value == 3) {
      const agreementData = {
        is_agreement: formState.value.agreement ? 1 : 0,
        title: formState.value.title,
        content: formState.value.content
      }
      await reqSetShop({ key: 'ShopAgreement', status: 1, value: agreementData })
    } else {
      const shopData = {
        is_audit: formState.value.examine ? 1 : 0,
        audit_content: {
          sys: {
            card_id: {
              is_show: tableList.value[6].open ? 1 : 0
            },
            business_licence_sn: {
              is_show: tableList.value[7].open ? 1 : 0
            }
          }
        }
      }
      await reqSetShop({ key: 'ShopSet', status: 1, value: shopData })
    }
    message.success('操作成功！')
    getShopSet()
  }
  // 获取协议设置
  const getAgreement = async () => {
    const { data } = await reqShopSetting({ key: 'ShopAgreement' })
    const config = data.data.config
    formState.value.agreement = config.is_agreement == 1
    formState.value.title = config.title
    formState.value.content = config.content
  }
  // 获取店铺设置
  const getShopSet = async () => {
    const { data } = await reqShopSetting({ key: 'ShopSet' })
    const config = data.data.config
    formState.value.examine = config.is_audit == 1
    tableList.value[6].open = config.audit_content.sys.card_id.is_show == 1
    tableList.value[7].open = config.audit_content.sys.business_licence_sn.is_show == 1
    getAgreement()
  }
  onMounted(() => {
    getShopSet()
  })
</script>
<style lang="scss" scoped>
  .remark-introduction {
    :deep(.ant-input) {
      border-radius: 10px;
    }
  }
  .special-box {
    padding: 0 !important;
  }
</style>
