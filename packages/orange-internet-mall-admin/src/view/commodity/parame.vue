<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-19 14:46:13
 * @LastEditTime: 2021-05-10 15:16:31
 * @Description: 商品参数
 * @LastEditors: Mr.wang
-->
<template>
  <el-card shadow="never" class="custom-crad-container">
    <div class="header">
      <div class="header-left">
        <el-button type="primary" class="add-goods" size="small" @click="jumpAddParame()">
          <div class="add-button-box">
            <i class="ad-shapePlus"></i>
            <span class="text">新增参数</span>
          </div>
        </el-button>
      </div>
      <div class="header-right">
        <el-input
          placeholder="请输入名称"
          size="small"
          suffix-icon="el-icon-search"
          v-model="groupingName"
        >
        </el-input>
      </div>
    </div>
    <el-table
      :border="false"
      class="goods-list"
      ref="multipleTable"
      :data="goodsList"
      tooltip-effect="dark"
      style="width: 100%"
      @select-all="handlSelectAll"
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: ['num', 'createtime'], order: 'descending' }"
    >
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无商品参数" />
      </template>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="参数名称" prop="name"> </el-table-column>
      <!-- <el-table-column label="描述" prop="summarize"> </el-table-column> -->
      <el-table-column label="商品数" prop="num" sortable> </el-table-column>
      <el-table-column label="新增时间" prop="createtime" sortable>
        <template #default="scope">
          <span>{{ formatUnix(scope.row.createtime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <div class="edit oe-flex">
            <el-button
              class="oe-m-l-0"
              type="primary"
              @click="jumpAddParame(scope.row.id)"
              size="mini"
              icon="ad-edit"
              >编辑</el-button
            >
            <custom-button
              @click="delParameter(scope.row.id)"
              icon="ad-delete"
              color="#FF0000"
              class="public-move-left"
              >删除</custom-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="goods-list-footer">
      <div class="select-all">
        <el-checkbox class="oe-m-r-14" v-model="selectAll" @change="handleCheckAllDatChange">
          全选当前页
        </el-checkbox>
        <el-button
          :disabled="selectList.length ? false : true"
          type="text"
          @click="selectAllChange"
          class="delete-button"
        >
          删除
        </el-button>
      </div>
      <div class="completePager">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { usePagination } from '@/hooks/use-pagination'
  import { reqGoodsParamList, reqGoodsParamDel } from '@/api/commodity'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { formatUnix } from '@/utils'

  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  // 跳转添加参数页面
  const router = useRouter()
  const jumpAddParame = (id?: number) => {
    router.push({ path: '/commodity/addParame', query: { id } })
  }
  // table数据
  const goodsList = ref<any[]>([])
  // 搜索变量
  const groupingName = ref('')
  // 当前容器元素
  const multipleTable = ref<any>()
  // 当前选中的数据
  const selectList = ref<any[]>([])
  // 是否全选按钮的切换
  const handlSelectAll = () => {
    if (selectList.value.length) {
      selectAll.value = true
      return
    }
    selectAll.value = false
  }
  // 判断是否全选当前页
  const selectAll = ref(false)
  // 触发底部的全选按钮
  const handleCheckAllDatChange = (state: any) => {
    if (!state || !selectList.value) {
      //点击全选后数据所有选择的数据存到这个数组里边
      multipleTable.value?.clearSelection() //调用这个方法
    } else if (state == true) {
      multipleTable.value?.toggleAllSelection()
    }
  }
  // table选中事件
  const handleSelectionChange = (val: any[]) => {
    selectList.value = val
  }
  // 监听全选反选
  watch(selectList, () => {
    if (selectList.value.length == goodsList.value.length) {
      selectAll.value = true
    } else {
      selectAll.value = false
    }
  })
  // 请求参数列表接口
  const resetGoodsServiceList = async () => {
    const { data } = await reqGoodsParamList({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      name: groupingName.value
    })
    pagination.total = data.data.total
    goodsList.value = data.data.data
  }
  const watchList = [() => pagination.currentPage, () => pagination.pageSize, groupingName]
  watch(watchList, resetGoodsServiceList, { immediate: true })
  // 删除全部选中
  const selectAllChange = () => {
    const arr: any = []
    selectList.value.forEach((item) => {
      arr.push(item.id)
    })
    ElMessageBox.confirm('此操作将永久删除该参数, 是否继续?', '删除参数', {
      closeOnHashChange: false,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await reqGoodsParamDel({ id: arr.join() })
      ElMessage({
        type: 'success',
        message: '删除成功!'
      })
      resetGoodsServiceList()
    })
  }
  // 删除参数接口
  const delParameter = async (id: string) => {
    ElMessageBox.confirm('此操作将永久删除该参数, 是否继续?', '删除参数', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      // beforeClose: () => {
      //   console.log('执行了')
      // }
    }).then(async () => {
      await reqGoodsParamDel({ id })
      ElMessage({
        type: 'success',
        message: '删除成功!'
      })
      resetGoodsServiceList()
    })
  }
</script>

<style lang="scss" scoped>
  // .table-list-sort {
  //   &.icon {
  //     margin-right: -4px;
  //   }
  // }
  // 新增按钮
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
  .el-table--fit {
    margin-bottom: 100px;
  }
  // 分页器
  .goods-list-footer {
    position: absolute;
    bottom: 30px;
    left: 30px;
    width: 95%;
    display: flex;
    justify-content: space-between;
  }
  // 头部
  .header {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 4px 14px 16px;
    .header-left {
      :deep(.el-button i) {
        font-size: 14px;
      }
      .el-button {
        font-size: 14px;
        width: 124px;
        .text {
          margin-left: 6px;
        }
      }
    }
    .header-right {
      width: 200px;
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
