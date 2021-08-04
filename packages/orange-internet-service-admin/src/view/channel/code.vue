<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-06-08 16:51:55
 * @LastEditTime: 2021-06-26 15:35:40
 * @Description: 小程序代码
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <cal-card>
    <div class="w-544 m-auto">
      <cal-steps :current="navigationStep" labelPlacement="vertical">
        <cal-step title="扫码上传" />
        <cal-step title="填写版本信息" />
        <cal-step title="提交微信审核" />
      </cal-steps>
    </div>
  </cal-card>

  <a-form
    :label-col="{ span: 7 }"
    :wrapper-col="{ span: 13 }"
    ref="codeFormRef"
    :model="form"
    :rules="rules"
  >
    <div class="mt-48 mx-auto flex flex-col justify-center items-center w-804">
      <cal-tabs v-model:activeKey="step" class="w-full">
        <cal-tab-pane :key="-1" tab="扫码上传" :min-height="380" :disabled="true">
          <div class="flex flex-col items-center justify-center" style="height: 312px">
            <div class="mb-28" style="width: 200px">
              <cal-image :src="qrCodeValue" style="width: 200px" />
            </div>
            <div class="flex flex-col items-center" v-if="isQrCode">
              <cal-button type="link" @click="getQrCode">刷新二维码</cal-button>
              <div class="text-gray-darkmin">请使用微信扫描二维码进行绑定授权</div>
            </div>
            <cal-button @click="getQrCode" type="primary" class="w-160" v-else>
              获取授权二维码
            </cal-button>
          </div>
        </cal-tab-pane>
        <cal-tab-pane :key="0" tab="填写版本信息" :min-height="316" :disabled="true">
          <div class="mx-auto mt-16">
            <a-form-item required label="版本号" name="version_code">
              <cal-input
                style="width: 280px"
                placeholder="请输入版本号"
                v-model="form.version_code"
                disabled
              />
              <div class="text-xs text-gray-darkmin mt-10">当前版本号为1.0.2</div>
            </a-form-item>
            <a-form-item required label="版本描述" name="desc">
              <cal-textarea
                placeholder="请输入版本描述"
                v-model="form.desc"
                class="mt-10 rounded-xl h-128"
                disabled
              />
            </a-form-item>
          </div>
        </cal-tab-pane>
        <cal-tab-pane :key="1" tab="提交微信审核" :min-height="510" :disabled="true">
          <div
            v-if="isUploading"
            class="flex flex-col items-center justify-center"
            style="height: 500px"
          >
            <div class="text-base">代码正在上传中...</div>
            <div style="width: 200px; height: 100px" class="my-80">
              <cal-image src="@/assets/img/channel/up-loading.png"></cal-image>
            </div>
            <div style="width: 396px" class="up-loading">
              <a-progress :percent="currentProgress" :show-info="false" />
            </div>
          </div>
          <div
            v-else-if="!isUploading && !isUploadSuccess"
            class="flex flex-col items-center justify-center"
            style="height: 500px"
          >
            <div class="text-base">上传失败</div>
            <div style="width: 200px; height: 100px" class="my-80">
              <cal-image src="@/assets/img/channel/up-load-failed.png"></cal-image>
            </div>
            <div style="width: 396px" class="upload-fail">
              <a-progress :percent="100" :show-info="false" />
            </div>
          </div>
          <div
            v-else-if="navigationStep == 2"
            class="flex flex-col items-center justify-center"
            style="height: 500px"
          >
            <div class="text-base">上传成功</div>
            <div style="width: 100px; height: 100px" class="my-28">
              <cal-image src="@/assets/img/channel/up-load-succeeded.png"></cal-image>
            </div>
            <div class="text-gray-darkmin"> {{ countDown }}秒后将会自动跳转至已购渠道 </div>
          </div>
        </cal-tab-pane>
      </cal-tabs>
      <cal-button
        type="primary"
        size="large"
        style="margin-top: 60px; width: 186px"
        v-if="step == 0"
        @click="uploadCode"
      >
        上传代码
      </cal-button>
    </div>
  </a-form>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue-demi'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import {
    reqWxTripartiteLogin,
    reqWxTripartiteLoginStatus,
    reqWxTripartiteGetNewVersions,
    reqWxTripartiteUpload
  } from '@/api/channel'
  import { useRouter } from 'vue-router'
  import { message } from 'ant-design-vue'
  const router = useRouter()
  const codeFormRef = ref()

  const form = ref<any>({})

  // 获取二维码
  const uploadKey = ref('')
  const isQrCode = ref(false)
  const qrCodeValue = ref('')
  const getQrCode = async () => {
    const res = await reqWxTripartiteLogin()
    isQrCode.value = !isQrCode.value
    qrCodeValue.value = res.data.data.qrcode
    uploadKey.value = res.data.data.uploadkey
    polling()
    console.log('上传数据', res)
  }
  // 轮询
  const polling = () => {
    const timer = setInterval(async () => {
      const res = await reqWxTripartiteLoginStatus()
      console.log(res)
      if (res.data.code == 0) {
        clearInterval(timer)
        const res = await reqWxTripartiteGetNewVersions()
        form.value = res.data.data
        step.value = 0
      }
    }, 2000)
  }
  /* 表单验证处理 */
  const { rules, validate } = useAntdForm(codeFormRef, {
    version_code: { required: true, message: '名字为必填项' },
    desc: { required: true, message: '套餐简介为必填项' }
  })

  // 当前步骤
  const step = ref(-1)
  const navigationStep = ref(-1)
  watch(step, (currentStep) => {
    navigationStep.value = currentStep
  })

  // 上传代码
  // 是否上传中
  const isUploading = ref(true)
  // 是否上传成功
  const isUploadSuccess = ref(false)
  const currentProgress = ref(0)
  const countDown = ref(5)
  const uploadCode = async () => {
    await validate()
    step.value = 1
    const timer = setInterval(() => {
      currentProgress.value++
    }, 200)
    try {
      await reqWxTripartiteUpload({ uploadkey: uploadKey.value })
      clearInterval(timer)
      isUploadSuccess.value = !isUploadSuccess.value
      navigationStep.value = 2
      const timerDown = setInterval(() => {
        countDown.value--
        if (countDown.value <= 0) {
          clearInterval(timerDown)
          router.push('/channel/purchased')
        }
      }, 1000)
    } catch (error) {
      clearInterval(timer)
      isUploading.value = !isUploading.value
      message.error(error)
      console.log('报错信息', error)
      router.push('/channel/purchased')
    }
  }
</script>
<style lang="scss" scoped>
  .up-loading {
    :deep(.ant-progress-bg) {
      height: 14px !important;
      background-color: var(--color-primary);
    }
  }
  .upload-fail {
    :deep(.ant-progress-bg) {
      height: 14px !important;
      background-color: #f00;
    }
  }
</style>
