<template>
  <div class="after-service">
    <div class="commodity-evaluation">
      <div class="evaluate">
        <div class="evaluate-left">
          <div class="evaluate-title">服务评价</div>
          <u-rate
            :count="count"
            v-model="value"
            :active-color="$hexColor['--color-primary']"
            inactive-color="#EEEEEE"
          ></u-rate>
        </div>
        <div class="evaluate-text" v-if="value == 0">待评价</div>
        <div class="evaluate-text" v-if="value == 1">很不满意</div>
        <div class="evaluate-text" v-if="value == 2">不满意</div>
        <div class="evaluate-text" v-if="value == 3">一般</div>
        <div class="evaluate-text" v-if="value == 4">满意</div>
        <div class="evaluate-text" v-if="value == 5">非常满意</div>
      </div>
      <div class="commodity-box">
        <div class="commodity-title">服务评价</div>
        <div class="content">
          <u-input
            maxlength="300"
            placeholder="请输入你对此次售后服务的评价 (300字以内)~"
            height="300"
            v-model="describe"
            type="textarea"
            :clearable="false"
          ></u-input>
          <div class="text-display">
            <span class="display-text">{{ describe.length }}</span
            ><span class="limit-text">/300</span>
          </div>
        </div>
      </div>
      <u-button
        class="release-btn"
        type="warning"
        @click="releaseEvaluation"
        shape="circle"
      >
        发布评价
      </u-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { reqSubmitAfter } from '@/api/order';
import { computed } from '@vue/composition-api';
import store from '@/store';
export default Vue.extend({
  components: {},
  data: () => ({
    count: 5,
    value: 0,
    // 描述文字
    describe: '',
    id: '',
  }),
  computed: {},
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
  methods: {
    async releaseEvaluation() {
      if (this.value == 0) {
        uni.showToast({
          icon: 'none',
          title: '请评价',
        });
      } else {
        await reqSubmitAfter({
          after_sale_id: this.id,
          score: this.value,
          content: this.describe,
        });
        uni.showToast({
          icon: 'success',
          title: '评价提交成功',
          duration: 1500,
          success() {
            setTimeout(() => {
              uni.navigateBack({
                delta: 1,
              });
            }, 1500);
          },
        });
      }
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: any) {
    this.id = options.id;
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
.commodity-evaluation {
  position: relative;
  min-height: 100vh;
  padding: 40rpx 34rpx 0 34rpx;
  background-color: #f7f7f7;
  .evaluate {
    padding: 24rpx 40rpx;
    background-color: #fff;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .evaluate-left {
      display: flex;
      align-items: center;
    }
    .evaluate-title {
      font-weight: bold;
      margin-right: 16rpx;
      font-size: 28rpx;
      color: #000000;
    }
    .evaluate-text {
      font-size: 24rpx;
      color: #acacac;
    }
  }
  .commodity-box {
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
    padding: 40rpx 40rpx 64rpx 40rpx;
    .commodity-title {
      font-size: 28rpx;
      color: #000000;
      font-weight: bold;
    }
    .information {
      margin: 20rpx 0 32rpx 0;
      display: flex;
      align-items: center;
    }
    .information-img {
      width: 120rpx;
      height: 120rpx;
      border-radius: 10rpx;
    }
  }
  .content {
    position: relative;
    .text-display {
      position: absolute;
      right: 0;
      bottom: -20rpx;
      font-size: 24rpx;
      .display-text {
        color: #000;
      }
      .limit-text {
        color: #5c5c5c;
      }
    }
  }
  /* 自定义上传组件 */
  .slot-btn {
    margin-top: 40rpx;
    width: 138rpx;
    height: 138rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(244, 245, 246);
    border-radius: 10rpx;
    .title {
      font-size: 28rpx;
      margin-bottom: 3rpx;
    }
    .tips {
      font-size: 21rpx;
    }
  }
  .release-btn {
    position: absolute;
    left: 40rpx;
    right: 40rpx;
    bottom: 20rpx;
  }
}
</style>
