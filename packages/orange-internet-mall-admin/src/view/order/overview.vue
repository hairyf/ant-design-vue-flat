<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-06 15:45:25
 * @Description: 订单概览
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-row :gutter="24">
    <el-col :lg="24">
      <el-row :gutter="24">
        <el-col :lg="6" :sm="6" :xs="6">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              style="cursor: pointer"
              @click="router.push('/order/management/unpaid')"
              center="center"
              icon="be-paid1"
              title="待付款"
              :count="overviewData.awaitPay"
            />
          </el-card>
        </el-col>
        <el-col :lg="6" :sm="6" :xs="6">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              style="cursor: pointer"
              @click="router.push('/order/management/delivered')"
              center="center"
              icon="delivered"
              title="待发货"
              :count="overviewData.awaitShipments"
            />
          </el-card>
        </el-col>
        <el-col :lg="6" :sm="6" :xs="6">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              center="center"
              style="cursor: pointer"
              @click="router.push('/order/management/received')"
              icon="received"
              title="待收货"
              :count="overviewData.awaitTakeDelivery"
            />
          </el-card>
        </el-col>
        <el-col :lg="6" :sm="6" :xs="6">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              center="center"
              style="cursor: pointer"
              @click="router.push('/order/rights-order')"
              icon="rights"
              title="维权订单"
              :count="overviewData.rightsOrder"
            />
          </el-card>
        </el-col>
      </el-row>
    </el-col>
    <el-col :lg="24" v-if="overviewData.todayDownSingleNum">
      <el-row :gutter="24">
        <el-col :lg="8" :sm="8" :xs="8">
          <el-card
            shadow="never"
            class="e-grid count-container"
            style="cursor: pointer"
            @click="jumpOrder"
          >
            <count-item
              center="center"
              icon="lower-singular"
              title="今日成交数量/单"
              :count="overviewData.todayDownSingleNum.todayNum"
            >
              <template #tips>
                <div class="compare">
                  <span class="compare-text1">较昨日</span>
                  <span
                    class="compare-text2"
                    :class="[
                      overviewData.todayDownSingleNum.todayNum -
                        overviewData.todayDownSingleNum.esterdayNum >=
                      0
                        ? ''
                        : 'text-color'
                    ]"
                    >{{
                      overviewData.todayDownSingleNum.todayNum -
                      overviewData.todayDownSingleNum.esterdayNum
                    }}</span
                  >
                </div>
              </template>
            </count-item>
          </el-card>
        </el-col>
        <el-col :lg="8" :sm="8" :xs="8">
          <el-card
            shadow="never"
            class="e-grid count-container"
            style="cursor: pointer"
            @click="jumpOrder"
          >
            <count-item
              center="center"
              icon="closed-today1"
              title="今日成交金额/元"
              :count="overviewData.todayMakeABargainMoney.todayMoney"
            >
              <template #tips>
                <div class="compare">
                  <span class="compare-text1">较昨日</span>
                  <span
                    class="compare-text2"
                    :class="[
                      overviewData.todayMakeABargainMoney.todayMoney -
                        overviewData.todayMakeABargainMoney.esterdayMoney >=
                      0
                        ? ''
                        : 'text-color'
                    ]"
                    >{{
                      (
                        overviewData.todayMakeABargainMoney.todayMoney -
                        overviewData.todayMakeABargainMoney.esterdayMoney
                      ).toFixed(2)
                    }}</span
                  >
                </div>
              </template>
            </count-item>
          </el-card>
        </el-col>
        <el-col :lg="8" :sm="8" :xs="8">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              center="center"
              icon="user-orders"
              title="新用户成交量/单"
              :count="overviewData.todayNewUserTodayDownSingle.todayNum"
            >
              <template #tips>
                <div class="compare">
                  <span class="compare-text1">较昨日</span>
                  <span
                    class="compare-text2"
                    :class="[
                      overviewData.todayNewUserTodayDownSingle.todayNum -
                        overviewData.todayNewUserTodayDownSingle.esterdayNum >=
                      0
                        ? ''
                        : 'text-color'
                    ]"
                    >{{
                      overviewData.todayNewUserTodayDownSingle.todayNum -
                      overviewData.todayNewUserTodayDownSingle.esterdayNum
                    }}</span
                  >
                </div>
              </template>
            </count-item>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
    <el-col>
      <el-row :gutter="24">
        <el-col :lg="12" :xs="24">
          <el-card shadow="never" class="e-grid deal-container">
            <div class="card-header">
              <span class="title">订单总量统计</span>
              <div class="time-select-container oe-flex oe-row-between">
                <div></div>
                <div class="time-select">
                  <el-radio-group v-model="totalSelection" size="mini" @change="getOverviewData">
                    <el-radio label="month" border>月</el-radio>
                    <el-radio label="week" border>周</el-radio>
                    <el-radio label="day" border>日</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>
            <v-charts class="oe-flex-1" autoresize :option="statisticsOpts" />
          </el-card>
        </el-col>
        <el-col :lg="12" :xs="24">
          <el-card shadow="never" class="e-grid deal-container">
            <div class="card-header">
              <span class="title">订单金额</span>
              <div class="time-select-container oe-flex oe-row-between">
                <div></div>
                <div class="time-select">
                  <el-radio-group v-model="amountSelection" size="mini" @change="getOverviewData">
                    <el-radio label="month" border>月</el-radio>
                    <el-radio label="week" border>周</el-radio>
                    <el-radio label="day" border>日</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>
            <v-charts class="oe-flex-1" autoresize :option="moneyOpts" />
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
  import { reqOrderReview } from '@/api/order'
  import { reactive, ref } from '@vue/reactivity'
  import { onMounted } from '@vue/runtime-core'
  import * as Echarts from 'echarts'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  import dayjs from 'dayjs'
  import customParseFormat from 'dayjs/plugin/customParseFormat'
  dayjs.extend(customParseFormat)
  // 订单金额的选择
  const amountSelection = ref('week')
  // 订单总量统计的选择
  const totalSelection = ref('week')
  // 总量数据
  const overviewData = ref<any>({})
  // 基本图形配置
  const baseGhlOpts = {
    tooltip: {
      trigger: 'axis'
    },
    axisPointer: {
      show: true
    },
    yAxis: {
      type: 'value'
    }
  }
  // 订单总量统计图像配置
  const statisticsOpts = ref<Echarts.EChartsCoreOption>({
    ...baseGhlOpts,
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>订单总量{c}'
    },
    grid: {
      top: '8%',
      left: '0%',
      right: '2%',
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
    series: [
      {
        data: [],
        type: 'line',
        showSymbol: false,
        smooth: true
      }
    ]
  }) as any
  // 订单金额图像配置
  const moneyOpts = ref<Echarts.EChartsCoreOption>({
    ...baseGhlOpts,
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>订单金额 {c}'
    },
    grid: {
      top: '8%',
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar',
        barWidth: '20',
        itemStyle: {
          color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#5B8FF9' },
            { offset: 1, color: 'rgba(91, 143, 249, 0)' }
          ])
        }
      }
    ]
  }) as any
  // 跳转订单
  const jumpOrder = () => {
    const beforeDawnTime = dayjs().format('YYYY-MM-DD') + ' 00:00'
    const nightTime = dayjs().format('YYYY-MM-DD') + ' 23:59'
    dayjs(beforeDawnTime, 'YYYY-MM-DD HH:mm')
    dayjs(nightTime, 'YYYY-MM-DD HH:mm')
    router.push({
      path: '/order/management/all-orders',
      query: {
        time: [
          dayjs(beforeDawnTime, 'YYYY-MM-DD HH:mm').unix(),
          dayjs(nightTime, 'YYYY-MM-DD HH:mm').unix()
        ]
      }
    })
  }
  const getOverviewData = async () => {
    const { data } = await reqOrderReview({
      order_num_time: totalSelection.value,
      order_money_time: amountSelection.value
    })
    overviewData.value = data.data
    moneyOpts.value.xAxis.data = Object.keys(overviewData.value.orderTotalMoneyStatistics)
    moneyOpts.value.series[0].data = Object.values(overviewData.value.orderTotalMoneyStatistics)
    statisticsOpts.value.xAxis.data = Object.keys(overviewData.value.orderTotalNumStatistics)
    statisticsOpts.value.series[0].data = Object.values(overviewData.value.orderTotalNumStatistics)
  }
  onMounted(() => getOverviewData())
</script>

<style lang="scss" scoped>
  // @import '@/style/class.scss';
  @import '@/style/mixin.scss';
  .e-grid {
    margin-bottom: 24px;
  }
  .card-header {
    .title {
      color: #000;
      font-weight: bold;
      font-size: 16px;
    }
  }
  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
  }
  :deep(.el-card) {
    width: 100%;
    height: 100%;

    .el-card__body {
      height: calc(100% - 40px);
    }
  }
  .e-grid {
    margin-bottom: 20px;
  }
  .count-container {
    height: 150px;
  }
  .compare {
    margin-bottom: 8px;
    .compare-text1 {
      color: #8c8c8c;
      font-size: 12px;
    }
    .compare-text2 {
      color: #ff3030;
      font-size: 12px;
    }
    .text-color {
      color: #1ad370;
    }
  }
  .deal-container {
    @include self-md-lg(height, 400px, 540px);
    :deep(.el-card__body) {
      display: flex;
      flex-direction: column;
    }
    :deep(.is-bordered) {
      margin: 0;
    }
  }
</style>
