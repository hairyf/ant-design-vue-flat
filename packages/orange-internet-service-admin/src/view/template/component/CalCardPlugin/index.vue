<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-27 15:15:45
 * @LastEditTime: 2021-07-10 18:06:28
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <cal-card class="relative w-500">
    <div class="text-base mb-28">{{ itemInfo.name }}</div>
    <div class="flex">
      <div class="mr-20" style="width: 138px; height: 250px">
        <cal-image
          :src="itemInfo.logo"
          :fallback="errorImage"
          style="width: 138px; height: 250px"
        ></cal-image>
      </div>
      <div class="flex-1">
        <cal-sticky-layout min-height="100%">
          <div class="my-24">
            <span class="mr-14 text-right" style="width: 64px">售卖价格</span>
            <span class="text-red w-176">¥{{ itemInfo.price }}元</span>
          </div>
          <div class="my-24">
            <span class="mr-14 text-right" style="width: 64px">购买量</span>
            <span class="text-gray-darkmin w-176">{{ itemInfo.sale_num }}</span>
          </div>
          <div class="my-24">
            <span class="mr-14 text-right" style="width: 64px">应用简介</span>
            <span class="text-gray-darkmin w-176">{{ itemInfo.remark }}</span>
          </div>
          <template #sticky>
            <div class="flex justify-center">
              <cal-button
                v-if="itemInfo.pay_status == 1"
                class="text-gray-darkmin border-none bg-gray-light"
                style="width: 102px"
                disabled
              >
                已购买
              </cal-button>
              <cal-button v-else type="primary" @click="onPurchaseItem" style="width: 116px">
                立即购买
              </cal-button>
            </div>
          </template>
        </cal-sticky-layout>
      </div>
    </div>
  </cal-card>
</template>
<script lang="ts" setup>
  import { defineProps, ref } from 'vue-demi'
  import { useRouter } from 'vue-router'
  import { CalPaymentMessage } from '@/components/Business/CalPaymentMessage'
  import errorImage from '@/assets/img/template/template-default-image.png'
  const router = useRouter()
  const props = defineProps({
    itemInfo: {
      type: Object,
      required: true
    },
    itemIndex: {
      type: Number,
      required: true
    }
  })

  // 点击进行购买项
  const onPurchaseItem = async () => {
    // 调起支付
    await CalPaymentMessage({
      title: '购买模板',
      price: props.itemInfo.price,
      params: {
        type: 2,
        service_manager_id: 1,
        // system_id: 1,
        associate_id: props.itemInfo.id,
        buy_type: props.itemInfo.buy_type
      }
    })
    // 支付成功, 跳转至已购买列表
    router.push('/template/purchased')
  }
</script>
<style lang="scss" scoped>
  :deep(.ant-image) {
    width: 100%;
    height: 100%;
  }
</style>
