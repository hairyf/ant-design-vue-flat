<!--
 * @Author: liupei
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <a-form>
    <div class="flex flex-wrap">
      <div>
        <cal-input placeholder="模板名称" v-model="form.name" class="w-208 mr-80" />
      </div>
      <div class="flex items-center">
        <cal-input-section
          openAutoSize
          placeholder="模板价格"
          v-model="form.price"
          class="mr-80 w-208"
        />
      </div>
      <!-- <div class="mt-28">
        <cal-input-select placeholder="购买状态" v-model="form.status" class="w-208">
          <a-select-option value="jack"></a-select-option>
        </cal-input-select>
      </div> -->
    </div>
  </a-form>
  <div class="my-28">
    <cal-button type="primary" class="w-112 mr-28" @click="onSubmit">筛选</cal-button>
    <cal-button class="w-112" @click="resetCondition">重置条件</cal-button>
  </div>
  <cal-tabs v-model:activeKey="form.is_sale">
    <cal-tab-pane v-for="(item, i) in tabs" :key="item.status" hide :disabled="disableChange">
      <template #tab>
        <span>{{ item.title }}</span>
        <cal-theme-icon type="numberTag" :state="i === activeKey" v-if="i != 0">
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
        style="grid-template-columns: repeat(auto-fill, 500px)"
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
  import CalCardPluginPurchased from './component/CalCardPluginPurchased/index.vue'
  import CalPagination from '~/CustomAntds/CalPagination/index.vue'
  import { reqTemplateIndex, reqTemplateClassIndex } from '@/api/template'
  import CalClassification from '~/CustomAntds/CalClassification/index.vue'
  import { useListPagination } from '@/hooks/use-listPagination'
  const form = ref({
    name: '',
    price: [] as any,
    is_sale: '' as Key,
    services_template_class_one_id: '',
    services_template_class_two_id: ''
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
      pageSize.value = 9
      const { data } = await reqTemplateIndex({
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
      const res = data.data.data
      res.forEach((item: any) => {
        item.currentProgress = 0
      })
      return res
    }
  })

  // 获取模板分类列表
  const sortClassOption = ref<any>({})
  reqTemplateClassIndex().then((res) => {
    sortClassOption.value.name = '分类'
    sortClassOption.value.children = res.data.data
  })
  const option = { label: 'name', value: 'id', children: 'children' }
  // 获取选中的分类id
  const getClassValue = async (classValue: any) => {
    if (classValue.length == 1) {
      form.value.services_template_class_one_id = classValue[0].toString()
    } else if (classValue.length == 2) {
      form.value.services_template_class_one_id = classValue[0].toString()
      form.value.services_template_class_two_id = classValue[1].toString()
    } else {
      form.value.services_template_class_one_id = ''
      form.value.services_template_class_two_id = ''
    }

    const res = await reqTemplateIndex({
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
  const activeKey = ref(0)
  const tabs = ref([
    {
      title: '全部模板',
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
    }

    // ,
    // {
    //   title: '待安装',
    //   count: 0,
    //   item: []
    // }
  ])
  const disableChange = ref(false)
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
