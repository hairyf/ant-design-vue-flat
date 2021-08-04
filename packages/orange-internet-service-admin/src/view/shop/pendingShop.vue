<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-28 09:31:26
 * @LastEditTime: 2021-06-30 09:20:18
 * @Description: 待处理店铺
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-form class="-ml-40 flex flex-wrap">
    <a-form-item>
      <cal-input
        placeholder="店铺ID/店铺名称/联系人/电话"
        v-model="form.search"
        class="w-192 mx-40"
      />
    </a-form-item>
    <a-form-item>
      <cal-cascader
        v-model:value="form.type"
        :options="options"
        :display-render="displayRender"
        expand-trigger="hover"
        placeholder="店铺类目"
        :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
      />
    </a-form-item>
    <a-form-item>
      <cal-input-date placeholder="申请时间" v-model="form.applyTime" class="w-192 mx-40" />
    </a-form-item>
  </a-form>
  <div class="mb-28">
    <cal-button type="primary" class="w-112 mr-28" @click="onFilter">筛选</cal-button>
    <cal-button class="w-112" @click="resetFields(), resetList()">重置条件</cal-button>
  </div>
  <cal-tabs v-model:activeKey="activeKey">
    <cal-tab-pane v-for="(item, i) in tabs" :key="i" hide>
      <template #tab>
        <span>{{ item.title }}</span>
        <cal-theme-icon type="numberTag" :state="i === activeKey" v-if="i !== 0">
          {{ item.count || 0 }}
        </cal-theme-icon>
      </template>
    </cal-tab-pane>
  </cal-tabs>
  <!-- table固定内容 -->
  <cal-tab-pane alone :min-height="600">
    <div class="flex justify-between">
      <cal-button class="w-144" type="primary" @click="exportBtn">导出</cal-button>
      <cal-page-select v-model="pageSize" />
    </div>
    <cal-table class="mt-28" contentAlign="left" :list="list">
      <cal-table-option title="店铺信息" minWidth="261px" v-slot="{ item }">
        <div class="flex items-center">
          <img class="w-48 h-48 mr-10" :src="item.logo_path" alt="" />
          <div class="flex flex-col">
            <span class="mb-6">{{ item.name }}</span>
            <span>ID：{{ item.id }}</span>
          </div>
        </div>
      </cal-table-option>
      <cal-table-option title="店铺联系人信息" index="type" minWidth="217px" v-slot="{ item }">
        <div class="flex flex-col">
          <span class="mb-6">{{ item.liaisons }}</span>
          <span>{{ item.liaisons_tel }}</span>
        </div>
      </cal-table-option>
      <cal-table-option title="店铺类目" minWidth="196px" sort index="category" />
      <cal-table-option title="店铺状态" minWidth="180px" sort v-slot="{ item }">
        <div v-if="item.status == 1">待审核</div>
        <div v-if="item.status == 2">已拒绝</div>
        <div v-if="item.status == 3 || item.status == 4">待创建</div>
      </cal-table-option>
      <cal-table-option
        title="店铺地址"
        minWidth="210px"
        sort
        v-slot="{ item }"
        index="province_name"
      >
        <div v-if="item.province_name"> {{ item.province_name }}/{{ item.city_name }} </div>
        <div v-else> 暂无 </div>
      </cal-table-option>
      <cal-table-option title="申请时间" minWidth="220px" sort index="createtime_text">
      </cal-table-option>
      <cal-table-option title="操作" minWidth="214px" border-left v-slot="{ item }">
        <div>
          <cal-button
            size="small"
            style="width: 76px"
            class="mr-10 my-6"
            @click="
              $router.push({
                path: '/shop/pendDetail',
                query: {
                  title:
                    item.status == 1
                      ? '待审核店铺详情'
                      : item.status == 2
                      ? '已拒绝店铺详情'
                      : '待创建店铺详情',
                  id: item.id
                }
              })
            "
            >查看</cal-button
          >
          <template v-if="item.status == 1">
            <cal-button
              size="small"
              style="width: 76px"
              class="mr-10 my-6"
              @click="refuseBtn(item.id)"
              >拒绝</cal-button
            >
            <cal-button
              size="small"
              style="width: 76px"
              class="mr-10 my-6"
              @click="adoptBtn(item.id)"
              >通过</cal-button
            >
          </template>
        </div>
      </cal-table-option>
    </cal-table>
    <template #sticky>
      <div class="flex justify-center">
        <cal-pagination v-model:current="currentPage" :total="total"> </cal-pagination>
      </div>
    </template>
  </cal-tab-pane>
  <CalMessageDialog title="拒绝申请" v-model="show" @ok="setExamine(2)">
    <cal-textarea
      v-model="remarks"
      placeholder="拒绝原因（最多输入50字）"
      :max-legth="50"
      class="h-176 mb-36"
    >
    </cal-textarea>
  </CalMessageDialog>
