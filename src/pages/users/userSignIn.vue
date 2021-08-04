<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-22 18:57:41
 * @LastEditTime: 2021-05-10 11:55:09
 * @Description: 签到
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="user-sign-in">
    <!-- 签到统计 -->
    <div class="days-count u-flex">
      <div class="tips">已累计签到</div>
      <div class="count-container u-flex u-row-between">
        <div
          class="number"
          :style="{
            color: $hexColor['--color-primary'],
          }"
        >
          0
        </div>
        <div
          class="number"
          :style="{
            color: $hexColor['--color-primary'],
          }"
        >
          0
        </div>
        <div
          class="number"
          :style="{
            color: $hexColor['--color-primary'],
          }"
        >
          4
        </div>
      </div>
      <image
        class="bg-image"
        src="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/sign-in-bg.png"
      />
    </div>
    <!-- 签到日期条 -->
    <div class="time-steps">
      <u-line color="#EBEBEB" :hair-line="false" />
      <div class="steps-container">
        <div
          class="steps-item-container"
          v-for="(item, index) in steps"
          :key="index"
        >
          <div class="step-item-circular">
            <u-icon
              class="step-checkmark-icon"
              name="checkmark"
              color="#ffffff"
              size="38"
            />
            <span class="step-text"> +{{ item.integral }} </span>
          </div>
          <div class="step-item-time">{{ item.time }}</div>
        </div>
      </div>
    </div>
    <custom-fixed-footer position="none" bg-color="none" :occupy-block="false">
      <u-button shape="circle" type="primary">立即签到</u-button>
    </custom-fixed-footer>
    <!-- 日历查看 -->
    <custom-calendar />
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { computed } from '@vue/composition-api';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    steps: [
      { time: '1月20日', sign_in: true, same_day: false, integral: 50 },
      { time: '1月21日', sign_in: true, same_day: false, integral: 50 },
      { time: '1月22日', sign_in: true, same_day: false, integral: 50 },
      { time: '1月23日', sign_in: false, same_day: true, integral: 50 },
      { time: '1月24日', sign_in: false, same_day: false, integral: 50 },
      { time: '1月26日', sign_in: false, same_day: false, integral: 50 },
      { time: '1月27日', sign_in: false, same_day: false, integral: 50 },
    ],
  }),
  computed: {},
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
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
/* 签到日期统计 */
.days-count {
  position: relative;
  flex-direction: column;
  justify-content: center;
  height: 392rpx;
  .tips {
    position: relative;
    z-index: 1;
    margin-bottom: 20rpx;
    font-size: 24rpx;
    color: #ffffff;
  }
  .count-container {
    position: relative;
    z-index: 1;
    width: 260rpx;
    .number {
      background-color: #ffffff;
      width: 74rpx;
      height: 114rpx;
      text-align: center;
      line-height: 114rpx;
      border-radius: 10rpx;
      font-size: 80rpx;
      font-weight: bold;
      color: #feb664;
    }
  }
  .bg-image {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
/* 签到日期条 */
.time-steps {
  position: relative;
  padding: 0 32rpx;
  margin: 40rpx 0;
  .steps-container {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
  }
  .steps-item-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .step-item-circular {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64rpx;
    height: 64rpx;
    border-radius: 50%;
    background-color: #ebebeb;
    .step-text {
      color: #acacac;
      font-size: 24rpx;
    }
    .step-checkmark-icon {
      display: none;
    }
  }
  .step-item-time {
    margin-top: 20rpx;
    font-size: 22rpx;
  }
  u-line {
    position: absolute;
    width: 100%;
    top: 32rpx;
    left: 0;
  }
}
</style>
