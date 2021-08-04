<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-27 20:32:26
 * @LastEditTime: 2021-07-09 16:02:53
 * @Description: 支付设置
 * @LastEditors: Mr.wang
-->
<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="{ span: 7 }"
    :wrapper-col="{ span: 14 }"
  >
    <cal-tabs v-model:activeKey="activeKey" class="w-804 mx-auto">
      <cal-tab-pane tab="微信支付" :key="1" class="pb-36 pt-44" :minHeight="400">
        <template v-if="activeKey == 1">
          <a-form-item label="App ID" name="aapId">
            <cal-input
              v-model="formState.aapId"
              :allowClear="true"
              placeholder="请输入"
              class="w-208"
            ></cal-input>
          </a-form-item>
          <a-form-item label="商户号" name="merchantNumber">
            <cal-input
              v-model="formState.merchantNumber"
              placeholder="请输入"
              :allowClear="true"
              class="w-208"
            ></cal-input>
          </a-form-item>
          <a-form-item label="支付v3密钥" name="secretKey">
            <cal-input
              v-model="formState.secretKey"
              :allowClear="true"
              placeholder="请输入"
              class="w-208"
            ></cal-input>
          </a-form-item>
          <a-form-item label="商户Cert证书" name="certUrl">
            <a-upload
              accept=".pem"
              :showUploadList="false"
              @change="handleChange($event, 1)"
              :before-upload="beforeUpload1"
              :action="uploadUrl"
              :headers="headers"
              :data="{ pay_code: 'WxPay', is_server: '1' }"
            >
              <cal-button style="border: 1px solid #d9d9d9" class="h-32 leading-8 px-32">{{
                formState.certUrl ? '重新上传' : '上传文件'
              }}</cal-button>
            </a-upload>
            <div class="leading-loose mt-10 text-xs text-gray-darkmin">
              商户可登录
              <cal-button type="link" class="px-0 text-xs">微信商户平台</cal-button>
              ，在<span class="text-red">【账户中心】>【API安全】>【API证书】</span>
              目录下载证书上传证书中的<span class="text-red">apiclient_cert.pem</span>文件
            </div>
            <div class="flex items-center mt-8" v-if="formState.certUrl">
              <i class="text-sm nr-tick" style="color: var(--color-primary)"></i>

              <div class="text-sm ml-10 mr-28">已上传</div>
              <div class="text-sm">apiclient_cert.pem</div>
            </div>
          </a-form-item>
          <a-form-item label="商户Key证书" name="merchantUrl">
            <a-upload
              accept=".pem"
              :showUploadList="false"
              @change="handleChange($event, 2)"
              :before-upload="beforeUpload2"
              :action="uploadUrl"
              :headers="headers"
              :data="{ pay_code: 'WxPay', is_server: '1' }"
            >
              <cal-button style="border: 1px solid #d9d9d9" class="h-32 leading-8 px-32">{{
                formState.merchantUrl ? '重新上传' : '上传文件'
              }}</cal-button>
            </a-upload>
            <div class="leading-loose mt-10 text-xs text-gray-darkmin">
              商户可登录 <cal-button type="link" class="px-0 text-xs">微信商户平台</cal-button> ，在
              <span class="text-red">【账户中心】>【API安全】>【API证书】</span>
              目录下载证书上传证书中的 <span class="text-red">apiclient_key.pem</span> 文件
            </div>
            <div class="flex items-center mt-8" v-if="formState.merchantUrl">
              <i class="text-sm nr-tick" style="color: var(--color-primary)"></i>

              <div class="text-sm ml-10 mr-28">已上传</div>
              <div class="text-sm">apiclient_key.pem</div>
            </div>
          </a-form-item>
        </template>
      </cal-tab-pane>
      <cal-tab-pane
        class="pb-36 pt-44"
        tab="支付宝支付"
        :key="2"
        :minHeight="400"
        showCount
        :maxlength="50"
      >
        <template v-if="activeKey == 2">
          <a-form-item label="App ID" name="ailAppId">
            <cal-input
              :allowClear="true"
              v-model="formState.ailAppId"
              placeholder="输入App ID"
              class="w-208"
            ></cal-input>
          </a-form-item>
          <a-form-item label="支付宝密钥" name="ailsecretKey">
            <cal-input
              :allowClear="true"
              v-model="formState.ailsecretKey"
              placeholder="输入支付宝密钥"
              class="w-208"
            ></cal-input>
          </a-form-item>
          <a-form-item label="alipayCertPublicKey.crt证书" name="alipayCertUrl">
            <a-upload
              accept=".crt"
              :showUploadList="false"
              @change="handleChange($event, 3)"
              :before-upload="beforeUpload3"
              :action="uploadUrl"
              :headers="headers"
              :data="{ pay_code: 'AliPay', is_server: '1' }"
            >
              <cal-button style="border: 1px solid #d9d9d9" class="h-32 leading-8 px-32">{{
                formState.alipayCertUrl ? '重新上传' : '上传文件'
              }}</cal-button>
            </a-upload>
            <div class="leading-loose mt-10 text-xs text-gray-darkmin">
              商户可登录 支付宝开发平台，在
              <span class="text-red">
                【控制台】>【选择应用】>【应用信息】>【接口 加签方式】>【设置/查看】
              </span>
              中下载证书后 上传证书中的
              <span class="text-red">alipayCertPublicKey.crt</span>
              文件，如名称不同，请先修改成
              <span class="text-red">alipayCertPublicKey.crt</span>
              后再进行上传
            </div>
            <div class="flex items-center mt-8" v-if="formState.alipayCertUrl">
              <i class="text-sm nr-tick" style="color: var(--color-primary)"></i>

              <div class="text-sm ml-10 mr-28">已上传</div>
              <div class="text-sm">alipayCertPublicKey.crt</div>
            </div>
          </a-form-item>

          <a-form-item label="alipayRootCert.crt证书" name="alipayRootUrl">
            <a-upload
              :showUploadList="false"
              accept=".crt"
              @change="handleChange($event, 4)"
              :before-upload="beforeUpload4"
              :action="uploadUrl"
              :headers="headers"
              :data="{ pay_code: 'AliPay', is_server: '1' }"
            >
              <cal-button style="border: 1px solid #d9d9d9" class="h-32 leading-8 px-32">{{
                formState.alipayRootUrl ? '重新上传' : '上传文件'
              }}</cal-button>
            </a-upload>
            <div class="leading-loose mt-10 text-xs text-gray-darkmin">
              商户可登录 支付宝开发平台，在
              <span class="text-red">
                【控制台】>【选择应用】>【应用信息】>【接口 加签方式】>【设置/查看】
              </span>
              中下载证书后 上传证书中的
              <span class="text-red">alipayRootCert.crt</span>
              文件，如名称不同，请先修改成
              <span class="text-red">alipayRootCert.crt</span>
              后再进行上传
            </div>
            <div class="flex items-center mt-8" v-if="formState.alipayRootUrl">
              <i class="text-sm nr-tick" style="color: var(--color-primary)"></i>

              <div class="text-sm ml-10 mr-28">已上传</div>
              <div class="text-sm">alipayRootCert.crt</div>
            </div>
          </a-form-item>
          <a-form-item label="appCertPublicKey.crt证书" name="appPubliUrl">
            <a-upload
              accept=".crt"
              :showUploadList="false"
              @change="handleChange($event, 5)"
              :before-upload="beforeUpload5"
              :action="uploadUrl"
              :headers="headers"
              :data="{ pay_code: 'AliPay', is_server: '1' }"
            >
              <cal-button style="border: 1px solid #d9d9d9" class="h-32 leading-8 px-32">{{
                formState.appPubliUrl ? '重新上传' : '上传文件'
              }}</cal-button>
            </a-upload>
            <div class="leading-loose mt-10 text-xs text-gray-darkmin">
              商户可登录 支付宝开发平台，在
              <span class="text-red">
                【控制台】>【选择应用】>【应用信息】>【接口 加签方式】>【设置/查看】
              </span>
              中下载证书后 上传证书中的
              <span class="text-red">alipayRootCert.crt</span>
              文件，如名称不同，请先修改成
              <span class="text-red">alipayRootCert.crt</span>
              后再进行上传
            </div>
            <div class="flex items-center mt-8" v-if="formState.appPubliUrl">
              <i class="text-sm nr-tick" style="color: var(--color-primary)"></i>
              <!-- <cal-image src="@/assets/img/setting/success.png" alt="" class="" /> -->
              <div class="text-sm ml-10 mr-28">已上传</div>
              <div class="text-sm">appCertPublicKey.crt</div>
            </div>
          </a-form-item>
        </template>
      </cal-tab-pane>
    </cal-tabs>
  </a-form>
  <div class="flex justify-center mt-56">
    <cal-button class="w-176 mx-24 h-48" size="large" @click="getWxPayConfig">取消</cal-button>
    <cal-button class="w-176 mx-24 h-48" size="large" type="primary" @click="submitForm"
      >保存</cal-button
    >
  </div>
