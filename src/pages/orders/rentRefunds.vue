<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-20 09:17:28
 * @LastEditTime: 2021-01-29 09:49:56
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="rent-refund">
    <u-card v-for="(item, index) in list" :key="index">
      <div class="card-returnd-item-head" slot="head">
        <div class="title">纸质合同</div>
        <!-- <div class="warning">已申请</div> -->
        <div class="tips">{{ getStatusText(item.status) }}</div>
      </div>
      <!-- @click="$navigateTo('/pages/orders/contractDetails')" -->
      <div class="card-returnd-item-body" slot="body">
        <u-image
          width="128"
          height="128"
          class="u-m-r-14"
          :src="item.house.image_text"
        />
        <div class="center-column u-flex-1">
          <div class="title u-m-b-10">{{ item.house.name }}</div>
          <div class="tips u-m-b-14">
            {{ $format(item.begintime) }}至{{ $format(item.endtime) }}
          </div>
          <div class="price">{{ item.house.price }}元/月</div>
        </div>
        <div class="right-column u-flex">
          <!-- <custom-icon name="await-confirm" size="120" /> -->
          <!-- <u-icon color="#ADADAD" name="arrow-right" /> -->
        </div>
      </div>
      <div class="card-returnd-item-foot" slot="foot">
        <u-tag
          v-if="item.aftersales ? item.aftersales.status == 'cancel' : true"
          @click="$navigateTo('/pages/orders/applyRentRefund', { id: item.id })"
          class="u-m-r-15"
          text="申请退租"
          mode="dark"
        />
        <u-tag
          v-else-if="item.aftersales && item.aftersales.status == 'wait'"
          @click="$navigateTo('/pages/orders/applyRentRefund', { id: item.id })"
          type="warning"
          text="取消申请"
          mode="dark"
        />
      </div>
    </u-card>
    <u-empty v-if="!list.length" margin-top="120" text="暂无合同" mode="list" />
  </div>
</template>

<script lang="ts">
import { reqAftersalesList } from '@/api';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
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
        0: '待付款',
        1: '正在租房',
        2: '已退租',
        3: '已取消',
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
        const { data } = await reqAftersalesList({
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
@include full-page(rent-refund);
</style>
