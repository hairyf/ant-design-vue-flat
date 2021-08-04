<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-28 09:29:24
 * @LastEditTime: 2021-07-09 17:29:17
 * @Description: 店铺列表
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-list">
    <a-form class="-ml-40 flex flex-wrap">
      <a-form-item>
        <cal-input
          placeholder="店铺ID/店铺名称/联系人/电话"
          v-model="form.keyword"
          class="w-192 mx-40"
        />
      </a-form-item>
      <a-form-item>
        <cal-input-select placeholder="套餐状态" v-model="form.combo_status" class="w-192 mx-40">
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="3">正常使用</a-select-option>
          <!-- <a-select-option value="jack">正常试用</a-select-option> -->
          <a-select-option value="2">即将过期</a-select-option>
          <a-select-option value="1">已过期</a-select-option>
        </cal-input-select>
      </a-form-item>
      <a-form-item>
        <cal-input-select placeholder="店铺类型" v-model="form.is_tryout" class="w-192 mx-40">
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="0">营业店铺</a-select-option>
          <a-select-option value="1">试用店铺</a-select-option>
        </cal-input-select>
      </a-form-item>
      <!-- <a-form-item>
        <cal-input-select placeholder="店铺状态" v-model="form.status" class="w-192 mx-40">
          <a-select-option value=" ">全部</a-select-option>
          <a-select-option value="8">正常营业</a-select-option>
          <a-select-option value="jack">正常试用</a-select-option>
          <a-select-option value="7">暂停服务</a-select-option>
        </cal-input-select>
      </a-form-item> -->
      <a-form-item>
        <cal-input-date
          placeholder="创建时间"
          v-model="form.create_time"
          class="w-192 mx-40"
          toSecond
        />
      </a-form-item>
      <a-form-item>
        <cal-input-date
          placeholder="到期时间"
          v-model="form.Deadline"
          class="w-192 mx-40"
          toSecond
        />
      </a-form-item>
    </a-form>
    <div class="mb-28">
      <cal-button type="primary" class="w-112 mr-28" @click="onFilter">筛选</cal-button>
      <cal-button class="w-112" @click="resetFields(), resetList()">重置条件</cal-button>
    </div>
    <cal-tabs v-model:activeKey="currentTab">
      <cal-tab-pane v-for="(item, i) in tabs" :key="i" hide>
        <template #tab>
          <span>{{ item.title }}</span>
          <number-tag :state="currentTab === i" v-if="item.const >= 0">
            {{ item.const }}
          </number-tag>
        </template>
      </cal-tab-pane>
    </cal-tabs>
    <!-- table 固定内容 -->
    <cal-tab-pane alone :min-height="600">
      <div class="flex justify-between items-center">
        <div class="flex-1 flex items-center">
          <cal-button
            class="w-144 mr-28 text-base"
            style="height: 38px"
            icon-class="nr-increase"
            type="primary"
            @click="$router.push('addShop')"
          >
            新增店铺
          </cal-button>
          <!-- <cal-button class="w-144 h-36 mr-10" type="primary"> 导出报表 </cal-button> -->
          <span class="text-xs mr-14">已有店铺数量：{{ total }}</span>
          <div class="flex items-center" @click="refreshBtn">
            <cal-button type="link" class="px-4">刷新</cal-button>
            <i
              class="text-sm nr-refresh2 text-primary cursor-pointer"
              :class="isRotate ? 'rotate' : ''"
            />
          </div>
        </div>
        <cal-page-select v-model="pageSize" />
      </div>
      <cal-table class="mt-28" :list="list">
        <cal-table-option title="店铺信息" min-width="200" v-slot:default="{ item }">
          <div class="flex items-center">
            <img class="w-48 h-48 mr-10" :src="item.logo_path" alt="" />
            <div class="flex flex-col">
              <span class="mb-6">{{ item.name }}</span>
              <span>ID：{{ item.id }}</span>
            </div>
          </div>
        </cal-table-option>
        <cal-table-option title="店铺联系人信息" min-width="115px" v-slot:default="{ item }">
          <div class="flex flex-col">
            <span class="mb-6">{{ item.liaisons }}</span>
            <span>{{ item.liaisons_tel }}</span>
          </div>
        </cal-table-option>
        <cal-table-option
          title="总交易金额"
          min-width="90px"
          sort
          v-slot:default="{ item }"
          index="statistic.totalBuyMoney"
        >
          ￥{{ item.statistic.totalBuyMoney }}
        </cal-table-option>
        <cal-table-option
          title="交易总订单数"
          min-width="100px"
          sort
          index="statistic.totalOrder"
        />
        <cal-table-option title="店铺套餐" min-width="84px" index="combo_name" />
        <cal-table-option
          title="套餐状态"
          min-width="100px"
          sort
          index="combo_status"
          v-slot:default="{ item }"
        >
          <span v-if="item.combo_status == 0" class="text-gray-darkmin">未开启</span>
          <span v-if="item.combo_status == 1" class="text-gray-darkmin">已过期</span>
          <span v-if="item.combo_status == 2" class="text-red">即将过期</span>
          <span v-if="item.combo_status == 3" class="text-primary">正常使用</span>
        </cal-table-option>
        <cal-table-option
          title="店铺类型/状态"
          min-width="120px"
          sort
          index="combo_is_tryout"
          v-slot:default="{ item }"
        >
          <span>类型：{{ item.combo_is_tryout == 0 ? '营业店铺' : '试用店铺' }} </span>
          <span>状态：{{ shopStatus[item.status] }}</span>
        </cal-table-option>
        <cal-table-option
          title="创建/到期时间"
          min-width="280px"
          sort
          index="createtime"
          v-slot:default="{ item }"
        >
          <span>创建时间：{{ $formatUnix(item.createtime) }}</span>
          <span
            >到期时间：{{
              item.combo_permanent_effective == 0 ? $formatUnix(item.combo_deadline) : '永久'
            }}</span
          >
        </cal-table-option>
        <cal-table-option title="操作" minWidth="214px" border-left v-slot="{ item }">
          <div>
            <cal-button
              size="small"
              style="width: 76px"
              class="mr-10 my-6"
              @click="
                router.push({
                  path: '/shop/detail',
                  query: {
                    id: item.id,
                    title: item.combo_is_tryout == 0 ? '营业店铺详情' : '试用店铺详情'
                  }
                })
              "
            >
              查看
            </cal-button>
            <!-- <cal-button size="small" style="width: 76px" class="mr-10 my-6">拒绝</cal-button>
            <cal-button size="small" style="width: 76px" class="mr-10 my-6">通过</cal-button> -->
          </div>
        </cal-table-option>
      </cal-table>
      <template #sticky>
        <div class="flex justify-center mt-16">
          <cal-pagination v-model:current="currentPage" :total="total" v-model:pageSize="pageSize">
          </cal-pagination>
        </div>
      </template>
    </cal-tab-pane>
  </div>
