<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-04-17 15:16:39
 * @Description: 我的订单
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="screen-box">
    <el-row :gutter="24">
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">业务名称</div>
          <el-input
            class="oe-flex-1"
            v-model="form.cruxName"
            placeholder="昵称/姓名/手机号"
          ></el-input>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">订单编号</div>
          <el-input
            class="oe-flex-1"
            v-model="form.orderNumber"
            placeholder="请输入订单编号"
          ></el-input>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">订单类型</div>
          <el-select v-model="form.orderType" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="模板购买" value="1"> </el-option>
            <el-option label="店铺套餐" value="1"> </el-option>
            <el-option label="空间扩容" value="1"> </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">支付方式</div>
          <el-select v-model="form.paymentMethod" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="微信" value="1"> </el-option>
            <el-option label="支付宝" value="1"> </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">操作时间</div>
          <el-date-picker
            class="oe-flex-1"
            v-model="form.placTime"
            type="date"
            placeholder="选择下单时间"
          >
          </el-date-picker>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">订单状态</div>
          <el-select v-model="form.orderStatus" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="待支付" value="1"> </el-option>
            <el-option label="已支付" value="1"> </el-option>
            <el-option label="取消支付" value="1"> </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <el-button type="primary" size="small">搜索</el-button>
          <div class="reset-text" @click="getEmpty">重置条件</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <el-card shadow="never" class="water-list custom-crad-container custom-card-page">
    <el-button type="primary" size="small">导出报表</el-button>
    <el-table class="revenue-list" :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="订单编号" min-width="150">
        ES20210301161854513995
      </el-table-column>
      <el-table-column prop="name" label="订单类型">店铺套餐</el-table-column>
      <el-table-column prop="name" label="订单价格" min-width="85">¥2000.00</el-table-column>
      <el-table-column prop="address" label="优惠金额">-</el-table-column>
      <el-table-column prop="address" label="实际付款" min-width="85">¥2000.00</el-table-column>
      <el-table-column prop="address" label="操作人"> 本人 </el-table-column>
      <el-table-column prop="address" label="支付方式"> 微信支付 </el-table-column>
      <el-table-column prop="address" label="下单时间" min-width="110">
        2021-03-21 09:52:32
      </el-table-column>
      <el-table-column prop="address" label="订单状态">
        <div class="profit">已支付</div>
        <!-- <div class="expenditure">取消支付</div> -->
      </el-table-column>
      <el-table-column prop="address" min-width="250" label="操作">
        <template #default="scope">
          <div class="oe-flex">
            <custom-button icon="ad-member-payment" color="#2DB6F5">支付</custom-button>
            <custom-button
              icon="ad-see"
              color="#FE6712"
              class="public-move-left"
              @click="jumpDetails"
              >查看
            </custom-button>
            <custom-button
              icon="ad-close"
              class="public-move-left"
              color="#ff0000"
              @click="getEdit(scope.row)"
              >删除
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
  <paymentOrder v-model:show="show"> </paymentOrder>
  <div class="delete-box">
    <el-dialog v-model="deleteShow" width="550px">
      <template #title>
        <div class="oe-flex">
          <i class="el-icon-warning"></i>
          <div class="card-header">
            <div class="card-header-title">删除订单</div>
            <div class="card-header-text">您确定删除个订单么？</div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="footer-right">
          <el-button size="mini" @click="deleteShow = false">取消</el-button>
          <el-button size="mini" type="primary" @click="deleteBtn">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import paymentOrder from '@/components/common/finance-modality/payment-order.vue'
  import router from '@/router'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const form = reactive({
    // 关键信息
    cruxName: '',
    // 订单编号
    orderNumber: '',
    // 订单类型
    orderType: '',
    // 支付方式
    paymentMethod: '',
    // 下单时间
    placTime: '',
    // 订单状态
    orderStatus: ''
  })
  const show = ref(false)
  const deleteShow = ref(false)
  //  列表数据
  const tableData = reactive([
    {
      date: '默认导航',
      name: '王小虎',
      address: '维权结束'
    },
    {
      date: '默认导航',
      name: '王小虎',
      address: '维权结束'
    }
  ])
  const options = reactive([
    {
      value: '选项1',
      label: '黄金糕'
    },
    {
      value: '选项2',
      label: '双皮奶'
    }
  ])
  const deleteBtn = () => {
    // console.log('删除')
  }
  // 删除订单
  const getEdit = (row: any) => {
    deleteShow.value = true
  }
  // 跳转查看详情
  const jumpDetails = () => {
    router.push({ path: '/finance/paymentDetails' })
  }
  // 重置按钮
  const getEmpty = () => {
    form.cruxName = ''
    form.orderNumber = ''
    form.orderType = ''
    form.paymentMethod = ''
    form.placTime = ''
    form.orderStatus = ''
  }
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
      font-size: 14px;
      color: var(--color-primary);
      margin-left: 28px;
    }
  }
  .water-list {
    margin-top: 20px;
    :deep(.cell) {
      color: #000;
    }
    .profit {
      color: #1ad370;
    }
    .expenditure {
      color: #ff0000;
    }
    .paging-box {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
