<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-23 18:01:09
 * @LastEditTime: 2021-05-10 15:18:46
 * @Description: 
 * @LastEditors: Mr.wang
-->
<template>
  <div class="login-container-right-panel">
    <div class="login-container-title">重置密码</div>
    <div class="login-container-tips">Reset Password</div>
    <div class="login-container-tips verify-email"
      >验证码已发送至 <span class="text">{{ email }}</span></div
    >

    <el-form
      ref="accountForm"
      :model="accountInfo"
      :rules="accountRules"
      class="login-container-form"
    >
      <el-form-item prop="code">
        <el-input placeholder="验证码" v-model="accountInfo.code">
          <template v-slot:append>
            <span v-if="isResend" class="login-container-seed-btns verification-code"
              >{{ count }}秒重新发送</span
            >
            <span v-else @click="next" class="login-container-seed-btns verification-code"
              >重新发送</span
            >
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="密码" v-model="accountInfo.password"></el-input>
        <Password :input="accountInfo.password" />
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input
          type="password"
          placeholder="确认密码"
          v-model="accountInfo.repassword"
          @keyup.enter="backLogin"
        ></el-input>
        <Password :input="accountInfo.password" />
      </el-form-item>
    </el-form>
    <el-button @click="backLogin" class="login-container-subs-btns wechat-login" type="primary">
      <span class="text">提交</span>
    </el-button>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { reqAuthResetByEmail, reqAuthSendResetByEmail } from '@/api/user'
  import { ElMessage } from 'element-plus'
  import Password from '@/components/password-strength/password-strength.vue'
  const router = useRouter()
  const route = useRoute()
  const email: any = route.query.id
  const accountInfo = reactive({
    email: '',
    password: '',
    repassword: '',
    code: ''
  })
  accountInfo.email = email
  // 密码验证规则
  const passwordVerification = (rule: any, value: any, callback: any) => {
    const isAccountNum = /[0-9]/.test(value)
    const isAccountLarge = /[A-Z]/.test(value)
    const isAccountSmall = /[a-z]/.test(value)
    if (value == '') {
      callback(new Error('密码不能为空'))
    }
    if (!isAccountNum) {
      callback(new Error('密码需要包含数字'))
    }
    if (!(isAccountLarge && isAccountSmall)) {
      callback(new Error('密码需要包含大小写字母'))
    }
    if (!(value.length <= 18 && value.length >= 6)) {
      callback(new Error('密码长度需要在6到18位之间'))
    }
    callback()
  }
  // 密码确认验证规则
  const checkPasswordVerification = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== accountInfo.password) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }

  // // 账号注册验证规则
  const accountRules = reactive({
    password: [{ validator: passwordVerification, trigger: 'blur' }],
    repassword: [{ validator: checkPasswordVerification, trigger: 'blur' }],
    code: [
      {
        required: true,
        message: '验证码不能为空',
        trigger: 'blur'
      }
    ]
  })
  const count = ref(60)
  const isResend = ref(true)
  const resetTime = (time: any) => {
    const timer = setInterval(() => {
      time.value--
      if (time.value < 1) {
        clearInterval(timer)
        isResend.value = false
      }
    }, 1000)
  }
  resetTime(count)
  // 重新发送验证码
  const next = () => {
    count.value = 60
    isResend.value = true
    resetTime(count)
    reqAuthSendResetByEmail({ email }).then((res) => {
      if (res.data.code != 0) {
        ElMessage({
          showClose: true,
          message: '发送失败, 请检查邮箱是否正确',
          type: 'error'
        })
      }
    })
  }
  const accountForm = ref<any>()
  // 提交重置密码
  const backLogin = () => {
    accountForm.value.validate((valid: any) => {
      if (valid) {
        reqAuthResetByEmail(accountInfo).then((res) => {
          if (res.data.code == 0) {
            router.push('resetPasswordSuccess')
          } else {
            ElMessage({
              showClose: true,
              message: '发送失败, 请检查邮箱是否正确',
              type: 'error'
            })
          }
        })
      } else {
        return false
      }
    })
  }
</script>

<style lang="scss" scoped>
  .verify-email {
    font-size: 14px !important;
    .text {
      color: var(--color-primary);
    }
  }
  :deep(.el-input-group) {
    margin: 25px 0;
  }
  .login-container {
    /* 自定义输入框 */
    :deep(.el-input__inner) {
      border-top: none;
      border-left: none;
      border-right: none;
      border-radius: 0;
    }
    :deep(.el-input-group__append) {
      border-radius: 0;
      border-top: none;
      border-left: none;
      border-right: none;
      background: #fff;
      padding: 0 !important;
    }
    .login-container-form {
      :deep(.el-input-group__append, .el-input-group__prepend) {
        border: none;
      }
    }
    .login-container-page-link {
      text-align: left;
      margin-bottom: 26px;
      margin-top: 14px;
    }
    .dividing-line {
      position: relative;
      height: 2px;
      background-color: #d9d9d9;
      .text {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -60%);
        padding: 0 34px;
        background-color: #fff;
        color: #d9d9d9;
        font-size: 21px;
      }
    }
    .sign-in {
      .text {
        font-size: 16px;
      }
    }
    .wechat-login {
      margin-top: 60px;
      margin-bottom: 80px;
      .text {
        position: relative;
        font-size: 16px;
        .icon {
          position: absolute;
          top: 0;
          left: -30px;
          font-size: 22px;
        }
      }
    }
    .forget-the-password {
      text-decoration: none;
    }

    .forget-the-password:visited {
      text-decoration: none;
    }
    .verification-code {
      color: var(--color-primary);
    }
    &-right-panel {
      margin-right: 15px;
      flex: 1;
    }
    &-codeimg {
      width: 104px;
      cursor: pointer;
      margin-top: -8px;
    }
    &-brand {
      margin-left: -15px;
      img {
        margin-top: -5px;
        margin-right: 6px;
        vertical-align: middle;
        width: 24px;
        height: 24px;
      }
      span {
        font-size: 18px;
      }
    }
    &-title {
      margin-top: 58px;
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 28px;
    }
    &-tips {
      margin-bottom: 46px;
      font-size: 11px;
      color: #8c8c8c;
    }
    &-subs-btns {
      border-radius: 30px;
      margin-top: 50px;
      width: 100%;
    }
    &-seed-btns {
      cursor: pointer;
    }
    &-page-link {
      /* 还没有账号？注册一个新账号 */
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      /* identical to box height */
      text-align: center;

      color: #000000;
      .el-link--warning {
        font-size: 12px;
        margin-left: 10px;
      }
    }
  }
</style>
