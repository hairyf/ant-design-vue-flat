<!--
 * @Author: Mr.wang
 * @Date: 2021-04-15 14:32:35
 * @LastEditTime: 2021-05-14 11:15:52
 * @Description: 统计表弹窗
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-dialog
    :title="title"
    v-model="show"
    width="1020px"
    :center="true"
    customClass="statistical-modality"
  >
    <div class="oe-flex oe-flex-row statistical-text">店铺名称：{{ detailedData.shop_name }}</div>
    <div class="oe-flex oe-row-between statistical-title">
      <div class="statistical-left oe-flex">
        <div class="left-box">
          <template v-if="type == 'revenue'">
            <div class="amount-text">{{ detailedData.revenue_sum }}</div>
            <div class="left-text">店铺营收总金额/元</div>
          </template>
          <template v-if="type == 'money'">
            <div class="amount-text">{{ detailedData.sum_total_recharge_money }}</div>
            <div class="left-text">本期期初所有会员累计余额总数</div>
          </template>
          <template v-if="type == 'score'">
            <div class="amount-text">{{ detailedData.sum_total_score }}</div>
            <div class="left-text">本期期初所有会员累计积分总数</div>
          </template>
        </div>
        <div class="horizontal" v-if="type != 'revenue'"></div>
        <div class="left-box" v-if="type != 'revenue'">
          <template v-if="type == 'money'">
            <div class="amount-text">{{ detailedData.sum_money }}</div>
            <div class="left-text">本期期初所有会员累计余额总数</div>
          </template>
          <template v-if="type == 'score'">
            <div class="amount-text">{{ detailedData.sum_score }}</div>
            <div class="left-text">本期期末所有会员累计积分总数</div>
          </template>
        </div>
      </div>
      <div class="statistical-right">
        <div class="statistical-text">
          账单周期：{{ detailedData.begin_time_text }} 至 {{ detailedData.end_time_text }}
        </div>
        <div class="statistical-text up-text">生成时间：{{ detailedData.createtime }}</div>
      </div>
    </div>
    <div class="statistical-box oe-flex">
      <div class="revenue-public">
        <div class="income-text">{{ detailedData.income }}</div>
        <div class="revenue-public-text" v-if="type != 'score'">收入合计/元</div>
        <div class="revenue-public-text" v-else>新增积分</div>
        <div class="revenue-list-box" v-if="type == 'revenue'">
          <div class="oe-flex revenue-list">
            <div class="oe-flex-2">会员充值</div>
            <div class="num-text oe-flex-1">{{ detailedData.user_number }}单</div>
            <div class="oe-flex-1">{{ detailedData.user_income }}</div>
          </div>
          <!-- <div class="oe-flex revenue-list">
            <div class="oe-flex-2">余额调整（后台增加）</div>
            <div class="num-text oe-flex-1">{{ detailedData.admin_number }}单</div>
            <div class="oe-flex-1">{{ detailedData.admin_income }}</div>
          </div> -->
          <div class="oe-flex revenue-list">
            <div class="oe-flex-2">商品购买</div>
            <div class="num-text oe-flex-1">{{ detailedData.order_number }}单</div>
            <div class="oe-flex-1">{{ detailedData.order_income }}</div>
          </div>
        </div>
        <div class="revenue-list-box" v-if="type == 'money'">
          <!-- <div class="oe-flex revenue-list">
            <div class="oe-flex-2">余额调整（后台增加）</div>
            <div class="num-text oe-flex-1">{{ detailedData.admin_number }}单</div>
            <div class="oe-flex-1">{{ detailedData.admin_income }}</div>
          </div> -->
          <div class="oe-flex revenue-list">
            <div class="oe-flex-2">会员充值</div>
            <div class="num-text oe-flex-1">{{ detailedData.user_number }}单</div>
            <div class="oe-flex-1">{{ detailedData.user_income }}</div>
          </div>
        </div>
        <div class="revenue-list-box" v-if="type == 'score'">
          <div class="oe-flex revenue-list oe-row-between">
            <div>签到奖励</div>
            <div>{{ detailedData.sign_award }}</div>
          </div>
          <div class="oe-flex revenue-list oe-row-between">
            <div>消费奖励</div>
            <div>{{ detailedData.consume_award }}</div>
          </div>
          <div class="oe-flex revenue-list oe-row-between">
            <div>充值奖励</div>
            <div>{{ detailedData.top_up_award }}</div>
          </div>
        </div>
      </div>
      <div class="revenue-public">
        <div class="expenditure-text">{{ detailedData.outgo }}</div>
        <div class="revenue-public-text" v-if="type != 'score'">支出合计/元</div>
        <div class="revenue-public-text" v-else>消耗积分</div>
        <div class="revenue-list-box" v-if="type == 'revenue'">
          <div class="oe-flex revenue-list">
            <div class="oe-flex-2">会员余额提现</div>
            <div class="num-text oe-flex-1">{{ detailedData.user_real_number }}单</div>
            <div class="oe-flex-1">{{ detailedData.user_real_outgo }}</div>
          </div>
          <div class="oe-flex revenue-list">
            <div class="oe-flex-2">余额调整（后台减少）</div>
            <div class="num-text oe-flex-1">{{ detailedData.admin_real_number }}单</div>
            <div class="oe-flex-1">{{ detailedData.admin_real_outgo }}</div>
          </div>
        </div>
        <div class="revenue-list-box" v-if="type == 'money'">
          <div class="oe-flex revenue-list">
            <div class="oe-flex-2">订单支付</div>
            <div class="num-text oe-flex-1">{{ detailedData.order_balance_number }}单</div>
            <div class="oe-flex-1">{{ detailedData.order_balance_outgo }}</div>
          </div>
          <div class="oe-flex revenue-list">
            <div class="oe-flex-2">余额调整（后台减少）</div>
            <div class="num-text oe-flex-1">{{ detailedData.admin_real_number }}单</div>
            <div class="oe-flex-1">{{ detailedData.admin_real_outgo }}</div>
          </div>
          <div class="oe-flex revenue-list">
            <div class="oe-flex-2">会员提现</div>
            <div class="num-text oe-flex-1">{{ detailedData.user_real_number }}单</div>
            <div class="oe-flex-1">{{ detailedData.user_real_outgo }}</div>
          </div>
        </div>
        <div class="revenue-list-box" v-if="type == 'score'"></div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="exportReport">导出报表</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { reqRecordDetails, reqDetailsExport } from '@/api/finance'
  import { ref, watch, computed, defineEmit, defineProps } from 'vue'
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    currentId: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    date_type: {
      type: String,
      required: true
    }
  })
  // 标题
  const title = ref('')
  // 详情数据
  const detailedData = ref<any>({})
  const emit = defineEmit()
  // 多层model绑定数据
  const show = computed({
    get: () => props.show,
    set: () => emit('update:show')
  })
  // 导出报表
  const exportReport = async () => {
    const { data } = await reqDetailsExport({
      id: props.currentId,
      type: props.type,
      date_type: props.date_type
    })
    const blob = new Blob([data as any])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    if (props.type == 'revenue') {
      link.setAttribute('download', '营收报表.xlsx')
    } else {
      props.type == 'money'
        ? link.setAttribute('download', '余额报表.xlsx')
        : link.setAttribute('download', '积分报表.xlsx')
    }
    document.body.appendChild(link)
    link.click()
    show.value = false
  }
  // 获取详情数据
  const getDetailsData = async () => {
    const { data } = await reqRecordDetails({
      id: props.currentId,
      type: props.type,
      date_type: props.date_type
    })
    detailedData.value = data.data
    title.value = `${detailedData.value.year}年${detailedData.value.month}月${
      detailedData.value.day ? `${detailedData.value.day}日` : ''
    }${
      props.type == 'revenue' ? '营收对账单' : props.type == 'money' ? '余额统计表' : '积分统计表'
    }`
  }
  watch(props, () => {
    if (props.show && props.type) {
      getDetailsData()
    }
  })
