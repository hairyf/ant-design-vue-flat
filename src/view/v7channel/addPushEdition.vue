<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-04-14 14:32:32
 * @LastEditTime: 2021-05-10 15:18:36
 * @Description: 
 * @LastEditors: Mr.wang
-->
<template>
  <div class="step-box">
    <div class="step-side">
      <div class="text text1" :class="currentStep == 1 ? 'current' : ''">
        <div class="current-title">扫码上传</div>
        <div class="current-tips">公众平台账号授权绑定</div>
      </div>
      <div class="text" :class="currentStep == 2 ? 'current' : ''">
        <div class="current-title">填写版本信息</div>
        <div class="current-tips">填写小程序版本信息，上传代码</div>
      </div>
      <div class="text text3" :class="currentStep == 3 ? 'current' : ''">
        <div class="current-title">提交微信审核</div>
        <div class="current-tips">跳转微信页面提交审核</div>
      </div>
    </div>
    <div class="step-content">
      <el-card shadow="never" v-if="currentStep == 1" class="triangle-box card-box">
        <div class="triangle"></div>
        <div class="qr-code-box">
          <div v-if="isGetCode">
            <!-- <qr-code :text="jurisdictionImage" :size="208" /> -->
            <el-image style="width: 208px; height: 208px" :src="jurisdictionImage"></el-image>
          </div>
          <div v-else>
            <div class="qr-code-mask">
              <el-image src="/custom-assets/images/channel/Applets.png"></el-image>
            </div>
            <qr-code text="asdsadasdsa" :size="208" />
          </div>

          <div class="qr-button-box">
            <el-button
              :disabled="jurisdictionButton"
              @click="getJurisdictionQrCode"
              v-if="isGetCode"
              type="text"
              size="small"
            >
              <span v-if="isLineUp == 0">刷新二维码</span>
              <span v-else>{{ isLineUp }}秒后重新获取二维码</span>
            </el-button>
            <el-button
              :disabled="jurisdictionButton"
              @click="getJurisdictionQrCode"
              v-else
              type="primary"
              size="small"
            >
              <span v-if="isLineUp == 0">获取授权二维码</span>
              <span v-else>{{ isLineUp }}秒后重新获取二维码</span>
            </el-button>
          </div>
        </div>
        <div v-if="isGetCode" class="refresh-qr-box">
          <div class="tips">请使用微信扫描二维码进行绑定授权</div>
        </div>
      </el-card>
      <el-card shadow="never" v-if="currentStep == 2" class="triangle-box2 card-box">
        <div class="triangle"></div>
        <el-form
          ref="refFormInfo"
          :model="formInfo"
          :rules="rules"
          label-width="80px"
          class="register-rule-form"
        >
          <el-form-item label="版本号" prop="version">
            <el-input v-model="formInfo.version" placeholder="请输入小程序APP ID"></el-input>
            <div class="edition-tips">当前版本为0.0.1</div>
          </el-form-item>
          <el-form-item label="版本描述" prop="desc">
            <el-input
              :rows="6"
              type="textarea"
              v-model="formInfo.desc"
              placeholder="请输入版本描述"
            ></el-input>
          </el-form-item>
          <div class="footer">
            <el-button @click="uploadCode" type="primary" size="small">上传代码</el-button>
          </div>
        </el-form>
      </el-card>
      <el-card shadow="never" v-if="currentStep == 3" class="triangle-box3 card-box">
        <div class="triangle"></div>
        <div class="up-login" v-if="isUpLogin == 1">
          <el-progress type="dashboard" :percentage="uploadPercentage" :width="400" color="#FF9D28">
            <el-image src="/custom-assets/images/v7channel/upLoading.png"></el-image>
            <!-- <template #default="{ percentage }">
                <span class="percentage-value">{{ percentage }}%</span>
                <span class="percentage-label">当前进度</span>
              </template> -->
          </el-progress>
          <div class="tips-text">代码正在上传中...</div>
        </div>
        <div class="up-login" v-if="isUpLogin == 2">
          <el-progress type="dashboard" :percentage="100" :width="400" color="#FF0000">
            <el-image src="/custom-assets/images/v7channel/upLoading.png"></el-image>
            <!-- <template #default="{ percentage }">
                <span class="percentage-value">{{ percentage }}%</span>
                <span class="percentage-label">当前进度</span>
              </template> -->
          </el-progress>
          <div class="tips-text">上传失败！</div>
        </div>
        <div class="login-success" v-if="isUpLogin == 3">
          <div class="title-icon">
            <i class="el-icon-check"></i>
          </div>
          <div class="success">上传成功</div>
          <!-- <div class="tips">{{ jumpPageCount }}秒后将会自动跳转至微信页面提交审核</div> -->
          <div class="tips">{{ jumpPageCount }}秒后将会自动跳转至审核页面前往后台</div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onBeforeUnmount, ref } from 'vue'
  import { reqChannelLogin, reqChannelLoginStatus, reqChannelUpload } from '@/api/v7channel'
  import { ElMessage } from 'element-plus'
  import { useRouter } from 'vue-router'
  // 保存路由
  const router = useRouter()
  const formInfo = ref<any>({
    version: '',
    desc: '',
    uploadkey: ''
  })
  const rules = {
    version: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
    desc: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
  }
  // 当前步骤
  const currentStep = ref(1)
  // 是否获取到二维码
  const isGetCode = ref(false)
  // 是否上传成功
  const isUpLogin = ref(1)
  // 是否扫码登录成功
  const isLoginSuccess = ref(false)
  // 是否禁用按钮
  const jurisdictionButton = ref(false)
  // 是否需要排队
  const isLineUp = ref(0)
  // 多少秒后跳转页面
  const jumpPageCount = ref(5)
  // 获取授权二维码
  const jurisdictionImage = ref('')
  const getJurisdictionQrCode = async () => {
    jurisdictionButton.value = true
    try {
      const { data } = await reqChannelLogin()
      jurisdictionImage.value = data.data.qrcode
      formInfo.value.uploadkey = data.data.uploadkey
      jurisdictionButton.value = false
      isGetCode.value = true
    } catch (error) {
      if (typeof error.data.data == 'number') {
        isLineUp.value = error.data.data
        const times = setInterval(() => {
          isLineUp.value--
          if (isLineUp.value <= 0) {
            clearInterval(times)
            jurisdictionButton.value = false
          }
        }, 1000)
      } else {
        jurisdictionButton.value = false
      }

      return
    }
    const times = setInterval(async () => {
      try {
        const res = await reqChannelLoginStatus()
        isLoginSuccess.value = true
        currentStep.value = 2
        clearInterval(times)
        ElMessage.success('登录成功')
      } catch (error) {
        // console.log(error)
      }
    }, 3000)
  }
  // 当前上传百分比
  const uploadPercentage = ref(0)
  // 上传代码
  const refFormInfo = ref<any>()
  const uploadCode = () => {
    refFormInfo.value.validate(async (valid: any) => {
      if (valid) {
        currentStep.value = 3
        const times = setInterval(() => {
          uploadPercentage.value++
        }, 200)
        try {
          await reqChannelUpload(formInfo.value)
          clearInterval(times)
          isUpLogin.value = 3
          const timer = setInterval(() => {
            jumpPageCount.value--
            if (jumpPageCount.value <= 0) {
              clearInterval(timer)
              router.push('/v7channel/v7appLetsOption/v7reviewAndRelease')
            }
          }, 1000)
        } catch (error) {
          clearInterval(times)
          router.push('/v7channel/v7appLetsOption/v7reviewAndRelease')
          // isUpLogin.value = 2
          // currentStep.value = 1
        }
      }
    })
  }
  onBeforeUnmount(() => {
    // console.log('---------')
    if (isGetCode.value) {
      location.reload()
    }
  })
