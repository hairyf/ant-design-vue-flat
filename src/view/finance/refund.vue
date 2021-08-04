<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-11 14:53:41
 * @Description: 退款记录
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="screen-box">
    <el-row :gutter="24">
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">关键信息</div>
          <el-input
            class="oe-flex-1"
            @input="getSearch"
            v-model="form.cruxName"
            placeholder="昵称/姓名/手机号/订单号"
          ></el-input>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">退款类型</div>
          <el-select v-model="form.refundType" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="全部" value=" "> </el-option>
            <el-option label="商家退款" value="0"> </el-option>
            <el-option label="维权退款" value="1"> </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">退款状态</div>
          <el-select v-model="form.refundStatus" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="全部" value=" "> </el-option>
            <el-option label="成功" value="1"> </el-option>
            <el-option label="未成功" value="0"> </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">退款时间</div>
          <el-date-picker
            class="oe-flex-1"
            v-model="form.refundTime"
            type="date"
            placeholder="选择退款时间"
          >
          </el-date-picker>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <el-button type="primary" size="small" @click="getSearch">搜索</el-button>
          <div class="reset-text" @click="getEmpty">重置条件</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <el-card shadow="never" class="refund-list custom-crad-container custom-card-page">
    <el-button type="primary" size="small" @click="exportReport">导出报表</el-button>
    <el-table @sort-change="changeSort" class="revenue-list" :data="tableData" style="width: 100%">
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无退款记录" />
      </template>
      <el-table-column prop="date" label="会员">
        <template #default="scope">
          <div class="oe-flex">
            <el-image class="head-portrait" :src="scope.row.user.avatar" />
            <div>
              <div class="member-text">{{ scope.row.user.nickname }}</div>
              <el-image :src="scope.row.img_url" class="source-img" />
              <!-- <el-image
                src="/custom-assets/images/finance/Alipay.png"
                v-if="scope.row.pay_type == 'AliPay'"
              ></el-image>
              <el-image
                src="/custom-assets/images/finance/WeChat.png"
                v-if="scope.row.pay_type == 'WxPay'"
              ></el-image>
              <el-image
                src="/custom-assets/images/finance/balance.png"
                v-if="scope.row.pay_type == 'BalancePay'"
              ></el-image> -->
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="退款类型">
        <template #default="scope">
          <div v-if="scope.row.source == 0">商家退款</div>
          <div v-if="scope.row.source == 1">维权退款</div>
        </template>
      </el-table-column>
      <el-table-column prop="total_refund_money" label="退款金额（元）"> </el-table-column>
      <el-table-column prop="refund_time" label="退款时间" sortable></el-table-column>
      <el-table-column prop="relation_sn" label="退款商品订单号" min-width="150"> </el-table-column>
      <el-table-column prop="address" label="退款状态">
        <template #default="scope">
          <div class="success-text" v-if="scope.row.status == '1'">成功</div>
          <div v-if="scope.row.status == '0'">未成功</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" min-width="160">
        <template #default="scope">
          <div class="oe-flex">
            <custom-button icon="ad-view-order" color="#FE6712" @click="getDetails(scope.row)"
              >查看订单
            </custom-button>
            <custom-button
              icon="ad-view-order"
              class="public-move-left"
              color="#2DB6F5"
              @click="jumpDetails(scope.row)"
              >查看会员
            </custom-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-col :lg="24" class="paging-box">
      <el-pagination
        class="e-grid"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        background
        :current-page="pagination.currentPage"
        layout="total, prev, pager, next,sizes, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-col>
  </el-card>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import { ElMessage } from 'element-plus'
  import dayjs from 'dayjs'
  import { reqRefundRecord, reqExportEefund } from '@/api/finance'
  import { useRouter } from 'vue-router'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const form = ref({
    // 关键信息
    cruxName: '',
    // 退款类型
    refundType: '',
    // 退款状态
    refundStatus: '',
    // 退款时间
    refundTime: ''
  })
  const router = useRouter()
  const sort = ref<any>('')
  const paymentList = ref<any[]>([])
  // 订单导出的条件
  const condition = ref({
    // 关键信息
    cruxName: '',
    // 退款类型
    refundType: '',
    // 退款状态
    refundStatus: '',
    // 退款时间
    refundTime: ''
  })
  // 来源列表
  const channelList = ref<any[]>([])
  //  列表数据
  const tableData = ref<any[]>([])
  // 重置按钮
  const getEmpty = () => {
    form.value.cruxName = ''
    form.value.refundType = ''
    form.value.refundStatus = ''
    form.value.refundTime = ''
    getSearch()
    // pagination.currentPage = 1
    // getRefundList()
  }
  // 搜索
  const getSearch = () => {
    condition.value.cruxName = form.value.cruxName
    condition.value.refundType = form.value.refundType
    condition.value.refundStatus = form.value.refundStatus
    condition.value.refundTime = form.value.refundTime
    pagination.currentPage = 1
    getRefundList()
  }
  // 排序
  const changeSort = (val: any) => {
    if (val.order == 'descending') {
      sort.value = 'desc'
      // 降序
      getRefundList()
    } else {
      // 正序
      sort.value = 'asc'
      getRefundList()
    }
  }
  // 导出报表
  const exportReport = async () => {
    let createtime = ''
    if (condition.value.refundTime) {
      createtime = dayjs(condition.value.refundTime).unix().toString()
    }
    const { data } = await reqExportEefund({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: {
        searchselect: condition.value.cruxName,
        source: condition.value.refundType,
        status: condition.value.refundStatus,
        refund_time: createtime
      }
    })
    if (tableData.value.length) {
      const blob = new Blob([data as any])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '退款报表.xlsx')
      document.body.appendChild(link)
      link.click()
    } else {
      ElMessage('暂无导出的数据！')
    }
  }
  // 获取退款列表
  const getRefundList = async () => {
    let createtime = ''
    if (form.value.refundTime) {
      createtime = dayjs(form.value.refundTime).unix().toString()
    }
    const { data } = await reqRefundRecord({
      limit: pagination.pageSize,
      page: pagination.currentPage,
      search: {
        searchselect: form.value.cruxName,
        source: form.value.refundType,
        status: form.value.refundStatus,
        refund_time: createtime
      },
      order: 'cratetime',
      sort: sort.value
    })
    tableData.value = data.data.data
    pagination.total = data.data.total
    // for (let i = 0; i < tableData.value.length; i++) {
    // for (let j = 0; j < paymentList.value.length; j++) {
    //   if (tableData.value[i].pay_type == paymentList.value[j].key) {
    //     tableData.value[i].payTypeName = paymentList.value[j].name
    //   }
    // }
    // for (let k = 0; k < channelList.value.length; k++) {
    //   if (tableData.value[i].user.user_channel_code == channelList.value[k].code) {
    //     tableData.value[i].img_url = channelList.value[k].img_url
    //     tableData.value[i].sourceName = channelList.value[k].name
    //   }
    // }
    // }
  }

  // 查看详情
  const jumpDetails = (row: any) => {
    router.push({
      path: '/member/member-details',
      query: {
        id: row.user_id
      }
    })
  }
  // 订单详情跳转
  const getDetails = (currentData: any) => {
    router.push({
      path: '/order/management/orderDetails',
      query: {
        id: currentData.order_id
      }
    })
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    getRefundList()
  })
  onMounted(() => {
    getRefundList()
  })
</script>
<style lang="scss" scoped>
  .screen-box {
    :deep(.el-card__body) {
      padding-bottom: 0;
    }
    .screen-text {
      font-size: 14px;
      color: #000;
      margin-right: 14px;
    }
    .is-grid {
      margin-bottom: 20px;
    }
    :deep(.el-button) {
      padding: 2px 40px;
    }
    .reset-text {
      cursor: pointer;
      font-size: 14px;
      color: var(--color-primary);
      margin-left: 28px;
    }
  }
  .source-img {
    width: 16px;
    height: 16px;
    margin-top: 4px;
  }
  .refund-list {
    margin-top: 20px;
    :deep(.cell) {
      color: #000;
    }
    .success-text {
      color: #1ad370;
    }
    .paging-box {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
    .platform-img {
      margin-top: 5px;
      width: 15.75px;
      height: 15.75px;
    }
    .head-portrait {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .member-text {
      font-size: 12px;
      color: var(--color-primary);
    }
  }
</style>
