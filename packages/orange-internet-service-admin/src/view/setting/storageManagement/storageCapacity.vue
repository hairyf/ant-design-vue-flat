<!--
 * @Author: Mr.wang
 * @Date: 2021-05-31 11:30:17
 * @LastEditTime: 2021-07-10 15:22:35
 * @Description: 存储容量
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="grid gap-24 justify-center" style="grid-template-columns: repeat(auto-fill, 302px)">
    <div v-for="(item, index) in capacityList" :key="index" class="mb-20">
      <div style="border-radius: 20px" class="h-192 overflow-hidden shadow">
        <div class="text-center text-base py-24 bg-primary text-background">{{ item.name }}</div>
        <div style="font-size: 40px; color: #001426" class="py-32 text-center bg-background">
          {{ item.size }}
        </div>
      </div>
    </div>
  </div>
  <!-- <a-col :xxl="4" :lg="6" :sm="8">231</a-col>
    <a-col :xxl="4" :lg="6" :sm="8">231</a-col>
    <a-col :xxl="4" :lg="6" :sm="8">231</a-col>
    <a-col :xxl="4" :lg="6" :sm="8">231</a-col>
    <a-col :xxl="4" :lg="6" :sm="8">231</a-col> -->
  <a-form class="flex flex-wrap -ml-40">
    <a-form-item>
      <cal-input placeholder="店铺名" v-model="form.name" class="w-192 mx-40" />
    </a-form-item>
  </a-form>
  <div class="mb-28">
    <cal-button type="primary" class="w-112 mr-28" @click="onFilter">筛选</cal-button>
    <cal-button class="w-112" @click="resetFields(), resetList()">重置条件</cal-button>
  </div>
  <cal-card class="mt-24">
    <div class="flex items-center justify-between">
      <div></div>
      <!-- <cal-button type="primary" class="w-112" @click="onFilter">导出</cal-button> -->
      <cal-page-select v-model="pageSize" />
    </div>
    <cal-sticky-layout class="min-h-544">
      <cal-table class="mt-28" :list="list" sync-space>
        <cal-table-option title="店铺ID" min-width="50px" index="shop_id"></cal-table-option>
        <cal-table-option title="店铺LOGO" min-width="80px" v-slot="{ item }">
          <img :src="item.logo_path" class="w-40 h-40 rounded-full" />
        </cal-table-option>
        <cal-table-option title="店铺名称" min-width="80px" index="shop_name"></cal-table-option>
        <cal-table-option title="容量限制" min-width="70px" index="limit_capacity">
        </cal-table-option>
        <!-- <cal-table-option title="已使用/G" min-width="60px" index=""> </cal-table-option> -->
        <cal-table-option title="图片/G" min-width="60px" index="type1_size"> </cal-table-option>
        <cal-table-option title="视频/G" min-width="60px" index="type3_size"> </cal-table-option>
        <cal-table-option title="音频/G" min-width="60px" index="type2_size"> </cal-table-option>
        <cal-table-option title="剩余容量/G" min-width="60px" index="leftover_capacity">
        </cal-table-option>
      </cal-table>
      <template #sticky>
        <div class="flex justify-center mt-20">
          <cal-pagination v-model:current="currentPage" :total="total"> </cal-pagination>
        </div>
      </template>
    </cal-sticky-layout>
  </cal-card>
</template>
<script setup lang="ts">
  import { useListPagination } from '@/hooks/use-listPagination'
  import { ref } from 'vue-demi'
  import { useForm } from '@ant-design-vue/use'
  import { reqCapacityManagementList } from '@/api/setting'
  const activeKey = ref(1)
  const form = ref({
    name: ''
  })
  const capacityList = ref([
    {
      name: '总容量/G',
      size: 0
    },
    {
      name: '今日使用/G',
      size: 0
    },
    {
      name: '图片使用/G',
      size: 0
    },
    {
      name: '音频使用/G',
      size: 0
    },
    {
      name: '视频使用/G',
      size: 0
    }
    // {
    //   name: '其他使用/G',
    //   size: 10
    // }
  ])
  const onFilter = () => {
    resetList()
  }

  const { resetFields } = useForm(form, {})
  /** 表格*/
  const { list, total, currentPage, resetList, pageSize } = useListPagination({
    getList: async ({ currentPage, total, pageSize }) => {
      const { data } = await reqCapacityManagementList({
        page: currentPage.value,
        limit: pageSize.value,
        type: 1
      })
      total.value = data.data.total
      capacityList.value[0].size = data.data.count.total_size
      capacityList.value[1].size = data.data.count.today_size
      capacityList.value[2].size = data.data.count.type1_size
      capacityList.value[3].size = data.data.count.type2_size
      capacityList.value[4].size = data.data.count.type3_size
      return data.data.data
    }
  })
</script>
<style lang="scss" scoped></style>
