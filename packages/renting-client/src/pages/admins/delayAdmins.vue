<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-20 18:24:57
 * @LastEditTime: 2021-01-27 11:28:33
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="delay-admins">
    <u-tabs
      :list="types"
      :is-scroll="false"
      :current="currentType"
      active-color="#FF7E5F"
      bg-color="none"
      @change="currentType = $event"
    ></u-tabs>
    <u-card
      v-for="(item, index) in list"
      :key="index"
      :show-foot="false"
      :border="false"
      margin="40rpx 32rpx"
    >
      <div class="card-order-head u-flex u-row-between" slot="head">
        <div class="left-column">
          <span class="title">{{ item.item.house.name }}</span>
        </div>
        <div class="right-column">
          <u-tag
            size="mini"
            :text="statusToText(item.item.status)"
            mode="dark"
          />
          <!-- <span class="price">1000元/月</span> -->
        </div>
      </div>
      <div
        class="card-order-body u-flex u-row-between"
        slot="body"
        @click="
          $navigateTo('/pages/orders/orderDetails', {
            type: 'admin',
            order_sn: item.item.order_sn,
          })
        "
      >
        <div class="left-column">
          <div class="title u-m-b-20">{{ item.item_title }}</div>
          <div class="times">
            {{ $format(item.item.createtime) }}
            至
            {{ $format(item.item.createtime) }}
          </div>
        </div>
        <div class="right-column">
          <span class="price u-m-r-20">{{ item.item.amount }} 元</span>
          <u-icon color="#ADADAD" name="arrow-right" />
        </div>
      </div>
    </u-card>
    <u-empty
      v-if="!list.length"
      margin-top="120"
      text="暂无延期列表"
      mode="list"
    />
  </div>
</template>

<script lang="ts">
import { reqDelayList } from '@/api';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    // 当前账单类型
    types: [
      { id: '其他', name: '全部' },
      { id: 'wait', name: '待审核' },
      { id: 'done', name: '已处理' },
    ],
    currentType: 0,

    // 分页参数
    list: [] as any[],
    page: 1,
    limit: 10,
    isEnd: false,
  }),
  computed: {},
  methods: {
    // 状态对应文字
    statusToText(status: 0 | 1 | 2) {
      const strategy = {
        0: '待付款',
        1: '已付款',
        2: '已延期',
      };
      return strategy[status];
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
        const { data } = await reqDelayList({
          status: this.types[this.currentType].id,
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
  },

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.resetList();
  },
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
@include full-page(delay-admins);
.card-order-head {
  .title {
    @include text-ellipsis(300rpx);
    display: inline-block;
    font-size: 28rpx;
    font-weight: bold;
    color: #000000;
  }
  .price {
    margin-left: 10rpx;
    font-size: 24rpx;
    color: #adadad;
  }
}
.card-order-body {
  .title {
    font-size: 28rpx;
    font-weight: bold;
    color: #000000;
  }
  .tips {
    font-size: 20rpx;
    color: #adadad;
  }
  .times {
    font-size: 24rpx;
    color: #adadad;
  }
  .price {
    font-size: 34rpx;
    font-weight: bold;
    color: #ff7e5f;
  }
}
</style>
