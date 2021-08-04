<!--
 * @Author: Mr.ji
 * @Date: 2021-04-06 15:53:37
 * @LastEditTime: 2021-05-10 17:25:26
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-container class="oother-setting">
    <el-row :gutter="33" style="width: 100%">
      <el-col :xl="18" :lg="18" :md="18" :xs="18" :sm="18">
        <el-card shadow="never" class="custom-crad-container custom-card-page">
          <div class="card-header">
            <el-button type="primary" icon="el-icon-plus" @click="newlyAdded">
              新增搜索热词
            </el-button>
          </div>
          <el-table :data="tableData" stripe style="width: 100%">
            <template v-slot:empty>
              <el-empty class="oe-m-t-30" description="暂无搜索热词" />
            </template>
            <el-table-column prop="name" label="搜索热词"></el-table-column>
            <el-table-column prop="name" label="是否显示">
              <template #default="scope">
                <el-switch v-model="scope.row.swicth" :disabled="true"></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="新增时间">
              <template #default="scope">
                {{ formatUnix(scope.row.createtime) }}
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <template #default="scope">
                <div class="oe-flex">
                  <custom-button
                    icon="el-icon-edit-outline"
                    color="#FF9D28"
                    @click="editBtn(scope.row)"
                    >编辑</custom-button
                  >
                  <custom-button
                    icon="el-icon-delete"
                    color="#FF0000"
                    class="public-move-left"
                    @click="deleteBtn(scope.row)"
                  >
                    删除
                  </custom-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pagination-box"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            background
            :current-page="pagination.currentPage"
            layout="total, prev, pager, next,sizes, jumper"
            :total="pagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-card>
      </el-col>
      <el-col :xl="6" :lg="6" :md="6" :xs="6" :sm="6">
        <el-card shadow="never" class="preview-box custom-crad-container">
          <div>预览</div>
          <el-image src="/custom-assets/images/common/preview.png"></el-image>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
  <el-dialog :title="id ? '编辑搜索热词' : '新增搜索热词'" v-model="show" width="554px">
    <el-form :model="form" :rules="rules" label-width="110px" ref="hotForm">
      <el-form-item label="热词名称" prop="hotName">
        <el-input
          class="sort-inp"
          v-model="form.hotName"
          placeholder="请输入热词名称"
          maxlength="10"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch v-model="form.status"> </el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="determineBtn">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <div class="delete-box">
    <el-dialog v-model="deleteShow" width="550px">
      <template #title>
        <div class="oe-flex">
          <i class="el-icon-warning"></i>
          <div class="card-header">
            <div class="card-header-title">删除按钮</div
            ><div class="card-header-text">您确定删除该热词？</div>
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
<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import {
    reqHotWordList,
    reqHotWordAddition,
    reqHotWordEditor,
    reqHotWordDeletion
  } from '@/api/system'
  import { formatUnix } from '@/utils'
  import { ElMessage } from 'element-plus'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  // 其他设置数据
  const tableData = ref<any[]>([])
  const hotForm = ref<any>('')
  const form = ref({
    // 热词名称
    hotName: '',
    status: false
  })
  // 编辑id
  const id = ref('')
  // 删除
  const deleteShow = ref(false)
  // 验证
  const rules = ref({
    hotName: [{ required: true, message: '请填写热词名称', trigger: 'blur' }]
  })
  // 弹窗
  const show = ref(false)
  // 确定添加或者编辑
  const determineBtn = () => {
    hotForm.value.validate(async (valid: boolean) => {
      if (valid) {
        if (id.value) {
          await reqHotWordEditor({
            id: id.value,
            name: form.value.hotName,
            status: form.value.status == true ? 1 : 0
          })
        } else {
          await reqHotWordAddition({
            name: form.value.hotName,
            status: form.value.status == true ? 1 : 0
          })
        }
        ElMessage.success('操作成功')
        show.value = false
        restHostList()
      }
    })
  }
  // 删除按钮
  const deleteBtn = (row: any) => {
    id.value = row.id
    deleteShow.value = true
  }
  // 编辑
  const editBtn = (row: any) => {
    id.value = row.id
    form.value.hotName = row.name
    form.value.status = row.status == 1
    show.value = true
  }
  // 删除按钮
  const getDeleteBtn = async () => {
    await reqHotWordDeletion({ ids: [id.value] })
    ElMessage.success('操作成功')
    deleteShow.value = false
    restHostList()
  }
  // 新增
  const newlyAdded = () => {
    id.value = ''
    show.value = true
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    restHostList()
  })
  // 获取热词列表
  const restHostList = async () => {
    const { data } = await reqHotWordList({
      page: pagination.currentPage,
      limit: pagination.pageSize
    })
    pagination.total = data.data.total
    tableData.value = data.data.data
    tableData.value.forEach((item: any) => {
      if (item.status == 1) {
        item.swicth = true
      } else {
        item.swicth = false
      }
    })
  }
  onMounted(() => {
    restHostList()
  })
</script>
<style lang="scss" scoped>
  .card-header {
    margin-bottom: 20px;
    .el-button {
      display: flex;
      align-items: center;
      padding: 0 13px;
      min-height: 32px;
    }
  }
  .dialog-footer {
    .el-button {
      padding: 0 46px;
      min-height: 32px;
    }
  }
  .pagination-box {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
  .preview-box {
    height: 100%;
    :deep(.el-card) {
      height: 100%;
    }
    :deep(.el-card__body) {
      height: 100%;
    }
    div {
      font-size: 16px;
      color: #000;
      margin-bottom: 30px;
    }
    .el-image {
      display: block;
      margin: 0 auto;
      width: 277px;
      height: 562px;
    }
  }
</style>
