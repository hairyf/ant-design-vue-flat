<!--
 * @Author: Mr.wang
 * @Date: 2021-05-28 15:52:09
 * @LastEditTime: 2021-07-07 16:32:02
 * @Description: 新增用户
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-form
    ref="formRef"
    :model="formState"
    class="bg-background h-544 w-804 mx-auto rounded-2xl py-44 shadow"
    :rules="rules"
    :label-col="{ span: 7 }"
    :wrapper-col="{ span: 16 }"
  >
    <a-form-item label="用户账号" name="accountNumber">
      <cal-input
        v-model:value="formState.accountNumber"
        show-count
        placeholder="输入用户账号"
        :allowClear="true"
        :max-length="20"
        class="w-208"
      ></cal-input>
      <div class="login-tips">账号长度6-18位，以英文开头，且包含英文数字</div>
    </a-form-item>
    <a-form-item label="用户姓名" name="nickname">
      <cal-input
        v-model:value="formState.nickname"
        show-count
        placeholder="输入用户昵称"
        :allowClear="true"
        :max-length="10"
        class="w-208"
      ></cal-input>
    </a-form-item>
    <!-- <a-form-item label="联系人姓名" name="contacts">
      <cal-input
        v-model:value="formState.contacts"
        show-count
        placeholder="输入真实联系人姓名"
        :max-length="10"
        class="w-208"
      ></cal-input>
    </a-form-item> -->
    <a-form-item label="手机号码" name="phone">
      <cal-input
        v-model:value="formState.phone"
        :allowClear="true"
        placeholder="输入手机号码"
        class="w-208"
      ></cal-input>
    </a-form-item>
    <a-form-item label="登录密码" name="password">
      <cal-input-password
        v-model:value="formState.password"
        :allowClear="true"
        placeholder="输入登录密码"
        class="w-208"
      ></cal-input-password>
      <div class="login-tips"> 密码长度6-18位，且包含英文、数字可以包含特殊字符，不包括空格 </div>
    </a-form-item>
    <a-form-item label="确认密码" name="determinePassword">
      <cal-input-password
        v-model:value="formState.determinePassword"
        :allowClear="true"
        placeholder="确认登录密码"
        class="w-208"
      ></cal-input-password>
      <div class="login-tips"> 密码长度6-18位，且包含英文、数字可以包含特殊字符，不包括空格 </div>
    </a-form-item>
  </a-form>
  <div class="flex justify-center mt-56">
    <cal-button class="w-176 mx-24 h-48" type="primary" size="large" @click="submitForm">
      保 存
    </cal-button>
  </div>
</template>
<script lang="ts" setup>
  import { reqNewMembers } from '@/api/user'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { message } from 'ant-design-vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  const formRef = ref()
  const formState = ref({
    accountNumber: '',
    nickname: '',
    phone: '',
    password: '',
    determinePassword: ''
  })
  const router = useRouter()
  const validateAccount = async (rule: any, value: string) => {
    const reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,17})$/
    if (value === '') {
      return Promise.reject('请填写用户账号')
    }
    if (!reg.test(value)) {
      return Promise.reject('账号长度6-18位，以英文开头，且包含英文数字')
    }
    return Promise.resolve()
  }
  const validatePass = async (rule: any, value: string) => {
    const pas = new RegExp(/^(?!\D+$)(?![^a-zA-Z]+$)\S{6,18}$/)
    if (value === '') {
      return Promise.reject('请填写登录密码')
    }
    if (!pas.test(value)) {
      return Promise.reject('密码长度6-18位，且包含英文、数字可以包含特殊字符，不包括空格')
    } else if (formState.value.password != '') {
      formRef.value.validateField('confirmPassword')
    }
    return Promise.resolve()
  }
  const validatePass2 = async (rule: any, value: string) => {
    const pas = new RegExp(/^(?!\D+$)(?![^a-zA-Z]+$)\S{6,18}$/)
    if (value === '') {
      return Promise.reject('请填写确认登录密码')
    } else if (value !== formState.value.password) {
      return Promise.reject('密码请输入一致')
    } else if (!pas.test(value)) {
      return Promise.reject('密码长度6-18位，且包含英文、数字可以包含特殊字符，不包括空格')
    }
    return Promise.resolve()
  }
  const phoneRule = async (rule: any, value: string) => {
    const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    if (value === '') {
      return Promise.reject('请填写手机号码')
    } else if (!reg.test(value)) {
      return Promise.reject('请填写正确的手机号码')
    }
    return Promise.resolve()
  }
  const { rules, validate } = useAntdForm(formRef, {
    accountNumber: [{ required: true, validator: validateAccount, trigger: 'blur' }],
    nickname: [{ required: true, message: '请填写用户昵称', trigger: 'blur' }],
    phone: [{ required: true, validator: phoneRule, trigger: 'blur' }],
    password: [{ required: true, validator: validatePass, trigger: 'change' }],
    determinePassword: [{ required: true, validator: validatePass2, trigger: 'change' }]
  })
  // 提交表单
  const submitForm = async () => {
    await validate()
    await reqNewMembers({
      username: formState.value.accountNumber,
      nickname: formState.value.nickname,
      mobile: formState.value.phone,
      password: formState.value.password,
      repassword: formState.value.determinePassword
    })
    message.success('操作成功！')
    router.go(-1)
  }
</script>
<style lang="scss" scoped>
  :deep(.ant-form-item-required) {
    color: #000;
  }
  .text-tips {
    color: #000;
  }
  .login-tips {
    line-height: 30px;
    font-size: 12px;
    color: #adadad;
  }
</style>
