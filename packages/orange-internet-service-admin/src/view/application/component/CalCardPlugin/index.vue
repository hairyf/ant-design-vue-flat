<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-27 15:15:45
 * @LastEditTime: 2021-07-08 18:21:08
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <cal-card class="relative" style="min-height: 293px">
    <div class="flex">
      <div class="mr-14 w-64 h-64">
        <cal-image :src="itemInfo.logo"></cal-image>
      </div>
      <div class="flex flex-col justify-around">
        <div class="text-base">{{ itemInfo.name }}</div>
        <div class="px-10 py-2 text-xs text-gray-darkmin bg-gray-darkest bg-opacity-20 rounded-3xl"
          >版本 {{ itemInfo.version }}</div
        >
      </div>
    </div>
    <div class="my-24">
      <span class="mr-14 w-56">售卖价格</span>
      <span class="text-red w-176">¥{{ itemInfo.price }}元</span>
    </div>
    <div class="flex my-24">
      <span class="mr-14" style="width: 64px">应用简介</span>
      <span class="text-gray-darkmin w-176">{{ itemInfo.remark }}</span>
    </div>
    <div class="absolute bottom-24 left-2/4 transform -translate-x-1/2">
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
  </cal-card>
</template>
<script lang="ts" setup>
  import { defineProps, ref } from 'vue-demi'
  import { useRouter } from 'vue-router'
  import { CalPaymentMessage } from '@/components/Business/CalPaymentMessage'
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
      title: '购买应用',
      price: props.itemInfo.price,
      params: {
        type: 1,
        service_manager_id: 1,
        // system_id: 1,
        associate_id: props.itemInfo.id,
        buy_type: props.itemInfo.buy_type
      }
    })
    // 支付成功, 跳转至已购买列表
    router.push('/application/purchased')
  }
</script>
<style lang="scss" scoped>
  .mask {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
