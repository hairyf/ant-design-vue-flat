<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-03-02 09:05:39
 * @LastEditTime: 2021-05-10 14:23:00
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    @click.self="infoShow = false"
    class="tab-bar-container oe-flex oe-row-between"
    :class="{ on: isFixedHead }"
  >
    <div class="control main-container-brand">
      <img src="/custom-assets/images/icon/logo.png" alt="" />
      <span>微匠工</span>
    </div>
    <div class="main-container-user">
      <!-- <i class="control mailbox ad-mailbox"></i> -->
      <span class="control">
        <!-- <el-avatar size="small" src="">
          <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" />
        </el-avatar> -->
        <div @click="ejectInfo">
          <span class="name">{{ userInfo?.username }}</span>
          <i class="arrow el-icon-arrow-down"></i>
        </div>
      </span>
    </div>
    <!-- 弹框 -->
    <div class="infoShow" :class="userInfo.group_id != 0 ? 'current-height' : ''" v-if="infoShow">
      <div class="top">
        <div class="title">
          <div class="img-box">
            <el-image v-if="!!userInfo.avatar" :src="userInfo.avatar" fit="cover"></el-image>
            <el-image v-else src="/custom-assets/images/login/login.png" fit="cover"></el-image>
          </div>

          <span>{{ userInfo?.username }}</span>
        </div>
        <el-form :model="userInfo" label-width="100px">
          <el-form-item label="支持渠道：" class="channel">
            <div class="image-box">
              <el-image src="/custom-assets/images/login/user-info-h5.png"></el-image>
              <el-image src="/custom-assets/images/login/user-info-app.png"></el-image>
              <el-image
                class="weixin-icon"
                src="/custom-assets/images/login/user-info-wx2.png"
              ></el-image>
            </div>
          </el-form-item>
          <!-- <el-form-item label="套餐类型：">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="到期时间：">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item> -->
        </el-form>
      </div>
      <div class="bottom">
        <div class="item edit-password" v-if="userInfo.group_id == 0" @click="changShow = true">
          <span class="oe-flex"> <i class="ad-lock icon"></i> 修改账号密码</span>
        </div>
        <!-- <div class="item">
          <span> <i class="ad-log-out"></i> 个人设置</span>
        </div> -->
        <div class="item sign-out" @click="signOut">
          <div class="oe-flex"> <i class="ad-log-out icon"></i> 退出登录</div>
        </div>
      </div>
    </div>
  </div>
  <!-- <el-dialog title="个人设置" v-model="settingsShow" width="445px">
    <el-form
      label-width="80px"
      :model="personalForm"
      ref="rluesForm"
      :rules="rules"
      class="personal-settings"
    >
      <el-form-item label="头像">
        <el-image src="personalForm.img"></el-image>
        <div class="replace" @click="replaceBtn">替换</div>
      </el-form-item>
      <el-form-item label="登录账号">123456321</el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input placeholder="昵称" v-model="personalForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone"
        ><el-input v-model="personalForm.phone" placeholder="手机号"></el-input
      ></el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <el-input placeholder="验证码" v-model="personalForm.verificationCode">
          <template v-slot:append>
            <span v-if="isResend" class="login-container-seed-btns verification-code"
              >{{ count }}秒重新发送</span
            >
            <span v-else @click="sendEmailCode" class="login-container-seed-btns verification-code"
              >获取验证码</span
            >
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="settingsShow = false">取 消</el-button>
        <el-button type="primary" @click="settingsShow = false">确 定</el-button>
      </span>
    </template>
  </el-dialog> -->
  <!-- 修改密码 -->
  <el-dialog title="修改密码" v-model="changShow" width="554px">
    <el-form
      label-width="130px"
      :model="changPasswordForm"
      :rules="rules"
      ref="rluesForm"
      class="change-password"
    >
      <el-form-item label="登录账号" prop="loginAccount"
        ><el-input
          v-model="changPasswordForm.loginAccount"
          placeholder="请输入新登录账号"
        ></el-input
      ></el-form-item>
      <el-form-item label="新登录密码" prop="password"
        ><el-input
          v-model="changPasswordForm.password"
          show-password
          placeholder="请输入新登录密码"
        ></el-input
      ></el-form-item>
      <el-form-item label="确认新登录密码" prop="newPassword"
        ><el-input
          v-model="changPasswordForm.newPassword"
          show-password
          placeholder="请输入确定新登录密码"
        ></el-input
      ></el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changShow = false">取 消</el-button>
        <el-button type="primary" @click="modifyAccount">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { reqAuthSendLoginCode, reqModifyAccountPassword } from '@/api/user'
  import { useScrollDetector } from '@/hooks/use-scroll-detector'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  const router = useRouter()
  // 声明存储useStore的变量
  const store = useStore()
  const scrollTop = useScrollDetector('.layout-scrollbar > .el-scrollbar__wrap')
  const isFixedHead = computed(() => store.state.theme.isFixedHead || scrollTop.value < 60)
  const rluesForm = ref<any>()
  // 修改账号密码
  const changPasswordForm = ref({
    loginAccount: '',
    // password
    password: '',
    newPassword: ''
  })
  const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else {
      if (changPasswordForm.value.newPassword !== '') {
        rluesForm.value.validateField('newPassword')
      }
      callback()
    }
  }
  const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== changPasswordForm.value.password) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }
  const rules = ref({
    loginAccount: [{ required: true, message: '请输入新登录密码', trigger: 'blur' }],
    password: [{ required: true, validator: validatePass, trigger: 'blur' }],
    newPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
    nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    verificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  })
  const settingsShow = ref(true)
  const changShow = ref(false)
  // 个人设置
  const personalForm = ref({
    img: '',
    // 昵称
    nickname: '',
    // 手机号
    phone: '',
    // 验证码
    verificationCode: ''
  })

  // 修改请求
  const modifyAccount = () => {
    rluesForm.value.validate(async (valid: boolean) => {
      if (valid) {
        await reqModifyAccountPassword({
          account: changPasswordForm.value.loginAccount,
          password: changPasswordForm.value.password,
          repassword: changPasswordForm.value.newPassword
        })
        ElMessage.success('修改成功')
        signOut()
      }
    })
  }
  // const resetTime = (time: any) => {
  //   const timer = setInterval(() => {
  //     time.value--
  //     if (time.value < 1) {
  //       clearInterval(timer)
  //       isResend.value = false
  //     }
  //   }, 1000)
  // }
  // const replaceBtn = () => {
  //   MaterialSelect({
  //     multiple: false
  //   }).then((res) => {
  //     personalForm.value.img = res[0].path.url
  //   })
  // }
  // 获取手机验证码
  // const count = ref(60)
  // const isResend = ref(false)
  // const sendEmailCode = () => {
  //   isResend.value = true
  //   count.value = 60
  //   resetTime(count)
  //   reqAuthSendLoginCode({ mobile: personalForm.value.phone }).then((res) => {
  //     console.log(res)
  //   })
  // }
  const userInfo = ref<any>(store.state.user.userInfo)
  const infoShow = ref(false)
  const ejectInfo = () => {
    infoShow.value = !infoShow.value
  }
  // 退出登录
  const signOut = () => {
    store.dispatch('signOutUserInfo')
  }
