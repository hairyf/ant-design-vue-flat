<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-01-08 09:52:39
 * @LastEditTime: 2021-05-14 10:01:26
 * @Description: 商城
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <view-controller>
    <u-navbar :is-back="false" :border-bottom="false" title="分类" />
    <div v-if="!loading && goodsList.length">
      <union-l-3-class
        :list="goodsList"
        :bannerImg="bannerImg"
        v-if="template_num == '5'"
      />
      <union-l-1-1-class
        :list="goodsList"
        :bannerImg="bannerImg"
        v-if="template_num == '1'"
      />
      <union-l-1-2-class
        :list="goodsList"
        :bannerImg="bannerImg"
        v-if="template_num == '2'"
      />
      <union-l-2-1-class
        :list="goodsList"
        :bannerImg="bannerImg"
        v-if="template_num == '3'"
      />
      <union-l-2-2-class
        :list="goodsList"
        :bannerImg="bannerImg"
        v-if="template_num == '4'"
      />
    </div>
  </view-controller>
</template>

<script lang="ts">
import store from '@/store';
import { reqGoodClassList } from '@/api';
import Vue from 'vue';
export default Vue.extend({
  data: () => ({
    goodsList: [] as any[],
    bannerImg: [],
    // 模板种类
    template_num: '',
    loading: true,
  }),
  computed: {
    common: () => store.state.common,
  },
  methods: {
    // 获取商品列表数据
    async getGoodsList() {
      const { data } = await reqGoodClassList();
      this.goodsList = data.data.data;
      this.template_num = data.data.template_num;
      this.bannerImg = data.data.category_img;
      this.loading = false;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    // 获取商品列表数据
    this.getGoodsList();
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
page {
  height: 100%;
}
</style>
