<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-08 14:41:00
 * @Description: 积分设置
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
      label-width="110px"
    >
      <el-card shadow="never">
        <div class="integral-title">积分设置</div>
        <el-form-item label="积分" prop="open">
          <el-switch v-model="form.open" active-color="#13ce66" inactive-color="#8C8C8C">
          </el-switch>
        </el-form-item>
        <el-form-item label="积分文字定义" prop="integralTetx">
          <el-input v-model="form.integralTetx"> </el-input>
        </el-form-item>
        <el-form-item label="最按比例返积分">
          <el-radio v-model="form.inverse" label="1">开启</el-radio>
          <el-radio v-model="form.inverse" label="0">关闭</el-radio>
        </el-form-item>
        <el-form-item label="比例设置" prop="proportion" v-if="form.inverse == '1'">
          <el-input
            v-model="form.proportion"
            class="proportion-inp"
            type="number"
            @input="form.proportion = inputInterception(form.proportion)"
          >
            <template #append>%</template>
          </el-input>
          <div class="tips-text">返积分比例基数=商品实际付款金额</div>
        </el-form-item>
        <el-form-item label="积分上限">
          <el-radio v-model="form.upper" label="1">不限制</el-radio>
          <el-radio v-model="form.upper" label="2">自定义</el-radio>
        </el-form-item>
        <el-form-item label="最多可获得" v-if="form.upper == '2'">
          <el-input
            v-model="form.most"
            class="most-inp"
            type="number"
            @input="form.most = inputInterception(form.most)"
          >
            <template #append>积分</template>
          </el-input>
          <div class="tips-text">
            会员积分大于等于此值时将无法继续增加，后台手动充值不限制，已持有积分不限制
          </div>
        </el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-card>
      <!-- 积分抵扣 -->
      <!-- <el-card shadow="never" class="withdrawal">
        <div class="integral-title">积分抵扣</div>
        <el-form-item label="积分抵扣" prop="deduction" class="move-negative">
          <div>
            <el-radio v-model="form.deduction" label="1">开启</el-radio>
            <el-radio v-model="form.deduction" label="1">不限制抵扣数量</el-radio>
            <el-radio v-model="form.deduction" label="2">关闭</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="积分抵扣比例" prop="deductionProportion" class="move-left">
          <span>1积分抵扣</span
          ><el-input v-model="form.deductionProportion" class="integral-reduce">
            <template #append>元</template></el-input
          >
        </el-form-item>
        <el-form-item label="最多抵扣" prop="amount" class="move-left">
          <el-input class="tips-inp" v-model="form.amount"
            ><template #append>元</template></el-input
          >
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.cumulative">允许多件累计抵扣</el-checkbox>
        </el-form-item>
      </el-card> -->
    </el-form>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { inputInterception } from '@/hooks/reset-time'
  import { reqSetKeyConfig, reqModifyConfig } from '@/api/system'
  const settingForm = ref<any>()
  // 验证
  const rules = reactive({
    deductionProportion: [{ required: true, message: '请填写积分抵扣比例', trigger: 'blur' }],
    open: [{ required: true, message: '请选择', trigger: 'blur' }],
    integralTetx: [{ required: true, message: '请填写积分文字', trigger: 'blur' }],
    proportion: [{ required: true, message: '请填写比例设置', trigger: 'blur' }],
    deduction: [{ required: true, message: '请选择', trigger: 'blur' }],
    amount: [{ required: true, message: '请填写最多抵扣', trigger: 'blur' }]
  })
  const form = ref({
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
    most: '',
    // 最低充值金额
    amount: '',
    // 积分抵扣
    deduction: '',
    // 积分抵扣比例
    deductionProportion: '',
    // 累计
    cumulative: true
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
    const key = 'scoreSet'
    const data = {
      status: form.value.open == true ? '1' : '0',
      name: form.value.integralTetx,
      scale_status: form.value.inverse,
      scale: form.value.proportion,
      limit_status: form.value.upper,
      limit: form.value.most
    }
    await reqModifyConfig(key, data)
    ElMessage.success('操作成功')
    getIntegralAllocation()
  }
  // 获取积分配置
  const getIntegralAllocation = async () => {
    const { data } = await reqSetKeyConfig({ key: 'scoreSet' })
    const integralData = data.data
    form.value.open = integralData.status == 1
    form.value.integralTetx = integralData.name
    form.value.inverse = integralData.scale_status
    form.value.proportion = integralData.scale
    form.value.upper = integralData.limit_status
    form.value.most = integralData.limit
    form.value.upper = form.value.upper.toString()
    form.value.inverse = form.value.inverse.toString()
  }
  onMounted(() => getIntegralAllocation())
</script>
<style lang="scss" scoped>
  .integral-box {
    .integral-title {
      font-size: 16px;
      font-weight: 700;
      color: #000;
      margin-bottom: 15px;
    }

    :deep(.el-card) {
      min-height: 650px;
    }
    .setting-from,
    .integral-from {
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
        padding: 0 10px;
        line-height: 30px;
      }
      .proportion-inp,
      .most-inp {
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
    .withdrawal {
      margin-top: 24px;
    }
    .integral-reduce {
      padding-left: 15px;
    }
  }
</style>
