<!--
 * @Author: Mr.wang
 * @Date: 2021-03-23 21:32:24
 * @LastEditTime: 2021-05-08 14:31:40
 * @Description: 退款
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="refund-box"
    ><el-dialog title="退款" v-model="show" width="807px" custom-class="refund-closed">
      <div class="oe-flex protection-tips" v-if="currentItem.is_after_sale == 1">
        <i class="ad-warning"></i>
        <div>当前商品正在维权中，此操作可能存在风险，请谨慎处理！</div>
      </div>
      <el-table
        :data="currentItemCopy.orderGoods"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          :selectable="checkSelectable"
        ></el-table-column>
        <el-table-column label="商品名称" min-width="120px">
          <template #default="scope">
            <div class="oe-flex commodity-box">
              <el-image :src="scope.row.goods_image" fit="cover" class="order-information-img" />
              <div class="commodity-box-right oe-flex-1">
                <div class="box-right">{{ scope.row.goods_title }}</div>
                <el-tag
                  size="mini"
                  color="#D4EBFF"
                  style="color: #55adff"
                  v-if="currentItem.type == '2'"
                  >虚拟</el-tag
                >
                <el-tag
                  size="mini"
                  color="#FBDDD1"
                  style="color: #ec672e"
                  v-if="currentItem.type == '3'"
                  >卡密</el-tag
                >
                <el-tag
                  size="mini"
                  color="#E4FFF8"
                  style="color: #1ad370"
                  v-if="currentItem.type == '1'"
                  >实体</el-tag
                >
                <el-tag
                  size="mini"
                  color="#F4DFD3"
                  style="color: #ef864c"
                  v-if="currentItem.type == '4'"
                  >计时/次</el-tag
                >
                <el-tag
                  size="mini"
                  color="#F8E8CF"
                  style="color: #dd8a0d"
                  v-if="currentItem.type == '5'"
                  >预约</el-tag
                >
                <el-tag
                  size="mini"
                  color="#E9D4F9"
                  style="color: #8f29df"
                  v-if="currentItem.type == '6'"
                  >批发</el-tag
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="实付金额">
          <template #default="scope">
            {{ (scope.row.goods_price * scope.row.goods_num).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="goods_num" label="已退数量/购买数量">
          <template #default="scope">
            {{ scope.row.refund_num }}/{{ scope.row.goods_num }}
          </template>
        </el-table-column>
        <el-table-column label="退款数量">
          <template #default="scope">
            <el-input v-model="scope.row.refundNum" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="退款金额">
          <template #default="scope">
            <el-input
              v-model="scope.row.refund_money"
              type="number"
              @input="scope.row.refund_money = inputInterception(scope.row.refund_money)"
            >
              <template #append>元</template>
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <div class="refund-closed-text"
        >退款总金额：<span>{{ totalAmount }}元</span></div
      >
      <el-form :model="refund" ref="refundForm" :rules="rules" label-width="110px">
        <el-form-item label="系统登录密码" prop="maskPassword">
          <el-input
            placeholder="请输入系统登录密码"
            class="oe-flex-1"
            show-password
            :validate-event="false"
            v-model="refund.maskPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="退款备注" prop="remarks">
          <el-input
            type="textarea"
            placeholder="请输入备注"
            maxlength="200"
            v-model="refund.remarks"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取消</el-button>
          <el-button type="primary" @click="determineBtn" :disabled="!selectList.length"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog></div
  >
</template>

<script lang="ts" setup>
  import { reqRefund, reqVerification } from '@/api/order'
  import { ElMessage } from 'element-plus'
  import { cloneDeep } from 'lodash'
  import { inputInterception } from '@/hooks/reset-time'
  import { ref, watch, computed, defineEmit, defineProps, inject } from 'vue'
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    currentItem: {
      type: Object,
      required: true
    }
  })
  const currentItemCopy = ref<any>()
  // 总金额
  const totalAmount = ref<number>(0)
  //选中的数据
  const selectList = ref<any[]>([])
  const refundForm = ref<any>()
  const refund = ref({
    remarks: '',
    maskPassword: ''
  })
  const handleSelectionChange = (list: any) => {
    selectList.value = list
  }
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
  const rules = ref({
    remarks: [{ required: true, message: '请填写备注', trigger: 'blur' }],
    maskPassword: [{ required: true, validator: checkPassword }]
  })
  // 禁止选中
  const checkSelectable = (row: any) => {
    return row.dispatch_status == 1
  }
  // 确定退款
  const determineBtn = () => {
    refundForm.value.validate(async (valid: boolean) => {
      if (valid) {
        const option = { params: [] } as any
        selectList.value.forEach((item: any) => {
          option.params.push({
            order_id: props.currentItem.id,
            order_item_id: item.id,
            refund_money:
              item.refund_money > item.goods_price ? item.goods_price : item.refund_money,
            refund_num:
              item.refundNum > item.goods_num - item.refund_num
                ? item.goods_num - item.refund_num
                : item.refundNum
          })
        })

        await reqRefund(option)
        show.value = false
        ElMessage.success('操作成功!!')
        emit('resetOrderDetails')
        resetOrderList?.()
      }
    })
  }
  const emit = defineEmit()
  // 多层model绑定数据
  const show = computed({
    get: () => props.show,
    set: () => emit('update:show')
  })
  watch(
    selectList,
    () => {
      totalAmount.value = 0
      if (selectList.value.length) {
        selectList.value.forEach((item: any) => {
          totalAmount.value += Number((item.refund_money * item.refundNum).toFixed(2))
        })
      } else {
        totalAmount.value = 0
      }
    },
    { deep: true }
  )
  watch(props, () => {
    if (props.show) {
      currentItemCopy.value = cloneDeep(props.currentItem)
      currentItemCopy.value.orderGoods.forEach((item: any) => {
        item.refundNum = item.goods_num - item.refund_num < 0 ? 0 : item.goods_num - item.refund_num
        item.refund_money = item.goods_price
      })
    }
  })
  // 调父组件事件
  const resetOrderList = inject<() => void>('resetOrderList')
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .refund-box {
    .refund-closed {
      .dialog-footer {
        .el-button {
          min-height: 32px;
          padding: 0 45px;
          font-size: 14px;
        }
      }
      .el-input-group__append {
        line-height: 30px;
        padding: 0 10px;
      }
    }
    :deep(.cell) {
      color: #000;
    }
    .commodity-box {
      .commodity-box-right {
        margin-left: 10px;
      }
      .box-right {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .el-image {
        width: 50px;
        height: 50px;
      }
      .el-tag--mini {
        padding: 0;
      }
    }
    :deep(.el-input-group__append) {
      padding: 0 8px;
      line-height: 30px;
    }
    :deep(.el-textarea__inner) {
      height: 87px;
    }
    .cell {
      color: #000;
    }
    .refund-closed-text {
      margin: 24px 0;
      font-size: 14px;
      color: #000;
      text-align: right;
      span {
        color: #ff0000;
      }
    }
  }
</style>
