<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-20 11:26:51
 * @LastEditTime: 2021-01-29 09:48:09
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="guarantees">
    <u-tabs
      :list="tabs"
      :is-scroll="false"
      :current="current"
      active-color="#FF7E5F"
      bg-color="#F5F5F5"
      @change="current = $event"
    ></u-tabs>
    <u-card
      :show-foot="false"
      v-for="(item, index) in list"
      :key="index"
      @click="
        $navigateTo('/pages/commons/guaranteeDetails', { id: item.id, type })
      "
    >
      <div class="card-guarantee-item-head" slot="head">
        <div class="title">{{ item.title }}</div>
        <div class="u-flex-1 u-m-l-15">
          <u-tag
            style="margin-top: -5rpx"
            size="mini"
            :text="getStatusText(item.status).text"
            :bg-color="getStatusText(item.status).color"
            mode="dark"
          />
          <!-- <u-tag type="success" size="mini" text="已处理" mode="dark" /> -->
        </div>
        <div class="tips">
          {{ $format(item.update_time) }}
        </div>
      </div>
      <div class="card-guarantee-item-body" slot="body">
        <div class="text">
          {{ item.declare }}
        </div>
      </div>
    </u-card>
    <u-empty v-if="!list.length" margin-top="120" text="暂无报修" mode="list" />
    <!-- 底部操作栏 -->
    <common-fixed-footer :flex="false" v-if="type == 'user'">
      <u-button
        shape="circle"
        type="primary"
        @click="$navigateTo('/pages/commons/applyGuarantee')"
      >
        我要报修
      </u-button>
    </common-fixed-footer>
  </div>
</template>

<script lang="ts">
import { reqRepairsList, reqAdminRepairsList } from '@/api';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    tabs: [
      { id: 1, name: '待处理' },
      { id: 2, name: '处理中' },
      { id: 3, name: '已完成' },
      { id: 4, name: '已取消' },
    ],
    current: 0,

    // 显示类型
    type: 'user',

    // 分页参数
    list: [] as any[],
    page: 1,
    limit: 10,
    isEnd: false,
  }),
  computed: {},
  methods: {
    // 根据状态获取字符信息
    getStatusText(status: Key) {
      const strategy = {
        1: {
          color: '#FF7E5F',
          text: '待处理',
        },
        2: {
          color: '#FF0000',
          text: '处理中',
        },
        3: {
          color: '#23B929',
          text: '已完成',
        },
        4: {
          color: '#9E9E9E',
          text: '已取消',
        },
      } as any;
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
        const reqList =
          this.type == 'user' ? reqRepairsList : reqAdminRepairsList;
        const { data } = await reqList({
          status: this.tabs[this.current].id,
          page: this.page,
          limit: this.limit,
        });
        return data.data.map((item: any) => {
          item.update_time =
            item.finish_time ||
            item.dispose_time ||
            item.repairs_time ||
            item.createtime;
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
  },
  watch: {
    current() {
      this.resetList();
    },
  },

  // 页面周期函数--监听页面加载
  onLoad(options: { type?: string }) {
    this.type = options.type || this.type;
  },
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
@include full-page(guarantees);
.card-guarantee-item-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 28rpx;
    font-weight: bold;
    color: #000000;
  }
  .tips {
    font-size: 20rpx;
  }
}
.card-guarantee-item-body {
  .text {
    @include text-hidden-line(2);
    font-size: 24rpx;
  }
}
</style>
