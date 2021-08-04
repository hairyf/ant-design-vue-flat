<!--
 * @Author: Zhilong
 * @Date: 2021-06-18 17:54:09
 * @LastEditTime: 2021-07-02 14:37:17
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="w-full h-full flex justify-center items-center">
    <a-card class="w-550 h-750 shadow drop-shadow-sm rounded-2xl">
      <a-form ref="formRef" :rules="rules" :model="form">
        <div class="mt-64 px-56">
          <div class="text-2xl font-medium mb-40"> 找回密码 </div>
          <a-form-item name="mobile">
            <a-input
              v-model:value="form.mobile"
              class="h-48 rounded border-2"
              placeholder="请输入手机号码"
            />
          </a-form-item>
          <a-form-item name="code">
            <div class="flex">
              <a-input
                v-model:value="form.code"
                class="h-48 rounded border-2 mr-16"
                placeholder="请输入验证码"
              />
              <a-button
                class="h-48 rounded bg-blue text-sm text-white"
                @click="startTimeDown"
                :disabled="timeDownStatus"
              >
                {{ timeDownStatus ? `${current.seconds}秒重新发送` : '发送验证码' }}
              </a-button>
            </div>
          </a-form-item>
          <a-form-item name="password">
            <a-input
              v-model:value="form.password"
              class="h-48 rounded border-2"
              placeholder="请设置您的登录密码"
              type="password"
            />
          </a-form-item>
          <a-form-item name="repassword">
            <a-input
              v-model:value="form.repassword"
              class="h-48 rounded border-2"
              placeholder="请再次输入您的密码"
              type="password"
            />
          </a-form-item>
          <a-button
            class="h-56 w-full bg-blue text-lg mt-8 text-white rounded-full"
            @click="onClickRegister"
          >
            确定
          </a-button>
        </div>
        <div class="flex justify-center mt-128">
          <span>已有账号，立即</span>
          <a class="text-blue-400" @click="$router.push('/auth/login')"> 登录 </a>
        </div>
      </a-form>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
  import { reqPhoneReset, reqSendCode } from '@/api/auth'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import router from '@/router'
  import { useCountDown } from '@vant/use'
  import { message } from 'ant-design-vue'
  import { ref, reactive } from 'vue'
  // 表单数据
  const form = reactive({
    mobile: '',
    password: '',
    repassword: '',
    code: ''
  })
  const formRef = ref(null)
  // 是否包含数字和字母
  const isNumberLetter = (rule: any, value: string) => {
    return /([0-9A-z]){1,}/.test(value) ? Promise.resolve() : Promise.reject('账号需要包含数字')
  }
  // 是否首字母开头
  const isLetter = (rule: any, value: string) => {
    return /^[A-z]/.test(value) ? Promise.resolve() : Promise.reject('账号需要以字母开头')
  }
  const { rules, validate } = useAntdForm(formRef, {
    mobile: { required: true, message: '手机号为必填项' },
    password: [
      { required: true, message: '密码为必填项', trigger: 'blur' },
      { trigger: 'blur', message: '长度限制 6 ~ 18 位', min: 6, max: 18 },
      { trigger: 'blur', validator: isNumberLetter },
      { trigger: 'blur', validator: isLetter }
    ],
    repassword: [
      { required: true, message: '确认密码为必填项' },
      {
        trigger: 'blur',
        validator(rule: any, value: string) {
          return value === form?.password
            ? Promise.resolve()
            : Promise.reject('确认密码与密码不一致')
        }
      }
    ],
    code: { required: true, message: '验证码为必填项' }
  })

  // 倒计时
  const timeDownStatus = ref(false)
  const startTimeDown = async () => {
    if (!timeDownStatus.value) {
      await validate(['mobile'])
      await reqSendCode({ phone: form.mobile, event: 'resetByMobile' })
      message.success('验证码发送成功')
      timeDownStatus.value = true
      reset()
      start()
    }
  }
  const { start, reset, current } = useCountDown({
    time: 60 * 1000,
    onFinish: () => (timeDownStatus.value = false)
  })

  const onClickRegister = async () => {
    await validate()
    await reqPhoneReset(form)
    message.success('密码修改成功')
    router.push('/auth/login')
  }
</script>
<style lang="scss" scoped>
  :deep(.ant-form-item-control-wrapper) {
    flex: 1;
  }
  :deep(.ant-form-item) {
    padding-bottom: 16px;
    // margin-bottom: 40px;
  }
</style>
