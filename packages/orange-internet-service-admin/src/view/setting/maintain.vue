<!--
 * @Author: Mr.wang
 * @Date: 2021-06-25 11:47:04
 * @LastEditTime: 2021-07-01 14:29:26
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-card class="w-1200 mx-auto" v-if="packageData">
    <div class="text-base mb-16">套餐信息</div>
    <a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
      <a-form-item label="套餐名称">{{ packageData.order.name }}</a-form-item>
      <a-form-item label="套餐简介">{{ packageData.order.remark }} </a-form-item>
      <a-form-item label="激活码">{{ packageData.identity_key }}</a-form-item>
      <div class="flex w-1150">
        <a-form-item
          label="购买时间"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
          class="flex-1"
          >{{ packageData.order.finshtime_text }}</a-form-item
        >
        <a-form-item
          label="授权码生效时间"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 14 }"
          class="flex-1"
          >{{ packageData.auth_time_text }}</a-form-item
        >
        <a-form-item
          label="授权码到期时间"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 14 }"
          class="flex-1"
          >{{ packageData.over_time_text }}</a-form-item
        >
      </div>
      <a-form-item label="维护套餐">
        <div class="flex items-center">
          <div v-for="(item, index) in list" :key="index">
            <cal-theme-icon
              border
              type="selectStateBox"
              :state="item.select"
              @click="switchCurrent(item)"
              class="shadow ml-12 my-0 cursor-pointer text-center w-176 py-24"
              border-radius="10"
            >
              <div class="leading-6"
                >维护时长 <span class="text-primary">{{ item.nums }}</span> 年</div
              >
              <div class="text-primary leading-6 mt-10"
                >￥<span class="text-2xl">{{ item.price }}</span></div
              >
            </cal-theme-icon>
          </div>
        </div>
      </a-form-item>
      <a-form-item label=" ">
        <cal-tabs v-model:activeKey="currentType">
          <template v-if="packageData.order.buy_type.indexOf(1) != -1">
            <cal-tab-pane tab="微信支付" key="WxPay" hide :disabled="paymentConfig"> </cal-tab-pane>
            <cal-tab-pane tab="支付宝支付" key="AliPay" hide :disabled="paymentConfig">
            </cal-tab-pane>
          </template>
          <!-- <cal-tab-pane
            tab="在线客服"
            key="Service"
            hide
            :disabled="paymentConfig"
            v-if="packageData.order.buy_type.indexOf(2) != -1"
          >
          </cal-tab-pane> -->
        </cal-tabs>
        <cal-tab-pane alone class="px-0 py-0 w-750">
          <div
            class="h-256 flex items-center justify-center shadow"
            style="border-radius: 0px 20px 20px 20px"
          >
            <!-- 支付成功! -->
            <template v-if="status">
              <div class="flex flex-col">
                <div class="flex items-center justify-center">
                  <i class="nr-after text-green text-4xl mr-10" />
                  <div class="text-xl font-semibold"> 购买成功 </div>
                </div>
              </div>
            </template>
            <!-- 二维码支付 -->
            <template v-else-if="paymentConfig?.type === 'qrcode'">
              <qr-code :text="paymentConfig.data" :size="100" :margin="20" />
              <div class="flex flex-col">
                <div class="text-red text-2xl">¥ {{ currentItem?.price }}</div>
                <div class="text-gray-darkest text-xs mt-5">
                  请使用{{ currentType == 'WxPay' ? '微信' : '支付宝' }}扫码支付
                </div>
              </div>
            </template>
            <!-- 点击支付 -->
            <template v-else-if="currentType !== 'Service'" class="flex items-center">
              <div class="text-red text-2xl">¥ {{ currentItem?.price }}</div>
              <cal-button type="primary" class="ml-12" @click="paymentBtn">点击进行支付</cal-button>
            </template>
            <!-- 联系客服 -->
            <template v-else>
              <!-- <qr-code text="12312" :size="100" :margin="20" /> -->
              <img
                :src="store.state.common.service.customer_ervice.wx"
                alt=""
                class="w-100 h-100 mr-20"
              />
              <div class="flex flex-col">
                <div class="text-xs"
                  >客服电话：{{ store.state.common.service.customer_ervice.phone }}</div
                >
                <div class="text-gray-darkest text-xs mt-10">
                  请扫码添加微信二维码或拨打电话联系客服购买
                </div>
              </div>
            </template>
          </div>
        </cal-tab-pane>
      </a-form-item>
    </a-form>
  </cal-card>
</template>
<script lang="ts" setup>
  import { onMounted, ref, onUnmounted, watch } from 'vue-demi'
  import http from '@/api/http.config'
  import { reqPackageInformation, reqRenewOrder } from '@/api/setting'
  import store from '@/store'

  import { useRouter } from 'vue-router'
  const router = useRouter()
  const currentItem = ref()
  const packageData = ref()
  // 当前支付方式
  const currentType = ref('WxPay')
  const list = ref<any[]>([])
  const paymentConfig = ref()
  const countDown = ref(5)
  const status = ref(false)
  // 创建轮询监视者, 监视响应结果
  const poll = http.poll({
    url: 'business/ServicesShopOrder/platformOrderStatus'
  })
  poll.on<BaseRes>('response', ({ data }) => {
    status.value = data.data.status == 1
    if (status.value) {
      poll.off()
      countDownVanish()
    }
  })
  // 支付完毕, 倒计时结束, 并调起成功
  const countDownVanish = () => {
    const timer = setInterval(() => {
      countDown.value--
      if (countDown.value == 0) {
        clearInterval(timer)
      }
    }, 1000)
    onUnmounted(() => clearInterval(timer))
  }
  // 生成订单
  const paymentBtn = async () => {
    const { data } = await reqRenewOrder({
      service_manager_id: store.state.user.info?.id,
      associate_id: currentItem.value.id,
      type: 6,
      code: currentType.value
    })
    paymentConfig.value = data.data
    poll.emit({ params: { sn: paymentConfig.value.sn } })
  }
  // 获取套餐信息
  const getPacked = async () => {
    const { data } = await reqPackageInformation()
    packageData.value = data.data
    list.value = packageData.value.spec
    list.value.forEach((item: any) => {
      item.select = false
    })
    list.value[0].select = true
    currentItem.value = list.value[0]
  }
  const switchCurrent = (item: any) => {
    if (!item.select) {
      list.value.forEach((item: any) => {
        item.select = false
      })
      item.select = true
    }
    currentItem.value = item
  }
  watch(status, () => {
    if (status.value) {
      setInterval(() => {
        router.go(0)
      }, 500)
    }
  })
  onMounted(() => {
    getPacked()
  })
</script>

<style lang="scss" scoped>
  :deep(.ant-form-item-label > label) {
    color: #8c8c8c;
  }
  :deep(.ant-form-item) {
    margin-bottom: 10px;
  }
  :deep(.ant-tabs-tab.ant-tabs-tab-active) {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.03), 0px 0px 10px rgba(0, 0, 0, 0.02);
  }
</style>
