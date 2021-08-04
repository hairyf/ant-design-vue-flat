<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-20 17:28:25
 * @LastEditTime: 2021-01-25 16:23:53
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="select-house-name">
    <!-- 头部容器 -->
    <div class="header-container">
      <u-search
        :animation="true"
        @click="$navigateTo('/pages/commons/search')"
        placeholder="输入房子名称"
        bg-color="#ffffff"
        border-color="#ADADAD"
        v-model="searchText"
      ></u-search>
    </div>
    <!-- 索引列表 -->
    <u-index-list
      :scrollTop="scrollTop"
      :index-list="indexList"
      active-color="#FF7E5F"
    >
      <view v-for="(list, key) in keyList" :key="key">
        <u-index-anchor :index="key" />
        <div
          class="list-cell"
          v-for="(item, index) in list"
          :key="index"
          @click="onSelectItem(item)"
        >
          <span>{{ item.name }}</span>
        </div>
      </view>
    </u-index-list>
  </div>
</template>

<script lang="ts">
import { reqAllOrder } from '@/api';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    scrollTop: 0,
    keyList: {} as any,
    indexList: [] as string[],

    searchText: '',
  }),
  computed: {},
  methods: {
    // 初始化数据列表
    async resetList() {
      const { data: keyList } = await reqAllOrder(this.searchText);
      // 过滤空数据
      Object.keys(keyList).forEach((key) => {
        if (!keyList[key].length) delete keyList[key];
      });
      const indexList = Object.keys(keyList);
      this.indexList = indexList;
      this.keyList = keyList;
    },
    // 选择房源项
    onSelectItem(item: any) {
      uni.$emit('select-house-item', item);
      this.$navigateBack();
    },
  },
  watch: {
    searchText() {
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
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  onPageScroll(event) {
    this.scrollTop = event.scrollTop;
  },
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
});
</script>

<style lang="scss">
.header-container {
  padding: 40rpx;
}
.list-cell {
  display: flex;
  box-sizing: border-box;
  padding: 10px 24rpx;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
  span {
    @include text-ellipsis(650rpx);
  }
}
</style>
