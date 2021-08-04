<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-13 10:38:22
 * @Description: 会员标签
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="label-box custom-card-page">
    <div class="oe-flex oe-row-between">
      <el-button
        class="oe-flex"
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="router.push('/member/create-label')"
      >
        新增标签
      </el-button>
      <el-input
        @keyup.enter="getSearch"
        class="member-serach"
        v-model="inputText"
        placeholder="请输入标签名称"
      >
        <template #suffix>
          <i class="el-icon-search el-input__icon" style="cursor: pointer" @click="getSearch"> </i>
        </template>
      </el-input>
    </div>
    <el-table
      class="label-list"
      ref="multipleTable"
      :data="labelList"
      @sort-change="changeSort"
      style="width: 100%"
      @select-all="handlSelectAll"
      @selection-change="handleSelectionChange"
    >
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无会员标签" />
      </template>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="标签名称"></el-table-column>
      <el-table-column prop="shop_user_num" label="会员数" sortable="custom"></el-table-column>
      <el-table-column prop="remark" label="标签描述"> </el-table-column>
      <!-- <el-table-column prop="address" label="状态">
        <el-switch disabled> </el-switch>
        <el-switch :value="true" disabled active-color="#1AD370"> </el-switch>
      </el-table-column> -->
      <el-table-column label="操作" min-width="100px">
        <template #default="scope">
          <div class="oe-flex">
            <el-button @click="membershipStatistics(scope.row)" type="primary" icon="ad-statistics"
              >会员统计</el-button
            >
            <el-button @click="getEdit(scope.row)" type="primary" icon="ad-edit1">编辑</el-button>
            <custom-button
              icon="ad-delete"
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
              @click="deleteBtn(1)"
              :class="{ 'public-red': selectList.length }"
              :disabled="selectList.length ? false : true"
              class="public"
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
  <memberAddTag v-model:show="show.isAddTag" :option="currentItem"></memberAddTag>
  <memberDelTag
    @resetLabelList="resetLabelList"
    v-model:show="show.isDelTag"
    :currentItem="currentItem"
    :isBatch="isBatch"
    :selectList="selectList"
  ></memberDelTag>
</template>
<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue'

  import { usePagination } from '@/hooks/use-pagination'
  import memberAddTag from './member-modality/member-add-tag.vue'
  import memberDelTag from './member-modality/member-del-tag.vue'
  import { reqLabelList } from '@/api/member'
  import { useRouter } from 'vue-router'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  // 显示标签模态框
  const show = ref({
    isAddTag: false,
    isDelTag: false
  })
  const router = useRouter()
  // 当前容器元素
  const multipleTable = ref<any>()
  // 判断是否全选当前页
  const selectAll = ref(false)
  // 单前操作的数据
  const currentItem = ref<any>()
  // 排序
  const sort = ref('')
  // 当前排序
  const order = ref('')
  //  列表数据
  const labelList = ref<any[]>([])
  // 搜索名字
  const inputText = ref()
  // 编辑按钮
  const getEdit = (row: any) => {
    router.push({ path: '/member/create-label', query: { id: row.id } })
  }
  // 0是单个删除，1是批量删除
  const isBatch = ref(0)
  // 当前选中的数据
  const selectList = ref<any[]>([])
  // 搜索按钮
  const getSearch = () => {
    pagination.currentPage = 1
    resetLabelList()
  }
  // 删除
  const deleteBtn = (num: number, row?: any) => {
    isBatch.value = num
    if (num == 0) {
      currentItem.value = row
    }
    show.value.isDelTag = true
  }
  // 是否全选按钮的切换
  const handlSelectAll = () => {
    if (selectList.value.length) {
      selectAll.value = true
      return
    }
    selectAll.value = false
  }
  //  会员统计
  const membershipStatistics = (row: any) => {
    router.push({ path: '/member/management', query: { id: row.id } })
  }
  // 触发底部的全选按钮
  const handleCheckAllDatChange = (state: any) => {
    if (!state || !selectList.value) {
      //点击全选后数据所有选择的数据存到这个数组里边
      multipleTable.value?.clearSelection() //调用这个方法
    } else if (state == true) {
      multipleTable.value?.toggleAllSelection()
    }
  }
  // 排序
  const changeSort = (val: any) => {
    order.value = val.prop
    if (val.order == 'descending') {
      sort.value = 'desc'
      // 降序
      resetLabelList()
    } else {
      // 正序
      sort.value = 'asc'
      resetLabelList()
    }
  }
  // table选中事件
  const handleSelectionChange = (val: any) => {
    selectList.value = val
  }
  watch(selectList, () => {
    if (selectList.value.length == labelList.value.length) {
      selectAll.value = true
    } else {
      selectAll.value = false
    }
  })
  // 获取标签数据
  const resetLabelList = async () => {
    const search = JSON.stringify({
      name: inputText.value
    })
    const { data } = await reqLabelList({
      search,
      page: pagination.currentPage,
      limit: pagination.pageSize,
      sort: sort.value,
      order: order.value
    })
    labelList.value = data.data.data
    pagination.total = data.data.total
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    resetLabelList()
  })
  onMounted(() => resetLabelList())
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .label-box {
    position: relative;
    :deep(.el-card__body) {
      @include self-lg-xl(min-height, 550px, 780px);
    }
    .label-list {
      margin-top: 28px;
      :deep(.cell) {
        color: #000;
      }
      :deep(.el-button) {
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 2px 8px;
        min-height: 24px;
        border-radius: 2px;
        i {
          padding-right: 3px;
        }
      }
    }
    .member-serach {
      width: 200px;
    }
    :deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
      background-color: var(--color-primary-light-opacity-9) !important;
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
</style>
