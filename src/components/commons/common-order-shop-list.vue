<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-23 12:05:28
 * @LastEditTime: 2021-05-20 16:35:38
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div>
    <u-card
      :show-head="false"
      :border="false"
      padding="20"
      margin="20rpx 34rpx"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="shop-container u-margin-bottom-20 u-flex" slot="body">
        <u-image
          class="left-column custom-image"
          width="220rpx"
          height="220rpx"
          border-radius="10rpx"
          :src="item.goods_image"
          @click="
            $navigateTo('/pages/commons/shopDetails', {
              id: item.goods_id,
            })
          "
        />
        <div
          class="right-column u-flex-1 u-flex over-text u-row-center"
          style="height: 220rpx"
        >
          <div class="layer title over-text">
            {{ item.goods_title }}
          </div>
          <div class="tips">
            数量：{{ item.goods_num }}
            {{ item.goods_sku_text == 0 ? '' : item.goods_sku_text }}
          </div>
          <div class="layer u-flex u-row-betweeen" style="width: 100%">
            <span class="price u-flex-1"> ¥ {{ item.goods_price }} </span>
            <template
              v-if="order.status == 3 || order.status == 2 || order.status == 1"
            >
              <template v-if="order.status == 2 || order.status == 1">
                <u-button
                  v-if="item.after_sale_status == 0"
                  size="mini"
                  plain
                  shape="circle"
                  class="u-m-l-50 u-m-r-15"
                  @click="applyRefund(item)"
                >
                  退换/售后
                </u-button>
              </template>
              <template v-if="order.status == 3">
                <u-button
                  v-if="
                    item.after_sale_status == 0 &&
                    isProtection == '1' &&
                    item.beOverdue
                  "
                  size="mini"
                  plain
                  shape="circle"
                  class="u-m-l-50 u-m-r-15"
                  @click="applyRefund(item)"
                >
                  退换/售后
                </u-button>
              </template>
              <u-button
                v-if="item.after_sale_status == -1"
                size="mini"
                plain
                shape="circle"
                class="u-m-l-50 u-m-r-15"
              >
                再次申请
              </u-button>
              <u-button
                v-if="item.after_sale_status == 1"
                size="mini"
                plain
                shape="circle"
                class="u-m-l-50 u-m-r-15"
                @click="$navigateTo('/pages/shopOrders/afterSales')"
              >
                售后中
              </u-button>
              <u-button
                v-if="item.after_sale_status == 2"
                size="mini"
                plain
                shape="circle"
                class="u-m-l-50 u-m-r-15"
              >
                售后完成
              </u-button>
            </template>
          </div>
        </div>
      </div>
      <!-- 暂无联系客服|拨打电话功能 -->
      <div
        class="shop-btns-container u-border-top u-flex"
        slot="body"
        v-if="list.length - 1 == index"
      >
        <link-controller
          :data="{ type: 'serve' }"
          class="btn-item u-flex u-flex-1 u-row-center u-border-right"
        >
          <view-icon
            class="u-margin-right-20"
            size="40"
            name="cl-news"
            color="#000"
          />
          <span>联系客服</span>
        </link-controller>
        <div
          class="btn-item u-flex u-flex-1 u-row-center"
          @click="$makePhoneCall(service_phone)"
          v-if="order.status != 0"
        >
          <view-icon
            class="u-margin-right-20"
            size="40"
            name="cl-phone"
            color="#000"
          />
          <span>拨打电话</span>
        </div>
      </div>
    </u-card>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import dayjs from 'dayjs';
import Vue from 'vue';
export default Vue.extend({
  props: {
    list: Array as () => any[],
    order: Object,
    service_phone: String,
    // 是否开启维权
    isProtection: String,
  },
  data: () => ({}),
  computed: {},
  methods: {
    // 申请售后
    async applyRefund(goods: any) {
      this.$navigateTo('/pages/shopOrders/selectAfterSaleType', {
        goodsId: goods.goods_id,
        goodsOrderId: goods.id,
        orderId: this.order.id,
      });
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    // 确定收货之后多少天之后不能申请售后
    this.list.forEach((item: any) => {
      if (item.dispatch_status == 3) {
        item.beOverdue = true;
        if (
          dayjs().unix() - item.updatetime >
          24 *
            60 *
            60 *
            Number(
              store.state.common.OrderBaseParam.affirmTakeDeliveryProtect.type
            )
        ) {
          item.beOverdue = false;
        }
      }
    });
  },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
});
</script>

<style lang="scss">
.shop-container {
  .left-column {
    margin-right: 28rpx;
  }
  .right-column {
    flex-direction: column;
    align-items: flex-start;
    // justify-content: space-between;
    .title {
      @include text-hidden-line(2);
      margin-bottom: 24rpx;
      font-size: 24rpx;
      color: #000000;
    }
    .tips {
      margin-bottom: 24rpx;
      font-size: 20rpx;
      color: #acacac;
    }
    .price {
      font-size: 34rpx;
      font-weight: bold;
      color: #000000;
    }
  }
}
.shop-btns-container {
  padding-top: 32rpx;
  padding-bottom: 15rpx;
  .btn-item {
    span {
      font-size: 28rpx;
      color: #000;
    }
  }
}
.over-text {
  width: 386rpx;
  overflow: hidden;
  // white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
