<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-20 18:27:54
 * @LastEditTime: 2021-01-20 18:34:27
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="work-order-admins">
    <u-tabs
      :list="types"
      :is-scroll="false"
      :current="currentType"
      active-color="#FF7E5F"
      bg-color="none"
      @change="currentType = $event"
    ></u-tabs>
    <u-card
      :show-foot="false"
      :border="false"
      margin="40rpx 32rpx"
      @click="$navigateTo('/pages/commons/guaranteeDetails')"
    >
      <div class="card-order-head u-flex u-row-between" slot="head">
        <div class="left-column">
          <span class="title u-m-r-20">陶吓村218栋-604</span>
          <u-tag size="mini" text="待处理" mode="dark" />
        </div>
        <div class="right-column">
          <span class="price">2020-12-01</span>
        </div>
      </div>
      <div
        class="card-order-body u-flex u-row-between"
        slot="body"
        @click="$navigateTo('/pages/admins/billDetails')"
      >
        热水机漏水热水机漏水热水机漏水热水机漏水热水机漏水热水机漏水热水机漏水热水机漏水热水机漏水热水机...
      </div>
    </u-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    // 当前账单类型
    types: [
      { id: 1, name: '全部' },
      { id: 1, name: '待审核' },
      { id: 1, name: '已处理' },
    ],
    currentType: 0,
  }),
  computed: {},
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
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
@include full-page(work-order-admins);
.card-order-body {
  @include text-hidden-line(2);
}
</style>
