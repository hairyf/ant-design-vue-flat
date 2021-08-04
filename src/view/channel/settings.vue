<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-27 20:32:26
 * @LastEditTime: 2021-07-10 17:13:14
 * @Description: 第三方设置
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <div class="flex justify-between items-center rounded-xl bg-primary px-12 h-44 mb-64">
    <div class="relative">
      <div class="absolute w-12 h-12 bg-white rounded-full top-0 bottom-0 m-auto"></div>
      <div class="ml-24 text-white truncate text-xs">
        第三方设置后，至少需要等待10分钟的审核时间，如10分钟之后仍未生效，请到微信开发平台后台查看审核结果通知。
      </div>
    </div>
  </div>
  <cal-card class="w-804 mx-auto">
    <a-form
      ref="thirdPartyFormRef"
      class="pt-28"
      :model="formState"
      :rules="rules"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item label="APP ID" name="component_appId">
        <cal-input
          v-if="isEdit"
          v-model:value="formState.component_appId"
          placeholder="输入APP ID"
          class="w-208"
        ></cal-input>
        <div v-else>{{ formState.component_appId }}</div>
      </a-form-item>
      <a-form-item label="APP SECRET" name="component_appsecret">
        <cal-input
          v-if="isEdit"
          v-model:value="formState.component_appsecret"
          placeholder="输入APP SECRET"
          class="w-208"
        ></cal-input>
        <div v-else>{{ formState.component_appsecret }}</div>
      </a-form-item>
      <a-form-item label="消息校验TOKEN" name="component_token">
        <!-- <cal-input
          v-if="isEdit"
          v-model:value="formState.component_token"
          placeholder="输入加密KEY"
          class="w-208"
        ></cal-input> -->
        <div class="flex items-center">
          <div>{{ formState.component_token }}</div>
          <cal-button type="link" v-if="isEdit" @click="copyBtn(formState.component_token)"
            >复制</cal-button
          >
        </div>
        <!-- <cal-button class="text-xs ml-12 h-24 px-12">重新生成</cal-button> -->
        <div class="text-xs text-gray-darkmin mt-10">
          开发者在代替公众号接收到消息时，用此TOKEN来校验消息
        </div>
      </a-form-item>
      <a-form-item label="消息加密KEY" name="component_encodingAesKey">
        <!-- <cal-input
          v-if="isEdit"
          v-model:value="formState.component_encodingAesKey"
          placeholder="输入TOKEN"
          class="w-208"
        ></cal-input> -->

        <!-- <cal-button class="text-xs ml-12 h-24 px-12">重新生成</cal-button> -->
        <div class="flex items-center">
          <div>{{ formState.component_encodingAesKey }}</div>
          <cal-button type="link" v-if="isEdit" @click="copyBtn(formState.component_encodingAesKey)"
            >复制</cal-button
          >
        </div>
        <div class="text-xs text-gray-darkmin mt-10">
          代替公众号收发消息过程中使用，长度必须为43位的字符串，只能是字母和数字
        </div>
      </a-form-item>
      <a-form-item label="授权事件接收URL" name="authorizationUrl">
        <!-- <cal-input
          v-if="isEdit"
          v-model:value="formState.authorizationUrl"
          placeholder="输入URL"
          class="w-208"
        ></cal-input> -->
        <div class="flex items-center">
          <div>{{ formState.authorizationUrl }}</div>
          <cal-button type="link" v-if="isEdit" @click="copyBtn(formState.authorizationUrl)"
            >复制</cal-button
          >
        </div>
        <!-- <cal-button class="text-xs ml-12 h-24 px-12">重新生成</cal-button> -->
      </a-form-item>
      <a-form-item label="消息与事件接收URL" name="newsUrl">
        <!-- <cal-input
          v-if="isEdit"
          v-model:value="formState.newsUrl"
          placeholder="输入URL"
          class="w-208"
        ></cal-input> -->
        <div class="flex items-center">
          <div>{{ formState.newsUrl }}</div>
          <cal-button type="link" v-if="isEdit" @click="copyBtn(formState.newsUrl)"
            >复制</cal-button
          >
        </div>
        <!-- <cal-button class="text-xs ml-12 h-24 px-12">重新生成</cal-button> -->
      </a-form-item>
    </a-form>
  </cal-card>
  <div class="flex justify-center mt-64">
    <cal-button class="w-192 mx-24" size="large" @click="isEdit = !isEdit" v-if="!isEdit">
      编辑
    </cal-button>
    <cal-button class="w-192 mx-24" size="large" v-else @click="submitForm"> 保存 </cal-button>
    <!-- <cal-button class="w-192 mx-24" type="primary" size="large">测试</cal-button> -->
  </div>
</template>
<script lang="ts" setup>
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { reqThirdPartySettings, reqSettingThirdParty } from '@/api/channel'
  import { onMounted, ref } from 'vue-demi'
  import { useClipboard } from 'vue-composable'
  import { message } from 'ant-design-vue'
  import { copyText } from '@/utils/vue-utils'
  const isEdit = ref(true)
  const thirdPartyFormRef = ref()
  const formState = ref({
    component_appId: '',
    component_appsecret: '',
    component_encodingAesKey: '',
    component_token: '',
    authorizationUrl: '',
    newsUrl: ''
  })
  const { rules, validate } = useAntdForm(thirdPartyFormRef, {
    component_appId: [{ required: true, message: '请填写APP ID', trigger: 'blur' }],
    component_appsecret: [{ required: true, message: '请填写APP SECRET', trigger: 'blur' }],
    component_encodingAesKey: [{ required: true, message: '请填写消息校验TOKEN', trigger: 'blur' }],
    component_token: [{ required: true, message: '请填写消息加密KEY', trigger: 'blur' }],
    authorizationUrl: [{ required: true, message: '请填写授权事件接收URL', trigger: 'blur' }],
    newsUrl: [{ required: true, message: '请填写消息与事件接收URL', trigger: 'blur' }]
  })
  // 提交表单
  const submitForm = async () => {
    await validate()
    setSettingThirdParty()
  }
  const setSettingThirdParty = async () => {
    const value = {
      ...formState.value
    }
    await reqSettingThirdParty({
      status: 1,
      value
    })
    isEdit.value = !isEdit.value
  }
  // 复制
  const copyBtn = (tetx: string) => {
    copyText(tetx)
    message.success('复制成功')
  }
  const getSetUp = async () => {
    const { data } = await reqThirdPartySettings()
    const config = data.data.config
    formState.value = config
    isEdit.value = false
  }
  onMounted(() => {
    getSetUp()
  })
</script>
<style lang="scss" scoped>
  .remark-introduction {
    :deep(.ant-input) {
      border-radius: 10px;
    }
  }
  :deep(.ant-form-item-label > label) {
    color: #8c8c8c;
  }
</style>
