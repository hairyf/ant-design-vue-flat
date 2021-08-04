<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-20 09:14:11
 * @LastEditTime: 2021-01-25 18:06:23
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="contracts">
    <u-card
      :show-foot="false"
      v-for="(item, index) in list"
      :key="index"
      @click="$navigateTo('/pages/orders/contractDetails', { id: item.id })"
    >
      <div class="card-returnd-item-head" slot="head">
        <div class="title">{{ item.title }}</div>
        <div class="warning" v-if="item.status == 0">1天后自动确认</div>
      </div>
      <div class="card-returnd-item-body" slot="body">
        <u-image
          width="128"
          height="128"
          class="u-m-r-14"
          :src="item.order.house.image_text"
        />
        <div class="center-column u-flex-1">
          <div class="title u-m-b-10">{{ item.order.house.name }}</div>
          <div class="tips u-m-b-14">
            {{ $format(item.order.begintime) }}
            至
            {{ $format(item.order.endtime) }}
          </div>
          <div class="price">{{ item.order.price }}元/月</div>
        </div>
        <div class="right-column u-flex">
          <custom-icon
            v-if="item.status == 0"
            name="await-confirm"
            size="120"
          />
          <custom-icon
            v-if="item.status == 1"
            name="already-confirm"
            size="120"
          />
          <!-- <custom-icon
            v-if="item.order.status == 2"
            name="already-rent-refund"
            size="120"
          /> -->
          <u-icon color="#ADADAD" name="arrow-right" />
        </div>
      </div>
    </u-card>
    <u-empty v-if="!list.length" margin-top="120" text="暂无列表" mode="list" />
  </div>
</template>

<script lang="ts">
import { reqContractList } from '@/api';
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
    // 重置列表
    async resetList() {
      this.page = 1;
      this.isEnd = false;
      this.list = await this.getList();
    },
    // 获取列表项
    async getList() {
      try {
        const { data } = await reqContractList({
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
@include full-page(contracts);
</style>