</template>
<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue-demi'
  import { useForm } from '@ant-design-vue/use'
  import { reqIndustryClassIndex } from '@/api/setting'
  import { reqPendingList, reqpenShopExamine, reqExportList } from '@/api/shop'
  import { useListPagination } from '@/hooks/use-listPagination'
  import dayjs from 'dayjs'
  import { CalMessageDialog as CalMessage } from '@/components/CustomAntds/CalMessageDialog'
  import { message } from 'ant-design-vue'
  import { exportReport } from '@/utils/vue-utils'
  const form = reactive({
    search: '',
    type: [],
    status: '',
    applyTime: ''
  })
  const remarks = ref('')
  const show = ref(false)
  const currentId = ref('')
  const options = ref<any[]>([])
  const { resetFields } = useForm(form, {})
  const activeKey = ref(0)
  // 开始筛选
  const onFilter = () => {
    resetList()
  }
  //列表渲染
  const tabs = ref([
    {
      title: '全部店铺',
      count: 0
    },
    {
      title: '待创建',
      count: 0
    },
    {
      title: '待审核',
      count: 0
    },
    {
      title: '已拒绝',
      count: 0
    }
  ])
  /** 表格 start */
  const { list, total, currentPage, resetList, pageSize } = useListPagination({
    getList: async ({ currentPage, total, pageSize }) => {
      const search = {
        search: form.search,
        createtime: form.applyTime ? dayjs(Number(form.applyTime)).unix() : ''
      } as any
      if (form.type.length == 1) {
        search.industry_class_parent_id = form.type[0]
      }
      if (form.type.length == 2) {
        search.industry_class_parent_id = form.type[0]
        search.industry_class_id = form.type[1]
      }
      if (activeKey.value != 0) {
        search.status = activeKey.value == 1 ? '3' : activeKey.value == 2 ? '1' : '2'
      }
      const { data } = await reqPendingList({
        page: currentPage.value,
        search,
        limit: pageSize.value
      })
      total.value = data.data.total
      tabs.value[0].count = data.data.all
      tabs.value[1].count = data.data.create
      tabs.value[2].count = data.data.audit
      tabs.value[3].count = data.data.refuse
      return data.data.data
    }
  })
  //
  const exportBtn = async () => {
    const { data } = await reqExportList({
      search: {
        search: form.search,
        createtime: form.applyTime ? dayjs(Number(form.applyTime)).unix() : ''
      },
      page: currentPage.value,
      limit: pageSize.value
    })
    exportReport(data, '待处理店铺')
  }
  /** 表格 end */
  // 筛选店铺类目方法
  const displayRender = ({ labels }: { labels: string[] }) => {
    return labels[labels.length - 1]
  }
  // 拒绝
  const refuseBtn = (id: string) => {
    remarks.value = ''
    show.value = true
    currentId.value = id
  }
  // 通过
  const adoptBtn = async (id: string) => {
    remarks.value = ''
    await CalMessage.warning({
      title: '通过申请',
      content: '您确认通过此开店申请么？'
    })
    setExamine(3, id)
  }
  // 审核接口
  const setExamine = async (status: number, id?: string) => {
    await reqpenShopExamine({
      id: id ? id : currentId.value,
      status,
      refuse_reason: remarks.value
    })
    message.success('操作成功！')
    resetList()
  }
  watch(activeKey, () => {
    resetList()
  })
  reqIndustryClassIndex().then((res: any) => {
    options.value = res.data.data
  })
</script>
<style lang="scss" scoped>
  :deep(.ant-cascader-picker) {
    background-color: transparent;
  }
</style>
