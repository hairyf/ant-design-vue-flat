<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-10 16:05:01
 * @Description: 充值提现设置
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-form
    ref="rechargeForm"
    class="recharge-from"
    :rules="rules"
    :model="form"
    label-width="125px"
  >
    <el-card shadow="never">
      <div class="recharge-title">充值设置</div>
      <el-form-item label="会员充值" prop="memberReset" class="move-negative">
        <div class="oe-flex">
          <el-switch
            @click="popupShow(0)"
            v-model="form.memberReset"
            active-color="#13ce66"
            inactive-color="#8C8C8C"
            style="margin-right: 32px"
          >
          </el-switch>
          <el-popover placement="top" :width="210" trigger="hover">
            <el-image
              src="/custom-assets/images/common/recharge.png"
              class="examples-img"
              style="width: 200px; height: 151px"
            />
            <template #reference>
              <div class="is-color">示例</div>
            </template>
          </el-popover>
        </div>
      </el-form-item>

      <el-form-item label="余额文字定义" prop="balanceText" class="move-left">
        <el-input v-model="form.balanceText"></el-input>
      </el-form-item>
      <template v-if="form.memberReset == true">
        <el-form-item label="最低充值金额" prop="amount" class="move-left">
          <el-input
            class="tips-inp"
            v-model="form.amount"
            @input="form.amount = inputInterception(form.amount)"
            ><template #append>元</template></el-input
          >
        </el-form-item>
      </template>
    </el-card>
    <el-card shadow="never" class="withdrawal">
      <div class="recharge-title">余额提现</div>
      <el-form-item label="余额提现" prop="withdrawal">
        <el-switch
          v-model="form.withdrawal"
          active-color="#13ce66"
          @click="popupShow(1)"
          inactive-color="#8C8C8C"
        >
        </el-switch>
        <div class="tips-text">提现功能未开启时，会员不能提现</div>
      </el-form-item>
      <template v-if="form.withdrawal == true">
        <el-form-item label="单笔最低提现" prop="minimum">
          <el-input
            class="tips-inp"
            v-model="form.minimum"
            @input="form.minimum = inputInterception(form.minimum)"
            ><template #append>元</template></el-input
          >
        </el-form-item>
        <el-form-item label="单笔最高提现">
          <el-input
            class="tips-inp"
            v-model="form.maxnum"
            @input="form.maxnum = inputInterception(form.maxnum)"
            ><template #append>元</template></el-input
          >
        </el-form-item>
        <el-form-item label="提现手续费">
          <el-radio v-model="form.serviceCharge" label="1">不扣除</el-radio>
          <el-radio v-model="form.serviceCharge" label="2">自定义</el-radio>
        </el-form-item>
        <template v-if="form.serviceCharge == '2'">
          <el-form-item label="提现手续费">
            <el-input
              class="tips-inp"
              v-model="form.serviceChargeNum"
              @input="form.serviceChargeNum = inputInterception(form.serviceChargeNum)"
              ><template #append>%</template></el-input
            >
          </el-form-item>
          <el-form-item label="免手续区间">
            <div class="oe-flex">
              <el-input
                class="tips-inp"
                v-model="form.section[0]"
                @input="form.section[0] = inputInterception(form.section[0])"
              >
                <template #append>元</template>
              </el-input>
              <div style="padding: 0 14px">至</div>
              <el-input
                class="tips-inp"
                v-model="form.section[1]"
                @input="form.section[1] = inputInterception(form.section[1])"
              >
                <template #append>元</template>
              </el-input>
            </div>
            <div class="tips-text">当提现手续费金额在此区间时，不扣除提现手续费</div>
          </el-form-item>
        </template>
        <el-form-item label="提现审核" prop="withdrawalAudit">
          <el-radio v-model="form.withdrawalAudit" label="1">手动审核</el-radio>
          <el-radio v-model="form.withdrawalAudit" label="2">自动审核</el-radio>
        </el-form-item>
        <el-form-item label="提现金额" v-if="form.withdrawalAudit == '2'" prop="money">
          <el-radio v-model="form.money" label="200"></el-radio>
          <el-radio v-model="form.money" label="500"></el-radio>
          <el-radio v-model="form.money" label="1000"></el-radio>
        </el-form-item>
        <el-form-item label="自动打款" prop="payment">
          <el-switch v-model="form.payment" active-color="#13ce66" inactive-color="#8C8C8C">
          </el-switch>
          <div class="tips-text">自动打款仅支持提现到微信零钱，提现到支付宝则需手动转账</div>
        </el-form-item>
        <el-form-item label="提现方式">
          <el-checkbox-group v-model="form.withdrawalMode">
            <el-checkbox label="AliPay">提现到支付宝</el-checkbox>
            <!-- <el-checkbox label="WxChat">提现到微信零钱</el-checkbox> -->
            <div class="tips-text">提现到支付宝时，需要商户手动打款</div>
          </el-checkbox-group>
        </el-form-item>
      </template>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-card>
  </el-form>
  <div class="delete-box">
    <el-dialog v-model="show" width="550px">
      <template #title>
        <div class="oe-flex">
          <i class="el-icon-warning"></i>
          <div class="card-header">
            <div class="card-header-title" v-if="closeType == 0">关闭余额充值</div>
            <div class="card-header-title" v-else>关闭余额提现</div>
            <div v-if="closeType == 0" class="card-header-text"
              >您确认要关闭余额充值通道吗？关闭后会员将无法充值</div
            >
            <div v-else class="card-header-text"
              >您确认要关闭余额提现通道吗？关闭后会员将无法提现</div
            >
          </div>
        </div>
      </template>
      <template #footer>
        <div class="footer-right">
          <el-button size="mini" @click="determineBtn(true)">取消</el-button>
          <el-button size="mini" type="primary" @click="determineBtn(false)">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { inputInterception } from '@/hooks/reset-time'
  import { reqSetKeyConfig, reqModifyConfig } from '@/api/system'
  import { values } from 'lodash'
  const rechargeForm = ref<any>()
  const form = ref({
    // 会员充值
    memberReset: true,
    // 余额文字自定义
    balanceText: '',
    // 最低充值金额
    amount: '',
    // 余额提现
    withdrawal: true,
    // 最低提现额度
    minimum: '',
    // 最高额度
    maxnum: '',
    // 手续费
    serviceCharge: '',
    // 手续费的值
    serviceChargeNum: '',
    // 手续费区间
    section: ['', ''],
    // 提现审核
    withdrawalAudit: '',
    // 提现金额
    money: '',
    // 自动打款
    payment: true,
    // 提现方式
    withdrawalMode: [],
    // 提现到微信钱包
    wechat: true,
    // 银行卡
    bankCard: [
      {
        val: ''
      }
    ]
  })
  const distributionVerification = (rule: any, value: any, callback: any) => {
    if (value < 0.1) {
      callback(new Error('单笔最低提现不能少于0.1元'))
    } else {
      callback()
    }
  }
  const show = ref(false)
  //0是关闭会员充值 1是关闭余额提现
  const closeType = ref(0)
  // 验证
  const rules = reactive({
    memberReset: [{ required: true, message: '请选择', trigger: 'blur' }],
    balanceText: [{ required: true, message: '请填写余额定义文字', trigger: 'blur' }],
    amount: [{ required: true, message: '请填写最低充值金额', trigger: 'blur' }],
    withdrawal: [{ required: true, message: '请选择', trigger: 'blur' }],
    withdrawalAudit: [{ required: true, message: '请选择', trigger: 'blur' }],
    payment: [{ required: true, message: '请选择', trigger: 'blur' }],
    wechat: [{ required: true, message: '请选择', trigger: 'blur' }],
    bankCard: [{ required: true, message: '请输入', trigger: 'blur' }],
    money: [{ required: true, message: '请选择提现金额', trigger: 'blur' }],
    minimum: [{ required: false, validator: distributionVerification, trigger: 'blur' }]
  })
  const popupShow = (num: number) => {
    if (num == 0 && !form.value.memberReset) {
      show.value = true
      closeType.value = num
    } else if (num == 1 && !form.value.withdrawal) {
      show.value = true
      closeType.value = num
    }
  }
  // 确定关闭
  const determineBtn = (isClose: boolean) => {
    if (closeType.value == 0) {
      form.value.memberReset = isClose
    } else {
      form.value.withdrawal = isClose
    }
    show.value = false
  }
  // 保存按钮
  const submitForm = () => {
    // console.log(rules.rules.fileUrl)
    rechargeForm.value.validate((valid: boolean) => {
      if (valid) {
        modifyRecharge()
      }
    })
  }
  // 修改充值配置
  const modifyRecharge = async () => {
    const key = 'depositWithdrawal'
    const data = {
      deposit: {
        switch: form.value.memberReset == true ? '1' : '0',
        balance_txt: form.value.balanceText,
        lowest_deposit_money: form.value.amount
      },
      withdrawal: {
        switch: form.value.withdrawal == true ? '1' : '0',
        lowest_withdrawal_money: form.value.minimum,
        single_highest_withdrawal_money: form.value.maxnum,
        service_fee_type: form.value.serviceCharge,
        service_fee: form.value.serviceChargeNum,
        fee_exemption: form.value.section,
        withdrawal_examine: form.value.withdrawalAudit,
        withdrawal_sum: form.value.money,
        auto_pay: form.value.payment == true ? '1' : '0',
        withdrawal_type: form.value.withdrawalMode
      }
    }
    await reqModifyConfig(key, data)
    ElMessage.success('操作成功')
    getRechargeConfiguration()
  }
  // 获取充值配置数据
  const getRechargeConfiguration = async () => {
    const { data } = await reqSetKeyConfig({ key: 'depositWithdrawal' })
    const rechargeData = data.data
    form.value.memberReset = rechargeData.deposit.switch == 1
    form.value.balanceText = rechargeData.deposit.balance_txt
    form.value.amount = rechargeData.deposit.lowest_deposit_money
    form.value.withdrawal = rechargeData.withdrawal.switch == 1
    form.value.minimum = rechargeData.withdrawal.lowest_withdrawal_money
    form.value.maxnum = rechargeData.withdrawal.single_highest_withdrawal_money
    form.value.section = rechargeData.withdrawal.fee_exemption
    form.value.serviceCharge = rechargeData.withdrawal.service_fee_type
    form.value.serviceChargeNum = rechargeData.withdrawal.service_fee
    form.value.money = rechargeData.withdrawal.withdrawal_sum
    form.value.withdrawalAudit = rechargeData.withdrawal.withdrawal_examine
    form.value.payment = rechargeData.withdrawal.auto_pay == 1
    form.value.withdrawalMode = rechargeData.withdrawal.withdrawal_type
  }
  onMounted(() => getRechargeConfiguration())
</script>
<style lang="scss" scoped>
  .recharge-from {
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
    }
    .tips-inp {
      :deep(.el-input__inner) {
        width: 140px;
      }
    }
    .move-negative {
      margin-left: -26px;
    }
    .move-left {
      margin-left: 80px;
    }
    .banck-box {
      :deep(.el-input) {
        padding: 2px 0;
      }
    }
    :deep(.el-button) {
      margin-left: 126px;
      min-height: 32px;
      padding: 2px 42px;
    }
    .tips-text {
      line-height: 30px;
      font-size: 12px;
      color: #8c8c8c;
    }
    .recharge-title {
      font-size: 16px;
      font-weight: bold;
      color: #000000;
      margin-bottom: 15px;
    }
    .is-color {
      cursor: pointer;
      color: var(--color-primary);
    }
    .delete-btn {
      margin-left: 14px;
    }
    .add-btn {
      font-size: 14px;
      margin: 24px 0 28px 126px;
    }
    .withdrawal {
      margin-top: 24px;
    }
  }
</style>
