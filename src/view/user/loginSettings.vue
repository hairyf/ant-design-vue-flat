<!--
 * @Author: Mr.wang
 * @Date: 2021-05-28 15:47:35
 * @LastEditTime: 2021-07-07 16:06:29
 * @Description: 登录注册设置
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
      <cal-tab-pane tab="注册设置" :key="1" class="shadow py-56">
        <a-form-item label="店铺数量限制" name="limit">
          <cal-radio-group v-model:value="formState.limit">
            <cal-radio value="0">不限制数量</cal-radio>
            <cal-radio value="1">自定义创建店铺数量 </cal-radio>
          </cal-radio-group>
          <div class="text-tips" v-if="formState.limit == '1'">
            每个用户最多可创建
            <cal-input
              v-model:value="formState.establish"
              placeholder="请输入"
              @input="formState.establish = $filterInteger(formState.establish)"
              class="w-96"
            ></cal-input>
            家店铺
          </div>
        </a-form-item>
        <a-form-item label="试用店铺" name="trialNum">
          <div>
            每个用户最多可创建
            <cal-input
              v-model:value="formState.trialNum"
              placeholder="请输入"
              @input="formState.trialNum = $filterInteger(formState.trialNum)"
              class="w-96"
            ></cal-input>
            家试用店铺
          </div>
          <div class="login-tips">试用店铺不占用店铺数量</div>
        </a-form-item>
        <a-form-item label="注册方式" name="checkedList">
          <a-checkbox-group v-model:value="formState.checkedList">
            <cal-checkbox value="mobile"> 手机号注册 </cal-checkbox>
            <div class="flex items-center">
              <div class="login-tips">当忘记密码时使用手机号进行找回</div>
              <!-- <cal-button type="link"> 设置短信接口 </cal-button>
              <div class="w-2 h-12 bg-primary"></div>
              <cal-button type="link"> 设置短信内容模板 </cal-button> -->
            </div>
            <cal-checkbox value="email"> 邮箱注册 </cal-checkbox>
            <div class="flex items-center">
              <div class="login-tips">当忘记密码时使用手机号进行找回</div>
              <cal-button type="link" @click="mailboxBtn"> 设置邮箱接口 </cal-button>
              <!-- <div class="w-2 h-12 bg-primary"></div>
              <cal-button type="link"> 设置邮箱内容模板 </cal-button> -->
            </div>
            <cal-checkbox value="wx"> 微信扫码注册 </cal-checkbox>
            <br />
            <cal-checkbox value="username"> 账号注册 </cal-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="服务协议" name="service">
          <cal-switch v-model:checked="formState.service" />
        </a-form-item>
        <template v-if="formState.service">
          <a-form-item label="协议名称" name="name">
            <cal-input
              v-model="formState.name"
              show-count
              placeholder="输入协议名称"
              :max-length="10"
              class="w-208"
            ></cal-input>
          </a-form-item>
          <a-form-item label="协议内容" name="remark" class="remark-introduction">
            <cal-textarea
              class="mt-10 rounded-xl h-128"
              v-model:value="formState.remark"
              showCount
              :maxlength="1000"
              placeholder="请输入协议内容"
            />
          </a-form-item>
        </template>
      </cal-tab-pane>
      <cal-tab-pane tab="登录设置" :key="2" :minHeight="350" class="shadow py-56">
        <a-form-item label="唯一登录方式" name="signIn">
          <cal-switch v-model:checked="formState.signIn" />
          <div class="login-tips">禁止同一个用户在多台电脑登录</div>
        </a-form-item>
        <a-form-item label="图形验证码" name="code">
          <cal-switch v-model:checked="formState.code" />
          <div class="login-tips">用户登录是否需要验证码验证，防止恶意登录</div>
          <div class="text-tips" v-if="formState.code"
            >登录失败次数大于
            <cal-input
              class="w-96"
              v-model:value="formState.failNum"
              @input="formState.failNum = $filterInteger(formState.failNum)"
              placeholder="请输入"
            ></cal-input
            >次后需要进行图形验证</div
          >

          <div class="login-tips">登录失败次数不超过10次</div>
        </a-form-item>
      </cal-tab-pane>
    </cal-tabs>
  </a-form>
  <div class="flex justify-center mt-56">
    <cal-button class="w-192 mx-24 h-48" type="primary" size="large" @click="submitForm">
      保 存
    </cal-button>
  </div>
  <template v-if="show">
    <cal-message-dialog v-model="show" title="设置邮箱接口" :width="532" @ok="setMailbox">
      <a-form
        :model="formMailbox"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 14 }"
        ref="formRef"
        :rules="rules"
      >
        <a-form-item label="选择邮箱类型">
          <cal-radio-group v-model:value="formMailbox.type">
            <cal-radio value="0">QQ邮箱</cal-radio>
            <cal-radio value="1">网易163邮箱</cal-radio>
          </cal-radio-group>
        </a-form-item>
        <template v-if="formMailbox.type == '0'">
          <a-form-item label="邮箱标题" name="qqSenderName">
            <cal-input
              placeholder="输入邮箱标题"
              v-model="formMailbox.qqSenderName"
              class="w-192"
            />
          </a-form-item>
          <a-form-item label="发送者邮箱" name="qqTheme">
            <cal-input placeholder="输入发送者邮箱" v-model="formMailbox.qqTheme" class="w-192" />
          </a-form-item>
          <a-form-item label="Smtp身份验证码" name="qqSmtpCode">
            <cal-input
              placeholder="输入Smtp身份验证"
              v-model="formMailbox.qqSmtpCode"
              class="w-192"
            />
            <div class="leading-6 text-gray-darkmin text-xs">
              如未申请QQ邮箱的Smtp身份验证，请点击 <br />
              <span class="text-primary">如何获取Smtp申请验证码</span> 进行申请
            </div>
          </a-form-item>
        </template>
        <template v-if="formMailbox.type == '1'">

          <a-form-item label="邮箱标题" name="cloudTheme">
            <cal-input
                placeholder="输入邮箱标题"
                v-model="formMailbox.cloudTheme"
                class="w-192"
            />
          </a-form-item>

          <a-form-item label="发送者邮箱" name="cloudSenderName">
            <cal-input
              placeholder="输入发送者邮箱"
              v-model="formMailbox.cloudSenderName"
              class="w-192"
            />
          </a-form-item>

          <a-form-item label="Smtp身份验证码" name="cloudSmtpCode">
            <cal-input
              placeholder="输入Smtp身份验证"
              v-model="formMailbox.cloudSmtpCode"
              class="w-192"
            />
            <div class="leading-6 text-gray-darkmin text-xs">
              如未申请网易163邮箱的Smtp身份验证，请点击 <br />
              <span class="text-primary">如何获取Smtp申请验证码</span> 进行申请
            </div>
          </a-form-item>
        </template>
      </a-form>
    </cal-message-dialog>
  </template>
