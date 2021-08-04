<template>
  <div class="view-logistics-info font-color">
    <div>
      <u-card
        :show-head="false"
        :border="false"
        padding="20"
        margin="20rpx 34rpx"
      >
        <div
          slot="body"
          class="u-flex u-border-bottom u-p-b-40"
          v-for="(item, index) in logisticsDetails.goods"
          :key="index"
          @click="
            $navigateTo('/pages/commons/shopDetails', {
              id: item.goods_id,
            })
          "
        >
          <div class="flex-img u-flex-1">
            <u-image
              :width="162"
              :height="162"
              :src="item.goods_image"
            ></u-image>
          </div>
          <div class="u-flex-2 u-margin-left-20">
            <div
              class="u-font-34 font-bold"
              style="color: #000"
              v-if="orderInfo.status == 3"
            >
              已签收
            </div>
            <div class="u-font-34 font-bold" style="color: #000" v-else>
              运输中
            </div>
            <div class="u-flex u-row-between">
              <div class="u-font-24 u-m-t-24">
                <div class="commodity-text">{{ item.goods_title }}</div>
                <div
                  class="u-m-t-12"
                  v-if="logisticsDetails.logistics.info.express_no"
                >
                  {{ logisticsDetails.logistics.info.express_name || '' }}：{{
                    logisticsDetails.logistics.info.express_no
                  }}
                </div>
                <div class="u-m-t-12" v-else>无需物流</div>
              </div>
              <div>
                <u-icon
                  size="24"
                  class="u-m-l-30"
                  name="arrow-right"
                  color="#acacac"
                />
              </div>
            </div>
          </div>
        </div>
        <div slot="body" class="u-m-t-44">
          <div class="font-bold font-color">收货地址</div>
          <div class="u-m-t-20">
            地址：{{ orderInfo.province_name }}{{ orderInfo.city_name
            }}{{ orderInfo.area_name }}{{ orderInfo.address }}
          </div>
        </div>
        <div
          slot="body"
          v-if="logisticsDetails.logistics"
          class="custom-flex u-m-t-30"
        >
          <u-time-line class="right-column u-flex-1">
            <template>
              <u-time-line-item
                nodeTop="2"
                v-for="(citem, cindex) in logisticsDetails.logistics.info.data"
                :key="cindex"
              >
                <view
                  slot="node"
                  class="u-node"
                  :style="{ background: $hexColor['--color-primary'] }"
                />
                <div slot="content">
                  <div
                    :class="[
                      'u-font-24',
                      logisticsDetails.logistics.info.data.length - 1 == cindex
                        ? 'font-color'
                        : 'u-order-time',
                    ]"
                  >
                    {{ citem.AcceptStation }}
                  </div>
                  <div class="u-font-20 u-order-time">
                    {{ citem.AcceptTime }}
                  </div>
                </div>
              </u-time-line-item>
            </template>
          </u-time-line>
        </div>
      </u-card>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { computed } from '@vue/composition-api';
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data: () => ({
    list: {} as any,
    logisticsDetails: {} as any,
    orderInfo: {} as any,
  }),
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
  computed: {},
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { logisticsInfo: any; orderInfo: any }) {
    this.logisticsDetails = JSON.parse(
      decodeURIComponent(options.logisticsInfo)
    );
    this.orderInfo = JSON.parse(decodeURIComponent(options.orderInfo));
    if (this.logisticsDetails.logistics.info.code != 0) {
      uni.showToast({
        title:
          '由于物流接口的原因无法查询物流信息，您可以复制物流单号，到百度查物流',
        icon: 'none',
        duration: 2000,
      });
    }
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
.font-bold {
  font-weight: bold;
}
.font-color {
  color: #000;
}
.flex-img {
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
.custom-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.commodity-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