</script>
<style lang="scss" scoped>
  .statistical-modality {
    .statistical-text {
      font-size: 12px;
      color: #000;
    }
    .statistical-left {
      .horizontal {
        margin: 0 50px;
        width: 2px;
        height: 40px;
        background: #d9d9d9;
        border-radius: 2px;
      }
    }
    .left-box {
      .amount-text {
        font-weight: 500;
        line-height: 24px;
        font-size: 40px;
        color: #000000;
        margin-bottom: 14px;
      }
      .left-text {
        font-size: 14px;
        color: #000;
      }
    }
    .statistical-right {
      text-align: right;
      .up-text {
        margin-top: 10px;
      }
    }
    .el-dialog__footer {
      text-align: right !important;
      .el-button {
        width: 120px;
        height: 24px;
      }
    }
    .statistical-box {
      margin-top: 28px;
      & .revenue-public:first-child {
        margin-right: 24px;
      }
    }
    .revenue-public {
      padding: 24px;
      border: 1px solid #d9d9d9;
      min-height: 405px;
      max-height: 405px;
      min-width: 425px;
      overflow-y: auto;
      .income-text {
        font-size: 40px;
        line-height: 22px;
        font-weight: 500;
        color: #1ad370;
      }
      .expenditure-text {
        font-size: 40px;
        line-height: 22px;
        font-weight: 500;
        color: #ff0000;
      }
      .revenue-public-text {
        margin-top: 14px;
        font-size: 14px;
        line-height: 22px;
        color: #000000;
      }
      .revenue-list-box {
        line-height: 46px;
        padding-top: 9px;
        margin-top: 9px;
        border-top: 1px solid #d9d9d9;
        & .revenue-list:nth-child(2n - 2) {
          background: #f5f5f5;
        }
      }
      .revenue-list {
        box-sizing: border-box;
        padding: 0 14px;
        width: 426px;
        height: 46px;
        .num-text {
          color: var(--color-primary);
        }
      }
    }
  }
</style>
