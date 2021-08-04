<!--
 * @Author: Mr.wang
 * @Date: 2021-04-14 14:09:27
 * @LastEditTime: 2021-05-07 18:29:12
 * @Description: 新增支付模板
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-form :model="form" ref="noticeForm" :rules="rules" label-width="210px" class="notice-box">
    <el-card shadow="never">
      <el-form-item label="模板名称" prop="dispatch_name">
        <el-input class="sort-inp" v-model="form.dispatch_name" placeholder="输入支付模板名称">
        </el-input>
      </el-form-item>
      <el-form-item label="支付类型" prop="calculate_type">
        <el-radio-group v-model="form.calculate_type">
          <el-radio label="WxPay">微信支付</el-radio>
          <el-radio label="AliPay">支付宝支付</el-radio>
        </el-radio-group>
        <div class="tips-text">支付方式保存后不可修改，请谨慎操作</div>
      </el-form-item>
      <template v-if="form.calculate_type == 'WxPay'">
        <el-form-item label="App ID" prop="aapId">
          <el-input class="sort-inp" v-model="form.aapId" placeholder="输入公众号/小程序的App ID">
          </el-input>
        </el-form-item>
        <el-form-item label="支付商户号" prop="paymentMerchant">
          <el-input
            class="sort-inp"
            v-model="form.paymentMerchant"
            placeholder="输入支付商户号（Mch_ID）"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="支付密钥" prop="paymentPublic">
          <el-input
            class="sort-inp"
            v-model="form.paymentPublic"
            placeholder="输入支付密钥（Apikey）"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="商户Cert证书" prop="certUrl">
          <el-upload
            class="upload-demo"
            :headers="headers"
            ref="certRef"
            accept=".pem"
            :on-success="cerHandleSuccess"
            :data="{ pay_code: form.calculate_type }"
            :action="uploadUrl"
            :before-upload="cerHandleUpload"
            :limit="1"
            :on-remove="hanDeleteGet"
          >
            <el-button plain>上传文件</el-button>
            <template #tip>
              <div class="el-upload__tip"
                >商户可登录
                <a href="https://pay.weixin.qq.com/" target="_blank">微信商户平台 </a
                >，在【账户中心】->【API安全】->【API证书】目录下载证书
                <br />上传证书中的apiclient_cert.pem文件</div
              >
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="商户Key证书" prop="keyUrl">
          <el-upload
            :headers="headers"
            :data="{ pay_code: form.calculate_type }"
            :action="uploadUrl"
            :on-success="keyHandleSuccess"
            class="upload-demo"
            accept=".pem"
            :before-upload="keyHandleUpload"
            :on-remove="hanDeleteKey"
            :limit="1"
          >
            <el-button plain>上传文件</el-button>
            <template #tip>
              <div class="el-upload__tip"
                >商户可登录
                <a href="https://pay.weixin.qq.com/" target="_blank">微信商户平台 </a>
                ，在【账户中心】->【API安全】->【API证书】目录下载证书
                <br />上传证书中的apiclient_key.pem文件</div
              >
            </template>
          </el-upload>
        </el-form-item>
      </template>
      <template v-if="form.calculate_type == 'AliPay'">
        <el-form-item label="App ID" prop="applicationId">
          <el-input class="sort-inp" v-model="form.applicationId" placeholder="输入App ID">
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="应用公钥" prop="applicationPublic">
          <el-input
            type="number"
            class="sort-inp"
            v-model="form.applicationPublic"
            placeholder="输入应用公钥"
          >
          </el-input>
        </el-form-item> -->
        <el-form-item label="支付宝密钥" prop="alipayPublic">
          <el-input class="sort-inp" v-model="form.alipayPublic" placeholder="输入支付宝密钥">
          </el-input>
        </el-form-item>
        <el-form-item label="alipayCertPublicKey.crt证书" prop="alipayCertUrl">
          <el-upload
            class="upload-demo"
            accept=".crt"
            :on-success="alipayCertHandleSuccess"
            :before-upload="alipayCertHandleUpload"
            :limit="1"
            :headers="headers"
            :on-remove="hanDeleteAlipayCert"
            :data="{ pay_code: form.calculate_type }"
            :action="uploadUrl"
          >
            <el-button plain>上传文件</el-button>
            <template #tip>
              <div class="el-upload__tip">
                商户可登录
                <a href="https://b.alipay.com/" target="_blank">支付宝开发平台</a
                >，在【控制台】>【选择应用】>【应用信息】>【接口加签方式】>【设置/查看】中下载证书后<br />
                上传证书中的 alipayCertPublicKey.crt
                文件，如名称不同，请先修改成alipayCertPublicKey.crt后再进行上传
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="alipayRootCert.crt证书" prop="alipayRootUrl">
          <el-upload
            class="upload-demo"
            accept=".crt"
            :headers="headers"
            :on-success="alipayRootHandleSuccess"
            :before-upload="alipayRootHandleUpload"
            :data="{ pay_code: form.calculate_type }"
            :action="uploadUrl"
            :limit="1"
            :on-remove="hanDeleteGetAlipayRoot"
          >
            <el-button plain>上传文件</el-button>
            <template #tip>
              <div class="el-upload__tip">
                商户可登录
                <a href="https://b.alipay.com/" target="_blank">支付宝开发平台</a>
                ，在【控制台】>【选择应用】>【应用信息】>【接口加签方式】>【设置/查看】中下载证书后<br />
                上传证书中的 alipayRootCert.crt
                文件，如名称不同，请先修改成alipayRootCert.crt后再进行上传
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="appCertPublicKey.crt证书" prop="alipayPublicUrl">
          <el-upload
            class="upload-demo"
            accept=".crt"
            :headers="headers"
            :before-upload="alipayPubliHandleUpload"
            :on-success="alipayPublicHandleSuccess"
            :data="{ pay_code: form.calculate_type }"
            :action="uploadUrl"
            :limit="1"
            :on-remove="hanDeleteGetAlipayPubli"
          >
            <el-button plain>上传文件</el-button>
            <template #tip>
              <div class="el-upload__tip">
                商户可登录
                <a href="https://b.alipay.com/" target="_blank">支付宝开发平台</a>
                ，在【控制台】>【选择应用】>【应用信息】>【接口加签方式】>【设置/查看】中下载证书后<br />
                上传证书中的 appCertPublicKey.crt
                文件，如名称不同，请先修改成appCertPublicKey.crt后再进行上传
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </template>

      <el-form-item>
        <div class="oe-flex operation">
          <el-button plain @click="router.go(-1)">取消</el-button>
          <el-button type="primary" @click="preservationBtn">保存</el-button>
        </div>
      </el-form-item>
    </el-card>
  </el-form>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { ElMessage } from 'element-plus'
  import { httpConfig } from '@/api/http.config'
  import { reqAddPaymentTemplate } from '@/api/system'
  import { useRoute, useRouter } from 'vue-router'
  import store from '@/store'
  const router = useRouter()
  const certRef = ref<any>()
  const noticeForm = ref<any>('')
  const form = ref({
    //  模板名称
    dispatch_name: '',
    //  支付类型
    calculate_type: 'WxPay',
    // AppId
    aapId: '',
    // 支付商户号
    paymentMerchant: '',
    // 支付密钥
    paymentPublic: '',
    // 应用ID
    applicationId: '',
    // 应用公钥
    applicationPublic: '',
    // 支付宝公钥
    alipayPublic: '',
    // 商户Cert证书
    certUrl: '',
    // 商户Key证书
    keyUrl: '',
    //alipayCertPublicKey.crt证书
    alipayCertUrl: '',
    // alipayRootCert.crt证书
    alipayRootUrl: '',
    // appCertPublicKey.crt证书
    alipayPublicUrl: ''
  })
  // 验证
  const rules = ref({
    dispatch_name: [{ required: true, message: '请填写模板名称', trigger: 'blur' }],
    calculate_type: [{ required: true, message: '请选择支付类型', trigger: 'blur' }],
    aapId: [{ required: true, message: '请填写AppID', trigger: 'blur' }],
    paymentMerchant: [{ required: true, message: '请填写支付商户号', trigger: 'blur' }],
    paymentPublic: [{ required: true, message: '请填写支付密钥', trigger: 'blur' }],
    applicationId: [{ required: true, message: '请填写应用ID', trigger: 'blur' }],
    applicationPublic: [{ required: true, message: '请填写应用公钥', trigger: 'blur' }],
    alipayPublic: [{ required: true, message: '请填写支付宝公钥', trigger: 'blur' }],
    certUrl: [{ required: true, message: '请上传商户Cert证书', trigger: 'blur' }],
    keyUrl: [{ required: true, message: '请上传商户Key证书', trigger: 'blur' }],
    alipayCertUrl: [
      { required: true, message: '请上传alipayCertPublicKey.crt证书', trigger: 'blur' }
    ],
    alipayRootUrl: [{ required: true, message: '请上传alipayRootCert.crt证书', trigger: 'blur' }],
    alipayPublicUrl: [
      { required: true, message: '请上传appCertPublicKey.crt证书', trigger: 'blur' }
    ]
  })
  //移除文件
  const hanDeleteGet = () => {
    form.value.certUrl = ''
  }
  //移除文件
  const hanDeleteKey = () => {
    form.value.keyUrl = ''
  }
  //移除文件
  const hanDeleteAlipayCert = () => {
    form.value.alipayCertUrl = ''
  }
  //移除文件
  const hanDeleteGetAlipayRoot = () => {
    form.value.alipayRootUrl = ''
  }
  //移除文件
  const hanDeleteGetAlipayPubli = () => {
    form.value.alipayPublicUrl = ''
  }
  // 文件上次成功的钩子
  const cerHandleSuccess = (response: any, file: any, fileList: any) => {
    if (response.code == 0) {
      form.value.certUrl = response.data.url
    } else {
      ElMessage.error('文件上传失败')
    }
  }
  // 文件上次成功的钩子
  const keyHandleSuccess = (response: any, file: any, fileList: any) => {
    if (response.code == 0) {
      form.value.keyUrl = response.data.url
    }
  }
  // 文件上次成功的钩子
  const alipayCertHandleSuccess = (response: any, file: any, fileList: any) => {
    if (response.code == 0) {
      form.value.alipayCertUrl = response.data.url
    }
  }
  // 文件上次成功的钩子
  const alipayRootHandleSuccess = (response: any, file: any, fileList: any) => {
    if (response.code == 0) {
      form.value.alipayRootUrl = response.data.url
    }
  }
  // 文件上次成功的钩子
  const alipayPublicHandleSuccess = (response: any, file: any, fileList: any) => {
    if (response.code == 0) {
      form.value.alipayPublicUrl = response.data.url
    }
  }
  // 拦截上传
  const cerHandleUpload = (file: any) => {
    if (file.name != 'apiclient_cert.pem') {
      ElMessage.error('请上传对应的文件')
      return false
    }
  }
  //拦截上传
  const keyHandleUpload = (file: any) => {
    if (file.name != 'apiclient_key.pem') {
      ElMessage.error('请上传对应的文件')
      return false
    }
  }
  //拦截上传
  const alipayCertHandleUpload = (file: any) => {
    if (file.name != 'alipayCertPublicKey.crt') {
      ElMessage.error('请上传对应的文件')
      return false
    }
  }
  //拦截上传
  const alipayRootHandleUpload = (file: any) => {
    if (file.name != 'alipayRootCert.crt') {
      ElMessage.error('请上传对应的文件')
      return false
    }
  }
  //拦截上传
  const alipayPubliHandleUpload = (file: any) => {
    if (file.name != 'appCertPublicKey.crt') {
      ElMessage.error('请上传对应的文件')
      return false
    }
  }
  // token
  const headers = httpConfig['headers']['common']
  // 保存
  const preservationBtn = () => {
    noticeForm.value.validate((valid: boolean) => {
      if (valid) {
        addNotice()
      }
    })
  }
  // 上传文件的路径
  const uploadUrl = computed(() => {
    return `${httpConfig.baseURL}shop/PayShopConfig/upload`
  })
  const addNotice = async () => {
    const WeChatData = {
      name: form.value.dispatch_name,
      pay_code: form.value.calculate_type,
      app_id: form.value.aapId,
      mch_id: form.value.paymentMerchant,
      key: form.value.paymentPublic,
      apiclient_cert: form.value.certUrl,
      apiclient_key: form.value.keyUrl
    }
    const AlipayData = {
      name: form.value.dispatch_name,
      pay_code: form.value.calculate_type,
      app_id: form.value.applicationId,
      key: form.value.alipayPublic,
      alipayCertPublicKey: form.value.alipayCertUrl,
      alipayRootCert: form.value.alipayRootUrl,
      appCertPublicKey: form.value.alipayPublicUrl
    }
    if (form.value.calculate_type == 'WxPay') {
      await reqAddPaymentTemplate({ ...WeChatData })
    } else {
      await reqAddPaymentTemplate({ ...AlipayData })
    }
    ElMessage.success('操作成功')
    router.go(-1)
  }
