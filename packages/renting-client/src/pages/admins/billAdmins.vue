<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-20 16:30:24
 * @LastEditTime: 2021-01-27 11:24:29
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="bill-admins">
    <div class="header-container">
      <u-search
        :animation="true"
        @click="$navigateTo('/pages/commons/search')"
        placeholder="输入房子名称"
        bg-color="#ffffff"
        border-color="#ADADAD"
      ></u-search>
      <u-tabs
        :list="types"
        :is-scroll="false"
        :current="currentType"
        active-color="#FF7E5F"
        bg-color="none"
        @change="currentType = $event"
      ></u-tabs>
    </div>
    <u-card
      v-for="(item, index) in list"
      :key="index"
      :show-foot="false"
      :border="false"
      margin="40rpx 32rpx"
    >
      <div class="card-order-head u-flex u-row-between" slot="head">
        <div class="left-column">
          <u-checkbox
            v-if="edit"
            shape="circle"
            :size="40"
            v-model="item.select"
          />
          <span class="title">{{ item.house.name }}</span>
        </div>
        <div class="right-column">
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
      <div
        class="card-order-body u-flex u-row-between"
        slot="body"
        @click="
          $navigateTo('/pages/admins/billDetails', {
            order_sn: item.order_sn,
            type: 'admins',
          })
        "
      >
        <div class="left-column">
          <div class="title u-m-b-20">{{ item.item_title }}</div>
          <div class="times" v-if="item.begintime">
            {{ $format(item.begintime) }} 至 {{ $format(item.endtime) }}
          </div>
        </div>
        <div class="right-column">
          <span class="price u-m-r-20">{{ item.amount }}元</span>
          <u-icon color="#ADADAD" name="arrow-right" />
        </div>
      </div>
    </u-card>
    <u-empty
      v-if="!list.length"
      margin-top="120"
      text="暂无账单"
      mode="order"
    />
    <!-- 底部操作栏 -->
    <common-fixed-footer v-if="!edit">
      <u-button
        class="u-flex-1"
        shape="circle"
        type="warning"
        @click="$navigateTo('/pages/admins/inputCost')"
      >
        录入水电
      </u-button>
      <u-button
        class="u-flex-1 u-m-l-22"
        shape="circle"
        type="primary"
        @click="edit = true"
      >
        催收
      </u-button>
    </common-fixed-footer>
    <common-fixed-footer v-if="edit">
      <span @click="onHandleItemSelectAll(!isSelectAll)">
        <u-checkbox v-model="isSelectAll" shape="circle" :size="40">
          全选
        </u-checkbox>
      </span>
      <u-button shape="circle" @click="edit = false"> 取消 </u-button>
      <u-button
        class="u-flex-1 u-m-l-22"
        shape="circle"
        type="primary"
        @click="onHandelSelects"
      >
        发送推送
      </u-button>
    </common-fixed-footer>
  </div>
</template>

<script lang="ts">
import { reqAdminOrders, reqUrgeOrder } from '@/api';
import { showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    // 当前账单类型
    types: [
      { id: 0, name: '全部' },
      { id: 1, name: '待支付' },
      { id: -1, name: '已超时' },
    ],
    currentType: 0,
    // 当前是否为编辑状态
    edit: false,

    // 分页参数
    list: [] as any[],
    page: 1,
    limit: 10,
    isEnd: false,
  }),
  computed: {
    // 当前是否为空
    empty(): boolean {
      return this.list.length === 0;
    },
    // 当前选中的id列表
    selects(): number[] {
      return this.list.filter((item) => item.select).map((item) => item.id);
    },
    // 当前是否为全选状态
    isSelectAll(): boolean {
      return !this.list.find((item) => !item.select);
    },
    // 当前是否已经选择
    isSelect(): boolean {
      return !!this.list.find((item) => item.select);
    },
  },
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
    },
    // 获取列表项
    async getList() {
      try {
        const { data } = await reqAdminOrders({
          page: this.page,
          limit: this.limit,
          status: this.types[this.currentType].id,
        });
        return data.data.map((item: any) => {
          item.select = false;
          return item;
        });
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
    // 处理多项目删除
    async onHandelDelete() {
      console.log(this.selects);
    },
    // 对选择项进行处理
    async onHandelSelects() {
      if (!this.selects.length) {
        return showToast({ title: '请选择催收的账单!', icon: 'none' });
      }
      await reqUrgeOrder(this.selects);
      await showToast({ title: '已发送催收!' });
      this.onHandleItemSelectAll(false);
      this.edit = false;
    },
    // 处理所有项目全选/非全选
    onHandleItemSelectAll(selects: boolean) {
      this.list.forEach((item) => {
        item.select = selects;
      });
    },
  },
  watch: {
    currentType() {
      this.resetList();
    },
  },

  // 页面周期函数--监听页面加载
  onLoad() {
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
@include full-page(bill-admins);
.header-container {
  margin: 0 20rpx;
  margin-top: 40rpx;
}
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
