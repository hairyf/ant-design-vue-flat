<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-10 17:23:07
 * @Description: 退货地址
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="refund-list custom-crad-container custom-card-page">
    <div class="card-header">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="router.push({ path: '/system/logisticsDistribution/newAddress' })"
        >新增退货地址</el-button
      >
      <div class="header-right"> </div>
    </div>
    <el-table
      ref="multipleTable"
      class="revenue-list"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无退货地址" />
      </template>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="title" label="地址名称" min-width="150"
        >我是默认模板名称</el-table-column
      >
      <el-table-column prop="consignee" label="收货人" min-width="150"></el-table-column>
      <el-table-column prop="phone" label="联系方式" min-width="150"></el-table-column>
      <el-table-column label="收货地址" min-width="250">
        <template #default="scope">
          {{ scope.row.province_name }}{{ scope.row.city_name }}{{ scope.row.area_name
          }}{{ scope.row.address }}
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
      <el-table-column prop="date" label="新增时间" min-width="150">
        <template #default="scope">
          {{ formatUnix(scope.row.createtime) }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" min-width="310">
        <template #default="scope">
          <div class="oe-flex">
            <custom-button
              icon="ad-view-order"
              color="#FF9D28"
              @click="jumpNewlyAdded(scope.row.id)"
              >编辑
            </custom-button>
            <custom-button
              icon="ad-view-order"
              class="public-move-left"
              color="#FF0000"
              @click="deleteBtn(0, scope.row)"
              >删除
            </custom-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="24" style="margin: 0" class="oe-flex oe-row-between order-bottom">
      <el-col :lg="12">
        <div class="oe-flex oe-row-between e-grid">
          <div class="operation-text">
            <el-checkbox v-model="selectAll" @change="handleCheckAllDatChange"
              >全选当前页</el-checkbox
            >
            <el-link
              href="javascript:;"
              :underline="false"
              :class="{ 'public-red': selectList.length }"
              :disabled="selectList.length ? false : true"
              class="public"
              @click="deleteBtn(1)"
              >删除</el-link
            >
          </div>
        </div>
      </el-col>
      <el-col :lg="12">
        <el-pagination
          class="e-grid"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page="pagination.currentPage"
          layout="total, prev, pager, next,sizes, jumper"
          :total="pagination.total"
        ></el-pagination>
      </el-col>
    </el-row>
  </el-card>
  <div class="delete-box">
    <el-dialog v-model="show" width="550px">
      <template #title>
        <div class="oe-flex">
          <i class="el-icon-warning"></i>
          <div class="card-header">
            <div class="card-header-title">提示</div
            ><div v-if="isBatch == 0" class="card-header-text">您确定删除该退货地址么？</div>
            <div v-else class="card-header-text">您确定删除选中的退货地址么？</div>
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
  import { onMounted, reactive, ref, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import { reqReturnAddressList } from '@/api/order'
  import { ElMessage } from 'element-plus'
  import { reqSetDefault, reqDeleteReturns } from '@/api/system'
  import { useRouter } from 'vue-router'
  import { formatUnix } from '@/utils'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  // 判断是否全选当前页
  const selectAll = ref(false)
  const router = useRouter()
  // 当前容器元素
  const multipleTable = ref<any>()
  //  列表数据
  const tableData = ref<any[]>([])
  // 当前选中的数据
  const selectList = ref<any[]>([])
  // 当前删除的id
  const currentId = ref('')
  // 删除的模态框
  const show = ref(false)
  // 是否批量删除 0单个 1批量
  const isBatch = ref(0)
  // table选中事件
  const handleSelectionChange = (val: any) => {
    selectList.value = val
  }
  watch(selectList, () => {
    if (selectList.value.length == tableData.value.length) {
      selectAll.value = true
    } else {
      selectAll.value = false
    }
  })
  // 触发底部的全选按钮
  const handleCheckAllDatChange = (state: any) => {
    if (!state || !selectList.value) {
      //点击全选后数据所有选择的数据存到这个数组里边
      multipleTable.value?.clearSelection() //调用这个方法
    } else if (state == true) {
      multipleTable.value?.toggleAllSelection()
    }
  }
  // 设置默认
  const setDefault = async (show: boolean, id: string) => {
    if (show) {
      await reqSetDefault({ id })
      ElMessage.success('操作成功')
      restReturnAddress()
    }
  }
  // 新增退货地址
  const jumpNewlyAdded = (id?: any) => {
    if (id) {
      router.push({ path: '/system/logisticsDistribution/newAddress', query: { id } })
    }
  }
  // 删除按钮
  const deleteBtn = (num: number, currentItem?: any) => {
    if (currentItem) {
      currentId.value = currentItem.id
    }
    show.value = true
    isBatch.value = num
  }
  // 删除请求
  const determineBtn = async () => {
    if (isBatch.value == 0) {
      await reqDeleteReturns({ id: [currentId.value] })
    } else {
      const id = [] as any[]
      selectList.value.forEach((item: any) => id.push(item.id))
      await reqDeleteReturns({ id })
    }
    show.value = false
    ElMessage.success('操作成功!!')
    restReturnAddress()
  }
  // 获取退货地址列表
  const restReturnAddress = async () => {
    const { data } = await reqReturnAddressList({
      page: pagination.currentPage,
      limit: pagination.pageSize
    })
    tableData.value = data.data.data
    tableData.value.forEach((item) => {
      if (item.is_default == 1) {
        item.switch = true
      } else {
        item.switch = false
      }
    })
    pagination.total = data.data.total
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    restReturnAddress()
  })
  onMounted(() => {
    restReturnAddress()
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .refund-list {
    margin-top: 20px;
    .card-header {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 4px 14px 16px;
      .el-button {
        display: flex;
        align-items: center;
        min-height: 32px;
        padding: 0 14px;
      }
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

  .order-bottom {
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    margin: 0 auto;
    .operation-text {
      :deep(.el-checkbox__inner) {
        width: 16px;
        height: 16px;
      }
      :deep(.el-checkbox) {
        transform: translateY(1px);
      }
      :deep(.el-checkbox__inner::after) {
        left: 5px;
        top: 2px;
      }
      .public {
        font-size: 14px;
        color: #8c8c8c;
        margin-left: 8px;
      }
      .public-red {
        color: var(--color-primary);
      }
    }
    :deep(.el-pagination) {
      @include self-md-lg(text-align, left, right);
    }
    @media only screen and (max-width: 1485px) {
      :deep(.el-pagination) {
        transform: translateX(-143px);
      }
    }
    @media only screen and (max-width: 1340px) {
      :deep(.el-pagination) {
        transform: translateX(0);
      }
    }
  }
</style>
