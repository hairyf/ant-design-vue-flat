<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-02-22 17:02:12
 * @LastEditTime: 2021-04-21 10:26:16
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="address-select">
    <div class="hot-city" v-if="false">
      <div class="tips u-margin-bottom-30">热门城市</div>
      <div class="hot-list">
        <div class="hot-items u-flex u-row-between u-margin-bottom-25">
          <span>北京</span>
          <span>上海</span>
          <span>广州</span>
          <span>深圳</span>
          <span>天津</span>
        </div>
        <div class="hot-items u-flex u-row-between u-margin-bottom-25">
          <span>重庆</span>
          <span>成都</span>
          <span>南京</span>
          <span>杭州</span>
          <span>太原</span>
        </div>
      </div>
    </div>
    <u-index-list :scrollTop="scrollTop">
      <view v-for="(items, index) in indexList" :key="index">
        <u-index-anchor :index="index" />
        <view
          class="list-cell"
          v-for="(item, i) in items"
          :key="i"
          @click="choiceCity(item)"
        >
          {{ item.name }}
        </view>
      </view>
    </u-index-list>
    <!-- ifdef MP-WEIXIN -->
    <!-- weixin -->
    <!-- endif -->
    <!-- weixin zfb -->
  </div>
</template>

<script lang="ts">
import { reqCitiesList } from '@/api';
import Vue from 'vue';
// #ifdef MP-WEIXIN

// #endif
export default Vue.extend({
  components: {},
  data: () => ({
    scrollTop: 0,
    indexList: {} as any,
    contentList: [] as any,
  }),
  computed: {},
  methods: {
    // 城市列表数据
    async getCityList() {
      const data = await reqCitiesList({
        classify: 'letter',
        parent_id: 0,
      });
      this.indexList = data.data.data;
    },
    // 选择城市
    async choiceCity(item: any) {
      const { data } = await reqCitiesList({
        classify: 'letter',
        parent_id: item.id,
      });
      this.indexList = data.data;
      this.contentList.push(item);
      if (Array.isArray(this.indexList)) {
        uni.$emit('selete-address', this.contentList);
        this.$navigateBack();
      }
    },
  },
  watch: {},
  // 页面周期函数--监听页面加载
  onLoad() {
    this.getCityList();
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
  onPageScroll(event: any) {
    this.scrollTop = event.scrollTop;
  },
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
});
</script>

<style lang="scss">
.hot-city {
  padding: 25rpx;
  padding-right: 50rpx;
  .tips {
    color: #acacac;
  }
}
.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 24rpx;
  overflow: hidden;
  color: #323233;
  background-color: #fff;
}
</style>
