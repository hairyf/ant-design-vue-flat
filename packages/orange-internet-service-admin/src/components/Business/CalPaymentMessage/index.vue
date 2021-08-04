<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-04 17:47:34
 * @LastEditTime: 2021-07-05 17:33:10
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <cal-message-dialog
    v-bind="props"
    @ok="onConfirm"
    @cancel="onClone"
    :title="title"
    width="804px"
    customBackground="#F2F6FA"
    :showFooter="false"
  >
    <cal-tabs v-model:activeKey="currentType">
      <cal-tab-pane tab="微信支付" key="WxPay" hide :disabled="paymentConfig" />
      <cal-tab-pane tab="支付宝支付" key="AliPay" hide :disabled="paymentConfig" />
      <cal-tab-pane tab="在线客服" key="Service" hide :disabled="paymentConfig" />
    </cal-tabs>
    <cal-tab-pane alone>
      <div
        class="h-256 flex justify-center items-center"
        :class="[paymentConfig || currentType === 'Service' ? 'flex-row' : 'flex-col']"
      >
        <!-- 支付成功! -->
        <template v-if="paymentConfig?.type === 'END'">
          <div class="flex flex-col">
            <div class="flex items-center justify-center">
              <i class="nr-after text-green text-4xl mr-10" />
              <div class="text-xl font-semibold"> 购买成功 </div>
            </div>
            <div class="text-center mt-28 mb-10"> {{ countDown }}s 后将自动跳转到已购买页面 </div>
          </div>
        </template>
        <!-- 二维码支付 -->
        <template v-else-if="paymentConfig?.type === 'qrcode'">
          <qr-code :text="paymentConfig.data" :size="100" :margin="20" />
          <div class="flex flex-col">
            <div class="text-red text-2xl">¥ {{ price }}</div>
            <div class="text-gray-darkest text-xs mt-5">
              请使用{{ currentType == 'WxPay' ? '微信' : '支付宝' }}扫码支付
            </div>
          </div>
        </template>
        <!-- 点击支付 -->
        <template v-else-if="currentType !== 'Service'">
          <div class="text-red text-2xl">¥ {{ price }}</div>
          <cal-button class="mt-10" type="primary" @click="onClickPayment">点击进行支付</cal-button>
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
            <div class="text-xs">
              客服电话：{{ store.state.common.service.customer_ervice.phone }}
            </div>
            <div class="text-gray-darkest text-xs mt-10">
              请扫码添加微信二维码或拨打电话联系客服购买
            </div>
          </div>
        </template>
      </div>
    </cal-tab-pane>
  </cal-message-dialog>
</template>
<script lang="ts" setup>
  import http from '@/api/http.config'
  import { reqGoPayOrder, reqPlaceThemeOrder } from '@/api/theme'
  import { useModelRef } from '@/hooks/use-modelRef'
  import store from '@/store'
  import { defineEmit, defineProps, onUnmounted, ref, watch } from 'vue-demi'
  const emit = defineEmit()
  const props = defineProps({
    title: {
      type: String,
      default: '购买'
    },
    request: {
      type: Object as () => (type: 'WxPay' | 'AliPay') => Promise<PaymentConfig>,
      required: true
    },
    price: {
      type: String,
      default: '0'
    },
    type: {
      type: String
    },
    params: {
      type: Object as () => PlaceAnOrderConfig,
      required: true
    },
    // 是否展示组件
    modelValue: {
      type: Boolean,
      default: undefined
    },
    // 组件消失时(实例方法 > 移除实例)
    onVanish: Function,
    // 组件调用成功事件
    onResolve: Function,
    // 组件调用失败事件
    onReject: Function
  })

  // 双向数据绑定, 假如该值不存在, 则创建值
  const showModal = useModelRef(props, 'modelValue')
  // 隐藏时, 触发 props 中的组件移除
  watch(showModal, (value) => {
    if (value) return false
    setTimeout(() => props.onVanish?.(), 300)
    poll.off()
  })
  // 关闭事件
  const onClone = () => {
    if (status.value) return onConfirm()
    props.onReject?.()
    emit('cancel', false)
    showModal.value = false
  }
  // 确定事件
  const onConfirm = () => {
    props.onResolve?.(paymentConfig.value)
    emit('ok', paymentConfig.value)
    showModal.value = false
  }

  // 当前支付方式
  const currentType = ref('WxPay')
  // 支付参数
  const paymentConfig = ref<PaymentConfig>()
  // 是否支付完毕
  const status = ref(false)
  // 倒计时, 用于倒计时关闭弹窗
  const countDown = ref(5)

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
  // 请求支付参数
  const getPaymentConfig = async () => {
    const request = props.type === 'renew' ? reqGoPayOrder : reqPlaceThemeOrder
    console.log(props.params)
    const { data } = await request({
      sn: '',
      code: currentType.value,
      ...props.params
    })
    return data.data
  }
  // 点击进行支付, 发送轮询查找
  const onClickPayment = async () => {
    paymentConfig.value = await getPaymentConfig()
    poll.emit({ params: { sn: paymentConfig.value.sn } })
  }
  // 支付完毕, 倒计时结束, 销毁弹窗, 并调起成功
  const countDownVanish = () => {
    const timer = setInterval(() => {
      countDown.value--
      if (countDown.value == 0) {
        onConfirm()
        clearInterval(timer)
      }
    }, 1000)
    onUnmounted(() => clearInterval(timer))
  }

  if (props.type === 'renew') {
    onClickPayment()
    if (props.params.code) currentType.value = props.params.code
  }
</script>
<style lang="scss"></style>
