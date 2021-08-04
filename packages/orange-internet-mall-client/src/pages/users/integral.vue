<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-13 15:12:10
 * @LastEditTime: 2021-05-10 11:53:53
 * @Description: 积分明细
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="integral">
    <div class="header-container u-flex">
      <div
        class="count"
        :style="{
          color: $hexColor['--color-primary'],
        }"
      >
        {{ cornerMarker.score || 0 }}
      </div>
      <div class="tips">当前{{ balance_txt }}</div>
    </div>
    <div class="detailed-container">
      <div
        class="detailed-item u-flex u-border-bottom"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="left-column u-flex-1">
          <div class="title">{{ item.title }}</div>
          <div class="time">
            {{ $formatUnix(item.createtime) }}
          </div>
        </div>
        <div
          class="right-column count"
          :style="{
            color: $hexColor['--color-primary'],
          }"
        >
          {{ item.points_change }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reqPointsRecord } from '@/api';
import { computed, defineComponent } from '@vue/composition-api';
import { useListPaging } from '@/hooks/use-list-paging';
import store from '@/store';

export default defineComponent({
  setup() {
    // 调用分页逻辑
    const { list } = useListPaging({
      getList: async (page) => {
        const { data } = await reqPointsRecord({ page, limit: 5 });
        return data.data.data;
      },
    });
    const balance_txt = computed(
      () => store.state.common.depositWithdrawal.deposit.balance_txt
    );
    const cornerMarker = computed(() => store.state.user.money);
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { list, balance_txt, cornerMarker, $hexColor };
  },
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
@include full-page('integral', #f8f8f8);

.header-container {
  padding: 40rpx 0;
  flex-direction: column;
  .count {
    margin-bottom: 5rpx;
    font-size: 80rpx;
    font-weight: bold;
  }
  .tips {
    font-size: 24rpx;
    color: #000000;
  }
}
.detailed-item {
  padding: 28rpx 34rpx;
  background-color: #ffffff;
  .title {
    margin-bottom: 10rpx;
  }
  .time {
    color: #acacac;
  }
}
</style>
