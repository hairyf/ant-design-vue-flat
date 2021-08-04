<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-27 11:38:20
 * @LastEditTime: 2021-07-10 16:50:30
 * @Description: 应用市场
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <a-form>
    <div class="flex flex-wrap">
      <div>
        <cal-input placeholder="应用名称" v-model="form.name" class="w-208 mr-80" style="height: 100%;box-sizing: border-box"/>
      </div>
      <div class="flex items-center">
        <cal-input-section
          openAutoSize
          placeholder="应用价格"
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
    <cal-classification
      :option="sortClassOption"
      :fieldNames="option"
      @change="getClassValue"
      :load-data="dataFormat"
    />
    <cal-sticky-layout min-height="550">
      <div
        class="grid gap-24 justify-center"
        style="grid-template-columns: repeat(auto-fill, 288px)"
      >
        <cal-card-plugin
          v-for="(item, index) in pluginList"
          :key="Number(index)"
          :itemInfo="item"
          :itemIndex="Number(index)"
        />
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
  import { ref } from 'vue-demi'
  import { useListPagination } from '@/hooks/use-listPagination'
  import CalCardPlugin from './component/CalCardPlugin/index.vue'
  import CalPagination from '~/CustomAntds/CalPagination/index.vue'
  import CalClassification from '~/CustomAntds/CalClassification/index.vue'
  import { reqProductAddons, reqAddonsClassIndex } from '@/api/application'
  interface IForm {
    name: string
    price: any
    addons_class_one_id: string
    addons_class_two_id: string
    // state: string | number
  }
  const form = ref<IForm>({
    name: '',
    price: [],
    addons_class_one_id: '',
    addons_class_two_id: ''
    // state: ''
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
      form.value.addons_class_one_id = classValue[0].toString()
    } else if (classValue.length == 2) {
      form.value.addons_class_one_id = classValue[0].toString()
      form.value.addons_class_two_id = classValue[1].toString()
    } else {
      form.value.addons_class_one_id = ''
      form.value.addons_class_two_id = ''
    }
    resetList()
  }

  const dataFormat = ({ option }: any) => {
    return { ...option, name: '子分类' }
  }
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
