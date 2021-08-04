<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 16:28:00
 * @LastEditTime: 2021-05-10 17:16:23
 * @Description: 角色列表
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="store-manage">
    <el-card shadow="never" class="custom-crad-container custom-card-page">
      <template #header>
        <div class="card-header">
          <el-button
            class="button"
            type="primary"
            icon="el-icon-plus"
            @click="router.push({ path: 'role-details' })"
          >
            添加角色
          </el-button>
          <div class="header-right">
            <el-input placeholder="请输入内容" v-model="searchText" suffix-icon="el-icon-search">
            </el-input>
          </div>
        </div>
      </template>
      <el-table
        class="table-box"
        :cell-style="{ background: '#fff' }"
        :data="tableList"
        style="width: 100%"
      >
        <template v-slot:empty>
          <el-empty class="oe-m-t-30" description="暂无角色" />
        </template>
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="explain" label="描述" min-width="400" />
        <el-table-column prop="access_count" label="员工数量" />
        <el-table-column label="状态">
          <template #default="{ row }">
            <div v-if="row.status == 1" class="start-up">启用</div>
            <div v-if="row.status == 0">禁用</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="400">
          <template #default="{ row, $index }">
            <div class="oe-flex">
              <custom-button
                class="oe-m-r-8"
                icon="el-icon-edit-outline"
                color="#FF9D28"
                @click="router.push({ path: 'role-details', query: { id: row.id } })"
              >
                编辑
              </custom-button>
              <custom-button
                class="oe-m-r-8"
                icon="ad-blacklist"
                color="#FF0000"
                v-if="row.status == 1"
                @click="setRoleItemStatus(row, row.id, 0)"
              >
                禁用
              </custom-button>
              <custom-button
                class="oe-m-r-8"
                icon="ad-grade"
                color="#2DB6F5"
                v-else
                @click="setRoleItemStatus(row, row.id, 1)"
              >
                启用
              </custom-button>
              <custom-button
                class="oe-m-r-8"
                icon="el-icon-delete"
                color="#FF0000"
                @click="delRoleItem($index, row.id)"
              >
                删除
              </custom-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="right-buttom-pagination"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        background
        :current-page="pagination.currentPage"
        layout="total, prev, pager, next,sizes, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import { reqDeleteRoleItem, reqEditRoleStatus, reqRoleList } from '@/api/system'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()

  // 内容数据
  const tableList = ref<any[]>([])
  // 输入框搜索字段
  const searchText = ref('')

  // 重置角色列表
  const resetRoleList = async () => {
    const { data } = await reqRoleList({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: { name: searchText.value }
    })
    pagination.total = data.data.total
    tableList.value = data.data.data
  }
  // 更改当前项禁用/启用
  const setRoleItemStatus = async (row: any, id: Key, status: Key) => {
    await reqEditRoleStatus([id], { status })
    row.status = status
    ElMessage.success(status == 1 ? '启用成功!' : '禁用成功!')
  }
  // 删除当前角色项
  const delRoleItem = async (index: number, id: Key) => {
    await ElMessageBox.confirm('此操作将永久删除该角色, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await reqDeleteRoleItem([id])
    tableList.value.splice(index, 1)
    pagination.total -= 1
  }
  // 监视分页以及搜索字符串, 重置数组
  const watchList = [() => pagination.currentPage, () => pagination.pageSize, searchText]
  watch(watchList, resetRoleList, { immediate: true })
</script>
<style lang="scss" scoped>
  .store-manage {
    .Member-name {
      .el-image {
        width: 30px;
      }
    }
    .Member-name-text {
      margin-left: 10px;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
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
    .pagination-right {
      float: right;
      margin-top: 120px;
    }
  }
</style>
