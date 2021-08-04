<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-06-15 10:23:12
 * @LastEditTime: 2021-06-16 19:28:55
 * @Description: 短信购买列表
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <div class="cal-list">
    <a-form class="-ml-40 flex flex-wrap">
      <a-form-item>
        <cal-input placeholder="商户名称/账号/手机号" v-model="form.osid" class="w-192 mx-40" />
      </a-form-item>
      <a-form-item class="place-an-order">
        <!-- <cal-input-date placeholder="下单时间" v-model="form.createtime" class="w-192 mx-40" /> -->
        <a-range-picker v-model:value="form.createtime" placeholder="下单时间" />
      </a-form-item>
    </a-form>
    <div class="mb-28">
      <cal-button type="primary" class="w-112 mr-28" @click="onFilter">筛选</cal-button>
      <cal-button class="w-112" @click="resetFilter">重置条件</cal-button>
    </div>
    <cal-tabs v-model:activeKey="form.status">
      <!-- <cal-tab-pane v-for="(item, i) in tabs" :key="i === 0 ? '' : i - 1" hide>
        <template #tab>
          <span>{{ item.title }}</span>
          <cal-theme-icon type="numberTag"  :state="i === activeKey" v-if='i !== 0' v-if="i != 0">
            {{ item.const || 0 }}
          </cal-theme-icon>
        </template>
      </cal-tab-pane> -->
      <cal-tab-pane key="" hide>
        <template #tab>
          <span>全部</span>
        </template>
      </cal-tab-pane>

      <cal-tab-pane :key="0" hide>
        <template #tab>
          <span>待付款</span>
          <cal-theme-icon type="numberTag" state>
            {{ countData.paid }}
          </cal-theme-icon>
        </template>
      </cal-tab-pane>
      <cal-tab-pane :key="2" hide>
        <template #tab>
          <span>已完成</span>
          <cal-theme-icon type="numberTag" state>
            {{ countData.completed }}
          </cal-theme-icon>
        </template>
      </cal-tab-pane>
      <cal-tab-pane :key="-1" hide>
        <template #tab>
          <span>已关闭</span>
          <cal-theme-icon type="numberTag" state>
            {{ countData.closed }}
          </cal-theme-icon>
        </template>
      </cal-tab-pane>
    </cal-tabs>
    <!-- table 固定内容 -->
    <cal-tab-pane alone min-height="600">
      <div class="flex justify-end items-center">
        <cal-page-select v-model="pageSize" />
      </div>
      <cal-table class="mt-28" :list="list">
        <cal-table-option title="店铺" min-width="90px" index="shop_name" />
        <cal-table-option title="订单名称" min-width="90px" index="name" />
        <cal-table-option title="账号" min-width="90px" index="manager_username" />
        <cal-table-option title="订单号" min-width="230px" index="sn" />
        <cal-table-option title="手机号" min-width="90px" index="liaisons_tel" />
        <cal-table-option title="购买条数" min-width="90px" index="sale_time_nums" />
        <cal-table-option title="支付金额" min-width="90px">
          <template #default="scoped"> ¥{{ scoped.item.amount }} </template>
        </cal-table-option>
        <cal-table-option title="状态" min-width="100px" v-slot:default="{ item }">
          <span v-if="item.status == 0">待付款</span>
          <span v-if="item.status == -1">已关闭</span>
          <span v-if="item.status == 2">已完成</span>
          <span v-if="item.status == 3">正常使用</span>
        </cal-table-option>
        <cal-table-option title="下单时间" min-width="280px" v-slot:default="{ item }">
          {{ $formatUnix(item.createtime) }}
        </cal-table-option>
        <cal-table-option title="操作" minWidth="214px" border-left v-slot="{ item }">
          <div>
            <cal-button
                v-if="item.status != 2"
              size="small"
              style="width: 76px"
              class="mr-10 my-6"
              @click=";(paymentDialog = !paymentDialog), (paymentForm.id = item.id)"
            >
              确认支付
            </cal-button>
            <cal-button
                v-if="item.status != -1"
              @click=";(closeDialog = !closeDialog), (smsId = item.id)"
              size="small"
              style="width: 76px"
              class="mr-10 my-6"
            >
              关闭
            </cal-button>
          </div>
        </cal-table-option>
      </cal-table>
      <template #sticky>
        <div class="flex justify-center mt-16">
          <cal-pagination
            v-model:current="currentPage"
            :total="total"
            v-model:pageSize="pageSize"
          />
        </div>
      </template>
    </cal-tab-pane>
  </div>
  <!--  确认支付弹框 -->
  <cal-message-dialog v-model="paymentDialog" title="确认付款" @ok="confirmPayment">
    <a-form
      ref="paymentDialogRef"
      :model="paymentForm"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-item ref="name" label="确认原因" name="admin_pay_remark">
        <cal-textarea
          class="mt-10 rounded-xl h-128"
          v-model="paymentForm.admin_pay_remark"
          placeholder="输入确认原因"
        />
      </a-form-item>
      <!-- <a-form-item label="系统登录密码" name="password">
        <cal-input
          v-model="paymentForm.password"
          placeholder="输入系统登录密码"
          class="w-208"
        ></cal-input>
      </a-form-item> -->
    </a-form>
  </cal-message-dialog>
  <!-- 关闭订单弹框 -->
  <cal-message-dialog v-model="closeDialog" title="关闭弹框" @ok="confirmClose">
    <cal-textarea
      class="mt-10 rounded-xl h-176"
      v-model="closeContent"
      placeholder="关闭原因（最多输入50字）"
      showCount
      :maxlength="50"
    />
  </cal-message-dialog>
