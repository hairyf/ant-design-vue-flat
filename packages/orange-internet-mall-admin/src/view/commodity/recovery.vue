<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-19 14:46:13
 * @LastEditTime: 2021-05-13 09:57:02
 * @Description: 商品管理
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <el-card shadow="never" class="oe-m-b-15">
    <el-row :gutter="60">
      <el-col class="form-item" :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
        <span class="tips">商品名称</span>
        <el-input @keyup.enter="searchData" v-model="formInfo.title" placeholder="请输入内容" />
      </el-col>
      <el-col class="form-item" :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
        <span class="tips">商品ID</span>
        <el-input @keyup.enter="searchData" v-model="formInfo.id" placeholder="请输入内容" />
      </el-col>
      <el-col class="form-item" :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
        <span class="tips">商品状态</span>
        <el-select clearable v-model="formInfo.goods_state" placeholder="全部">
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
        <sectionInput
          @keyup.enter="searchData"
          v-model="formInfo.price"
          :titleTetx="'商品价格'"
        ></sectionInput>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
        <sectionInput
          @keyup.enter="searchData"
          v-model="formInfo.sales"
          :titleTetx="'实际销量'"
        ></sectionInput>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8" :xl="{ span: '4_8' }">
        <el-button @click="searchData" class="search-button" type="primary" size="small"
          >搜索</el-button
        >
        <el-button @click="recharge" class="search-button" type="text" size="small"
          >重置条件</el-button
        >
      </el-col>
    </el-row>
  </el-card>
  <el-card shadow="never" class="custom-crad-container">
    <el-button @click="recoveryAll" type="primary" class="add-goods" size="small">
      全部恢复
    </el-button>
    <el-table
      :border="false"
      class="goods-list"
      ref="multipleTable"
      :data="goodsList"
      tooltip-effect="dark"
      style="width: 100%"
      @select-all="handlSelectAll"
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'id', order: 'descending' }"
    >
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无回收站商品" />
      </template>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="商品ID" width="120" prop="id" sortable></el-table-column>
      <el-table-column label="商品" width="220">
        <template #default="scope">
          <div class="goods">
            <div class="picture oe-m-r-10">
              <el-image fit="cover" class="image" :src="scope.row.main_picture" />
            </div>
            <div class="classification">
              <div class="navigation">
                <div class="name">{{ scope.row.title }}</div>
                <el-tag v-if="scope.row.norms_type == 1">多规格</el-tag>
              </div>
              <el-tag
                v-if="(scope.row.goods_type = 1)"
                size="mini"
                class="label-type"
                type="success"
                >实体</el-tag
              >
              <el-tag v-else size="mini" class="label-type">虚拟</el-tag>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column label="库存" prop="stock" sortable></el-table-column>
      <el-table-column prop="sales" label="销量" sortable></el-table-column>
      <el-table-column label="商品状态" width="160">
        <template #default="scope">
          <span v-show="scope.row.goods_state == 1">待出售</span>
          <span v-show="scope.row.goods_state == 2">出售中</span>
          <span v-show="scope.row.goods_state == 3">已售罄</span>
          <span v-show="scope.row.goods_state == 5">已下架</span>
        </template>
      </el-table-column>
      <el-table-column label="新增时间" width="200" prop="createtime" sortable>
        <template #default="scope">
          <span v-if="scope.row.createtime != 0">{{ formatUnix(scope.row.createtime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="260">
        <template #default="scope">
          <div class="edit oe-flex">
            <custom-button
              @click="seeDetails(scope.row.id)"
              icon="ad-see"
              color="#FE6712"
              class="public-move-left oe-m-l-0"
              >查看</custom-button
            >
            <custom-button
              @click="recoveryProduct(scope.row.id)"
              icon="ad-recovery1"
              color="#2DB6F5"
              class="public-move-left"
              >恢复</custom-button
            >
            <custom-button
              @click="deleteProduct(scope.row.id)"
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
          @click="deleteProductAll"
          type="text"
        >
          删除
        </el-button>
        <el-button
          :disabled="selectList.length ? false : true"
          @click="recoveryProductAll"
          type="text"
        >
          恢复
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
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </div>
  </el-card>
  <!-- 查看弹框 -->
  <ProductDialog :productDetail="productDetail" v-model="dialogVisible" />
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import {
    reqGoodsRecycleBin,
    reqGoodsRecycleBinMildDel,
    reqGoodsRecoverDel,
    reqGoodsParamList
  } from '@/api/commodity'
  import { usePagination } from '@/hooks/use-pagination'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { formatUnix } from '@/utils'
  import ProductDialog from './addGoods/components/seePopup.vue'
  import sectionInput from './recycle/section-input.vue'
  // 搜索对象
  const formInfo = ref<any>({
    title: '',
    id: '',
    goods_state: '',
    sales: ['', ''],
    price: ['', '']
  })
  // 查看弹框是否弹出变量
  const dialogVisible = ref(false)
  const productDetail = ref<any>({})
  // 查看
  const seeDetails = (id: Key) => {
    reqGoodsRecycleBin({ id, del: 1 }).then((res) => {
      productDetail.value = res.data.data.data[0]
      if (productDetail.value.goods_param_type == 4 && productDetail.value.goods_param != '') {
        productDetail.value.goods_param = JSON.parse(productDetail.value.goods_param)
      }
      if (productDetail.value.goods_param_type == 2 && productDetail.value.goods_param != '') {
        reqGoodsParamList({ page: 1, limit: 1000 }).then((res) => {
          res.data.data.data.forEach((item: any) => {
            if (item.id == productDetail.value.goods_param) {
              productDetail.value.goods_param = []
              productDetail.value.goods_param.push(item)
            }
          })
        })
      }
    })
    dialogVisible.value = true
  }
  // 重置按钮
  const recharge = () => {
    formInfo.value = {
      title: '',
      id: '',
      goods_state: '',
      sales: ['', ''],
      price: ['', '']
    }
  }
  // 恢复单个商品
  const recoveryProduct = async (id: Key) => {
    ElMessageBox.confirm('您确定恢复该商品么？确定后该商品将会放到商品管理列表', '恢复商品', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await reqGoodsRecoverDel({ id })
      ElMessage({
        type: 'success',
        message: '恢复成功!'
      })
      resetGoodsList()
    })
  }

  // 恢复选中商品
  const recoveryProductAll = async () => {
    const arr: any = []
    selectList.value.forEach((item: any) => {
      arr.push(item.id)
    })
    ElMessageBox.confirm(
      '您确定恢复选中的商品么？确定后选中的商品将会放到商品管理列表',
      '恢复商品',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(async () => {
      await reqGoodsRecoverDel({ id: arr })
      ElMessage({
        type: 'success',
        message: '恢复成功!'
      })
      resetGoodsList()
    })
  }

  // 恢复全部商品
  const recoveryAll = async () => {
    const arr: any = []
    goodsList.value.forEach((item: any) => {
      arr.push(item.id)
    })
    ElMessageBox.confirm(
      '您确定恢复全部的商品么？确定后所有的商品将会放到商品管理列表',
      '恢复商品',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(async () => {
      await reqGoodsRecoverDel({ id: arr })
      ElMessage({
        type: 'success',
        message: '恢复成功!'
      })
      resetGoodsList()
    })
  }

  // 删除单个商品
  const deleteProduct = (id: Key) => {
    ElMessageBox.confirm('您确定删除该商品么？确定后将会永久删除该商品', '删除商品', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await reqGoodsRecycleBinMildDel({ id })
      ElMessage({
        type: 'success',
        message: '删除成功!'
      })
      resetGoodsList()
    })
  }

  // 删除选中商品
  const deleteProductAll = async () => {
    const arr: any = []
    selectList.value.forEach((item: any) => {
      arr.push(item.id)
    })
    ElMessageBox.confirm('您确定删除选中的商品么？确定后将会永久删除选中的商品', '删除商品', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await reqGoodsRecycleBinMildDel({ id: arr })
      ElMessage({
        type: 'success',
        message: '删除成功!'
      })
      resetGoodsList()
    })
  }
  // 商品类型 start
  const stateOptions = ref([
    {
      value: ' ',
      label: '全部'
    },
    {
      value: '1',
      label: '待出售'
    },
    {
      value: '2',
      label: '出售中'
    },
    {
      value: '3',
      label: '已售罄'
    },
    {
      value: '5',
      label: '仓库中'
    }
  ])
  const goodsList = ref<any[]>([
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      isShow: true
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄',
      isShow: true
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄',
      isShow: true
    },
    {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄',
      isShow: true
    }
  ])

  // 分页器
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
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
  watch(selectList, () => {
    if (selectList.value.length == goodsList.value.length) {
      selectAll.value = true
    } else {
      selectAll.value = false
    }
  })
  // table选中事件
  const handleSelectionChange = (val: any) => {
    selectList.value = val
  }
  // 搜索
  const searchData = () => {
    resetGoodsList()
  }
  // 请求接口数据 start
  // // 商品列表
  const resetGoodsList = async () => {
    const subInfo: any = {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      del: 1,
      ...formInfo.value
    }
    const { data } = await reqGoodsRecycleBin(subInfo)

    pagination.total = data.data.total
    goodsList.value = data.data.data
  }
  watch(
    [() => pagination.currentPage, () => pagination.pageSize, () => formInfo.value.goods_state],
    () => resetGoodsList(),
    {
      immediate: true
    }
  )
  // 请求接口数据 end
</script>

<style lang="scss" scoped>
  .el-table--fit {
    margin-bottom: 100px;
  }
  .table-box {
    min-height: 900px;
  }
  .el-table td,
  .el-table th.is-leaf {
    border: none;
  }
  .form-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    :deep(.el-cascader) {
      width: 100%;
    }
    :deep(.el-select) {
      width: 100%;
    }
    .tips {
      margin-right: 10px;
      font-size: 14px;
      color: #000000;
    }
    .line {
      width: 10px;
      height: 1px;
      margin: 0 10px;
      background-color: #c4c4c4;
    }
    .el-input,
    .el-select {
      flex: 1;
    }
  }
  // 商品列表
  .add-goods {
    width: 120px;
    &.el-button {
      margin: 0;
      padding-top: 8px;
      padding-bottom: 9px;
    }
  }
  // table列表
  .goods-list {
    :deep(.el-button) {
      padding: 4px 8px 6px;
      border-radius: 2px;
      font-size: 12px;
      min-height: 0;
      margin-left: 14px;
    }
    .goods {
      display: flex;
      .picture {
        width: 50px;
        height: 50px;
        .el-image {
          width: 50px;
          height: 50px;
        }
      }
      .classification {
        .navigation {
          display: flex;
          align-items: center;
          color: #000000;
          .name {
            width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .label-type {
          font-size: 8px;
        }
        .el-tag {
          height: 15px;
          line-height: 13px;
          padding: 0 3px;
          font-size: 10px;
        }
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
        border-radius: 2px;
        margin-left: 14px;
        i {
          padding-right: 3px;
        }
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
  .search-button {
    width: 120px;
    font-size: 14px;
    &.el-button {
      margin-left: 0;
    }
  }
</style>
