<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-08 14:41:16
 * @Description:支付交易
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="pay-transaction">
    <div class="integral-title">交易设置</div>
    <el-form
      ref="settingForm"
      class="setting-from"
      :rules="rules"
      :model="form"
      label-width="165px"
    >
      <el-form-item label="未付款订单" prop="cancelOrder">
        <el-radio v-model="form.cancelOrder" label="0">不取消订单</el-radio>
        <el-radio v-model="form.cancelOrder" label="1">自定义取消时间</el-radio>
      </el-form-item>
      <el-form-item prop="most" v-if="form.cancelOrder == '1'">
        <span>提交后</span>
        <el-input v-model="form.most" type="number" class="most-inp public-move-left">
          <template #append>分钟</template>
        </el-input>
        <span class="public-move-left">未付款，自动取消</span>
        <div class="tips-text"> 取消订单时间必须在10-1440分钟之间 </div>
      </el-form-item>
      <el-form-item label="自动收货">
        <el-radio v-model="form.affirmTakeDeliveryTime" label="0">不自动收货</el-radio>
        <el-radio v-model="form.affirmTakeDeliveryTime" label="1">自定义收获时间</el-radio>
      </el-form-item>
      <el-form-item v-if="form.affirmTakeDeliveryTime == '1'">
        <span>发货后</span>
        <el-input v-model="form.automatic" type="number" class="proportion-inp public-move-left">
          <template #append>天</template>
        </el-input>
        <span class="public-move-left">后，自动收货</span>
        <div class="tips-text"> 自动确认收货时间必须在3-30天之间 </div>
      </el-form-item>
      <el-form-item label="收货后维权时间">
        <el-radio v-model="form.affirmTakeDeliveryProtect" label="0">收货后不支持维权</el-radio>
        <el-radio v-model="form.affirmTakeDeliveryProtect" label="1">自定义维权时间</el-radio>
      </el-form-item>
      <el-form-item>
        <div class="auto-receiving" v-if="form.affirmTakeDeliveryProtect == '1'">
          <span>发货后</span>
          <el-input
            v-model="form.protectionRights"
            type="number"
            class="proportion-inp public-move-left"
          >
            <template #append>天</template>
          </el-input>
          <span class="public-move-left">内，可发起维权</span>
          <div class="tips-text"> 自动确认维权时间必须在3-30天之间 </div>
        </div>
      </el-form-item>
      <el-form-item label="取消维权">
        <el-radio v-model="form.cancelSafeguard" label="0">不取消维权</el-radio>
        <el-radio v-model="form.cancelSafeguard" label="1">自定义取消时间</el-radio>
      </el-form-item>
      <el-form-item v-if="form.cancelSafeguard == '1'">
        <div class="auto-receiving">
          <span>在商家同意退/换货后</span>
          <el-input v-model="form.exchange" type="number" class="proportion-inp public-move-left">
            <template #append>天</template>
          </el-input>
          <span class="public-move-left">内，买家未寄回货物及提交快递号，则自动取消维权</span>
          <div class="tips-text"> 取消维权时间必须在0-30天之间 </div>
        </div>
      </el-form-item>
      <el-form-item label="维权自动处理">
        <el-radio v-model="form.automaticProcessing" label="0">不自动处理</el-radio>
        <el-radio v-model="form.automaticProcessing" label="1">自定义自动处理时间</el-radio>
      </el-form-item>
      <el-form-item v-if="form.automaticProcessing == '1'">
        <div class="auto-receiving">
          <span>在会员退回商品后</span>
          <el-input
            v-model="form.automaticDay"
            type="number"
            class="proportion-inp public-move-left"
          >
            <template #append>天</template>
          </el-input>
          <span class="public-move-left">内，商家未进行处理，则自动退款给会员</span>
          <div class="tips-text">取消维权时间必须在0-30天之间，仅用于会员在退货退款维权时生效</div>
        </div>
      </el-form-item>
      <el-form-item label="维权订单商家处理时间">
        <el-radio v-model="form.businessAutomation" label="0">不自动处理</el-radio>
        <el-radio v-model="form.businessAutomation" label="1">自定义自动处理时间</el-radio>
      </el-form-item>
      <el-form-item v-if="form.businessAutomation == '1'">
        <div class="auto-receiving">
          <span>在用户申请订单维权后</span>
          <el-input
            v-model="form.businessNum"
            type="number"
            class="proportion-inp public-move-left"
          >
            <template #append>天</template>
          </el-input>
          <span class="public-move-left"
            >内，商家未进行处理操作，维权将会自动取消，会员可再次申请维权</span
          >
          <div class="tips-text">操作维权时间必须在1-7天之间</div>
        </div>
      </el-form-item>
      <el-form-item label="交易增强">
        <el-switch v-model="form.enhance"></el-switch>
        <div class="oe-flex"
          ><p>开启后进入商城首页时会自动弹出未支付订单提示</p
          ><el-popover placement="top" :width="160" trigger="hover">
            <el-image
              src="/custom-assets/images/common/transaction.png"
              class="examples-img"
              style="width: 153px; height: 331px"
            />
            <template #reference>
              <div class="set-icon-text">
                <i class="el-icon-warning-outline"></i>
                <span>示例</span>
              </div>
            </template>
          </el-popover></div
        >
      </el-form-item>
      <div class="operation">
        <el-button @click="getTransactionAllocation">取消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </div>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { reqSetKeyConfig, reqModifyConfig } from '@/api/system'
  const settingForm = ref<any>()
  // 验证
  const rules = reactive({
    cancelOrder: [{ required: true, message: '请选择', trigger: 'blur' }],
    most: [{ required: true, message: '请输入分钟', trigger: 'blur' }]
  })
  const form = ref({
    // 未付款订单
    cancelOrder: '',
    // 分钟
    most: '',
    // 自动收货
    affirmTakeDeliveryTime: '',
    // 自动收货天数
    automatic: '',
    // 维权时间
    affirmTakeDeliveryProtect: '',
    // 维权天数
    protectionRights: '',
    // 取消维权
    cancelSafeguard: '',
    // 自定义取消维权时间
    exchange: '',
    // 是否增强
    enhance: false,
    // 维权自动处理
    automaticProcessing: '',
    // 自动维权的天数
    automaticDay: '',
    businessAutomation: '',
    businessNum: ''
  })
  // 立即上传按钮
  const submitForm = () => {
    // console.log(rules.rules.fileUrl)
    settingForm.value.validate((valid: boolean) => {
      if (valid) {
        modifyConfiguration()
      }
    })
  }
  // 修改配置
  const modifyConfiguration = async () => {
    const key = 'OrderBaseParam'
    const data = {
      cancelOrder: {
        type: form.value.cancelOrder,
        value: form.value.most
      },
      affirmTakeDeliveryTime: {
        type: form.value.affirmTakeDeliveryTime,
        value: form.value.automatic
      },
      affirmTakeDeliveryProtect: {
        type: form.value.affirmTakeDeliveryProtect,
        value: form.value.protectionRights
      },
      cancelSafeguard: {
        type: form.value.cancelSafeguard,
        value: form.value.exchange
      },
      safeguardAutomation: {
        type: form.value.automaticProcessing,
        value: form.value.automaticDay
      },
      toApplyForRightsOvertime: {
        type: form.value.businessAutomation,
        value: form.value.businessNum
      },
      trading_enhance: form.value.enhance ? '1' : '0'
    }
    await reqModifyConfig(key, data)
    ElMessage.success('操作成功')
    getTransactionAllocation()
  }
  // 获取交易配置数据
  const getTransactionAllocation = async () => {
    const { data } = await reqSetKeyConfig({ key: 'OrderBaseParam' })
    const transactionData = data.data
    form.value.cancelOrder = transactionData.cancelOrder.type
    form.value.most = transactionData.cancelOrder.value
    form.value.affirmTakeDeliveryTime = transactionData.affirmTakeDeliveryTime.type
    form.value.automatic = transactionData.affirmTakeDeliveryTime.value
    form.value.affirmTakeDeliveryProtect = transactionData.affirmTakeDeliveryProtect.type
    form.value.protectionRights = transactionData.affirmTakeDeliveryProtect.value
    form.value.cancelSafeguard = transactionData.cancelSafeguard.type
    form.value.exchange = transactionData.cancelSafeguard.value
    form.value.automaticProcessing = transactionData.safeguardAutomation.type
    form.value.automaticDay = transactionData.safeguardAutomation.value
    form.value.businessAutomation = transactionData.toApplyForRightsOvertime.type
    form.value.businessNum = transactionData.toApplyForRightsOvertime.value
    form.value.enhance = transactionData.trading_enhance == '1'
  }
  onMounted(() => getTransactionAllocation())
</script>
<style lang="scss" scoped>
  .pay-transaction {
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
        padding: 0 10px;
        line-height: 30px;
      }
      .proportion-inp,
      .most-inp {
        :deep(.el-input__inner) {
          width: 158px;
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
      .operation {
        margin-left: 136px;
        :deep(.el-button) {
          min-height: 32px;
          padding: 2px 46px;
        }
      }
    }
    .set-icon-text {
      display: inline-block;
      margin-left: 15px;
      cursor: pointer;
      color: var(--color-primary);

      i {
        color: var(--color-primary);
      }
    }
    .auto-receiving {
      margin-top: 15px;
    }
  }
</style>
