<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-22 14:00:27
 * @LastEditTime: 2021-01-25 10:37:52
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="life-counts">
    <div class="house-type u-flex" @click="houseSelectShow = true">
      <span class="u-m-r-15">{{ currentHouse.label }}</span>
      <u-icon name="arrow-down" size="20" />
    </div>
    <div class="navi-container u-flex">
      <div
        class="navi-item"
        v-for="(item, index) in navis"
        :key="index"
        @click="currentNavi = index"
        :style="{
          'background-color': currentNavi === index ? '#FF7E5F' : '#ffffff',
        }"
      >
        <div
          class="title"
          :style="{ color: currentNavi === index ? '#ffffff' : '' }"
        >
          {{ item.title }}
        </div>
        <div
          class="price"
          :style="{ color: currentNavi === index ? '#ffffff' : '' }"
        >
          {{ item.count }} 元
        </div>
        <div
          class="tips"
          :style="{ color: currentNavi === index ? '#ffffff' : '' }"
        >
          总计
        </div>
      </div>
    </div>
    <div class="life-counts-list">
      <u-time-line v-if="list.length">
        <u-time-line-item
          nodeTop="2"
          v-for="(item, index) in list"
          :key="index"
        >
          <!-- 此处自定义了左边内容，用一个图标替代 -->
          <div
            v-if="index == 0"
            slot="node"
            class="u-node"
            style="background: #ff7e5f"
          />
          <div class="life-item-content" slot="content">
            <!-- 水费 -->
            <template v-if="item.type == 1">
              <div class="header-cotnent u-m-b-10 u-flex u-row-between">
                <div class="left-column">
                  <span class="title">十二月缴纳水费</span>
                  <span class="price">{{ item.after }}元</span>
                </div>
                <div class="right-column">
                  <span class="times">{{ $format(item.createtime) }}</span>
                </div>
              </div>
              <div class="tips">十二月用水量{{ item.variable }}吨</div>
            </template>
            <!-- 电费 -->
            <template v-if="item.type == 2">
              <div class="header-cotnent u-m-b-10 u-flex u-row-between">
                <div class="left-column">
                  <span class="title">十二月缴纳电费</span>
                  <span class="price">{{ item.after }}元</span>
                </div>
                <div class="right-column">
                  <span class="times">{{ $format(item.createtime) }}</span>
                </div>
              </div>
              <div class="tips">十二月用电量{{ item.variable }}度</div>
            </template>
            <!-- 燃气 -->
            <template v-if="item.type == 3">
              <div class="header-cotnent u-m-b-10 u-flex u-row-between">
                <div class="left-column">
                  <span class="title">十二月缴纳燃气费</span>
                  <span class="price">{{ item.after }}元</span>
                </div>
                <div class="right-column">
                  <span class="times">{{ $format(item.createtime) }}</span>
                </div>
              </div>
              <div class="tips">十二月用气量{{ item.variable }}方</div>
            </template>
            <!-- 其他月付 -->
            <template v-if="item.type == 4">
              <div class="header-cotnent u-m-b-10 u-flex u-row-between">
                <div class="left-column">
                  <span class="title">缴纳费用</span>
                  <span class="price">{{ item.after }}元</span>
                </div>
                <div class="right-column">
                  <span class="times">{{ $format(item.createtime) }}</span>
                </div>
              </div>
              <div class="tips">缴纳费用{{ item.after }}元</div>
            </template>
            <!-- 房租 -->
            <template v-if="item.type == 5">
              <div class="header-cotnent u-m-b-10 u-flex u-row-between">
                <div class="left-column">
                  <span class="title">十二月缴纳房租</span>
                  <span class="price">{{ item.after }}元</span>
                </div>
                <div class="right-column">
                  <span class="times">{{ $format(item.createtime) }}</span>
                </div>
              </div>
              <div class="tips">十二月房租{{ item.after }}元</div>
            </template>
            <!-- 押金 -->
            <template v-if="item.type == 6">
              <div class="header-cotnent u-m-b-10 u-flex u-row-between">
                <div class="left-column">
                  <span class="title">缴纳押金</span>
                  <span class="price">{{ item.after }}元</span>
                </div>
                <div class="right-column">
                  <span class="times">{{ $format(item.createtime) }}</span>
                </div>
              </div>
              <div class="tips">押金{{ item.after }}元</div>
            </template>
          </div>
        </u-time-line-item>
      </u-time-line>
      <u-empty v-if="!list.length" text="暂无统计信息" mode="list" />
    </div>
    <u-select
      v-model="houseSelectShow"
      :list="houses"
      @confirm="onHouseSelect"
    />
  </div>
