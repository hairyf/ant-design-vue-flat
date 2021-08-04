<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-11 10:57:59
 * @LastEditTime: 2021-05-19 16:25:02
 * @Description: 订单详情
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="order-details" v-if="order.order_sn">
    <!-- 订单状态 -->
    <div class="header-container u-flex">
      <image
        class="order-bg"
        src="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/order-bg.png"
      />
      <!-- 等待付款 -->
      <template v-if="order.status == 0">
        <div class="status-container u-flex">
          <u-icon
            class="u-margin-right-20"
            size="40"
            name="clock"
            color="#ffffff"
          />
          <span class="status-text">等待付款</span>
        </div>
        <div class="tips-container">
          <span class="tips-text">需付款：￥{{ order.total_fee }}</span>
          <span
            class="tips-text u-margin-left-40"
            v-if="config.cancelOrder.type == 1"
          >
            剩余：
            {{ durationsText || '0小时0分0秒' }}
          </span>
        </div>
      </template>
      <!-- 等待商家发货 -->
      <template v-if="order.status == 1">
        <div class="status-container">
          <span class="status-text">等待商家发货</span>
        </div>
        <div class="tips-container">
          <span class="tips-text u-text-center">商家正在拣货中~</span>
        </div>
      </template>
      <!-- 商品出库 -->
      <template v-if="order.status == 2">
        <div class="status-container u-flex">
          <view-icon
            class="u-margin-right-20"
            size="40"
            name="cl-car"
            color="#ffffff"
          />
          <span class="status-text">商品出库</span>
        </div>
        <div class="tips-container u-text-center">
          <span class="">正在为您运送中</span>
          <p
            class="tips-text u-m-t-15"
            v-if="config.affirmTakeDeliveryTime.type == 1"
          >
            自动收货时间： {{ durationsText }}
          </p>
        </div>
      </template>

      <!-- 已完成 -->
      <template v-if="order.status == 3">
        <div class="status-container">
          <u-icon
            class="u-margin-right-20"
            size="40"
            name="checkmark-circle"
            color="#ffffff"
          />
          <span class="status-text">已完成</span>
        </div>
        <div class="tips-container">
          <span class="tips-text">订单已经完成~</span>
        </div>
      </template>
      <!-- 已取消 -->
      <template v-if="order.status == -1">
        <div class="status-container">
          <u-icon
            class="u-margin-right-20"
            size="40"
            name="checkmark-circle"
            color="#ffffff"
          />
          <span class="status-text">已取消</span>
        </div>
        <div class="tips-container">
          <span class="tips-text">订单已经取消~</span>
        </div></template
      >
    </div>
    <!-- 用户地址信息 -->
    <u-card
      :show-head="false"
      :border="false"
      padding="40"
      margin="20rpx 34rpx"
    >
      <div class="address-container" slot="body">
        <div class="layer-1 u-flex u-row-between">
          <div class="info-containe u-flex u-col-center">
            <div class="custom-title u-m-b-20">
              {{ order.consignee }}
            </div>
          </div>
          <span
            class="btns-container custom-title u-flex u-row-between"
            v-if="order.status == 0 || order.status == 1"
            @click="$navigateTo('/pages/users/addressList', { select: true })"
          >
            <span style="margin-top: -5rpx"> 修改 </span>
            <u-icon size="30" name="arrow-right" color="#000" />
          </span>
        </div>
        <div class="layer-2">
          <div class="left-column u-flex u-row-between">
            <div class="tips-style">
              地址：{{ order.province_name || '' }}{{ order.city_name || ''
              }}{{ order.area_name || '' }}{{ order.address || '' }}
            </div>
          </div>
        </div>
      </div>
    </u-card>
    <div>
      <!-- 物流信息和商品信息 -->
      <div
        class="tips-container"
        :key="index"
        v-for="(item, index) in logisticsInfo"
      >
        <!-- 物流信息 -->
        <u-card
          :show-head="false"
          :border="false"
          padding="40"
          margin="20rpx 34rpx"
          v-if="order.status == 2"
        >
          <div class="address-container" slot="body">
            <div class="layer-1 u-flex logistics">
              <div class="left-column">物流信息</div>
              <u-time-line class="right-column u-flex-1">
                <template v-for="(citem, cindex) in item.logistics.info.data">
                  <u-time-line-item
                    nodeTop="2"
                    :key="cindex"
                    v-if="Number(cindex) < 3"
                  >
                    <view
                      slot="node"
                      class="u-node"
                      :style="{ background: $hexColor['--color-primary'] }"
                    />
                    <div slot="content">
                      <div
                        class="u-order-title width-style over-text tips-style"
                        style="color: #000"
                      >
                        {{ citem.AcceptStation }}
                      </div>
                      <div class="u-order-time tips-style">
                        {{ citem.AcceptTime }}
                      </div>
                    </div>
                  </u-time-line-item>
                </template>
              </u-time-line>
              <span
                class="btns-container u-flex tips-style u-row-between"
                @click="
                  $navigateTo('/pages/shopOrders/viewLogisticsInfo', {
                    logisticsInfo: encodeURIComponent(
                      JSON.stringify(logisticsInfo[index])
                    ),
                    orderInfo: encodeURIComponent(JSON.stringify(order)),
                  })
                "
              >
                <span style="margin-top: -5rpx">查看完整物流信息</span>
                <u-icon size="20" name="arrow-right" color="#acacac" />
              </span>
            </div>
            <!-- <div class="layer-2">
            <span class="info-container">
              <span>{{ order.consignee }}</span>
              <span class="u-margin-left-40">{{ order.phone }}</span>
            </span>
            <div class="layer-3 details u-m-t-30">
              地址：{{ order.province_name }}{{ order.city_name
              }}{{ order.area_name }}{{ order.address }}
            </div>
          </div> -->
          </div>
        </u-card>
        <u-card
          v-if="order.status == 3"
          :show-head="false"
          :border="false"
          padding="28"
          margin="20rpx 34rpx"
        >
          <div slot="body" class="complete-box">
            <div class="complete-text">您的快递已由客户指定地带代收</div>
            <div
              @click="
                $navigateTo('/pages/shopOrders/viewLogisticsInfo', {
                  logisticsInfo: encodeURIComponent(
                    JSON.stringify(logisticsInfo[index])
                  ),
                  orderInfo: encodeURIComponent(JSON.stringify(order)),
                })
              "
            >
              <span class="complete-right" style="margin-top: -5rpx"
                >查看完整物流信息</span
              >
              <u-icon size="20" name="arrow-right" color="#acacac" />
            </div>
          </div>
        </u-card>
        <!-- 商品信息 -->
        <common-order-shop-list
          :isProtection="config.affirmTakeDeliveryProtect.type"
          :list="item.goods"
          :order="order"
          :service_phone="config.service_phone"
        />
      </div>
    </div>

    <!-- 订单信息 -->
    <u-card
      :show-head="false"
      :border="false"
      padding="40"
      margin="20rpx 34rpx"
    >
      <div class="order-info-container" slot="body">
        <div class="info-layer">
          <div class="title">订单编号：</div>
          <div class="content over-text">{{ order.order_sn }}</div>
        </div>
        <div class="info-layer u-margin-bottim-40">
          <div class="title">下单时间：</div>
          <div class="content">
            {{ $formatUnix(order.createtime) }}
          </div>
        </div>
        <div class="info-layer u-margin-bottim-40" v-if="order.status != -1">
          <div class="title">配送方式：</div>
          <div class="content">普通快递</div>
        </div>
        <div class="info-layer" v-if="order.status != -1 && order.status != 0">
          <div class="title">支付方式：</div>
          <div class="content" v-if="order.pay_type == 'WxPay'">微信支付</div>
          <div class="content" v-if="order.pay_type == 'Alipay'">
            支付宝支付
          </div>
          <div class="content" v-if="order.pay_type == 'BalancePay'">
            余额支付
          </div>
        </div>
        <div class="info-layer u-margin-bottim-40">
          <div class="title">支付时间：</div>
          <div class="content" v-if="order.status != -1 && order.status != 0">
            {{ $formatUnix(order.paytime) }}
          </div>
          <div v-else class="content">无</div>
        </div>
        <div class="info-layer u-margin-bottim-40">
          <div class="title">备注：</div>
          <div class="content" v-if="order.status == 3 || order.status == 2">
            {{ order.memo == '' ? '无' : order.memo }}
          </div>
          <div class="content" v-else>
            {{ order.remark == '' ? '无' : order.remark }}
          </div>
        </div>
        <div class="price-layer u-margin-bottim-28">
          <span class="title">商品总额</span>
          <span class="content">￥ {{ order.goods_amount }}</span>
        </div>
        <div class="price-layer u-margin-bottim-40">
          <span class="title">运费</span>
          <span class="content">￥ {{ order.dispatch_amount }}</span>
        </div>
        <div class="price-layer">
          <span class="title"></span>
          <span class="content">
            <span class="tips"
              >{{ order.status === 0 ? '需付款' : '实付款' }}：</span
            >
            <span class="price">￥ {{ order.total_fee }}</span>
          </span>
        </div>
      </div>
    </u-card>
    <!-- 底部操作栏 -->
    <custom-fixed-footer v-if="true" class="u-border-top">
      <!-- 等待付款 -->
      <template v-if="order.status == 0">
        <u-button
          ripple
          class="u-m-r-30"
          size="mini"
          shape="circle"
          @click="cancelOrder"
        >
          取消订单
        </u-button>
        <u-button
          ripple
          size="mini"
          class="u-m-r-30"
          shape="circle"
          @click="$navigateTo('/pages/users/addressList', { select: true })"
        >
          修改地址
        </u-button>
        <u-button
          ripple
          type="primary"
          plain
          size="mini"
          shape="circle"
          :custom-style="{
            background: $hexColor['--color-primary-light-9'] + ' !important',
            borderColor: $hexColor['--color-primary'] + ' !important',
            color: $hexColor['--color-primary'] + ' !important',
          }"
          @click="$navigateTo('/pages/shopOrders/cashier', { id: order.id })"
        >
          去支付
        </u-button>
      </template>
      <!-- 等待发货 -->
      <template v-if="order.status == 1">
        <!-- <u-button
          ripple size="mini" shape="circle">催发货</u-button> -->
        <u-button
          ripple
          size="mini"
          shape="circle"
          class="u-m-r-30"
          @click="$navigateTo('/pages/users/addressList', { select: true })"
        >
          修改地址
        </u-button>
        <u-button
          ripple
          type="primary"
          plain
          size="mini"
          class="u-m-r-30"
          shape="circle"
          :custom-style="{
            background: $hexColor['--color-primary-light-9'] + ' !important',
            borderColor: $hexColor['--color-primary'] + ' !important',
            color: $hexColor['--color-primary'] + ' !important',
          }"
          @click="buyAgain"
        >
          再次购买
        </u-button>
      </template>
      <!-- 待收货 -->
      <template v-if="order.status == 2">
        <u-button
          ripple
          size="mini"
          shape="circle"
          class="u-m-r-30"
          @click="addShopCart()"
          >加入购物车</u-button
        >
        <!-- <u-button
          ripple size="mini" class="u-m-r-30" shape="circle"
          >查看物流</u-button
        > -->
        <u-button
          ripple
          class="u-m-r-30"
          size="mini"
          shape="circle"
          plain
          type="primary"
          :custom-style="{
            background: $hexColor['--color-primary-light-9'] + ' !important',
            borderColor: $hexColor['--color-primary'] + ' !important',
            color: $hexColor['--color-primary'] + ' !important',
          }"
          @click="confirmGoods"
        >
          确认收货
        </u-button>
      </template>
      <!-- 已完成 -->
      <template v-if="order.status == 3">
        <u-button
          ripple
          size="mini"
          shape="circle"
          @click="addShopCart()"
          class="u-m-r-30"
          >加入购物车</u-button
        >
        <!-- <u-button
          ripple size="mini" class="u-m-r-30" shape="circle"
          >查看物流</u-button
        > -->
        <template
          v-if="
            order.orderGoods.some((v) => v.comment_status == 0) &&
            is_open_comment &&
            order.type != 2
          "
        >
          <u-button
            ripple
            class="u-m-r-30"
            size="mini"
            plain
            shape="circle"
            type="primary"
            :custom-style="{
              background: $hexColor['--color-primary-light-9'] + ' !important',
              borderColor: $hexColor['--color-primary'] + ' !important',
              color: $hexColor['--color-primary'] + ' !important',
            }"
            @click="evaluate"
          >
            评价
          </u-button>
        </template>
      </template>
      <!-- 已取消 -->
      <template v-if="order.status == -1">
        <!-- <u-button
          ripple size="mini" class="u-m-r-30" shape="circle"
          >查看物流</u-button
        > -->
        <u-button
          ripple
          class="u-m-r-30"
          size="mini"
          plain
          shape="circle"
          type="primary"
          :custom-style="{
            background: $hexColor['--color-primary-light-9'] + ' !important',
            borderColor: $hexColor['--color-primary'] + ' !important',
            color: $hexColor['--color-primary'] + ' !important',
          }"
          @click="buyAgain"
        >
          再次购买
        </u-button>
      </template>
    </custom-fixed-footer>
  </div>
