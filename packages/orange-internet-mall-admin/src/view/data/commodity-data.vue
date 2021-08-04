<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-14 14:08:38
 * @Description: 商品数据
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->

<template>
  <el-row :gutter="24">
    <el-col :lg="24">
      <el-row :gutter="24">
        <el-col :lg="6" :sm="6" :xs="6">
          <el-card shadow="never" class="e-grid count-container">
            <count-item center="center" icon="browsed" title="被浏览商品数量/件" :count="120" />
          </el-card>
        </el-col>
        <el-col :lg="6" :sm="6" :xs="6">
          <el-card shadow="never" class="e-grid count-container">
            <count-item center="center" icon="goods-sale" title="在售商品数量/件" :count="12" />
          </el-card>
        </el-col>
        <el-col :lg="6" :sm="6" :xs="6">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              center="center"
              icon="additional-purchase"
              title="加购商品数量/件"
              :count="120000"
            />
          </el-card>
        </el-col>
        <el-col :lg="6" :sm="6" :xs="6">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              center="center"
              icon="purchase-quantity"
              title="购买商品数量/件"
              :count="120000"
            />
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-card shadow="never" class="custom-card-page custom-crad-container">
    <div class="oe-flex oe-row-between">
      <div class="data-title">全部排行</div>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div>
    <el-table
      class="commodity-data-box"
      :cell-style="{ background: '#fff' }"
      :data="tableList"
      style="width: 100%"
    >
      <el-table-column label="商品" min-width="160" prop="date">
        <div class="oe-flex Member-name">
          <img src="/custom-assets/images/order/Rectangle76.png" class="Member-name-img" alt="" />
          <div class="Member-name-text">我是用户名</div>
        </div>
      </el-table-column>
      <el-table-column prop="address" min-width="100" label="销售量(件)">
        <div class="is-color">192</div>
      </el-table-column>
      <el-table-column prop="address" label="销售额(元)">
        <div>¥11.00</div>
      </el-table-column>
      <el-table-column prop="address" label="浏览量(次)">
        <div>10</div>
      </el-table-column>
      <el-table-column prop="address" label="商品状态">
        <div class="is-color">出售中</div>
        <!-- <div class="warehouse">仓库中</div> -->
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <div class="oe-flex list-btn">
            <custom-button icon="ad-see" color="#FE6712" @click="getEdit(scope.row)"
              >查看
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
  import { ref, reactive, onMounted } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import { reqCommodityData } from '@/api/data'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  // 搜索时间
  const date = ref('')
  // 数据
  const tableList = reactive([
    {
      val: ''
    }
  ])
  // 查看详情
  const getEdit = (row: any) => {
    // console.log(row)
  }
  const getCommodityList = async () => {
    await reqCommodityData({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      createtime: date.value
    })
  }
  onMounted(() => {
    getCommodityList()
  })
</script>
<style lang="scss" scoped>
  .custom-crad-container {
    margin-top: 24px;
    .data-title {
      font-size: 16px;
      font-weight: 500;
      color: var(--color-primary);
    }
    :deep(.el-date-editor) {
      height: 30px;
      .el-range-separator {
        line-height: 25px;
      }
      .el-icon-date {
        line-height: 25px;
      }
    }
    .commodity-data-box {
      margin-top: 20px;
      :deep(.cell) {
        color: #000;
      }
      .is-color {
        color: var(--color-primary);
      }
      .warehouse {
        color: #1ad370;
      }
    }
    .paging-box {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
