<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-14 10:32:56
 * @Description: 交易分析
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-row :gutter="24" v-if="taAnalysisData">
    <el-col :lg="24">
      <el-row :gutter="24">
        <el-col :lg="6" :sm="6" :xs="6">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              center="center"
              icon="transaction-user"
              title="成交用户 (人)"
              :count="taAnalysisData.dealUser"
            />
          </el-card>
        </el-col>
        <el-col :lg="6" :sm="6" :xs="6">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              center="center"
              icon="number-payments2"
              title="支付笔数 (笔)"
              :count="taAnalysisData.payNum"
            />
          </el-card>
        </el-col>
        <el-col :lg="6" :sm="6" :xs="6">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              center="center"
              icon="number-amount"
              title="支付金额 (元)"
              :count="taAnalysisData.payMoney"
            />
          </el-card>
        </el-col>
        <el-col :lg="6" :sm="6" :xs="6">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              center="center"
              icon="refund-amount1"
              title="退款金额 (元)"
              :count="taAnalysisData.refundMoney"
            />
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row :gutter="24" class="analysis-box">
    <el-col :lg="24" :xs="24">
      <el-card shadow="never" class="e-grid deal-total">
        <div class="card-header oe-flex">
          <div class="oe-flex oe-row-between" style="width: 100%">
            <div>
              <div class="deal-title">成交总数</div>
              <div class="deal-total-text">单位：元</div>
            </div>
            <div class="time-select">
              <el-radio-group v-model="totalSelection" size="mini" @change="getDataAnalysis">
                <el-radio label="month" border>月</el-radio>
                <el-radio label="week" border>周</el-radio>
                <!-- <el-radio label="3" border>日</el-radio> -->
              </el-radio-group>
            </div>
          </div>
        </div>
        <v-charts class="oe-flex-1" autoresize :option="dealTatalOpts" />
      </el-card>
    </el-col>
    <el-col :lg="12" :xs="12" :sm="12" class="is-grid" v-if="taAnalysisData.orderStatistics">
      <el-card shadow="never">
        <div class="deal-title">成交会员</div>
        <el-row :gutter="24" class="oe-flex">
          <el-col :xl="24" :lg="24" :sm="24">
            <div class="proportion-left">
              <div class="oe-flex deal-top">
                <div class="deal-text oe-flex-3">支付总用户数/人</div>
                <el-progress
                  :percentage="
                    taAnalysisData.makeABargainUser.payUserNum.allUserNum /
                    taAnalysisData.makeABargainUser.payUserNum.todayPayUserNum
                  "
                  :stroke-width="24"
                  :show-text="false"
                ></el-progress>
                <div class="deal-Number oe-flex-2">{{
                  taAnalysisData.makeABargainUser.payUserNum.allUserNum
                }}</div>
              </div>
              <div class="oe-flex deal-bottom">
                <div class="deal-text oe-flex-3">总访问次数/次</div>
                <el-progress
                  :percentage="
                    taAnalysisData.makeABargainUser.totleVisitNum.allUserNum /
                    taAnalysisData.makeABargainUser.totleVisitNum.todayPayUserNum
                  "
                  :stroke-width="24"
                  :show-text="false"
                ></el-progress>
                <div class="deal-Number oe-flex-2">{{
                  taAnalysisData.makeABargainUser.totleVisitNum.allUserNum
                }}</div>
              </div>
            </div>
          </el-col>
          <!-- <el-col :xl="7" :lg="7" :sm="6">
            <div class="conversion-right oe-flex">
              <el-progress type="circle" :percentage="50">
                <template #default="{ percentage }">
                  <span class="percentage-text">{{ percentage }}%</span>
                </template>
              </el-progress>
              <div class="conversion-right-word">
                <div class="deal-text">成交转换率 </div>
                <div class="percentage-text">50%</div>
              </div>
            </div>
          </el-col> -->
        </el-row>
      </el-card>
    </el-col>
    <el-col :lg="12" :xs="12" :sm="12" class="is-grid" v-if="taAnalysisData.orderStatistics">
      <el-card shadow="never">
        <div class="deal-title">订单统计</div>
        <el-row :gutter="24" class="oe-flex">
          <el-col :xl="24" :lg="24" :sm="24">
            <div class="proportion-left">
              <div class="oe-flex deal-top">
                <div class="deal-text oe-flex-3">退款订单数/个</div>
                <el-progress
                  :percentage="
                    taAnalysisData.orderStatistics.refundOrderNum.todayPayUserNum /
                    taAnalysisData.orderStatistics.refundOrderNum.todayRefundSuccess
                  "
                  :stroke-width="24"
                  :show-text="false"
                ></el-progress>
                <div class="deal-Number oe-flex-2">{{
                  taAnalysisData.orderStatistics.refundOrderNum.todayPayUserNum
                }}</div>
              </div>
              <div class="oe-flex deal-bottom">
                <div class="deal-text oe-flex-3">支付订单数/个</div>
                <el-progress
                  :percentage="
                    taAnalysisData.orderStatistics.PayOrderNum.todayPayUserNum /
                    taAnalysisData.orderStatistics.PayOrderNum.todayRefundSuccess
                  "
                  :stroke-width="24"
                  :show-text="false"
                ></el-progress>
                <div class="deal-Number oe-flex-2">{{
                  taAnalysisData.orderStatistics.PayOrderNum.todayPayUserNum
                }}</div>
              </div>
            </div>
          </el-col>
          <!-- <el-col :xl="7" :lg="7" :sm="6">
            <div class="conversion-right oe-flex">
              <el-progress type="circle" :percentage="50">
                <i class="ad-customer" style="color: #5bceff; font-size: 34px"></i>
              </el-progress>
              <div class="conversion-right-word">
                <div class="deal-text">今日客单价(元)</div>
                <div class="percentage-text">50%</div>
              </div>
            </div>
          </el-col> -->
        </el-row>
      </el-card>
    </el-col>
    <!-- <el-col :lg="12" :xs="12" class="is-grid">
      <el-card shadow="never">
        <div class="deal-title">付费会员占比</div>
        <el-row :gutter="24" class="oe-flex">
          <el-col :xl="17" :lg="17" :sm="18">
            <div class="proportion-left">
              <div class="oe-flex deal-top">
                <div class="deal-text oe-flex-4">付费会员数(人)</div>
                <el-progress
                  :percentage="50"
                  :stroke-width="24"
                  :show-text="false"
                  class="oe-flex-12"
                ></el-progress>
                <div class="deal-Number oe-flex-3">999</div>
              </div>
              <div class="oe-flex deal-bottom">
                <div class="deal-text oe-flex-4">总会员数(人)</div>
                <el-progress
                  :percentage="50"
                  :stroke-width="24"
                  :show-text="false"
                  class="oe-flex-12"
                ></el-progress>
                <div class="deal-Number oe-flex-3">12000</div>
              </div>
            </div>
          </el-col>
          <el-col :xl="7" :lg="7" :sm="6">
            <div class="conversion-right oe-flex">
              <el-progress type="circle" :percentage="50">
                <i class="ad-paid-members" style="color: #5bceff; font-size: 38px"></i>
              </el-progress>
              <div class="conversion-right-word">
                <div class="deal-text">付费会员占比</div>
                <div class="percentage-text">50%</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :lg="12" :xs="12" class="is-grid">
      <el-card shadow="never">
        <div class="deal-title">退款率</div>
        <el-row :gutter="24" class="oe-flex">
          <el-col :xl="17" :lg="17" :sm="18">
            <div class="proportion-left">
              <div class="oe-flex deal-top">
                <div class="deal-text oe-flex-4">退款订单数(个)</div>
                <el-progress
                  :percentage="50"
                  :stroke-width="24"
                  :show-text="false"
                  class="oe-flex-12"
                ></el-progress>
                <div class="deal-Number oe-flex-3">999</div>
              </div>
              <div class="oe-flex deal-bottom">
                <div class="deal-text oe-flex-4">支付订单数(个)</div>
                <el-progress
                  :percentage="50"
                  :stroke-width="24"
                  :show-text="false"
                  class="oe-flex-12"
                ></el-progress>
                <div class="deal-Number oe-flex-3">12000</div>
              </div>
            </div>
          </el-col>
          <el-col :xl="7" :lg="7" :sm="6">
            <div class="conversion-right oe-flex">
              <el-progress type="circle" :percentage="50">
                <template #default="{ percentage }">
                  <span class="percentage-text">{{ percentage }}%</span>
                </template>
              </el-progress>
              <div class="conversion-right-word">
                <div class="deal-text">退款率</div>
                <div class="percentage-text">50%</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col> -->
  </el-row>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { reqDataStatistics } from '@/api/data'
  import * as Echarts from 'echarts'
  // 年月日
  const totalSelection = ref('week')
  const taAnalysisData = ref<any>({})
  // 基本图形配置
  const baseGhlOpts = {
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'value'
    }
  }
  // 成交总数图形配置
  const dealTatalOpts = ref<Echarts.EChartsCoreOption>({
    ...baseGhlOpts,
    grid: {
      top: '7%',
      left: '3%',
      right: '3%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value'
    },
    legend: {
      padding: 0
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        showSymbol: false,
        areaStyle: {
          color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(91,143,249,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(91,143,249,0)'
            }
          ])
        }
      }
    ]
  }) as any
  const getDataAnalysis = async () => {
    const { data } = await reqDataStatistics({ order_num_time: totalSelection.value })
    taAnalysisData.value = data.data
    dealTatalOpts.value.xAxis.data = Object.keys(taAnalysisData.value.orderTotalNumStatistics)
    dealTatalOpts.value.series[0].data = Object.values(taAnalysisData.value.orderTotalNumStatistics)
  }
  onMounted(() => getDataAnalysis())
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .analysis-box {
    .deal-total {
      margin: 24px 0;
      :deep(.el-card__body) {
        @include self-md-lg(height, 280px, 322px);
        display: flex;
        flex-direction: column;
      }
      :deep(.is-bordered) {
        margin: 0 5px;
      }

      .deal-total-text {
        font-size: 12px;
        line-height: 22px;
        color: #8c8c8c;
      }
    }
    .deal-title {
      font-weight: bold;
      font-size: 16px;
      color: #000000;
    }
    .is-grid {
      margin-bottom: 24px;
    }
    .deal-text {
      // width: 120px;
      font-weight: 500;
      font-size: 14px;
      color: #666666;
    }
    .proportion-left {
      margin-top: 28px;
      .deal-bottom {
        margin-top: 37px;
        padding-bottom: 30px;
      }
      .deal-Number {
        // width: 65px;
        margin-left: 18px;
        text-align: left;
        font-weight: 500;
        font-size: 14px;
        color: #5bceff;
      }
    }
    .conversion-right-word {
      margin-left: 21px;
    }
    .el-progress {
      flex: 16;
    }
    .percentage-text {
      font-size: 14px;
      line-height: 25px;
      color: #7db1ff;
    }
    :deep(.el-progress-circle) {
      max-width: 72px !important;
      max-height: 72px !important;
    }
    .deal-top {
      :deep(.el-progress-bar__outer) {
        background: rgba(39, 190, 255, 0.51);
      }
      :deep(.el-progress-bar__inner) {
        background: rgba(39, 190, 255, 0.51);
      }
    }
    .deal-bottom {
      :deep(.el-progress-bar__inner) {
        background: #5297ff;
      }
      :deep(.el-progress-bar__outer) {
        background: rgba(39, 126, 255, 0.51);
      }
    }
  }
</style>
