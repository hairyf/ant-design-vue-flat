<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-14 10:23:31
 * @Description: 会员数据
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
              center="center"
              icon="wastage-rate1"
              title="累计会员数（人）"
              :count="120"
            />
          </el-card>
        </el-col>
        <el-col :lg="6" :sm="6" :xs="6">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              center="center"
              icon="number-visited"
              title="访问会员数（人）"
              :count="12"
            />
          </el-card>
        </el-col>
        <el-col :lg="6" :sm="6" :xs="6">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              center="center"
              icon="paid-members1"
              title="付费会员数（人）"
              :count="120000"
            />
          </el-card>
        </el-col>
        <el-col :lg="6" :sm="6" :xs="6">
          <el-card shadow="never" class="e-grid count-container">
            <count-item center="center" icon="number-members1" title="流失率" :count="12" />
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-card shadow="never" class="member-box">
    <div class="card-header oe-flex">
      <div class="oe-flex oe-row-between" style="width: 100%">
        <div>
          <div class="deal-title">会员增长趋势</div>
          <div class="deal-total-text">单位：人</div>
        </div>
        <div class="time-select oe-flex">
          <el-radio-group v-model="totalSelection" size="mini">
            <el-radio label="1" border>月</el-radio>
            <el-radio label="2" border>周</el-radio>
            <el-radio label="3" border>日</el-radio>
          </el-radio-group>
          <el-date-picker
            v-model="increaseDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <v-charts class="oe-flex-1" autoresize :option="membershipGrowthOpts" />
  </el-card>
</template>
<script setup lang="ts">
  import * as Echarts from 'echarts'
  import { ref, reactive } from 'vue'
  // 年月日
  const totalSelection = ref('')
  // 时间
  const increaseDate = ref('')
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
  // 会员增长趋势图形
  const membershipGrowthOpts = reactive<Echarts.EChartsCoreOption>({
    ...baseGhlOpts,
    grid: {
      top: '10%',
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    color: ['#FF8B00', '#0054FF'],
    xAxis: {
      type: 'category',
      data: ['2月14日', '2月14日', '2月14日', '2月14日', '2月14日', '2月14日', '2月14日']
    },
    legend: {
      data: ['新增会员数', '新增访客数'],
      left: 'right',
      padding: [12, 0]
    },
    series: [
      {
        name: '新增会员数',
        data: [120, 132, 101, 134, 90, 230, 210],
        type: 'line',
        showSymbol: false
      },
      {
        name: '新增访客数',
        data: [220, 182, 191, 234, 290, 330, 310],
        type: 'line',
        showSymbol: false
      }
    ]
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .member-box {
    margin-top: 24px;
    :deep(.is-bordered) {
      margin: 0 5px;
    }
    :deep(.el-card__body) {
      @include self-md-lg(height, 520px, 644px);
      display: flex;
      flex-direction: column;
    }
    .deal-title {
      font-size: 16px;
      color: #000000;
    }
    .deal-total-text {
      margin-top: 20px;
      font-size: 12px;
      color: #8c8c8c;
    }
    :deep(.el-date-editor) {
      margin-left: 30px;
      height: 30px;
      .el-range-separator {
        line-height: 25px;
      }
      .el-icon-date {
        line-height: 25px;
      }
    }
  }
</style>
