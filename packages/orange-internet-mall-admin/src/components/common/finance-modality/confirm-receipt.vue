<!--
 * @Author: Mr.wang
 * @Date: 2021-04-16 11:02:26
 * @LastEditTime: 2021-05-08 14:08:22
 * @Description: 确定到账
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-dialog title="确认到账" v-model="show" width="554px" class="adjust-integral">
    <el-form
      ref="integralForm"
      :model="form"
      class="adjust-form"
      label-width="120px"
      :rules="rules"
    >
      <div class="tips-box">确认到账：您确定该笔充值已经到账了么？</div>
      <el-form-item label="系统登录密码" prop="password">
        <el-input
          class="password-inp adjust-form-integral"
          show-password
          v-model="form.password"
          :validate-event="false"
          placeholder="请输入系统登录密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="region">
        <el-input
          class="adjust-form-integral"
          type="textarea"
          v-model.trim="form.region"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="determineBtn">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { reqRechargeConfirmation } from '@/api/finance'
  import { reqVerification } from '@/api/order'
  import { ElMessage } from 'element-plus'
  import { ref, computed, defineEmit, defineProps, reactive } from 'vue'
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    currentId: {
      type: String,
      required: true
    }
  })
  const integralForm = ref<any>()
  const emit = defineEmit()
  // 多层model绑定数据
  const show = computed({
    get: () => props.show,
    set: () => emit('update:show')
  })
  const checkPassword = async (rule: any, value: any, callback: any) => {
    if (value) {
      try {
        await reqVerification({ confirmPwd: value })
        callback()
      } catch (error) {
        callback(new Error('密码不正确,请重新输入密码'))
      }
    } else {
      callback(new Error('请输入密码'))
    }
  }
  // 验证
  const rules = reactive({
    password: [{ required: true, validator: checkPassword, trigger: 'blur' }],
    region: [{ required: true, message: '请输入备注', trigger: 'blur' }]
  })
  // 金额
  const form = ref({
    // 备注
    region: '',
    // 密码
    password: ''
  })
  const determineBtn = async () => {
    integralForm.value.validate((valid: boolean) => {
      if (valid) {
        integralChange()
      }
    })
  }
  const integralChange = async () => {
    const option = {
      id: props.currentId,
      remark: form.value.region
    }
    await reqRechargeConfirmation(option)
    ElMessage.success('操作成功!!')
    emit('restRechargeList')
    show.value = false
  }
</script>
<style lang="scss" scoped>
  :deep(.adjust-form-integral) {
    width: 100%;
  }
  .tips-box {
    margin-bottom: 28px;
    width: 480px;
    padding: 5px 14px;
    line-height: 24px;
    font-size: 12px;
    color: #000;
    background-color: var(--color-primary-light-opacity-8);
    border: 1px solid var(--color-primary);
  }
  :deep(.el-form-item__label) {
    color: #000;
  }
  :deep(.el-radio__label) {
    color: #000;
  }
  .password-inp {
    :deep(.el-input__inner) {
      background: #f5f5f5;
    }
  }
  .el-dialog {
    min-width: 500px;
  }
  .dialog-footer {
    :deep(.el-button) {
      min-height: 32px;
      padding: 0 45px;
      font-size: 14px;
    }
  }
  :deep(.el-textarea__inner) {
    height: 157px;
    resize: none;
  }
</style>
