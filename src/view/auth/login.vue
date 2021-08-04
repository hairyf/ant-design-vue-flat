<!--
 * @Author: Zhilong
 * @Date: 2021-06-18 17:53:43
 * @LastEditTime: 2021-07-01 15:38:34
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="w-full h-full flex justify-center items-center">
    <a-card class="w-550 h-750 shadow drop-shadow-sm rounded-2xl">
      <div class="grid grid-rows-1 gap-40 mt-64 px-56">
        <div class="text-2xl font-medium"> 早上好，欢迎使用Weitshop </div>
        <a-form :model="form" :rules="rules" ref="formRef">
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane :key="0" class="pt-32">
              <template #tab>
                <span :class="[activeKey !== 0 && 'text-gray-400']" class="text-lg">密码登录</span>
              </template>
              <template v-if="activeKey === 0">
                <a-form-item name="account">
                  <a-input
                    class="h-48 rounded border-2"
                    v-model:value="form.account"
                    placeholder="请输入手机号码"
                  />
                </a-form-item>
                <a-form-item name="password">
                  <a-input
                    class="h-48 rounded border-2"
                    v-model:value="form.password"
                    placeholder="请输入登录密码"
                    type="password"
                  />
                </a-form-item>
              </template>
            </a-tab-pane>
            <a-tab-pane :key="1" class="pt-32">
              <template #tab>
                <span :class="[activeKey !== 1 && 'text-gray-400']" class="text-lg">免密登录</span>
              </template>
              <template v-if="activeKey === 1">
                <a-form-item name="mobile">
                  <a-input
                    class="h-48 rounded border-2"
                    v-model:value="form.mobile"
                    placeholder="请输入手机号码"
                  />
                </a-form-item>
                <a-form-item name="code">
                  <div class="flex">
                    <a-input
                      class="h-48 rounded border-2 mr-16"
                      v-model:value="form.code"
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
              </template>
            </a-tab-pane>
          </a-tabs>
        </a-form>
        <div class="flex justify-between">
          <div>
            <a-checkbox
              class="mr-8"
              :checked="memoryPassword"
              @change="memoryPassword = $event.target.checked"
            />
            <span>记住密码</span>
          </div>
          <div>
            <a class="text-blue-400" @click="$router.push('/auth/retrieve')">忘记密码</a>
          </div>
        </div>
        <a-button class="h-56 bg-blue text-lg mt-8 text-white rounded-full" @click="onAccoutCheck">
          确定
        </a-button>
      </div>
      <div class="flex justify-center mt-96">
        <a class="text-blue-400 text-sm" @click="$router.push('/auth/register')">
          没有账号？立即注册
        </a>
      </div>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
  import { reqSendCode } from '@/api/auth'
  import { ref, reactive } from '@vue/reactivity'
  import { useAntdForm } from '@/hooks/use-antd-form'
  import { useCountDown } from '@vant/use'
  import store from '@/store'
  import { message } from 'ant-design-vue'
  import router from '@/router'
  const activeKey = ref(0)
  // 是否记录密码
  const memoryPassword = ref(true)
  // 表单信息
  const form = reactive({
    account: '',
    mobile: '',
    password: '',
    code: ''
  })
  // 是否首字母开头
  const isLetter = (rule: any, value: string) => {
    return /^[A-z]/.test(value) ? Promise.resolve() : Promise.reject('账号需要以字母开头')
  }
  // 是否包含数字和字母
  const isNumberLetter = (rule: any, value: string) => {
    return /([0-9A-z]){1,}/.test(value) ? Promise.resolve() : Promise.reject('账号需要包含数字')
  }
  const formRef = ref()
  const { rules, validate } = useAntdForm(formRef, {
    account: [{ trigger: 'blur', message: '手机号为必填项', required: true }],
    mobile: { required: true, message: '手机号为必填项', trigger: 'blur' },
    password: [
      { required: true, message: '密码为必填项', trigger: 'blur' },
      { trigger: 'blur', message: '长度限制 6 ~ 18 位', min: 6, max: 18 },
      { trigger: 'blur', validator: isNumberLetter }
    ],
    code: { required: true, message: '验证码为必填项', trigger: 'blur' }
  })

  // 倒计时
  const timeDownStatus = ref(false)
  const startTimeDown = async () => {
    if (!timeDownStatus.value) {
      await reqSendCode({ phone: form.mobile, event: 'loginByMobile' })
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

  // 进行账号密码校验
  const onAccoutCheck = async () => {
    await validate()
    if (activeKey.value === 0) {
      await store.dispatch('accountLogin', { account: form.account, password: form.password })
      message.success('登录成功')
      router.replace('/console')
    } else {
      await store.dispatch('phoneLogin', { mobile: form.mobile, code: form.code })
      message.success('登录成功')
      router.replace('/console')
    }
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
