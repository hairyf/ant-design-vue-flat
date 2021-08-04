<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-13 09:31:06
 * @Description: 充值记录
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <!-- 筛选条件 -->
  <el-card shadow="never" class="recharge-screen">
    <el-row :gutter="24">
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">关键信息</div>
          <el-input
            @input="getSearch"
            class="oe-flex-1"
            v-model="form.cruxName"
            placeholder="昵称/姓名/充值单号"
          ></el-input>
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
            <!-- <el-option label="普通等级" value="0"></el-option>
            <el-option label="自定义等级" value="1"></el-option> -->
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="screen-text">充值方式</div>
          <el-select v-model="form.mode" placeholder="全部" clearable class="oe-flex-1">
            <el-option label="全部" value=" "></el-option>
            <!-- <el-option label="后台充值" value="0"></el-option> -->
            <el-option label="微信" value="1"></el-option>
            <el-option label="支付宝" value="2"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" :xs="12">
        <div class="oe-flex e-grid">
          <div class="screen-text">充值时间</div>
          <el-date-picker
            v-model="form.rechargeTime"
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
  <el-card shadow="never" class="recharge-box custom-crad-container custom-card-page">
    <el-button type="primary" @click="exportReport">导出报表</el-button>
    <el-row class="list-title">
      <el-col :xl="3" :md="3" :sm="3" :xs="3">会员</el-col>
      <el-col :xl="2" :md="2" :sm="2" :xs="2">会员等级</el-col>
      <el-col :xl="3" :md="3" :sm="3" :xs="3">手机号</el-col>
      <el-col :xl="3" :md="3" :sm="3" :xs="3"
        >充值金额
        <span class="caret-wrapper">
          <i
            :class="['sort-caret ascending', currentNum == 0 ? 'active1' : '']"
            @click="currentBright(0, 'money', 'reverse')"
          ></i>
          <i
            :class="['sort-caret descending', currentNum == 1 ? 'active2' : '']"
            @click="currentBright(1, 'money', 'positive')"
          ></i>
        </span>
      </el-col>
      <el-col :xl="3" :md="3" :sm="3" :xs="3"
        >充值时间
        <span class="caret-wrapper">
          <i
            :class="['sort-caret ascending', currentNum == 3 ? 'active1' : '']"
            @click="currentBright(3, 'finishtime', 'reverse')"
          ></i>
          <i
            :class="['sort-caret descending', currentNum == 4 ? 'active2' : '']"
            @click="currentBright(4, 'finishtime', 'positive')"
          ></i> </span
      ></el-col>
      <el-col :xl="2" :md="2" :sm="2" :xs="2">充值方式</el-col>
      <el-col :xl="2" :md="2" :sm="2" :xs="2">状态</el-col>
      <el-col :xl="3" :md="3" :sm="3" :xs="3">操作员信息</el-col>
      <el-col :xl="3" :md="3" :sm="3" :xs="3">操作 </el-col>
    </el-row>
    <template v-if="list.length">
      <div class="list-box" v-for="(item, index) in list" :key="index">
        <el-row class="list-header oe-flex">
          <el-col :xl="24">充值单号：{{ item.sn }}</el-col>
        </el-row>
        <el-row class="oe-flex box-content">
          <el-col :xl="3" :md="3" :sm="3" :xs="3">
            <div class="oe-flex order-information">
              <el-image :src="item.user.avatar" class="order-information-img" />
              <div>
                <div>{{ item.user.nickname }}</div>
                <el-image :src="item.img_url" class="platform-img" />
              </div>
            </div>
          </el-col>
          <el-col :xl="2" :md="2" :sm="2" :xs="2">{{ item.shop_user_level_name }}</el-col>
          <el-col :xl="3" :md="3" :sm="3" :xs="3">{{ item.mobile }}</el-col>
          <el-col :xl="3" :md="3" :sm="3" :xs="3">{{ item.money }}</el-col>
          <el-col :xl="3" :md="3" :sm="3" :xs="3">{{ item.finishtime_text }}</el-col>
          <el-col :xl="2" :md="2" :sm="2" :xs="2">{{ item.pay_name }}</el-col>
          <el-col :xl="2" :md="2" :sm="2" :xs="2">
            <div v-if="item.status == -1" style="color: #ff0000">支付时间过期</div>
            <div v-if="item.status == 1" style="color: #ff0000">待支付</div>
            <div v-if="item.status == 2" class="success-text">成功</div>
            <div v-if="item.status == 3" style="color: var(--color-primary)">后台人工确认完成</div>
          </el-col>
          <el-col :xl="3" :md="3" :sm="3" :xs="2">
            <div v-if="(item.status == 2 || item.status == 3) && item.manager" class="information">
              <div>员工姓名：{{ item.manager.name }}</div>
              <div>角色权限：{{ item.manager.group_name }}</div>
              <div>联系方式：{{ item.manager.mobile }}</div>
            </div>
          </el-col>
          <el-col :xl="3" :md="3" :sm="3" :xs="3">
            <div class="operation" v-if="item.status == -1 || item.status == 1">
              <el-button
                type="primary"
                class="oe-flex"
                icon="ad-determine"
                @click="determineBtn(item.id)"
                >确认到账</el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
    <template v-else>
      <el-empty class="oe-m-t-30" description="暂无充值记录"></el-empty>
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
  <confirmReceipt v-model:show="show" @restRechargeList="restRechargeList" :currentId="currentId">
  </confirmReceipt>
