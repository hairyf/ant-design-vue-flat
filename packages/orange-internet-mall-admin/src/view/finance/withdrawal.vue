<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-13 09:32:02
 * @Description: 提现申请
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <!-- 筛选条件 -->
  <el-card shadow="never" class="withdrawal-screen">
    <el-row :gutter="24">
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="screen-text">关键信息</div>
          <el-input
            placeholder="昵称/姓名/提现号"
            @input="getSearch"
            v-model="form.cruxName"
            class="oe-flex-1"
          >
          </el-input>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="screen-text">会员等级</div>
          <el-select v-model="form.grade" placeholder="全部" clearable class="oe-flex-1">
            <el-option label="全部" value=" "></el-option>
            <el-option
              :label="item.level_name"
              :value="item.id"
              v-for="item in gradeList"
              :key="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="screen-text">提现方式</div>
          <el-select v-model="form.mode" placeholder="全部" clearable class="oe-flex-1">
            <!-- <el-option
              :label="item.name"
              v-for="item in paymentList"
              :value="item.id"
              :key="item.name"
            ></el-option> -->
            <el-option label="全部" value=" "></el-option>
            <el-option label="微信" value="1"></el-option>
            <el-option label="支付宝" value="2"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="screen-text">提现状态</div>
          <el-select v-model="form.state" placeholder="全部" clearable class="oe-flex-1">
            <el-option label="全部" value=" "></el-option>
            <el-option label="手动打款成功" value="2"></el-option>
            <el-option label="自动打款成功" value="3"></el-option>
            <el-option label="已拒绝" value="0"></el-option>
            <el-option label="待审核" value="1"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="screen-text">申请时间</div>
          <el-date-picker
            v-model="form.withdrawalTime"
            type="date"
            placeholder="选择日期"
            class="oe-flex-1"
          >
          </el-date-picker>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <el-button type="primary" @click="getSearch">搜索</el-button>
          <div @click="resetBtn" class="reset-text is-color">重置条件</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <!-- 列表内容 -->
  <el-card shadow="never" class="withdrawal-box custom-crad-container custom-card-page">
    <el-button type="primary" class="exportBtn" @click="exportReport">导出报表</el-button>
    <el-row class="list-title">
      <el-col :xl="4" :md="4" :sm="4" :xs="4">会员</el-col>
      <el-col :xl="2" :md="2" :sm="2" :xs="2">会员等级</el-col>
      <el-col :xl="2" :md="2" :sm="2" :xs="2"
        >申请金额
        <span class="caret-wrapper">
          <i
            :class="['sort-caret ascending', currentNum == 0 ? 'active1' : '']"
            @click="currentBright(0, 'apply_money', 'reverse')"
          ></i>
          <i
            :class="['sort-caret descending', currentNum == 1 ? 'active2' : '']"
            @click="currentBright(1, 'apply_money', 'positive')"
          ></i>
        </span>
      </el-col>
      <el-col :xl="2" :md="2" :sm="2" :xs="2"
        >手续费
        <span class="caret-wrapper">
          <i
            :class="['sort-caret ascending', currentNum == 2 ? 'active1' : '']"
            @click="currentBright(2, 'service_fee', 'reverse')"
          ></i>
          <i
            :class="['sort-caret descending', currentNum == 3 ? 'active2' : '']"
            @click="currentBright(3, 'service_fee', 'positive')"
          ></i> </span
      ></el-col>
      <el-col :xl="2" :md="2" :sm="2" :xs="2"
        >实际到账金额
        <span class="caret-wrapper">
          <i
            :class="['sort-caret ascending', currentNum == 4 ? 'active1' : '']"
            @click="currentBright(4, 'real_money', 'reverse')"
          ></i>
          <i
            :class="['sort-caret descending', currentNum == 5 ? 'active2' : '']"
            @click="currentBright(5, 'real_money', 'positive')"
          ></i> </span
      ></el-col>
      <el-col :xl="3" :md="3" :sm="3" :xs="3">提现方式</el-col>
      <el-col :xl="2" :md="2" :sm="2" :xs="2">提现状态</el-col>
      <el-col :xl="3" :md="3" :sm="3" :xs="3"
        >申请时间
        <span class="caret-wrapper">
          <i
            :class="['sort-caret ascending', currentNum == 6 ? 'active1' : '']"
            @click="currentBright(6, 'createtime', 'reverse')"
          ></i>
          <i
            :class="['sort-caret descending', currentNum == 7 ? 'active2' : '']"
            @click="currentBright(7, 'createtime', 'positive')"
          ></i> </span
      ></el-col>
      <el-col :xl="4" :md="4" :sm="4" :xs="4">操作</el-col>
    </el-row>
    <template v-if="withdrawalList.length">
      <div class="list-box" v-for="(item, index) in withdrawalList" :key="index">
        <el-row class="list-header oe-flex">
          <el-col :xl="24">提现编号：{{ item.sn }}</el-col>
        </el-row>
        <el-row class="oe-flex box-content">
          <el-col :xl="4" :md="4" :sm="4" :xs="4">
            <div class="oe-flex order-information">
              <el-image :src="item.user.avatar" class="order-information-img" />
              <div>
                <div>{{ item.user.nickname }}</div>
                <el-image :src="item.img_url" class="platform-img" />
              </div>
            </div>
          </el-col>
          <el-col :xl="2" :md="2" :sm="2" :xs="2">{{ item.shop_user_level_name }}</el-col>
          <el-col :xl="2" :md="2" :sm="2">¥{{ item.apply_money }}</el-col>
          <el-col :xl="2" :md="2" :sm="2">¥{{ item.service_fee }}</el-col>
          <el-col :xl="2" :md="2" :sm="2">¥{{ item.real_money }}</el-col>
          <el-col :xl="3" :md="3" :sm="3">
            <div class="list-tetx">渠道：{{ item.pay_name }}</div>
            <div class="list-tetx">姓名：{{ item.real_name }}</div>
            <div class="list-tetx">账号：{{ item.account }}</div>
          </el-col>
          <el-col :xl="2" :md="2" :sm="2" :xs="2">
            <div class="success-text" v-if="item.type == '2'">手动打款成功</div>
            <div class="success-text" v-if="item.type == '3'">自动打款成功</div>
            <div class="refuse-text" v-if="item.type == '0'">已拒绝</div>
            <div v-if="item.type == '1'">待审核</div>
            <div v-if="item.type == '4'">审核通过</div>
          </el-col>
          <el-col :xl="3" :md="3" :sm="3" :xs="3">{{ item.createtime_text }}</el-col>
          <el-col :xl="4" :md="4" :sm="4" :xs="4">
            <div class="oe-flex" v-if="item.examine_type == '1'">
              <el-button
                v-if="item.status == '2'"
                type="primary"
                class="oe-flex"
                icon="ad-member-payment"
                @click="getOperator(item.id)"
                >打款</el-button
              >
              <template v-if="item.status == '1'">
                <custom-button color="#2DB6F5" icon="ad-determine" @click="adopt(item.id)"
                  >审核通过</custom-button
                >
                <custom-button
                  icon="ad-close"
                  color="#ff0000"
                  class="public-move-left"
                  @click="refuse(item.id)"
                  >审核拒绝</custom-button
                >
              </template>
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
    <template v-else>
      <el-empty class="oe-m-t-30" :image-size="200"></el-empty>
    </template>
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
  <el-dialog title="确认到账" v-model="show" width="554px" class="adjust-integral">
    <el-form
      ref="paymentForm"
      :model="passwordForm"
      class="adjust-form"
      label-width="120px"
      :rules="rules"
    >
      <div class="tips-box">确认打款：您确定给该会员打款么？</div>
      <el-form-item label="系统登录密码" prop="password">
        <el-input
          class="password-inp adjust-form-integral"
          show-password
          v-model="passwordForm.password"
          :validate-event="false"
          placeholder="请输入系统登录密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="region">
        <el-input
          class="adjust-form-integral"
          type="textarea"
          v-model.trim="passwordForm.region"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="determineBtn">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <div class="delete-box">
    <el-dialog v-model="deleteShow" width="550px">
      <template #title>
        <div class="oe-flex">
          <i class="el-icon-warning"></i>
          <div class="card-header">
            <div class="card-header-title">审核拒绝</div>
            <div class="card-header-text">您确定拒绝该会员提现么？</div>
          </div>
        </div>
        <el-form :model="examineForm" ref="rulesForm" :rules="rules">
          <el-form-item label="备注" prop="rejectComments">
            <el-input type="textarea" v-model.trim="examineForm.rejectComments"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div class="footer-right">
          <el-button size="mini" @click="deleteShow = false">取消</el-button>
          <el-button size="mini" type="primary" @click="deleteBtn">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
  <div class="delete-box">
    <el-dialog v-model="adoptShow" width="550px">
      <template #title>
        <div class="oe-flex">
          <i class="el-icon-warning"></i>
          <div class="card-header">
            <div class="card-header-title">审核通过</div>
            <div class="card-header-text">您确定通过该会员提现么？</div>
          </div>
        </div>
        <el-form :model="examineForm" ref="rulesForm" :rules="rules">
          <el-form-item label="备注" prop="throughRemarks">
            <el-input type="textarea" v-model.trim="examineForm.throughRemarks"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div class="footer-right">
          <el-button size="mini" @click="adoptShow = false">取消</el-button>
          <el-button size="mini" type="primary" @click="adoptBtn">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
  import {
    reqWithdrawalManagementList,
    reqManualPayment,
    reqExportEithdrawal,
    reqRefusalWithdraw,
    reqManualAudit
  } from '@/api/finance'
  import { usePagination } from '@/hooks/use-pagination'
  import { onMounted, reactive, ref, watch } from 'vue'
  import { ElMessage } from 'element-plus'
  import { reqGradeList, reqMembershipChannel } from '@/api/member'
  import { reqVerification } from '@/api/order'
  import { reqFullPayment } from '@/api/common'
  import dayjs from 'dayjs'
  const rulesForm = ref<any>()
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  //  筛选字段
  const form = ref({
    // 关键信息
    cruxName: '',
    // 会员等级
    grade: '',
    // 支付方式
    mode: '',
    // 提现状态
    state: '',
    // 申请时间
    withdrawalTime: ''
  })

  const gradeList = ref<any>([])
  const examineForm = ref({
    // 拒绝备注
    rejectComments: '',
    // 通过备注
    throughRemarks: ''
  })
  const paymentForm = ref<any>()
  const passwordForm = ref({
    // 密码
    password: '',
    // 备注
    region: ''
  })
  // 订单导出的条件
  const condition = ref({
    // 关键信息
    cruxName: '',
    // 会员等级
    grade: '',
    // 支付方式
    mode: '',
    // 提现状态
    state: '',
    // 申请时间
    withdrawalTime: ''
  })

  const currentNum = ref<number>(-1)
  const adoptShow = ref(false)
  const deleteShow = ref(false)
  // 当前id
  const currentId = ref('')
  // 模态框
  const show = ref(false)
  // 验证
  const checkPassword = async (rule: any, value: any, callback: any) => {
    if (value) {
      try {
        await reqVerification({ confirmPwd: value })
        callback()
      } catch (error) {
        callback(new Error('密码不正确,请重新输入密码'))
      }
    } else {
      callback(new Error('请输入密码'))
    }
  }
  // 获取会员
  reqGradeList({ page: 1, limit: 100 }).then((res) => {
    gradeList.value = res.data.data.data
  })
  // 来源
  const channelList = ref<any[]>([])
  // 页面数据
  const withdrawalList = ref<any[]>([])
  // 支付列表
  const paymentList = ref<any[]>([])
  // 验证
  const rules = reactive({
    password: [{ required: true, validator: checkPassword, trigger: 'blur' }],
    region: [{ required: true, message: '请输入备注', trigger: 'blur' }],
    rejectComments: [{ required: true, message: '请输入备注', trigger: 'blur' }],
    throughRemarks: [{ required: true, message: '请输入备注', trigger: 'blur' }]
  })
  // 拒绝按钮
  const refuse = (id: string) => {
    currentId.value = id
    deleteShow.value = true
  }
  // 通过按钮
  const adopt = (id: string) => {
    currentId.value = id
    adoptShow.value = true
  }
  // 确定拒绝
  const deleteBtn = async () => {
    rulesForm.value.validate(async (valid: boolean) => {
      if (valid) {
        await reqRefusalWithdraw({
          remark: examineForm.value.rejectComments,
          id: currentId.value
        })
        deleteShow.value = false
        ElMessage.success('操作成功!!')
        getWithdrawalList()
      }
    })
  }
  const compare = (key: any, order: string) => {
    if (order == 'positive') {
      return function (a: any, b: any) {
        const val1 = a[key]
        const val2 = b[key]
        return val2 - val1
      }
    }
    return function (a: any, b: any) {
      const val1 = a[key]
      const val2 = b[key]
      return val1 - val2
    }
  }
  const currentBright = (current: number, type: string, order: string) => {
    currentNum.value = current
    withdrawalList.value.sort(compare(type, order))
  }
  // 确定通过
  const adoptBtn = async () => {
    rulesForm.value.validate(async (valid: boolean) => {
      if (valid) {
        await reqManualAudit({
          id: currentId.value,
          remark: examineForm.value.throughRemarks
        })
        adoptShow.value = false
        ElMessage.success('操作成功!!')
        getWithdrawalList()
      }
    })
  }
  // 搜索按钮
  const getSearch = () => {
    condition.value.cruxName = form.value.cruxName
    condition.value.grade = form.value.grade
    condition.value.mode = form.value.mode
    condition.value.state = form.value.state
    condition.value.withdrawalTime = form.value.withdrawalTime
    pagination.currentPage = 1
    getWithdrawalList()
  }
  // 导出报表
  const exportReport = async () => {
    let createtime = ''
    if (condition.value.withdrawalTime) {
      createtime = dayjs(condition.value.withdrawalTime).unix().toString()
    }
    const { data } = await reqExportEithdrawal({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: {
        search: condition.value.cruxName,
        shop_user_level_id: condition.value.grade,
        type: condition.value.state,
        pay_id: condition.value.mode,
        createtime
      }
    })
    if (withdrawalList.value.length) {
      const blob = new Blob([data as any])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '提现.xlsx')
      document.body.appendChild(link)
      link.click()
    } else {
      ElMessage('暂无导出的数据！')
    }
  }
  // 获取渠道
  reqMembershipChannel({ page: 1, limit: 100 }).then((res) => {
    channelList.value = res.data.data.data
  })
  // 清空
  const resetBtn = () => {
    form.value.cruxName = ''
    form.value.grade = ''
    form.value.mode = ''
    form.value.state = ''
    form.value.withdrawalTime = ''
    getSearch()
  }
  // 获取支付方式
  reqFullPayment().then((res) => {
    paymentList.value = res.data.data
  })
  // 打款按钮
  const getOperator = (id: string) => {
    show.value = true
    currentId.value = id
  }
  //打款
  const getPayment = async () => {
    await reqManualPayment({
      remark: passwordForm.value.region,
      id: currentId.value
    })
    ElMessage.success('操作成功!!')
    getWithdrawalList()
    show.value = false
  }
  // 确定
  const determineBtn = () => {
    paymentForm.value.validate((valid: boolean) => {
      if (valid) {
        getPayment()
      }
    })
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    getWithdrawalList()
  })
  // 获取提现列表
  const getWithdrawalList = async () => {
    let createtime = ''
    if (form.value.withdrawalTime) {
      createtime = dayjs(form.value.withdrawalTime).unix().toString()
    }
    const { data } = await reqWithdrawalManagementList({
      search: {
        search: form.value.cruxName,
        shop_user_level_id: form.value.grade,
        type: form.value.state,
        pay_id: form.value.mode,
        createtime
      },
      page: pagination.currentPage,
      limit: pagination.pageSize
    })
    pagination.total = data.data.total
    withdrawalList.value = data.data.data
    for (let i = 0; i < withdrawalList.value.length; i++) {
      for (let k = 0; k < channelList.value.length; k++) {
        if (withdrawalList.value[i].user.user_channel_name == channelList.value[k].code) {
          withdrawalList.value[i].img_url = channelList.value[k].img_url
        }
      }
    }
  }
  onMounted(() => {
    getWithdrawalList()
  })