</template>

<script lang="ts">
import { navigateTo, showToast } from '@/utils';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
dayjs.extend(durationPlugin);
import {
  reqGetOrderDetial,
  reqSeeLogiStics,
  reqConfirmReceipt,
  reqCancelOrder,
  reqEditOrderAddress,
  reqAddCartLists,
} from '@/api';
import { computed, defineComponent } from '@vue/composition-api';
import store from '@/store';
export default defineComponent({
  components: {},
  props: {},
  data: () => ({
    id: 0,
    // 订单详情
    order: {} as any,
    // 物流信息
    logisticsInfo: [] as any,
    // 订单配置
    config: {} as any,
    // 地址信息
    addressDetail: {} as any,

    // 倒计时时间戳
    timestamp: 0,
    // 倒计时标识
    timer: 0,
    // 自动取消倒计时
    durationsText: '',
  }),
  computed: {
    // 订单倒计时
    durations(): any {
      const durations = dayjs.duration(this.timestamp);
      return durations.$d;
    },
    // durationsText() {
    //   return;
    // },
  },
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    const is_open_comment = computed(() => {
      return store.state.common.commentSet.is_open_comment == '1';
    });
    return { $hexColor, is_open_comment };
  },
  methods: {
    // 获取订单信息
    async getOrderInfo(id: Key) {
      // 获取数据
      const { data } = await reqGetOrderDetial(id);
      this.order = data.data.order[0];
      this.config = data.data.config;
      // 清除上一个定时器
      clearInterval(this.timer);
      // 进行订单倒计时
      // 自动收货时间
      if (this.order.status == 2) {
        // 初始化倒计时
        const objTimeFast = this.countDown(
          this.order.shipments_time,
          this.config.affirmTakeDeliveryTime.value,
          'day'
        );
        this.durationsText = `${objTimeFast.leftd}天${objTimeFast.lefth}小时${objTimeFast.leftm}分钟`;
        // 正式倒计时
        this.timer = setInterval(async () => {
          const objTime = this.countDown(
            this.order.shipments_time,
            this.config.affirmTakeDeliveryTime.value,
            'day'
          );

          if (
            objTime.endTime <= 0 &&
            this.config.affirmTakeDeliveryTime.type == 1
          ) {
            await reqConfirmReceipt(this.order.id);
            clearInterval(this.timer);
          }
          this.durationsText = `${objTime.leftd}天${objTime.lefth}小时${objTime.leftm}分钟`;
        }, 60000);
      }
      // 倒计时自动取消
      if (this.order.status == 0) {
        // 初始化倒计时
        const objTimeFast = this.countDown(
          this.order.createtime,
          this.config.cancelOrder.value,
          'm'
        );
        this.durationsText = `${objTimeFast.lefth}小时${objTimeFast.leftm}分${objTimeFast.lefts}秒`;
        this.timer = setInterval(() => {
          const objTime = this.countDown(
            this.order.createtime,
            this.config.cancelOrder.value,
            'm'
          );
          if (objTime.endTime <= 0 && this.config.cancelOrder.type == 1) {
            clearInterval(this.timer);
            reqCancelOrder(this.order.id);
          }
          this.durationsText = `${objTime.lefth}小时${objTime.leftm}分${objTime.lefts}秒`;
        }, 1000);
      }
    },
    // 封装倒计时
    countDown(currentTime: number, countDownTime: number, countDownType: any) {
      const timestamp =
        dayjs(currentTime * 1000)
          .add(Number(countDownTime), countDownType)
          .unix() - dayjs().unix();
      // this.timestamp -= 1;
      if (timestamp <= 0) {
        clearInterval(this.timer);
        // reqCancelOrder(this.order.id);
      }
      return {
        leftd: Math.floor(timestamp / (60 * 60 * 24)),
        lefth: Math.floor((timestamp / (60 * 60)) % 24),
        leftm: Math.floor(((timestamp * 1000) / (1000 * 60)) % 60),
        lefts: Math.floor(((timestamp * 1000) / 1000) % 60),
        endTime: timestamp,
      };
    },
    // 获取物流信息
    async getLogiStics() {
      const { data } = await reqSeeLogiStics(this.order.id);
      this.logisticsInfo = data.data;
    },
    // 确认收货
    async confirmGoods() {
      uni.showModal({
        title: '确认收货',
        content: '您确认收货吗？',
        success: async (res) => {
          if (res.confirm) {
            await reqConfirmReceipt(this.order.id);
            await showToast({
              icon: 'none',
              title: '确认收货成功',
            });
            this.$navigateBack();
          }
        },
      });
    },
    // 申请售后
    async applyRefund(goods: any) {
      this.$navigateTo('/pages/shopOrders/selectAfterSaleType', {
        goodsId: goods.goods_id,
        goodsOrderId: goods.id,
        orderId: this.order.id,
      });
    },
    // 取消订单
    async cancelOrder() {
      uni.showModal({
        title: '取消订单',
        content: '您确认取消该订单吗？',
        success: async (res) => {
          if (res.confirm) {
            await reqCancelOrder(this.order.id);
            await showToast({
              icon: 'none',
              title: '取消订单成功',
            });
            this.$navigateBack();
          }
        },
      });
    },
    evaluate() {
      navigateTo('/pages/shopOrders/commodityEvaluation', { id: this.id });
    },
    // 加入购物车
    async addShopCart(select?: boolean) {
      const cartParms = [] as any;
      // 加入购物车的参数整理
      this.logisticsInfo.forEach((item: any) => {
        item.goods.forEach((item: any) => {
          cartParms.push({
            goods_id: item.goods_id,
            sku_id: item.goods_sku_id,
            num: item.goods_num,
            price: item.goods_price,
          });
        });
      });
      await reqAddCartLists(cartParms);
      if (!select) showToast({ title: '加入购物车成功' });
    },
    // 再次购买
    async buyAgain() {
      // this.$navigateTo('/pages/baseTabBars/shopCart', {
      //   id: this.order.orderGoods[0].goods_id,
      // });
      /**
       *
       * 加入购物车 并 选中
       *
       * */
      const selectAgain = true;
      /**加入购物车*/
      await this.addShopCart(selectAgain);
      /**选中id */
      const ids = [] as any;
      this.logisticsInfo.forEach((item: any) => {
        item.goods.forEach((item: any) => {
          ids.push(item.goods_id);
        });
      });

      this.$navigateTo('/pages/baseTabBars/shopCart', {
        ids: JSON.stringify(ids),
      });
    },
    // 修改地址
    async editAddress(item: any) {
      await reqEditOrderAddress({
        id: this.order.id,
        phone: item.phone,
        consignee: item.consignee,
        province_name: item.province_name,
        city_name: item.city_name,
        area_name: item.area_name,
        address: item.address,
        province_id: item.province_id,
        city_id: item.city_id,
        area_id: item.area_id,
      });
      this.getOrderInfo(this.order.id);
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  async onLoad(options: { id: number }) {
    this.id = options.id;
    await this.getOrderInfo(options.id);
    await this.getLogiStics();
    uni.$on('address-select', this.editAddress);
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  async onShow() {
    // 获取地址信息
    if (typeof this.order.id !== 'undefined') {
      await this.getOrderInfo(this.order.id);
      await this.getLogiStics();
    }
  },
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {
    uni.$off('address-select', this.editAddress);
  },
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
.order-details {
  padding-bottom: 90rpx;
}
@include full-page('order-details', #f2f2f2);
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
    @extend .tips-container;
  }
}

/* 地址信息 */
.address-container {
  position: relative;
  z-index: 10;
  color: #000;
  .layer-1.logistics {
    margin-bottom: 40rpx;
    align-items: flex-start;
    .left-column {
      width: 150rpx;
    }
    .right-column {
      flex-shrink: 0;
    }
    .u-node {
      height: 16rpx;
      width: 16rpx;
      border-radius: 100rpx;
    }
    .u-order-time {
      margin-top: 5rpx;
      color: #acacac;
    }
  }
  .layer-2 {
    margin-bottom: 20rpx;
  }
  .details {
    font-size: 20rpx;
    color: #acacac;
  }
  .width-style {
    width: 240rpx;
  }
}

/* 商品信息 */
.custom-box-width {
  width: 382rpx;
}
.custom-flex {
  .custom-image {
    flex-shrink: 0;
  }
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.custom-box-style {
  width: 341rpx;
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
  .price-layer {
    display: flex;
    justify-content: space-between;
    .content {
      font-weight: 550;
    }
    .tips {
      font-weight: normal;
      font-size: 24rpx;
    }
    .price {
      color: #ff3d00;
    }
  }
}
.custom-title {
  font-size: 22rpx;
  color: #000;
  font-weight: bold;
}
.custom-flex {
  margin-top: 0;
}
.over-text {
  min-width: 386rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tips-style {
  color: #acacac;
  font-size: 20rpx;
}
.complete-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .complete-text {
    font-size: 24rpx;
    color: #000;
  }
  .complete-right {
    color: #acacac;
    font-size: 22rpx;
  }
}
/**底部操作栏*/
// .u-border-top{
//   display: flex;

// }
</style>
