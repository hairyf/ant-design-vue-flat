<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-27 11:38:20
 * @LastEditTime: 2021-07-08 17:39:03
 * @Description: 已购应用
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <a-form>
    <div class="flex flex-wrap">
      <div>
        <cal-input placeholder="应用名称" v-model="form.name" class="w-208 mr-80" />
      </div>
      <div class="flex items-center">
        <cal-input-section
          openAutoSize
          placeholder="应用价格"
          v-model="form.price"
          class="mr-80 w-208"
        />
      </div>
    </div>
    <div class="my-28">
      <cal-button type="primary" class="w-112 mr-28" @click="onSubmit">筛选</cal-button>
      <cal-button class="w-112" @click="resetCondition">重置条件</cal-button>
    </div>
  </a-form>

  <cal-tabs v-model:activeKey="form.is_sale">
    <cal-tab-pane v-for="(item, i) in tabs" :key="item.status" hide :disabled="disableChange">
      <template #tab>
        <span>{{ item.title }}</span>
        <!-- <cal-theme-icon type="numberTag"  :state="i === activeKey" v-if='i !== 0' v-if="i != 0">
          {{ item.count || 0 }}
        </cal-theme-icon> -->
        <cal-theme-icon type="numberTag" :state="i === activeKey" v-if="i !== 0 && item.count != 0">
          {{ item.count || 0 }}
        </cal-theme-icon>
      </template>
    </cal-tab-pane>
  </cal-tabs>
  <cal-card class="rounded-tl-none">
    <cal-classification
      :option="sortClassOption"
      :fieldNames="option"
      @change="getClassValue"
      :load-data="dataFormat"
    ></cal-classification>
    <cal-sticky-layout min-height="550">
      <div
        class="grid gap-24 justify-center"
        style="grid-template-columns: repeat(auto-fill, 288px)"
      >
        <cal-card-plugin-purchased
          v-for="(item, index) in pluginList"
          :key="Number(index)"
          :itemInfo="item"
          :itemIndex="form.is_sale"
          :resetList="resetList"
          v-model:isDisable="disableChange"
        ></cal-card-plugin-purchased>
      </div>
      <cal-empty v-if="!pluginList.length" class="mt-100" image="@/assets/img/common/empty.png" />
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
  import { ref, watch } from 'vue-demi'
  import CalCardPluginPurchased from './component/CalCardPluginPurchased/CalCardPluginPurchased.vue'
  import CalPagination from '~/CustomAntds/CalPagination/index.vue'
  import { reqAddonsIndex, reqAddonsClassIndex } from '@/api/application'
  import CalClassification from '~/CustomAntds/CalClassification/index.vue'
  import { useListPagination } from '@/hooks/use-listPagination'
  interface IForm {
    name: string
    price: any
    is_sale: string | number
    services_addon_class_one_id: string
    services_addon_class_two_id: string
  }
  const form = ref<IForm>({
    name: '',
    price: [],
    is_sale: '',
    services_addon_class_one_id: '',
    services_addon_class_two_id: ''
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
      const { data } = await reqAddonsIndex({
        page: currentPage.value,
        limit: pageSize.value,
        search: {
          ...form.value,
          price: form.value.price.join()
        }
      })
      total.value = data.data.total
      tabs.value[1].count = data.data.is_sale_one
      tabs.value[2].count = data.data.is_sale_zero
      tabs.value[3].count = data.data.is_installed_count
      tabs.value[4].count = data.data.is_update_count
      const res = data.data.data
      res.forEach((item: any) => {
        item.currentProgress = 0
      })
      return res
    }
  })

  // 获取应用分类列表
  const sortClassOption = ref<any>({})
  reqAddonsClassIndex().then((res) => {
    sortClassOption.value.name = '分类'
    sortClassOption.value.children = res.data.data
  })
  const option = { label: 'name', value: 'id', children: 'children' }
  // 获取选中的分类id
  const getClassValue = async (classValue: any) => {
    if (classValue.length == 1) {
      form.value.services_addon_class_one_id = classValue[0].toString()
    } else if (classValue.length == 2) {
      form.value.services_addon_class_one_id = classValue[0].toString()
      form.value.services_addon_class_two_id = classValue[1].toString()
    } else {
      form.value.services_addon_class_one_id = ''
      form.value.services_addon_class_two_id = ''
    }

    const res = await reqAddonsIndex({
      limit: pageSize.value,
      page: currentPage.value,
      search: {
        ...form.value,
        price: form.value.price.join()
      }
    })
    pluginList.value = res.data.data.data
  }

  const dataFormat = ({ option }: any) => {
    return { ...option, name: '子分类' }
  }

  //列表渲染
  const disableChange = ref(false)
  const activeKey = ref(0)
  const tabs = ref([
    {
      title: '全部应用',
      item: [],
      status: ''
    },
    {
      title: '已上架',
      count: 0,
      item: [],
      status: 1
    },
    {
      title: '已下架',
      count: 0,
      item: [],
      status: 0
    },
    {
      title: '待安装',
      count: 0,
      item: [],
      status: 2
    },
    {
      title: '待更新',
      count: 0,
      item: [],
      status: 3
    }
  ])

  // 筛选
  const onSubmit = () => {
    resetList()
  }
  // 重置条件
  const resetCondition = () => {
    form.value.name = ''
    form.value.price = []
  }

  watch([() => form.value.is_sale], resetList)
</script>
<style lang="scss" scoped></style>
