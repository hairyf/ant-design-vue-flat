<template>
  <div class="negotiation-history" v-if="list.length">
    <u-card
      :border="false"
      :head-border-bottom="false"
      :foot-border-top="false"
      :show-head="false"
      margin="20rpx 34rpx"
      v-for="item in list"
      :key="item.id"
    >
      <template slot="body">
        <!-- 商家的 -->
        <template v-if="item.user_type == 2">
          <div class="u-flex">
            <u-image width="80rpx" height="80rpx" :src="shop_logo"></u-image>
            <div class="u-m-l-30 right-box">
              <template v-if="item.remark.start_time">
                <div
                  class="u-font-14 consult-text"
                  v-if="status == 1 && type != 1"
                >
                  商家已同意维权申请，发送退货地址，等待会员寄回货物，会员在
                  <u-count-down
                    font-size="28rpx"
                    separator-size="28rpx"
                    bg-color="#ffffff"
                    separator-color="#666"
                    color="#666666"
                    separator="zh"
                    :timestamp="merchantTime"
                  ></u-count-down
                  >内未响应，退货退款申请将自动取消
                </div>
              </template>
              <template v-if="item.remark.start_time && status != 1">
                <div class="u-font-14 consult-text">
                  商家已同意维权申请，发送退货地址，
                </div>
              </template>
              <template v-if="!item.remark.start_time">
                <div class="u-font-14 consult-text">
                  {{ item.title }}
                </div>
              </template>
              <div class="u-font-10 tips-font">
                {{ $formatUnix(item.createtime) }}
              </div>
            </div>
          </div>
          <div>
            <div class="u-font-14 u-m-t-16" v-if="item.remark.province_name">
              <span class="title">退货地址：</span>
              <span class="consult-text">
                {{ item.remark.province_name }}{{ item.remark.city_name
                }}{{ item.remark.area_name }}{{ item.remark.address }}
              </span>
              <p>
                <span class="title"> 收货人：</span>
                <span class="consult-text">
                  {{ item.remark.consignee }} {{ item.remark.phone }}
                </span>
              </p>
            </div>
            <div class="u-m-t-10">
              <span class="u-font-14 title">商家备注： </span>
              <span class="consult-text">
                {{ item.remark.ext ? item.remark.ext : '无' }}
              </span>
            </div>
          </div>
          <!-- <div slot="foot">
          <slot name="foot" />
        </div> -->
        </template>
        <!-- 用户的 -->
        <template v-if="item.user_type == 1">
          <div class="u-flex">
            <u-image width="80rpx" height="80rpx" :src="avatar"></u-image>
            <div class="u-m-l-30 right-box">
              <div class="u-font-14">{{ item.title }}</div>
              <div class="u-font-10 tips-font">
                {{ $formatUnix(item.createtime) }}
              </div>
            </div>
          </div>
          <div v-if="item.remark.express_company">
            <div class="u-font-14 u-m-t-16">
              <span class="title">快递公司：</span>
              <span class="consult-text">
                {{ item.remark.express_company }}
              </span>

              <p>
                <span class="title">快递单号：</span>
                <span class="consult-text">{{ item.remark.express_sn }}</span>
              </p>
            </div>
            <div class="u-m-t-10">
              <span class="u-font-14 title">退货说明：</span>
              <span class="consult-text">
                {{ item.remark.ext ? item.remark.ext : '无' }}
              </span>
            </div>
          </div>
          <!-- <div slot="foot">
          <slot name="foot" />
        </div> -->
        </template>
      </template>
    </u-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { reqNegotiationHitory } from '@/api';
import dayjs from 'dayjs';
import store from '@/store';
export default Vue.extend({
  components: {},
  data: () => ({
    // 协商列表
    list: [] as any,
    avatar: '',
    shop_logo: '',
    status: '' as Key,
    type: '' as Key,
    // 商家同意处理，用户发货的时间
    merchantTime: 0,
    // 配置时间
    deliverTime: 0,
  }),
  computed: {},
  methods: {
    // 获取协商数据
    async getNegotiationHistoryData(
      orderId: Key,
      orderItemId: Key,
      orderAfterSaleId: Key
    ) {
      const { data } = await reqNegotiationHitory(
        orderId,
        orderItemId,
        orderAfterSaleId
      );
      this.list = data.data.data;
      this.shop_logo = data.data.shop_logo;
      this.avatar = store.state.user.info.avatar;

      this.countDown();
    },
    countDown() {
      if (this.status == 1 && this.type != 1) {
        this.list.forEach((item: any) => {
          if (item.remark.province_name) {
            const endTime = item.remark.start_time;
            this.merchantTime =
              dayjs(endTime * 1000)
                .add(this.deliverTime, 'day')
                .unix() - dayjs().unix();
          }
        });
      }
    },
  },
  watch: {},
  // 页面周期函数--监听页面加载
  onLoad(options: {
    order_id: Key;
    order_item_id: Key;
    id: Key;
    status: Key;
    type: Key;
    deliverTime: number;
  }) {
    this.status = options.status;
    this.type = options.type;
    this.deliverTime = options.deliverTime;
    this.getNegotiationHistoryData(
      options.order_id,
      options.order_item_id,
      options.id
    );
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
@include full-page('negotiation-history', #f8f8f8);
.negotiation-history {
  border-top: 2rpx solid transparent;
}
.title {
  color: #000;
}
.tips-font {
  color: #acacac;
}
.consult-text {
  color: #666;
}
.right-box {
  flex: 1;
}
</style>
