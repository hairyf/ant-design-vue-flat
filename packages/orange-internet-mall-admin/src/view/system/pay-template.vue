<!--
 * @Author: Mr.ji
 * @Date: 2021-03-19 16:28:00
 * @LastEditTime: 2021-05-13 10:48:21
 * @Description: 支付模板
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="pay-template">
    <el-card shadow="never" class="custom-crad-container custom-card-page">
      <div class="card-header">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="router.push('/system/paymentManagement/new-payment-template')"
          >新增支付模板</el-button
        >
        <div class="header-right">
          <el-input placeholder="请输入支付模板名称" v-model="inputText">
            <template #suffix>
              <i class="el-icon-search el-input__icon" style="cursor: pointer"> </i>
            </template>
          </el-input>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        class="table-box"
        :cell-style="{ background: '#fff' }"
        :data="tableList"
        style="width: 100%"
      >
        <template v-slot:empty>
          <el-empty class="oe-m-t-30" description="暂无支付模板" />
        </template>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="模板名称" min-width="160" prop="name"> </el-table-column>
        <el-table-column prop="address" label="类型">
          <template #default="scope">
            <div v-if="scope.row.pay_code == 'AliPay'" class="oe-flex">
              <i class="color-blue ad-alipay"></i>
              <span>支付宝支付</span>
            </div>
            <div v-if="scope.row.pay_code == 'WxPay'" class="oe-flex">
              <i class="color-green ad-wechat-channel"></i>
              <span>微信</span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="address" label="版本号">
          <div>V2支付版本</div>
        </el-table-column>
        <el-table-column prop="address" label="应用渠道">
          <div>
            <i class="ad-applets color-cyan"></i>
            <i class="color-green">&#xe627;</i>
            <i class="ad-html5 color-orange"></i>
          </div>
        </el-table-column>
        <el-table-column prop="address" label="新增时间">
          <div>2020-02-22 18:56:00</div>
        </el-table-column> -->

        <el-table-column prop="address" label="状态">
          <template #default="scope">
            <div v-if="scope.row.status == 1" class="start-up">使用中</div>
            <div v-else>未使用</div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template #default="scope">
            <div class="oe-flex" v-if="scope.row.status == 0">
              <custom-button icon="el-icon-delete" color="#FF0000" @click="deleteBtn(scope.row)"
                >删除</custom-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-col :lg="24" class="paging-box">
        <el-pagination
          class="e-grid"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          background
          :current-page="pagination.currentPage"
          layout="total, prev, pager, next,sizes, jumper"
          :total="pagination.total"
        ></el-pagination>
      </el-col>
    </el-card>
  </div>
  <div class="delete-box">
    <el-dialog v-model="show" width="550px">
      <template #title>
        <div class="oe-flex">
          <i class="el-icon-warning"></i>
          <div class="card-header">
            <div class="card-header-title">删除支付模板</div
            ><div class="card-header-text">您确定删除该支付模板？</div>
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
</template>
<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import { ElMessage } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { reqPaymentTemplateList, reqDeletePaymentTemplate } from '@/api/system'
  const router = useRouter()
  // 当前容器元素
  const multipleTable = ref<any>()
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  // 内容数据
  const tableList = ref<any[]>([])
  // 输入框
  const inputText = ref('')
  // 当前删除的id
  const currentId = ref('')
  // 删除的模态框
  const show = ref(false)
  // 删除按钮
  const deleteBtn = (currentItem: any) => {
    currentId.value = currentItem.id
    show.value = true
  }
  // 删除请求
  const determineBtn = async () => {
    await reqDeletePaymentTemplate({ id: currentId.value })
    show.value = false
    ElMessage.success('操作成功!!')
    restPaymentTemplateList()
  }
  // 获取支付模板
  const restPaymentTemplateList = async () => {
    const { data } = await reqPaymentTemplateList({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      name: inputText.value
    })
    pagination.total = data.data.total
    tableList.value = data.data.data
  }
  watch([() => pagination.currentPage, () => pagination.pageSize, inputText], () => {
    restPaymentTemplateList()
  })
  onMounted(() => restPaymentTemplateList())
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .pay-template {
    .card-header {
      margin-bottom: 20px;
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
    .start-up {
      color: #1ad370;
    }
    .pagination-right {
      float: right;
      margin-top: 120px;
    }
    .color-cyan {
      color: #00dfb9;
      font-size: 16px;
    }
    .color-orange {
      font-size: 16px;
      color: #ff800b;
    }
    .color-yellow {
      color: #fe9b2a;
    }

    .color-green {
      font-size: 16px;
      color: #09bb07;
      margin: 0 8px;
    }
    .color-blue {
      font-size: 16px;
      color: #108ee9;
      margin-right: 8px;
    }
    .paging-box {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