</template>

<script lang="ts">
import { reqLifeCounts, reqMyHouseList, reqStatisticsTotle } from '@/api';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    // 房源选择
    houses: [] as any[],
    currentHouse: {
      value: '' as Key,
      label: '暂无房源',
    },
    houseSelectShow: false,

    navis: [
      { id: 1, title: '水费', count: '2300.12' },
      { id: 2, title: '电费', count: '2300.12' },
      { id: 3, title: '燃气费', count: '2300.12' },
      { id: 4, title: '其它', count: '2300.12' },
      { id: 5, title: '房租', count: '2300.12' },
      { id: 6, title: '押金', count: '2300.12' },
    ],
    currentNavi: 0,

    // 分页参数
    list: [] as any[],
    page: 1,
    limit: 10,
    isEnd: false,
  }),
  computed: {},
  methods: {
    // 处理房源选择
    onHouseSelect(ev: [{ value: Key; label: string }]) {
      if (!ev?.[0]) return false;
      this.currentHouse = ev[0];
      this.initNaviCount();
      this.resetList();
    },
    // 初始化房源选择
    async initMyHouses() {
      const { data } = await reqMyHouseList();
      this.houses = data.map((item) => ({
        value: item.order_id,
        label: item.name,
      }));
      this.onHouseSelect(this.houses as any);
    },
    // 初始化价格统计
    async initNaviCount() {
      const { data } = await reqStatisticsTotle(this.currentHouse.value);
      this.navis = data.map((item) => {
        return {
          id: item.type,
          title: item.name,
          count: item.count,
        };
      });
    },
    // 重置列表
    async resetList() {
      this.page = 1;
      this.isEnd = false;
      this.list = await this.getList();
    },
    // 获取列表项
    async getList() {
      try {
        const { data } = await reqLifeCounts({
          order_id: this.currentHouse.value,
          type: this.navis[this.currentNavi].id,
          page: this.page,
          limit: this.limit,
        });
        return data.data;
      } catch (error) {
        return [];
      }
    },
    // 加载下一页
    async onNextList() {
      if (this.isEnd) return false;
      this.page += 1;
      const list = await this.getList();
      if (!list.length) {
        this.isEnd = true;
        return false;
      }
      this.list = [...this.list, ...list];
    },
  },
  watch: {
    currentNavi() {
      this.resetList();
    },
  },

  // 页面周期函数--监听页面加载
  onLoad() {
    this.initMyHouses();
    this.initNaviCount();
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
@include full-page(life-counts);
.house-type {
  .u-m-r-15 {
    display: inline-block;
    @include text-ellipsis(550rpx);
  }
  font-weight: bold;
  margin-left: 40rpx;
  margin-top: 40rpx;
}
.navi-container {
  justify-content: space-between;
  margin: 40rpx;
  margin-bottom: 0;
  flex-wrap: wrap;
}
.navi-item {
  margin-bottom: 40rpx;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200rpx;
  height: 160rpx;
  border-radius: 10rpx;
  background-color: #ffffff;
  .title {
    margin-bottom: 18rpx;
    font-size: 24rpx;
  }
  .price {
    margin-bottom: 4rpx;
    color: #ff7e5f;
  }
  .tips {
    color: #adadad;
  }
}

.life-counts-list {
  padding: 40rpx;
  background-color: #ffffff;
  .price {
    margin-left: 5rpx;
    color: #ff7e5f;
    font-weight: bold;
  }
  .times {
    font-size: 24rpx;
    color: #adadad;
  }
  .tips {
    font-size: 20rpx;
    color: #adadad;
  }
}

.u-node,
.u-dot {
  width: 44rpx !important;
  height: 44rpx !important;
  border-radius: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d0d0d0;
}
.u-node {
  box-shadow: 0px 0px 20rpx rgba(255, 126, 95, 0.3);
}

.u-order-title {
  color: #333333;
  font-weight: bold;
  font-size: 32rpx;
}

.u-order-desc {
  color: rgb(150, 150, 150);
  font-size: 28rpx;
  margin-bottom: 6rpx;
}

.u-order-time {
  color: rgb(200, 200, 200);
  font-size: 26rpx;
}
</style>
