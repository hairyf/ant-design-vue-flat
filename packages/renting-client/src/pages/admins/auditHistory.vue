<!--
 * @Author: Mr.wang
 * @Date: 2021-05-26 15:50:42
 * @LastEditTime: 2021-05-27 20:48:54
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="audit-history">
    <u-time-line>
      <u-time-line-item
        nodeTop="3"
        v-for="(item, index) in remark"
        :key="index"
      >
        <!-- 此处自定义了左边内容，用一个图标替代 -->
        <template v-slot:node>
          <div
            class="u-node"
            style="background: #61bd98"
            v-if="item.title != '驳回'"
          >
            <div></div>
          </div>
          <div
            class="u-node"
            style="background: #ff6262"
            v-if="item.title == '驳回'"
          >
            <div></div>
          </div>
        </template>
        <template v-slot:content>
          <div>
            <div class="u-order-title deviationTop">{{ item.time }}</div>
            <div class="u-order-text">
              审核结果：<span>{{
                item.title == '驳回' ? '不通过' : '通过'
              }}</span>
            </div>
            <div class="u-order-text">
              审核人：<span>{{ item.nickname }}</span>
            </div>
            <div class="u-order-text" v-if="item.title == '驳回'">
              失败：<span>
                {{ item.remark }}
              </span>
            </div>
          </div>
        </template>
      </u-time-line-item>
      <!-- <u-time-line-item>
        <template v-slot:node>
          <div class="u-node" style="background: #ff6262">
            <div></div>
          </div>
        </template>
        <template v-slot:content>
          <div>
            <div class="u-order-title deviationLower">2019-05-08 12:12</div>
            <div class="u-order-text">审核结果：<span>通过</span></div>
            <div class="u-order-text">审核人：<span>admin</span></div>
            <div class="u-order-text">
              失败：<span>
                我是失败原因我是失败原因我是失败原因我是失
                败原因我是失败原因我是失败原因我是失败原因
                我是失败原因我是失败原因我是失败原因我是失 败原因
              </span>
            </div>
          </div>
        </template>
      </u-time-line-item> -->
    </u-time-line>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    remark: [] as any,
  }),
  computed: {},
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { remark: string }) {
    this.remark = JSON.parse(decodeURIComponent(options.remark));
    // this.remark = this.remark.reverse();
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
.audit-history {
  padding: 40rpx;
  .u-node {
    width: 24rpx;
    height: 24rpx;
    border-radius: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #d0d0d0;
  }
  .deviationTop {
    transform: translateY(-3rpx);
  }
  .deviationLower {
    transform: translateY(7rpx);
  }
  .u-order-title {
    color: #000;
    font-size: 28rpx;
  }
  .u-order-text {
    margin-top: 20rpx;
    color: #adadad;
    font-size: 24rpx;
    span {
      line-height: 34rpx;
      color: #000000;
    }
  }
}
</style>
