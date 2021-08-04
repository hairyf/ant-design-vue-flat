<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-11 10:57:59
 * @LastEditTime: 2021-05-13 14:06:03
 * @Description: 退款/售后列表
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="after-sales">
    <div style="padding: 15rpx 0">
      <!-- <u-tabs
        :list="tabs"
        :is-scroll="false"
        :current="currentTab"
        bg-color="#f8f8f8"
        :active-color="$hexColor['--color-primary']"
        inactive-color="#ACACAC"
        @change="currentTab = $event"
      ></u-tabs> -->
    </div>
    <u-card
      :show-head="false"
      :border="false"
      padding="20"
      margin="20rpx 34rpx"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="order-item-header u-flex u-row-between" slot="body">
        <div class="order-code">订单号：{{ item.sn }}</div>
        <div class="order-status u-flex">
          <!-- 退货退款 -->
          <template v-if="item.type == 2">
            <view-icon class="u-margin-right-6" name="cl-bucket" size="30" />
            <span class="status-text">退货退款</span>
          </template>
          <!-- 换货 -->
          <template v-if="item.type == 3">
            <view-icon class="u-margin-right-6" name="cl-exchange" size="30" />
            <span class="status-text">换货</span>
          </template>
          <!-- 仅退款 -->
          <template v-if="item.type == 1">
            <view-icon
              class="u-margin-right-6"
              name="cl-return-money"
              size="30"
            />
            <span class="status-text">仅退款</span>
          </template>
        </div>
      </div>
      <div class="order-item-container u-flex" slot="body">
        <div class="left-column">
          <u-image
            width="120"
            height="120"
            :src="item.shopOrderItems[0].goods_image"
          />
        </div>
        <div class="right-column">
          <div class="title">
            {{ item.shopOrderItems[0].goods_title }}
          </div>
          <div class="count">数量：{{ item.shopOrderItems[0].goods_num }}</div>
        </div>
      </div>

      <!-- 换货 -->

      <div
        v-if="item.type == 3"
        class="order-item-footer u-flex u-row-between"
        slot="body"
      >
        <!-- 已申请，等待商家处理 0 -->
        <div class="status-tips" v-if="item.status == 0">
          已申请，等待商家处理
        </div>
        <!-- 已通过，等待商家收货 1 -->
        <div class="status-tips" v-if="item.status == 1">
          已通过，等待商家收货
        </div>
        <!-- 已退货，等待商家收货 3 -->
        <div class="status-tips" v-if="item.status == 3">
          已退货，等待商家收货
        </div>
        <!-- 已发货，等待用户收货 4 -->
        <div class="status-tips" v-if="item.status == 4">
          已发货，等待用户收货
        </div>
        <!-- 已完成，等待商家退款 2 -->
        <div class="tips" v-if="item.status == 2">换货完成</div>
        <!-- 商家已拒绝 -1 -->
        <div class="tips" v-if="item.status == -1">商家已拒绝</div>
        <!-- 用户已撤销 -2 -->
        <div class="tips" v-if="item.status == -2">用户已撤销</div>
        <div class="u-flex">
          <u-button
            shape="circle"
            type=""
            size="mini"
            plain
            v-if="item.status == 2"
            @click="deleteRecord(item.id)"
          >
            删除记录
          </u-button>
          <u-button
            class="u-m-l-15"
            shape="circle"
            type=""
            size="mini"
            plain
            v-if="item.status == 2 && item.comment_status == 0"
            @click="
              $navigateTo(`/pages/shopOrders/afterService`, { id: item.id })
            "
          >
            售后评价
          </u-button>
          <u-button
            class="u-m-l-15"
            shape="circle"
            type=""
            size="mini"
            plain
            v-if="item.status == 2 && item.comment_status == 1"
          >
            已评价
          </u-button>

          <u-button
            class="u-m-l-15"
            shape="circle"
            type=""
            size="mini"
            plain
            v-if="item.status == -1"
            @click="deleteRecord(item.id)"
            >删除记录
          </u-button>
          <u-button
            class="u-m-l-15"
            shape="circle"
            type=""
            size="mini"
            plain
            v-if="item.status == -1"
            @click="applyAgain(item)"
          >
            再次申请
          </u-button>

          <u-button
            class="u-m-l-15"
            shape="circle"
            size="mini"
            plain
            v-if="item.status == -2"
            @click="deleteRecord(item.id)"
            >删除记录
          </u-button>
          <!-- 一直都有 -->
          <u-button
            class="u-m-l-15"
            shape="circle"
            type="primary"
            size="mini"
            plain
            @click="
              $navigateTo('/pages/shopOrders/refundReturnDetail', {
                orderId: item.order_id,
                shopId: item.order_item_id,
              })
            "
          >
            查看详情
          </u-button>
        </div>
      </div>

      <!-- 退货退款 -->
      <div
        v-if="item.type == 2"
        class="order-item-footer u-flex u-row-between"
        slot="body"
      >
        <!-- 已申请，等待商家处理 0 -->
        <div class="status-tips" v-if="item.status == 0">
          已申请，等待商家处理
        </div>
        <!-- 已通过，等待商家收货 1 -->
        <div class="status-tips" v-if="item.status == 1">
          已通过，等待商家收货
        </div>
        <!-- 已退货，等待商家收货 3 -->
        <div class="status-tips" v-if="item.status == 3">
          已退货，等待商家收货
        </div>
        <!-- 已完成，等待商家退款 2 -->
        <div class="tips" v-if="item.status == 2">退货退款完成</div>
        <!-- 用户已撤销 -2 -->
        <div class="tips" v-if="item.status == -2">用户已撤销</div>
        <!-- 商家已拒绝 -1 -->
        <div class="tips" v-if="item.status == -1">商家已拒绝</div>
        <div class="u-flex">
          <u-button
            shape="circle"
            type=""
            size="mini"
            plain
            v-if="item.status == 2"
            @click="deleteRecord(item.id)"
          >
            删除记录
          </u-button>
          <u-button
            class="u-m-l-15"
            shape="circle"
            type=""
            size="mini"
            plain
            v-if="item.status == 2 && item.comment_status == 0"
            @click="
              $navigateTo(`/pages/shopOrders/afterService`, { id: item.id })
            "
          >
            售后评价
          </u-button>
          <u-button
            class="u-m-l-15"
            shape="circle"
            type=""
            size="mini"
            plain
            v-if="item.status == 2 && item.comment_status == 1"
          >
            已评价
          </u-button>
          <u-button
            class="u-m-l-15"
            shape="circle"
            type=""
            size="mini"
            plain
            v-if="item.status == -1"
            @click="deleteRecord(item.id)"
            >删除记录
          </u-button>
          <u-button
            class="u-m-l-15"
            shape="circle"
            type=""
            size="mini"
            plain
            v-if="item.status == -1"
            @click="applyAgain(item)"
          >
            再次申请
          </u-button>
          <u-button
            class="u-m-l-15"
            shape="circle"
            type=""
            size="mini"
            plain
            @click="deleteRecord(item.id)"
            v-if="item.status == -2"
            >删除记录
          </u-button>
          <!-- 一直都有 -->
          <u-button
            class="u-m-l-15"
            shape="circle"
            type="primary"
            size="mini"
            plain
            @click="
              $navigateTo('/pages/shopOrders/sprotectionRightDetail', {
                orderId: item.order_id,
                shopId: item.order_item_id,
              })
            "
          >
            查看详情
          </u-button>
        </div>
      </div>
      <!-- 仅退款 -->
      <div
        v-if="item.type == 1"
        class="order-item-footer u-flex u-row-between"
        slot="body"
      >
        <!-- 已申请，等待商家处理 0 -->
        <div class="status-tips" v-if="item.status == 0">
          已申请，等待商家处理
        </div>
        <!-- 已完成，等待商家退款 2 -->
        <div class="tips" v-if="item.status == 2">售后完成</div>
        <!-- 商家已拒绝 -1 -->
        <div class="tips" v-if="item.status == -1">商家已拒绝</div>
        <!-- 用户已撤销 -2 -->
        <div class="tips" v-if="item.status == -2">用户已撤销</div>
        <div class="u-flex">
          <u-button
            shape="circle"
            size="mini"
            plain
            v-if="item.status == 2"
            @click="deleteRecord(item.id)"
          >
            删除记录
          </u-button>
          <u-button
            class="u-m-l-15"
            shape="circle"
            size="mini"
            plain
            v-if="item.status == 2 && item.comment_status == 0"
            @click="
              $navigateTo(`/pages/shopOrders/afterService`, { id: item.id })
            "
          >
            售后评价
          </u-button>
          <u-button
            class="u-m-l-15"
            shape="circle"
            type=""
            size="mini"
            plain
            v-if="item.status == 2 && item.comment_status == 1"
          >
            已评价
          </u-button>

          <u-button
            class="u-m-l-15"
            shape="circle"
            size="mini"
            plain
            v-if="item.status == -1"
            @click="deleteRecord(item.id)"
            >删除记录
          </u-button>
          <u-button
            class="u-m-l-15"
            shape="circle"
            type=""
            size="mini"
            plain
            v-if="item.status == -1"
            @click="applyAgain(item)"
          >
            再次申请
          </u-button>

          <u-button
            class="u-m-l-15"
            shape="circle"
            type=""
            size="mini"
            plain
            v-if="item.status == -2"
            @click="deleteRecord(item.id)"
            >删除记录
          </u-button>
          <!-- 一直都有 -->
          <u-button
            class="u-m-l-15"
            shape="circle"
            type="primary"
            size="mini"
            plain
            @click="
              $navigateTo('/pages/shopOrders/refundOnly', {
                orderId: item.order_id,
                shopId: item.order_item_id,
              })
            "
          >
            查看详情
          </u-button>
        </div>
      </div>
    </u-card>
    <u-empty :show="showData" text="暂无退款/售后" mode="list" />
    <u-modal
      v-model="show"
      content="是否删除该记录"
      :show-cancel-button="true"
      @confirm="deleteBtn"
      cancel-color="#000"
      confirm-color="#000"
    ></u-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { useListPaging } from '@/hooks/use-list-paging';
