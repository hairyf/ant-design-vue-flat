<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-22 16:42:20
 * @LastEditTime: 2021-05-10 15:19:12
 * @Description: 
 * @LastEditors: Mr.wang
-->
<template>
  <div class="login-container-right-panel">
    <div class="title-return" @click="router.back">
      <span class="text">返回</span>
      <i class="el-icon-arrow-right icon"></i>
    </div>
    <div class="login-container-title">欢迎注册新账户</div>
    <div class="login-container-tips">Welcome to register a new account</div>
    <el-tabs class="custom-tabs" v-model="currentTab" @tab-click="changeCurrentTab">
      <el-tab-pane label="账号注册" name="account">
        <el-form
          ref="accountForm"
          :rules="accountRules"
          :model="accountInfo"
          class="login-container-form"
        >
          <el-form-item prop="account">
            <el-input placeholder="账号" v-model="accountInfo.account"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="密码" type="password" v-model="accountInfo.password"></el-input>
            <Password :input="accountInfo.password" />
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input
              placeholder="确认密码"
              type="password"
              v-model="accountInfo.repassword"
            ></el-input>
            <Password :input="accountInfo.repassword" />
          </el-form-item>
          <el-form-item prop="email">
            <el-input placeholder="请输入您的邮箱" v-model="accountInfo.email"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input placeholder="验证码" v-model="accountInfo.code" @keyup.enter="onRegister">
              <template v-slot:append>
                <span v-if="isResend" class="login-container-seed-btns verification-code"
                  >{{ count }}秒重新发送</span
                >
                <span
                  v-else
                  @click="sendEmailCode"
                  class="login-container-seed-btns verification-code"
                  >获取验证码</span
                >
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="手机号注册" name="phone">
        <el-form
          ref="mobileForm"
          :rules="mobileRules"
          :model="mobileInfo"
          class="login-container-form"
        >
          <el-form-item prop="mobile">
            <el-input placeholder="手机号" v-model="mobileInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input placeholder="验证码" v-model="mobileInfo.code">
              <template v-slot:append>
                <span v-if="isMobileResend" class="login-container-seed-btns verification-code"
                  >{{ mobileCount }}秒重新发送</span
                >
                <span
                  v-else
                  @click="sendMobileCode"
                  class="login-container-seed-btns verification-code"
                  >获取验证码</span
                >
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="密码" type="password" v-model="mobileInfo.password"></el-input>
            <Password :input="mobileInfo.password" />
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input
              placeholder="确认密码"
              type="password"
              v-model="mobileInfo.repassword"
              @keyup.enter="onRegister"
            ></el-input>
            <Password :input="mobileInfo.repassword" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="oe-flex oe-row-between">
      <el-checkbox v-model="isSaveUser">勾选表示你应经同意《用户服务协议》</el-checkbox>
    </div>
    <el-button class="login-container-subs-btns wechat-login" type="primary" @click="onRegister">
      <span class="text">注册</span>
    </el-button>
    <p class="login-container-page-link">
      <span class="prompt-text">已有账户？</span>
      <el-link type="primary" :underline="false" href="javascript:;">
        <span @click="jumpRegister" class="font-size-12">去登录</span>
      </el-link>
    </p>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Password from '@/components/password-strength/password-strength.vue'
  import { reqAuthSendRegisterEmail, reqAuthSendRegisterMobile } from '@/api/user'
  import store from '@/store'
  const router = useRouter()
  // 当前导航项
  const currentTab = ref('account')
  const changeCurrentTab = () => {}
  const accountInfo = reactive({
    account: '',
    password: '',
    repassword: '',
    email: '',
    code: ''
  })
  const accountForm = ref<any>()
  // 账号验证规则
  const accountVerification = (rule: any, value: any, callback: any) => {
    const accountReg = /^[A-z]/
    // const ChineseRegular = new RegExp('[\\u4E00-\\u9FFF]+', 'g')

    const ChineseRegular = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/
    const isAccountNum = /[0-9]/.test(value)
    const isLetter = accountReg.test(value)
    const isChinese = ChineseRegular.test(value)
    // else if (!(isLetter && isAccountNum && )) {
    //   callback(new Error('格式不正确'))
    // }
    if (value == '') {
      callback(new Error('账号不能为空'))
    }
    if (isChinese) {
      callback(new Error('账号不能包含汉字'))
    }
    if (!isLetter) {
      callback(new Error('账号需要以字母开头'))
    }
    if (!isAccountNum) {
      callback(new Error('账号需要包含有数字'))
    }
    if (!(value.length <= 18 && value.length >= 6)) {
      callback(new Error('账号长度需要在6到18位之间'))
    }
    callback()
  }
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
  // 邮箱验证规则
  const emailVerification = (rule: any, value: any, callback: any) => {
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isAccountEmail = emailReg.test(value)
    if (value == '') {
      callback(new Error('请输入账号'))
    } else if (!isAccountEmail) {
      callback(new Error('格式不正确'))
    } else {
      callback()
    }
  }
  // // 账号注册验证规则
  const accountRules = reactive({
    account: [{ validator: accountVerification, trigger: 'blur' }],
    password: [{ validator: passwordVerification, trigger: 'blur' }],
    repassword: [{ validator: checkPasswordVerification, trigger: 'blur' }],
    email: [{ validator: emailVerification, trigger: 'blur' }],
    code: [
      {
        required: true,
        message: '验证码不能为空',
        trigger: 'blur'
      }
    ]
  })
  const mobileForm = ref<any>()
  const mobileInfo = reactive({
    mobile: '',
    password: '',
    repassword: '',
    code: ''
  })
  // 手机号验证规则
  const mobileVerification = (rule: any, value: any, callback: any) => {
    const emailReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    const isAccountEmail = emailReg.test(value)
    if (value == '') {
      callback(new Error('请输入手机号'))
    } else if (!isAccountEmail) {
      callback(new Error('格式不正确'))
    } else {
      callback()
    }
  }
  // 手机号密码确认验证规则
  const checkPasswordMobile = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== mobileInfo.password) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }

  // // 手机号注册验证规则
  const mobileRules = reactive({
    mobile: [{ validator: mobileVerification, trigger: 'blur' }],
    password: [{ validator: passwordVerification, trigger: 'blur' }],
    repassword: [{ validator: checkPasswordMobile, trigger: 'blur' }],
    code: [
      {
        required: true,
        message: '验证码不能为空',
        trigger: 'blur'
      }
    ]
  })

  // 邮箱重新发送验证码
  const count = ref(60)
  const isResend = ref(false)
  const sendEmailCode = async () => {
    isResend.value = true
    await reqAuthSendRegisterEmail({ email: accountInfo.email })
    const timer = setInterval(() => {
      count.value--
      if (count.value < 1) {
        clearInterval(timer)
        isResend.value = false
      }
    }, 1000)
  }
  // 手机号重新发送验证码
  const mobileCount = ref(2)
  const isMobileResend = ref(false)
  const sendMobileCode = async () => {
    isMobileResend.value = true
    await reqAuthSendRegisterMobile({ mobile: mobileInfo.mobile })
    const timer = setInterval(() => {
      mobileCount.value--
      if (mobileCount.value < 1) {
        clearInterval(timer)
        isMobileResend.value = false
      }
    }, 1000)
  }
  // 是否记录当前用户
  const isSaveUser = ref(false)
  // 点击进行注册
  const onRegister = () => {
    if (isSaveUser.value) {
      if (currentTab.value === 'account') {
        // 账号注册
        accountForm.value.validate(async (valid: any) => {
          if (valid) {
            await store.dispatch('accountRegister', accountInfo)
          } else {
            return false
          }
        })
      } else {
        // 手机注册
        mobileForm.value.validate(async (valid: any) => {
          if (valid) {
            await store.dispatch('mobileRegister', mobileInfo)
          } else {
            return false
          }
        })
      }
    } else {
      alert('您还没勾选用户服务协议')
    }
  }
  // 跳转注册账号页面
  const jumpRegister = () => {
    router.push('login')
  }
</script>

<style lang="scss" scoped>
  .title-return {
    position: absolute;
    top: 24px;
    right: 24px;
    font-size: 14px;
    color: var(--color-primary);
    .text {
      margin-right: 13px;
    }
    .icon {
      font-weight: bold;
    }
  }
  .font-size-12 {
    font-size: 12px;
  }
  .prompt-text {
    position: relative;
    top: 2px;
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
      margin-top: 30px;
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
