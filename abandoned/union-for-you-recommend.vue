<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-07 14:34:50
 * @LastEditTime: 2021-05-07 18:38:09
 * @Description: 页面组合-为你推荐
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="union-for-you-recommend">
    <div class="custom-not-bg-container">
      <div class="title">为你推荐</div>
      <common-grid-good-list :list="hotDoodsData" />
      <div class="u-flex u-row-center u-margin-top-40 u-margin-bottom-40">
        <u-button shape="circle" @click="moreRecomment()"
          >更多为您推荐</u-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { reqGoodsScreenList } from '@/api';
import { showToast } from '@/utils';
export default Vue.extend({
  props: {},
  data: () => ({
    hotDoodsData: [] as any[],
    page: 1,
  }),
  computed: {},
  methods: {
    async getHotList() {
      const { data } = await reqGoodsScreenList({
        marketing_tab: 1,
        page: this.page,
        limit: 5,
      });
      this.hotDoodsData = data.data.data;
    },
    moreRecomment() {
      showToast({ title: '暂无更多推荐', icon: 'none' });
    },
  },
  watch: {
    page() {
      this.getHotList();
    },
  },

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
});
</script>

<style lang="scss">
/* 自定义无背景容器 */
.custom-not-bg-container {
  .title {
    margin: 0 34rpx;
    margin-bottom: 28rpx;
    font-size: 28rpx;
    font-weight: 700;
  }
  u-button {
    margin: 0 auto;
  }
}
</style>
