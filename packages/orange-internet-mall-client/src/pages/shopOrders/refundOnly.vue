<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-11 10:57:59
 * @LastEditTime: 2021-05-13 18:52:15
 * @Description: 退货退款详情
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 * @(≧◡≦)人生是一种无法抗拒的前进(o´∀`o)
-->
<template>
  <div class="order-details" v-if="addressInfo.afterSales">
    <!-- 订单状态 -->
    <div class="header-container u-flex">
      <image
        class="order-bg"
        src="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/order-bg.png"
      />
      <template>
        <!-- 商家处理中 -->
        <div
          class="status-container u-flex"
          v-if="addressInfo.afterSales.status == 0"
        >
          <u-icon
            class="u-margin-right-12"
            size="40"
            name="clock"
            color="#ffffff"
          />
          <span class="status-text">商家处理中</span>
        </div>
        <div class="tips-container" v-if="addressInfo.afterSales.status == 0">
          <span class="tips-text">
            <u-count-down
              font-size="24rpx"
              separator-size="24rpx"
              bg-color="#FE8B3A"
              separator-color="#fff"
              color="#fff"
              separator="zh"
              :timestamp="automaticTime"
              :show-seconds="false"
            ></u-count-down>
            后商家未处理将自动退款</span
          >
        </div>
        <!-- 退款成功 -->
        <div class="status-container u-flex" v-if="curStatus == 2">
          <!-- <u-icon
            class="u-margin-right-20"
            size="40"
            name="clock"
            color="#ffffff"
          /> -->

          <u-icon size="42" class="u-margin-right-20" name="checkmark-circle" />
          <span class="status-text">退款成功</span>
        </div>
        <div class="tips-container" v-if="curStatus == 2">
          <span class="tips-text"
            >退款金额: ￥{{ totalRefundMoney }} 时间:{{
              $formatUnix(createtime)
            }}</span
          >
        </div>
        <!-- 商家已拒绝您的申请 -->
        <div
          class="status-container u-flex"
          v-if="addressInfo.afterSales.status == -1"
        >
          <u-icon
            class="u-margin-right-20"
            size="40"
            name="close-circle"
            color="#ffffff"
          />
          <span class="status-text">商家已拒绝您的申请</span>
        </div>
        <div class="tips-container" v-if="addressInfo.afterSales.status == -1">
          <p class="tips-text">您的申请未通过，可修改退款申请后在有效期内</p>
          <p class="tips-text">再次申请</p>
        </div>
        <!-- 申请已关闭 -->
        <div
          class="status-container u-flex"
          v-if="addressInfo.afterSales.status == -2"
        >
          <u-icon
            class="u-margin-right-20"
            size="40"
            name="close-circle"
            color="#ffffff"
          />

          <span class="status-text">申请已关闭</span>
        </div>
        <div class="tips-container" v-if="addressInfo.afterSales.status == -2">
          <p class="tips-text">您已撤销此次订单退款申请,若您的问题未解</p>
          <p class="tips-text">决，可以在有效期内再次申请</p>
        </div>
        <div
          class="btns-container"
          v-if="
            addressInfo.afterSales.status != -1 &&
            addressInfo.afterSales.status != -2
          "
        >
          <u-steps
            :list="numList"
            :current="curStatus"
            active-color="#ffffff"
            un-active-color="rgba(255,255,255,.3)"
          >
          </u-steps>
        </div>
      </template>
    </div>
    <!-- 商家处理中 -->
    <custom-card-container
      title="您的仅退款申请已提交，商家正在处理中"
      v-if="addressInfo.afterSales.status == 0"
    >
      <div slot="body">
        <div class="text-style">
          商家同意或者超时未处理,系统将退款给您如果商家拒绝,您可以修改退款申请后再次发起,商家会重新处理
        </div>
      </div>
      <div slot="foot">
        <u-cell-item
          icon=""
          @click="
            $navigateTo('/pages/shopOrders/negotiationHistory', {
              order_id: addressInfo.afterSales.order_id,
              order_item_id: addressInfo.afterSales.order_item_id,
              id: addressInfo.afterSales.id,
              status: addressInfo.afterSales.status,
              type: addressInfo.afterSales.type,
              deliverTime: addressInfo.OrderBaseParam.cancelSafeguard.value,
            })
          "
          title="协商历史"
        ></u-cell-item>
      </div>
    </custom-card-container>
    <!-- 协商历史 -->
    <custom-card-container
      :isShowHead="false"
      v-if="
        addressInfo.afterSales.status == -2 ||
        addressInfo.afterSales.status == 2
      "
    >
      <div slot="foot">
        <u-cell-item
          icon=""
          @click="
            $navigateTo('/pages/shopOrders/negotiationHistory', {
              order_id: addressInfo.afterSales.order_id,
              order_item_id: addressInfo.afterSales.order_item_id,
              id: addressInfo.afterSales.id,
              status: addressInfo.afterSales.status,
              type: addressInfo.afterSales.type,
              deliverTime: addressInfo.OrderBaseParam.cancelSafeguard.value,
            })
          "
          title="协商历史"
        ></u-cell-item>
      </div>
    </custom-card-container>
    <!-- 协商历史 -->
    <custom-card-container
      title="您的申请已被商家拒绝"
      v-if="addressInfo.afterSales.status == -1"
    >
      <div slot="body">
        <div class="text-style">
          拒绝原因：{{ addressInfo.afterSales.dismiss_reason }}
        </div>
      </div>
      <div slot="foot">
        <u-cell-item
          @click="
            $navigateTo('/pages/shopOrders/negotiationHistory', {
              order_id: addressInfo.afterSales.order_id,
              order_item_id: addressInfo.afterSales.order_item_id,
              id: addressInfo.afterSales.id,
              status: addressInfo.afterSales.status,
              type: addressInfo.afterSales.type,
              deliverTime: addressInfo.OrderBaseParam.cancelSafeguard.value,
            })
          "
          icon=""
          title="协商历史"
        ></u-cell-item>
      </div>
    </custom-card-container>
    <!-- 撤销申请 -->
    <u-modal
      title="撤销申请"
      v-model="isRevokeApply"
      :content="revokeApplyContent"
      @confirm="revokeApplyConfirm"
      confirm-color="#000"
      cancel-color="#000"
      width="560rpx"
      :show-cancel-button="true"
    ></u-modal>
    <!-- 退款信息 -->
    <common-legitimate-info
      :returnInfo="addressInfo"
      title="退款信息"
    ></common-legitimate-info>
    <!-- 底部操作栏 -->
    <union-blank v-if="true" :height="120" />
    <div v-if="true" class="footer-container u-flex u-row-right u-border-top">
      <!-- 提交申请 -->
      <template v-if="addressInfo.afterSales.status == 0">
        <div class="u-flex">
          <u-button
            size="mini"
            class="u-m-r-15"
            shape="circle"
            @click="revokeApply"
            >撤销申请</u-button
          >
          <u-button
            size="mini"
            class="u-m-r-15"
            shape="circle"
            @click="
              $navigateTo('/pages/shopOrders/refund', {
                modify: true,
                type: 1,
                orderId: addressInfo.id,
                goodsId: addressInfo.orderGoods[0].goods_id,
                goodsOrderId: addressInfo.orderGoods[0].id,
                afterSalesId: addressInfo.afterSales.id,
              })
            "
            >修改申请</u-button
          >
          <link-controller :data="{ type: 'serve' }">
            <u-button
              size="mini"
              class="u-m-r-15"
              shape="circle"
              style="pointer-events: none"
            >
              客服介入
            </u-button>
          </link-controller>
        </div>
      </template>
      <!-- 申请已关闭 -->
      <template
        v-if="
          addressInfo.afterSales.status == -1 ||
          addressInfo.afterSales.status == -2
        "
      >
        <div>
          <u-button
            class="u-m-r-15"
            size="mini"
            shape="circle"
            @click="applyAgain"
            >再次申请</u-button
          >
        </div>
      </template>
      <!-- 退款成功 -->
      <template v-if="addressInfo.afterSales.status == 2">
        <div>
          <u-button
            class="u-m-r-15"
            size="mini"
            shape="circle"
            @click="
              $navigateTo('/pages/shopOrders/moneyTo', {
                order_id: addressInfo.afterSales.order_id,
                order_item_id: addressInfo.afterSales.order_item_id,
              })
            "
            >钱款去向</u-button
          >
        </div>
      </template>
    </div>
    <!-- <custom-card-container title="您的申请已被商家拒绝">
      <div slot="body">
        拒绝原因：产品质量无任何问题，麻烦亲拍照我看一下产品的完整性再寄出哦，避免不必要的运费。
      </div>
      <u-cell-item slot="foot" icon="setting-fill" title="个人设置" />
    </custom-card-container> -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import dayjs from 'dayjs';
// import { showToast } from '@/utils';
import {
  reqLegitimateDetail,
  reqCancelLegitimate,
  reqRefundStatus,
} from '@/api';
import { navigateTo, redirectTo } from '@/utils';

export default Vue.extend({
  components: {},
  props: {
    id: Number,
  },
  data: () => ({
    // 维权详情
    addressInfo: {} as any,
    numList: [
      {
        name: '提交申请',
      },
      {
        name: '商家处理',
      },

      {
        name: '退款成功',
      },
    ],
    // 当前状态
    curStatus: 0,
    // 撤销申请
    revokeApplyContent:
      '您将撤销本次申请，如果问题未解决，您还可以再次发起，确定继续吗？',
    // 是否撤销申请
    isRevokeApply: false,
    /** 成功时间*/
    createtime: 0,
    /** 返回钱数*/
    totalRefundMoney: '',
    // 自动维权的时间
    automaticTime: 0,
  }),
  computed: {},
  methods: {
    // 获取维权详情
    async getRightDetail(orderId: Key, shopId: Key) {
      const { data } = await reqLegitimateDetail(orderId, shopId);
      this.addressInfo = data.data;

      // 商家处理中
      if (this.addressInfo.afterSales.status == 0) {
        this.curStatus = 1;
        this.automaticTime =
          dayjs(data.data.afterSales.createtime * 1000)
            .add(
              this.addressInfo.OrderBaseParam.toApplyForRightsOvertime.value,
              'day'
            )
            .unix() - dayjs().unix();
        // 七天退换。请退货给商家
      } else if (this.addressInfo.afterSales.status == 2) {
        const { data } = await reqRefundStatus(orderId, shopId);
        if (data.data.status == 1) {
          this.curStatus = 2;
          this.createtime = data.data.createtime;
          this.totalRefundMoney = data.data.total_refund_money;
        }
      }
    },
    // 撤销申请
    revokeApply() {
      this.isRevokeApply = true;
    },
    // 确认撤销申请
    async revokeApplyConfirm() {
      await reqCancelLegitimate(
        this.addressInfo.afterSales.order_id,
        this.addressInfo.afterSales.order_item_id,
        this.addressInfo.afterSales.id
      );
      uni.showToast({
        title: '撤销申请成功',
        mask: true,
        success() {
          setTimeout(() => {
            redirectTo('/pages/shopOrders/afterSales');
          }, 1500);
        },
      });
    },
    // 再次申请
    applyAgain() {
      navigateTo('/pages/shopOrders/selectAfterSaleType', {
        goodsId: this.addressInfo.orderGoods[0].goods_id,
        goodsOrderId: this.addressInfo.orderGoods[0].id,
        orderId: this.addressInfo.id,
        afterSalesId: this.addressInfo.afterSales.id,
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { orderId: any; shopId: any }) {
    this.getRightDetail(options.orderId, options.shopId);
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
@include full-page('order-details', #f2f2f2);
.order-details {
  position: relative;
  padding-bottom: 50rpx;
}
/* 页头-订单状态 */
.header-container {
  flex-direction: column;
  position: relative;
  width: 750rpx;
  color: #ffffff;
  .order-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 750rpx;
    height: 334rpx;
  }
  .status-container {
    position: relative;
    z-index: 10;
    padding-top: 44rpx;
    margin-bottom: 24rpx;
    font-size: 34rpx;
  }
  .tips-container {
    position: relative;
    text-align: center;
    margin-bottom: 40rpx;
    z-index: 10;
  }
  .btns-container {
    ::v-deep .u-steps .u-steps__item {
      min-width: 180rpx;
    }
    @extend .tips-container;
  }
}
.text-style {
  color: #acacac;
  font-size: 24rpx;
}
.tips-container {
  .tips-text {
    font-size: 24rpx;
    color: #fff;
  }
}
/* 底部操作栏 */
.footer-container {
  z-index: 1;
  position: fixed;
  bottom: 0;
  height: 120rpx;
  width: 100%;
  background: #ffffff;
  u-button {
    margin-left: 40rpx;
  }
}
</style>