</script>
<style lang="scss" scoped>
  .notice-box {
    .sort-inp {
      width: 306px;
    }
    :deep(.el-card__body) {
      padding-bottom: 200px;
    }
    .tips-text {
      color: #8c8c8c;
      font-size: 12px;
    }
    :deep(.el-form-item__label) {
      line-height: 32px;
      color: #000;
    }
    :deep(.el-form-item) {
      margin-bottom: 28px;
    }
    :deep(.el-form-item__content) {
      line-height: 32px;
      color: #000;
    }
    .operation {
      .el-button {
        padding: 0 46px;
        min-height: 32px;
      }
    }
    .upload-demo {
      :deep(.el-upload-list) {
        max-width: 300px;
      }
      :deep(.el-icon-document) {
        background: url('/custom-assets/images/common/success.png') no-repeat;
        width: 16px;
        height: 16px;
        background-size: 16px 16px;
      }
      :deep(.el-upload-list__item-name) {
        display: flex;
        align-items: center;
      }
      :deep(.el-icon-document::before) {
        content: '';
      }
      .el-button {
        min-height: 32px;
        padding: 0 32px;
        color: var(--color-primary);
      }
      .el-upload__tip {
        font-size: 12px;
        color: #8c8c8c;
        a {
          text-decoration: none;
          cursor: pointer;
          color: var(--color-primary);
        }
      }
    }
  }
</style>
