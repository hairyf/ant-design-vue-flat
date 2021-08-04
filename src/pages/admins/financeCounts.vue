<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-20 15:51:23
 * @LastEditTime: 2021-01-20 16:29:45
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="finance-counts">
    <div class="tabs-container">
      <u-tabs
        :list="types"
        :is-scroll="false"
        :current="currentType"
        active-color="#FF7E5F"
        bg-color="none"
        @change="currentType = $event"
      ></u-tabs>
    </div>
    <div class="navi-container u-flex" v-if="currentType == 0">
      <div
        class="navi-item"
        v-for="(item, index) in navis"
        :key="index"
        @click="currentNavi = index"
        :style="{
          'background-color': currentNavi === index ? item.color : '#ffffff',
        }"
      >
        <div
          class="title"
          :style="{ color: currentNavi === index ? '#ffffff' : '' }"
        >
          {{ item.name }}
        </div>
        <div
          class="price"
          :style="{ color: currentNavi === index ? '#ffffff' : '' }"
        >
          {{ item.price }} 元
        </div>
        <div
          class="tips"
          :style="{ color: currentNavi === index ? '#ffffff' : '' }"
        >
          总计
        </div>
      </div>
    </div>
    <div class="finance-list">
      <div
        class="finance-item u-flex u-border-bottom"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="left-column u-m-r-20">
          <u-tag
            :text="currentType == 0 ? navis[currentNavi].name : '押金'"
            mode="dark"
            :bg-color="currentType == 0 ? navis[currentNavi].color : '#FEB47B'"
          />
        </div>
        <div class="center-column u-flex-1">
          <div class="title u-m-b-5">{{ item.name }}</div>
          <div class="tips">
            时间：{{ $format(item.pay_time || item.applytime) }}
          </div>
        </div>
        <div class="right-column">
          <span class="price">{{ item.amount }}元</span>
        </div>
      </div>
    </div>
    <u-empty
      v-if="!list.length"
      margin-top="120"
      text="暂无统计信息"
      mode="list"
    />
  </div>
</template>

<script lang="ts">
import { reqAdminCounts, reqAftersalesCounts, reqFinanceCounts } from '@/api';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    types: [
      { id: 0, name: '收入' },
      { id: 1, name: '支出' },
    ],
    currentType: 0,
    navis: [
      { type: 1, name: '水费', color: '#FE5CA8', price: '2300.12' },
      { type: 2, name: '电费', color: '#FF7E5F', price: '2300.12' },
      { type: 3, name: '燃气费', color: '#78B4FB', price: '2300.12' },
      { type: 4, name: '其他', color: '#5A64E8', price: '2300.12' },
      { type: 5, name: '房租', color: '#5ED0B3', price: '2300.12' },
      { type: 6, name: '押金', color: '#5ED0B3', price: '2300.12' },
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
    // 初始化获取统计
    async initNavisCount() {
      const { data } = await reqAdminCounts('all');
      this.navis = data.join;
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
        const reqList =
          this.types[this.currentType].id == 0
            ? reqFinanceCounts
            : reqAftersalesCounts;
        const { data } = await reqList({
          type: this.navis[this.currentNavi].type,
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
    currentType() {
      this.resetList();
    },
    currentNavi() {
      this.resetList();
    },
  },

  // 页面周期函数--监听页面加载
  onLoad() {
    this.initNavisCount();
    this.resetList();
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
  onReachBottom() {
    this.onNextList();
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
});
</script>

<style lang="scss">
@include full-page(finance-counts);
.tabs-container {
  margin: 0 auto;
  width: 300rpx;
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
.finance-list {
  padding: 0 40rpx;
  background-color: #ffffff;
}
.finance-item {
  padding: 40rpx 0;
  align-items: flex-start;
  .title {
    @include text-hidden-line(2);
    margin-right: 15rpx;
    font-weight: bold;
  }
  .tips {
    font-size: 24rpx;
    color: #adadad;
  }
  .price {
    font-size: 40rpx;
    font-weight: bold;
    color: #ff7e5f;
  }
}
</style>
