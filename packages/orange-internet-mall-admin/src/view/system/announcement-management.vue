<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 16:28:00
 * @LastEditTime: 2021-05-13 10:43:17
 * @Description: 公告管理
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="notice-manage">
    <el-card shadow="never" class="custom-crad-container custom-card-page">
      <div class="card-header">
        <el-button type="primary" icon="el-icon-plus" @click="jumpNewly">新增公告</el-button>
        <div class="header-right">
          <el-input @keyup.enter="getSearch" placeholder="请输入公告标题" v-model="inputText">
            <template #suffix>
              <i class="el-icon-search el-input__icon" style="cursor: pointer" @click="getSearch">
              </i>
            </template>
          </el-input>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        class="custom-crad-container custom-card-page"
        :data="tableList"
        style="width: 100%"
        @sort-change="changeSort"
        @select-all="handlSelectAll"
        @selection-change="handleSelectionChange"
      >
        <template v-slot:empty>
          <el-empty class="oe-m-t-30" description="暂无公告" />
        </template>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" prop="id" width="90px" sortable="custom"> </el-table-column>
        <el-table-column prop="title" label="公告标题"> </el-table-column>
        <el-table-column prop="address" label="公告链接">
          <div>https://www.baidu.com</div>
        </el-table-column>
        <el-table-column prop="address" label="公告状态">
          <template #default="scope">
            <div v-if="scope.row.status == 1" class="start-up">启动</div>
            <div v-else>禁用</div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template #default="scope">
            <div class="oe-flex">
              <custom-button icon="ad-see" color="#FE6712" @click="viewTable(scope.row.id)"
                >查看
              </custom-button>
              <custom-button
                class="public-move-left"
                icon="el-icon-edit-outline"
                color="#FF9D28"
                @click="editNotice(scope.row.id)"
                >编辑</custom-button
              >
              <custom-button
                icon="el-icon-delete"
                color="#FF0000"
                class="public-move-left"
                @click="deleteBtn(0, scope.row)"
                >删除</custom-button
              >
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
  </div>
  <div class="delete-box">
    <el-dialog v-model="show" width="550px">
      <template #title>
        <div class="oe-flex">
          <i class="el-icon-warning"></i>
          <div class="card-header">
            <div class="card-header-title">提示</div
            ><div v-if="isBatch == 0" class="card-header-text">您确定删除该公告么？</div>
            <div v-else class="card-header-text">您确定删除选中的公告么？</div>
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
  <div class="announcement-box">
    <el-dialog v-model="announcementShow" width="725px" title="查看公告">
      <el-form label-width="80px">
        <el-form-item label="公告排序">{{ currentItem.id }}</el-form-item>
        <el-form-item label="公告标题">{{ currentItem.title }} </el-form-item>
        <el-form-item label="展示方式">{{
          currentItem.type == '1' ? '显示内容' : '链接跳转'
        }}</el-form-item>
        <el-form-item label="公告状态"
          >{{ currentItem.status == '0' ? '禁用' : '开启' }}
        </el-form-item>
        <template v-if="currentItem.type == '1'">
          <el-form-item label="公告图片">
            <el-image v-if="currentItem.image" :src="currentItem.image" fit="cover"></el-image>
            <div v-else>无</div>
          </el-form-item>
          <el-form-item label="公告内容">
            <div v-if="currentItem.content.statusContent">{{
              currentItem.content.statusContent
            }}</div>
            <div v-else>无</div>
          </el-form-item>
        </template>
        <el-form-item label="公告链接" v-if="currentItem.type == '2'">{{
          currentItem.content.shareLinks
        }}</el-form-item>
      </el-form>
      <template #footer>
        <div class="footer-right">
          <el-button size="mini" @click="announcementShow = false">取消</el-button>
          <el-button size="mini" type="primary" @click="announcementShow = true">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted, watch } from 'vue'
  import { ElMessage } from 'element-plus'
  import { usePagination } from '@/hooks/use-pagination'
  import {
    reqAnnouncementList,
    reqAnnouncementDeletion,
    reqAnnouncementDetails
  } from '@/api/system'
  import { useRouter } from 'vue-router'
  // 当前容器元素
  const multipleTable = ref<any>()
  const router = useRouter()
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  // 内容数据
  const tableList = ref([])
  // 输入框
  const inputText = ref('')
  // 排序
  const sort = ref('')
  // 模态框
  const show = ref(false)
  // 是否批量删除 0单个 1批量
  const isBatch = ref(0)
  // 当前选中的数据
  const selectList = ref<any[]>([])
  // 判断是否全选当前页
  const selectAll = ref(false)
  // 当前删除的id
  const currentId = ref('')
  const currentItem = ref<any>({})
  // 查看公告
  const announcementShow = ref(false)
  // 是否全选按钮的切换
  const handlSelectAll = () => {
    if (selectList.value.length) {
      selectAll.value = true
      return
    }
    selectAll.value = false
  }

  // 查看按钮
  const viewTable = async (id: any) => {
    const { data } = await reqAnnouncementDetails({ id })
    currentItem.value = data.data
    announcementShow.value = true
  }
  // table选中事件
  const handleSelectionChange = (val: any) => {
    selectList.value = val
  }
  // 搜索按钮
  const getSearch = () => {
    pagination.currentPage = 1
    restAnnouncementList()
  }
  // 新增公告
  const jumpNewly = () => {
    router.push({
      path: '/system/shopSet/newAnnouncement'
    })
  }
  // 编辑公告
  const editNotice = (id: string) => {
    router.push({
      path: '/system/shopSet/newAnnouncement',
      query: {
        id
      }
    })
  }
  // 删除按钮
  const deleteBtn = (num: number, currentItem?: any) => {
    if (currentItem) {
      currentId.value = currentItem.id
    }
    show.value = true
    isBatch.value = num
  }
  // 排序
  const changeSort = (val: any) => {
    if (val.order == 'descending') {
      sort.value = 'desc'
      // 降序
      restAnnouncementList()
    } else {
      // 正序
      sort.value = 'asc'
      restAnnouncementList()
    }
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
  // 删除请求
  const determineBtn = async () => {
    if (isBatch.value == 0) {
      await reqAnnouncementDeletion({ ids: [currentId.value] })
    } else {
      const ids = [] as any[]
      selectList.value.forEach((item: any) => ids.push(item.id))
      await reqAnnouncementDeletion({ ids })
    }
    show.value = false
    ElMessage.success('操作成功!!')
    restAnnouncementList()
  }
  // 获取公告列表
  const restAnnouncementList = async () => {
    const { data } = await reqAnnouncementList({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: { title: inputText.value },
      order: 'id',
      sort: sort.value
    })
    tableList.value = data.data.data
    pagination.total = data.data.total
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    restAnnouncementList()
  })
  onMounted(() => restAnnouncementList())
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .notice-manage {
    .card-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .el-button {
        display: flex;
        align-items: center;
        min-height: 32px;
        padding: 0 14px;
      }
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
    :deep(.cell) {
      color: #000;
    }
    .start-up {
      color: #1ad370;
    }
    .delcolum {
      margin-left: 20px;
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
  }
  .announcement-box {
    .el-image {
      width: 82px;
      height: 82px;
    }
    :deep(.el-form-item) {
      margin-bottom: 15px;
    }
    :deep(.el-button) {
      padding: 0 28px;
      min-height: 32px;
    }
    :deep(.el-form-item__label) {
      color: #000;
    }
    :deep(.el-form-item__content) {
      color: #000;
    }
  }
</style>
