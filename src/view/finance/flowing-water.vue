<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-14 09:51:28
 * @Description: 余额流水
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-card shadow="never" class="screen-box">
    <el-row :gutter="24">
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">关键信息</div>
          <el-input
            class="oe-flex-1"
            v-model="form.cruxName"
            @input="getSearch"
            placeholder="昵称/姓名/手机号"
          ></el-input>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">会员等级</div>
          <el-select v-model="form.grade" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="全部" value=" "></el-option>
            <el-option
              :label="item.level_name"
              :value="item.id"
              v-for="item in gradeList"
              :key="item.value"
            ></el-option>
            <!-- <el-option label="自定义等级" value="1"></el-option> -->
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">操作人</div>
          <el-select v-model="form.operator" placeholder="全部" class="oe-flex-1" clearable>
            <el-option label="会员本人" value="1"></el-option>
            <el-option label="其他角色" value="2"></el-option>
            <el-option label="超管" value="3"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">类型</div>
          <el-select v-model="form.waterType" placeholder="全部" class="oe-flex-1" clearable>
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <div class="screen-text">操作时间</div>
          <el-date-picker
            class="oe-flex-1"
            v-model="form.waterTime"
            type="date"
            placeholder="选择操作时间"
          >
          </el-date-picker>
        </div>
      </el-col>
      <el-col :xl="{ span: '4_8' }" :md="8" :sm="12" class="oe-flex">
        <div class="oe-flex is-grid">
          <el-button type="primary" size="small" @click="getSearch">搜索</el-button>
          <div class="reset-text" @click="getEmpty">重置条件</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <el-card shadow="never" class="water-list custom-crad-container custom-card-page">
    <el-button type="primary" size="small" @click="exportReport">导出报表</el-button>
    <el-table class="revenue-list" :data="tableData" style="width: 100%">
      <template v-slot:empty>
        <el-empty class="oe-m-t-30" description="暂无余额流水" />
      </template>
      <el-table-column prop="date" label="会员" min-width="150">
        <template #default="scope">
          <div class="oe-flex">
            <el-image :src="scope.row.user.avatar" class="member-img" />
            <div>
              <div class="member-text">{{ scope.row.user.nickname }}</div>
              <el-image :src="scope.row.img_url" class="platform-img" />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="会员等级" min-width="70">
        <template #default="scope">
          {{ scope.row.user.current_shop_user_level_name }}
          <!-- <div v-if="scope.row.user.current_shop_user_level_id == '0'">默认会员</div> -->
          <!-- <div v-if="scope.row.user.current_shop_user_level_id > 0">自定义会员</div> -->
        </template>
      </el-table-column>
      <el-table-column prop="name" label="手机号" min-width="80">
        <template #default="scope">
          <div>{{ scope.row.user.mobile }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="类型">
        <template #default="scope">
          <div v-if="scope.row.type == '1'">订单支付</div>
          <div v-if="scope.row.type == '2'">会员充值</div>
          <div v-if="scope.row.type == '3'">商家取消订单退款</div>
          <div v-if="scope.row.type == '4'">余额提现</div>
          <div v-if="scope.row.type == '5'">后台充值</div>
          <div v-if="scope.row.type == '6'">维权退款</div>
          <div v-if="scope.row.type == '7'">拒绝提现</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作人">
        <template #default="scope">
          <div v-if="scope.row.change_user_type == '1'">会员本人</div>
          <div v-if="scope.row.change_user_type == '2'">其他角色</div>
          <div v-if="scope.row.change_user_type == '3'">超管</div>
        </template>
      </el-table-column>
      <el-table-column prop="add_time_text" label="时间" min-width="90" sortable> </el-table-column>
      <el-table-column prop="balance_change" label="余额变化" sortable>
        <template #default="scope">
          <div v-if="scope.row.balance_change >= 0" class="profit">
            ¥{{ scope.row.balance_change }}
          </div>
          <div class="expenditure" v-else> ¥{{ scope.row.balance_change }} </div>
        </template>
      </el-table-column>
      <el-table-column prop="after_balance" label="当前余额" sortable>
        <template #default="scope">
          <div>¥{{ scope.row.after_balance }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <custom-button
            v-if="scope.row.type == 1 || scope.row.type == 3 || scope.row.type == 6"
            icon="ad-see"
            color="#FE6712"
            @click="getEdit(scope.row, scope.row.type)"
            >查看
          </custom-button>
          <custom-button
            icon="ad-remarks"
            color="#FE6712"
            @click="lookRemarks(scope.row.remark)"
            v-else
            >备注
          </custom-button>
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
  <el-dialog title="备注" v-model="show" width="554px">
    <div class="noter-text" v-if="remarkVal"> {{ remarkVal }}</div>
    <div class="noter-text" v-else>暂无</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="show = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from 'vue'
  import { usePagination } from '@/hooks/use-pagination'
  import { reqBalanceList, reqBalanceExport } from '@/api/finance'
  import dayjs from 'dayjs'
  import { ElMessage } from 'element-plus'
  import { reqGradeList, reqMembershipChannel } from '@/api/member'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  // 引入分页函数
  const { pagination, handleSizeChange, handleCurrentChange } = usePagination()
  const form = ref({
    // 关键信息
    cruxName: '',
    // 会员等级
    grade: '',
    // 操作人
    operator: '',
    // 类型
    waterType: '',
    // 操作时间
    waterTime: ''
  })
  // 订单导出的条件
  const condition = ref({
    // 关键信息
    cruxName: '',
    // 会员等级
    grade: '',
    // 操作人
    operator: '',
    // 类型
    waterType: '',
    // 操作时间
    waterTime: ''
  })
  const gradeList = ref<any>([])
  const remarkVal = ref('')
  const show = ref(false)
  // 来源列表condition
  const channelList = ref<any[]>([])
  //  列表数据
  const tableData = ref<any[]>([])
  const typeList = reactive([
    {
      value: '1',
      label: '订单支付'
    },
    {
      value: '2',
      label: '会员充值'
    },
    {
      value: '3',
      label: '商家取消订单退款'
    },
    {
      value: '4',
      label: '余额提现'
    },
    {
      value: '5',
      label: '后台充值'
    },
    {
      value: '6',
      label: '维权退款'
    }
  ])
  // 查看订单
  const getEdit = (row: any, type: any) => {
    if (type == '1') {
      router.push({
        path: '/order/management/all-orders',
        query: {
          system_order_no: row.business_id
        }
      })
    } else if (type == '3') {
      router.push({
        path: '/order/management/orderDetails',
        query: {
          id: row.id
        }
      })
    } else {
      router.push({
        path: '/order/management/protection-details',
        query: {
          id: row.order_id,
          orderId: row.business_id
        }
      })
    }
  }
  // 查看备注
  const lookRemarks = (remark: string) => {
    remarkVal.value = remark
    show.value = true
  }
  // 获取渠道
  reqMembershipChannel({ page: 1, limit: 100 }).then((res) => {
    channelList.value = res.data.data.data
  })
  // 获取会员
  reqGradeList({ page: 1, limit: 100 }).then((res) => {
    gradeList.value = res.data.data.data
  })
  // 搜索按钮
  const getSearch = () => {
    condition.value.cruxName = form.value.cruxName
    condition.value.grade = form.value.grade
    condition.value.operator = form.value.operator
    condition.value.waterType = form.value.waterType
    condition.value.waterTime = form.value.waterTime
    pagination.currentPage = 1
    restBalanceList()
  }
  // 重置按钮
  const getEmpty = () => {
    form.value.cruxName = ''
    form.value.grade = ''
    form.value.operator = ''
    form.value.waterType = ''
    form.value.waterTime = ''
    getSearch()
    // pagination.currentPage = 1
    // restBalanceList()
  }
  // 导出
  const exportReport = async () => {
    let add_time = ''
    if (condition.value.waterTime) {
      add_time = dayjs(condition.value.waterTime).unix().toString()
    }
    const { data } = await reqBalanceExport({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: {
        search: condition.value.cruxName,
        current_shop_user_level_id: condition.value.grade,
        type: condition.value.waterType,
        change_user_type: condition.value.operator,
        add_time
      }
    })
    if (tableData.value.length) {
      const blob = new Blob([data as any])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '余额.xlsx')
      document.body.appendChild(link)
      link.click()
    } else {
      ElMessage('暂无导出的数据！')
    }
  }
  watch([() => pagination.currentPage, () => pagination.pageSize], () => {
    restBalanceList()
  })
  // 获取列表数据
  const restBalanceList = async () => {
    let add_time = ''
    if (form.value.waterTime) {
      add_time = dayjs(form.value.waterTime).unix().toString()
    }
    const { data } = await reqBalanceList({
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: {
        search: form.value.cruxName,
        current_shop_user_level_id: form.value.grade,
        type: form.value.waterType,
        change_user_type: form.value.operator,
        add_time
      }
    })
    pagination.total = data.data.total
    tableData.value = data.data.data
    tableData.value.forEach((item: any) => {
      item.balance_change = Number(item.balance_change)
      item.after_balance = Number(item.after_balance)
    })
    for (let i = 0; i < tableData.value.length; i++) {
      for (let k = 0; k < channelList.value.length; k++) {
        if (tableData.value[i].user.user_channel_name == channelList.value[k].code) {
          tableData.value[i].img_url = channelList.value[k].img_url
        }
      }
    }
  }
  onMounted(() => restBalanceList())
</script>
<style lang="scss" scoped>
  .screen-box {
    :deep(.el-card__body) {
      padding-bottom: 0;
    }
    .screen-text {
      min-width: 56px;
      font-size: 14px;
      color: #000;
      margin-right: 14px;
    }
    .is-grid {
      margin-bottom: 20px;
    }
    :deep(.el-button) {
      padding: 2px 40px;
    }
    .reset-text {
      cursor: pointer;
      font-size: 14px;
      color: var(--color-primary);
      margin-left: 28px;
    }
  }
  .water-list {
    margin-top: 20px;
    :deep(.cell) {
      color: #000;
    }
    .profit {
      color: #1ad370;
    }
    .expenditure {
      color: #ff0000;
    }
    .paging-box {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
    .platform-img {
      margin-top: 5px;
      width: 15.75px;
      height: 15.75px;
    }
    .member-text {
      font-size: 12px;
      color: var(--color-primary);
    }
    .member-img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      border-radius: 50%;
    }
  }
  .dialog-footer {
    .el-button {
      padding: 0 32px;
      line-height: 32px;
    }
  }
  .noter-text {
    font-size: 14px;
    line-height: 22px;
    color: #000000;
  }
</style>