import { reqRightsList, reqDeleteRecord } from '@/api';
import { navigateTo, showToast } from '@/utils';
import store from '@/store';
export default defineComponent({
  setup: () => {
    // 调用分页逻辑
    const { list, resetList } = useListPaging({
      getList: async (page) => {
        const { data } = await reqRightsList({
          page,
          limit: 15,
        });
        return data.data.data;
      },
    });
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    const showData = computed(() => {
      return list.value.length == 0;
    });
    return { list, resetList, $hexColor, showData };
  },
  components: {},
  data: () => ({
    tabs: [
      { id: 0, name: '售后申请' },
      { id: 0, name: '处理中' },
      { id: 0, name: '申请记录' },
    ],
    currentTab: 0,
    show: false,
    afterId: '',
  }),
  computed: {},

  methods: {
    // 再次申请
    applyAgain(item: any) {
      navigateTo('/pages/shopOrders/selectAfterSaleType', {
        goodsId: item.goods_id,
        goodsOrderId: item.order_item_id,
        orderId: item.order_id,
        afterSalesId: item.id,
      });
    },
    // 删除记录
    deleteRecord(id: any) {
      this.afterId = id;
      this.show = true;
    },
    async deleteBtn() {
      await reqDeleteRecord({
        id: this.afterId,
      });
      await showToast({ title: '删除成功', mask: true });
      this.resetList();
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.resetList();
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
.after-sales {
  position: relative;
  padding-bottom: 30px !important;
}
@include full-page('after-sales', #f8f8f8);
.after-sales {
  border-top: 1rpx solid #f8f8f8;
  padding-bottom: 20rpx;
}
.order-item-header {
  margin-bottom: 28rpx;
}
.order-item-container {
  align-items: flex-start;
  .left-column {
    margin-right: 20rpx;
  }
  .right-column {
    .title {
      @include text-hidden-line(2);
      font-size: 24rpx;
      margin-bottom: 16rpx;
      color: #000000;
    }
    .count {
      margin-bottom: 20rpx;
      font-size: 24rpx;
      color: #acacac;
    }
    .buttons {
      text-align: right;
    }
  }
}
.status-tips {
  font-size: 24rpx;
  color: #000000;
}
.status-text {
  white-space: nowrap;
  font-size: 24rpx;
  color: #000000;
}
.order-code {
  color: #000000;
  white-space: nowrap;
  font-size: 22rpx;
}
.order-item-footer {
  .tips {
    font-size: 20rpx;
    color: #000;
  }
}
.u-empty {
  padding-top: 150rpx;
}
</style>