</script>
<style scoped lang="scss">
  :deep(.el-form-item__label) {
    color: #000;
  }
  .infoShow {
    position: fixed;
    width: 15%;
    height: 280px;
    right: 25px;
    top: 60px;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #f5f5f5;
    box-shadow: 1px 3px 10px #888888;
    &.hover-height {
      height: 415px;
    }
    &.current-height {
      height: 230px;
    }
    .top {
      border-bottom: 1px solid #f5f5f5;
      .title {
        display: flex;
        align-items: center;
        margin: 30px 0 20px 18px;
        .img-box {
          display: flex;
          align-items: center;
          width: 48px;
          height: 48px;
          margin-right: 14px;
        }
      }
      .channel {
        .image-box {
          display: flex;
          align-items: center;
          height: 32px;
          .el-image {
            width: 20px;
            height: 20px;
            margin: 0 3px;
            &.weixin-icon {
              width: 22px;
              height: 22px;
            }
          }
        }
      }
    }
    .bottom {
      .item {
        font-size: 14px;
        margin-left: 14px;
        cursor: pointer;
        &.edit-password {
          border-bottom: 1px solid #f5f5f5;
          .ad-lock {
            font-size: 20px;
          }
        }

        &.sign-out {
          position: absolute;
          bottom: 0px;
          left: 0px;
        }
      }
      font-size: 14px;
      .icon {
        color: #000;
        font-size: 18px;
        margin-right: 8px;
      }
    }
  }

  .tab-bar-container {
    padding: 0 20px;
    position: relative;
    z-index: 100;
    height: 0;
    line-height: 0;
    background-color: #fff;
    color: #333;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    transition: 0.2s linear;
    &.on {
      height: 60px;
      line-height: 60px;
    }
  }
  .main-container-brand {
    img {
      margin-top: -5px;
      margin-right: 6px;
      vertical-align: middle;
      width: 24px;
      height: 24px;
    }
    span {
      font-size: 14px;
    }
  }
  .main-container-user {
    .mailbox {
      margin-right: 22px;
    }
    .el-avatar {
      margin-top: -5px;
      vertical-align: middle;
    }
    .name {
      font-size: 15px;
      margin: 0 7px;
    }
    .arrow {
      // &:hover {

      // }
      color: #8c8c8c;
    }
  }
  .control {
    cursor: pointer;
  }
  :deep(.el-form-item__label) {
    line-height: 32px;
    color: #000;
  }
  :deep(.el-form-item__content) {
    line-height: 32px;
  }
  .personal-settings {
    padding-top: 20px;
    :deep(.el-input) {
      position: relative;
      width: 305px;
    }
    .el-image {
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
    .replace {
      cursor: pointer;
      font-size: 14px;
      line-height: 22px;
      color: #ff9d28;
    }
    :deep(.el-input-group__append) {
      cursor: pointer;
      position: absolute;
      right: 75px;
      top: 50%;
      transform: translateY(-50%);
      padding: 0;
      color: var(--color-primary);
      background-color: #ffff;
      border: none;
    }
  }
  .change-password {
    padding-top: 20px;
  }
  .dialog-footer {
    :deep(.el-button) {
      padding: 0 46px;
      min-height: 32px;
    }
  }
</style>
