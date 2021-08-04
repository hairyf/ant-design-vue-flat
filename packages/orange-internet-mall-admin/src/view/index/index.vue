<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-02-25 18:09:04
 * @LastEditTime: 2021-05-06 15:37:01
 * @Description: 首页
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <el-row :gutter="20" ref="indexContainerEl">
    <el-col
      :lg="isComplete ? '20' : '24'"
      :sm="isComplete ? '20' : '24'"
      :xs="isComplete ? '20' : '24'"
    >
      <el-row :gutter="20">
        <!-- 统计 -->
        <el-col :xs="12" :sm="{ span: '4_8' }">
          <el-card shadow="never" class="e-grid count-container">
            <count-item icon="delivered" title="待发货订单" :count="overviewData.awaitShipments" />
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="{ span: '4_8' }">
          <el-card shadow="never" class="e-grid count-container">
            <count-item icon="rights" title="维权订单" :count="overviewData.rightsOrder" />
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="{ span: '4_8' }">
          <el-card shadow="never" class="e-grid count-container">
            <count-item icon="number-goods" title="商品总数/件" :count="overviewData.totleGoods" />
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="{ span: '4_8' }">
          <el-card shadow="never" class="e-grid count-container">
            <count-item icon="total" title="售馨商品/件" :count="overviewData.sellOutGoods" />
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="{ span: '4_8' }">
          <el-card shadow="never" class="e-grid count-container">
            <count-item
              v-if="overviewData.userNum"
              icon="number-member"
              title="总会员数/人"
              :count="overviewData.userNum.totleUser"
            >
              <template #tips>
                对比昨日增加
                <span style="color: var(--color-primary)">{{
                  overviewData.userNum.yesterdayUser
                }}</span>
                人
              </template>
            </count-item>
          </el-card>
        </el-col>
        <!-- 成交 -->
        <el-col :sm="{ span: '14_4' }">
          <el-card shadow="never" class="e-grid deal-container">
            <div class="card-header">
              <span class="title">成交总数</span>
              <div class="time-select-container oe-flex oe-row-between">
                <div></div>
                <div class="time-select">
                  <el-radio-group
                    v-model="dealCurrentTime"
                    size="mini"
                    @change="getOverviewDetails"
                  >
                    <el-radio label="month" border>月</el-radio>
                    <el-radio label="week" border>周</el-radio>
                    <!-- <el-radio label="day" border>日</el-radio> -->
                  </el-radio-group>
                </div>
              </div>
            </div>
            <v-charts autoresize class="oe-flex-1" :option="dealGhlOpts" />
          </el-card>
        </el-col>
        <!-- 订单 -->
        <el-col :sm="{ span: '9_2' }">
          <el-card shadow="never" class="e-grid order-container">
            <div class="card-header">
              <span class="title">订单统计</span>
              <div class="time-select-container oe-flex oe-row-between">
                <div></div>
                <div class="time-select">
                  <el-radio-group v-model="statisticsTime" size="mini" @change="getOverviewDetails">
                    <el-radio label="month" border>月</el-radio>
                    <el-radio label="week" border>周</el-radio>
                    <!-- <el-radio label="day" border>日</el-radio> -->
                  </el-radio-group>
                </div>
              </div>
            </div>
            <v-charts autoresize class="oe-flex-1" :option="orderGhlOpts" />
          </el-card>
        </el-col>
      </el-row>
    </el-col>
    <el-col :lg="4" :sm="4" :xs="4" v-if="!isComplete">
      <!-- 配置 -->
      <el-card shadow="never" class="e-grid info-container">
        <div class="card-header">
          <span class="title">配置信息</span>
        </div>
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in configureList"
            :key="index"
            :icon="item.highlight == true ? item.icon : ''"
            :color="item.highlight == true ? '' : '#E4E7ED'"
            @click="router.push(item.url)"
          >
            {{ item.val }}
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </el-col>
    <el-col :lg="24">
      <el-row :gutter="20">
        <!-- 访问 -->
        <el-col :sm="{ span: '14_4' }">
          <el-card shadow="never" class="e-grid visit-container">
            <div class="card-header">
              <span class="title">店铺访问量</span>
              <div class="time-select-container oe-flex oe-row-between">
                <div class="tips"></div>
                <div class="time-select">
                  <el-radio-group
                    v-model="visitsCurrentTime"
                    size="mini"
                    @change="getOverviewDetails"
                  >
                    <el-radio label="month" border>月</el-radio>
                    <el-radio label="week" border>周</el-radio>
                    <!-- <el-radio label="day" border>日</el-radio> -->
                  </el-radio-group>
                </div>
              </div>
            </div>
            <v-charts autoresize class="oe-flex-1" :option="visitGhlOpts" />
          </el-card>
        </el-col>
        <el-col :sm="{ span: '9_2' }">
          <el-row :gutter="20">
            <!-- 销售 -->
            <el-col>
              <el-card shadow="never" class="e-grid sale-container">
                <div class="card-header">
                  <span class="title">商品销售TOP</span>
                  <span class="tips">全部排行</span>
                </div>
                <div class="ranking-container oe-flex-1 oe-flex">
                  <div
                    class="ranking-item oe-flex oe-row-between"
                    v-for="(item, index) in overviewData.goodsMarket"
                    :key="Number(index)"
                  >
                    <div class="oe-flex">
                      <img
                        class="icon"
                        :src="`/custom-assets/images/icon/ranking-${Number(index) + 1}.png`"
                      />
                      <el-image class="shop" :src="item.goods_image" fit="cover" />
                      <span class="text title-text">{{ item.goods_title }}</span>
                    </div>
                    <span class="text oe-flex-1 oe-text-right" style="white-space: nowrap"
                      >{{ item.totle_num }}件</span
                    >
                  </div>
                </div>
              </el-card>
            </el-col>
            <!-- 营销 -->
            <el-col>
              <el-card shadow="never" class="e-grid mark-container">
                <div class="card-header">
                  <span class="title">常用功能</span>
                  <!-- <span class="tips">全部应用</span> -->
                </div>
                <el-row class="card-content oe-flex-1" :gutter="20">
                  <el-col class="mark-item" :xs="3" :sm="3">
                    <div
                      style="cursor: pointer"
                      @click="
                        router.push({
                          path: '/commodity/addGoods',
                          query: {
                            id: -1
                          }
                        })
                      "
                    >
                      <!-- <img class="icon" src="/custom-assets/images/icon/application/commodity.png" alt="" /> -->
                      <i class="ad-add-product-home-page icon"></i>
                      <div class="title">新增商品</div>
                    </div>
                  </el-col>
                  <el-col class="mark-item" :xs="3" :sm="3">
                    <div style="cursor: pointer" @click="router.push('/shop/my-shop')">
                      <!-- <img class="icon" src="/custom-assets/images/icon/application/shop.png" alt="" /> -->
                      <i class="ad-personal-stores icon"></i>
                      <div class="title">我的店铺</div>
                    </div>
                  </el-col>
                  <el-col class="mark-item" :xs="3" :sm="3">
                    <div style="cursor: pointer" @click="router.push('/commodity/recycle-bin')">
                      <!-- <img class="icon" src="/custom-assets/images/icon/application/batch.png" alt="" /> -->
                      <i class="ad-batch icon"></i>
                      <div class="title">批量操作</div>
                    </div>
                  </el-col>
                  <el-col class="mark-item" :xs="3" :sm="3">
                    <div style="cursor: pointer" @click="router.push('/commodity/classification')">
                      <!-- <img class="icon" src="/custom-assets/images/icon/application/batch.png" alt="" /> -->
                      <i class="ad-classification icon"></i>
                      <div class="title">商品分类</div>
                    </div>
                  </el-col>
                  <el-col class="mark-item" :xs="3" :sm="3">
                    <div style="cursor: pointer" @click="router.push('/finance/revenue')">
                      <!-- <img class="icon" src="/custom-assets/images/icon/application/batch.png" alt="" /> -->
                      <i class="ad-Finance icon"></i>
                      <div class="title">财务营收</div>
                    </div>
                  </el-col>
                  <el-col class="mark-item" :xs="3" :sm="3">
                    <div style="cursor: pointer" @click="router.push('/member/member-profile')">
                      <!-- <img class="icon" src="/custom-assets/images/icon/application/member.png" alt="" /> -->
                      <i class="ad-member-profile icon"></i>
                      <div class="title">会员概览</div>
                    </div>
                  </el-col>
                  <el-col class="mark-item" :xs="3" :sm="3">
                    <div style="cursor: pointer" @click="router.push('/application/index')">
                      <!-- <img class="icon" src="/custom-assets/images/icon/application/application.png" alt="" /> -->
                      <i class="ad-application1 icon"></i>
                      <div class="title">应用</div>
                    </div>
                  </el-col>
                  <el-col class="mark-item" :xs="3" :sm="3">
                    <div
                      style="cursor: pointer"
                      @click="router.push('/system/employeeAuthority/staff-list')"
                    >
                      <!-- <img class="icon" src="/custom-assets/images/icon/application/application.png" alt="" /> -->
                      <i class="ad-Staff-management icon"></i>
                      <div class="title">员工管理</div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <!-- <el-col :lg="4">
      <el-row :gutter="20">
        客服
        <el-col>
          <el-card shadow="never" class="e-grid service-container">
            <div class="card-header">
              <span class="title">在线客服</span>
            </div>
            <div class="info" v-for="(item, index) in 16" :key="index">
              <template v-if="index < 5">
                <div class="title-time oe-flex oe-row-between">
                  <div class="title">帕丁顿熊</div>
                  <div class="time">14:32</div>
                </div>
                <div class="content">活动已经优惠很多了，很多了...</div>
              </template>
            </div>
            <div class="open-all">
              <span class="text">查看所有通知</span>
              <i class="icon">&#xe63d;</i>
            </div>
          </el-card>
        </el-col>
        公告
        <el-col>
          <el-card shadow="never" class="e-grid notice-container">
            <div class="card-header">
              <span class="title">公告通知</span>
            </div>
            <div class="info">
              <div class="title-time oe-flex oe-row-between">
                <div class="title">帕丁顿熊</div>
                <div class="time">14:32</div>
              </div>
              <div class="content">活动已经优惠很多了，很多了...</div>
            </div>
            <div class="open-all">
              <span class="text">查看所有通知</span>
              <i class="icon">&#xe63d;</i>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col> -->
  </el-row>
