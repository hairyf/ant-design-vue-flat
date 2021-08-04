<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-19 18:03:33
 * @LastEditTime: 2021-01-23 15:50:47
 * @Description: 我的账单
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="my-orders">
    <u-tabs
      :list="tabs"
      :is-scroll="false"
      :current="current"
      active-color="#FF7E5F"
      bg-color="#F5F5F5"
      @change="current = $event"
    ></u-tabs>
    <div class="order-list">
      <u-card
        v-for="(item, index) in list"
        :key="index"
        :show-foot="false"
        :border="false"
        margin="40rpx 32rpx"
        @click="
          $navigateTo('/pages/orders/orderDetails', {
            order_sn: item.order_sn,
          })
        "
      >
        <div class="card-order-head u-flex u-row-between" slot="head">
          <div class="title">{{ item.house.name }}</div>
          <div class="status-price">
            <u-tag
              size="mini"
              :text="
                statusToText(item.delay_status == 'yes' ? 3 : item.status).text
              "
              :bg-color="
                statusToText(item.delay_status == 'yes' ? 3 : item.status).color
              "
              mode="dark"
            />
            <span class="price">{{ item.house.price }}元/月</span>
          </div>
        </div>
        <div class="card-order-body u-flex u-row-between" slot="body">
          <div class="left-column">
            <div class="title u-m-b-20">{{ item.item_title }}</div>
            <div class="times">
              {{ $format(item.createtime) }} 至 {{ $format(item.begintime) }}
            </div>
          </div>
          <div class="right-column">
            <span class="price u-m-r-20">{{ item.amount }}元</span>
            <u-icon color="#ADADAD" name="arrow-right" />
          </div>
        </div>
      </u-card>
    </div>
    <div class="admin-btns u-flex" @click="serverPopupShow = true">
      <div>联系</div>
      <div>客服</div>
    </div>
    <custom-blank :height="150" />
    <common-contacts v-model="serverPopupShow" />
    <u-empty
      v-if="!list.length"
      margin-top="120"
      text="暂无账单"
      mode="order"
    />
  </div>
</template>

<script lang="ts">
import { reqMyOrderList } from '@/api';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    serverPopupShow: false,
    tabs: [
      { id: -1, name: '全部' },
      { id: 0, name: '待支付' },
      { id: 1, name: '已支付' },
      { id: 2, name: '已取消' },
    ],
    current: 0,

    // 分页参数
    list: [] as any[],
    page: 1,
    limit: 10,
    isEnd: false,
  }),
  computed: {},
  methods: {
    // 状态对应文字
    statusToText(status: 0 | 1 | 2 | 3) {
      const strategy = {
        0: {
          text: '待付款',
          color: '#FF7E5F',
        },
        1: {
          text: '已付款',
          color: '#6FD471',
        },
        2: {
          text: '已取消',
          color: '#E5E5E5',
        },
        3: {
          text: '已延期',
          color: '#FEB47B',
        },
      };
      return strategy[status];
    },
    // 重置列表
    async resetList() {
      this.page = 1;
      this.isEnd = false;
      this.list = await this.getList();
      (this.$refs.uDropdown as any)?.close();
    },
    // 获取列表项
    async getList() {
      try {
        const { data } = await reqMyOrderList({
          page: this.page,
          limit: this.limit,
          status: this.tabs[this.current].id,
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
    current() {
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
@include full-page(my-orders);
.card-order-head {
  .title {
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
  .times {
    font-size: 20rpx;
    color: #adadad;
  }
  .price {
    font-weight: bold;
    color: #ff7e5f;
  }
}
</style>