</template>
<script lang="ts" setup>
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { httpConfig } from '@/api/http.config'
  import { reqSetPayment, reqPaymentAllocation } from '@/api/setting'
  import { computed, onMounted, ref } from 'vue-demi'
  import { message } from 'ant-design-vue'
  const activeKey = ref(1)
  const formRef = ref()
  const formState = ref({
    // 微信
    aapId: '',
    merchantNumber: '',
    secretKey: '',
    certUrl: '',
    merchantUrl: '',
    // 支付宝
    ailAppId: '',
    ailsecretKey: '',
    alipayCertUrl: '',
    alipayRootUrl: '',
    appPubliUrl: ''
  })
  const { validate, rules } = useAntdForm(formRef, {
    aapId: [{ required: true, message: '请填写微信AppId', trigger: 'blur' }],
    merchantNumber: [{ required: true, message: '请填写商户号', trigger: 'blur' }],
    secretKey: [{ required: true, message: '请填写支付v3密钥', trigger: 'blur' }],
    certUrl: [{ required: true, message: '请上传商户Cert证书', trigger: 'blur' }],
    merchantUrl: [{ required: true, message: '请上传商户Key证书', trigger: 'blur' }],
    ailAppId: [{ required: true, message: '请填写支付宝AppId', trigger: 'blur' }],
    ailsecretKey: [{ required: true, message: '请填写支付宝密钥', trigger: 'blur' }],
    alipayCertUrl: [
      {
        required: true,
        message: '请上传alipayCertPublicKey.crt证书',
        trigger: 'blur'
      }
    ],
    alipayRootUrl: [{ required: true, message: '请上传alipayRootCert.crt证书', trigger: 'blur' }],
    appPubliUrl: [{ required: true, message: '请上传appCertPublicKey.crt证书', trigger: 'blur' }]
  })
  // 上传成功的钩子
  const handleChange = (info: any, num: number) => {
    let fileList = [...info.fileList]
    fileList = fileList.slice(-1)
    fileList = fileList.map((file) => {
      if (file.response) {
        if (file.response.code == 0) {
          switch (num) {
            case 1:
              formState.value.certUrl = file.response.data.url
              break
            case 2:
              formState.value.merchantUrl = file.response.data.url
              break
            case 3:
              formState.value.alipayCertUrl = file.response.data.url
              break
            case 4:
              formState.value.alipayRootUrl = file.response.data.url
              break
            case 5:
              formState.value.appPubliUrl = file.response.data.url
              break
          }
          message.success('文件上传成功！')
          return file.response.data.url
        }
        message.error('文件上传失败！')
      }
      return file
    })
  }
  // 限制文件名钩子
  const beforeUpload1 = (file: any) => {
    return new Promise((resolve, reject) => {
      const extension = file.name == 'apiclient_cert.pem'
      if (!extension) {
        message.error('请上传apiclient_cert.pem文件!')
        return reject(false)
      }
      return resolve(true)
    })
  }
  const beforeUpload2 = (file: any) => {
    return new Promise((resolve, reject) => {
      const extension = file.name == 'apiclient_key.pem'
      if (!extension) {
        message.error('请上传apiclient_key.pem文件!')
        return reject(false)
      }
      return resolve(true)
    })
  }
  const beforeUpload3 = (file: any) => {
    return new Promise((resolve, reject) => {
      const extension = file.name == 'alipayCertPublicKey.crt'
      if (!extension) {
        message.error('请上传alipayCertPublicKey.crt文件!')
        return reject(false)
      }
      return resolve(true)
    })
  }
  const beforeUpload4 = (file: any) => {
    return new Promise((resolve, reject) => {
      const extension = file.name == 'alipayRootCert.crt'
      if (!extension) {
        message.error('请上传alipayRootCert.crt文件!')
        return reject(false)
      }
      return resolve(true)
    })
  }
  const beforeUpload5 = (file: any) => {
    return new Promise((resolve, reject) => {
      const extension = file.name == 'appCertPublicKey.crt'
      if (!extension) {
        message.error('请上传appCertPublicKey.crt文件!')
        return reject(false)
      }
      return resolve(true)
    })
  }
  // token
  const headers = httpConfig['headers']['common']
  // 上传文件的路径
  const uploadUrl = computed(() => {
    return `${httpConfig.baseURL}/business/Config/upload`
  })
  // 提交表单
  const submitForm = async () => {
    await validate()
    if (activeKey.value == 1) {
      const WxPayData = {
        app_id: formState.value.aapId,
        mch_id: formState.value.merchantNumber,
        key: formState.value.secretKey,
        apiclient_cert: formState.value.certUrl,
        apiclient_key: formState.value.merchantUrl
      }
      await reqSetPayment({ key: 'WxPay', status: 1, value: WxPayData })
    } else {
      const AliPayData = {
        app_id: formState.value.ailAppId,
        private_key: formState.value.ailsecretKey,
        alipayCertPublicKey: formState.value.alipayCertUrl,
        alipayRootCert: formState.value.alipayRootUrl,
        appCertPublicKey: formState.value.appPubliUrl
      }
      await reqSetPayment({ key: 'AliPay', status: 1, value: AliPayData })
    }
    message.success('操作成功！')
    getWxPayConfig()
  }
  const getAlipayConfig = async () => {
    const { data } = await reqPaymentAllocation({ key: 'AliPay' })
    formState.value.alipayCertUrl = data.data.config.alipayCertPublicKey
    formState.value.alipayRootUrl = data.data.config.alipayRootCert
    formState.value.appPubliUrl = data.data.config.appCertPublicKey
    formState.value.ailAppId = data.data.config.app_id
    formState.value.ailsecretKey = data.data.config.private_key
  }
  const getWxPayConfig = async () => {
    const { data } = await reqPaymentAllocation({ key: 'WxPay' })
    formState.value.certUrl = data.data.config.apiclient_cert
    formState.value.merchantUrl = data.data.config.apiclient_cert
    formState.value.aapId = data.data.config.app_id
    formState.value.merchantNumber = data.data.config.mch_id
    formState.value.secretKey = data.data.config.key
    getAlipayConfig()
  }
  onMounted(() => {
    getWxPayConfig()
  })
</script>
<style lang="scss" scoped>
  .remark-introduction {
    :deep(.ant-input) {
      border-radius: 10px;
    }
  }
</style>
