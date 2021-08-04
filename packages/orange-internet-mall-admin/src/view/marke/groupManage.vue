<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-13 10:31:18
 * @Description: 群体管理
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="all-coupon-box">
    <el-card shadow="never" class="screen-box">
      <el-row :gutter="80">
        <el-col :xl="5" :md="8" :sm="12" class="oe-flex">
          <div class="oe-flex is-grid">
            <div class="screen-text">群体名称</div>
            <el-input
              @keyup.enter="resetGoodsList"
              class="oe-flex-1"
              v-model="formInfo.search_name"
              placeholder="请输入群体名称"
            ></el-input>
          </div>
        </el-col>
        <el-col :xl="5" :md="8" :sm="12" class="oe-flex">
          <div class="oe-flex is-grid">
            <div class="screen-text">状态</div>
            <el-select
              v-model="formInfo.search_status"
              placeholder="全部"
              class="oe-flex-1"
              clearable
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :xl="5" :md="8" :sm="12" class="oe-flex">
          <div class="oe-flex is-grid">
            <div class="screen-text">新增时间</div>

            <el-date-picker
              class="oe-flex-1"
              v-model="createTime"
              type="date"
              placeholder="优惠券新增时间"
            >
            </el-date-picker>
          </div>
        </el-col>
        <el-col :xl="5" :md="8" :sm="12" class="oe-flex">
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
            @click="$router.push('/marke/addGroup')"
          >
            <div class="add-button-box">
              <i class="ad-shapePlus"></i>
              <span class="text">新增群体</span>
            </div>
          </el-button>
        </div>
      </template>

      <el-table class="revenue-list" :data="tableData" style="width: 100%">
        <template v-slot:empty>
          <el-empty class="oe-m-t-30" description="暂无群体" />
        </template>
        <el-table-column prop="name" label="群体名称" min-width="150"></el-table-column>
        <el-table-column prop="nums" label="人数" min-width="150"></el-table-column>

        <el-table-column prop="updatetime" label="新增时间" min-width="160">
          <template #default="scope">
            {{ formatUnix(scope.row.updatetime) }}
          </template>
        </el-table-column>

        <el-table-column prop="name" label="状态">
          <template #default="scope">
            <span style="color: #1ad370" v-if="scope.row.status == 0">未使用</span>
            <span style="color: #ff0000" v-if="scope.row.status == 1">已使用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <div class="edit oe-flex">
              <custom-button
                @click="refreshSingle(scope.row.id)"
                icon="el-icon-refresh"
                color="#2DB6F5"
                class="public-move-left"
                >刷新</custom-button
              >
              <custom-button
                @click="ejectCoupon(scope.row)"
                icon="ad-yingxiaowuse"
                color="#FE6712"
                class="public-move-left"
                >发券</custom-button
              >
            </div>
            <div class="edit oe-flex">
              <el-button
                @click="$router.push({ path: '/marke/addGroup', query: { id: scope.row.id } })"
                type="primary"
                size="mini"
                icon="ad-edit"
                >编辑</el-button
              >

              <el-dropdown trigger="click" @command="handleCommand(scope.row.id, $event)">
                <custom-button icon="ad-more" color="#000000" class="public-move-left"
                  >更多</custom-button
                >
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="1">导出</el-dropdown-item>
                    <el-dropdown-item command="4">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
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
    <!-- 优惠券选择器 -->
    <coupon-selector
      :sendValueList="sendValueList"
      v-model:addDialogVisible="addDialogVisible"
    ></coupon-selector>
  </div>
</template>
<script setup lang="ts">
  import { reactive, ref, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import {
    reqShopGroupManagementIndex,
    reqShopGroupManagementFlush,
    reqShopGroupManagementDelete,
    reqShopGroupManagementExport
  } from '@/api/marketing'
  import dayjs from 'dayjs'
  import { formatUnix } from '@/utils'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import CouponSelector from './components/couponSelector.vue'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  // 弹出优惠券选择器
  const addDialogVisible = ref(false)
  const sendValueList = ref([])
  const ejectCoupon = (data: any) => {
    if (data.user_ids.length > 0) {
      addDialogVisible.value = true
      sendValueList.value = data.user_ids
    } else {
      ElMessage.error('该群体不能发券')
    }
  }
  //  列表数据
  const tableData = ref<any[]>([])
  const statusOptions = reactive([
    {
      value: '0',
      label: '未使用'
    },
    {
      value: '1',
      label: '已使用'
    }
  ])
  // 刷新单条数据
  const refreshSingle = async (id: Key) => {
    await reqShopGroupManagementFlush({ id })
    ElMessage.success('刷新成功')
  }
  // 当前项更多操作
  const handleCommand = async (id: Key, command: any) => {
    switch (command) {
      case '1':
        if (command != '') {
          const { data } = await reqShopGroupManagementExport({ id, export_type: 1 })
          ElMessage.success('导出成功!')

          const blob = new Blob([data as any])
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '群体.xlsx')
          document.body.appendChild(link)
          link.click()
        }

        break
      case '4':
        ElMessageBox.confirm('您确定删除该商品么？确定后该商品将会放入回收站', '删除商品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await reqShopGroupManagementDelete({ ids: [id] })
          ElMessage.success('删除成功!')
          resetGoodsList()
        })
        break
    }
  }

  // 重置按钮
  const getEmpty = () => {
    formInfo.value.search_name = ''
    createTime.value = ''
    formInfo.value.search_status = ''
  }
  // 搜索对象
  const formInfo = ref<any>({
    search_name: '',
    search_createtime: '',
    search_status: ''
  })
  // 搜索时间
  const createTime = ref('')
  // 请求接口数据 start
  // // 商品列表
  const resetGoodsList = async () => {
    if (createTime.value != '' && createTime.value != null) {
      formInfo.value.search_createtime = dayjs(createTime.value).unix()
    } else if (createTime.value == null) {
      formInfo.value.search_createtime = ''
    }
    const subInfo: any = {
      search: formInfo.value,
      page: pagination.currentPage,
      limit: pagination.pageSize
    }
    const { data } = await reqShopGroupManagementIndex(subInfo)

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
