<!--
 * @Author: Zhilong
 * @Date: 2021-05-27 09:56:02
 * @LastEditTime: 2021-07-06 10:14:04
 * @Description: 试用店铺
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->

<template>
  <a-form class="-ml-40 flex flex-wrap">
    <a-form-item>
      <cal-input
        :placeholder="'订单编号/店铺名称/店铺ID'"
        v-model="form.osid"
        class="w-192 mx-40"
      />
    </a-form-item>
    <a-form-item>
      <cal-input-select placeholder="订单类型" v-model="form.type" class="w-192 mx-40">
        <a-select-option :value="''">全部</a-select-option>
        <a-select-option :value="1">应用订单</a-select-option>
        <a-select-option :value="6">店铺订单</a-select-option>
        <a-select-option :value="3">渠道订单</a-select-option>
        <a-select-option :value="2">模板订单</a-select-option>
        <a-select-option :value="4">主题订单</a-select-option>
        <a-select-option :value="5">空间扩容订单</a-select-option>
        <!-- <a-select-option :value="7">其他订单</a-select-option> -->
      </cal-input-select>
    </a-form-item>
    <!-- <a-form-item>
      <cal-input-select placeholder="订单状态" v-model="form.status" class="w-192 mx-40">
        <a-select-option :value="''">全部</a-select-option>
        <a-select-option :value="0">待付款</a-select-option>
        <a-select-option :value="2">已完成</a-select-option>
        <a-select-option :value="-1">已关闭</a-select-option>
      </cal-input-select>
    </a-form-item> -->
    <a-form-item>
      <cal-input-select placeholder="支付方式" v-model="form.pay_code" class="w-192 mx-40">
        <a-select-option :value="''">全部</a-select-option>
        <a-select-option v-for="(item, i) in paymentMode" :key="i" :value="item.key">
          {{ item.name }}
        </a-select-option>
      </cal-input-select>
    </a-form-item>
    <a-form-item>
      <cal-input-date
        toSecond
        placeholder="下单时间"
        v-model="form.createtime"
        class="w-192 mx-40"
      />
    </a-form-item>
    <a-form-item>
      <cal-input-date
        toSecond
        placeholder="完成时间"
        v-model="form.finshtime"
        class="w-192 mx-40"
      />
    </a-form-item>
    <a-form-item>
      <cal-input-date
        toSecond
        placeholder="关闭时间"
        v-model="form.canceltime"
        class="w-192 mx-40"
      />
    </a-form-item>
  </a-form>
  <div class="mb-28">
    <cal-button type="primary" class="w-112 mr-28" @click="resetList()">筛选</cal-button>
    <cal-button class="w-112" @click="resetFields(), resetList()">重置条件</cal-button>
  </div>
  <cal-tabs v-model:activeKey="activeKey" @change="resetList()">
    <cal-tab-pane v-for="(item, i) in tabs" :key="i" hide>
      <template #tab>
        <span>{{ item.title }}</span>
        <cal-theme-icon type="numberTag"  :state="i === activeKey" v-if='i !== 0'>
          {{ item.count || 0 }}
        </cal-theme-icon>
      </template>
    </cal-tab-pane>
  </cal-tabs>
  <!-- table固定内容 -->
  <cal-tab-pane alone :min-height="600">
    <div class="flex justify-between">
      <cal-button class="w-144" type="primary" @click="onExport">导出</cal-button>
      <cal-page-select v-model="pageSize" />
    </div>
    <cal-table class="mt-28" contentAlign="left" :list="list" sync-space>
      <cal-table-option title="订单编号" index="sn" min-width="182" />
      <cal-table-option title="订单类型" index="type" min-width="86" sort v-slot="{ content }">
        {{
          ['其他订单', '应用订单', '模板订单', '渠道订单', '主题订单', '控件扩容订单', '店铺订单'][
            content
          ] || '其他订单'
        }}
      </cal-table-option>
      <cal-table-option title="支付金额" index="amount" min-width="66" v-slot="{ content }">
        <div>￥{{ content }}</div>
      </cal-table-option>
      <cal-table-option title="支付方式" index="pay_name" min-width="80" v-slot="{ content }">
        <div>{{ content || '-' }}</div>
      </cal-table-option>
      <cal-table-option title="店铺名称/ID" min-width="158" v-slot="{ item }">
        <div class="flex items-center">
          <img class="w-48 h-48 mr-10" :src="item.logo_path" />
          <div class="flex flex-col">
            <a href="javascript:;" class="mb-6 text-primary">{{ item.shop_name }}</a>
            <a href="javascript:;" class="text-primary">ID:{{ item.shop_id }}</a>
          </div>
        </div>
      </cal-table-option>
      <cal-table-option title="联系人/联系方式" min-width="104" v-slot="{ item }">
        <div class="flex flex-col text-primary">
          <a href="javascript:;" class="mb-6">{{ item.liaisons }}</a>
          <a href="javascript:;">{{ item.liaisons_tel }}</a>
        </div>
      </cal-table-option>
      <cal-table-option title="订单状态" min-width="56" index="status" v-slot="{ content }">
        {{ content === -1 ? '已关闭' : content === 0 ? '待付款' : '已完成' }}
      </cal-table-option>
      <cal-table-option
        title="下单时间"
        min-width="145"
        index="finshtime"
        sort
        v-slot="{ content }"
      >
        {{ $formatUnix(content) }}
      </cal-table-option>
      <cal-table-option title="操作" min-width="186" border-left v-slot="{ item }">
        <div>
          <cal-button
            size="small"
            style="width: 76px"
            class="mr-10 my-6"
            @click="$router.push('/order/merchant/orderDetail?type=onTrial&id=' + item.id)"
          >
            查看
          </cal-button>
          <cal-button
            size="small"
            style="width: 76px"
            class="mr-10 my-6"
            v-if="item?.status === 0"
            @click="confirmPayment(item.id, item)"
          >
            确认支付
          </cal-button>
          <cal-button
            size="small"
            style="width: 76px"
            class="mr-10 my-6"
            v-if="item?.status === 0"
            @click="closeOrder(item.id, item)"
          >
            关闭
          </cal-button>
        </div>
      </cal-table-option>
    </cal-table>
    <template #sticky>
      <div class="flex justify-center">
        <cal-pagination v-model="currentPage" v-model:pageSize="pageSize" :total="total" />
      </div>
    </template>
  </cal-tab-pane>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue-demi'
  import { useForm } from '@ant-design-vue/use'
  import { useListPagination } from '@/hooks/use-listPagination'
  import {
    reqCancelOrder,
    reqConfirmPayment,
    reqOrderPaymentMode,
    reqTryOutExport,
    reqTryOutOrderList
  } from '@/api/order'
  import { CalConfirmPayment, CalCloseOrder } from './components/MessageDialogTemplate/index'
  import { message } from 'ant-design-vue'
  import { reqVerification } from '@/api/shop'
  import { exportReport } from '@/utils/vue-utils'
  const form = reactive({
    osid: '',
    type: '',
    status: '',
    pay_code: '',
    createtime: '',
    finshtime: '',
    canceltime: ''
  })

  /* 支付方式选择 */
  const paymentMode = ref<any>([])
  ;(async () => {
    const { data } = await reqOrderPaymentMode()
    paymentMode.value = data.data
  })()

  /* 确定支付 */
  const confirmPayment = async (id: number, item: any) => {
    const { text, password } = await CalConfirmPayment()
    await reqVerification({ confirmPwd: password })
    await reqConfirmPayment({ id, type: 0, admin_pay_remark: text })
    item.status = 2
    message.success('确认支付成功', 1.5)
  }

  /* 关闭订单 */
  const closeOrder = async (id: number, item: any) => {
    const { text } = await CalCloseOrder()
    await reqCancelOrder({ id, cancel_remark: text })
    item.status = -1
    message.success('订单关闭成功', 1.5)
  }

  //列表渲染
  const tabs = ref([
    {
      title: '全部订单',
      count: 0,
      item: []
    },
    {
      title: '待付款',
      count: 0,
      item: []
    },
    {
      title: '已完成',
      count: 0,
      item: []
    },
    {
      title: '已关闭',
      count: 0,
      item: []
    }
  ])

  /** 重置筛选项 */
  const { resetFields } = useForm(form, {})

  /** 当前tab项index */
  const activeKey = ref(0)

  /** 获取数据列表 */
  const { list, total, pageSize, currentPage, resetList } = useListPagination({
    async getList({ total, pageSize, currentPage }) {
      const { data } = await reqTryOutOrderList({
        search: {
          ...form,
          status: ['', 0, 2, -1][activeKey.value],
          createtime: form.createtime && [form.createtime, form.createtime + 60 * 60 * 24],
          finshtime: form.finshtime && [form.finshtime, form.finshtime + 60 * 60 * 24],
          canceltime: form.canceltime && [form.canceltime, form.canceltime + 60 * 60 * 24]
        },
        page: currentPage.value,
        limit: pageSize.value
      })
      total.value = data.data.total
      /* 全部订单才赋值 */
      if (activeKey.value === 0) {
        tabs.value[0].count = data.data.total
        tabs.value[1].count = data.data.no_payment
        tabs.value[2].count = data.data.completed
        tabs.value[3].count = data.data.cancel_order
      }
      return data.data.data
    }
  })

  /** 导出列表 */
  const onExport = async () => {
    const { data } = await reqTryOutExport({
      limit: pageSize.value,
      search: {
        ...form,
        status: ['', 0, 2, -1][activeKey.value],
        createtime: form.createtime && [form.createtime, form.createtime + 60 * 60 * 24],
        finshtime: form.finshtime && [form.finshtime, form.finshtime + 60 * 60 * 24],
        canceltime: form.canceltime && [form.canceltime, form.canceltime + 60 * 60 * 24]
      }
    })
    exportReport(data, '试用店铺订单' + Date.now())
  }
</script>