</template>
<script lang="ts" setup>
  import {
    reqLoginRegistration,
    reqSetLoginRegistration,
    reqGet163email,
    reqSet163Email,
    reqGetQqEmail,
    reqSetQqEmail
  } from '@/api/user'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { message } from 'ant-design-vue'
  import { onMounted, ref } from 'vue'
  const activeKey = ref(1)
  const formRef = ref()
  const show = ref(false)
  const formMailbox = ref({
    type: '0',
    qqSenderName: '',
    qqTheme: '',
    qqSmtpCode: '',
    cloudSenderName: '',
    cloudTheme: '',
    cloudSmtpCode: ''
  })
  const formState = ref({
    // 限制数量
    limit: '0',
    // 创建的店铺
    establish: '',
    // 试用店铺
    trialNum: '',
    service: false,
    // 协议名称
    name: '',
    // 协议内容
    remark: '',
    signIn: false,
    code: false,
    failNum: '',
    checkedList: []
  })
  const limitRule = async (rule: any, value: number) => {
    if (value == 1) {
      if (formState.value.establish === '') {
        return Promise.reject('请填写店铺数量')
      }
      return Promise.resolve()
    }
  }
  const failNumRule = async (rule: any, value: boolean) => {
    if (value == true) {
      if (formState.value.failNum === '') {
        return Promise.reject('请填写次数')
      }
      return Promise.resolve()
    }
  }
  const { validate, rules } = useAntdForm(formRef, {
    limit: [{ required: true, validator: limitRule, trigger: 'blur' }],
    trialNum: [{ required: true, message: '请填写试用店铺数量', trigger: 'blur' }],
    name: [{ required: true, message: '请填写协议名称', trigger: 'blur' }],
    remark: [{ required: true, message: '请填写协议内容', trigger: 'blur' }],
    service: [{ type: 'boolean', required: true, message: '请选择', trigger: 'blur' }],
    signIn: [{ type: 'boolean', required: true, message: '请选择', trigger: 'blur' }],
    code: [{ type: 'boolean', required: true, validator: failNumRule, trigger: 'change' }],
    checkedList: [
      { type: 'array', required: true, message: '请至少选择一种注册方式', trigger: 'blur' }
    ],
    qqSenderName: [{ required: true, message: '请填邮箱标题', trigger: 'blur' }],
    qqSmtpCode: [{ required: true, message: '请填写Smtp身份验证', trigger: 'blur' }],
    cloudSenderName: [{ required: true, message: '输入发送者邮箱', trigger: 'blur' }],
    cloudSmtpCode: [{ required: true, message: '请填写Smtp身份验证', trigger: 'blur' }],
    qqTheme: [{ required: true, message: '请填写发送者邮箱', trigger: 'blur' }],
    cloudTheme: [{ required: true, message: '请输入邮箱标题', trigger: 'blur' }]
  })
  // 提交表单
  const submitForm = async () => {
    await validate()
    setLoginRegistration()
  }
  // 邮箱设置
  const mailboxBtn = async () => {
    show.value = true
    const { data } = await reqGetQqEmail()
    formMailbox.value.qqSenderName = data.data.config.nickname
    formMailbox.value.qqSmtpCode = data.data.config.password
    formMailbox.value.qqTheme = data.data.config.email
    get163email()
  }
  const get163email = async () => {
    const { data } = await reqGet163email()
    formMailbox.value.cloudSenderName = data.data.config.nickname
    formMailbox.value.cloudSmtpCode = data.data.config.password
    formMailbox.value.cloudTheme = data.data.config.email
  }
  const setMailbox = async () => {
    await validate()
    if (formMailbox.value.type == '0') {
      await reqSetQqEmail({
        status: 1,
        value: {
          port: '',
          host: '',
          nickname: formMailbox.value.qqSenderName,
          password: formMailbox.value.qqSmtpCode,
          email: formMailbox.value.qqTheme
        }
      })
    } else {
      reqSet163Email({
        status: 1,
        value: {
          port: '',
          host: '',
          nickname: formMailbox.value.cloudSenderName,
          password: formMailbox.value.cloudSmtpCode,
          email: formMailbox.value.cloudTheme
        }
      })
    }
    message.success('操作成功！')
  }
  // 设置登录注册
  const setLoginRegistration = async () => {
    const value = {
      shop: {
        probation: {
          num: formState.value.trialNum
        },
        official: {
          type: formState.value.limit,
          num: formState.value.establish
        }
      },
      register: formState.value.checkedList,
      agreement: {
        status: formState.value.service ? 1 : 0,
        name: formState.value.name,
        dec: formState.value.remark
      },
      login: {
        speediness: formState.value.signIn ? 1 : 0,
        checkcode: {
          type: formState.value.code ? 1 : 0,
          num: formState.value.failNum
        }
      }
    }
    await reqSetLoginRegistration({
      status: 1,
      value
    })
    message.success('操作成功！')
    getRegister()
  }
  // // 获取登录注册数据
  const getRegister = async () => {
    const { data } = await reqLoginRegistration()
    const config = data.data.config
    formState.value.limit = config.shop.official.type
    formState.value.establish = config.shop.official.num
    formState.value.trialNum = config.shop.probation.num
    formState.value.service = config.agreement.status == 1
    formState.value.name = config.agreement.name
    formState.value.remark = config.agreement.dec
    formState.value.checkedList = config.register
    formState.value.signIn = config.login.speediness == 1
    formState.value.code = config.login.checkcode.type == 1
    formState.value.failNum = config.login.checkcode.num
  }
  onMounted(() => getRegister())
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
    color: #001426;
  }
  .text-tips {
    color: #000;
  }
  :deep(.ant-checkbox-wrapper) {
    line-height: 40px !important;
  }
  :deep(.ant-form-item) {
    margin-bottom: 10px;
  }
  .login-tips {
    line-height: 30px;
    font-size: 12px;
    color: #adadad;
  }
</style>