</template>
<script lang="ts" setup>
  import { reqShopList } from '@/api/shop'
  import { useForm } from '@ant-design-vue/use'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { ref, watch } from 'vue-demi'
  import NumberTag from '~/CustomAntds/CalThemeIcon/NumberTag.vue'
  import { useRouter,useRoute } from 'vue-router'

  import { message } from 'ant-design-vue'
  import dayjs from 'dayjs'

  enum ShopStatus {
    已封禁 = 0,
    待审核 = 1,
    审核失败 = 2,
    审核通过 = 3,
    已选择套餐 = 4,
    创建失败 = 5,
    支付成功 = 6,
    暂停营业 = 7,
    正常营业 = 8
  }
  const isRotate = ref(false)
  const router = useRouter()
  const shopStatus = ShopStatus

  /** 筛选 start */
  const form = ref({
    keyword: '',
    combo_status: '',
    is_tryout: '',
    create_time: '',
    Deadline: '',
    status: ''
  })
  // 筛选
  const onFilter = () => {
    resetList()
  }
  const { resetFields } = useForm(form.value, {})
  /** 筛选 end */

  /** 标签页 start */
  const tabs = ref([
    { title: '全部店铺', const: 0 },
    { title: '正常营业', const: 0 },
    { title: '暂停服务', const: 0 }
  ])
  const route = useRoute();

  const currentTab = ref(0)// 0全部 1 正常营业 2暂停服务
  currentTab.value = +route?.query?.tab || 0

  /** 标签页 end */

  /** 表格 start */
  const { list, total, currentPage, pageSize, resetList } = useListPagination({
    getList: async ({ currentPage, total, pageSize }) => {
      if (form.value.create_time) {
        dayjs(Number(form.value.create_time)).unix()
      }
      if (form.value.Deadline) {
        dayjs(Number(form.value.Deadline)).unix()
      }
      if (form.value.status == '') {
        delete form.value.status
      }
      if(currentTab.value == 1)
      {
        form.value.status = 8;
      }else if(currentTab.value == 2)
      {
        form.value.status = 7;
      }

      const { data } = await reqShopList({
        page: currentPage.value,
        limit: pageSize.value,
        search: form.value
      })
      tabs.value[0].const = data.data.count.all
      tabs.value[1].const = data.data.count.normal
      tabs.value[2].const = data.data.count.suspension
      total.value = data.data.total
      if (isRotate.value) {
        message.success('刷新成功！')
        isRotate.value = false
      }
      return data.data.data
    }
  })
  /** 表格 end */
  watch(currentTab, () => {

    if (currentTab.value == 0) {
      form.value.status = ''
    } else {
      currentTab.value == 1 ? (form.value.status = '8') : (form.value.status = '7')
    }
    resetList()
  })
  // 刷新列表
  const refreshBtn = () => {
    isRotate.value = true
    setTimeout(() => {
      resetList()
    }, 1000)
  }

</script>
<style lang="scss" scoped>
  .rotate {
    animation: rotation 1.25s linear infinite;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
</style>
