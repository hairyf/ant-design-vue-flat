<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-08 19:59:13
 * @LastEditTime: 2021-04-10 15:38:43
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="template-list">
    <div class="template-item" v-for="(item, index) in list" :key="index">
      <el-card shadow="never">
        <!-- <div class="silk-ribbon">免费</div> -->
        <el-image class="cover-image" fit="cover" :src="item.img" />
        <div class="template-item-info oe-flex oe-row-between">
          <span class="title">{{ item.name }}</span>
          <span class="increase-count">
            <i class="ad-increase" />
            <span class="text">0k</span>
          </span>
        </div>
        <div class="hover-mask oe-flex oe-row-center">
          <template v-if="type === 'list'">
            <el-button type="primary" v-if="item.is_buy == 0" @click="onPurchaseTemplate(item.id)">
              购买模板
            </el-button>
            <el-button type="primary" v-else>新增副本</el-button>
            <el-button class="oe-m-t-15">浏览</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="onSeleteTemplate(item.id)">使用</el-button>
          </template>
        </div>
      </el-card>
    </div>
  </div>
  <el-dialog
    title="购买模板"
    v-model="showPurchaseDialog"
    width="40%"
    @close="onClosePurchaseDialog"
  >
    <el-form>
      <el-form-item label="模板名称"> {{ purchaseInfo.name }} </el-form-item>
      <el-form-item label="模板价格">
        <span style="color: red">￥ {{ price }}</span>
      </el-form-item>
      <el-form-item label="模板市场">
        <el-radio-group v-model="form.sale_type">
          <el-radio label="4">永久</el-radio>
          <el-radio label="1">{{ purchaseInfo.day_num }}天</el-radio>
          <el-radio label="2">{{ purchaseInfo.month_num }}月</el-radio>
          <el-radio label="3">{{ purchaseInfo.year_num }}年</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-container>
          <el-aside width="126px">
            <el-menu :default-active="form.code" disabled>
              <el-menu-item
                :index="item.key"
                :key="item.key"
                v-for="item in purchaseInfo.pay"
                @click="form.code = item.key"
                :disabled="paymentInfo"
              >
                {{ item.name }}
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
            <order-payment
              v-if="paymentInfo"
              :code="form.code"
              :type="paymentInfo.type"
              :data="paymentInfo.data"
              :price="price"
            />
            <el-button type="primary" @click="onPayment" v-else>点击进行购买</el-button>
          </el-main>
        </el-container>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="showOrderInfo" title="购买模板" custom-class="order-dialog">
    <div class="container">
      <div class="oe-flex oe-m-b-24">
        <i class="el-icon-success" />
        <div class="title oe-m-l-10">
          {{ orderInfo.status == 2 ? '支付成功' : '订单新增成功' }}
        </div>
      </div>
      <div class="text oe-m-b-28">
        您已付款成功，请到模块管理>已购模板去查看您购买过的模板
        如果在五分钟之内无法查看到已购买模板，请联系客服
      </div>
      <el-form class="form-info">
        <el-form-item :label="orderInfo.status == 2 ? '实付金额' : '应付金额'">
          <span class="price">¥{{ orderInfo.amount }}</span>
        </el-form-item>
        <el-form-item label="订单编号">{{ orderInfo.sn }}</el-form-item>
        <el-form-item label="支付方式">{{ orderInfo.pay_name }}</el-form-item>
        <el-form-item label="模板名称">{{ orderInfo.template_name }}</el-form-item>
      </el-form>
      <el-button type="primary">确定</el-button>
    </div>
  </el-dialog>
  <el-empty v-if="!list?.length" class="oe-m-30" description="暂无模板" />
