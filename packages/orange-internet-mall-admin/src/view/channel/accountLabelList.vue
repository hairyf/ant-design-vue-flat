<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-19 14:46:13
 * @LastEditTime: 2021-05-06 10:41:46
 * @Description: 标签列表
 * @LastEditors: Mr.Mao
-->
<template>
  <el-card shadow="never" class="screen-box">
    <el-row :gutter="24">
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">关键词</div>
          <el-input class="oe-flex-1" v-model="formInfo.name" placeholder="标签名称"></el-input>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">新增时间</div>
          <el-date-picker
            prefix-icon="el-icon-date"
            class="oe-flex-1"
            v-model="formInfo.createtime"
            type="datetime"
            placeholder="选择新增时间"
          ></el-date-picker>
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
  <el-card shadow="never" class="custom-crad-container">
    <div class="header">
      <div class="header-left">
        <el-button
          class="add-goods"
          type="primary"
          icon="ad-shapePlus"
          size="small"
          @click="jumpAddGrouping()"
        >
          <span class="text">新增粉丝标签</span>
        </el-button>
        <el-button class="add-goods oe-m-l-28" size="small" @click="jumpAddGrouping()">
          <span class="text">同步粉丝标签</span>
        </el-button>
      </div>
      <div class="header-right">
        <el-input placeholder="请输入名称" size="small" v-model="groupingName">
          <template #suffix>
            <i class="el-input__icon el-icon-search"></i>
          </template>
        </el-input>
      </div>
    </div>
    <el-table
      :border="false"
      class="goods-list"
      ref="multipleTable"
      stripe
      :data="goodsList"
      tooltip-effect="dark"
      style="width: 100%"
      @select-all="handlSelectAll"
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: ['createtime', 'num', 'type'], order: 'descending' }"
    >
      <el-table-column type="selection" min-width="55"></el-table-column>
      <el-table-column label="标签名称" min-width="200" prop="summarize"> </el-table-column>
      <el-table-column label="粉丝数" min-width="200" prop="summarize" sortable> </el-table-column>
      <el-table-column label="取关数" min-width="200" prop="summarize" sortable> </el-table-column>
      <el-table-column label="新增时间" min-width="200" prop="createtime" sortable>
        <template #default="scope">
          <span>{{ formatUnix(scope.row.createtime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template #default="scope">
          <div class="edit oe-flex">
            <custom-button
              @click="delCommodity(scope.row.id)"
              icon="ad-see"
              color="#FE6712"
              class="public-move-left oe-m-l-0"
              >查看</custom-button
            >
            <custom-button
              @click="delCommodity(scope.row.id)"
              icon="ad-label"
              color="#2DB6F5"
              class="public-move-left"
              >打标</custom-button
            >
          </div>
          <div class="edit oe-flex">
            <el-button
              type="primary"
              @click="jumpAddGrouping(scope.row.id)"
              size="mini"
              icon="ad-edit"
              >编辑</el-button
            >
            <custom-button
              @click="delCommodity(scope.row.id)"
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
        <el-button type="text" @click="selectAllChange">删除</el-button>
        <el-button type="text" @click="selectAllChange">打标 </el-button>
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
  import { ref, watch, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { reqGoodsGroupList, reqGoodsGroupDel } from '@/api/commodity'
  import { usePagination } from '@/hooks/use-pagination'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { formatUnix } from '@/utils'
  // 是否弹出添加优惠券
  // const addDialogVisible = ref(false)
  // const couponList = ref<any[]>([])
  // const addcoupon = async () => {
  //   addDialogVisible.value = true
  //   const res = await reqCouponSelect({
  //     page: 1,
  //     limit: 2000,
  //     search: { name: searchCoupon.value, status: '1', stock: '1' }
  //   })
  //   couponList.value = res.data.data.data
  //   console.log(couponList.value, '数据')
  // }
  // const determineCoupon = () => {
  //   addDialogVisible.value = false
  //   if (selectList.value.length > 0) {
  //     selectList.value.forEach((item: any) => {
  //       selectCouponList.value.push(item)
  //     })
  //   }
  //   selectList.value = []
  //   console.log(selectList.value, '选中的数据')
  // }
  // // 选中优惠券
  // const selectCouponList = ref<any[]>([])
  // // 搜索优惠券
  // const searchCoupon = ref('')

  // watch(searchCoupon, addcoupon)
  // 搜索对象
  const formInfo = ref<any>({
    name: '',
    type: '',
    status: '',
    createtime: ''
  })
  // 重置按钮
  const getEmpty = () => {
    formInfo.value.name = ''
    formInfo.value.type = ''
    formInfo.value.status = ''
    formInfo.value.createtime = ''
  }
  // 状态
  const typeOptions = ref([
    {
      value: '1',
      label: '满减券'
    },
    {
      value: '2',
      label: '折扣券'
    }
  ])
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const router = useRouter()
  // 新增分组跳转
  const jumpAddGrouping = (id?: number) => {
    router.push({ path: '/commodity/addGrouping', query: { id } })
  }
  // table数据
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
  // 请求接口数据 start
  const resetGoodsList = async () => {
    const { data } = await reqGoodsGroupList({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      name: groupingName.value
    })
    pagination.total = data.data.total
    goodsList.value = data.data.data
    // console.log(data)
    goodsList.value = data.data.data
    // if (data.data.data.length == 0) {
    //   pagination.currentPage -= 1
    // }
  }
  const watchList = [() => pagination.currentPage, () => pagination.pageSize, groupingName]
  watch(watchList, resetGoodsList, { immediate: true })
  // 删除全部选中
  const selectAllChange = () => {
    ElMessageBox.confirm('此操作将永久删除选中文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      const arr: any = []
      selectList.value.forEach((item) => {
        arr.push(item.id)
      })
      reqGoodsGroupDel({ id: arr.join() }).then((res) => {
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
  // 删除商品
  const delCommodity = (id: string) => {
    ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      reqGoodsGroupDel({ id }).then((res) => {
        if (res.data.code == 0) {
          ElMessage({
            type: 'success',
            message: '删除成功!'
          })
          resetGoodsList()
        } else {
          ElMessage({
            type: 'error',
            message: '删除失败,请重试'
          })
        }
      })
    })
  }
  // 请求接口数据 end

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
</script>

<style lang="scss" scoped>
  :deep(.el-table thead) {
    color: #000;
  }
  // 搜索
  .screen-box {
    margin-bottom: 26px;
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
  .el-table--fit {
    margin-bottom: 100px;
  }
  // 新增按钮
  .goods-list {
    color: #000;
    .fans-info {
      display: flex;
      align-items: center;
      .el-image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
      }
      .name {
        margin: 0 9px 0 12px;
      }
      .blacklist {
        color: var(--color-primary);
        border: 1px solid var(--color-primary);
        border-radius: 2px;
        font-size: 10px;
        line-height: 1;
        padding: 3px;
      }
    }
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
        font-size: 12px;
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
  .start-up {
    color: #36dc47;
  }
  .disable-text {
    color: #ff0000;
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
      // margin-left: 14px;
      i {
        padding-right: 3px;
      }
    }
  }
</style>
