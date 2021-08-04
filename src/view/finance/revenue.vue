<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-10 16:51:59
 * @Description: 营收记录
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="revenue-box custom-card-page custom-crad-container">
    <el-row class="tips-box">
      <el-col :xl="24">
        营收收入仅记录实际发生的交易，不包含维权期未满已购买的商品,每日的对账单会在“次日凌晨”进行更新，每月的对账单会在“次月首日凌晨”进行更新
      </el-col>
    </el-row>
    <el-row>
      <el-col :xl="24" class="oe-flex oe-row-between">
        <div>
          <el-button type="primary" size="small" @click="exportReport">导出报表</el-button>
          <span class="revenue">
            <span class="revenue-text">营收总数：</span
            ><span class="red-socks">{{ income_sum ? income_sum : 0 }}元</span
            ><span class="grey-text">（营收总数=收入-支出）</span></span
          >
        </div>
        <div class="oe-flex">
          <div class="search-tetx">款项来源</div>
          <el-select v-model="moneySource" placeholder="全部" clearable @change="changeSource">
            <el-option label="微信支付" value="WxPay"> </el-option>
            <el-option label="余额支付" value="BalancePay"> </el-option>
            <el-option label="支付宝" value="AliPay"> </el-option>
          </el-select>
          <el-select v-model="particularYear" placeholder="全部" clearable @change="changeYear">
            <el-option v-for="item in yearList" :key="item" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="month" placeholder="全部" clearable @change="changeMonth">
            <el-option v-for="item in monthList" :key="item" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-table class="revenue-list" :data="tableData" style="width: 100%">
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无营收记录" />
      </template>
      <el-table-column prop="belong_date" label="日期"> </el-table-column>
      <el-table-column prop="name" label="收入（元）">
        <template #default="scope">
          <div class="income-text">+{{ scope.row.income }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="支出（元）">
        <template #default="scope">
          <div class="expenditure-text"
            >{{ scope.row.outgo == 0 ? '' : '-' }}{{ scope.row.outgo }}</div
          >
        </template>
      </el-table-column>
      <el-table-column prop="revenue_sum" label="总营收（元）"></el-table-column>
      <el-table-column prop="revenue_sum" label="款项来源">
        <template #default="scope">
          <div class="oe-flex source-box">
            <template v-for="(item, index) in scope.row.source_type.split(',')" :key="index">
              <el-image
                src="/custom-assets/images/finance/Alipay.png"
                v-if="item == 'AliPay'"
              ></el-image>
              <el-image
                src="/custom-assets/images/finance/WeChat.png"
                v-if="item == 'WxPay'"
              ></el-image>
              <el-image
                src="/custom-assets/images/finance/balance.png"
                v-if="item == 'BalancePay'"
              ></el-image>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <custom-button icon="ad-see" color="#FE6712" @click="viewTable(scope.row.id)"
            >查看
          </custom-button>
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
  <statisticalExport v-model:show="show" :currentId="currentId" :type="'revenue'" :date_type="date">
  </statisticalExport>
</template>
<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue'
  import { ElMessage } from 'element-plus'
  import { usePagination } from '@/hooks/use-pagination'
  import statisticalExport from '@/components/common/finance-modality/statistical-export.vue'
  import { reqMonth, reqRecordList, reqListExport } from '@/api/finance'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  // 款项来源
  const moneySource = ref()
  // 月份
  const month = ref()
  // 月份列表
  const monthList = ref<any>([])
  // 年份
  const particularYear = ref()
  // 年份列表
  const yearList = ref<any>([])
  //  列表数据
  const tableData = ref<any>([])
  // 总数
  const income_sum = ref('')
  // 统计表弹窗
  const show = ref(false)
  const date = ref('')
  // 当前id
  const currentId = ref('')
  // 监听年份切换月份列表
  const changeYear = (val: any) => {
    getMothList(val)
    restRecordList()
  }
  // 监听月份
  const changeMonth = () => {
    restRecordList()
  }
  // 监听来源切换
  const changeSource = (val: any) => {
    pagination.currentPage = 1
    restRecordList()
  }
  // 获取月份列表
  const getMothList = async (val: any) => {
    if (val != '') {
      const { data } = await reqMonth({ date: val })
      monthList.value = data.data
    } else {
      monthList.value = []
      month.value = ''
    }
  }
  // 获取年份列表
  const getYearList = async () => {
    const { data } = await reqMonth({ date: '' })
    yearList.value = data.data
  }
  // 导出报表
  const exportReport = async () => {
    const { data } = await reqListExport({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: {
        year: particularYear.value,
        month: month.value,
        source_type: moneySource.value
      },
      type: 'revenue'
    })
    if (tableData.value.length) {
      const blob = new Blob([data as any])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '营收报表.xlsx')
      document.body.appendChild(link)
      link.click()
    } else {
      ElMessage('暂无导出的数据！')
    }
  }
  // 获取列表数据
  const restRecordList = async () => {
    const { data }: any = await reqRecordList({
      search: {
        year: particularYear.value,
        month: month.value,
        source_type: moneySource.value
      },
      limit: pagination.pageSize,
      page: pagination.currentPage,
      type: 'revenue',
      order: '',
      sort: ''
    })
    income_sum.value = data.data.income_sum
    pagination.total = data.data.total
    tableData.value = data.data.data
    date.value = data.data.date
  }
  // 查看
  const viewTable = (id: string) => {
    show.value = true
    currentId.value = id
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    restRecordList()
  })
  onMounted(() => {
    getYearList()
    restRecordList()
  })
</script>
<style lang="scss" scoped>
  .revenue-box {
    .tips-box {
      margin-bottom: 35px;
      padding: 5px 0 5px 14px;
      font-size: 12px;
      color: #262626;
      line-height: 24px;
      border-radius: 2px;
      background-color: var(--color-primary-light-opacity-8);
      border: 1px solid var(--color-primary);
    }
    :deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
      background-color: var(--color-primary-light-opacity-9) !important;
    }
    .revenue-list {
      :deep(.el-table__header) {
        margin-top: 15px;
      }
      :deep(.cell) {
        color: #000;
      }
    }
    .source-box {
      .el-image {
        width: 16px;
        height: 16px;
      }
      &.source-box .el-image:nth-child(2n) {
        margin: 0 12px;
      }
    }
    :deep(.select-trigger) {
      margin-left: 7px;
      width: 124px;
    }
    :deep(.el-radio) {
      margin: 0;
    }
    :deep(.el-date-editor.el-input) {
      width: 174px;
      margin: 0 14px 0 7px;
    }
    .search-tetx {
      margin-right: 14px;
      font-size: 14px;
      color: #000000;
      cursor: pointer;
    }
    .income-text {
      color: #1ad370;
    }
    .expenditure-text {
      color: #ff0000;
    }
    .paging-box {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
