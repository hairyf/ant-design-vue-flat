<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-13 10:51:45
 * @Description: 配送范围
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="logistics-scope">
    <el-row :gutter="24">
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">模板名称</div>
          <el-input
            @keyup.enter="getSearch"
            class="oe-flex-1"
            v-model="form.couponName"
            placeholder="请输入模板名称"
          ></el-input>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">收费方式</div>
          <el-select v-model="form.status" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="按件计费" value="1"></el-option>
            <el-option label="按重量计费" value="0"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">新增时间</div>
          <!-- <el-date-picker
            class="oe-flex-1"
            v-model="form.createTime"
            type="date"
            placeholder="配送范围新增时间"
          ></el-date-picker> -->
          <el-date-picker
            class="oe-flex-1"
            v-model="form.createTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
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
  <!-- 全部配送范围表格 -->
  <el-card shadow="never" class="refund-list custom-crad-container custom-card-page">
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="router.push('/system/logisticsDistribution/newTemplate')"
      >新增模板</el-button
    >
    <el-row>
      <div class="order-list-box">
        <div class="oe-flex list-title">
          <!-- 订单信息标题 -->
          <el-row class="list-title-right">
            <el-col :xl="3" :md="3" :sm="3" :xs="3">模板名称</el-col>
            <el-col :xl="2" :md="2" :sm="2" :xs="2">收费方式</el-col>
            <el-col :xl="12" :md="12" :sm="12" :xs="12">
              <el-row>
                <el-col :xl="10" :md="10" :sm="10" :xs="10">配送区域</el-col>
                <el-col :xl="4" :md="4" :sm="4" :xs="4">初发件(重量)/个（Kg）</el-col>
                <el-col :xl="3" :md="3" :sm="3" :xs="3">初发运费/元</el-col>
                <el-col :xl="4" :md="4" :sm="4" :xs="4">续发件（重量）/个（Kg）</el-col>
                <el-col :xl="3" :md="3" :sm="3" :xs="3">续发运费/元</el-col>
              </el-row>
            </el-col>
            <el-col :xl="2" :md="2" :sm="2" :xs="2">新增时间</el-col>
            <el-col :xl="2" :md="2" :sm="2" :xs="2">是否默认</el-col>
            <el-col :xl="3" :md="3" :sm="3" :xs="3"> 操作 </el-col>
          </el-row>
        </div>
        <template v-if="tableData.length">
          <div class="list-box" v-for="(item, index) in tableData" :key="Number(index)">
            <el-row class="box-content">
              <el-col :xl="3" :md="3" :sm="3" :xs="3" class="oe-flex box-name">{{
                item.dispatch_name
              }}</el-col>
              <el-col :xl="2" :md="2" :sm="2" :xs="2" class="frame">
                <template v-if="item.calculate_type == 1"> 按件计费 </template>
                <template v-if="item.calculate_type == 0"> 按重量计费 </template>
              </el-col>
              <!-- 多商品 -->
              <el-col :xl="12" :md="12" :sm="12" :xs="12">
                <template v-for="(item1, index1) in item.dispatch_area" :key="Number(index1)">
                  <el-row class="loop-box" v-if="item1.provinces">
                    <el-col class="oe-flex frame commodity-box" :xl="10" :md="10" :sm="10" :xs="10">
                      {{ item1.text }}
                    </el-col>
                    <el-col :xl="4" :md="4" :sm="4" :xs="4" class="frame commodity-box">
                      {{ item1.first_num }}</el-col
                    >
                    <el-col class="frame commodity-box" :xl="3" :md="3" :sm="3" :xs="3">
                      ¥{{ item1.first_price }}
                    </el-col>
                    <el-col class="state-box frame commodity-box" :xl="4" :md="4" :sm="4" :xs="4">
                      {{ item1.second_num }}
                    </el-col>
                    <el-col :xl="3" :md="3" :sm="3" :xs="3" class="frame commodity-box">
                      ¥{{ item1.second_price }}
                    </el-col>
                  </el-row>
                  <el-row
                    class="loop-box"
                    v-else
                    :class="[item.dispatch_area.length < 2 ? 'singleHeight' : '']"
                  >
                    <el-col class="oe-flex frame commodity-box" :xl="10" :md="10" :sm="10" :xs="10">
                      全国统一收费
                    </el-col>
                    <el-col :xl="4" :md="4" :sm="4" :xs="4" class="frame commodity-box">
                      <template v-if="item.calculate_type == 1">
                        {{ item1.start_num }}
                      </template>
                      <template v-if="item.calculate_type == 0">
                        {{ item1.start_weight }}
                      </template>
                    </el-col>
                    <el-col class="frame commodity-box" :xl="3" :md="3" :sm="3" :xs="3">
                      <template v-if="item.calculate_type == 1">
                        ¥{{ item1.add_num_price }}
                      </template>
                      <template v-if="item.calculate_type == 0">
                        ¥{{ item1.start_weight_price }}
                      </template>
                    </el-col>
                    <el-col class="state-box frame commodity-box" :xl="4" :md="4" :sm="4" :xs="4">
                      <template v-if="item.calculate_type == 1">
                        {{ item1.add_num }}
                      </template>
                      <template v-if="item.calculate_type == 0">
                        {{ item1.add_weight }}
                      </template>
                    </el-col>
                    <el-col :xl="3" :md="3" :sm="3" :xs="3" class="frame commodity-box">
                      <template v-if="item.calculate_type == 1">
                        ¥{{ item1.add_num_price }}
                      </template>
                      <template v-if="item.calculate_type == 0">
                        ¥{{ item1.add_weight_price }}
                      </template>
                    </el-col>
                  </el-row>
                </template>
              </el-col>
              <el-col :xl="2" :md="2" :sm="2" :xs="2" class="frame">
                <div>{{ formatUnix(item.createtime) }}</div>
              </el-col>
              <el-col :xl="2" :md="2" :sm="2" :xs="2" class="frame">
                <el-switch
                  v-model="item.switch"
                  @change="setDefault($event, item.id)"
                  :disabled="item.switch"
                ></el-switch>
              </el-col>
              <el-col :xl="3" :md="3" :sm="3" :xs="3" class="frame">
                <div>
                  <div class="oe-flex">
                    <custom-button icon="ad-view-order" color="#FF9D28" @click="getEdit(item.id)"
                      >编辑</custom-button
                    >
                    <custom-button
                      icon="ad-view-order"
                      class="public-move-left"
                      color="#FE6712"
                      @click="copyList(item.id)"
                      >复制</custom-button
                    >
                  </div>
                  <div>
                    <custom-button
                      v-if="item.is_default != 1"
                      style="margin-top: 14px"
                      icon="ad-view-order"
                      color="#FF0000"
                      @click="deleteBtn(item.id)"
                      >删除</custom-button
                    >
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </template>
        <template v-else>
          <el-empty class="oe-m-t-30" :image-size="200"></el-empty>
        </template>
      </div>
    </el-row>
    <!-- <el-table
      class="revenue-list"
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="dispatch_name" label="模板名称" min-width="120"></el-table-column>
      <el-table-column prop="date" label="收费方式" min-width="100">
        <template #default="scope">
          <div v-if="scope.row.calculate_type == 1">按件计费</div>
          <div v-if="scope.row.calculate_type == 0">按重量计费</div>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="配送区域" min-width="210">
        北京市、天津市、河北省、山西省、内蒙古自治区、辽宁省、吉林省、
        黑龙江省、上海市、江苏省、浙江省、安徽省、福建省、江西省、山东省、河南省、陕西省、甘肃省、青海省、宁夏回族自治区、新疆维吾尔自治区
      </el-table-column>
      <el-table-column prop="start_weight" label="初发件(重量)/个(Kg)" min-width="110">
        <template #default="scope">
          <div v-if="scope.row.calculate_type == 1"> {{ scope.row.start_num }}</div>
          <div v-if="scope.row.calculate_type == 0"> {{ scope.row.start_weight }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" min-width="140" label="初发运费/元">
        <template #default="scope">
          <div v-if="scope.row.calculate_type == 1"> {{ scope.row.start_num_price }}</div>
          <div v-if="scope.row.calculate_type == 0"> {{ scope.row.start_weight_price }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="add_num_price" label="续发件(重量)/个(Kg)" min-width="120">
        <template #default="scope">
          <div v-if="scope.row.calculate_type == 1"> {{ scope.row.add_num }}</div>
          <div v-if="scope.row.calculate_type == 0"> {{ scope.row.add_weight }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="续发运费/元" min-width="150">
        <template #default="scope">
          <div v-if="scope.row.calculate_type == 1"> {{ scope.row.add_num_price }}</div>
          <div v-if="scope.row.calculate_type == 0"> {{ scope.row.add_weight_price }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="是否默认" min-width="150">
        <template #default="scope">
          <el-switch
            v-model="scope.row.switch"
            @change="setDefault($event, scope.row.id)"
            :disabled="scope.row.switch"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="新增时间" min-width="170">
        <template #default="scope">
          {{ formatUnix(scope.row.createtime) }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" min-width="240">
        <template #default="scope">
          <div class="oe-flex">
            <custom-button icon="ad-view-order" color="#FF9D28" @click="getEdit(scope.row.id)"
              >编辑</custom-button
            >
            <custom-button
              icon="ad-view-order"
              class="public-move-left"
              color="#FE6712"
              @click="copyList(scope.row.id)"
              >复制</custom-button
            >
            <custom-button
              icon="ad-view-order"
              class="public-move-left"
              color="#FF0000"
              @click="deleteBtn(scope.row.id)"
              >删除</custom-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table> -->
    <el-col :lg="24" class="paging-box">
      <el-pagination
        class="e-grid"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        background
        :current-page="pagination.currentPage"
        layout="total, prev, pager, next,sizes, jumper"
        :total="pagination.total"
      ></el-pagination>
    </el-col>
  </el-card>
  <div class="delete-box">
    <el-dialog v-model="show" width="550px">
      <template #title>
        <div class="oe-flex">
          <i class="el-icon-warning"></i>
          <div class="card-header">
            <div class="card-header-title">提示</div
            ><div class="card-header-text">您确定删除该配送模板么？</div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="footer-right">
          <el-button size="mini" @click="show = false">取消</el-button>
          <el-button size="mini" type="primary" @click="determineBtn">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import dayjs from 'dayjs'
  import {
    reqDistributionList,
    reqDeliverySettings,
    reqCopyDistribution,
    reqDeleteDistribution
  } from '@/api/system'
  import { ElMessage } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { formatUnix } from '@/utils'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const router = useRouter()
  const form = ref({
    // 配送范围名称
    couponName: '',
    // 状态
    status: '',
    // 新增时间
    createTime: []
  })
  const show = ref(false)
  //  列表数据
  const tableData = ref<any>([])
  // 删除id
  const deleteId = ref<any>('')

  // 重置按钮
  const getEmpty = () => {
    form.value.couponName = ''
    form.value.status = ''
    form.value.createTime = []
    pagination.currentPage = 1
    restRangeList()
  }
  // 设置默认
  const setDefault = async (show: any, id: any) => {
    if (show) {
      await reqDeliverySettings({ id })
      ElMessage.success('操作成功')
      restRangeList()
    }
  }
  // 查看订单
  const getEdit = (id: any) => {
    router.push({ path: '/system/logisticsDistribution/newTemplate', query: { id } })
  }
  // 搜索按钮
  const getSearch = () => {
    pagination.currentPage = 1
    restRangeList()
  }
  // 删除按钮
  const deleteBtn = (id: string) => {
    show.value = true
    deleteId.value = id
  }
  // 确定删除
  const determineBtn = async () => {
    await reqDeleteDistribution({ id: deleteId.value })
    ElMessage.success('操作成功')
    show.value = false
    restRangeList()
  }
  // 获取配送列表
  const restRangeList = async () => {
    const createTime = []
    if (form.value.createTime.length) {
      createTime[0] = dayjs(form.value.createTime[0]).unix().toString()
      createTime[1] = dayjs(form.value.createTime[1]).unix().toString()
    }
    const { data } = await reqDistributionList({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      dispatch_name: form.value.couponName,
      calculate_type: form.value.status,
      createtime: createTime
    })
    tableData.value = data.data.data
    pagination.total = data.data.total
    tableData.value.forEach((item: any) => {
      if (item.is_default == 1) {
        item.switch = true
      } else {
        item.switch = false
      }
      if (item.calculate_type == 1) {
        const unified = {
          start_num: item.start_num,
          start_num_price: item.start_num_price,
          add_num: item.add_num,
          add_num_price: item.add_num_price
        }
        item.dispatch_area.unshift(unified)
      } else {
        const unified = {
          start_weight: item.start_weight,
          start_weight_price: item.start_weight_price,
          add_weight: item.add_weight,
          add_weight_price: item.add_weight_price
        }
        item.dispatch_area.unshift(unified)
      }
    })
  }
  // 复制列表
  const copyList = async (id: string) => {
    await reqCopyDistribution({ id })
    ElMessage.success('操作成功')
    restRangeList()
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    restRangeList()
  })
  onMounted(() => restRangeList())
</script>
<style lang="scss" scoped>
  .logistics-scope {
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
  :deep(.el-date-editor) {
    height: 32px;
    line-height: 32px;
    span {
      line-height: 26px;
    }
    i {
      line-height: 26px;
    }
  }
  .refund-list {
    margin-top: 20px;
    .el-button {
      display: flex;
      align-items: center;
      min-height: 32px;
      padding: 0 14px;
    }
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
  .order-list-box {
    margin-top: 40px;
    width: 100%;
    overflow-x: auto;
    padding-left: 13px;
    .list-title {
      min-width: 1200px;
      font-size: 14px;
      color: #000;
      padding: 0 0 14px 0;
      border-bottom: 1px solid #d9d9d9;
      .list-title-right {
        width: 100%;
      }
    }
    .selection-all {
      margin: 0 19px 0 0px;
      padding-left: 9px;
    }
    .box-name {
      padding-left: 10px;
    }
    .selection-single {
      margin-right: 10px;
    }
    .list-box {
      min-width: 1200px;
      margin-top: 14px;
      font-size: 14px;
      color: #000;
      border: 1px solid #d9d9d9;
      .list-header {
        height: 52px;
        padding-left: 9px;
        background: #f0f0f0;
        .el-image {
          width: 16px;
          height: 16px;
        }
      }
      .header-right-box {
        position: relative;
      }
      .header-right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 50px;
      }
      .touch-text {
        cursor: pointer;
      }
      .copy-tetx {
        cursor: pointer;
        margin: 0 28px 0 10px;
      }
      .contact {
        cursor: pointer;
        margin: 0 7px 0 10px;
      }
      .list-bottom {
        margin-top: 12px;
      }
    }
    .state-text {
      color: #ff0000;
    }
    .box-content {
      // margin: 10px 0;
      .completely {
        height: 100%;
      }
      .loop-box {
        // height: 100%;
        display: flex;
        border-bottom: 1px solid #f5f5f5;
        .commodity-box {
          padding: 15px 0px 15px 10px;
        }
      }
      .singleHeight {
        height: 100%;
      }
      &.box-content .loop-box:last-child {
        border-bottom: none;
      }
      :deep(.el-button) {
        display: flex !important;
        align-items: center;
        max-height: 24px;
        padding: 0 8px;
        min-height: 24px;
        line-height: 24px;
        border-radius: 2px;
        i {
          font-size: 16px;
          padding-right: 3px;
        }
        span {
          line-height: 24px;
          font-size: 12px;
        }
      }
      .layer-content {
        display: flex;
      }
      .btn-bottom {
        margin-top: 10px;
      }
      .order-information-img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      :deep(.el-tag--mini) {
        margin-top: 6px;
        padding: 0;
      }
      .frame {
        display: flex;
        align-items: center;
        padding-left: 10px;
        border-left: 1px solid #f5f5f5;
      }
      .btn-deviation {
        margin-left: 10px;
        // @include self-lg-xl(margin, 14px 0 0 0, 0 0 0 10px);
        // @include self-lg-xl(display, block, inline-block);
      }
      @media only screen and (max-width: 1620px) {
        .btn-deviation {
          margin-left: 0;
        }
      }
    }
    .is-color {
      color: var(--color-primary);
    }
  }
</style>
