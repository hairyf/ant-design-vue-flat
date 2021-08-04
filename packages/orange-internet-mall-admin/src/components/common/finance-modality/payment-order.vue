<!--
 * @Author: Mr.wang
 * @Date: 2021-04-16 14:11:12
 * @LastEditTime: 2021-04-16 16:28:36
 * @Description: 支付订单
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-dialog
    title="支付订单"
    v-model="show"
    width="719px"
    custom-class="confirm-receipt"
    @close="onClosePurchaseDialog"
  >
    <div class="extend-box">
      <el-form label-width="100px">
        <el-form-item label="下单业务">空间扩容</el-form-item>
        <el-form-item label="价格">¥1300</el-form-item>
        <el-form-item label="使用时长">永久</el-form-item>
      </el-form>
      <el-form label-width="100px">
        <el-form-item label="订单编号">SMN2020091461099</el-form-item>
        <el-form-item label="下单日期">020-10-27 09:12:52</el-form-item>
        <el-form-item label="下单人员">我是用户名称</el-form-item>
      </el-form>
    </div>
    <el-container>
      <el-aside width="126px">
        <el-menu :default-active="paymentConfigure.code" disabled>
          <el-menu-item
            :index="item.key"
            :disabled="paymentInfo"
            v-for="item in supportList"
            @click="paymentConfigure.code = item.key"
            :key="item.key"
            >{{ item.name }}</el-menu-item
          >
        </el-menu>
      </el-aside>
      <el-main>
        <order-payment
          v-if="paymentInfo"
          :code="paymentConfigure.code"
          :type="paymentInfo.type"
          :data="paymentInfo.data"
          :price="paymentConfigure.price"
        />
        <el-button type="primary" @click="onPayment" v-else>点击进行购买</el-button>
      </el-main>
    </el-container>
  </el-dialog>
  <el-dialog title="支付订单" v-model="purchaseShow" width="719px">
    <div class="purchase-box">
      <div style="text-align: center" v-if="orderInfo.status == 2">
        <el-image src="/custom-assets/images/common/success.png"> </el-image>
        <div class="purchase-title">购买成功</div>
      </div>
      <div style="text-align: center" v-if="orderInfo.status == -1">
        <el-image src="/custom-assets/images/common/success.png"> </el-image>
        <div class="purchase-title">订单自动过期</div>
      </div>
      <div style="text-align: center" v-if="orderInfo.status == 1">
        <el-image src="/custom-assets/images/common/success.png"> </el-image>
        <div class="purchase-title">未支付</div>
      </div>
      <el-form class="form-info" label-width="250px">
        <el-form-item label="实付金额"
          ><span class="purchase-price">¥{{ orderInfo.price }}</span>
        </el-form-item>
        <el-form-item label="订单编号">{{ orderInfo.sn }}</el-form-item>
        <el-form-item label="支付方式">{{ orderInfo.pay_name }}</el-form-item>
      </el-form>
      <el-button type="primary" @click="show = false">确定</el-button>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
  import { ElMessage } from 'element-plus'
  import { ref, computed, watch, defineEmit, defineProps } from 'vue'
  import { reqExpansion, reqPurchaseStatus } from '@/api/common'
  import OrderPayment from '@/components/common/order-payment.vue'
  import { ElLoading } from 'element-plus'
  import { awaitPromise } from '@/utils'
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    }
  })
  const supportList = ref<any[]>([
    {
      key: 'AliPay',
      name: '支付宝'
    },
    {
      key: 'WxPay',
      name: '微信'
    }
  ])
  const paymentConfigure = ref({
    code: 'AliPay' as 'WxPay' | 'AliPay',
    capacity_item_id: '',
    capacity_id: '',
    price: ''
  })
  // 购买显示隐藏
  const purchaseShow = ref(false)
  // 购买信息
  const orderInfo = ref<any>({})
  // 支付信息
  const paymentInfo = ref()
  // ElMessage.success('操作成功!!')
  const currentTab = (item: any) => {
    paymentConfigure.value.capacity_item_id = item.capacity_item_id
    paymentConfigure.value.price = item.price
  }
  // 生成微信订单二维码
  const onPayment = async () => {
    const { data } = await reqExpansion({
      code: paymentConfigure.value.code,
      capacity_item_id: paymentConfigure.value.capacity_item_id,
      capacity_id: paymentConfigure.value.capacity_id
    })
    paymentInfo.value = data.data
  }
  // 支付弹窗关闭时, 判断是否存在支付信息, 存在则轮询接口
  const onClosePurchaseDialog = async () => {
    const loadingInstance = ElLoading.service({
      background: 'rgba(0,0,0,0.1)',
      text: '拼命加载中....',
      spinner: 'el-icon-loading'
    })
    await awaitPromise(5000)
    const { data } = await reqPurchaseStatus({ sn: paymentInfo.value.sn })
    loadingInstance.close()
    orderInfo.value = data.data
    purchaseShow.value = true
  }
  const emit = defineEmit()
  // 多层model绑定数据
  const show = computed({
    get: () => props.show,
    set: () => emit('update:show')
  })
  watch(props, () => {})
</script>
<style lang="scss" scoped>
  .extend-box {
    display: flex;
    justify-content: space-between;
    color: #000;
    :deep(.el-form-item__label) {
      color: #000;
    }
    :deep(.el-form-item) {
      margin-bottom: 10px;
    }
  }
  .el-container {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    margin-top: 22px;
  }
  .el-menu {
    border: none;
  }
  .el-aside {
    min-height: 209px;
    background-color: #f5f5f5;
  }
  .el-main {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-menu-item {
    background-color: #f5f5f5;
    &.is-active {
      background-color: #ffffff;
    }
  }
  .purchase-box {
    position: relative;
    padding-bottom: 40px;
    .el-image {
      width: 48px;
      height: 48px;
    }
    .form-info {
      margin-top: 10px;
    }
    .purchase-title {
      color: #000000;
      font-size: 24px;
    }
    .purchase-price {
      color: #ff0000;
    }
    :deep(.el-form-item) {
      margin-bottom: 5px;
    }
    :deep(.el-form-item__label) {
      color: #000;
    }
    div {
      font-size: 14px;
      color: #000;
    }
    :deep(.el-button) {
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      bottom: 0;
      min-height: 32px;
      padding: 0 46px;
    }
  }
</style>