</template>
<script lang="ts" setup>
  import {
    reqServicesShopOrderBuySmsIndex,
    reqServicesShopOrderBuySmsIndexCancel,
    reqServicesShopOrderBuySmsConfirmPayment
  } from '@/api/setting'
  import { useListPagination } from '@/hooks/use-listPagination'
  import { ref, watch } from 'vue-demi'
  import CalMessageDialog from '~/CustomAntds/CalMessageDialog/index.vue'
  import dayjs from 'dayjs'
  import { message } from 'ant-design-vue'
  import { useAntdForm } from '@/hooks/use-antd-form'

  const form = ref({
    osid: '',
    createtime: [] as any[],
    status: ''
  })
  // 筛选
  const onFilter = () => {
    if (form.value.createtime.length > 0) {
      form.value.createtime[0] = dayjs(form.value.createtime[0]).unix()
      form.value.createtime[1] = dayjs(form.value.createtime[1]).unix()
    }
    resetList()
  }
  const resetFilter = () => {
    form.value = {
      osid: '',
      createtime: [],
      status: ''
    }
    resetList()
  }
  const countData = ref({
    paid: 0,
    closed: 0,
    completed: 0
  })
  /** 表格 start */
  const { list, total, currentPage, pageSize, resetList } = useListPagination({
    getList: async ({ currentPage, total, pageSize }) => {
      if (form.value.createtime) {
        dayjs(Number(form.value.createtime)).unix()
      }
      const { data } = await reqServicesShopOrderBuySmsIndex({
        page: currentPage.value,
        limit: pageSize.value,
        search: form.value
      })
      countData.value.paid = data.data.no_payment
      countData.value.closed = data.data.cancel_order
      countData.value.completed = data.data.completed
      total.value = data.data.total
      return data.data.data
    }
  })
  // 支付弹框
  // 付款form
  const paymentDialogRef = ref()

  const { rules, validate } = useAntdForm(paymentDialogRef, {
    admin_pay_remark: [{ required: true, message: '请输入确认原因', trigger: 'blur' }]
    // password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  })
  const paymentDialog = ref(false)
  const paymentForm = ref({
    id: '' as Key,
    admin_pay_remark: ''
    // password: ''
  })
  const confirmPayment = async () => {
    try {
      await validate()
      console.log('付款成功')
      await reqServicesShopOrderBuySmsConfirmPayment(paymentForm.value)
    } catch (error) {
      return Promise.reject()
    }
  }
  // 关闭弹框
  const closeDialog = ref(false)
  const closeContent = ref('')
  const smsId = ref<any>()
  const confirmClose = async () => {
    try {
      await reqServicesShopOrderBuySmsIndexCancel({
        id: smsId.value,
        order_remark: closeContent.value
      })
      message.success('关闭成功')
    } catch (error) {
      return Promise.reject
    }
  }

  watch([() => form.value.status], resetList)
</script>
<style lang="scss" scoped>
  .place-an-order {
    :deep(.ant-input) {
      background-color: transparent;
      border-top: none;
      border-left: none;
      border-right: none;
      border-color: #8c8c8c;
      &:focus,
      &:hover {
        border-color: var(--color-primary) !important;
      }
      &:focus {
        box-shadow: 0 2px 0 0 var(--color-primary-light-opacity-8) !important;
      }
      &.ant-input-affix-wrapper-focused {
        border-color: var(--color-primary) !important;
        box-shadow: 0 2px 0 0 var(--color-primary-light-opacity-8) !important;
      }
    }
  }
</style>
