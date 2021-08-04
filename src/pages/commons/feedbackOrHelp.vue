<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-19 15:07:10
 * @LastEditTime: 2021-01-19 19:27:25
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-19 15:07:10
 * @LastEditTime: 2021-01-19 15:25:58
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="feedback-or-help">
    <u-card
      :show-head="false"
      :show-foot="false"
      :border="false"
      margin="40rpx 32rpx"
    >
      <div class="card-order-body" slot="body">
        <u-collapse>
          <u-collapse-item
            :title="item.head"
            v-for="(item, index) in itemList"
            :open="item.open"
            :key="index"
          >
            {{ item.body }}
          </u-collapse-item>
        </u-collapse>
      </div>
    </u-card>
    <!-- 底部操作栏 -->
    <common-fixed-footer>
      <div
        class="opt-item u-flex-1"
        @click="$navigateTo('/pages/commons/feedbackRecord')"
      >
        <custom-icon name="ellipsis" :size="48" />
        <span>意见反馈</span>
      </div>
      <div
        class="opt-item u-flex-1"
        @click="$navigateTo('/pages/commons/feedbackSubmit')"
      >
        <custom-icon name="file" :size="48" />
        <span>反馈记录</span>
      </div>
    </common-fixed-footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    itemList: [
      {
        head: '如何充值',
        body:
          '充值需先与管理员联系，并在线下支付需充值相应的金额后，管理员再对于账户进行余额充值即可',
        open: true,
        disabled: true,
      },
      {
        head: '如何看房',
        body:
          '学会欣赏，实际是一种看房主要以现场看房为主，在您心仪的房子下点击预约看房且填写完整资料后，等待工作人员与您联系并约定具体看房事项即可积极生活的态度，是生活的调味品，会在欣赏中发现生活的美',
        open: false,
      },
      {
        head: '支付问题',
        body: '目前线上支付暂只支持余额，需联系管理员进行充值后可支付',
        open: false,
      },
    ],
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
@include full-page(feedback-or-help);
.feedback-or-help {
  padding-top: 1rpx;
}
.opt-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
