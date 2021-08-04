<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-27 11:38:20
 * @LastEditTime: 2021-07-10 16:50:43
 * @Description: 渠道市场
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <a-form>
    <div class="flex flex-wrap">
      <div>
        <cal-input placeholder="渠道名称" v-model="form.name" class="mr-80 w-208" style="height: 100%;box-sizing: border-box"/>
      </div>
      <div class="flex items-center">
        <cal-input-section
          openAutoSize
          placeholder="渠道价格"
          v-model="form.price"
          class="mr-80 w-208"

        />
      </div>
      <!-- <div class="mt-28">
        <cal-input-select placeholder="购买状态" v-model="form.state" class="w-208">
          <a-select-option value="jack"></a-select-option>
        </cal-input-select>
      </div> -->
    </div>
    <div class="my-28">
      <cal-button type="primary" class="w-112 mr-28" @click="onSubmit">筛选</cal-button>
      <cal-button class="w-112" @click="resetCondition">重置条件</cal-button>
    </div>
  </a-form>
  <cal-card>
    <cal-sticky-layout min-height="550">
      <div
        class="grid gap-24 justify-center"
        style="grid-template-columns: repeat(auto-fill, 288px)"
      >
        <div v-for="(item, index) in pluginList" :key="Number(index)">
          <cal-card style="min-height: 293px">
            <div class="flex">
              <div class="mr-14 w-64 h-64">
                <cal-image :src="item.logo" />
              </div>
              <div class="flex flex-col justify-around">
                <div class="text-base">{{ item.name }}</div>
              </div>
            </div>
            <div class="my-24">
              <span class="mr-14 w-56">售卖价格</span>
              <span class="text-red w-176">¥{{ item.price }}元</span>
            </div>
            <div class="flex my-24">
              <span class="mr-14 w-64">渠道简介</span>
              <span class="text-gray-darkmin w-176">{{ item.remark }}</span>
            </div>
            <div class="absolute bottom-24 left-2/4 transform -translate-x-1/2">
              <cal-button
                v-if="item.pay_status == 1"
                class="text-gray-darkmin border-none bg-gray-light"
                style="width: 102px"
                disabled
              >
                已购买
              </cal-button>
              <cal-button v-else type="primary" @click="onPurchaseItem(item)" style="width: 116px">
                立即购买
              </cal-button>
            </div>
          </cal-card>
        </div>
      </div>
      <template #sticky>
        <div class="flex justify-center mt-16">
          <cal-pagination
            v-model:current="currentPage"
            :total="total"
            v-model:pageSize="pageSize"
          />
        </div>
      </template>
    </cal-sticky-layout>
  </cal-card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue-demi'
  import CalPagination from '~/CustomAntds/CalPagination/index.vue'
  import { reqProductAddons, reqPaypay } from '@/api/channel'
  import { useRouter } from 'vue-router'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { CalPaymentMessage } from '@/components/Business/CalPaymentMessage'
  const router = useRouter()
  const form = ref({
    name: '',
    price: []
    // state: 1
  })

  /** 表格*/
  const {
    list: pluginList,
    total,
    currentPage,
    resetList,
    pageSize
  } = useListPagination({
    getList: async ({ currentPage, total, pageSize }) => {
      const { data } = await reqProductAddons({
        page: currentPage.value,
        limit: pageSize.value,
        search: {
          ...form.value,
          price: form.value.price.join()
        }
      })
      total.value = data.data.total
      return data.data.data
    }
  })

  // 点击进行购买项
  const onPurchaseItem = async (item: any) => {
    // 调起支付
    await CalPaymentMessage({
      title: '购买渠道',
      price: item.price,
      params: {
        type: 3,
        service_manager_id: 1,
        // system_id: 1,
        associate_id: item.id,
        buy_type: item.buy_type
      }
    })
    // 支付成功, 跳转至已购买列表
    router.push('/channel/purchased')
  }
  // 筛选
  const onSubmit = () => {
    resetList()
  }
  // 重置条件
  const resetCondition = () => {
    form.value.name = ''
    form.value.price = []
  }
</script>
<style lang="scss" scoped></style>
