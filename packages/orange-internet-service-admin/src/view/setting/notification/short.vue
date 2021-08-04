<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-27 20:32:26
 * @LastEditTime: 2021-07-06 10:30:28
 * @Description: 短信设置
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="{ span: 9 }"
    :wrapper-col="{ span: 14 }"
  >
    <cal-tabs v-model:activeKey="activeKey" class="w-804 mx-auto">
      <cal-tab-pane tab="阿里云" key="AliDaYu" class="pb-44 pt-56" :minHeight="200">
        <a-form-item label="App Key" name="accessKeyId">
          <cal-input
            v-model="formState.accessKeyId"
            placeholder="请输入App Key"
            class="w-208"
          ></cal-input>
          <div class="text-xs">
            如您未申请短信接口，请前往
            <cal-button class="px-0 text-xs" type="link">阿里云短信</cal-button> 进行申请
          </div>
        </a-form-item>
        <a-form-item label="App Secret" name="accessKeySecret">
          <cal-input
            v-model="formState.accessKeySecret"
            placeholder="请输入App Secret"
            class="w-208"
          ></cal-input>
        </a-form-item>
        <!-- <div class="flex items-center justify-center mb-16">
          <div class="w-192 bg-gray-darkest" style="height: 1px"></div>
          <div class="mx-14">短信测试</div>
          <div class="w-192 bg-gray-darkest" style="height: 1px"></div>
        </div> -->
        <!-- <a-form-item label="短信签名" name="aliAutograph">
          <cal-input-select
            placeholder="请选择短信签名"
            v-model="formState.aliAutograph"
            class="w-208"
          >
            <a-select-option value="1">桔子互联</a-select-option>
            <a-select-option value="2">阿里巴巴</a-select-option>
            <a-select-option value="3">腾讯</a-select-option>
          </cal-input-select>
          <div class="text-xs">
            短信签名必须通过审核才能生效，如您还没有合适的短信签名，去
            <cal-button type="link" class="text-xs px-0">阿里云</cal-button> 申请一个
          </div>
        </a-form-item>
        <a-form-item label="短信模板ID">
          <cal-input
            v-model="formState.aliTemplateId"
            placeholder="请输入短信模板ID"
            class="w-208"
          ></cal-input>
          <div class="leading-loose mt-10 text-xs">
            如您未申请短信模板ID，请先前往
            <cal-button class="px-0 text-xs" type="link">阿里云</cal-button> 进行申请 <br />
            目录
            <span class="text-red">
              【阿里云短信服务控制台 】> 【国内消息 】>【 模板管理】 > 【模板CODE】
            </span>
          </div>
        </a-form-item>
        <a-form-item label="测试接收手机号">
          <cal-input
            v-model="formState.aliPhone"
            placeholder="请输入接收短信手机号"
            class="w-208 pr-0"
          >
            <template #suffix>
              <cal-button type="link" class="px-0">测试</cal-button>
            </template>
          </cal-input>
        </a-form-item> -->
      </cal-tab-pane>
      <cal-tab-pane tab="腾讯云" key="TXY" class="pb-44 pt-56" :minHeight="200">
        <a-form-item label="App Key" name="accessKeyId">
          <cal-input
            v-model="formState.accessKeyId"
            placeholder="请输入App Key"
            class="w-208"
          ></cal-input>
          <div class="text-xs">
            如您未申请短信接口，请前往
            <cal-button class="px-0 text-xs" type="link">腾讯云短信</cal-button> 进行申请
          </div>
        </a-form-item>
        <a-form-item label="SDK APP ID" name="accessKeySecret">
          <cal-input
            v-model="formState.accessKeySecret"
            placeholder="请输入SDK APP ID"
            class="w-208"
          ></cal-input>
        </a-form-item>
        <!-- <div class="flex items-center justify-center mb-16">
          <div class="w-192 bg-gray-darkmin" style="height: 1px"></div>
          <div class="mx-14">短信测试</div>
          <div class="w-192 bg-gray-darkmin" style="height: 1px"></div>
        </div> -->
        <!-- <a-form-item label="短信签名" name="aliAutograph">
          <cal-input-select
            placeholder="请选择短信签名"
            v-model="formState.aliAutograph"
            class="w-208"
          >
            <a-select-option value="1">桔子互联</a-select-option>
            <a-select-option value="2">阿里巴巴</a-select-option>
            <a-select-option value="3">腾讯</a-select-option>
          </cal-input-select>
          <div class="text-xs">
            短信签名必须通过审核才能生效，如您还没有合适的短信签名，去
            <cal-button type="link" class="text-xs px-0">腾讯云</cal-button> 申请一个
          </div>
        </a-form-item>
        <a-form-item label="短信模板ID">
          <cal-input
            v-model="formState.aliTemplateId"
            placeholder="请输入短信模板ID"
            class="w-208"
          ></cal-input>
          <div class="leading-loose mt-10 text-xs">
            如您未申请短信模板ID，请先前往
            <cal-button class="px-0 text-xs" type="link">腾讯云</cal-button> 进行申请 <br />
            目录
            <span class="text-red">
              【腾讯云短信服务控制台】 >【 国内消息】 > 【正文模板管理】
            </span>
          </div>
        </a-form-item>
        <a-form-item label="测试接收手机号">
          <cal-input
            v-model="formState.aliPhone"
            placeholder="请输入接收短信手机号"
            class="w-208 pr-0"
          >
            <template #suffix>
              <cal-button type="link" class="px-0">测试</cal-button>
            </template>
          </cal-input>
        </a-form-item> -->
      </cal-tab-pane>
    </cal-tabs>
  </a-form>
  <div class="flex justify-center mt-64">
    <cal-button class="w-176 mx-24" size="large" type="primary" @click="submitForm"
      >保存并生效</cal-button
    >
  </div>
