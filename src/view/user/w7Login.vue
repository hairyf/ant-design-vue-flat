<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-02-24 15:09:19
 * @LastEditTime: 2021-05-13 11:22:18
 * @Description: 登录页面
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="login-container-right-panel">
    <div class="login-container-brand">
      <img src="/custom-assets/images/icon/logo.png" />
      <span>微匠工</span>
    </div>
    <div class="login-container-title">商城后台管理系统</div>
    <div class="login-container-tips">Management System</div>
    <el-tabs class="custom-tabs" v-model="currentTab">
      <el-tab-pane name="account">
        <el-form :model="accountInfo" class="login-container-form">
          <el-form-item>
            <el-input
              placeholder="请输入账号"
              v-model="accountInfo.account"
              @keyup.enter="onLogin"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="请输入密码"
              :type="isDisplayPassword ? 'text' : 'password'"
              v-model="accountInfo.password"
              @keyup.enter="onLogin"
              clearable
            >
              <template #suffix>
                <i
                  :class="isDisplayPassword ? 'oe-vision-show' : 'oe-vision-hide'"
                  @click="isDisplayPassword = !isDisplayPassword"
                >
                </i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="请输入验证码"
              v-model="accountInfo.captcha"
              @keyup.enter="onLogin"
            >
              <template v-slot:append>
                <img @click="sendAccountCode" class="login-container-codeimg" :src="pictureCode" />
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="oe-flex oe-row-between">
      <el-checkbox v-model="isSaveUser">记住我</el-checkbox>
      <!-- <el-link type="primary" :underline="false" href="javascript:;">
        <span @click="jumpForget" class="font-size-12">忘记密码？</span>
      </el-link> -->
    </div>
    <el-button class="login-container-subs-btns sign-in" type="primary" @click="onLogin">
      <span class="text">登录</span>
    </el-button>
    <!-- <p class="login-container-page-link">
      <span class="prompt-text">还没有账号?</span>
      <el-link type="primary" :underline="false" href="javascript:;">
        <span @click="jumpRegister" class="font-size-12">注册一个新账号</span>
      </el-link>
    </p> -->
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { reqCaptcha } from '@/api/user'
  import store from '@/store'
  import { ElMessage } from 'element-plus'
  import Cookies from 'js-cookie'
  // 当前导航项
  const currentTab = ref('account')
  // 是否记录当前用户
  const isSaveUser = ref(false)
  // 是否显示密码
  const isDisplayPassword = ref(false)
  // 验证码图片
  const pictureCode = ref('')
  const accountInfo = reactive({
    account: '',
    password: '',
    captcha: '',
    captchakey: ''
  })
  // 获取账号登录验证码图片
  const sendAccountCode = async () => {
    const { data } = await reqCaptcha()
    pictureCode.value = data.data.verify_src
    accountInfo.captchakey = data.data.verify_key
  }
  sendAccountCode()
  // 点击进行登录
  const onLogin = async () => {
    try {
      await store.dispatch('accountLogin', accountInfo)
      if (isSaveUser.value) {
        preservationUser()
      } else {
        Cookies.remove('userInfo')
      }
    } catch (error) {
      sendAccountCode()
    }
  }
  // 记住我
  const preservationUser = () => {
    Cookies.set('userInfo', { username: accountInfo.account, password: accountInfo.password })
  }

  let userInfo = Cookies.get('userInfo')
  if (userInfo) {
    userInfo = JSON.parse(userInfo)
    accountInfo.account = userInfo.username
    accountInfo.password = userInfo.password
    isSaveUser.value = true
  }
</script>

<style lang="scss" scoped>
  :deep(.el-tabs__nav-scroll) {
    height: 0;
  }
  .font-size-12 {
    font-size: 12px;
  }
  .prompt-text {
    position: relative;
    top: 2px;
    margin-right: 5px;
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
      background-color: #1ad370;
      border: none;
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
  .is-justify-center {
    justify-content: center;
    padding: 0 25px;
  }
</style>
