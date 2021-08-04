<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-13 10:34:42
 * @Description: 会员管理
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <!-- 筛选条件 -->
  <el-card shadow="never" class="management-head">
    <el-form :model="form" label-width="100px">
      <el-row :gutter="20">
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <el-form-item label="关键词">
            <div class="oe-flex">
              <el-input
                @input="getSearch"
                v-model="form.keyWord"
                class="oe-flex-1"
                placeholder="手机号/微信昵称/姓名"
              ></el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <el-form-item label="会员标签">
            <div class="oe-flex">
              <el-select v-model="form.memberTag" placeholder="全部" class="oe-flex-1" clearable>
                <el-option
                  v-for="item in labelList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <el-form-item label="来源渠道">
            <div class="oe-flex">
              <el-select v-model="form.source" placeholder="全部" class="oe-flex-1" clearable>
                <el-option
                  v-for="item in channelList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <el-form-item label="会员等级">
            <div class="oe-flex">
              <el-select v-model="form.level" placeholder="全部" class="oe-flex-1" clearable>
                <el-option
                  v-for="item in gradeList"
                  :key="item.level_name"
                  :label="item.level_name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <sectionInput
            @keyup.enter="getSearch"
            v-model="form.balance"
            company="元"
            :titleTetx="'余额'"
          ></sectionInput>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <el-form-item label="黑名单">
            <div class="oe-flex">
              <el-select v-model="form.blacklist" placeholder="全部" class="oe-flex-1" clearable>
                <el-option label="是" value="2"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <el-form-item label="注册日期">
            <div class="oe-flex">
              <el-date-picker
                class="oe-flex-1"
                v-model="form.registrationTime"
                type="datetimerange"
                @change="chooseTimeRange($event, 0)"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <el-form-item label="上次消费时间">
            <div class="oe-flex">
              <el-date-picker
                class="oe-flex-1"
                @change="chooseTimeRange($event, 1)"
                v-model="form.consumptionTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <el-form-item label="上次访问时间">
            <div class="oe-flex">
              <el-date-picker
                @change="chooseTimeRange($event, 2)"
                class="oe-flex-1"
                v-model="form.visitTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <sectionInput
            @keyup.enter="getSearch"
            v-model="form.integral"
            company="分"
            :titleTetx="'积分'"
          ></sectionInput>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :lg="8" :md="12" :sm="12" :xs="12">
          <div class="oe-flex e-grid screen-btn">
            <el-button type="primary" @click="getSearch">搜索</el-button>
            <div @click="resetBtn" class="reset-text">重置条件</div>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <el-card shadow="never" class="custom-crad-container custom-card-page">
    <el-table
      ref="multipleTable"
      class="table-box"
      :cell-style="{ background: '#fff' }"
      :data="tableList"
      style="width: 100%"
      @select-all="handlSelectAll"
      @selection-change="handleSelectionChange"
    >
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无会员" />
      </template>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="会员昵称" min-width="160" prop="date">
        <template #default="scope">
          <div class="oe-flex Member-name">
            <el-image :src="scope.row.avatar" fit="cover" class="Member-name-img" />
            <div>
              <div class="Member-name-text">{{ scope.row.nickname }}</div>
              <div class="oe-flex">
                <el-image :src="scope.row.img_url" class="name-icon" />
                <div class="blacklist-text" v-if="scope.row.status == 2">黑名单</div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" min-width="100" label="手机号"> </el-table-column>
      <el-table-column prop="address" label="等级" min-width="90">
        <template #default="scope">
          {{ scope.row.current_shop_user_level_name }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="标签组" min-width="140">
        <template #default="scope">
          <div class="oe-flex oe-flex-wrap label-box">
            <el-tag
              type="warning"
              size="mini"
              v-for="(item, index) in scope.row.user_labels"
              :key="Number(index)"
              >{{ item.label_name }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="成交" min-width="100">
        <template #default="scope">
          <div>
            订单：
            <span class="is-color">{{ scope.row.total_order_nums }}</span>
          </div>
          <div>
            累计成交额：
            <span class="is-color">{{ scope.row.total_order_money }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="余额/积分" min-width="85">
        <template #default="scope">
          <div>
            积分：
            <span class="is-color">{{ scope.row.total_score }}</span>
          </div>
          <div>
            余额：
            <span class="is-color">{{ scope.row.money }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="jointime" label="注册时间" min-width="160"> </el-table-column>
      <el-table-column prop="address" label="操作" min-width="160">
        <template #default="scope">
          <div class="oe-flex oe-flex-wrap">
            <custom-button
              icon="ad-see"
              color="#FE6712"
              @click="jumpDetails(scope.row)"
              class="public-move-right"
              >查看</custom-button
            >
            <custom-button icon="ad-label" color="#FE6712" @click="getLabelDialog(scope.row)"
              >标签</custom-button
            >
          </div>
          <div class="btn-bottom oe-flex oe-flex-wrap">
            <custom-button
              icon="ad-grade"
              color="#2DB6F5"
              @click="getGradeDialog(scope.row)"
              class="public-move-right"
              >等级</custom-button
            >
            <custom-button
              v-if="scope.row.status != '2'"
              icon="ad-blacklist"
              color="#FF0000"
              @click="getBlackListDialog(scope.row)"
              >黑名单</custom-button
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
              :class="{ 'public-red': selectList.length }"
              :disabled="selectList.length ? false : true"
              class="public"
              @click="getBlackListDialog"
              >加入黑名单</el-link
            >
            <el-link
              href="javascript:;"
              :underline="false"
              :class="{ 'public-red': selectList.length }"
              @click="cancelBtn"
              :disabled="selectList.length ? false : true"
              class="public"
              >取消黑名单</el-link
            >
            <el-link
              href="javascript:;"
              :underline="false"
              :class="{ 'public-red': selectList.length }"
              :disabled="selectList.length ? false : true"
              @click="batchLabel"
              class="public"
              >标签组</el-link
            >
            <el-link
              href="javascript:;"
              @click="batchGrade"
              :underline="false"
              :class="{ 'public-red': selectList.length }"
              :disabled="selectList.length ? false : true"
              class="public"
              >等级</el-link
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
  <!-- 模态框层 -->
  <!-- 黑名单模态框 -->
  <member-black-confirm
    v-model:show="state.black"
    :currentItem="currentItem"
    :selectList="selectList"
    :isSingle="isSingle"
    :isMultiple="isMultiple"
    @resetManagementList="resetManagementList"
  ></member-black-confirm>
  <!-- 等级模态框 -->
  <memberGrade
    v-model:show="state.grade"
    :currentGrade="currentList"
    :selectList="selectList"
    :isBatch="isBatch"
    :currentItem="currentItem"
    @resetManagementList="resetManagementList"
  ></memberGrade>
  <!-- 标签模态框 -->
  <memberLabel
    v-model:show="state.label"
    :selectList="selectList"
    :isBatch="isBatch"
    :currentList="currentList"
    :currentItem="currentItem"
    @resetManagementList="resetManagementList"
  ></memberLabel>
</template>
<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import memberBlackConfirm from './member-modality/member-black-confirm.vue'
  import memberGrade from './member-modality/member-grade.vue'
  import memberLabel from './member-modality/member-label.vue'
  import sectionInput from '@/components/common/section-input.vue'
  import {
    reqGradeList,
    reqMembershipChannel,
    reqLabelList,
    reqrManagementList,
    reqUserLabel,
    reqUserLevel
  } from '@/api/member'
  import dayjs from 'dayjs'
  import { useRouter, useRoute } from 'vue-router'
  const router = useRouter()
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  // 当前容器元素
  const multipleTable = ref<any>()
  const route = useRoute()
  const defaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])
  const form = ref({
    // 关键词
    keyWord: '',
    // 会员标签
    memberTag: '' as any,
    // 来源渠道
    source: '',
    // 会员等级
    level: '',
    // 余额
    balance: ['', ''],
    // 黑名单
    blacklist: '',
    // 注册日期
    registrationTime: '',
    // 上次消费时间
    consumptionTime: '',
    // 上次访问时间
    visitTime: '',
    // 积分
    integral: ['', '']
  })
  // 标签id
  const labelId = ref<any>('')
  // 判断当前操作是否批量操作
  const isBatch = ref(false)
  // 当前用户的标签或者等级数据
  const currentList = ref<any[]>([])
  // 当前选中的数据
  const currentItem = ref<any>({})
  // 是否多选操作
  const isMultiple = ref(false)
  // 是否是加入黑名单0 1移除黑名单
  const isSingle = ref(0)
  // 显示不同模态框
  const state = ref({
    // 标签
    label: false,
    // 等级
    grade: false,
    // 黑名单
    black: false
  })
  // 转化的时间
  const conversionTime = ref({
    // 注册时间
    registration: ['', ''],
    // 上次消费时间
    consumption: ['', ''],
    // 上次访问时间
    visit: ['', '']
  })
  // 当前选中的数据
  const selectList = ref<any[]>([])
  // 判断是否全选当前页
  const selectAll = ref(false)
  // 渠道列表
  const channelList = ref<any[]>([])
  //  等级列表
  const gradeList = ref<any[]>([])
  // 标签列表
  const labelList = ref<any[]>([])
  // 内容数据
  const tableList = ref<any[]>([])
  // 标签模态框
  const getLabelDialog = async (row: any) => {
    isBatch.value = false
    const { data } = await reqUserLabel({ id: row.id, status: -1 })
    currentItem.value = row
    currentList.value = data.data.label_list
    state.value.label = true
  }
  // 批量增加标签
  const batchLabel = () => {
    isBatch.value = true
    state.value.label = true
  }
  // 等级模态框
  const getGradeDialog = async (row: any) => {
    isBatch.value = false
    const { data } = await reqUserLevel({ id: row.id, status: -1 })
    currentItem.value = row
    currentList.value = data.data.current_level
    state.value.grade = true
  }
  // 批量等级
  const batchGrade = () => {
    isBatch.value = true
    state.value.grade = true
  }
  // 黑名单模态框
  const getBlackListDialog = (row?: any) => {
    if (row.id) {
      currentItem.value = row
      isMultiple.value = false
    } else {
      isMultiple.value = true
    }
    isSingle.value = 0
    state.value.black = true
  }
  // 取消黑名单
  const cancelBtn = () => {
    isSingle.value = 1
    isMultiple.value = true
    state.value.black = true
  }
  // 查看详情
  const jumpDetails = (row: any) => {
    router.push({
      path: '/member/member-details',
      query: {
        id: row.id
      }
    })
  }
  // 是否全选按钮的切换
  const handlSelectAll = () => {
    if (selectList.value.length) {
      selectAll.value = true
      return
    }
    selectAll.value = false
  }
  // 搜索按钮
  const getSearch = () => {
    pagination.currentPage = 1
    resetManagementList()
  }
  // 获取渠道
  reqMembershipChannel({ page: 1, limit: 100 }).then((res) => {
    channelList.value = res.data.data.data
  })
  // 获取等级列表
  reqGradeList({ page: 1, limit: 100 }).then((res) => {
    gradeList.value = res.data.data.data
  })
  // 获取标签列表
  reqLabelList({ page: 1, limit: 100 }).then((res) => {
    labelList.value = res.data.data.data
  })
  // 获取会员管理列表
  const resetManagementList = async () => {
    const search: any = {
      keyword: form.value.keyWord
    }
    form.value.memberTag = labelId
    // 以下代码是用户没有输入就不传参数
    if (form.value.balance[0] || form.value.balance[1]) {
      search.money = form.value.balance
    }
    if (conversionTime.value.registration[0] || conversionTime.value.registration[1]) {
      search.jointime = conversionTime.value.registration
    }
    if (conversionTime.value.consumption[0] || conversionTime.value.consumption[1]) {
      search.last_consumption_time = conversionTime.value.consumption
    }
    if (conversionTime.value.visit[0] || conversionTime.value.visit[1]) {
      search.prevtime = conversionTime.value.visit
    }
    if (form.value.integral[0] || form.value.integral[1]) {
      search.score = form.value.integral
    }
    if (form.value.memberTag) {
      search.shop_user_label_id = [form.value.memberTag]
    }
    if (form.value.source) {
      search.user_channel_id = [form.value.source]
    }
    if (form.value.level) {
      search.shop_user_level_id = [form.value.level]
    }
    if (form.value.blacklist != '') {
      search.status = form.value.blacklist
    }
    const option = {
      search: '',
      page: pagination.currentPage,
      limit: pagination.pageSize
    }
    option.search = JSON.stringify(search)
    const { data } = await reqrManagementList(option)
    tableList.value = data.data.data
    for (let i = 0; i < tableList.value.length; i++) {
      for (let k = 0; k < channelList.value.length; k++) {
        if (tableList.value[i].user_channel_id == channelList.value[k].id) {
          tableList.value[i].img_url = channelList.value[k].img_url
        }
      }
    }
    pagination.total = data.data.total
  }
  // 重置条件
  const resetBtn = () => {
    form.value.keyWord = ''
    form.value.memberTag = ''
    form.value.source = ''
    form.value.level = ''
    form.value.balance = ['', '']
    form.value.blacklist = ''
    form.value.registrationTime = ''
    form.value.consumptionTime = ''
    form.value.visitTime = ''
    form.value.integral = ['', '']
    conversionTime.value.consumption = ['', '']
    conversionTime.value.registration = ['', '']
    conversionTime.value.visit = ['', '']
    pagination.currentPage = 1
    resetManagementList()
  }
  //  转化时间方法
  const chooseTimeRange = (valTime: any, num: number) => {
    const startTime = dayjs(valTime[0]).unix().toString()
    const endTime = dayjs(valTime[1]).unix().toString()
    if (num == 0) {
      conversionTime.value.registration = [startTime, endTime]
    } else if (num == 1) {
      conversionTime.value.consumption = [startTime, endTime]
    } else {
      conversionTime.value.visit = [startTime, endTime]
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
  // table选中事件
  const handleSelectionChange = (val: any) => {
    selectList.value = val
  }
  watch(selectList, () => {
    if (selectList.value.length == tableList.value.length) {
      selectAll.value = true
    } else {
      selectAll.value = false
    }
  })
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    resetManagementList()
  })
  onMounted(() => {
    if (route.query.id) {
      labelId.value = Number(route.query.id)
    }
    resetManagementList()
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .management-head {
    .form-text {
      font-size: 14px;
      margin-right: 14px;
      color: #000;
    }
    :deep(.el-button) {
      min-height: 32px;
      padding: 2px 44px;
    }
    .reset-text {
      cursor: pointer;
      margin-left: 40px;
      color: var(--color-primary);
      font-size: 14px;
    }
    :deep(.el-card__body, .el-main) {
      padding-bottom: 0;
    }
    :deep(.el-input-group__append) {
      padding: 0 8px;
      line-height: 30px;
    }
    .both-sides {
      width: 10px;
      background-color: #c4c4c4;
      height: 1px;
      margin: 0 5px;
    }
    :deep(.el-form-item__label) {
      line-height: 32px;
      color: #000;
    }
    :deep(.el-form-item__content) {
      line-height: 32px;
    }
    .screen-btn {
      @include self-lg-xl(margin-left, 0, 45px);
    }
  }
  .e-grid {
    margin-bottom: 20px;
  }
  .label-box {
    .el-tag {
      margin: 5px;
    }
  }
  .custom-crad-container {
    margin-top: 24px;
    .Member-name {
      .Member-name-img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      .Member-name-text {
        font-size: 14px;
        margin-bottom: 4px;
        color: #000000;
      }
      .blacklist-text {
        padding: 0 5px;
        color: #000000;
        font-size: 12px;
        margin-left: 12px;
        background: rgba(0, 0, 0, 0.05);
      }
      .name-icon {
        width: 15.75px;
        height: 15.75px;
      }
    }
    .is-color {
      color: #ff5732;
    }
    .public-move-right {
      margin-right: 10px;
    }
    :deep(.cell) {
      color: #000;
    }
    .table-box {
      .btn-bottom {
        margin-top: 14px;
      }
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
  }
  :deep(.el-input__inner) {
    line-height: 32px;
    height: 32px;
    .el-input__icon,
    .el-range-separator {
      line-height: 26px;
    }
  }
  :deep(.el-pagination) {
    @include self-md-lg(text-align, left, right);
  }
  :deep(.el-tag) {
    border-width: 0;
    border-radius: 0;
  }
  .order-hang {
    color: #ff0000;
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
</style>
