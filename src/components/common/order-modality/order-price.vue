<!--
 * @Author: Mr.wang
 * @Date: 2021-03-31 19:16:02
 * @LastEditTime: 2021-05-10 18:47:39
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="price-change-box">
    <!-- <el-dialog title="改价" v-model="show" width="523px" custom-class="order-price-box">
      <div class="oe-flex protection-tips" v-if="option.is_after_sale == 1">
        <i class="ad-warning"></i>
        <div>当前商品正在维权中，此操作可能存在风险，请谨慎处理！</div>
      </div>
      <el-form
        label-width="120px"
        class="price-box"
        :model="priceForm"
        ref="rejectForm"
        :rules="rules"
      >
        <el-form-item label="订单编号">{{ option.order_sn }}</el-form-item>
        <el-form-item label="商品数量"> 1件 </el-form-item>
        <el-form-item label="订单总价"> ¥{{ option.total_fee }}</el-form-item>
        <el-form-item label="变更订单总价">
          <el-input
            v-model="changePrice"
            @input="changePrice = inputInterception(changePrice)"
            type="number"
          >
            <template #append>元</template></el-input
          >
        </el-form-item>
        <el-form-item label="系统登录密码" prop="maskPassword">
          <el-input
            placeholder="请输入系统登录密码"
            class="oe-flex-1"
            show-password
            :validate-event="false"
            v-model="priceForm.maskPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="改价备注" prop="remarks">
          <el-input
            type="textarea"
            placeholder="请输入备注"
            maxlength="200"
            v-model="priceForm.remarks"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取消</el-button>
          <el-button type="primary" @click="getModify"> 确定 </el-button>
        </span>
      </template>
    </el-dialog> -->
    <el-dialog title="改价" v-model="show" width="800px" custom-class="order-price-box">
      <el-button type="text" class="record" @click="getRecordList">改价记录</el-button>
      <div class="oe-flex protection-tips" v-if="option.is_after_sale == 1">
        <i class="ad-warning"></i>
        <div>当前商品正在维权中，此操作可能存在风险，请谨慎处理！</div>
      </div>
      <el-table :data="option.orderGoods" tooltip-effect="dark" style="width: 100%">
        <el-table-column label="商品名称">
          <template #default="scope">
            <div class="oe-flex commodity-box">
              {{ scope.row.goods_title }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="单价">
          <template #default="scope"> ¥{{ scope.row.goods_price }} </template>
        </el-table-column>
        <el-table-column prop="goods_num" label="数量">
          <template #default="scope">
            {{ scope.row.goods_num }}
          </template>
        </el-table-column>
        <el-table-column label="小计">
          <template #default="scope">
            ¥ {{ (scope.row.goods_price * scope.row.goods_num).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="money" label="定价/元">
          <template #default="scope">
            <el-input
              v-model="scope.row.orderItemsMoney"
              @input="scope.row.orderItemsMoney = inputInterception(scope.row.orderItemsMoney)"
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="运费">
          <template #default="scope">
            <el-input
              v-model="scope.row.dispatch_fee"
              @input="scope.row.dispatch_fee = inputInterception(scope.row.dispatch_fee)"
            >
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <div class="total-box">
        <div class="total-box-text1">原价：¥{{ option.goods_original_amount }}</div>
        <div class="total-box-text1">商品价格：¥{{ option.goods_amount }}</div>
        <div class="total-box-text1">运费：¥{{ option.dispatch_amount }}</div>
        <div class="total-box-text1"
          ><span class="total-box-text1">实付：</span>
          <span class="total-box-text2">¥{{ option.pay_fee }}</span></div
        >
      </div>
      <el-form :model="reject" ref="rejectForm" :rules="rules" label-width="110px">
        <el-form-item label="系统登录密码" prop="maskPassword">
          <el-input
            placeholder="请输入系统登录密码"
            class="oe-flex-1"
            show-password
            :validate-event="false"
            v-model="reject.maskPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="改价备注" prop="remarks">
          <el-input
            type="textarea"
            placeholder="请输入备注"
            maxlength="200"
            v-model="reject.remarks"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <!-- <el-form
        label-width="120px"
        class="price-box"
        :model="priceForm"
        ref="rejectForm"
        :rules="rules"
      >
      </el-form> -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取消</el-button>
          <el-button type="primary" @click="getModify"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog title="改价记录" v-model="recordShow" width="800px">
      <el-table :data="recordList" style="width: 100%">
        <el-table-column prop="remark" label="事件"> </el-table-column>
        <el-table-column prop="name" label="时间" width="170px">
          <template #default="scope"> {{ formatUnix(scope.row.createtime) }}</template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="recordShow = false">取 消</el-button>
          <el-button type="primary" @click="recordShow = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { reqPriceChange, reqVerification, reqjournalData } from '@/api/order'
  import { formatUnix } from '@/utils'
  import { inputInterception } from '@/hooks/reset-time'
  import { ElMessage } from 'element-plus'
  import { ref, computed, inject, defineEmit, defineProps, watch } from 'vue'
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    option: {
      type: Object,
      required: true
    }
  })
  const recordShow = ref(false)
  // 改价记录
  const recordList = ref<any>([])
  const rejectForm = ref<any>()
  const reject = ref({
    remarks: '',
    maskPassword: ''
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
  const rules = ref({
    remarks: [{ required: true, message: '请填写备注', trigger: 'blur' }],
    maskPassword: [{ required: true, validator: checkPassword }]
  })
  // 获取改价记录
  const getRecordList = async () => {
    const { data } = await reqjournalData({
      order_id: props.option.id,
      title: '订单商品改价'
    })
    recordShow.value = true
    recordList.value = data.data.data
  }
  // 确定按钮
  const getModify = () => {
    rejectForm.value.validate(async (valid: boolean) => {
      if (valid) {
        const list = [] as any[]
        props.option.orderGoods.forEach((item: any) => {
          list.push({
            orderItemsId: item.id,
            orderItemsMoney: item.orderItemsMoney,
            orderItemsDispatch: item.dispatch_fee
          })
        })
        await reqPriceChange({
          id: props.option.id,
          param: list,
          remark: reject.value.remarks
          // id: props.option.id,
          // total_fee: changePrice.value,
          // remark: priceForm.value.remarks
        })
        resetOrderList?.()
        ElMessage.success('操作成功!!')
        emit('resetOrderDetails')
        show.value = false
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
    () => props.show,
    () => {
      props.option.orderGoods.forEach((item: any) => {
        item.orderItemsMoney = item.goods_price
      })
      // changePrice.value = props.option.total_fee
    }
  )
  // 调父组件事件
  const resetOrderList = inject<() => void>('resetOrderList')
</script>

<style lang="scss" scoped>
  .price-change-box {
    .record {
      position: absolute;
      cursor: pointer;
      font-size: 12px;
      top: 11px;
      left: 100px;
      color: var(--color-primary);
    }
    .price-box {
      font-size: 14px;
      color: #000;
      :deep(.el-input-group__append) {
        line-height: 30px;
      }
    }
    .dialog-footer {
      .el-button {
        min-height: 32px;
        padding: 0 45px;
        font-size: 14px;
      }
    }
    :deep(.el-form-item__label) {
      font-size: 14px;
      color: #000;
      line-height: 32px;
    }
    :deep(.el-form-item__content) {
      line-height: 32px;
    }
    :deep(.el-textarea__inner) {
      height: 100px;
    }
    :deep(.cell) {
      color: #000;
    }
    .el-input {
      width: 100%;
    }
    .total-box {
      margin-top: 42px;
      padding-bottom: 24px;
      // position: absolute;
      // bottom: 24px;
      // right: 32px;
      .total-box-text1 {
        text-align: right;
        font-size: 14px;
        line-height: 32px;
        color: #000000;
      }
      .total-box-text2 {
        text-align: right;
        color: #ff0000;
        line-height: 32px;
        font-size: 14px;
      }
    }
    // :deep(.el-input) {
    //   input::-webkit-outer-spin-button,
    //   input::-webkit-inner-spin-button {
    //     -webkit-appearance: none;
    //   }
    //   input[type='number'] {
    //     -moz-appearance: textfield;
    //   }
    // }
  }
</style>