</template>
<script lang="ts" setup>
  import { useGridDetector } from '@/hooks/use-grid-detector'
  import { reqHomePageOverview, reqConfigurationInformation } from '@/api/common'
  import * as Echarts from 'echarts'
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  // 当前容器元素
  const indexContainerEl = ref<HTMLElement>()
  // 当前成交时间
  const dealCurrentTime = ref('week')
  // 当前店铺访问量时间
  const visitsCurrentTime = ref('week')
  // 当前订单统计的时间
  const statisticsTime = ref('week')
  // 详情数据
  const overviewData = ref<any>({})
  // 监听栅格尺寸
  const gridType = useGridDetector()
  // 配置数组
  const configureList = ref([
    {
      val: '短信接口配置',
      url: '/system/other-settings/SMS-configuration',
      text: 'AliDaYu',
      icon: 'ad-complete1'
    },
    {
      val: '渠道配置',
      text: 'channel',
      url: '/v7channel/v7channelManagement',
      icon: 'ad-complete1'
    },
    {
      val: '物流接口配置',
      url: '/system/logisticsDistribution/logistics-setting',
      text: 'logistics',
      icon: 'ad-complete1'
    },
    {
      val: '支付接口配置',
      url: '/system/paymentManagement/new-payment-template',
      text: 'payType',
      icon: 'ad-complete1'
    },
    {
      val: '邮箱配置',
      url: '/system/other-settings/mailbox-settings',
      text: 'email',
      icon: 'ad-complete1'
    },
    {
      val: 'CDN存储配置',
      url: '/system/other-settings/CDN-configure',
      text: 'oss',
      icon: 'ad-complete1'
    },
    {
      val: '上传商品',
      url: '/commodity/addGoods?id=-1',
      text: 'goods',
      icon: 'ad-complete1'
    },
    {
      val: '店铺装修',
      url: '/shop/my-shop',
      text: 'shopDiy',
      icon: 'ad-complete1'
    },
    {
      val: '进行小程序/公众号配置',
      url: '/v7channel/v7channelManagement',
      text: 'wechat',
      icon: 'ad-complete1'
    }
  ]) as any
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
  const isComplete = ref(false)

  // 成交总量图形配置
  const dealGhlOpts = ref<Echarts.EChartsCoreOption>({
    ...baseGhlOpts,
    tooltip: {
      trigger: 'axis',
      formatter: '{c}元<br/>'
    },
    grid: {
      top: '5%',
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
        data: [],
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
  // 订单统计图像配置
  const orderGhlOpts = ref<Echarts.EChartsCoreOption>({
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      top: '15%',
      left: '3%',
      right: '3%',
      bottom: '0%',
      containLabel: true
    },
    color: ['#5B8FF9', '#61DDAA', '#65789B', '#F6BD16'],
    xAxis: {
      boundaryGap: false,
      data: ['2月14日', '2月14日', '2月14日', '2月14日', '2月14日', '2月14日', '2月14日']
    },
    // yAxis: {
    //   type: 'value'
    // },
    legend: {
      data: ['已成交', '待发货', '待收货'],
      left: 'left',
      padding: [12, 0]
    },
    series: [
      { name: '已成交', data: [120, 132, 101, 134, 90, 230, 210], type: 'line', showSymbol: false },
      {
        name: '待发货',
        data: [150, 232, 201, 154, 190, 330, 410],
        type: 'line',
        showSymbol: false
      },
      { name: '待收货', data: [320, 332, 301, 334, 390, 330, 320], type: 'line', showSymbol: false }
    ]
  }) as any
  // 店铺访问量图像配置
  const visitGhlOpts = ref<Echarts.EChartsCoreOption>({
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      top: '15%',
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    legend: {
      left: 'left',
      data: ['会员数'],
      padding: [5, 0]
    },
    xAxis: {
      type: 'category',
      data: []
    },
    series: [
      // {
      //   name: '游客',
      //   type: 'bar',
      //   itemStyle: {
      //     color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //       {
      //         offset: 0,
      //         color: 'rgba(57,161,244,1)'
      //       },
      //       {
      //         offset: 1,
      //         color: 'rgba(57,161,244,0.3)'
      //       }
      //     ])
      //   },
      //   data: [18203, 23489, 29034, 104970, 131744, 630230]
      // },
      {
        // name: '会员数',
        type: 'bar',
        color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(33,223,203,1)'
          },
          {
            offset: 1,
            color: 'rgba(33,223,203,0.3)'
          }
        ]),
        data: []
      }
    ]
  }) as any
  const getOverviewDetails = async () => {
    const { data } = await reqHomePageOverview({
      order_money_time: dealCurrentTime.value,
      shop_visitor_volume: visitsCurrentTime.value,
      order_num_time: statisticsTime.value
    })
    overviewData.value = data.data
    dealGhlOpts.value.xAxis.data = Object.keys(overviewData.value.makeBargainNum)
    dealGhlOpts.value.series[0].data = Object.values(overviewData.value.makeBargainNum)
    visitGhlOpts.value.xAxis.data = Object.keys(overviewData.value.shopVisitorVolume)
    visitGhlOpts.value.series[0].data = Object.values(overviewData.value.shopVisitorVolume)
    orderGhlOpts.value.xAxis.data = Object.keys(overviewData.value.orderStatistics.staydeliverGoods)
    orderGhlOpts.value.series[0].data = Object.values(overviewData.value.orderStatistics.traded)
    orderGhlOpts.value.series[1].data = Object.values(
      overviewData.value.orderStatistics.staydeliverGoods
    )
    orderGhlOpts.value.series[2].data = Object.values(
      overviewData.value.orderStatistics.staytakeDeliveryGoods
    )
  }
  const getConfigurationInformation = async () => {
    const { data } = await reqConfigurationInformation()
    configureList.value.forEach((item: any) => {
      item.highlight = false
      for (const key in data.data) {
        if (item.text == key) {
          item.highlight = data.data[key]
        }
      }
    })
    isComplete.value = configureList.value.some((item: any) => {
      if (item.highlight == true) {
        return true
      }
    })
  }
  onMounted(() => {
    getOverviewDetails()
    getConfigurationInformation()
  })
