<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-10 15:22:19
 * @Description: 积分设置
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="integral-box">
    <div class="integral-title">积分设置</div>
    <el-form
      ref="settingForm"
      class="setting-from"
      :rules="rules"
      :model="form"
      label-width="110px"
    >
      <el-form-item label="积分" prop="open">
        <el-switch v-model="form.open" active-color="#13ce66" inactive-color="#8C8C8C"> </el-switch>
      </el-form-item>
      <el-form-item label="积分文字定义" prop="integralTetx">
        <el-input v-model="form.integralTetx"> </el-input>
      </el-form-item>
      <el-form-item label="最按比例返积分">
        <el-radio v-model="form.inverse" label="1">开启</el-radio>
        <el-radio v-model="form.inverse" label="2">关闭</el-radio>
      </el-form-item>
      <el-form-item label="比例设置" prop="proportion">
        <el-input v-model="form.proportion" class="proportion-inp">
          <template #append>%</template>
        </el-input>
        <div class="tips-text">返积分比例基数=商品实际付款金额</div>
      </el-form-item>
      <el-form-item label="积分上限">
        <el-radio v-model="form.upper" label="1">不限制</el-radio>
        <el-radio v-model="form.upper" label="2">自定义</el-radio>
      </el-form-item>
      <el-form-item label="最多可获得">
        <el-input v-model="form.most" class="most-inp">
          <template #append>积分</template>
        </el-input>
        <div class="tips-text">
          会员积分大于等于此值时将无法继续增加，后台手动充值不限制，已持有积分不限制
        </div>
      </el-form-item>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue'
  const settingForm = ref<any>()
  // 验证
  const rules = reactive({
    open: [{ required: true, message: '请选择', trigger: 'blur' }],
    integralTetx: [{ required: true, message: '请填写积分文字', trigger: 'blur' }],
    proportion: [{ required: true, message: '请填写积分抵扣比例', trigger: 'blur' }]
  })
  const form = reactive({
    // 是否开启
    open: true,
    // 积分文字
    integralTetx: '',
    // 最按比例返积分
    inverse: '',
    // 比例设置
    proportion: '',
    // 积分上限
    upper: '',
    // 最多可获得
    most: ''
  })
  // 立即上传按钮
  const submitForm = () => {
    // console.log(rules.rules.fileUrl)
    settingForm.value.validate((valid: boolean) => {
      if (valid) {
        // console.log(valid)
      } else {
        // console.log('error submit!!')
        return false
      }
    })
  }
</script>
<style lang="scss" scoped>
  .integral-box {
    .integral-title {
      font-size: 16px;
      font-weight: 700;
      color: #000;
      margin-bottom: 15px;
    }
    .setting-from {
      :deep(.el-form-item__label) {
        color: #000;
      }
      :deep(.el-radio__label) {
        color: #000;
      }
      :deep(.el-input__inner) {
        width: 194px;
      }
      :deep(.el-input) {
        width: 194px;
      }
      :deep(.el-form-item__label) {
        line-height: 32px;
      }
      :deep(.el-form-item__content) {
        line-height: 32px;
      }
      :deep(.el-input-group__append) {
        line-height: 30px;
        width: 54px;
      }
      .proportion-inp,
      .most-inp {
        :deep(.el-input__inner) {
          width: 140px;
        }
        :deep(.el-input-group__append) {
          text-align: center;
          line-height: 30px;
          padding: 0 11px;
        }
      }
      .tips-text {
        line-height: 30px;
        font-size: 12px;
        color: #8c8c8c;
      }
      :deep(.el-button) {
        margin-left: 136px;
        min-height: 32px;
        padding: 2px 46px;
      }
    }
  }
</style>
