<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-04-14 19:38:43
 * @LastEditTime: 2021-05-10 15:18:07
 * @Description: 快速注册小程序
 * @LastEditors: Mr.wang
-->
<template>
  <el-card shadow="never">
    <el-form
      ref="refForm"
      :model="formInfo"
      :rules="rules"
      label-width="160px"
      class="register-rule-form"
    >
      <el-form-item label="小程序APP ID" prop="app_id">
        <el-input v-model="formInfo.app_id" placeholder="请输入小程序APP ID"></el-input>
      </el-form-item>
      <el-form-item label="小程序APP Secret" prop="secret">
        <el-input v-model="formInfo.secret" placeholder="请输入小程序APP Secret"></el-input>
      </el-form-item>
      <!-- <el-form-item label=" 维护小程序">
        <el-switch
          v-model="formInfo.open"
          active-color="#13ce66"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="维护说明" v-if="formInfo.open == 1">
        <el-input
          type="textarea"
          v-model="formInfo.name"
          placeholder="请输入维护说明请输入维护说明"
        >
        </el-input>
      </el-form-item> -->
      <div class="footer">
        <el-button @click="$router.push('/v7channel/v7channelManagement')" size="small"
          >取消</el-button
        >
        <el-button @click="submitApplets" type="primary" size="small">保存</el-button>
      </div>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { reqChannelMiniPreservation, reqChannelMini } from '@/api/v7channel'
  import { ElMessage } from 'element-plus'
  const formInfo = ref<any>({
    app_id: '',
    secret: ''
  })
  const rules = {
    app_id: [{ required: true, message: '请输入小程序APP ID', trigger: 'blur' }],
    secret: [{ required: true, message: '请输入小程序APP Secret', trigger: 'blur' }]
  }
  // 获取小程序配置
  reqChannelMini().then((res) => {
    formInfo.value.app_id = res.data.data.value.app_id
    formInfo.value.secret = res.data.data.value.secret
  })
  const refForm = ref<any>()
  const submitApplets = () => {
    refForm.value.validate(async (valid: any) => {
      if (valid) {
        await reqChannelMiniPreservation(formInfo.value)
        ElMessage.success('保存配置成功')
      }
    })
  }
</script>
<style lang="scss" scoped>
  :deep(.el-form-item__label) {
    color: #000;
  }
  .register-rule-form {
    position: relative;
    min-height: 312px;
    .el-input {
      width: 391px;
    }
    .el-textarea {
      width: 391px;
    }
    .footer {
      position: absolute;
      bottom: 4px;
      left: 160px;
      .el-button {
        width: 120px;
      }
    }
  }
</style>
