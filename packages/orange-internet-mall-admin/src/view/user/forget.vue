<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-23 18:01:09
 * @LastEditTime: 2021-03-25 14:19:52
 * @Description: 
 * @LastEditors: Mr.Mao
-->
<template>
  <div class="login-container-right-panel">
    <div class="title-return" @click="back">
      <span class="text">返回</span>
      <i class="el-icon-arrow-right icon"></i>
    </div>
    <div class="login-container-title">找回密码方式选择</div>
    <div class="login-container-tips">How to retrieve password</div>
    <div class="main">
      <div @click="jumpEmailForget" class="retrieve oe-m-r-30">
        <i class="ad-email icon"></i>
        <span>邮箱找回</span>
      </div>
      <div @click="jumpMobileForget" class="retrieve">
        <i class="ad-mobile-phone icon"></i>
        <span>手机号找回</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  // 后退
  const back = () => {
    router.go(-1)
  }
  const jumpEmailForget = () => {
    router.push('emailForget')
  }
  const jumpMobileForget = () => {
    router.push('mobileForget')
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
  .verify-email {
    font-size: 14px !important;
    .text {
      color: var(--color-primary);
    }
  }
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    .retrieve {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 137px;
      height: 137px;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      transition: 0.3s;
      .icon {
        font-size: 40px;
        margin-bottom: 5px;
      }
      &:hover {
        color: #fff;
        background-color: var(--color-primary);
      }
    }
  }
  :deep(.el-input-group) {
    margin: 80px 0;
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