</template>
<script lang="ts" setup>
  import {
    reqSeleteTemplateItem,
    reqPurchaseInfo,
    reqBuyTemplate,
    reqTemplateOrder
  } from '@/api/shop'
  import router from '@/router'
  import { reactive, ref } from '@vue/reactivity'
  import { computed, defineProps } from '@vue/runtime-core'
  import OrderPayment from '@/components/common/order-payment.vue'
  import { ElLoading } from 'element-plus'
  import { awaitPromise } from '@/utils'
  defineProps({
    type: {
      type: String as () => 'list' | 'selete-list',
      default: 'list'
    },
    list: Array as () => any[]
  })
  // 点击使用当前模板
  const onSeleteTemplate = async (shop_template_id: Key) => {
    const { data } = await reqSeleteTemplateItem(shop_template_id)
    router.push({
      path: 'decorate',
      query: { id: data.data.id }
    })
  }
  // 当前购买方式, 选中ID
  const form = reactive({
    id: 0 as Key,
    code: 'WxPay' as 'WxPay' | 'AliPay',
    sale_type: '4'
  })
  // 是否展开购买模态框
  const showPurchaseDialog = ref(false)
  // 获取当前购买信息
  const purchaseInfo = ref()
  // 当前价格
  const price = computed(() => {
    const strategy: Record<string, any> = {
      4: purchaseInfo.value.forever_price,
      1: purchaseInfo.value.day_price,
      2: purchaseInfo.value.month_price,
      3: purchaseInfo.value.year_price
    }
    return strategy[form.sale_type]
  })
  // 当前支付信息
  const paymentInfo = ref()
  // 点击当前购买模板, 获取支付信息
  const onPurchaseTemplate = async (shop_template_id: Key) => {
    const { data } = await reqPurchaseInfo(shop_template_id)
    showPurchaseDialog.value = true
    form.id = shop_template_id
    purchaseInfo.value = data.data
    form.code = data.data.pay[0].key
  }
  // 点击进行支付
  const onPayment = async () => {
    const { data } = await reqBuyTemplate(form)
    paymentInfo.value = data.data
  }
  // 支付弹窗关闭时, 判断是否存在支付信息, 存在则轮询接口
  const onClosePurchaseDialog = async () => {
    if (!paymentInfo.value) return false
    const orderCode = paymentInfo.value.sn
    paymentInfo.value = undefined
    const loadingInstance = ElLoading.service({
      background: 'rgba(0,0,0,0.1)',
      text: '拼命加载中....',
      spinner: 'el-icon-loading'
    })
    await awaitPromise(5000)
    const { data } = await reqTemplateOrder(orderCode)
    loadingInstance.close()
    orderInfo.value = data.data
    showOrderInfo.value = true
  }
  // 当前订单信息
  const orderInfo = ref()

  // 是否展开订单详情弹窗
  const showOrderInfo = ref(false)
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .v-enter,
  .v-leave-to {
    opacity: 0;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.2s;
  }
  .template-list {
    display: inline-block;
    width: 100%;
  }
  .template-item {
    margin-bottom: 20px;
    width: 230px;
    display: inline-block;
    margin-right: 24px;
    &:hover {
      .hover-mask {
        opacity: 1;
      }
    }
    :deep(.el-card__body) {
      position: relative;
      overflow: hidden;
    }
    .silk-ribbon {
      @include top-left-silk-ribbon(#0066ff);
    }
    .hover-mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      flex-direction: column;
      transition: 0.5s;
      .el-button {
        margin: 0;
        width: 120px;
      }
    }

    .cover-image {
      height: 300px;
      width: 100%;
    }
    &-info {
      margin-top: 14px;
      margin-bottom: 20px;
      .title {
        font-size: 14px;
      }
      .increase-count {
        .ad-increase {
          font-size: 13px;
          margin-right: 5px;
        }
        font-size: 11px;
        color: #8c8c8c;
      }
    }
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-aside {
    background-color: #f5f5f5;
    height: 209px;
  }
  .el-menu {
    border: none;
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
  .order-dialog {
    .container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    .el-icon-success {
      font-size: 55px;
      color: #1ad370;
    }
    .title {
      font-weight: 500;
      font-size: 24px;
      font-weight: bold;
    }
    .text {
      width: 550px;
    }
    .price {
      color: red;
    }
    .form-info {
      width: 412px;
      margin-bottom: 30px;
    }
    .el-button {
      width: 200px;
    }
  }
</style>
