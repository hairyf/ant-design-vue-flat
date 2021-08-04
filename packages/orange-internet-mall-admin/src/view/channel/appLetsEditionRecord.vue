<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-04-15 15:54:42
 * @Description: 版本记录
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="all-coupon-box">
    <!-- 全部优惠券表格 -->
    <el-card shadow="never" class="refund-list custom-crad-container custom-card-page">
      <el-table
        class="revenue-list"
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'name' }"
      >
        <el-table-column
          label="小程序版本号"
          min-width="160"
          prop="name"
          sortable
        ></el-table-column>
        <el-table-column label="小程序启动状态" min-width="150" sortable>
          <template #default="scope">
            <span style="color: #1ad370" v-if="scope.row.coupon.type == 1">已启动</span>
            <span style="color: #ff0000" v-if="scope.row.coupon.type == 2">已暂停</span>
          </template>
        </el-table-column>
        <el-table-column label="提交代码时间" min-width="160" sortable>
          <template #default="scope">
            {{ formatUnix(scope.row.createtime) }}
          </template>
        </el-table-column>
        <el-table-column label="提交审核时间" min-width="160" sortable>
          <template #default="scope">
            {{ formatUnix(scope.row.createtime) }}
          </template>
        </el-table-column>
        <el-table-column label="审核通过时间" min-width="160" sortable>
          <template #default="scope">
            {{ formatUnix(scope.row.createtime) }}
          </template>
        </el-table-column>
        <el-table-column label="小程序发布时间" min-width="160" sortable>
          <template #default="scope">
            {{ formatUnix(scope.row.createtime) }}
          </template>
        </el-table-column>
      </el-table>
      <el-col :lg="24" class="paging-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </el-col>
    </el-card>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import { reqShopUserCouponIndex } from '@/api/marketing'
  import { formatUnix } from '@/utils'
  import dayjs from 'dayjs'

  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()

  //  列表数据
  const tableData = ref([
    {
      date: '默认导航',
      name: '王小虎',
      address: '维权结束',
      coupon: { name: '优惠券名称', type: 2, money: '11.00', condition_order_amount: '11.00' },
      user: { nickname: '13308435101' }
    }
  ])
  // 搜索对象
  const formInfo = ref<any>({
    name: '',
    createtime: '',
    type: '',
    nickname: ''
  })
  // 请求接口数据 start
  // // 商品列表
  const resetGoodsList = async () => {
    if (formInfo.value.createtime != '') {
      formInfo.value.createtime = dayjs(formInfo.value.createtime).unix()
    }
    const subInfo: any = {
      search: formInfo.value,
      page: pagination.currentPage,
      limit: pagination.pageSize
    }
    const { data } = await reqShopUserCouponIndex(subInfo)

    pagination.total = data.data.total
    tableData.value = data.data.data
  }
</script>
<style lang="scss">
  .all-coupon-box {
    .el-button i {
      font-size: 14px;
    }
  }
</style>
<style lang="scss" scoped>
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

    .member-text {
      font-size: 12px;
      color: var(--color-primary);
    }
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 4px 14px 16px;
    .header-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      width: 200px;
      font-size: 14px;
      color: #8c8c8c;
    }
  }
  // 操作
  .edit {
    margin-bottom: 10px;
    :deep(.el-button) {
      display: flex;
      align-items: center;
      font-size: 12px;
      padding: 2px 8px;
      min-height: 24px;
      border-radius: 2px;
      margin-left: 14px;
      i {
        padding-right: 3px;
      }
    }
  }
</style>
