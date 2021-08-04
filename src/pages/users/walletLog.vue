<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-22 14:01:19
 * @LastEditTime: 2021-01-28 18:13:40
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="recharge-container">
    <div
      class="recharge-item u-border-bottom u-flex u-row-between"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="left-column">
        <div class="title">
          {{ type == 'consume' ? item.memo : '余额充值' }}
        </div>
        <div class="tips">{{ $format(item.createtime) }}</div>
      </div>
      <div class="right-column">
        <div class="price" :style="{ color: color }">{{ item.money }}元</div>
      </div>
    </div>
    <u-empty v-if="!list.length" margin-top="120" text="暂无记录" mode="list" />
  </div>
</template>

<script lang="ts">
import { reqMoneyLog } from '@/api';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    // consume=消费（默认）,recharge=充值
    type: 'consume',
    // 分页参数
    list: [] as any[],
    page: 1,
    limit: 10,
    isEnd: false,
  }),
  computed: {
    color() {
      return this.type == 'consume' ? '#FF7E5F' : '#4ec459';
    },
  },
  methods: {
    // 重置列表
    async resetList() {
      this.page = 1;
      this.isEnd = false;
      this.list = await this.getList();
    },
    // 获取列表项
    async getList() {
      try {
        const { data } = await reqMoneyLog({
          type: this.type,
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
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { type: string }) {
    if (options.type === 'consume') {
      uni.setNavigationBarTitle({ title: '消费记录' });
    }
    if (options.type === 'recharge') {
      uni.setNavigationBarTitle({ title: '充值记录' });
    }
    this.type = options.type;
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
.recharge-container {
  margin: 0 32rpx;
}
.recharge-item {
  padding: 40rpx 0;
}
.tips {
  font-size: 20rpx;
  color: #adadad;
}
</style>