</script>
<style lang="scss" scoped>
  .withdrawal-screen {
    :deep(.el-card__body) {
      padding-bottom: 0px;
    }
    .e-grid {
      margin-bottom: 20px;
    }
    .screen-text {
      margin-right: 14px;
      font-size: 14px;
      color: #000;
    }
    :deep(.el-button) {
      min-height: 32px;
      padding: 2px 44px;
    }
    .reset-text {
      margin-left: 28px;
    }
  }
  .exportBtn {
    padding: 0 14px;
    min-height: 32px;
  }
  .is-color {
    color: var(--color-primary);
    cursor: pointer;
  }
  .withdrawal-box {
    margin-top: 24px;
    .list-title {
      margin-top: 28px;
      font-size: 14px;
      color: #000;
      padding: 0 0 14px 24px;
      border-bottom: 1px solid #d9d9d9;
    }

    .list-header {
      min-width: 1000px;
      height: 52px;
      padding-left: 28px;
      background: #f0f0f0;
      font-size: 14px;
    }
    .list-box {
      overflow-x: auto;
      color: #000;
      margin-top: 14px;
      border: 1px solid #d9d9d9;
      :deep(.el-button) {
        font-size: 12px;
        padding: 2px 8px;
        min-height: 24px;
        border-radius: 2px;
        i {
          padding-right: 3px;
        }
      }
    }
    .box-content {
      min-width: 1000px;
      font-size: 14px;
      padding: 14px 0 22px 24px;
      .order-information-img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      .list-tetx {
        line-height: 20px;
      }
      .platform-img {
        margin-top: 10px;
        width: 15.75px;
        height: 15.75px;
      }
      .success-text {
        color: #1ad370;
      }
      .refuse-text {
        color: #ff0000;
      }
    }

    .paging-box {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
  :deep(.adjust-form-integral) {
    width: 100%;
  }
  .tips-box {
    margin-bottom: 28px;
    width: 480px;
    padding: 5px 14px;
    line-height: 24px;
    font-size: 12px;
    color: #000;
    background: rgba(255, 157, 40, 0.2);
    border: 1px solid var(--color-primary);
  }
  :deep(.el-form-item__label) {
    color: #000;
  }
  :deep(.el-radio__label) {
    color: #000;
  }
  .password-inp {
    :deep(.el-input__inner) {
      background: #f5f5f5;
    }
  }
  .caret-wrapper {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    height: 14px;
    width: 24px;
    vertical-align: middle;
    cursor: pointer;
    overflow: initial;
    position: relative;
    .sort-caret {
      width: 0;
      height: 0;
      border: 5px solid transparent;
      position: absolute;
      left: 7px;
    }
    .descending {
      border-top-color: #c0c4cc;
      bottom: -3px;
    }
    .ascending {
      border-bottom-color: #c0c4cc;
      top: -5px;
    }
    .active2 {
      border-top-color: var(--color-primary);
    }
    .active1 {
      border-bottom-color: var(--color-primary);
    }
  }
  .el-dialog {
    min-width: 500px;
  }
  .dialog-footer {
    .el-button {
      min-height: 32px;
      padding: 0 45px;
      font-size: 14px;
    }
  }
  :deep(.el-textarea__inner) {
    resize: none;
  }
  :deep(.el-textarea__inner) {
    height: 157px;
  }
</style>