</script>
<style lang="scss" scoped>
  :deep(.el-form-item__label) {
    color: #000;
  }
  .step-box {
    display: flex;
    height: 85vh;
    .step-side {
      text-align: right;
      width: 13%;
      .text {
        font-size: 16px;
        color: #8c8c8c;
        &.text1 {
          margin: 60px 0 80px;
        }
        &.text3 {
          margin-top: 80px;
        }
        &.current {
          .current-title {
            font-size: 24px;
            color: #000;
          }
        }
        .current-tips {
          margin-top: 14px;
          font-size: 12px;
        }
      }
    }
    .step-content {
      margin-left: 4%;
      width: 78%;
      .card-box {
        height: 100%;
        :deep(.el-card) {
          height: 100%;
        }
      }
      .triangle-box {
        position: relative;
        .triangle {
          position: absolute;
          left: -30px;
          top: 50px;
          width: 0;
          height: 0;
          border-top: 23px solid transparent;
          border-right: 32px solid #fff;
          border-bottom: 23px solid transparent;
        }
        .qr-code-box {
          position: relative;
          width: 208px;
          margin: 60px 0 0 32px;
          .qr-code-mask {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 208px;
            height: 208px;
            background-color: rgba(0, 0, 0, 0.3);
            .el-image {
              width: 60px;
            }
          }
          .qr-button-box {
            width: fit-content;
            margin: 22px auto 0;
            .el-button {
              width: 170px;
              font-size: 14px;
            }
          }
        }
        .refresh-qr-box {
          margin-left: 26px;
          .tips {
            font-size: 14px;
          }
        }
      }
      .triangle-box2 {
        position: relative;
        .triangle {
          position: absolute;
          left: -30px;
          top: 175px;
          width: 0;
          height: 0;
          border-top: 23px solid transparent;
          border-right: 32px solid #fff;
          border-bottom: 23px solid transparent;
        }
        .register-rule-form {
          position: relative;
          min-height: 312px;
          .edition-tips {
            font-size: 12px;
            color: #8c8c8c;
          }
          .el-input {
            width: 391px;
          }
          .el-textarea {
            width: 391px;
          }
          .footer {
            position: absolute;
            bottom: 4px;
            left: 80px;
            .el-button {
              width: 150px;
            }
          }
        }
      }
      .triangle-box3 {
        position: relative;
        .triangle {
          position: absolute;
          left: -30px;
          top: 300px;
          width: 0;
          height: 0;
          border-top: 23px solid transparent;
          border-right: 32px solid #fff;
          border-bottom: 23px solid transparent;
        }
        .up-login {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: fit-content;
          .tips-text {
            width: fit-content;
            margin: 0 auto;
            font-size: 24px;
            font-size: 500;
          }
        }
        .login-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-top: 15%;
          .title-icon {
            position: relative;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #1ad370;
            .el-icon-check {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #fff;
              font-size: 24px;
            }
          }
          .success {
            font-size: 24px;
            color: #000;
            font-weight: 500;
            margin: 24px 0 39px;
          }
          .tips {
            font-size: 14px;
            color: #8c8c8c;
          }
        }
      }
      .el-input {
        width: 310px;
      }
      .el-button {
        width: 120px;
      }
    }
  }
</style>
