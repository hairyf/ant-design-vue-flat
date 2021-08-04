<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-10 17:11:54
 * @Description: 版本记录
 * @LastEditors: Mr.wang
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
        <template v-slot:empty>
          <el-empty class="oe-m-t-30" description="暂无版本记录" />
        </template>
        <el-table-column type="index" width="80"> </el-table-column>
        <el-table-column
          label="小程序版本号"
          min-width="160"
          prop="version"
          sortable
        ></el-table-column>
        <el-table-column label="提交代码时间" min-width="160" sortable>
          <template #default="scope">
            <span v-if="scope.row.create_time">{{ formatUnix(scope.row.create_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="版本描述" min-width="160" prop="desc" sortable></el-table-column>
        <!-- <el-table-column label="提交审核时间" min-width="160" sortable>
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
        </el-table-column> -->
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
  import { ref, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import { reqChannelMiniVersions } from '@/api/v7channel'
  import { formatUnix } from '@/utils'
  import dayjs from 'dayjs'

  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()

  //  列表数据
  const tableData = ref([])
  // 搜索对象
  const formInfo = ref<any>({
    name: '',
    createtime: '',
    type: '',
    nickname: ''
  })
  // 请求接口数据 start
  // // 版本记录列表
  const resetGoodsList = async () => {
    if (formInfo.value.createtime != '') {
      formInfo.value.createtime = dayjs(formInfo.value.createtime).unix()
    }
    const subInfo: any = {
      search: formInfo.value,
      page: pagination.currentPage,
      limit: pagination.pageSize
    }
    const { data } = await reqChannelMiniVersions()

    pagination.total = data.data.total
    tableData.value = data.data.data
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => resetGoodsList(), {
    immediate: true
  })
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
