<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 16:28:00
 * @LastEditTime: 2021-04-27 20:01:21
 * @Description: 调整余额
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="store-manage">
    <el-card shadow="never" class="custom-crad-container custom-card-page">
      <template #header>
        <div class="card-header">
          <el-button class="button" type="primary" icon="el-icon-plus">新增公告</el-button>
          <div class="header-right">
            <el-input placeholder="请输入内容" v-model="input">
              <template #suffix>
                <i class="el-icon-search el-input__icon" style="cursor: pointer"> </i>
              </template>
            </el-input>
            <span>展示</span>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              v-model:currentPage="pagination.currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="sizes"
              :total="100"
            ></el-pagination>
            <span>数据</span>
          </div>
        </div>
      </template>
      <el-table
        class="table-box"
        :cell-style="{ background: '#fff' }"
        :data="tableList"
        style="width: 100%"
      >
        <el-table-column label="门店名称" min-width="160" prop="date">
          <div class="oe-flex Member-name">
            <el-image
              src="/custom-assets/images/order/Rectangle76.png"
              class="Member-name-img"
            />
            <div>
              <div class="Member-name-text">五碗面</div>
            </div>
          </div>
        </el-table-column>
        <el-table-column prop="address" min-width="100" label="门店地址">
          <div>我是文件名称</div>
        </el-table-column>
        <el-table-column prop="address" label="联系人" min-width="90">
          <div>欧阳靖</div>
        </el-table-column>
        <el-table-column prop="address" label="联系电话" min-width="150">
          <div>15570121017</div>
        </el-table-column>
        <el-table-column prop="address" label="营业时间" min-width="95">
          <div>全天</div>
        </el-table-column>
        <el-table-column prop="address" label="状态" min-width="75" sortable>
          <el-tag type="success">启用</el-tag>
        </el-table-column>
        <el-table-column prop="address" label="操作" min-width="300">
          <template #default="">
            <div>
              <custom-button
                icon="el-icon-edit-outline"
                color="#FE6712"
                @click="$router.push('member-details')"
                >编辑</custom-button
              >
              <custom-button icon="ad-blacklist" color="#FF0000" class="public-move-left"
                >禁用</custom-button
              >
              <custom-button icon="el-icon-delete" color="#FF0000" class="public-move-left"
                >删除</custom-button
              >
              <custom-button class="public-move-left" icon="ad-grade" color="#2DB6F5"
                >启用</custom-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination-right"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="pagination.currentPage"
        layout="total, prev, pager, next,sizes, jumper"
        :total="pagination.total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()

  // 内容数据
  const tableList = ref([
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    },
    {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }
  ])
  // 输入框
  const input = ref('')
</script>
<style lang="scss" scoped>
  .store-manage {
    .card-header {
      display: flex;
      justify-content: space-between;
      .header-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 500px;
        .el-input {
          width: 200px;
          margin-right: 20px;
        }
      }
    }
    .pagination-right {
      float: right;
      margin-top: 120px;
    }
  }
</style>
