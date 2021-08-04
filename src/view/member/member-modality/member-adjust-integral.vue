<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 16:28:00
 * @LastEditTime: 2021-05-12 13:56:57
 * @Description: 调整积分
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <!-- 备注 -->
  <el-dialog title="调整积分" v-model="show" width="554px" class="adjust-integral">
    <el-form
      ref="integralForm"
      :model="form"
      class="adjust-form"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="会员目前积分">
        <span class="text-color">{{ memberData.score }}</span>
      </el-form-item>
      <el-form-item label="调整类型" prop="adjustmentType">
        <el-radio-group v-model="form.adjustmentType">
          <el-radio label="增加"></el-radio>
          <el-radio label="减少"></el-radio>
          <el-radio label="清零"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="调整积分" v-if="form.adjustmentType != '清零'" prop="integral">
        <el-input class="adjust-form-integral" v-model.number="form.integral"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="region">
        <el-input
          class="adjust-form-integral"
          type="textarea"
          v-model.trim="form.region"
        ></el-input>
      </el-form-item>
      <el-form-item label="系统登录密码" prop="password">
        <el-input
          class="password-inp adjust-form-integral"
          show-password
          v-model="form.password"
          :validate-event="false"
          placeholder="请输入系统登录密码"
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
  import { reqIntegralChange } from '@/api/member'
  import { reqVerification } from '@/api/order'
  import { ElMessage } from 'element-plus'
  import { inputInterception } from '@/hooks/reset-time'
  import { ref, computed, defineEmit, defineProps, reactive } from 'vue'
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    memberData: {
      type: Object,
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
    adjustmentType: [{ required: true, message: '请选择调整类型', trigger: 'blur' }],
    integral: [{ required: true, message: '请输入积分', trigger: 'blur' }],
    region: [{ required: true, message: '请输入备注', trigger: 'blur' }]
  })
  // 金额
  const form = ref({
    // 调整的类型
    adjustmentType: '',
    // 积分
    integral: '',
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
      change_type: form.value.adjustmentType == '增加' ? '1' : '2',
      change_val:
        form.value.adjustmentType == '清零' ? props.memberData.score : form.value.integral,
      manager_remark: form.value.region,
      id: props.memberData.id
    }
    await reqIntegralChange(option)
    ElMessage.success('操作成功!!')
    emit('restDetailsData')
    show.value = false
  }
</script>
<style lang="scss" scoped>
  :deep(.adjust-form-integral) {
    width: 85%;
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
    .el-button {
      min-height: 32px;
      padding: 0 45px;
      font-size: 14px;
    }
  }
  .text-color {
    color: #ff0000;
  }
  :deep(.el-textarea__inner) {
    resize: none;
  }
  :deep(.el-textarea__inner) {
    height: 157px;
  }
</style>
