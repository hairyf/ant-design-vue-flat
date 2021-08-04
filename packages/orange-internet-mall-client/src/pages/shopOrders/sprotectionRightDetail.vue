<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-11 10:57:59
 * @LastEditTime: 2021-05-13 16:05:41
 * @Description: 退货退款详情
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="order-details" v-if="addressInfo.afterSales">
    <!-- 订单状态 -->
    <div class="header-container u-flex">
      <image
        class="order-bg"
        src="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/return-goods-background.png"
      />
      <template>
        <!-- 商家处理中 -->
        <div
          class="status-container u-flex"
          v-if="addressInfo.afterSales.status == 0"
        >
          <u-icon size="40" class="u-m-r-12" name="clock" color="#ffffff" />
          <span class="status-text">商家处理中</span>
        </div>
        <div class="tips-container" v-if="addressInfo.afterSales.status == 0">
          <span class="tips-text">
            <u-count-down
              font-size="24rpx"
              separator-size="24rpx"
              bg-color="#FE8027"
              separator-color="#fff"
              color="#fff"
              separator="zh"
              :timestamp="automaticTime"
              :show-seconds="false"
            ></u-count-down>
            后商家未处理将自动退款</span
          >
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
          <p class="tips-text">您已撤销此次订单退款申请，若您的问题未解</p>
          <p class="tips-text">决，可以在有效期内再次申请</p>
        </div>
        <!-- 申请给驳回 -->
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
          <p class="tips-text">您的申请未通过，可修改退货退款申请后在有效</p>
          <p class="tips-text">期内再次申请</p>
        </div>
        <!-- 寄回商品 -->
        <div
          class="status-container u-flex"
          v-if="addressInfo.afterSales.status == 1"
        >
          <view-icon
            class="u-margin-right-20"
            size="40"
            name="cl-exchange"
            color="#ffffff"
          />
          <span class="status-text">七天退换，请退货给商家</span>
        </div>
        <div class="tips-container" v-if="addressInfo.afterSales.status == 1">
          <span class="tips-text"
            >剩余：
            <u-count-down
              font-size="24rpx"
              separator-size="24rpx"
              bg-color="#FE8027"
              separator-color="#fff"
              color="#fff"
              separator="zh"
              :timestamp="agreedTime"
              :show-seconds="false"
            ></u-count-down>
          </span>
        </div>
        <!-- 商家退款 -->
        <div
          class="status-container u-flex"
          v-if="addressInfo.afterSales.status == 3"
        >
          <view-icon
            class="u-margin-right-20"
            size="40"
            name="cl-car"
            color="#ffffff"
          />
          <span class="status-text">待商家收货</span>
        </div>
        <div class="tips-container" v-if="addressInfo.afterSales.status == 3">
          <span class="tips-text">
            <u-count-down
              font-size="24rpx"
              separator-size="24rpx"
              bg-color="#FE8027"
              separator-color="#fff"
              color="#fff"
              separator="zh"
              :timestamp="businessTime"
              :show-minutes="false"
              :show-seconds="false"
            ></u-count-down>
            后商家未处理将自动退款</span
          >
        </div>
        <!-- 退款成功 -->
        <div class="status-container u-flex" v-if="curStatus == 4">
          <view-icon
            class="u-margin-right-20"
            size="40"
            name="oe-hook"
            color="#ffffff"
          />
          <span
            class="status-text"
            v-if="addressInfo.afterSales.timer_type == '0'"
            >退款成功</span
          >
          <span
            class="status-text"
            v-if="addressInfo.afterSales.timer_type == '1'"
            >商家逾期未处理，自动退款成功</span
          >
        </div>
        <div class="tips-container" v-if="curStatus == 4">
          <span class="tips-text"
            >退款金额: ￥{{ totalRefundMoney }} 时间:{{
              $formatUnix(createtime)
            }}</span
          >
        </div>
        <!-- step进度条 -->
        <div
          class="btns-container"
          v-if="
            !(
              addressInfo.afterSales.status == -1 ||
              addressInfo.afterSales.status == -2
            )
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

    <!-- 您的申请已提交 -->
    <custom-card-container
      title="您的申请已提交，商家正在处理中"
      class="custom-card-container"
      v-if="addressInfo.afterSales.status == 0"
    >
      <div slot="body" class="details">
        商家同意后,请按照给出的退货地址退货,并请记录退货运单号如商家拒绝,您可以修改申请后再次发起,商家会重新处理如商家超时未处理,退货申请将达成,请按系统给出的退货地址退货
      </div>
      <div slot="foot">
        <u-cell-item
          icon=""
          title="协商历史"
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
        ></u-cell-item>
      </div>
    </custom-card-container>
    <!-- 您的申请已被商家拒绝 -->
    <custom-card-container
      title="您的申请已被商家拒绝"
      class="custom-card-container"
      v-if="addressInfo.afterSales.status == -1"
    >
      <div slot="body" class="details">
        拒绝原因：{{ addressInfo.afterSales.dismiss_reason }}
      </div>
      <div slot="foot">
        <u-cell-item
          icon=""
          title="协商历史"
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
        ></u-cell-item>
      </div>
    </custom-card-container>
    <!-- 寄回商品 -->
    <custom-card-container
      title="商家已同意退货申请，请尽快退货"
      class="custom-card-container"
      v-if="addressInfo.afterSales.status == 1"
    >
      <div slot="body" class="details">
        <div class="goods-body">
          未与商家协商一致,请勿使用到付或平邮,以免商家拒签货物交易的钱款还在天猫中间账户,确保您资金安全请填写真实退货物流信息,逾期未填写,退货申请将关闭
        </div>
        <div class="goods-footer">商家备注:{{ addressInfo.memo }}</div>
      </div>
      <div slot="foot"></div>
    </custom-card-container>
    <!-- 寄回商品 -->
    <custom-card-container
      title="商家退货信息"
      class="custom-card-container"
      v-if="addressInfo.afterSales.status == 1"
    >
      <div slot="body" class="details">
        <div class="return-box">
          <div class="u-margin-top-15">
            收货人：{{ addressInfo.afterSales.consignee }}({{
              addressInfo.afterSales.phone
            }})
          </div>
          <div class="u-margin-top-15">
            {{ addressInfo.afterSales.province_name
            }}{{ addressInfo.afterSales.city_name
            }}{{ addressInfo.afterSales.area_name
            }}{{ addressInfo.afterSales.address }}
            <span
              class="tips-color"
              @click="
                onCopyText(
                  `${addressInfo.afterSales.province_name}${addressInfo.afterSales.city_name}${addressInfo.afterSales.area_name}${addressInfo.afterSales.address}`
                )
              "
            >
              复制
            </span>
          </div>
        </div>
      </div>
    </custom-card-container>

    <!-- 寄回商品 -->
    <custom-card-container
      title="退货物流单号"
      class="custom-card-container"
      v-if="addressInfo.afterSales.status == 1"
    >
      <div slot="body" class="details">
        <div>
          <u-row gutter="16">
            <u-col span="2">
              <u-icon name="order"></u-icon>
            </u-col>
            <u-col span="7">
              <p>点击填写物流单号</p>
            </u-col>
            <u-col span="3">
              <u-button
                type="primary"
                size="mini"
                :plain="true"
                shape="circle"
                @click="jumpEvent()"
                >填写单号</u-button
              >
            </u-col>
          </u-row>
        </div>
        <div class="refund-tips">
          寄出货品后需填写物流单号，有助于商家订单尽快处理
        </div>
      </div>
      <div slot="foot">
        <u-cell-item
          icon=""
          title="协商历史"
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
        ></u-cell-item>
      </div>
    </custom-card-container>

    <!-- 商家退款 -->
    <custom-card-container
      title="物流信息"
      class="custom-card-container"
      v-if="addressInfo.afterSales.status == 3"
    >
      <!-- <div slot="head-right">
        <span
          class="u-order-time"
          @click="
            $navigateTo('/pages/shopOrders/viewLogisticsInfo', {
              logisticsInfo: JSON.stringify(logisticsInfo),
              orderInfo: JSON.stringify(addressInfo.orderGoods),
            })
          "
          >完整物流信息</span
        >
        <u-icon name="arrow-right" color="#acacac" size="25" />
      </div> -->
      <div slot="body" class="details">
        <div class="express-layer">
          <div>
            {{ addressInfo.afterSales.express_company }}:{{
              addressInfo.afterSales.express_sn
            }}
          </div>
          <!-- <div class="tips-color">修改单号</div> -->
        </div>
        <div>
          <div class="layout-center">
            <u-time-line>
              <u-time-line-item
                nodeTop="2"
                v-for="(item, index) in logisticsInfo"
                :key="index"
              >
                <view
                  slot="node"
                  class="u-node"
                  :style="{ background: $hexColor['--color-primary'] }"
                />
                <div slot="content">
                  <div class="u-order-title">{{ item.AcceptStation }}</div>
                  <div class="u-order-time">{{ item.AcceptTime }}</div>
                </div>
              </u-time-line-item>
            </u-time-line>
          </div>
        </div>
      </div>
      <div slot="foot">
        <u-cell-item
          icon=""
          title="协商历史"
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
        ></u-cell-item>
      </div>
    </custom-card-container>
    <!-- 退货退款完成 -->
    <custom-card-container
      :isShowHead="false"
      v-if="addressInfo.afterSales.status == 2"
    >
      <div slot="foot">
        <u-cell-item
          icon=""
          title="协商历史"
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
        ></u-cell-item>
      </div>
    </custom-card-container>
    <!-- 退款信息 -->
    <common-legitimate-info :returnInfo="addressInfo" title="退款信息" />
    <!-- 底部操作栏 -->
    <union-blank v-if="true" :height="120" />
    <div v-if="true" class="footer-container u-flex u-row-right u-border-top">
      <!-- 提交申请 -->
      <template v-if="addressInfo.afterSales.status == 0">
        <div class="u-flex">
          <u-button
            size="mini"
            shape="circle"
            @click="revokeApply"
            class="u-m-r-15"
            >撤销申请</u-button
          >
          <u-button
            size="mini"
            shape="circle"
            @click="
              $navigateTo('/pages/shopOrders/refundReturnGoods', {
                modify: true,
                type: 2,
                orderId: addressInfo.id,
                goodsId: addressInfo.orderGoods[0].goods_id,
                goodsOrderId: addressInfo.orderGoods[0].id,
                afterSalesId: addressInfo.afterSales.id,
              })
            "
            class="u-m-r-15"
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
            size="mini"
            class="u-m-r-15"
            shape="circle"
            @click="applyAgain"
            >再次申请</u-button
          >
        </div>
      </template>
      <!-- 寄回商品 -->
      <template v-if="addressInfo.afterSales.status == 1">
        <div class="u-flex">
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
          <u-button
            size="mini"
            class="u-m-r-15"
            shape="circle"
            @click="revokeApply"
            >撤销申请</u-button
          >
        </div>
      </template>
      <!-- 商家退款 -->
      <template
        v-if="
          addressInfo.afterSales.status == 3 ||
          addressInfo.afterSales.status == 4
        "
      >
        <div class="u-flex">
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
          <u-button
            size="mini"
            class="u-m-r-15"
            shape="circle"
            @click="revokeApply"
            >撤销售后</u-button
          >
        </div>
      </template>
      <!-- 商家退款 -->
      <template v-if="addressInfo.afterSales.status == 2">
        <div>
          <u-button
            size="mini"
            shape="circle"
            class="u-m-r-15"
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
    <!-- 撤销申请 -->
    <u-modal
      v-model="isRevokeApply"
      title="撤销申请"
      :content="revokeApplyContent"
      confirm-color="#000"
      cancel-color="#000"
      @confirm="revokeApplyConfirm"
      @cancel="isRevokeApply = false"
      :show-cancel-button="true"
    ></u-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import dayjs from 'dayjs';
