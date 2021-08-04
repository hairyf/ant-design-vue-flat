<template>
  <div class="fill-logistics">
    <!-- 换货商品 -->
    <custom-card-container
      :title="sendInfo.afterSales.type == 2 ? '退款商品' : '换货商品'"
    >
      <div slot="body" class="details">
        <div class="refund-lay-image">
          <u-image
            width="60px"
            height="60px"
            :src="sendInfo.orderGoods[0].goods_image"
          ></u-image>
          <div class="u-margin-left-30 refund-info-body right">
            <div class="text-style">
              {{ sendInfo.orderGoods[0].goods_title }}
            </div>
            <div class="u-margin-top-15 specifications">
              {{
                sendInfo.orderGoods[0].goods_sku_text == 0
                  ? '无'
                  : sendInfo.orderGoods[0].goods_sku_text
              }}
            </div>
          </div>
        </div>
      </div>
    </custom-card-container>
    <!-- 换货信息 -->
    <custom-card-container title="退款信息">
      <div slot="body" class="details">
        <div v-if="sendInfo.afterSales.type == 3">
          <div class="body-flex-between">
            <div><span class="font-color-red">*</span>换货商品</div>
            <div class="body-flex-between">
              {{ sendInfo.afterSales.refund_num }}件
            </div>
          </div>
        </div>
        <div>
          <div class="body-flex-between u-margin-top-15">
            <div><span class="font-color-red">*</span> 物流单号</div>
            <div class="body-flex-between">
              <u-input
                v-model="logisticsInput"
                type="text"
                :clearable="false"
                placeholder="请填写单号"
              />
              <u-icon class="tips-color" name="scan"></u-icon>
            </div>
          </div>
        </div>
        <div>
          <div
            class="body-flex-between u-margin-top-15"
            @click="
              $navigateTo('/pages/shopOrders/expressSelect', {
                logisticsInfomation: sendInfo,
              })
            "
          >
            <div><span class="font-color-red">*</span>物流公司</div>
            <div>{{ companyName }}</div>
          </div>
        </div>
        <div>
          <!-- <div class="body-flex-between u-margin-top-15">
            <div><span class="font-color-red">*</span>联系电话</div>
            <div class="body-flex-between">
              <span class="">
                <u-input
                  v-model="mobile"
                  type="text"
                  placeholder="请输入电话号"
                />
              </span>
              <view-icon class="tips-color" name="cl-phone"></u-icon>
            </div>
          </div> -->
        </div>
      </div>
    </custom-card-container>
    <!-- 提交按钮 -->
    <div class="but-margin">
      <u-button
        shape="circle"
        type="primary"
        @click="sumitEvent()"
        ripple
        :custom-style="{
          background: $hexColor['--color-primary'],
        }"
        >提交</u-button
      >
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { reqApplyAfterSales } from '@/api';
import { computed } from '@vue/composition-api';
import { navigateBack, showToast } from '@/utils';
import store from '@/store';
export default Vue.extend({
  components: {},
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
  data: () => ({
    logisticsInput: '',
    companyName: '请选择',
    mobile: '',
    sendInfo: {} as any,
    code: '',
    // 换货商品规格
    specifications: '',
    show: false,
  }),
  computed: {},
  methods: {
    async sumitEvent() {
      if (this.sendInfo.afterSales.type == '2') {
        if (this.companyName && this.logisticsInput) {
          const orderId = this.sendInfo.id;
          const orderItemId = this.sendInfo.orderGoods[0].id;
          const orderAfterId = this.sendInfo.afterSales.id;
          await reqApplyAfterSales({
            order_after_sale_id: orderAfterId,
            order_id: orderId,
            order_item_id: orderItemId,
            express_company: this.companyName,
            express_company_code: this.code,
            express_sn: this.logisticsInput,
          });
          await showToast({ title: '提交成功!', mask: true });
          navigateBack();
        } else {
          showToast({
            icon: 'none',
            title: '请填写单号和物流公司',
          });
        }
      } else {
        if (this.companyName && this.logisticsInput) {
          const orderId = this.sendInfo.id;
          const orderItemId = this.sendInfo.orderGoods[0].id;
          const orderAfterId = this.sendInfo.afterSales.id;
          await reqApplyAfterSales({
            order_after_sale_id: orderAfterId,
            order_id: orderId,
            order_item_id: orderItemId,
            express_company: this.companyName,
            express_company_code: this.code,
            express_sn: this.logisticsInput,
          });
          await showToast({ title: '提交成功!', mask: true });
          navigateBack();
        } else {
          showToast({
            icon: 'none',
            title: '请填写单号和物流公司',
          });
        }
      }
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: {
    /**退货详情 */
    legitimateInfo: any;
  }) {
    /**退货详情 */
    this.sendInfo = JSON.parse(decodeURIComponent(options.legitimateInfo));
    uni.$on('sendLegitimate', (item: any) => {
      this.companyName = item.company_name;
      this.code = item.code;
    });
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {
    uni.$off('sendLegitimate');
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
@include full-page('fill-logistics', #f2f2f2);
.fill-logistics {
  border-top: 1rpx solid #f2f2f2;
}
.custom-card-container {
  .refund-lay-image {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .refund-info-body {
      width: 100%;
    }
    .text-style {
      color: #000;
      font-size: 24rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .specifications {
      font-size: 20rpx;
      color: #acacac;
    }
    .right {
      flex: 1;
    }
  }
}
.body-flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.but-margin {
  margin: 160rpx 46rpx;
}
.tips-color {
  color: #acacac;
}
.font-color-red {
  color: red;
}
</style>
