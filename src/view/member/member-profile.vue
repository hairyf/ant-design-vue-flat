<!--
 * @Author: Mr.wang
 * @Date: 2021-03-19 14:45:41
 * @LastEditTime: 2021-05-12 14:22:18
 * @Description: 会员概览
 * @LastEditors: Pan.Yu.Lin
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-row :gutter="24">
    <el-col :lg="24">
      <el-row :gutter="24" v-if="overviewDetails.newMembers">
        <el-col :xl="{ span: '4_8' }" :sm="{ span: '4_8' }">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              center="center"
              icon="total-membership"
              title="总会员数/人"
              :count="overviewDetails.userNum.totleUser"
            >
              <!-- <template #tips>总访客数：</template> -->
            </count-item>
          </el-card>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :sm="{ span: '4_8' }">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              center="center"
              icon="newly-member"
              title="今日新增会员"
              :count="overviewDetails.newMembers.totleUser"
            >
              <template #tips>
                对比昨日增加
                <span style="color: var(--color-primary)">{{
                  overviewDetails.newMembers.yesterdayUser
                }}</span>
                人
              </template>
            </count-item>
          </el-card>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :sm="{ span: '4_8' }">
          <el-card shadow="never" class="e-grid count-container active-box">
            <count-item
              center="center"
              icon="active1"
              title="活跃会员数"
              :count="overviewDetails.numberActiveMembers.activeUserNum"
            >
              <template #tips
                >沉默会员数：{{ overviewDetails.numberActiveMembers.silenceUserNum }}</template
              >
            </count-item>
            <el-button type="text" class="adjustment" @click="show = true">调整间隔</el-button>
          </el-card>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :sm="{ span: '4_8' }">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              center="center"
              icon="paying-member"
              title="付款会员数"
              :count="overviewDetails.paymentUser.payuserNum"
            >
              <template #tips
                >无交易会员数：{{ overviewDetails.paymentUser.noPayuserNum }}</template
              >
            </count-item>
          </el-card>
        </el-col>
        <el-col :xl="{ span: '4_8' }" :sm="{ span: '4_8' }">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              center="center"
              icon="balance-member"
              title="有余额会员数"
              :count="overviewDetails.haveBalance.haveBalance"
            >
              <template #tips>无余额会员数：{{ overviewDetails.haveBalance.noBalance }}</template>
            </count-item>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row>
    <el-col :xl="24">
      <el-card shadow="never" class="e-grid deal-container">
        <div class="card-header">
          <span class="container-title">近16日新增会员数</span>
        </div>
        <v-charts class="oe-flex-1" autoresize :option="newlyOpts" />
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="24">
    <el-col :lg="12" :sm="24">
      <el-card shadow="never" class="e-grid deal-container">
        <div class="card-header">
          <span class="container-title">会员等级</span>
        </div>
        <v-charts class="oe-flex-1" autoresize :option="gradeOpts" />
      </el-card>
    </el-col>
    <el-col :lg="12" :sm="24">
      <el-card shadow="never" class="e-grid deal-container">
        <div class="card-header">
          <span class="container-title">会员注册渠道</span>
        </div>
        <v-charts class="oe-flex-1" autoresize :option="channelOpts" />
      </el-card>
    </el-col>
  </el-row>
  <el-dialog title="活跃沉默设置" v-model="show" width="486px">
    <el-form class="silent-box" :model="form" ref="rulesForm" label-width="135px" :rules="rules">
      <el-form-item label="购买产品间隔" prop="productInterval">
        <el-input v-model="form.productInterval">
          <template #append>天</template>
        </el-input>
      </el-form-item>
      <el-form-item label="未购买产品间隔" prop="notPurchased">
        <el-input v-model="form.notPurchased">
          <template #append>天</template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="determineBtn">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { reqMemberProfile, reqModifySilenceSettings, reqSilenceSettings } from '@/api/member'
  import * as Echarts from 'echarts'
  import { ElMessage } from 'element-plus'
  const show = ref(false)
  const form = ref({
    productInterval: '',
    notPurchased: ''
  })
  const rulesForm = ref<any>()
  const rules = ref({
    productInterval: [{ required: true, message: '请输入购买产品间隔', trigger: 'blur' }],
    notPurchased: [{ required: true, message: '请输入未购买产品间隔', trigger: 'blur' }]
  })
  const overviewDetails = ref<any>({})
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
  // 新增会员配置
  const newlyOpts = ref<Echarts.EChartsCoreOption>({
    ...baseGhlOpts,
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>新增会员数 {c}'
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
        showSymbol: true,
        smooth: true
      }
    ]
  }) as any
  // 会员等级图像
  const gradeOpts = ref<Echarts.EChartsCoreOption>({
    ...baseGhlOpts,
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>等级人数 {c}'
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
      data: [],
      axisLabel: {
        interval: 0
      }
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
  // 会员渠道图像
  const channelOpts = ref<Echarts.EChartsCoreOption>({
    ...baseGhlOpts,
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>来源数 {c}'
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
  const getMemberProfile = async () => {
    const { data } = await reqMemberProfile()
    overviewDetails.value = data.data
    newlyOpts.value.xAxis.data = Object.keys(overviewDetails.value.newUser)
    newlyOpts.value.series[0].data = Object.values(overviewDetails.value.newUser)
    const gradeArrX = [] as any[]
    const gradeArrY = [] as any[]
    overviewDetails.value.userLevel.forEach((item: any) => {
      gradeArrX.push(item.level_name)
      gradeArrY.push(item.shop_user_num)
    })
    gradeOpts.value.xAxis.data = gradeArrX
    gradeOpts.value.series[0].data = gradeArrY
    overviewDetails.value.channelUser.forEach((item: any) => {
      channelOpts.value.xAxis.data.push(item.name)
      channelOpts.value.series[0].data.push(item.num)
    })
  }
  // 修改沉默设置
  const determineBtn = () => {
    rulesForm.value.validate(async (valid: boolean) => {
      if (valid) {
        await reqModifySilenceSettings({
          activeValue: form.value.productInterval,
          silenceValue: form.value.notPurchased
        })
        show.value = false
        ElMessage.success('修改成功')
        getSilenceSetting()
      }
    })
  }
  const getSilenceSetting = async () => {
    const { data } = await reqSilenceSettings()
    form.value.productInterval = data.data.activeValue
    form.value.notPurchased = data.data.silenceValue
  }
  onMounted(() => {
    getMemberProfile()
    getSilenceSetting()
  })
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .e-grid {
    margin-bottom: 20px;
  }
  .count-container {
    height: 130px;
  }
  :deep(.icon-container i) {
    margin-right: 0;
  }
  :deep(.el-card) {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    .el-card__body {
      height: calc(100% - 40px);
    }
  }
  .active-box {
    position: relative;
    .adjustment {
      position: absolute;
      right: 5px;
      top: 5px;
    }
  }
  .silent-box {
    padding-top: 20px;
    :deep(.el-form-item__label) {
      line-height: 32px;
      color: #000;
    }
    :deep(.el-input) {
      width: 200px;
    }
    :deep(.el-input-group__append) {
      color: #000;
      line-height: 30px;
      padding: 0 14px;
    }
  }
  .dialog-footer {
    .el-button {
      padding: 0 46px;
      min-height: 32px;
    }
  }

  .deal-container {
    @include self-md-lg(height, 400px, 477px);
    :deep(.el-card__body) {
      display: flex;
      flex-direction: column;
    }
    :deep(.is-bordered) {
      margin: 0;
    }
    .container-title {
      font-weight: bold;
      font-size: 16px;
      color: #000;
    }
  }
</style>
