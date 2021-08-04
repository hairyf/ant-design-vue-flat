<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-14 10:44:15
 * @Description: 全部优惠券
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
            <div class="screen-text">优惠券类型</div>
            <el-select v-model="formInfo.type" placeholder="全部" class="oe-flex-1" clearable>
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
          <div class="oe-flex is-grid">
            <div class="screen-text">是否过期</div>
            <el-select v-model="formInfo.status" placeholder="全部" class="oe-flex-1" clearable>
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
            <div class="screen-text">新增时间</div>
            <el-date-picker
              class="oe-flex-1"
              v-model="searchCreateTime"
              type="date"
              placeholder="优惠券新增时间"
            ></el-date-picker>
            <!-- <el-date-picker v-model="value1" type="date" placeholder="选择日期"> </el-date-picker> -->
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
      <template #header>
        <div class="card-header">
          <el-button
            type="primary"
            class="add-goods"
            size="small"
            @click="$router.push('/marke/coupon/newDiscount')"
          >
            <div class="add-button-box">
              <i class="ad-shapePlus"></i>
              <span class="text">新增优惠券</span>
            </div>
          </el-button>
        </div>
      </template>

      <el-table class="revenue-list" :data="tableData" style="width: 100%">
        <template v-slot:empty>
          <el-empty class="oe-m-t-30" description="暂无优惠券" />
        </template>
        <el-table-column prop="name" label="优惠券名称" min-width="150"></el-table-column>
        <el-table-column prop="explain" label="优惠内容" min-width="150">
          <template #default="scope">
            <span v-if="scope.row.type == 2"
              >满{{ scope.row.condition_order_amount }}享{{ scope.row.money }}折</span
            >
            <span v-else>满{{ scope.row.condition_order_amount }}减{{ scope.row.money }} </span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="优惠券类型" min-width="150">
          <template #default="scope">
            <span v-if="scope.row.type == 1">满减券</span>
            <span v-if="scope.row.type == 2">折扣券</span>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="发放总量" min-width="150">
          <template #default="scope">
            <span v-if="scope.row.stock == -1">不限制</span>
            <span v-else>{{ scope.row.stock }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="get_num" label="已领取"> </el-table-column>
        <el-table-column prop="get_max_one_person" label="剩余数量" min-width="150">
          <template #default="scope">
            <span v-if="scope.row.get_max_one_person == -1">不限制</span>
            <span v-else>{{ scope.row.get_max_one_person }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="createtime" label="新增时间" min-width="160">
          <template #default="scope">
            {{ formatUnix(scope.row.createtime) }}
          </template>
        </el-table-column>

        <el-table-column prop="name" label="状态">
          <template #default="scope">
            <span style="color: #1ad370" v-if="scope.row.status == 1">正在发放</span>
            <span style="color: #ff0000" v-if="scope.row.status == 2">发放完毕</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="使用率" min-width="150">
          <template #default="scope"> {{ getRandom(scope.row.use_percent, 100) }}% </template>
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template #default="scope">
            <div class="edit oe-flex">
              <custom-button
                icon="ad-see"
                @click="seeDetails(scope.row.id)"
                color="#FE6712"
                class="public-move-left oe-m-l-0"
                >查看</custom-button
              >
              <!-- <custom-button
                icon="el-icon-document-copy"
                @click="getEdit(scope.row)"
                color="#FE6712"
                class="public-move-left"
                >复制</custom-button
              > -->
              <custom-button
                v-if="!(scope.row.status == 1)"
                icon="ad-delete"
                @click="delateCoupons(scope.row.id)"
                color="#FF0000"
                class="public-move-left"
                >删除</custom-button
              >
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
    <!-- 查看优惠券弹框组件 -->
    <coupon-see
      v-model="dialogVisible"
      :tableList="tableList"
      :tableGroupingList="tableGroupingList"
      :productDetail="productDetail"
    />
  </div>
</template>
<script setup lang="ts">
  import { reactive, ref, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import {
    reqCouponIndex,
    reqCouponDelete,
    reqCouponRead,
    reqGoodsList,
    reqGoodsGroupList
  } from '@/api/marketing'
  import dayjs from 'dayjs'
  import { formatUnix } from '@/utils'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import CouponSee from './components/allCouponSee.vue'
  // 查看弹框是否弹出变量
  const dialogVisible = ref(false)
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  // 查看优惠券详情
  const tableList = ref<any[]>([])
  const tableGroupingList = ref<any>({})
  const productDetail = ref<any>({})
  const seeDetails = (id: Key) => {
    reqCouponRead({ id }).then((res) => {
      productDetail.value = res.data.data
      if (productDetail.value.to_obj == 2) {
        reqGoodsList({ page: 1, limit: 2000 }).then((res) => {
          const list = res.data.data.data
          tableList.value = list.filter((item: any) =>
            productDetail.value.appoint_content.includes(item.id.toString())
          )
        })
      }
      if (productDetail.value.to_obj == 3) {
        reqGoodsGroupList({ page: 1, limit: 2000 }).then((res) => {
          const list = res.data.data.data
          tableGroupingList.value = list.find((item: any) =>
            productDetail.value.appoint_content.includes(item.id.toString())
          )
        })
      }
    })
    dialogVisible.value = true
  }

  //  列表数据
  const tableData = ref<any>([])
  const typeOptions = reactive([
    {
      value: '1',
      label: '满减券'
    },
    {
      value: '2',
      label: '折扣券'
    }
  ])
  const statusOptions = reactive([
    {
      value: '0',
      label: '停用'
    },
    {
      value: '1',
      label: '启用'
    },
    {
      value: '2',
      label: '已过期/发放完毕'
    }
  ])
  // 得到使用百分率
  const getRandom = (start: number, total: number) => {
    const num = (start / total) * 100
    return num.toFixed(2)
  }
  // 删除当前优惠券
  const delateCoupons = (ids: number) => {
    ElMessageBox.confirm('您确定删除该商品么？确定后该商品将会放入回收站', '删除商品', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      reqCouponDelete({ ids }).then((res) => {
        if (res.data.code == 0) {
          ElMessage({
            type: 'success',
            message: '删除成功!'
          })
          resetGoodsList()
        }
      })
    })
  }
  // 查看订单
  const getEdit = (row: any) => {}
  // 搜索新增时间变量
  const searchCreateTime = ref<any>('')
  // 重置按钮
  const getEmpty = () => {
    formInfo.value.name = ''
    formInfo.value.type = ''
    formInfo.value.status = ''
    formInfo.value.createtime = ''
  }
  // 搜索对象
  const formInfo = ref<any>({
    name: '',
    type: '',
    status: '',
    createtime: ''
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
    const { data } = await reqCouponIndex(subInfo)

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
  .add-goods {
    width: 120px;
    &.el-button {
      margin: 0;
      padding-top: 8px;
      padding-bottom: 9px;
      font-size: 14px;
      .text {
        margin-left: 6px;
      }
    }
    .add-button-box {
      display: flex;
      justify-content: center;
      // text-align: center;
    }
  }
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
