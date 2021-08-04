<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-12 11:43:32
 * @Description: 会员导入
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never">
    <el-form ref="importForm" class="import-From" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="会员标签">
        <el-select v-model="form.memberTag" multiple placeholder="选择标签" clearable>
          <el-option
            v-for="item in labelList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
        <div class="oe-flex">
          <div class="tap-tips">没有合适的标签？</div>
          <div class="tap-text" @click="openClass('/member/create-label')">新增标签</div>
          <div class="tap-text" @click="getLabeList(true)">刷新</div>
        </div>
      </el-form-item>
      <!-- <el-form-item label="手机号码">
        <el-radio-group v-model="form.verification">
          <el-radio label="已验证"></el-radio>
          <el-radio label="未验证"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="上传文件" prop="fileUrl">
        <div class="oe-flex upload-container">
          <div>
            <el-upload
              :before-upload="beforeUpload"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-success="handleSuccess"
              :file-list="fileList"
              :on-remove="hanDelete"
              :limit="1"
              accept=".xlsx,.xls"
            >
              <el-button size="small" plain type="primary">选择文件</el-button>
            </el-upload>
          </div>
          <div class="download-text" @click="downloadTemplate">下载Excel模板</div>
        </div>
      </el-form-item>
      <el-button type="primary" class="now-output" size="small" @click="submitForm"
        >立即导入</el-button
      >
    </el-form>
  </el-card>
  <el-card shadow="never" class="import-box custom-card-page">
    <el-table class="import-list" :data="ImportList" @sort-change="changeSort" style="width: 100%">
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无会员导入" />
      </template>
      <el-table-column prop="file_name" label="文件名称"> </el-table-column>
      <el-table-column prop="createtime" label="导入时间" sortable min-width="150">
        <template #default="scope">
          <div class="is-color">{{ formatUnix(scope.row.createtime) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="导入会员数">
        <template #default="scope">
          <div class="is-color">{{ scope.row.count }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="导入成功会员数">
        <template #default="scope">
          <div class="is-color">{{ scope.row.success_count }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="导入失败会员数">
        <template #default="scope">
          <div class="state-fail">{{ scope.row.fail_count }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="导入状态">
        <template #default="scope">
          <div class="state-text" v-if="scope.row.success_count == scope.row.count">导入成功</div>
          <template v-else>
            <div
              class="state-fail"
              v-for="(item, index) in scope.row.fail_msg"
              :key="Number(index)"
              >{{ item.msg_tag }}</div
            >
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-col :lg="24" class="paging-box">
      <el-pagination
        class="e-grid"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        background
        :current-page="pagination.currentPage"
        layout="total, prev, pager, next,sizes, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-col>
  </el-card>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import { reqLabelList, reqImportList, reqMemberImport, reqDownloadTemplate } from '@/api/member'
  import { ElMessage } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { formatUnix } from '@/utils'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const importForm = ref()
  const router = useRouter()
  // 放上传的文件
  const fileList = ref([])
  const form = ref<any>({
    // 会员标签
    memberTag: [],
    // 上传的文件
    fileUrl: ''
  })
  // 排序
  const sort = ref('')
  const order = ref('')
  // 标签列表
  const labelList = ref<any[]>([])
  //  列表数据
  const ImportList = ref([])
  // 验证
  const rules = reactive({
    fileUrl: [{ required: true, message: '请上传文件', trigger: 'blur' }]
  })
  // 移除文件
  const hanDelete = () => {
    form.value.fileUrl = ''
  }
  // 文件上次成功的钩子
  const handleSuccess = (response: any, file: any, fileList: any) => {
    form.value.fileUrl = file.raw
  }
  // 上传时钩子
  const beforeUpload = (file: any) => {
    const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
    const extension = testmsg == 'xlsx' || testmsg == 'xls'
    if (!extension) {
      ElMessage.warning('上传文件只能是 xls、xlsx格式!')
    }
    return extension
  }
  // 排序
  const changeSort = (val: any) => {
    order.value = val.prop
    if (val.order == 'descending') {
      sort.value = 'desc'
      // 降序
      restImportList()
    } else {
      // 正序
      sort.value = 'asc'
      restImportList()
    }
  }
  // 获取标签列表
  const getLabeList = (refresh?: boolean) => {
    reqLabelList({ page: 1, limit: 100 }).then((res) => {
      labelList.value = res.data.data.data
    })
    if (refresh) {
      ElMessage.success('刷新成功!!')
    }
  }
  // 新增标签
  const openClass = (pathValue: string) => {
    const { href } = router.resolve({
      path: pathValue
    })
    window.open(href, '_blank')
  }
  // 获取导入列表
  const restImportList = async () => {
    const { data } = await reqImportList({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      sort: sort.value,
      order: order.value
    })
    pagination.total = data.data.total
    ImportList.value = data.data.data
  }
  // 下载Excel模板
  const downloadTemplate = async () => {
    const { data } = await reqDownloadTemplate({ type: 0 })
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = data.data.path
    link.setAttribute('id', 'downloadLink')
    link.setAttribute('download', '导入会员模板.xls')
    document.body.appendChild(link)
    link.click()
    // 删除添加的a链接
    const objLink: any = document.getElementById('downloadLink')
    document.body.removeChild(objLink)
  }
  // 立即导入按钮
  const submitForm = () => {
    importForm.value.validate(async (valid: boolean) => {
      if (valid) {
        const formData = new FormData()
        formData.append('label_ids', form.value.memberTag)
        formData.append('file', form.value.fileUrl)
        await reqMemberImport(formData)
        ElMessage.success('导入成功!!')
        fileList.value = []
        restImportList()
      }
    })
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    restImportList()
  })
  onMounted(() => {
    getLabeList()
    restImportList()
  })
</script>
<style lang="scss" scoped>
  .import-From {
    :deep(.el-form-item__label) {
      color: #000;
    }
    .upload-container {
      position: relative;
    }
    .tap-tips {
      font-size: 12px;
      color: #8c8c8c;
    }
    .tap-text {
      cursor: pointer;
      margin-left: 14px;
      font-size: 12px;
      color: var(--color-primary);
    }
    .download-text {
      position: absolute;
      left: 140px;
      top: 0;
      cursor: pointer;
      color: var(--color-primary);
      font-size: 14px;
    }
    :deep(.el-input) {
      line-height: none !important;
      height: 100%;
    }
    .now-output {
      margin: 10px 0 0 80px;
    }
    :deep(.el-button) {
      padding: 0 32px;
    }
  }

  :deep(.el-upload-list__item-name) {
    padding-right: 20px;
  }
  :deep(.el-icon-document) {
    background: url('/custom-assets/images/order/exl.png') no-repeat;
    width: 18.75px;
    height: 22.5px;
    background-size: 18.75px 22.5px;
  }
  :deep(.el-icon-document::before) {
    content: '';
  }
  :deep(.el-upload-list__item-name) {
    padding-right: 20px;
    display: flex;
    align-items: center;
  }
  .import-box {
    margin-top: 24px;
    position: relative;
    :deep(.cell) {
      color: #000;
    }
    .custom-center-card {
      margin-top: 24px;
      :deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
        background-color: var(--color-primary-light-opacity-9) !important;
      }
    }
    :deep(.el-card__body) {
      min-height: 600px;
    }
    .paging-box {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
    .state-text {
      color: #36dc47;
    }
    .is-color {
      color: var(--color-primary);
    }
    .state-fail {
      color: #ff0000;
    }
  }
</style>
