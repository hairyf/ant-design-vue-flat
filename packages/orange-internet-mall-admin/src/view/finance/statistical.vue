<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-10 16:46:02
 * @Description: 积分统计表
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="statistical-box custom-card-page custom-crad-container">
    <el-row class="tips-box">
      <el-col :xl="24">
        所有会员的积分变动都会有记录，每日的统计报表会在“次日凌晨”进行更新，每月的统计报表会在“次月首日凌晨”进行更新
      </el-col>
    </el-row>
    <el-row>
      <el-col :xl="24" class="oe-flex oe-row-between">
        <div>
          <el-button type="primary" size="small" @click="exportReport">导出报表</el-button>
        </div>
        <div class="oe-flex">
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
    <el-table class="statistical-list" :data="tableData" style="width: 100%">
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无积分统计报表" />
      </template>
      <el-table-column prop="belong_date" label="日期"> </el-table-column>
      <el-table-column prop="sum_total_score" label="本期初始积分" sortable></el-table-column>
      <el-table-column prop="income" label="收入" sortable>
        <template #default="scope">
          <div class="income-text">+{{ scope.row.income }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="outgo" label="支出" sortable>
        <template #default="scope">
          <div class="expenditure-text"
            >{{ scope.row.outgo == 0 ? '' : '-' }}{{ scope.row.outgo }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sum_score" label="本期剩余积分" sortable></el-table-column>
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
  <statisticalExport
    v-model:show="show"
    :currentId="currentId"
    :date_type="date_type"
    :type="'score'"
  >
  </statisticalExport>
</template>
<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import { ElMessage } from 'element-plus'
  import { reqMonth, reqRecordList, reqListExport } from '@/api/finance'
  import statisticalExport from '@/components/common/finance-modality/statistical-export.vue'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
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
  // 统计表弹窗
  const dialogVisible = ref(false)
  // 统计表弹窗
  const show = ref(false)
  const date_type = ref('')
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
  // 查看
  const viewTable = (id: string) => {
    show.value = true
    currentId.value = id
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
        month: month.value
      },
      type: 'score'
    })
    if (tableData.value.length) {
      const blob = new Blob([data as any])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '积分统计报表.xlsx')
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
        month: month.value
      },
      limit: pagination.pageSize,
      page: pagination.currentPage,
      type: 'score',
      order: '',
      sort: ''
    })
    pagination.total = data.data.total
    tableData.value = data.data.data
    date_type.value = data.data.date
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
  .statistical-box {
    .tips-box {
      margin-bottom: 35px;
      padding: 5px 0 5px 14px;
      font-size: 12px;
      color: #262626;
      line-height: 24px;
      background-color: var(--color-primary-light-opacity-8);
      border: 1px solid var(--color-primary);
    }
    .statistical-list {
      :deep(.el-table__header) {
        margin-top: 15px;
        .cell {
          color: #000;
        }
      }
    }
    :deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
      background-color: var(--color-primary-light-opacity-9) !important;
    }
    :deep(.select-trigger) {
      margin-left: 7px;
      width: 124px;
    }
    :deep(.el-radio) {
      margin: 0;
    }
    :deep(.el-date-editor.el-input) {
      width: 180px;
      margin: 0 14px 0 0;
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
