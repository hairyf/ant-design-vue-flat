<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-10 15:17:38
 * @Description: 消费排行
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <!-- 筛选条件 -->
  <el-card shadow="never" class="consumption-head">
    <el-form ref="consumptionForm" :model="form" label-width="70px">
      <el-row :gutter="24">
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <el-form-item label="关键词">
            <div class="oe-flex">
              <el-input v-model="form.keyWord" class="oe-flex-1" placeholder="微信昵称/姓名/手机号">
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <el-form-item label="会员等级">
            <div class="oe-flex">
              <el-select v-model="form.grade" placeholder="全部" class="oe-flex-1" clearable>
                <el-option label="全部" value="全部"> </el-option>
                <el-option label="默认等级" value="默认等级"></el-option>
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <el-form-item label="消费金额">
            <div class="oe-flex">
              <el-input v-model="form.consumption[0]" class="oe-flex-1">
                <template #append>元</template>
              </el-input>
              <span class="both-sides"></span>
              <el-input v-model="form.consumption[1]" class="oe-flex-1">
                <template #append>元</template>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <el-form-item label="订单数量">
            <div class="oe-flex">
              <el-input v-model="form.orderQuantity[0]" class="oe-flex-1">
                <template #append>单</template>
              </el-input>
              <span class="both-sides"></span>
              <el-input v-model="form.orderQuantity[1]" class="oe-flex-1">
                <template #append>单</template>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <div class="oe-flex is-grid">
            <el-button type="primary" @click="getSearch">搜索</el-button>
            <div @click="resetBtn" class="reset-text">重置条件</div>
            <div @click="getExportBtn" class="reset-text">导出</div>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <el-card shadow="never" class="custom-card-page consumption-box">
    <el-table class="revenue-list" :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="排行">1</el-table-column>
      <el-table-column prop="date" label="会员" min-width="150">
        <div class="oe-flex">
          <img src="/custom-assets/images/order/Rectangle76.png" class="member-img" alt="" />
          <div>
            <div class="member-text">我是会员昵称</div>
            <img src="/custom-assets/images/member/Vector(2).png" alt="" class="platform-img" />
          </div>
        </div>
      </el-table-column>

      <el-table-column prop="name" label="手机号">13880988902</el-table-column>
      <el-table-column prop="name" label="会员等级">默认会员</el-table-column>
      <el-table-column prop="address" label="消费金额">￥10000</el-table-column>
      <el-table-column prop="address" label="订单数量">10000</el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <custom-button icon="ad-remarks" color="#FE6712" @click="getEdit(scope.row)"
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
</template>
<script setup lang="ts">
  import { reactive } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import { ElMessage } from 'element-plus'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const form = reactive({
    // 关键词
    keyWord: '',
    //会员等级
    grade: '',
    // 消费金额
    consumption: ['', ''],
    // 订单数量
    orderQuantity: ['', '']
  })
  // 列表数据
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
  //搜索
  const getSearch = () => {
    if (form.consumption[0] > form.consumption[1] && form.consumption[0] && form.consumption[1]) {
      ElMessage({
        message: '消费金额最大范围不能小于最小范围',
        type: 'error'
      })
    } else if (
      form.orderQuantity[0] > form.orderQuantity[1] &&
      form.orderQuantity[0] &&
      form.orderQuantity[1]
    ) {
      ElMessage({
        message: '订单数量最大范围不能小于最小范围',
        type: 'error'
      })
    }
  }
  // 重置
  const resetBtn = () => {
    form.keyWord = ''
    form.grade = ''
    form.consumption = ['', '']
    form.orderQuantity = ['', '']
  }
  // 导出
  const getExportBtn = () => {
    // console.log('导出')
  }
  // 查看
  const getEdit = (row: any) => {
    // console.log(row)
  }
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .consumption-head {
    :deep(.el-form-item__label) {
      line-height: 32px;
    }
    :deep(.el-input-group__append) {
      padding: 0 10px;
      line-height: 30px;
    }
    :deep(.el-button) {
      padding: 2px 34px;
      min-height: 32px;
    }
    :deep(.el-card__body) {
      padding-bottom: 0;
    }
    .reset-text {
      margin-left: 40px;
      cursor: pointer;
      color: var(--color-primary);
    }
    .is-grid {
      margin-bottom: 20px;
    }
    .both-sides {
      width: 10px;
      height: 1px;
      background: #c4c4c4;
      margin: 0 5px;
    }
  }
  .consumption-box {
    margin-top: 24px;
    position: relative;
    :deep(.el-card__body) {
      .cell {
        color: #000;
      }
      @include self-lg-xl(min-height, 765px, 980px);
    }
  }
  .paging-box {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
</style>
