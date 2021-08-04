<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-20 17:44:33
 * @LastEditTime: 2021-01-26 14:16:53
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="house-admins">
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
      <div class="card-order-head" slot="head">
        <u-checkbox shape="circle" :size="40" v-model="item.select" />
        <span class="title">{{ types[currentType].name }}</span>
      </div>
      <div class="card-order-body u-flex u-row-between" slot="body">
        <div class="left-column">
          <div class="title u-m-b-20">{{ item.name }}</div>
          <div class="tips u-m-b-10">
            {{ item.extra_house_type || '' }} {{ item.area }}㎡
            {{ item.extra_house_direction || '' }}
            {{ item.floor || '' }}
          </div>
          <div class="price">¥ 1569</div>
        </div>
        <div class="right-column">
          <u-tag :text="currentType == 0 ? '开放' : '关闭'" mode="dark" />
        </div>
      </div>
    </u-card>
    <u-empty v-if="!list.length" margin-top="120" text="暂无房源" mode="list" />
    <common-fixed-footer>
      <span @click="onHandleItemSelectAll(!isSelectAll)">
        <u-checkbox v-model="isSelectAll" shape="circle" :size="40">
          全选
        </u-checkbox>
      </span>
      <u-button
        class="u-flex-1 u-m-l-22"
        shape="circle"
        type="primary"
        @click="onHandelSelects"
      >
        {{ currentType == 0 ? '关闭' : '开放' }}
      </u-button>
    </common-fixed-footer>
  </div>
</template>

<script lang="ts">
import { reqEditHouseStatus, reqHouseList } from '@/api';
import { showToast } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    // 当前账单类型
    types: [
      { id: 'open', name: '已开放' },
      { id: 'close', name: '已关闭' },
    ],
    currentType: 0,

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
        const { data } = await reqHouseList({
          page: this.page,
          limit: this.limit,
          search: {
            status: this.types[this.currentType].id,
          },
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
      await reqEditHouseStatus({
        house_ids: this.selects,
        action: this.types[this.currentType == 0 ? 1 : 0].id,
      });
      await showToast({ title: '录入成功!' });
      this.resetList();
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
@include full-page(house-admins);
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
    @include text-ellipsis(400rpx);
    display: inline-block;
    font-size: 28rpx;
    font-weight: bold;
    color: #000000;
  }
  .tips {
    font-size: 20rpx;
    color: #adadad;
  }
  .price {
    font-size: 34rpx;
    font-weight: bold;
    color: #ff7e5f;
  }
}
</style>
