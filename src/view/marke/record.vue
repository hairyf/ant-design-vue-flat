<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-13 10:30:29
 * @Description: 发券记录
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="all-coupon-box">
    <el-card shadow="never" class="screen-box">
      <el-row :gutter="24">
        <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
          <div class="oe-flex is-grid">
            <div class="screen-text">优惠券名称</div>
            <el-input
              @keyup.enter="resetGoodsList"
              class="oe-flex-1"
              v-model="formInfo.name"
              placeholder="优惠券名称"
            ></el-input>
          </div>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
          <div class="oe-flex is-grid">
            <div class="screen-text">新增时间</div>
            <el-date-picker
              class="oe-flex-1"
              v-model="searchCreateTime"
              type="date"
              placeholder="优惠券新增时间"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
          <div class="oe-flex is-grid">
            <div class="screen-text">领取方式</div>
            <el-select v-model="formInfo.type" placeholder="全部" class="oe-flex-1" clearable>
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
          <div class="oe-flex is-grid">
            <div class="screen-text">会员昵称</div>
            <el-input
              @keyup.enter="resetGoodsList"
              class="oe-flex-1"
              v-model="formInfo.nickname"
              placeholder="会员昵称"
            ></el-input>
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
      <el-table class="revenue-list" :data="tableData" style="width: 100%">
        <template v-slot:empty>
          <el-empty class="oe-m-t-30" description="暂无发券记录" />
        </template>
        <el-table-column label="优惠券名称" min-width="150">
          <template #default="scoped">
            <div>{{ scoped.row.coupon.name }}</div>
            <div style="font-size: 12px; color: #8c8c8c">
              {{ scoped.row.coupon.money }}代金券 满{{
                scoped.row.coupon.condition_order_amount
              }}可用
            </div>
          </template>
        </el-table-column>
        <el-table-column label="优惠券类型" min-width="150">
          <template #default="scope">
            <span v-if="scope.row.coupon.type == 1">商品满减券</span>
            <span v-if="scope.row.coupon.type == 2">商品折扣券</span>
          </template>
        </el-table-column>
        <el-table-column label="会员信息" min-width="150">
          <template #default="scope">
            <span style="color: #ff9d28">{{ scope.row.user.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="领取方式" min-width="150">
          <template #default="scoped">
            <el-tag v-if="scoped.row.type == 0" type="success">自动领取</el-tag>
            <el-tag v-if="scoped.row.type == 1" type="danger">手动发放</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="领取时间" min-width="160">
          <template #default="scope">
            {{ formatUnix(scope.row.createtime) }}
          </template>
        </el-table-column>
        <el-table-column label="到期时间" min-width="160">
          <template #default="scope">
            {{ formatUnix(scope.row.endtime) }}
          </template>
        </el-table-column>
        <el-table-column label="优惠券状态">
          <template #default="scope">
            <span style="color: #1ad370" v-if="scope.row.status == 0">未使用</span>
            <span style="color: #ff0000" v-if="scope.row.status == 1">已使用</span>
          </template>
        </el-table-column>
        <el-table-column label="到期时间" min-width="160">
          <template #default="scope">
            {{ formatUnix(scope.row.begintime) }}
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
  // 搜索新增时间变量
  const searchCreateTime = ref<any>('')
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
  // // 商品列表
  const resetGoodsList = async () => {
    if (searchCreateTime.value != '' && searchCreateTime.value != null) {
      formInfo.value.createtime = dayjs(searchCreateTime.value).unix()
    } else if (searchCreateTime.value == null) {
      formInfo.value.createtime = ''
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
