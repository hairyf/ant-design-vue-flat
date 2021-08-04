<!--
 * @Author: Mr.wang
 * @Date: 2021-06-09 11:34:40
 * @LastEditTime: 2021-06-25 15:44:57
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-card v-if="isAuthentication" style="width: 1200px">
    <div class="text-base mb-24">认证类型</div>
    <a-form layout="vertical" :model="formState" ref="formRef" :rules="rules">
      <a-form-item>
        <a-radio-group v-model:value="formState.type">
          <a-radio class="mr-20" :value="1">企业认证</a-radio>
          <a-radio :value="2">个人认证</a-radio>
        </a-radio-group>
      </a-form-item>
      <div style="height: 1px; width: 800px; background-color: #c4c4c4; margin-bottom: 28px"></div>
      <div v-if="formState.type == 1">
        <div class="flex">
          <a-form-item label="企业名称" name="company_name" style="margin-right: 70px">
            <a-input
              v-model:value="formState.company_name"
              placeholder="请输入企业名称"
              style="width: 272px"
            />
          </a-form-item>
          <a-form-item label="社会统一信用代码" name="company_code">
            <a-input
              v-model:value="formState.company_code"
              placeholder="请输入信用代码"
              style="width: 272px"
            />
          </a-form-item>
        </div>
        <a-form-item label="营业执照" name="business_license">
          <div
            class="w-100 flex justify-center items-center"
            style="border-radius: 10px; border: 1px dashed #d9d9d9; height: 134px"
            v-if="!formState.business_license"
            @click="onClickUpload('3', 'business_license')"
          >
            <i class="pf-add-image text-4xl text-primary"></i>
          </div>
          <div
            @click="onClickUpload('3', 'business_license')"
            style="height: 134px"
            class="w-100"
            v-else
          >
            <cal-image :src="formState.business_license" />
          </div>
          <div class="text-xs mt-10" style="color: #999">
            提示: 仅支持JPeg、jpg、png、bmp格式，不超过2M
          </div>
        </a-form-item>
        <a-form-item label="法人姓名" name="name">
          <a-input
            v-model:value="formState.name"
            placeholder="请输入法人姓名"
            style="width: 272px"
          />
        </a-form-item>
        <div class="flex">
          <a-form-item label="法人身份证号码" name="idcard" style="margin-right: 70px">
            <a-input
              v-model:value="formState.idcard"
              placeholder="请输入法人身份证号码"
              style="width: 272px"
            />
          </a-form-item>
          <a-form-item label="法人联系手机号" name="phone">
            <a-input
              v-model:value="formState.phone"
              placeholder="请输入法人联系方式"
              style="width: 272px"
            />
          </a-form-item>
        </div>
        <a-form-item label="办公地址" name="address">
          <a-input
            v-model:value="formState.address"
            placeholder="请输入办公地址"
            style="width: 614px"
          />
        </a-form-item>
      </div>
      <div v-else>
        <div class="flex">
          <a-form-item label="姓名" name="name" style="margin-right: 70px">
            <a-input v-model:value="formState.name" placeholder="请输入姓名" style="width: 272px" />
          </a-form-item>
          <a-form-item label="身份证号码" name="idcard">
            <a-input
              v-model:value="formState.idcard"
              placeholder="请输入身份证号码"
              style="width: 272px"
            />
          </a-form-item>
        </div>
        <div class="flex">
          <a-form-item
            class="mb-0"
            label="身份证证件照"
            name="idcard_front"
            style="margin-right: 70px"
          >
            <div
              class="flex justify-center items-center"
              style="border-radius: 10px; border: 1px dashed #d9d9d9; width: 134px; height: 85px"
              v-if="!formState.idcard_front"
              @click="onClickUpload('2', 'idcard_front')"
            >
              <i class="pf-add-image text-4xl text-primary"></i>
            </div>
            <div
              @click="onClickUpload('2', 'idcard_front')"
              style="width: 134px; height: 85px"
              v-else
            >
              <cal-image :src="formState.idcard_front" />
            </div>
            <div class="text-xs mt-10" style="color: #999"> ① 正面（人头照） </div>
          </a-form-item>
          <a-form-item class="mb-0" name="idcard_back" style="margin-top: 30px">
            <div
              class="flex justify-center items-center"
              style="border-radius: 10px; border: 1px dashed #d9d9d9; width: 134px; height: 85px"
              v-if="!formState.idcard_back"
              @click="onClickUpload('2', 'idcard_back')"
            >
              <i class="pf-add-image text-4xl text-primary"></i>
            </div>
            <div
              @click="onClickUpload('2', 'idcard_back')"
              style="width: 134px; height: 85px"
              v-else
            >
              <cal-image :src="formState.idcard_back" />
            </div>
            <div class="text-xs mt-10" style="color: #999"> ② 反面 ( 国徽照 ) </div>
          </a-form-item>
        </div>
        <div class="text-xs mb-24" style="color: #999">
          提示: 仅支持JPeg、jpg、png、bmp格式，不超过2M
        </div>
        <div class="flex">
          <a-form-item label="联系手机号" name="phone" style="margin-right: 70px">
            <a-input
              v-model:value="formState.phone"
              placeholder="请输入手机号码"
              style="width: 272px"
            />
          </a-form-item>
          <a-form-item label="联系地址" name="address">
            <a-input
              v-model:value="formState.address"
              placeholder="请输入联系地址(详细到门牌号)"
              style="width: 272px"
            />
          </a-form-item>
        </div>
      </div>
      <a-button class="mt-6" type="primary" shape="round" style="width: 150px" @click="commitAuth">
        提交认证
      </a-button>
    </a-form>
  </a-card>
  <a-card v-else style="width: 1200px">
    <a-alert
      v-if="isAuthenticationSuccess === 0"
      style="width: max-content; margin-bottom: 17px"
      class="rounded-3xl border-none text-base px-16"
      message="审核状态：审核中&nbsp;&nbsp;&nbsp;请耐心等待审核"
      showIcon
      type="warning"
    >
      <template v-slot:icon><i class="pf-error-alert text-2xl"></i></template>
    </a-alert>
    <a-alert
      v-if="isAuthenticationSuccess === 2"
      style="width: max-content; margin-bottom: 17px"
      class="rounded-3xl border-none text-base px-16"
      :message="`审核状态：已拒绝 &nbsp;&nbsp;&nbsp;拒绝原因：${formState?.reason}`"
      showIcon
      type="error"
    >
      <template v-slot:icon><i class="pf-error-alert text-2xl"></i></template>
    </a-alert>
    <a-form :model="formState" :label-col="{ span: 3 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="认证类型" class="mb-6">
        {{ formState.type == 1 ? '企业认证' : '个人认证' }}
      </a-form-item>
      <div v-if="formState.type == 1">
        <a-form-item label="企业名称" class="mb-6">
          {{ formState.company_name }}
        </a-form-item>
        <a-form-item label="社会统一信息代码" class="mb-6">
          {{ formState.company_code }}
        </a-form-item>
        <a-form-item label="营业执照" class="mb-6">
          <div style="width: 100px; height: 134px">
            <cal-image :src="formState.business_license" />
          </div>
        </a-form-item>
        <a-form-item label="办公地址" class="mb-6">
          {{ formState.address }}
        </a-form-item>
        <a-form-item label="法人姓名" class="mb-6">
          {{ formState.name }}
        </a-form-item>
        <a-form-item label="法人身份证号码" class="mb-6">
          {{ formState.idcard }}
        </a-form-item>
        <a-form-item label="法人联系手机号" class="mb-6">
          {{ formState.phone }}
        </a-form-item>
      </div>
      <div v-else>
        <a-form-item label="身份照证件号码" class="mb-6">
          {{ formState.idcard }}
        </a-form-item>
        <a-form-item label="营业执照" class="mb-6">
          <div class="flex">
            <div style="width: 134px; height: 85px; margin-right: 30px">
              <cal-image :src="formState.idcard_front" />
            </div>
            <div style="width: 134px; height: 85px">
              <cal-image :src="formState.idcard_back" />
            </div>
          </div>
        </a-form-item>
        <a-form-item label="联系手机号" class="mb-6">
          {{ formState.phone }}
        </a-form-item>
        <a-form-item label="联系地址" class="mb-6">
          {{ formState.address }}
        </a-form-item>
      </div>
    </a-form>
    <a-button
      v-if="isAuthenticationSuccess === 2"
      class="mt-16"
      type="primary"
      shape="round"
      style="width: 150px"
      @click="isAuthentication = true"
    >
      重新认证
    </a-button>
  </a-card>
