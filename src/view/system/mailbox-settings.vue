<!--
 * @Author: Mr.wang
 * @Date: 2021-04-16 17:38:37
 * @LastEditTime: 2021-05-11 15:12:06
 * @Description: 邮箱设置
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="integral-box">
    <el-form
      ref="settingForm"
      class="setting-from"
      :rules="rules"
      :model="form"
      label-width="150px"
    >
      <el-card shadow="never">
        <!-- <el-form-item label="是否开启邮箱" prop="open">
          <el-switch v-model="form.open" active-color="#13ce66" inactive-color="#8C8C8C">
          </el-switch>
        </el-form-item> -->
        <el-form-item label="选择邮箱类型" prop="type">
          <el-radio v-model="form.type" :label="8" @change="switchMailbox">QQ邮箱</el-radio>
          <el-radio v-model="form.type" :label="25" @change="switchMailbox">网易163邮箱</el-radio>
        </el-form-item>
        <el-form-item label="发件人名称" prop="senderName">
          <el-input v-model="form.senderName" placeholder="请输入发件人名称"> </el-input>
        </el-form-item>
        <el-form-item label="发送邮件主题">
          <el-input v-model="form.emailSubject" placeholder="请输入发送邮件主题"> </el-input>
        </el-form-item>
        <el-form-item label="Smtp身份验证码" prop="authentication">
          <el-input v-model="form.authentication" placeholder="请输入Smtp身份验证码"> </el-input>
          <div class="tips-box" v-if="form.type == 8"
            >如未申请QQ邮箱的SMTP身份验证码，请点击
            <a href="https://mail.qq.com/" target="_blank">如何获取Smtp申请验证码</a>
            进行申请</div
          >
          <div class="tips-box" v-if="form.type == 25">
            如未申请网易163邮箱的SMTP身份验证码，请点击
            <a href="https://mail.163.com/" target="_blank">如何获取Smtp申请验证码</a> 进行申请
          </div>
        </el-form-item>
        <!-- <el-form-item label="邮箱是否加密发送">
          <el-switch v-model="form.encryption" active-color="#13ce66" inactive-color="#8C8C8C">
          </el-switch>
        </el-form-item>
        <el-form-item label="测试邮箱接收地址">
          <el-input v-model="form.testAddress" placeholder="请输入测试邮箱接收地址"> </el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存并生效</el-button>
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { reqSetKeyConfig, reqModifyConfig } from '@/api/system'
  const settingForm = ref<any>()
  // 验证
  const rules = reactive({
    type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
    senderName: [{ required: true, message: '请输入发件人名称', trigger: 'blur' }],
    authentication: [{ required: true, message: '请输入Smtp身份验证码', trigger: 'blur' }]
  })
  const form = ref({
    // 是否开启
    open: true,
    // 邮箱类型
    type: 0,
    // 收件人名称
    senderName: '',
    // 邮箱主题
    emailSubject: '',
    // Smtp身份验证码
    authentication: '',
    // 加密
    encryption: false,
    // 测试
    testAddress: ''
  })
  // 立即上传按钮
  const submitForm = () => {
    // console.log(rules.rules.fileUrl)
    settingForm.value.validate((valid: boolean) => {
      if (valid) {
        modifyPoints()
      }
    })
  }
  // 修改积分配置
  const modifyPoints = async () => {
    const key = form.value.type == 8 ? 'QQemail' : '163email'
    const data = {
      email: form.value.senderName,
      password: form.value.authentication,
      nickname: form.value.emailSubject
    }
    await reqModifyConfig(key, data)
    ElMessage.success('操作成功')
    getIntegralAllocation()
  }
  // 切换请求
  const switchMailbox = async (val: any) => {
    if (val == 8) {
      const { data } = await reqSetKeyConfig({ key: 'QQemail' })
      const mailboxData = data.data
      form.value.senderName = mailboxData.email
      form.value.authentication = mailboxData.password
      form.value.emailSubject = mailboxData.nickname
    } else {
      const { data } = await reqSetKeyConfig({ key: '163email' })
      const mailboxData = data.data
      form.value.senderName = mailboxData.email
      form.value.authentication = mailboxData.password
      form.value.emailSubject = mailboxData.nickname
    }
  }
  // 获取邮箱配置
  const getIntegralAllocation = async () => {
    const { data } = await reqSetKeyConfig({ key: 'email' })
    const mailboxData = data.data
    form.value.type = mailboxData.config_id
    form.value.senderName = mailboxData.email
    form.value.authentication = mailboxData.password
    form.value.emailSubject = mailboxData.nickname
  }
  onMounted(() => getIntegralAllocation())
</script>
<style lang="scss" scoped>
  .integral-box {
    :deep(.el-card) {
      padding-bottom: 250px;
    }
    .setting-from {
      :deep(.el-form-item__label) {
        color: #000;
      }
      :deep(.el-button) {
        padding: 0 14px;
        min-height: 32px;
      }
      :deep(.el-radio__label) {
        color: #000;
      }
      :deep(.el-input__inner) {
        width: 267px;
      }
      :deep(.el-input) {
        width: 267px;
      }
      :deep(.el-form-item__label) {
        line-height: 32px;
      }
      :deep(.el-form-item__content) {
        line-height: 32px;
      }
      .tips-box {
        font-size: 12px;
        color: #8c8c8c;
        a {
          color: var(--color-primary);
          text-decoration: none;
        }
      }
    }
  }
</style>