</template>
<script lang="ts" setup>
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { ref, watch } from 'vue-demi'
  import { reqSMSConfiguration, reqSetShortMessage } from '@/api/setting'
  import { message } from 'ant-design-vue'
  const formRef = ref()
  const formState = ref({
    accessKeyId: '',
    accessKeySecret: '',
    aliAutograph: '',
    aliTemplateId: '',
    aliPhone: ''
    // txyAppKey: '',
    // txySdkAppId: '',
    // txyAutograph: '',
    // txyTemplateId: '',
    // txyPhone: ''
  })
  const { rules, validate } = useAntdForm(formRef, {
    accessKeyId: [{ required: true, message: '请填写App Key', trigger: 'blur' }],
    accessKeySecret: [{ required: true, message: '请填写App Secret', trigger: 'blur' }]
    // aliAutograph: [{ required: true, message: '请选择短信签名', trigger: 'blur' }],
    // txyAppKey: [{ required: true, message: '请填写App Key', trigger: 'blur' }],
    // txySdkAppId: [{ required: true, message: '请填写SDK APP ID', trigger: 'blur' }],
    // txyAutograph: [{ required: true, message: '请选择短信签名', trigger: 'blur' }]
  })
  const activeKey = ref('AliDaYu')
  // 提交表单
  const submitForm = async () => {
    await validate()
    let obj = {}
    if (activeKey.value == 'AliDaYu') {
      obj = {
        accessKeyId: formState.value.accessKeyId,
        accessKeySecret: formState.value.accessKeySecret
      }
    } else {
      obj = {
        sdkAppId: formState.value.accessKeyId,
        appKey: formState.value.accessKeySecret
      }
    }
    await reqSetShortMessage({ status: 1, key: activeKey.value, value: obj })
    message.success('保存成功')
  }
  // 获取短信配置数据
  const getAliDaYuSMSData = async () => {
    const res = await reqSMSConfiguration({
      key: activeKey.value
    })
    const data = res.data.data.config
    formState.value.accessKeyId = data.accessKeyId || data.sdkAppId
    formState.value.accessKeySecret = data.accessKeySecret || data.appKey
  }
  watch(activeKey, getAliDaYuSMSData, { immediate: true })
</script>
<style lang="scss" scoped>
  .remark-introduction {
    :deep(.ant-input) {
      border-radius: 10px;
    }
  }
</style>
