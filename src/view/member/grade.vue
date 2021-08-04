<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-10 17:04:26
 * @Description: 会员等级
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="grade-box custom-card-page">
    <el-button
      type="primary"
      class="newly-added"
      icon="el-icon-plus"
      @click="router.push('/member/member-create-grade')"
      >新增等级</el-button
    >
    <div class="tips-box">
      当自定义会员等级的会员数大于0时，如需删除应先将该会员等级下对应会员转移到其他会员等级下，如不转移，则自动转移到系统默认会员等级下。
    </div>
    <el-table class="grade-list" :data="gradeList" style="width: 100%" @sort-change="changeSort">
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无会员等级" />
      </template>
      <el-table-column prop="name" label="等级"></el-table-column>
      <el-table-column prop="level_name" label="名称"></el-table-column>
      <el-table-column prop="remark" label="概述">
        <template #default="scope">
          <div class="summary-text">{{ scope.row.remark }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="权益">
        <template #default="scope">
          <div v-if="scope.row.discount == 0">无</div>
          <div v-else>{{ scope.row.discount / 10 }}折</div>
        </template>
      </el-table-column>
      <el-table-column prop="shop_user_num" label="会员数" sortable> </el-table-column>
      <el-table-column prop="address" label="状态">
        <template #default="scope">
          <div style="color: #ff0000" v-if="scope.row.status == 0 && scope.row.is_default != 1">
            禁用中
          </div>
          <div style="color: #1ad370" v-if="scope.row.status == 1 && scope.row.is_default != 1">
            启用中
          </div>
          <div v-if="scope.row.is_default == 1" style="color: #1ad370">启用中</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" min-width="150">
        <template #default="scope">
          <div class="oe-flex oe-flex-wrap">
            <el-button v-if="scope.row.is_default == 1" type="primary" class="public-move-right"
              >系统默认等级</el-button
            >
            <template v-if="scope.row.is_default != 1">
              <el-button
                @click="getEdit(scope.row)"
                type="primary"
                icon="ad-edit"
                class="public-move-right"
                >编辑</el-button
              >
              <custom-button
                icon="ad-close"
                color="#FE6712"
                v-if="scope.row.status == 1"
                class="public-move-right"
                @click="switchState(scope.row, 0)"
                >禁用
              </custom-button>
              <custom-button
                icon="ad-start-up"
                class="public-move-right"
                color="#2DB6F5"
                v-if="scope.row.status == 0"
                @click="switchState(scope.row, 1)"
                >启动
              </custom-button>
              <custom-button icon="ad-delete" color="#FF0000" @click="deleteBtn(scope.row)"
                >删除
              </custom-button>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-col :lg="24" class="paging-box">
      <el-pagination
        class="e-grid"
        :page-sizes="pagination.pageSizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pagination.pageSize"
        background
        :current-page="pagination.currentPage"
        layout="total, prev, pager, next,sizes, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </el-col>
  </el-card>
  <!-- 删除会员模态框 -->
  <memberDeleteGrade
    :gradeList="gradeList"
    v-model:show="state.delMemberGrade"
    @resetGradeList="resetGradeList"
    :currentItem="currentItem"
  ></memberDeleteGrade>
  <div class="delete-box">
    <el-dialog v-model="deleteShow" width="550px">
      <template #title>
        <div class="oe-flex">
          <i class="el-icon-warning"></i>
          <div class="card-header">
            <div class="card-header-title">删除会员等级</div
            ><div class="card-header-text">您确定要删除该会员等级么？</div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="footer-right">
          <el-button size="mini" @click="deleteShow = false">取消</el-button>
          <el-button size="mini" type="primary" @click="getDeleteBtn">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import memberDeleteGrade from './member-modality/member-delete-grade.vue'
  import { reqGradeList, reqRankStatus, reqMemberMobileDelete } from '@/api/member'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  //  列表数据
  const gradeList = ref<any[]>([])
  // 路由
  const router = useRouter()
  // 排序
  const sort = ref('')
  // 当前排序
  const order = ref('')
  // 显示不同模态框
  const state = ref({
    // 删除会员
    delMemberGrade: false
  })
  const deleteShow = ref(false)
  // 操作当前的会员
  const currentItem = ref<any>({})
  // 获取等级数据
  const resetGradeList = async () => {
    const { data } = await reqGradeList({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      sort: sort.value,
      order: order.value
    })
    gradeList.value = data.data.data
    pagination.total = data.data.total
  }
  // 排序
  const changeSort = (val: any) => {
    order.value = val.prop
    if (val.order == 'descending') {
      sort.value = 'desc'
      // 降序
      resetGradeList()
    } else {
      // 正序
      sort.value = 'asc'
      resetGradeList()
    }
  }
  // 没有会员数删除
  const getDeleteBtn = async () => {
    await reqMemberMobileDelete({
      old_id: currentItem.value.id,
      is_delete_old: 1
    })
    ElMessage.success('操作成功')
    deleteShow.value = false
    resetGradeList()
  }
  // 删除按钮
  const deleteBtn = (row: any) => {
    if (row.shop_user_num == 0) {
      deleteShow.value = true
    } else {
      state.value.delMemberGrade = true
    }
    currentItem.value = row
  }
  // 编辑按钮
  const getEdit = (row: any) => {
    router.push({ path: '/member/member-create-grade', query: { id: row.id } })
  }
  // 切换禁止启动状态
  const switchState = async (row: any, stateNum: number) => {
    await reqRankStatus({ ids: [row.id], params: { status: stateNum } })
    resetGradeList()
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    resetGradeList()
  })
  onMounted(() => resetGradeList())
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .grade-box {
    position: relative;
    :deep(.el-card__body) {
      @include self-lg-xl(min-height, 550px, 780px);
    }
    .grade-list {
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
      .summary-text {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
    .newly-added {
      display: flex;
      align-items: center;
      min-height: 32px;
      padding: 0px 16px;
    }
    .public-move-right {
      margin-right: 10px;
    }
    .paging-box {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
    .tips-box {
      margin: 10px 0;
      padding: 8px 14px;
      border-radius: 2px;
      font-size: 12px;
      color: #262626;
      background-color: var(--color-primary-light-opacity-8);
      border: 1px solid var(--color-primary);
    }
  }
</style>