</template>
<script setup lang="ts">
  import { reqAuthenticationInfo, reqAuthenticationCommit } from '@/api/authentication'
  import { reqImageUpload } from '@/api/common'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { selectImages } from '@/utils/index'
  import { message } from 'ant-design-vue'
  import { ref } from 'vue'
  const formState = ref({
    // <企业认证>
    // 认证类型
    type: 1,
    // 企业名称
    company_name: '',
    // 社会统一信用代码
    company_code: '',
    // 营业执照
    business_license: '',
    // 法人姓名
    name: '',
    // 法人身份证号码
    idcard: '',
    // 法人联系手机号
    phone: '',
    // 办公地址
    address: '',
    // <个人认证>
    // 姓名
    // name: '',
    // 身份证号码
    // idcard: '',
    // 身份证证件照正面
    idcard_front: '',
    // 身份证证件照反面
    idcard_back: '',
    // 联系手机号
    // phone: '',
    // 联系地址
    // address: ''
    // 审核失败原因
    reason: ''
  })
  // 获得form对象
  const formRef = ref(null)
  // 验证规则
  const formRules = {
    company_name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
    company_code: [{ required: true, message: '请输入信用代码', trigger: 'blur' }],
    business_license: [{ required: true, message: '请选择营业执照图片', trigger: 'blur' }],
    // name: [{ required: true, message: '请输入法人姓名', trigger: 'blur' }],
    // idcard: [{ required: true, message: '请输入法人身份证号码', trigger: 'blur' }],
    // phone: [{ required: true, message: '请输入法人联系方式', trigger: 'blur' }],
    // address: [{ required: true, message: '请输入办公地址', trigger: 'blur' }],
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    idcard: [{ required: true, message: '请输入身份证号码', trigger: 'blur' }],
    idcard_front: [{ required: true, message: '请输入身份证正面照', trigger: 'blur' }],
    idcard_back: [{ required: true, message: '请输入身份证反面照', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
    address: [{ required: true, message: '请输入联系地址', trigger: 'blur' }]
  }
  // 使用hook
  const { rules, validate } = useAntdForm(formRef, formRules)

  const onClickUpload = async (
    type: string,
    name: 'business_license' | 'idcard_back' | 'idcard_front'
  ) => {
    // 选择图片
    const files = await selectImages(false)
    // 是否符合图片
    const isImages = files.some((v) => v.type.search('image') !== -1)
    // 大小是否符合
    const isAccordSize = files.some((v) => v.size / 1000 / 1024 < 2)
    if (!isImages) return message.warning('请选择图片!')
    if (!isAccordSize) return message.warning('图片超出大小!')

    message.info('上传中..', 1.5)
    // 进行上传
    const { data } = await reqImageUpload({ file: files[0], type })
    message.success('上传成功', 1.5)
    formState.value[name] = data.data.path.show
  }

  // 是否提交认证
  const isAuthentication = ref(true)
  // 是否认证成功
  const isAuthenticationSuccess = ref(2)

  const getAuthenticationInfo = () => {
    reqAuthenticationInfo()
      .then(({ data }) => {
        // 第一次审核
        isAuthentication.value = false
        formState.value = data.data
        // 审核状态
        isAuthenticationSuccess.value = data.data?.status === undefined ? 2 : data.data?.status
        // 审核类型
        if (data.data.type === 1) {
          formState.value.business_license = data.data?.business_license.url
        } else if (data.data.type === 2) {
          formState.value.idcard_back = data.data?.idcard_back.url
          formState.value.idcard_front = data.data?.idcard_front.url
        }
      })
      .catch((error) => (isAuthentication.value = error.data.code === 4))
  }
  const commitAuth = async () => {
    await validate()
    await reqAuthenticationCommit(formState.value)
    getAuthenticationInfo()
  }
  getAuthenticationInfo()
</script>
<style lang="scss" scoped></style>
