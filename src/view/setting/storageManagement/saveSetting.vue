<!--
 * @Author: Mr.wang
 * @Date: 2021-05-31 11:27:28
 * @LastEditTime: 2021-07-14 19:36:23
 * @Description: 存储设置
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="{ span: 7 }"
    :wrapper-col="{ span: 16 }"
  >
    <cal-tabs v-model:activeKey="activeKey" class="w-804 mx-auto">
      <cal-tab-pane tab="本地存储" :key="1" :minHeight="142" class="shadow" :disabled="currentKey">
        <div class="text-sm text-center py-32" style="color: #001426"
          >本地存储无需配置，直接保存即可</div
        >
      </cal-tab-pane>
      <cal-tab-pane
        tab="阿里云OSS"
        :disabled="currentKey"
        :key="2"
        :minHeight="582"
        showCount
        :maxlength="50"
        class="shadow pb-56"
      >
        <template v-if="activeKey == 2">
          <div
            class="px-20 py-24 text-xs bg-gray-lightest leading-6 mb-40"
            style="width: 756px; color: #8c8c8c; border-radius: 20px"
          >
            <div>切换到OSS后，需要将原有设置的附件传输至阿里云OSS 相关工具：</div>
            <div>
              官方推荐OSS客户端工具（Windows版）
              <a
                class="text-primary"
                href="https://market.aliyun.com/products/53690006/cmgj000281.html#sku=biaozhunban"
                target="_balnk"
              >
                https://market.aliyun.com/products/53690006/cmgj000281.html#sku=biaozhunban
              </a>
            </div>
            <div>
              其他官方推荐工具
              <a
                class="text-primary"
                href=" https://developer.aliyun.com/ask/191405?spm=a2c6h.13524658"
                target="_balnk"
              >
                https://developer.aliyun.com/ask/191405?spm=a2c6h.13524658
              </a>
            </div>
          </div>
          <a-form-item label="Access Key ID" name="aliAccessKey">
            <cal-input
              v-model:value="formState.aliAccessKey"
              placeholder="请输入Access Key ID"
              class="w-208"
            ></cal-input>
            <div class="login-tips">Access Key ID是您访问阿里云API的密钥</div>
          </a-form-item>
          <a-form-item label="Access Secret Key" name="aliAaccessSecret">
            <cal-input
              v-model:value="formState.aliAaccessSecret"
              placeholder="请输入Access Secret Key"
              class="w-208"
            ></cal-input>
            <div class="login-tips">Access Key Secret是您访问阿里云API的密钥</div>
          </a-form-item>
          <a-form-item label="存储空间(Bucket)" name="aliAbucket">
            <cal-input
              v-model:value="formState.aliAbucket"
              placeholder="请输入Bucket"
              class="w-208"
            ></cal-input>
            <div class="login-tips">请保证存储空间(Bucket)，为可公共读取的</div>
          </a-form-item>
          <a-form-item label="访问Url" name="aliUrl">
            <cal-input
              v-model:value="formState.aliUrl"
              placeholder="请输入Url"
              class="w-208"
            ></cal-input>
            <div class="login-tips">
              自定义访问域名，请确保域名支持 https 协议，格式：https://www.xxx.com
            </div>
          </a-form-item>
          <a-form-item label="所在地域" name="aliCode">
            <cal-input
              v-model:value="formState.aliCode"
              placeholder="请输入样式代码"
              class="w-208"
            ></cal-input>
            <div class="login-tips"> 存储空间(Bucket)所在的地域 </div>
          </a-form-item>
        </template>
      </cal-tab-pane>
      <cal-tab-pane
        tab="腾讯云COS"
        :key="3"
        :minHeight="714"
        class="shadow pb-56"
        :disabled="currentKey"
      >
        <template v-if="activeKey == 3">
          <div
            class="py-24 text-xs bg-gray-lightest leading-6 mb-40 text-center"
            style="width: 756px; color: #8c8c8c; border-radius: 20px"
          >
            切换到COS后，需要将原有设置的附件传输至腾讯COS, 相关工具：
            <a class="text-primary" href="https://console.cloud.tencent.com/cos5" target="_balnk">
              https://console.cloud.tencent.com/cos5
            </a>
          </div>
          <a-form-item label="App ID" name="tcAppId">
            <cal-input
              v-model:value="formState.tcAppId"
              placeholder="请输入App ID"
              class="w-208"
            ></cal-input>
            <div class="login-tips"> App ID是您项目的ID </div>
          </a-form-item>
          <a-form-item label="Secret ID" name="tcSecretId">
            <cal-input
              v-model:value="formState.tcSecretId"
              placeholder="请输入Secret ID"
              class="w-208"
            ></cal-input>
            <div class="login-tips">
              Secret ID 是您项目的安全秘钥，具有该账户完全的权限，请妥善保管
            </div>
          </a-form-item>
          <a-form-item label="Secret Key" name="tcSecretKey">
            <cal-input
              v-model:value="formState.tcSecretKey"
              placeholder="请输入App ID"
              class="w-208"
            ></cal-input>
            <div class="login-tips">
              Secret Key 是您项目的安全秘钥，具有该账户完全的权限，请妥善保管
            </div>
          </a-form-item>
          <a-form-item label="存储空间(Bucket)" name="tcBucket">
            <cal-input
              v-model:value="formState.tcBucket"
              placeholder="请输入Bucket"
              class="w-208"
            ></cal-input>
            <div class="login-tips"> 请保证空间属性为 公有读私有写 </div>
          </a-form-item>
          <a-form-item label="访问Url" name="tcUrl">
            <cal-input
              v-model:value="formState.tcUrl"
              placeholder="请输入Url"
              class="w-208"
            ></cal-input>
            <div class="login-tips">
              自定义访问域名，请确保域名支持 https 协议，格式：https://www.xxx.com
            </div>
          </a-form-item>
          <a-form-item label="所在地域" name="tcCode">
            <cal-input
              v-model:value="formState.tcCode"
              placeholder="请输入样式代码"
              class="w-208"
            ></cal-input>
            <div class="login-tips"> 存储空间(Bucket)所在的地域 </div>
          </a-form-item>
        </template>
      </cal-tab-pane>
      <cal-tab-pane
        tab="七牛云"
        :key="4"
        :minHeight="538"
        class="shadow pb-56"
        :disabled="currentKey"
      >
        <template v-if="activeKey == 4">
          <div
            class="py-24 text-xs bg-gray-lightest leading-6 mb-40 text-center"
            style="width: 756px; color: #8c8c8c; border-radius: 20px"
          >
            切换到七牛存储后，需要将原有设置的附件传输至七牛存储, 相关工具：
            <a class="text-primary" href="https://developer.qiniu.com/sdk#tool" target="_balnk">
              https://developer.qiniu.com/sdk#tool
            </a>
          </div>
          <a-form-item label="Access Key" name="qiAccessKey">
            <cal-input
              v-model:value="formState.qiAccessKey"
              placeholder="请输入Access Key"
              class="w-208"
            ></cal-input>
            <div class="login-tips">
              用于签名的公钥, 从
              <a class="text-primary" href="https://portal.qiniu.com/user/key" target="_balnk">
                https://portal.qiniu.com/user/key </a
              >获取
            </div>
          </a-form-item>
          <a-form-item label="Secret Key" name="qiSecretKey">
            <cal-input
              v-model:value="formState.qiSecretKey"
              placeholder="请输入Secret Key"
              class="w-208"
            ></cal-input>
            <div class="login-tips">
              用于签名的私钥, 从
              <a class="text-primary" href="https://portal.qiniu.com/user/key" target="_balnk">
                https://portal.qiniu.com/user/key
              </a>
              获取
            </div>
          </a-form-item>
          <a-form-item label="存储空间(Bucket)" name="qiBucket">
            <cal-input
              v-model:value="formState.qiBucket"
              placeholder="请输入Bucket"
              class="w-208"
            ></cal-input>
            <div class="login-tips"> 空间名称，请保证为公开空间 </div>
          </a-form-item>
          <a-form-item label="访问Url" name="qiUrl">
            <cal-input
              v-model:value="formState.qiUrl"
              placeholder="请输入Url"
              class="w-208"
            ></cal-input>
            <div class="login-tips">
              自定义访问域名，请确保域名支持 https 协议，格式：https://www.xxx.com
            </div>
          </a-form-item>
          <a-form-item label="所在地域" name="qiCode">
            <cal-input
              v-model:value="formState.qiCode"
              placeholder="请输入样式代码"
              class="w-208"
            ></cal-input>
            <div class="login-tips"> 存储空间(Bucket)所在的地域 </div>
          </a-form-item>
        </template>
      </cal-tab-pane>
    </cal-tabs>
  </a-form>
  <div class="flex justify-center mt-56">
    <cal-button class="w-192 mx-24 h-48" type="primary" size="large" @click="submitForm">
      保存并生效
    </cal-button>
  </div>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue'
  import { onMounted, ref, watch } from 'vue-demi'
  import { reqSaveSetting, reqSetStorage } from '@/api/setting'
  import { useAntdForm } from '@/hooks/use-antd-form'
  const formRef = ref()
  const { validate, rules } = useAntdForm(formRef, {
    aliAccessKey: [{ required: true, message: '请填写Access Key ID', trigger: 'blur' }],
    aliAaccessSecret: [{ required: true, message: '请填写Access Secret Key', trigger: 'blur' }],
    aliAbucket: [{ required: true, message: '请填写Bucket', trigger: 'blur' }],
    aliUrl: [{ required: true, message: '请填写Url', trigger: 'blur' }],
    aliCode: [{ required: true, message: '请填写样式代码', trigger: 'blur' }],
    tcAppId: [{ required: true, message: '请填写App ID', trigger: 'blur' }],
    tcSecretId: [{ required: true, message: '请填写Secret ID', trigger: 'blur' }],
    tcSecretKey: [{ required: true, message: '请填写Secret Key', trigger: 'blur' }],
    tcBucket: [{ required: true, message: '请填写Bucket', trigger: 'blur' }],
    tcUrl: [{ required: true, message: '请填写Url', trigger: 'blur' }],
    tcCode: [{ required: true, message: '请填写样式代码', trigger: 'blur' }],
    qiAccessKey: [{ required: true, message: '请填写Access Key', trigger: 'blur' }],
    qiSecretKey: [{ required: true, message: '请填写Secret Key', trigger: 'blur' }],
    qiBucket: [{ required: true, message: '请填写Bucket', trigger: 'blur' }],
    qiUrl: [{ required: true, message: '请填写Url', trigger: 'blur' }],
    qiCode: [{ required: true, message: '请填写样式代码', trigger: 'blur' }]
  })
  const currentKey = ref(true)
  const activeKey = ref(1)
  const formState = ref({
    // 阿里云oss
    aliAccessKey: '',
    aliAaccessSecret: '',
    aliAbucket: '',
    aliUrl: '',
    aliCode: '',
    // 腾讯云COS
    tcAppId: '',
    tcSecretId: '',
    tcSecretKey: '',
    tcBucket: '',
    tcUrl: '',
    tcCode: '',
    // 七牛云
    qiAccessKey: '',
    qiSecretKey: '',
    qiBucket: '',
    qiUrl: '',
    qiCode: ''
  })
  // 提交表单
  const submitForm = async () => {
    await validate()
    settConfigure()
  }
  // 获取配置
  const getSaveSetting = async () => {
    const { data } = await reqSaveSetting()
    const config = data.data.config
    currentKey.value = data.data.key
    if (data.data.key == 'QiNiu') {
      activeKey.value = 4
      formState.value.qiAccessKey = config.ak
      formState.value.qiSecretKey = config.sk
      formState.value.qiBucket = config.bucket
      formState.value.qiUrl = config.cdn
      formState.value.qiCode = config.region
    } else if (data.data.key == 'AliYun') {
      activeKey.value = 2
      formState.value.aliAccessKey = config.access_key
      formState.value.aliAaccessSecret = config.secret_key
      formState.value.aliAbucket = config.bucket
      formState.value.aliUrl = config.cdn
      formState.value.aliCode = config.region
    } else if (data.data.key == 'Tencent') {
      activeKey.value = 3
      formState.value.tcAppId = config.app_id
      formState.value.tcSecretId = config.secret_id
      formState.value.tcSecretKey = config.secret_key
      formState.value.tcBucket = config.bucket
      formState.value.tcUrl = config.cdn
      formState.value.tcCode = config.region
    } else {
      activeKey.value = 1
    }
  }
  const settConfigure = async () => {
    if (activeKey.value == 4) {
      const value = {
        ak: formState.value.qiAccessKey,
        sk: formState.value.qiSecretKey,
        bucket: formState.value.qiBucket,
        cdn: formState.value.qiUrl,
        region: formState.value.qiCode
      }
      await reqSetStorage({ key: 'QiNiu', status: 1, value })
      message.success('操作成功！')
      getSaveSetting()
    } else if (activeKey.value == 3) {
      const value = {
        app_id: formState.value.tcAppId,
        secret_id: formState.value.tcSecretId,
        secret_key: formState.value.tcSecretKey,
        bucket: formState.value.tcBucket,
        cdn: formState.value.tcUrl,
        region: formState.value.tcCode
      }
      await reqSetStorage({ key: 'Tencent', status: 1, value })
      message.success('操作成功！')
      getSaveSetting()
    } else if (activeKey.value == 2) {
      const value = {
        access_key: formState.value.aliAccessKey,
        secret_key: formState.value.aliAaccessSecret,
        bucket: formState.value.aliAbucket,
        cdn: formState.value.aliUrl,
        region: formState.value.aliCode
      }
      await reqSetStorage({ key: 'AliYun', status: 1, value })
      message.success('操作成功！')
      getSaveSetting()
    } else {
      await reqSetStorage({ key: 'Local', status: 1, value: { value: 1 } })
      message.success('操作成功！')
      getSaveSetting()
    }
  }
  // 监听配置切换请求
  watch(activeKey, async () => {
    if (activeKey.value == 4) {
      const { data } = await reqSaveSetting({ key: 'QiNiu' })
      formState.value.qiAccessKey = data.data.config.ak
      formState.value.qiSecretKey = data.data.config.sk
      formState.value.qiBucket = data.data.config.bucket
      formState.value.qiUrl = data.data.config.cdn
    } else if (activeKey.value == 2) {
      const { data } = await reqSaveSetting({ key: 'AliYun' })
      formState.value.aliAccessKey = data.data.config.access_key
      formState.value.aliAaccessSecret = data.data.config.secret_key
      formState.value.aliAbucket = data.data.config.bucket
      formState.value.aliUrl = data.data.config.cdn
    } else if (activeKey.value == 3) {
      const { data } = await reqSaveSetting({ key: 'Tencent' })
      formState.value.tcAppId = data.data.config.app_id
      formState.value.tcSecretId = data.data.config.secret_id
      formState.value.tcSecretKey = data.data.config.secret_key
      formState.value.tcBucket = data.data.config.bucket
      formState.value.tcUrl = data.data.config.cdn
      formState.value.tcCode = data.data.config.region
    }
  })
  onMounted(() => getSaveSetting())
</script>
<style lang="scss" scoped>
  .remark-introduction {
    :deep(.ant-input) {
      border-radius: 10px;
    }
  }
  :deep(.ant-input-textarea) {
    textarea {
      height: 100%;
      resize: none;
    }
  }
  :deep(.ant-form-item-required) {
    color: #000;
  }
  .text-tips {
    color: #000;
  }
  :deep(.ant-checkbox-wrapper) {
    line-height: 40px !important;
  }
  .login-tips {
    line-height: 30px;
    font-size: 12px;
    color: #adadad;
  }
</style>
