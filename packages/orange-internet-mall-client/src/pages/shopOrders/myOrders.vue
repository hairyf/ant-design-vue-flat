<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-11 10:57:59
 * @LastEditTime: 2021-05-20 09:44:13
 * @Description: 我的订单
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="my-order">
    <view-controller>
      <!-- 列表导航 -->
      <u-tabs
        :list="tabs"
        :current="tabCurrent"
        :is-scroll="false"
        :font-size="30"
        :gutter="20"
        bg-color="#f7f7f7"
        :active-color="$hexColor['--color-primary']"
        @change="tabCurrent = $event"
      />
      <!-- 订单列表 -->
      <div class="order-list" v-for="(item, index) in list" :key="index">
        <u-card
          :head-border-bottom="false"
          :foot-border-top="false"
          :show-head="false"
          :border="false"
        >
          <div slot="body" class="order-sn u-m-b-30">
            订单号：{{ item.order_sn }}
          </div>
          <div
            class="custom-cart-body u-flex u-m-t-30"
            slot="body"
            @click="
              $navigateTo(`/pages/shopOrders/orderDetails`, { id: item.id })
            "
            v-for="(goods, indexs) in item.orderGoods"
            :key="indexs"
          >
            <u-image
              width="160rpx"
              height="160rpx"
              border-radius="10rpx"
              :src="goods.goods_image"
            />
            <div class="right-column u-flex u-flex-1">
              <div class="title">
                <p class="over-text">{{ goods.goods_title }}</p>
              </div>
              <div class="labels u-margin-bottom-20 u-margin-top-20 sku-hide">
                <!-- <u-tag
                  type="info"
                  class="u-m-r-12"
                  size="mini"
                  :text=""
                  border-color="#F4F4F5"
                  shape="circle"
                /> -->
                <span
                  class="u-m-r-12"
                  style="font-size: 20rpx; color: #acacac; white-space: nowrap"
                >
                  数量：{{ goods.goods_num }}
                </span>
                <span
                  v-if="goods.goods_sku_text != 0"
                  style="font-size: 20rpx; color: #acacac"
                >
                  {{ goods.goods_sku_text }}
                </span>
                <!-- <u-tag
                  v-if="goods.goods_sku_text != 0"
                  type="info"
                  size="mini"
                  :text="goods.goods_sku_text"
                  border-color="#F4F4F5"
                  shape="circle"
                /> -->
              </div>
              <div class="content u-flex u-row-between">
                <span class="price">￥{{ goods.goods_price }}</span>
                <span
                  class="status"
                  v-if="goods.dispatch_status == 0"
                  :style="{ color: $hexColor['--color-primary'] }"
                >
                  等待付款
                </span>
                <span
                  class="status"
                  v-if="goods.dispatch_status == 1"
                  :style="{ color: $hexColor['--color-primary'] }"
                >
                  等待发货
                </span>
                <span
                  class="status"
                  v-if="goods.dispatch_status == 2"
                  :style="{ color: $hexColor['--color-primary'] }"
                >
                  等待收货
                </span>
                <span
                  class="status"
                  v-if="goods.dispatch_status == -1"
                  :style="{ color: $hexColor['--color-primary'] }"
                >
                  已取消
                </span>
                <!-- 已完成 -->
                <span
                  class="position-relative"
                  v-if="goods.dispatch_status == 3"
                  :style="{ color: $hexColor['--color-primary'] }"
                >
                  <view-icon name="cl-completed" size="224" />
                </span>
              </div>
            </div>
          </div>
          <div class="custom-cart-foot" slot="foot">
            <!-- 等待发货 -->
            <template v-if="item.status == 1">
              <u-button
                ripple
                size="mini"
                shape="circle"
                @click="buyAgain(item.orderGoods)"
              >
                再次购买
              </u-button>
              <u-button
                ripple
                size="mini"
                shape="circle"
                @click="editItemAddress(index)"
              >
                修改地址
              </u-button>
              <!-- 暂无催发货功能 -->
              <!-- <u-button
              ripple size="mini" shape="circle">催发货</u-button> -->
            </template>
            <!-- 等待付款 -->
            <template v-if="item.status == 0">
              <u-button
                ripple
                size="mini"
                shape="circle"
                @click="cancelOrder(item.id)"
              >
                取消订单
              </u-button>
              <!-- <u-button
              ripple
              size="mini"
              shape="circle"
              @click="$navigateTo('/pages/users/addressList', { select: true })"
              >修改地址</u-button
            > -->
              <u-button
                ripple
                type="primary"
                plain
                size="mini"
                shape="circle"
                @click="
                  $navigateTo('/pages/shopOrders/cashier', { id: item.id })
                "
                :custom-style="{
                  background:
                    $hexColor['--color-primary-light-9'] + ' !important',
                  borderColor: $hexColor['--color-primary'] + ' !important',
                  color: $hexColor['--color-primary'] + ' !important',
                }"
              >
                去支付
              </u-button>
            </template>
            <!-- 已完成 -->
            <template v-if="item.status == 3">
              <!-- <u-button
              ripple size="mini" shape="circle">加入购物车</u-button> -->
              <!-- <u-button
              ripple size="mini" class="u-m-r-30" shape="circle"
              >查看物流</u-button
            > -->
              <template
                v-if="
                  item.orderGoods.some((v) => v.comment_status == 0) &&
                  item.type != 2 &&
                  is_open_comment
                "
              >
                <u-button
                  ripple
                  class="u-m-r-30"
                  size="mini"
                  plain
                  shape="circle"
                  type="primary"
                  @click="evaluate(item.id)"
                >
                  评价
                </u-button>
              </template>
            </template>
            <!-- 等待收货 -->
            <template v-if="item.status == 2">
              <!-- <u-button
              ripple size="mini" shape="circle">查看物流</u-button> -->
              <u-button
                ripple
                size="mini"
                shape="circle"
                type="primary"
                plain
                @click="confirmGoods(item.id)"
              >
                确认收货
              </u-button>
            </template>
            <!-- 已取消 -->
            <template v-if="item.status == -1">
              <u-button
                ripple
                type="primary"
                plain
                size="mini"
                shape="circle"
                @click="buyAgain(item.orderGoods)"
              >
                再次购买
              </u-button>
              <!-- <u-button
              ripple plain size="mini" shape="circle"> 删除订单 </u-button> -->
            </template>
          </div>
        </u-card>
      </div>
      <!-- 列表为空 -->
      <u-empty :show="show" margin-top="150" text="暂无订单" mode="order" />
      <!-- 登录提示 -->
      <u-toast ref="successToast" />
      <!-- 确定收货 -->
      <!-- <u-modal
     v-model="isRevokeApply"
     title="确认收货"
     :content="receiptText"
     confirm-color="#000"
     cancel-color="#000"
     @confirm="revokeApplyConfirm"
     @cancel="isRevokeApply = false"
     :show-cancel-button="true"
   ></u-modal> -->
    </view-controller>
  </div>
