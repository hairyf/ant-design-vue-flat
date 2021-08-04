<!--
 * @Author: Mr.wang
 * @Date: 2021-03-23 21:34:04
 * @LastEditTime: 2021-04-23 11:58:34
 * @Description: 确定收货
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="confirm-receipt-box">
    <el-dialog :title="titleText" v-model="show" width="554px" custom-class="confirm-receipt">
      <div class="oe-flex protection-tips" v-if="currentItem.is_after_sale == 1">
        <i class="ad-warning"></i>
        <div>当前商品正在维权中，此操作可能存在风险，请谨慎处理！</div>
      </div>
      <div class="confirm-receipt-tips" v-if="determine == 0">
        手动确认收货：确保买家已经收到您的商品，并且与买家协商完毕提前确认收货
      </div>
      <!-- <div class="confirm-receipt-tips" v-if="determine == 1">
      确认使用：已于买家协商完毕，确认使用
    </div> -->
      <div class="confirm-receipt-tips" v-if="determine == 1">
        确认付款：您已确定会员已付款了吗？
      </div>
      <el-form
        ref="passwordForm"
        :model="form"
        class="adjust-form"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="系统登录密码" prop="maskPassword">
          <el-input
            :validate-event="false"
            placeholder="请输入系统登录密码"
            class="oe-flex-1"
            show-password
            v-model="form.maskPassword"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- <div class="oe-flex">
      <div class="confirm-receipt-text">系统登录密码</div>
    
    </div> -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取消</el-button>
          <el-button type="primary" @click="determineBtn">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { reqConfirmPayment, reqConfirmRCeceipt, reqVerification } from '@/api/order'
  import { ElMessage } from 'element-plus'
  import { ref, computed, defineEmit, defineProps, watch, inject, reactive } from 'vue'
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    currentItem: {
      type: Object,
      required: true
    },
    determine: {
      type: Number
    }
  })
  const form = ref({
    maskPassword: ''
  })
  const passwordForm = ref<any>()
  // 标题
  const titleText = ref('')
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
    maskPassword: [{ required: true, validator: checkPassword }]
  })
  const determineBtn = () => {
    passwordForm.value.validate((valid: boolean) => {
      if (valid) {
        receivingGoods()
      }
    })
  }
  // 验证成功
  const receivingGoods = async () => {
    if (props.determine == 0) {
      // 确定收货
      await reqConfirmRCeceipt({ id: props.currentItem.id })
      show.value = false
    } else {
      //  确认付款
      await reqConfirmPayment({
        id: props.currentItem.id
      })
    }
    show.value = false
    ElMessage.success('操作成功!!')
    emit('resetOrderDetails')
    resetOrderList?.()
  }
  watch(props, () => {
    if (props.determine == 0) {
      titleText.value = '确认收货'
    } else {
      titleText.value = '确认付款'
    }
  })
  const emit = defineEmit()
  // 多层model绑定数据
  const show = computed({
    get: () => props.show,
    set: () => emit('update:show')
  })
  // 调父组件事件
  const resetOrderList = inject<() => void>('resetOrderList')
</script>
<style lang="scss" scoped>
  .confirm-receipt-box {
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
    .confirm-receipt {
      .confirm-receipt-tips {
        width: 100%;
        margin-bottom: 30px;
        padding: 0 0 0 14px;
        height: 34px;
        font-size: 12px;
        line-height: 34px;
        color: #262626;
        background: rgba(255, 157, 40, 0.2);
        border: 1px solid var(--color-primary);
        box-sizing: border-box;
        border-radius: 2px;
      }
      .el-input__inner {
        background: #f5f5f5;
      }
      .confirm-receipt-text {
        margin-right: 14px;
        font-size: 14px;
        color: #000000;
      }
    }
  }
</style>
