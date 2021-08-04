<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-15 18:44:07
 * @LastEditTime: 2021-05-26 14:20:51
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="admi-page">
    <!-- 数据统计 -->
    <div class="statistics-counts">
      <div class="header-container u-flex u-row-between">
        <div class="title">数据统计</div>
        <div class="time-container" @click="onShowimeType">
          <span class="time-tips u-margin-right-10">{{
            currentTimeLabel
          }}</span>
          <u-icon name="arrow-down" size="25"></u-icon>
        </div>
      </div>
      <div class="body-container">
        <common-progress
          v-for="(item, index) in detail.join"
          :key="index"
          :title="item.name"
          :tips="item.price + '元/' + item.count + '笔'"
          :color="item.color"
          :actual="item.percentage"
          :increase="Number(item.percentage) + 10"
        />
      </div>
    </div>
    <!-- 财务统计 -->
    <div class="finance-counts">
      <div class="header-container">财务统计</div>
      <div class="tabs-container">
        <u-tabs
          :list="graphicalTypes"
          :is-scroll="false"
          :current="currentGraphicalType"
          active-color="#FF7E5F"
          @change="onToggleType"
        ></u-tabs>
      </div>
      <div class="charts-container">
        <div
          :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
        >
          <canvas
            canvas-id="canvas"
            id="canvas"
            class="charts-canvas"
            v-if="!timeSelectShow"
            :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
          />
        </div>
        <div class="tips">
          {{
            currentGraphicalType == 0 ? detail.join_total : detail.out.amount
          }}
          元
        </div>
        <div class="btns u-text-center u-m-t-30">
          <u-tag
            @click="$navigateTo('/pages/admins/financeCounts')"
            text="查看详情"
            mode="dark"
            shape="circle"
          />
        </div>
      </div>
    </div>
    <!-- 其他操作选项 -->
    <div class="options">
      <u-cell-item
        @click="$navigateTo('/pages/admins/billAdmins')"
        bg-color="#ffffff"
        title="账单管理"
      />
      <u-cell-item
        @click="$navigateTo('/pages/admins/houseAdmins')"
        bg-color="#ffffff"
        title="管理房源"
      />
      <u-cell-item
        @click="$navigateTo('/pages/admins/package')"
        bg-color="#ffffff"
        title="套餐管理"
      />
      <u-cell-item
        @click="$navigateTo('/pages/admins/housingAudit')"
        bg-color="#ffffff"
        title="房源审核"
      />
      <u-cell-item
        @click="$navigateTo('/pages/admins/realAudit')"
        bg-color="#ffffff"
        title="实名审核"
      />
      <u-cell-item
        @click="
          $navigateTo('/pages/commons/guarantees', {
            type: 'admin',
          })
        "
        bg-color="#ffffff"
        title="工单处理"
      />
      <u-cell-item
        @click="$navigateTo('/pages/admins/delayAdmins')"
        bg-color="#ffffff"
        title="延期管理"
      />
    </div>
    <u-select
      v-model="timeSelectShow"
      :list="timeTypes"
      @confirm="onToggleTimeType"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Ucharts from '@/libs/u-charts';