</template>

<script lang="ts">
import {
  reqGetOrderList,
  reqCancelOrder,
  reqConfirmReceipt,
  reqEditOrderAddress,
  reqAddCartLists,
} from '@/api';
import { navigateTo, showToast } from '@/utils';
import { computed, defineComponent, ref, watch } from '@vue/composition-api';
import { useListPaging } from '@/hooks/use-list-paging';
import { onLoad, onShow } from 'uni-composition-api';
import store from '@/store';
export default defineComponent({
  setup: () => {
    // 导航栏信息
    const tabs = ref([
      { id: undefined, name: '全部' },
      { id: 0, name: '待付款' },
      { id: 1, name: '待发货' },
      { id: 2, name: '待收货' },
      { id: 3, name: '已完成' },
      { id: -1, name: '已取消' },
    ]);
    const tabCurrent = ref(0);
    const currentIndex = ref(0);
    onLoad((options) => {
      tabCurrent.value = options?.id;
    });
    const { list, resetList } = useListPaging({
      prohibitInit: true,
      getList: async (page) => {
        const { data } = await reqGetOrderList({
          status: tabs.value[tabCurrent.value].id,
          page,
          limit: 15,
        });
        const req = data.data;
        return req?.data || [];
      },
    });

    watch(tabCurrent, resetList);
    const show = computed(() => {
      return list.value.length == 0;
    });
    onShow(() => {
      resetList();
    });
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    const is_open_comment = computed(() => {
      return store.state.common.commentSet.is_open_comment == '1';
    });
    return {
      $hexColor,
      resetList,
      list,
      tabs,
      tabCurrent,
      currentIndex,
      is_open_comment,
      show,
    };
  },
  components: {},
  data: () => ({
    // receiptText:'你确定收货'
  }),
  computed: {},
  methods: {
    // 取消订单
    async cancelOrder(id: Key) {
      uni.showModal({
        title: '取消订单',
        content: '您确认取消该订单吗？',
        success: async (res) => {
          if (res.confirm) {
            await reqCancelOrder(id);
            await showToast({
              icon: 'none',
              title: '取消订单成功',
            });
            this.resetList();
          }
        },
      });
    },
    // 申请售后
    async applyRefund(order: any) {
      this.$navigateTo('/pages/shopOrders/selectAfterSaleType', {
        orderId: order.id,
      });
    },
    // 确认收货
    async confirmGoods(id: number) {
      uni.showModal({
        title: '确认·收货',
        content: '您确认收货吗？',
        success: async (res) => {
          if (res.confirm) {
            await reqConfirmReceipt(id);
            await showToast({
              icon: 'none',
              title: '确认收货成功',
            });
            this.resetList();
          }
        },
      });
    },
    // 修改地址
    async editItemAddress(index: number) {
      this.currentIndex = index;
      this.$navigateTo('/pages/users/addressList', { select: true });
    },
    evaluate(id: any) {
      navigateTo('/pages/shopOrders/commodityEvaluation', { id });
    },
    // 再次购买
    async buyAgain(item: any) {
      // this.$navigateTo('/pages/baseTabBars/shopCart', {
      //   id: this.order.orderGoods[0].goods_id,
      // });
      /**
       *
       * 加入购物车 并 选中
       *
       * */
      console.log(item);
      // /**加入购物车*/
      const cartParms = [] as any;
      // 加入购物车的参数整理
      item.forEach((v: any) => {
        cartParms.push({
          goods_id: v.goods_id,
          sku_id: v.goods_sku_id,
          num: v.goods_num,
          price: v.goods_price,
        });
      });
      await reqAddCartLists(cartParms);
      // /**选中id */
      const ids = [] as any;
      item.forEach((item: any) => {
        ids.push(item.goods_id);
      });
      this.$navigateTo('/pages/baseTabBars/shopCart', {
        ids: JSON.stringify(ids),
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options: { id: number }) {
    if (typeof options.id !== 'undefined') {
      this.tabCurrent = options.id;
    }
    // 修改地址
    uni.$on('address-select', async (item: any) => {
      const currentItem = this.list[this.currentIndex];
      // console.log(item);
      await reqEditOrderAddress({
        id: currentItem.id,
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
      showToast({ title: '修改地址成功!' });
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
    uni.$off('address-select');
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
/* 全局容器 */
@include full-page('my-order');
// 订单号
.order-sn {
  font-size: 24rpx;
}
.u-card {
  ::v-deep .u-card__foot {
    padding-top: 0 !important;
  }
}
.view-controller__container {
  background-color: #f5f5f5 !important;
}
/* 自定义商品卡片内容 */
.custom-cart-body {
  .right-column {
    margin-left: 28rpx;
    // height: 160rpx;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    .title {
      @include text-hidden-line(2);
      font-size: 24rpx;
      color: #000000;
    }
    .content {
      width: 100%;
      .price {
        font-size: 34rpx;
        font-weight: bold;
        color: #000000;
      }
      .status {
        font-size: 24rpx;
      }
      .position-relative {
        width: 104rpx;
        height: 34rpx;
        position: relative;
        bottom: 102rpx;
        right: 64rpx;
      }
    }
  }
}
.labels {
  u-tag:not(:last-child) {
    margin-right: 20rpx;
  }
}
.u-card__foot {
  padding-top: 0 !important;
}
.custom-cart-foot {
  position: relative;
  .status-image {
    right: 0;
    bottom: 0;
    position: absolute;
  }
  ::v-deep .u-size-mini {
    margin-right: 25rpx;
  }
}
.sku-hide {
  width: 440rpx;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #acacac;
}
.over-text {
  width: 300rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