</script>
<style lang="scss" scoped>
  @import '@/style/class.scss';
  @import '@/style/mixin.scss';

  .card-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;

    .title {
      font-weight: bold;
      font-size: 16px;
    }

    .icon {
      font-size: 15px;
      color: #8c8c8c;
    }

    .tips {
      font-size: 12px;
      color: #c8c8c8;
    }
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

  /* 统计 */
  .count-container {
    height: 130px;
  }

  /* 成交 */
  .deal-container {
    height: 431px;
    :deep(.el-card__body) {
      display: flex;
      flex-direction: column;
    }
  }

  .time-select-container {
    .time-select {
      display: flex;
      align-items: center;
    }

    .tips {
      font-size: 12px;
      color: #8c8c8c;
    }

    :deep(.el-date-editor) {
      width: 230px;
      height: 30px;

      .el-input__icon {
        line-height: 25px;
      }

      .el-range-separator {
        line-height: 23px;
      }
    }

    :deep(.el-radio-group) {
      margin-left: 25px;

      .el-radio--mini {
        margin-right: 0;
      }
    }
  }

  /* 订单 */
  .order-container {
    height: 431px;
    :deep(.el-card__body) {
      display: flex;
      flex-direction: column;
    }
  }

  /* 配置 */
  .info-container {
    @include self-md-lg(height, auto, 581px);

    :deep(.el-card__body) {
      // @include self-md-lg(overflow-x, auto, visible);
      display: flex;
      flex-direction: column;
    }

    .steps-container {
      @include self-md-lg(margin-bottom, 0, 25px);

      overflow-y: hidden;

      :deep(.el-scrollbar__view) {
        height: 100%;
      }

      .el-steps {
        cursor: pointer;
        @include self-md-lg(min-width, 1000px, auto);
        @include self-md-lg(padding-bottom, 35px, 0);
      }
    }

    .card-header {
      margin-bottom: 25px;
    }
  }

  /* 访问 */
  .visit-container {
    height: 438px;

    :deep(.el-card__body) {
      display: flex;
      flex-direction: column;
    }
  }

  /* 销售 */
  .sale-container {
    height: 209px;

    :deep(.el-card__body) {
      display: flex;
      flex-direction: column;
    }

    .ranking-container {
      flex-direction: column;
      margin-top: 15px;
      .title-text {
        flex: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }

    .ranking-item {
      width: 100%;
      margin-bottom: 13px;
      .icon {
        width: 24px;
        height: 24px;
      }

      .shop {
        margin: 0 10px;
        width: 32px;
        height: 32px;
      }

      .text {
        font-size: 14px;
        color: #000;
      }
    }
  }

  /* 营销 */
  .mark-container {
    @include self-xs-sm(height, 150px, 209px);

    :deep(.el-card__body) {
      display: flex;
      flex-direction: column;
    }

    .mark-item {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      .icon {
        @include self-adaption(
          $attr: font-size,
          $xs: 50px,
          $sm: 50px,
          $md: 50px,
          $lg: 70px,
          $xl: 72px
        );
        @include self-adaption(
          $attr: height,
          $xs: 50px,
          $sm: 50px,
          $md: 50px,
          $lg: 70px,
          $xl: 72px
        );
        color: var(--color-primary);
        margin-bottom: 10px;
      }

      .title {
        @include self-font-size(14px);
      }
    }
  }

  /* 客服/公告 */
  .service-container,
  .notice-container {
    position: relative;
    @include self-md-lg(height, 400px, 438px);
    :deep(.el-card__body) {
      @include self-md-lg(height, 400px, 438px);
    }

    .title-time {
      margin-bottom: 10px;
    }

    .title {
      font-size: 16px;
      color: #000;
    }

    .time,
    .content {
      font-size: 12px;
      color: #8c8c8c;
    }

    .content {
      margin-bottom: 30px;
    }

    .open-all {
      position: absolute;
      left: 50%;
      bottom: 20px;
      transform: translateX(-50%);
      text-align: center;
      font-size: 12px;
      color: var(--color-primary);

      .icon {
        margin-left: 5px;
        font-size: 14px;
      }
    }
  }

  /* 公告 */
  .bg-purple {
    background: #d3dce6;
  }
  :deep(.el-timeline-item__node--normal) {
    left: -7px;
    width: 24px;
    height: 24px;
  }
  :deep(.el-timeline-item__wrapper) {
    top: 3px;
  }
  :deep(.el-timeline) {
    padding: 0;
  }
  :deep(.el-timeline-item) {
    cursor: pointer;
    padding-bottom: 34px;
  }
  :deep(.el-timeline-item__icon) {
    font-size: 28px;
    color: var(--color-primary);
  }
  .grid-container {
    border-radius: 4px;
  }
</style>