// import { PLATFORM } from '@/utils';
import {
  reqLegitimateDetail,
  reqCancelLegitimate,
  reqRefundStatus,
  reqCheckLogistics,
} from '@/api';
import { navigateTo, redirectTo, reLaunch, showToast } from '@/utils';
import { computed } from '@vue/composition-api';
import store from '@/store';
import { setClipboardData } from 'uni-clipboard';

export default Vue.extend({
  components: {},
  props: {
    id: Number,
  },
  data: () => ({
    addressInfo: {} as any,
    numList: [
      {
        name: '提交申请',
      },
      {
        name: '商家处理',
      },
      {
        name: '寄回商品',
      },
      {
        name: '商家退款',
      },
      {
        name: '退款成功',
      },
    ],
    /** 当前状态*/
    curStatus: 0,
    /** 撤销申请*/
    revokeApplyContent:
      '您将撤销本次申请，如果问题未解决，您还可以再次发起，确定继续吗？',
    /** 是否撤销申请*/
    isRevokeApply: false,
    /** 成功时间*/
    createtime: 0,
    /** 返回钱数*/
    totalRefundMoney: '',
    logisticsInfo: [] as any[],
    // 申请维权倒计时
    automaticTime: 0,
    // 商家维权同意时间
    agreedTime: 0,
    // 待商家收货的时间
    businessTime: 0,
    orderId: '',
    shopId: '',
  }),
  computed: {},
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
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
      } else if (this.addressInfo.afterSales.status == 1) {
        this.curStatus = 2;
        this.agreedTime =
          dayjs(data.data.afterSales.start_time * 1000)
            .add(this.addressInfo.OrderBaseParam.cancelSafeguard.value, 'day')
            .unix() - dayjs().unix();
        // 待商家收货
      } else if (this.addressInfo.afterSales.status == 3) {
        this.curStatus = 3;
        this.businessTime =
          dayjs(data.data.afterSales.user_shipments_time * 1000)
            .add(
              this.addressInfo.OrderBaseParam.safeguardAutomation.value,
              'day'
            )
            .unix() - dayjs().unix();
        this.getlogisticsData();
        // 维权完成等待退款
      } else if (this.addressInfo.afterSales.status == 2) {
        this.curStatus = 3;
        const { data } = await reqRefundStatus(orderId, shopId);
        if (data.data.status == 1) {
          this.curStatus = 4;
          this.createtime = data.data.createtime;
          this.totalRefundMoney = data.data.total_refund_money;
        }
      }
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
    // 获取物流信息
    async getlogisticsData() {
      const { data } = await reqCheckLogistics(
        this.addressInfo.afterSales.express_company_code,
        this.addressInfo.afterSales.express_sn
      );
      this.logisticsInfo = data.data;
    },
    // 撤销申请
    async revokeApply() {
      this.isRevokeApply = true;
    },
    // 复制功能
    onCopyText(text: string) {
      setClipboardData(text);
      uni.hideToast();
      uni.showToast({ title: '已复制联系方式!' });
    },
    // 确认撤销申请
    async revokeApplyConfirm() {
      await reqCancelLegitimate(
        this.addressInfo.afterSales.order_id,
        this.addressInfo.afterSales.order_item_id,
        this.addressInfo.afterSales.id
      );
      await showToast({
        title: '撤销申请成功!',
        mask: true,
        success() {
          setTimeout(() => {
            redirectTo('/pages/shopOrders/afterSales');
          }, 1500);
        },
      });
    },
    jumpEvent() {
      this.$navigateTo('/pages/shopOrders/fillLogistics', {
        legitimateInfo: encodeURIComponent(JSON.stringify(this.addressInfo)),
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { orderId: any; shopId: any }) {
    this.orderId = options.orderId;
    this.shopId = options.shopId;
    this.getRightDetail(options.orderId, options.shopId);
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.getRightDetail(this.orderId, this.shopId);
  },
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
    margin-bottom: 40rpx;
    z-index: 10;
  }
  .btns-container {
    ::v-deep .u-steps .u-steps__item {
      min-width: 130rpx;
    }
    @extend .tips-container;
  }
}
.return-box {
  font-size: 28rpx;
  color: #000000;
}
.goods-body {
  font-size: 24rpx;
  margin: 0 0 20rpx 0;
  color: #acacac;
}
/**寄回商品*/
.goods-container {
  .goods-header {
    font-size: 32rpx;
    font-weight: bold;
    color: #000000;
  }

  .goods-footer {
    padding: 20rpx;
    border-radius: 8rpx;
    color: #acacac;
    background-color: #eee;
  }
}
/* 订单信息 */
.order-info-container {
  color: #000000;
  .info-layer {
    display: flex;
    margin-bottom: 20rpx;
    .title {
      flex-shrink: 0;
      width: 140rpx;
      margin-right: 20rpx;
      text-align: right;
    }
    .content {
      font-weight: 550;
    }
  }
}
.express-layer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// 申请卡片
.custom-card-container {
  .details {
    font-size: 28rpx;
    color: #acacac;
  }
  .layout-center {
    display: flex;
    justify-content: center;
    margin-top: 48rpx;
  }
  .u-node {
    height: 16rpx;
    width: 16rpx;
    border-radius: 100rpx;
  }
}

.tips-color {
  margin-left: 8rpx;
  color: $u-type-primary;
}
.refund-tips {
  margin: 20rpx 0 0 0;
  font-size: 24rpx;
  color: #acacac;
}
.u-card__foot {
  padding: 0 !important;
}
/* 底部操作栏 */
.footer-container {
  position: fixed;
  bottom: 0;
  z-index: 2;
  height: 120rpx;
  width: 100%;
  background: #ffffff;
  // padding: 0 40rpx;
  // u-button {
  //   margin-left: 40rpx;
  // }
}
</style>
