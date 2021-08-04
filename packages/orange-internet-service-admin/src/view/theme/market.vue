<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-09 17:03:14
 * @LastEditTime: 2021-07-09 10:27:55
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-form class="-ml-40 flex flex-wrap">
    <a-form-item>
      <cal-input placeholder="主题名称" v-model="form.keyword" class="w-192 mx-40" />
    </a-form-item>
    <a-form-item>
      <cal-input-section placeholder="主题价格" v-model="form.price" class="w-192 mx-40" />
    </a-form-item>
  </a-form>
  <div class="mb-28">
    <cal-button type="primary" class="w-112 mr-28" @click="onFilter">筛选</cal-button>
    <cal-button class="w-112" @click="resetFields(), resetList()">重置条件</cal-button>
  </div>
  <cal-card>
    <cal-sticky-layout min-height="600">
      <div class="grid gap-24" style="grid-template-columns: repeat(auto-fill, 288px)">
        <theme-shop-item v-for="(item, index) in list" :key="index" :option="item">
          <template #footer>
            <div class="flex justify-center">
              <cal-button
                v-if="item.pay_status == 0"
                type="primary"
                style="width: 116px"
                @click="onPurchaseItem(item)"
              >
                立即购买
              </cal-button>
              <cal-button v-else disabled style="width: 102px; background: #d9d9d9; color: #8c8c8c"
                >已购买</cal-button
              >
            </div>
          </template>
        </theme-shop-item>
      </div>
      <cal-empty v-if="!list.length" class="mt-100" image="@/assets/img/common/empty.png" />
      <template #sticky>
        <div class="flex justify-center mt-16">
          <cal-pagination v-model:current="currentPage" :total="total" v-model:pageSize="pageSize">
          </cal-pagination>
        </div>
      </template>
    </cal-sticky-layout>
  </cal-card>
</template>
<script lang="ts" setup>
  import { useListPagination } from '@/hooks/use-listPagination'
  import { ref } from 'vue-demi'
  import { useForm } from '@ant-design-vue/use'
  import ThemeShopItem from './components/ThemeShopItem.vue'
  import { reqProductThemeList } from '@/api/theme'
  import { CalPaymentMessage } from '@/components/Business/CalPaymentMessage'
  import router from '@/router'

  /* 筛选项 start */
  const form = ref({
    keyword: '',
    price: ['', ''],
    status: ''
  })
  const onFilter = () => {
    resetList()
  }
  const { resetFields } = useForm(form.value, {})
  /* 筛选项 end */

  const { list, total, currentPage, pageSize, resetList } = useListPagination({
    getList: async ({ currentPage, pageSize }) => {
      const { data } = await reqProductThemeList({
        type: 'backendui',
        page: currentPage.value,
        limit: pageSize.value,
        search: {
          name: form.value.keyword,
          price: form.value.price[0] ? form.value.price.toString() : ''
        }
      })
      total.value = data.data.total
      return data.data.data as any[]
    },
    init: false
  })
  // 点击进行购买项
  const onPurchaseItem = async (item: { id: Key; price: string; buy_type: any }) => {
    // 调起支付
    await CalPaymentMessage({
      title: '购买主题',
      price: item.price,
      params: {
        type: 4,
        service_manager_id: 1,
        // system_id: 1,
        associate_id: item.id,
        buy_type: item.buy_type
      }
    })
    // 支付成功, 跳转至已购买列表
    router.push('/theme/purchased')
  }

  await resetList()
</script>
<style lang="scss"></style>
