<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-10 15:22:11
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
            v-model="form.memberReset"
            active-color="#13ce66"
            inactive-color="#8C8C8C"
            style="margin-right: 32px"
          >
          </el-switch>
          <el-popover placement="right" :width="50" trigger="hover">
            <el-image
              src="/custom-assets/images/order/Rectangle76.png"
              class="examples-img"
              style="width: 100%; height: 200px"
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
      <el-form-item label="最低充值金额" prop="amount" class="move-left">
        <el-input class="tips-inp" v-model="form.amount"><template #append>元</template></el-input>
      </el-form-item>
    </el-card>
    <el-card shadow="never" class="withdrawal">
      <div class="recharge-title">余额提现设置</div>
      <el-form-item label="余额提现" prop="withdrawal">
        <el-switch v-model="form.withdrawal" active-color="#13ce66" inactive-color="#8C8C8C">
        </el-switch>
        <div class="tips-text">提现功能未开启时，会员不能提现</div>
      </el-form-item>
      <el-form-item label="最低提现额度">
        <el-input class="tips-inp" v-model="form.minimum"><template #append>元</template></el-input>
      </el-form-item>
      <el-form-item label="提现手续费">
        <el-radio v-model="form.serviceCharge" label="1">不扣除</el-radio>
        <el-radio v-model="form.serviceCharge" label="2">自定义</el-radio>
      </el-form-item>
      <el-form-item label="免手续区间">
        <div class="oe-flex">
          <el-input class="tips-inp" v-model="form.section[0]">
            <template #append>元</template>
          </el-input>
          <div style="padding: 0 14px">至</div>
          <el-input class="tips-inp" v-model="form.section[1]">
            <template #append>元</template>
          </el-input>
        </div>
        <div class="tips-text">当提现手续费金额在此区间时，不扣除提现手续费</div>
      </el-form-item>
      <el-form-item label="提现审核" prop="withdrawalAudit">
        <el-radio v-model="form.withdrawalAudit" label="1">手动审核</el-radio>
        <el-radio v-model="form.withdrawalAudit" label="2">自动审核</el-radio>
      </el-form-item>
      <el-form-item label="自动打款" prop="payment">
        <el-switch v-model="form.payment" active-color="#13ce66" inactive-color="#8C8C8C">
        </el-switch>
        <div class="tips-text">提现审核通过将自动打款（支付宝和银行卡仍需要手动打款）</div>
      </el-form-item>
      <el-form-item label="提现方式">
        <el-checkbox-group v-model="form.mode">
          <el-checkbox label="提现到支付宝"></el-checkbox>
          <el-checkbox label="提现到银行卡"></el-checkbox>
          <div class="tips-text">支付宝或银行卡提现时，需要商户手动打款</div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="提现到微信钱包" prop="wechat">
        <el-switch v-model="form.wechat" active-color="#13ce66" inactive-color="#8C8C8C">
        </el-switch>
        <div class="tips-text">
          提现到微信钱包需要先绑定公众号和小程序支付方式，H5不支持提现到微信钱包
        </div>
      </el-form-item>

      <el-form-item label="支持银行卡" prop="bankCard">
        <!-- :prop="'bankCard.' + index + '.val'"
        :rules="rules.bankCard" -->
        <div class="oe-flex banck-box" v-for="(item, index) in form.bankCard" :key="index">
          <el-input v-model.trim="item.val"></el-input>
          <div class="is-color delete-btn" @click="getDelete(index)">删除</div>
        </div>
      </el-form-item>
      <div class="is-color add-btn" @click="getAddBank">添加+</div>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-card>
  </el-form>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue'
  const rechargeForm = ref<any>()
  const form = reactive({
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
    // 手续费
    serviceCharge: '',
    // 手续费区间
    section: ['', ''],
    // 提现审核
    withdrawalAudit: '',
    // 自动打款
    payment: true,
    // 提现方式
    mode: [],
    // 提现到微信钱包
    wechat: true,
    // 银行卡
    bankCard: [
      {
        val: ''
      }
    ]
  })
  // 验证
  const rules = reactive({
    memberReset: [{ required: true, message: '请选择', trigger: 'blur' }],
    balanceText: [{ required: true, message: '请填写余额定义文字', trigger: 'blur' }],
    amount: [{ required: true, message: '请填写最低充值金额', trigger: 'blur' }],
    withdrawal: [{ required: true, message: '请选择', trigger: 'blur' }],
    withdrawalAudit: [{ required: true, message: '请选择', trigger: 'blur' }],
    payment: [{ required: true, message: '请选择', trigger: 'blur' }],
    wechat: [{ required: true, message: '请选择', trigger: 'blur' }],
    bankCard: [{ required: true, message: '请输入', trigger: 'blur' }]
  })
  // 添加银行卡
  const getAddBank = () => {
    form.bankCard.push({ val: '' })
  }
  // 删除银行卡
  const getDelete = (index: number) => {
    if (form.bankCard.length >= 2) {
      form.bankCard.splice(index, 1)
    } else {
      // console.log('至少支持一家银行')
    }
  }
  // 保存按钮
  const submitForm = () => {
    // console.log(rules.rules.fileUrl)
    rechargeForm.value.validate((valid: boolean) => {
      if (valid) {
        // console.log(form)
      } else {
        return false
      }
    })
  }
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