import { reqAdminCounts } from '@/api';
export default Vue.extend({
  components: {},
  data: () => ({
    // 图像表类型
    graphicalTypes: [
      { id: 0, name: '收入' },
      { id: 1, name: '支出' },
    ],
    currentGraphicalType: 0,

    // 时间筛选类型
    timeTypes: [
      { value: 'today', label: '今日' },
      { value: 'yesterday', label: '昨天' },
      { value: 'week', label: '本周' },
    ],
    timeSelectShow: false,
    currentTimeId: 'today',
    currentTimeLabel: '今日',

    // 图像数据
    canvasWidth: uni.upx2px(685),
    canvasHeight: uni.upx2px(500),
    pixelRatio: Vue.prototype.$systemInfo.pixelRatio as number,

    // 切换类型是否运行切换图像类型(防止图像闪烁)
    allowToggleType: false,

    // 详情信息
    detail: {} as any,

    // 是否正在请求更新数据, 用于隐藏时是否进行重新更新图像
    // 请求中则不需要重新更新图像, 因为需要等待数据完毕
    isUpdate: false,
  }),
  computed: {},
  methods: {
    // 处理时间选择弹出/隐藏
    onShowimeType() {
      this.timeSelectShow = !this.timeSelectShow;
    },
    // 处理时间选择
    async onToggleTimeType(ev: [{ value: string; label: string }]) {
      this.isUpdate = true;
      this.currentTimeId = ev[0].value;
      this.currentTimeLabel = ev[0].label;
      await this.initDetail();
      this.updateGraphical();
      this.isUpdate = true;
    },
    // 切换图像类型
    onToggleType(index: number) {
      if (!this.allowToggleType) {
        return false;
      }
      this.allowToggleType = false;
      setTimeout(() => (this.allowToggleType = true), 1200);
      this.currentGraphicalType = index;
    },
    // 展示饼图圆环图
    async onShowPieGraphical() {
      await this.$nextTick();
      new Ucharts({
        canvasId: 'canvas',
        $this: this,
        pixelRatio: 1,
        width: this.canvasWidth,
        height: this.canvasHeight,
        type: 'ring',
        animation: true,
        fontSize: 11,
        disablePieStroke: true,
        dataLabel: true,
        colors: ['#78B4FB', '#5A64E8', '#5ED0B3', '#FF7E5F', '#FE5CA8'],
        title: {
          color: '#FF7E5F',
          fontSize: 15,
        },
        padding: [0, 0, 0, 0],
        series: this.detail.series,
        legend: {
          // show: false,
          lineHeight: 20,
          position: 'bottom',
        },
        extra: {
          pie: {
            offsetAngle: -45,
            ringWidth: 20,
            labelWidth: 15,
          },
        },
      });
    },
    // 展示进度条
    async onShowArcbarGraphical() {
      await this.$nextTick();
      new Ucharts({
        canvasId: 'canvas',
        $this: this,
        pixelRatio: 1,
        width: this.canvasWidth,
        height: this.canvasHeight,
        animation: true,
        fontSize: 11,
        type: 'arcbar',
        padding: [500, 500, 500, 500],
        colors: ['#FEB47B'],
        title: {
          name: this.detail.out_percentage + '%',
          color: '#000000',
          fontSize: 35,
        },
        series: [
          {
            name: '支出收入比',
            data: this.detail.out_percentage / 100,
            color: '#FEB47B',
          },
        ],
        extra: {
          arcbar: {
            type: 'circle',
          },
        },
      });
    },
    // 初始化获取数据
    async initDetail() {
      const { data } = await reqAdminCounts(this.currentTimeId);
      data.series = data.join.map((item: any) => ({
        name: item.name,
        data: Number(item.percentage),
      }));
      this.detail = data;
    },
    // 更新|初始化图形表
    updateGraphical() {
      this.currentGraphicalType == 0 && this.onShowPieGraphical();
      this.currentGraphicalType == 1 && this.onShowArcbarGraphical();
    },
  },
  watch: {
    currentGraphicalType() {
      this.updateGraphical();
    },
    timeSelectShow() {
      !this.timeSelectShow && !this.isUpdate && this.updateGraphical();
    },
  },

  // 页面周期函数--监听页面加载
  async onLoad() {
    await this.initDetail();
    this.updateGraphical();
    setTimeout(() => (this.allowToggleType = true), 1200);
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
    // shutdown -s -t 10800
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
});
</script>

<style lang="scss">
@include full-page(admi-page);
/* 数据统计 */
.statistics-counts,
.finance-counts {
  margin: 18rpx 0;
  padding: 20rpx 32rpx;
  background-color: #ffffff;
  .header-container {
    margin-bottom: 36rpx;
  }
  .body-container {
    .progress-contaliner {
      margin-bottom: 20rpx;
    }
  }
}
/* 财务统计 */
.finance-counts {
  .header-container {
    margin-bottom: 0 !important;
  }
  .tabs-container {
    margin: 0 auto;
    width: 300rpx;
  }
  .charts-container,
  .charts-canvas {
    background-color: #ffffff;
    margin: 0 auto;
  }
  .charts-container {
    min-height: 600rpx;
    .tips {
      margin-top: 15rpx;
      text-align: center;
      color: #ff7e5f;
    }
  }
}
.options {
  background-color: #ffffff;
  margin-bottom: 100rpx;
}
</style>
