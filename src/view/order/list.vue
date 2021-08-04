<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-13 10:14:46
 * @Description: 评价列表
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <!-- 筛选 -->
  <el-card shadow="never" class="online-box">
    <el-row :gutter="40">
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12">
        <div class="oe-flex e-grid">
          <div class="public-text">关键信息</div>
          <el-input
            class="oe-flex-1"
            v-model="form.cruxContent"
            placeholder="昵称/姓名/手机号/订单号"
          ></el-input>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12">
        <div class="oe-flex e-grid">
          <div class="public-text">回复状态</div>
          <el-select class="oe-flex-1" v-model="form.replyStatus" placeholder="全部" clearable>
            <el-option
              v-for="item in replyStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12">
        <div class="oe-flex e-grid">
          <div class="public-text">精选状态</div>
          <el-select class="oe-flex-1" v-model="form.staticState" placeholder="全部" clearable>
            <el-option
              v-for="item in selectionStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12">
        <div class="oe-flex e-grid">
          <div class="public-text">评价时间</div>
          <el-date-picker
            class="oe-flex-1"
            v-model="form.commentTime"
            value-format="timestamp"
            type="date"
            placeholder="选择评价时间"
          >
          </el-date-picker>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12">
        <div class="oe-flex e-grid">
          <el-button type="primary" @click="getSearch">搜索</el-button>
          <div class="reset-text" @click="getReset">重置条件</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <!-- 内容 -->
  <el-card shadow="never" class="list-box custom-crad-container custom-card-page">
    <el-table
      ref="multipleTable"
      class="table-box"
      :data="tableList"
      style="width: 100%"
      @sort-change="changeSort"
    >
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无评价" />
      </template>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="商品" prop="date" min-width="140px">
        <template #default="scope">
          <div class="oe-flex">
            <el-image class="evaluate-img" :src="scope.row.goods_image" fit="cover" alt="" />
            <div class="commodity-text">{{ scope.row.goods_name }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="评价" min-width="120px">
        <template #default="scope">
          <el-rate v-model="scope.row.score" disabled disabled-void-color="#c4c4c4"></el-rate>
          <div class="comment-box oe-flex">
            <el-tag type="warning" v-if="scope.row.is_select == 1">精</el-tag>
            <div class="comment-text">{{ scope.row.content }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="订单编号" min-width="120px">
        <template #default="scope">
          <div class="theme-text">{{ scope.row.order_sn }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员昵称" min-width="70px">
        <template #default="scope">
          <div class="theme-text" v-if="scope.row.user">{{ scope.row.user.nickname }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="评价时间" min-width="90px">
        <template #default="scope">
          <div>{{ scope.row.createtime }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="状态" min-width="70px">
        <template #default="scope">
          <div class="examine-text" v-if="scope.row.status == 2">审核通过</div>
          <div v-if="scope.row.status == 1">待审核</div>
          <div class="examine-red" v-if="scope.row.status == 0">审核不通过</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="是否精选" min-width="50px">
        <template #default="scope">
          <div v-if="scope.row.is_select == 1">是</div>
          <div v-if="scope.row.is_select == 0">否</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" min-width="150px">
        <template #default="scope">
          <div class="oe-flex operation" v-if="scope.row.is_select == 0 && scope.row.status == 2">
            <custom-button icon="ad-selected" color="#2db6f5" @click="getExportOrder(scope.row, 1)"
              >精选
            </custom-button>
            <custom-button
              icon="ad-see"
              color="#FE6712"
              class="public-move-left"
              @click="getEvaluationDetails(scope.row)"
              >查看</custom-button
            >
            <custom-button
              icon="ad-delete"
              color="#ff0000"
              class="public-move-left"
              @click="deleteBtn(scope.row)"
              >删除</custom-button
            >
          </div>
          <div class="oe-flex operation" v-if="scope.row.is_select == 1 && scope.row.status == 2">
            <custom-button icon="ad-close" color="#2db6f5" @click="getExportOrder(scope.row, 0)"
              >取消精选
            </custom-button>
            <custom-button
              icon="ad-see"
              color="#FE6712"
              class="public-move-left"
              @click="getEvaluationDetails(scope.row)"
              >查看</custom-button
            >
            <custom-button
              icon="ad-delete"
              color="#ff0000"
              class="public-move-left"
              @click="deleteBtn(scope.row)"
              >删除</custom-button
            >
          </div>
          <div class="operation" v-if="scope.row.status == 1">
            <div class="oe-flex">
              <custom-button icon="ad-determine" color="#2db6f5" @click="examineBtn(scope.row, 2)"
                >审核通过
              </custom-button>
              <custom-button
                icon="ad-see"
                color="#FE6712"
                class="public-move-left"
                @click="getEvaluationDetails(scope.row)"
                >查看</custom-button
              >
            </div>
            <div class="oe-flex" style="margin-top: 15px">
              <custom-button icon="ad-close" color="#FE6712" @click="examineBtn(scope.row, 0)"
                >审核拒绝
              </custom-button>
              <custom-button
                icon="ad-delete"
                color="#ff0000"
                class="public-move-left"
                @click="deleteBtn(scope.row)"
                >删除
              </custom-button>
            </div>
          </div>
          <div class="oe-flex operation" v-if="scope.row.status == 0">
            <custom-button
              icon="ad-see"
              color="#FE6712"
              class="public-move-left"
              @click="getEvaluationDetails(scope.row)"
              >查看</custom-button
            >
            <custom-button
              icon="ad-delete"
              color="#ff0000"
              class="public-move-left"
              @click="deleteBtn(scope.row)"
              >删除</custom-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-col :lg="24" class="paging-box">
      <el-pagination
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="pagination.currentPage"
        layout="total, prev, pager, next,sizes, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </el-col>
  </el-card>
</template>

<script lang="ts" setup>
  import { reactive, watch, ref, onMounted } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { useRouter } from 'vue-router'
  import dayjs from 'dayjs'
  import { usePagination } from '@/hooks/use-pagination'
  import { reqEvaluationDeletion, reqEvaluationList, reqModifyState } from '@/api/order'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const multipleTable = ref()
  const router = useRouter()
  const selectionStatus = reactive([
    {
      value: '',
      label: '全部'
    },
    {
      value: '1',
      label: '精选'
    },
    {
      value: '0',
      label: '非精选'
    }
  ])
  const replyStatus = reactive([
    {
      value: '',
      label: '全部'
    },
    {
      value: '1',
      label: '已回复'
    },
    {
      value: '0',
      label: '未回复'
    }
  ])
  const form = ref({
    // 关键信息
    cruxContent: '',
    // 回复状态
    replyStatus: '',
    // 静态状态
    staticState: '',
    // 评价时间
    commentTime: ''
  })
  // 排序
  const sort = ref('')
  // 当前排序
  const order = ref('')
  // 内容数据
  const tableList = ref<any[]>([])
  // 搜索按钮
  const getSearch = () => {
    pagination.currentPage = 1
    restEvaluationList()
  }
  // 重置按钮
  const getReset = () => {
    form.value.cruxContent = ''
    form.value.replyStatus = ''
    form.value.staticState = ''
    form.value.commentTime = ''
    pagination.currentPage = 1
    restEvaluationList()
  }
  // 排序
  const changeSort = (val: any) => {
    order.value = val.prop
    if (val.order == 'descending') {
      sort.value = 'desc'
      // 降序
      restEvaluationList()
    } else {
      // 正序
      sort.value = 'asc'
      restEvaluationList()
    }
  }
  // 删除评价
  const deleteBtn = async (row: any) => {
    await ElMessageBox.confirm('确认删除该评价么？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await reqEvaluationDeletion({
      ids: [row.id]
    })
    ElMessage.success('删除成功')
    restEvaluationList()
  }
  // 精选按钮
  const getExportOrder = async (row: any, num: number) => {
    if (num == 1) {
      await ElMessageBox.confirm('是否精选评价？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    } else {
      await ElMessageBox.confirm('是否精选评价？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    }
    await reqModifyState({
      ids: [row.id],
      params: {
        is_select: num
      }
    })
    ElMessage.success('操作成功')
    restEvaluationList()
  }
  // 审核按钮
  const examineBtn = async (row: any, num: number) => {
    if (num == 2) {
      await ElMessageBox.confirm('是否审核通过评价？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    } else {
      await ElMessageBox.confirm('是否审核不通过评价？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    }
    await reqModifyState({
      ids: [row.id],
      params: {
        status: num
      }
    })
    ElMessage.success('操作成功')
    restEvaluationList()
  }
  // 跳转
  const getEvaluationDetails = (row: any) => {
    router.push({ path: '/order/evaluation/evaluation-details', query: { id: row.id } })
  }
  // 获取评价列表
  const restEvaluationList = async () => {
    let createtime = ''
    if (form.value.commentTime) {
      createtime = dayjs(form.value.commentTime).unix().toString()
    }
    const { data } = await reqEvaluationList({
      search: {
        search: form.value.cruxContent,
        is_reply: form.value.replyStatus,
        is_select: form.value.staticState,
        createtime
      },
      page: pagination.currentPage,
      limit: pagination.pageSize,
      order: order.value,
      sort: sort.value
    })
    tableList.value = data.data.data
    pagination.total = data.data.total
  }
  watch(
    [() => pagination.currentPage, () => pagination.pageSize, () => form.value.cruxContent],
    () => {
      restEvaluationList()
    }
  )
  onMounted(() => restEvaluationList())
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .e-grid {
    margin-bottom: 20px;
  }
  .online-box {
    :deep(.el-card__body) {
      padding-bottom: 0;
    }

    .public-text {
      font-size: 14px;
      color: #000000;
      margin-right: 12px;
    }

    :deep(.el-button) {
      min-height: 32px;
      padding: 3px 45px;
    }
    .reset-text {
      cursor: pointer;
      margin-left: 28px;
      font-size: 14px;
      color: var(--color-primary);
    }
  }
  .list-box {
    margin-top: 24px;
    .commodity-text {
      margin-left: 14px;
    }
    :deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
      background-color: var(--color-primary-light-opacity-9) !important;
    }
    .comment-box {
      .comment-text {
        font-size: 12px;
      }
      :deep(.el-tag) {
        height: 16px;
        border-radius: 0;
        margin-right: 8px;
        line-height: 14px;
        padding: 0 6px;
      }
    }
    .evaluate-img {
      width: 50px !important;
      height: 50px;
    }
    .commodity-text {
      flex: 1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .examine-text {
      color: #36dc47;
    }
    .examine-red {
      color: #ff0000;
    }
    :deep(.cell) {
      color: #000;
    }
    .theme-text {
      color: var(--color-primary);
    }
    .bootom-operation {
      margin-left: 14px;
    }
    :deep(.el-checkbox__inner) {
      width: 16px;
      height: 16px;
    }
    :deep(.el-button) {
      padding: 0px 6px;
      min-height: 24px;
    }
  }

  .list-bottom {
    position: absolute;
    bottom: 20px;
    left: 20px;
    margin: 0 auto;
    right: 20px;
    .public-red {
      color: var(--color-primary);
    }
  }
  .paging-box {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  :deep(.el-card.is-always-shadow) {
    border-radius: 10px;
  }
</style>
