<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-10 17:27:55
 * @Description: 常规日志
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="logistics-scope">
    <el-row :gutter="24">
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">关键信息</div>
          <el-input
            @input="getSearch"
            class="oe-flex-1"
            v-model="form.couponName"
            placeholder="请输入/商品/订单/会员/财务等"
          ></el-input>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">操作员</div>
          <el-select v-model="form.operationId" placeholder="全部" class="oe-flex-1" clearable>
            <el-option
              v-for="item in operationList"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">操作时间</div>
          <el-date-picker
            class="oe-flex-1"
            v-model="form.createtime"
            type="date"
            placeholder="选择退款时间"
          ></el-date-picker>
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
  <el-card shadow="never" class="refund-list custom-crad-container custom-card-page">
    <el-table :data="tableData" style="width: 100%">
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无常规日志" />
      </template>
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="操作人名称">
              <span>{{ props.row.manager_name }}</span>
            </el-form-item>
            <el-form-item label="操作事件">
              <span>{{ props.row.module_name }}</span>
            </el-form-item>
            <el-form-item label="操作IP">
              <span>{{ props.row.manager_ip }}</span>
            </el-form-item>
            <el-form-item label="操作人权限">
              <span>{{ props.row.manager_group_name }}</span>
            </el-form-item>
            <el-form-item label="操作时间">
              <span>{{ formatUnix(props.row.createtime) }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="操作ID" prop="id"> </el-table-column>
      <el-table-column label="操作事件" prop="module_name"> </el-table-column>
      <el-table-column label="操作人" prop="manager_name"> </el-table-column>
      <el-table-column label="操作IP" prop="manager_ip"> </el-table-column>
      <el-table-column label="操作时间" prop="name">
        <template #default="scope">
          {{ formatUnix(scope.row.createtime) }}
        </template>
      </el-table-column>
    </el-table>
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
</template>
<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import { reqGeneralList, reqRoleSelect } from '@/api/system'
  import { formatUnix } from '@/utils'
  import dayjs from 'dayjs'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const form = ref({
    // 配送范围名称
    couponName: '',
    // 状态
    operationId: '',
    // 新增时间
    createtime: ''
  })
  // 操作人列表
  const operationList = ref<any[]>([])
  //  列表数据
  const tableData = ref<any[]>([])
  reqRoleSelect({ page: 1, limit: 100 }).then((res) => {
    operationList.value = res.data.data.data
    operationList.value.unshift({
      id: 0,
      name: '超管管理员'
    })
  })
  // 重置按钮
  const getEmpty = () => {
    form.value.couponName = ''
    form.value.operationId = ''
    form.value.createtime = ''
    pagination.currentPage = 1
    getGeneralList()
  }
  // 搜索按钮
  const getSearch = () => {
    pagination.currentPage = 1
    getGeneralList()
  }
  // 获取日志列表
  const getGeneralList = async () => {
    let createtime = ''
    if (form.value.createtime) {
      createtime = dayjs(form.value.createtime).unix().toString()
    }
    const { data } = await reqGeneralList({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: JSON.stringify({
        keyword: form.value.couponName,
        createtime,
        manager_group_id: form.value.operationId
      })
    })
    pagination.total = data.data.total
    tableData.value = data.data.data
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    getGeneralList()
  })
  onMounted(() => {
    getGeneralList()
  })
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
  :deep(.el-form-item__label) {
    color: #8c8c8c;
  }
  :deep(.el-form-item__content) {
    color: #000;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
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
</style>
