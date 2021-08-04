<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-29 15:07:50
 * @LastEditTime: 2021-06-23 14:34:22
 * @Description: 合从客服
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <cal-card class="w-804 mx-auto pb-112">
    <a-form
      ref="customerServiceFormRef"
      :model="formState"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-item label="输入接入代码" name="code">
        <a-textarea
          class="mt-10 rounded-xl"
          :rows="12"
          v-model:value="formState.code"
          placeholder="请将接入代码复制或输入于此文本框内"
        />
      </a-form-item>
      <a-form-item label=" ">
        <div class="text-xs mb-10">客服接入代码位置指引：</div>
        <div class="text-xs text-gray-darkmin">
          1、先登录 合从客服 后台，如无合从账号，点击
          <cal-button type="link" class="px-0" @click="jumpCustomerService">合从客服</cal-button>
          进行申请
        </div>
        <div class="text-xs text-gray-darkmin">
          2、点击客户接入渠道
          <a-popover placement="right">
            <template #content>
              <cal-image :width="477" src="@/assets/img/service/service-examples.png" />
            </template>
            <cal-button type="link" class="px-0">示例</cal-button>
          </a-popover>
        </div>
        <div class="text-xs text-gray-darkmin">
          3、点击网页获得接入代码
          <a-popover placement="right">
            <template #content>
              <cal-image :width="477" src="@/assets/img/service/code-examples.png" />
            </template>
            <cal-button type="link" class="px-0">示例</cal-button>
          </a-popover>
        </div>
        <div class="text-xs text-gray-darkmin leading-8">
          4、将获得的代码复制到上方文本框内，点击保存并生效即可
        </div>
      </a-form-item>
    </a-form>
  </cal-card>
  <div class="flex justify-center mt-64">
    <cal-button type="primary" size="large" class="w-192" @click="submitForm">
      保存并生效
    </cal-button>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue-demi'
  import { useAntdForm } from '@/hooks/use-antd-form'
  const formState = ref({
    code: ''
  })
  const customerServiceFormRef = ref()
  const { rules, validate } = useAntdForm(customerServiceFormRef, {
    code: [{ required: true, message: '请输入应用名称', trigger: 'blur' }]
  })
  // 提交表单
  const submitForm = async () => {
    await validate()
    alert('保存成功')
  }

  const jumpCustomerService = () => {
    window.open('http://chat.ahcdialogchat.com/chat/h5/chatLink.html?channelId=9ii5SZ')
  }
</script>
<style lang="scss" scoped></style>
