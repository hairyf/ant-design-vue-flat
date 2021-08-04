<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-12 11:38:00
 * @Description: 批量发货
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never">
    <el-row>
      <div class="delivery-tips">
        <el-col :lg="24" class="tips-text">
          1、 批量发货只适用于待发货状态的订单 <br />
          2、 如导入重复数据可能会出错，请谨慎使用<br />
          3、 一次性导入太多数据可能会比较慢，建议单次不要超过2000条 <br />
          4、批量发货模板第一列必须为订单编号，第二列必须为物流公司代码，第三列必须为快递单号<br />
          5、 如要有需要，可以下载模板文件
        </el-col>
      </div>
    </el-row>
    <div class="tips-box">
      <el-form :model="ruleForm" :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
        <el-form-item label="上传文件" prop="fileUrl">
          <div class="upload-container">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-success="handleSuccess"
              :file-list="fileList"
              :before-upload="beforeUpload"
              :on-remove="hanDeleteKey"
              :limit="1"
              accept=".xlsx,.xls"
            >
              <el-button size="small" plain type="primary">选择文件</el-button>
            </el-upload>
            <div class="download-box">
              <div class="download-text" @click="downloadTemplate">下载Excel模板</div>
              <div class="download-text" @click="downloadComparison">快递公司对照模板</div>
            </div>
          </div>
        </el-form-item>
        <div class="oe-flex delivery-tips-box">
          <div class="text">使用说明</div>
          <el-tooltip class="item" effect="light" placement="top">
            <template #content>
              1、 您可以点击<span style="color: #ff0000">订单管理 - 待发货 -导出</span>
              来获取待发货的订单编号，填写物流公司代码和快递单号
              <br />
              2、上传文件，立即导入就可以进行批量发货了
            </template>
            <i class="ad-question-mark" style="color: #000; font-size: 16px"></i>
          </el-tooltip>
        </div>
        <el-button type="primary" class="now-output" @click="submitForm">立即导入</el-button>
      </el-form>
    </div>
  </el-card>
  <el-card shadow="never" class="delivery-content custom-crad-container custom-card-page">
    <el-table class="table-box" :data="tableList" style="width: 100%">
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无批量发货" />
      </template>
      <el-table-column label="文件名称" min-width="210" prop="file_name"> </el-table-column>
      <el-table-column prop="order_num" label="导入订单数"> </el-table-column>
      <el-table-column prop="address" label="发货时间" min-width="150">
        <template #default="scope">
          <div>{{ formatUnix(scope.row.createtime) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="order_success" label="成功" min-width="70"> </el-table-column>
      <el-table-column prop="order_error" label="失败" min-width="70"> </el-table-column>
      <!-- <el-table-column prop="address" label="失败" min-width="140">
        <template #default="scope">
          <div class="fail-text" v-for="(item, index) in scope.row.item" :key="Number(index)">{{
            item.msg
          }}</div>
        </template>
      </el-table-column> -->
      <el-table-column prop="address" label="操作" min-width="80">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="getExportOrder(scope.row)"
            v-if="scope.row.order_success != scope.row.order_num"
            >导出失败订单</el-button
          >
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
<script setup lang="ts">
  import { reactive, ref } from '@vue/reactivity'
  import { usePagination } from '@/hooks/use-pagination'
  import {
    reqBulkDeliveryList,
    reqExportError,
    reqTemplateFile,
    reqComparisonTable,
    reqBulkDelivery
  } from '@/api/order'
  import { ElMessage } from 'element-plus'
  import { onMounted } from '@vue/runtime-core'
  import { formatUnix } from '@/utils'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const form = ref()
  //  上传的文件数据
  const fileList = ref([])
  //  表单数据
  const ruleForm = ref({
    fileUrl: ''
  })
  // 页面数据
  const tableList = ref<any[]>([])
  // 验证
  const rules = reactive({
    fileUrl: [{ required: true, message: '请上传文件', trigger: 'blur' }]
  })
  // 上传成功的钩子
  const handleSuccess = (response: any, file: any, fileList: any) => {
    ruleForm.value.fileUrl = file.raw
  }
  // 移除文件
  const hanDeleteKey = () => {
    ruleForm.value.fileUrl = ''
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
  // 下载模板
  const downloadComparison = async () => {
    const { data } = await reqTemplateFile()
    publicDownload(data.data)
  }
  // 下载对照模板
  const downloadTemplate = async () => {
    const { data } = await reqComparisonTable()
    publicDownload(data.data)
  }

  const publicDownload = (url: string) => {
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('id', 'downloadLink')
    link.setAttribute('download', '模板.xls')
    document.body.appendChild(link)
    link.click()
    // 删除添加的a链接
    const objLink: any = document.getElementById('downloadLink')
    document.body.removeChild(objLink)
  }

  // 立即上传按钮
  const submitForm = () => {
    // console.log(rules.rules.fileUrl)
    form.value.validate(async (valid: boolean) => {
      if (valid) {
        const formData = new FormData()
        formData.append('file', ruleForm.value.fileUrl)
        await reqBulkDelivery(formData)
        ruleForm.value.fileUrl = ''
        ElMessage.success('导入成功!!')
        fileList.value = []
        resetBatchList()
      }
    })
  }
  // 批量列表的获取
  const resetBatchList = async () => {
    const { data } = await reqBulkDeliveryList({
      page: pagination.currentPage,
      limit: pagination.pageSize
    })
    pagination.total = data.data.total
    tableList.value = data.data.data
  }
  // 导出失败订单
  const getExportOrder = async (row: any) => {
    const { data } = await reqExportError({ batch_id: row.id })
    const blob = new Blob([data as any])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', '失败订单.xlsx')
    document.body.appendChild(link)
    link.click()
  }
  onMounted(() => {
    resetBatchList()
  })
</script>
<style scoped lang="scss">
  .delivery-tips {
    width: 100%;
    padding-left: 14px;
    background-color: var(--color-primary-light-opacity-8);
    border: 1px solid var(--color-primary);
    border-radius: 2px;
    .tips-text {
      font-size: 12px;
      line-height: 24px;
      margin: 4px 0px;
    }
  }
  .tips-box {
    margin: 30px 0 19px 0;
    .upload-text {
      font-size: 14px;
      color: #000;
    }
    .download-text {
      cursor: pointer;
      color: var(--color-primary);
      font-size: 14px;
      margin-left: 28px;
    }
    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }
  .upload-container {
    position: relative;
    display: flex;
    .download-box {
      display: flex;
      align-items: center;
      position: absolute;
      left: 110px;
      top: 0;
    }
  }
  .delivery-content {
    margin-top: 24px;
    :deep(.el-button) {
      padding: 0 10px;
      min-height: 24px;
    }
  }
  .delivery-tips-box {
    margin: 23px 0 0 83px;
    .text {
      font-size: 12px;
      color: #8c8c8c;
      margin-right: 5px;
    }
  }
  .now-output {
    margin: 22px 0 0 83px;
  }
  :deep(.el-button) {
    padding: 3px 32px;
  }
  .operation-text {
    cursor: pointer;
    font-size: 14px;
    color: var(--color-primary);
  }
  .fail-text {
    font-size: 14px;
    color: #ff0000;
  }
  .paging-box {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  :deep(.cell) {
    color: #000;
  }
  :deep(.el-card.is-always-shadow) {
    border-radius: 10px;
  }
  :deep(.el-icon-document::before) {
    content: '';
  }
  :deep(.el-upload-list__item-name) {
    padding-right: 20px;
    display: flex;
    align-items: center;
  }
  :deep(.el-icon-document) {
    background: url('/custom-assets/images/order/exl.png') no-repeat;
    width: 18.75px;
    height: 22.5px;
    background-size: 18.75px 22.5px;
  }
</style>
