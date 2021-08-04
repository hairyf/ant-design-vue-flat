<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-10 15:14:22
 * @Description: 体验者管理
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="all-coupon-box">
    <el-card shadow="never" class="screen-box">
      <el-row :gutter="24">
        <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
          <div class="oe-flex is-grid">
            <div class="screen-text">关键词</div>
            <el-input
              class="oe-flex-1"
              v-model="formInfo.name"
              placeholder="微信号/微信昵称"
            ></el-input>
          </div>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
          <div class="oe-flex is-grid">
            <div class="screen-text">绑定时间</div>
            <el-date-picker
              prefix-icon="el-icon-date"
              class="oe-flex-1"
              v-model="formInfo.createtime"
              type="datetime"
              placeholder="选择绑定时间"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
          <div class="oe-flex is-grid">
            <el-button @click="resetGoodsList()" type="primary" size="small">搜索</el-button>
            <div class="reset-text" @click="getEmpty">重置条件</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 全部优惠券表格 -->
    <el-card shadow="never" class="refund-list custom-crad-container custom-card-page">
      <div class="screen-box">
        <el-row :gutter="24">
          <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
            <div class="oe-flex is-grid">
              <el-input
                class="oe-flex-1"
                v-model="formInfo.name"
                placeholder="请输入体验者的微信账号"
              ></el-input>
            </div>
          </el-col>
          <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
            <div class="oe-flex is-grid">
              <el-button @click="resetGoodsList()" type="primary" size="small">绑定账号</el-button>
              <el-button size="small">绑定账号</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-table
        stripe
        :border="false"
        class="revenue-list"
        tooltip-effect="dark"
        ref="revenueTable"
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'createtime' }"
      >
        <el-table-column label="微信号" prop="id" min-width="150"> </el-table-column>
        <el-table-column label="微信昵称" prop="id" min-width="150"> </el-table-column>
        <el-table-column label="微信头像" min-width="150">
          <template #default="scope">
            <el-image style="width: 40px; height: 40px" :src="scope.row.nickname"></el-image>
          </template>
        </el-table-column>

        <el-table-column label="绑定时间" prop="createtime" min-width="160" sortable>
          <template #default="scope">
            {{ formatUnix(scope.row.createtime) }}
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="160">
          <template #default="scope">
            <div class="edit oe-flex">
              <custom-button
                @click="relieveBinding(scope.row.id)"
                icon="ad-unbind"
                color="#FF0000"
                class="public-move-left oe-m-l-0"
              >
                解除绑定
              </custom-button>
            </div>
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
  import { reactive, ref, watch } from 'vue'
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
  const statusOptions = reactive([
    {
      value: '0',
      label: '自动领取'
    },
    {
      value: '1',
      label: '后台发放'
    }
  ])
  // 重置按钮
  const getEmpty = () => {
    formInfo.value.name = ''
    formInfo.value.createtime = ''
    formInfo.value.type = ''
    formInfo.value.nickname = ''
  }
  // 搜索对象
  const formInfo = ref<any>({
    name: '',
    createtime: '',
    type: '',
    nickname: ''
  })
  // 请求接口数据 start
  // 解除绑定
  const relieveBinding = (id: Key) => {
    // console.log(id)
  }
  // 商品列表
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
      font-size: 14px;
      color: var(--color-primary);
      margin-left: 28px;
    }
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