</template>
<script setup lang="ts">
  import { usePagination } from '@/hooks/use-pagination'
  import { onMounted, ref, watch } from 'vue'
  import { ElMessage } from 'element-plus'
  import { reqGradeList, reqMembershipChannel } from '@/api/member'
  import confirmReceipt from '@/components/common/finance-modality/confirm-receipt.vue'
  import { reqRechargeList, reqExportRecharge } from '@/api/finance'
  import dayjs from 'dayjs'
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  //  筛选字段
  const form = ref({
    // 关键字
    cruxName: '',
    // 会员等级
    grade: '',
    // 充值方式
    mode: '',
    // 充值时间
    rechargeTime: ''
  })
  const gradeList = ref<any>([])
  // 订单导出的条件
  const condition = ref({
    // 关键字
    cruxName: '',
    // 会员等级
    grade: '',
    // 充值方式
    mode: '',
    // 充值时间
    rechargeTime: ''
  })
  const currentNum = ref<number>(-1)
  // 确定到账模态框
  const show = ref(false)
  // 当前id
  const currentId = ref()
  // 搜索按钮
  const getSearch = () => {
    condition.value.cruxName = form.value.cruxName
    condition.value.grade = form.value.grade
    condition.value.mode = form.value.mode
    condition.value.rechargeTime = form.value.rechargeTime
    pagination.currentPage = 1
    restRechargeList()
  }
  // 获取会员
  reqGradeList({ page: 1, limit: 100 }).then((res) => {
    gradeList.value = res.data.data.data
  })
  // 确定到账按钮
  const determineBtn = (id: string) => {
    currentId.value = id
    show.value = true
  }
  // 来源列表
  const channelList = ref<any[]>([])
  // 列表数据
  const list = ref<any[]>([])
  // 清空
  const resetBtn = () => {
    form.value.cruxName = ''
    form.value.grade = ''
    form.value.mode = ''
    form.value.rechargeTime = ''
    getSearch()
    // pagination.currentPage = 1
    // restRechargeList()
  }
  // 导出报表
  const exportReport = async () => {
    let rechargeTime = ''
    if (condition.value.rechargeTime) {
      rechargeTime = dayjs(condition.value.rechargeTime).unix().toString()
    }
    const { data } = await reqExportRecharge({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: {
        shop_user_level_id: condition.value.grade,
        search: condition.value.cruxName,
        pay_id: condition.value.mode,
        refund_time: rechargeTime
      }
    })
    if (list.value.length) {
      const blob = new Blob([data as any])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '充值报表.xlsx')
      document.body.appendChild(link)
      link.click()
    } else {
      ElMessage('暂无导出的数据！')
    }
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
    list.value.sort(compare(type, order))
  }

  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    restRechargeList()
  })
  // 获取渠道
  reqMembershipChannel({ page: 1, limit: 100 }).then((res) => {
    channelList.value = res.data.data.data
  })
  // 获取充值记录列表
  const restRechargeList = async () => {
    let finishtime = ''
    if (form.value.rechargeTime) {
      finishtime = dayjs(form.value.rechargeTime).unix().toString()
    }
    const { data } = await reqRechargeList({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: {
        shop_user_level_id: form.value.grade,
        search: form.value.cruxName,
        pay_id: form.value.mode,
        finishtime
      }
    })
    pagination.total = data.data.total
    list.value = data.data.data
    for (let i = 0; i < list.value.length; i++) {
      for (let k = 0; k < channelList.value.length; k++) {
        if (list.value[i].user.user_channel_code == channelList.value[k].code) {
          list.value[i].img_url = channelList.value[k].img_url
        }
      }
    }
  }
  onMounted(() => {
    restRechargeList()
  })
</script>
<style lang="scss" scoped>
  .recharge-screen {
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
    .select-from {
      :deep(.el-input__inner) {
        color: #000;
        background: #f0f0f0;
        transform: translateX(2px);
        border-radius: 0 0 2px 2px;
      }
    }
  }
  .is-color {
    color: var(--color-primary);
    cursor: pointer;
  }
  .information {
    div {
      line-height: 27px;
    }
  }
  .recharge-box {
    margin-top: 24px;
    :deep(.el-button) {
      padding: 2px 8px;
      min-height: 32px;
    }
    .list-title {
      margin-top: 28px;
      font-size: 14px;
      color: #000;
      padding: 0 0 14px 24px;
      border-bottom: 1px solid #d9d9d9;
    }
    .list-header {
      height: 52px;
      padding-left: 28px;
      background: #f0f0f0;
      font-size: 14px;
    }
    .list-box {
      color: #000;
      margin-top: 14px;
      border: 1px solid #d9d9d9;
    }
    .box-content {
      font-size: 14px;
      padding: 14px 0 22px 24px;
      .order-information-img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .platform-img {
        margin-top: 10px;
        width: 15.75px;
        height: 15.75px;
      }
      .success-text {
        color: #1ad370;
      }
    }
    .operation {
      :deep(.el-button) {
        font-size: 12px;
        padding: 2px 8px;
        min-height: 24px;
        i {
          padding-right: 3px;
        }
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
    .paging-box {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
