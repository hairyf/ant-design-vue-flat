<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-11 10:57:59
 * @LastEditTime: 2021-05-18 17:08:19
 * @Description: 换货
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="refund-return-goods">
    <!-- 商品信息 -->
    <u-card
      :show-head="false"
      :border="false"
      padding="20"
      margin="20rpx 34rpx"
    >
      <div class="after-sales-order-container u-flex" slot="body">
        <div class="left-column">
          <u-image
            width="120"
            height="120"
            :border-radius="10"
            :src="goodsOrderInfo.goods_image"
          />
        </div>
        <div class="right-column">
          <div class="title">
            {{ goodsOrderInfo.goods_title }}
          </div>
          <div class="price-count">
            <span class="price u-margin-right-10"
              >单价：¥{{ goodsOrderInfo.goods_price }}</span
            >
            <span class="count">购买数量：{{ goodsOrderInfo.goods_num }}</span>
          </div>
        </div>
      </div>
    </u-card>
    <u-card
      :show-head="false"
      :border="false"
      padding="28"
      margin="20rpx 34rpx"
    >
      <div class="after-sales-money" slot="body">
        <div class="title">退款金额</div>
        <u-field
          label="￥"
          label-width="20"
          v-model="price"
          :icon-style="{ fontSize: '44rpx' }"
          :field-style="{ fontSize: '44rpx' }"
          @input="inputPriceEvent"
        />
        <!-- @input="$filterOutNumber($event) " -->

        <div class="tips">
          点击修改退款金额，本次最多可申请
          <span :style="{ color: $hexColor['--color-primary'] }">
            {{
              (goodsOrderInfo.goods_price - 0) * (goodsOrderInfo.goods_num - 0)
            }}
          </span>
          元
        </div>
      </div>
    </u-card>
    <!-- 退款规则 -->
    <!-- <u-card
      :show-head="false"
      :border="false"
      padding="20"
      margin="20rpx 34rpx"
    >
      <div class="after-sales-rule" slot="body">
        运费结算规则：
        订单中所有商品均未发货的情况下，运费会随着订单里的最后一件商品退款退回。若订单中有商品发货，则运费不退回。
      </div>
    </u-card> -->
    <!-- 退款说明 -->
    <u-card
      :show-head="false"
      :border="false"
      padding="28"
      margin="20rpx 34rpx"
    >
      <div class="refund-return-goods-explain" slot="body">
        <div class="title">退款说明</div>
        <custom-textarea
          placeholder="请输入至少5个文字的退款说明"
          v-model="exchangeInstructions"
        />
        <u-upload
          :custom-btn="true"
          :action="actionUrl + 'shop/clientUpload/add'"
          :header="requestHeader"
          :form-data="{ group_type: '1' }"
          :width="138"
          :height="138"
          :max-count="5"
          :file-list="fileList"
          ref="uUpload"
          @on-uploaded="onAfterEachUpload"
          @on-list-change="onAfterEachUpload"
        >
          <div
            slot="addBtn"
            class="slot-btn"
            hover-class="slot-btn__hover"
            hover-stay-time="150"
          >
            <u-icon name="camera" size="45" :color="$u.color['lightColor']" />
            <div class="title">添加照片</div>
            <div class="tips">至多5张</div>
          </div>
        </u-upload>
      </div>
    </u-card>
    <!-- 底部操作按钮 -->
    <union-blank :height="120" />
    <div class="footer-btns">
      <u-button
        shape="circle"
        type="primary"
        @click="onSendRight"
        ripple
        :custom-style="{
          background: $hexColor['--color-primary'],
        }"
      >
        提交
      </u-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  httpConfig,
  reqApplyRight,
  reqGetOrderDetial,
  reqApplyProtectionAgain,
  reqLegitimateDetail,
} from '@/api';
import { redirectTo, showToast } from '@/utils';
import { computed } from '@vue/composition-api';
import store from '@/store';
export default Vue.extend({
  components: {},
  data: () => ({
    price: '',
    form: {
      images: [] as any,
    },
    // 换货说明
    exchangeInstructions: '',
    // 商品信息
    goodsOrderInfo: {} as any,
    // 维权类型
    type: 0,
    // 商品ID
    goodsId: 0,
    // 商品价格
    // 订单Id
    orderId: 0,
    // 订单商品Id
    orderItemId: 0,
    actionUrl: httpConfig.baseURL,
    requestHeader: httpConfig.header,
    // 地址信息
    addressInfo: {} as any,
    // 维权再次申请id
    afterSalesId: '',
    modify: false,
    fileList: [] as any[],
  }),
  computed: {},
  setup: () => {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { $hexColor };
  },
  methods: {
    // 图片上传完毕/删除钩子, 将上传数据重新组合, 并赋值到表单信息中
    onAfterEachUpload(lists: any[]) {
      const updatePaths: string[] = lists.map((item) => {
        return item.response?.data?.path?.show || item.url;
      });
      if (updatePaths.findIndex((item) => !item) === -1) {
        this.form.images = updatePaths.filter((v) => v);
      }
    },
    onFilterOutNumber() {},
    inputPriceEvent(val: number) {
      if (
        Number(val) >
        Number(this.goodsOrderInfo.goods_price * this.goodsOrderInfo.goods_num)
      ) {
        this.price = '';
      }
    },
    // 发起申请
    async onSendRight() {
      if (this.modify) {
        await reqApplyRight({
          id: this.afterSalesId,
          type: this.type,
          order_id: this.orderId,
          order_item_id: this.orderItemId,
          shop_user_apply_reason: this.exchangeInstructions,
          images: this.form.images,
          goods_id: this.goodsId,
          refund_money: this.price,
        });
      } else {
        if (this.afterSalesId) {
          await reqApplyProtectionAgain({
            id: this.afterSalesId,
            type: this.type,
            order_id: this.orderId,
            order_item_id: this.orderItemId,
            shop_user_apply_reason: this.exchangeInstructions,
            images: this.form.images,
            goods_id: this.goodsId,
            refund_money: this.price,
          });
        } else {
          await reqApplyRight({
            type: this.type,
            order_id: this.orderId,
            order_item_id: this.orderItemId,
            shop_user_apply_reason: this.exchangeInstructions,
            images: this.form.images,
            goods_id: this.goodsId,
            refund_money: this.price,
          });
        }
      }
      const that = this as any;
      await showToast({
        title: '提交成功!',
        mask: true,
        success() {
          setTimeout(() => {
            redirectTo('/pages/shopOrders/sprotectionRightDetail', {
              orderId: that.orderId,
              shopId: that.orderItemId,
            });
          }, 1500);
        },
      });
    },
    // 请求商品详情
    async getGoodsDetail(id: Key, goodsId: Key) {
      if (this.modify) {
        // this.goodsOrderInfo = data.data.order[0].orderGoods[0];
        // this.addressInfo = data.data.order[0];
        const { data } = await reqLegitimateDetail(id, goodsId);
        this.goodsOrderInfo = data.data.orderGoods[0];
        this.exchangeInstructions = data.data.afterSales.shop_user_apply_reason;
        this.price = data.data.afterSales.refund_money;
        this.addressInfo = data.data;
        JSON.parse(data.data.afterSales.images).forEach((item: any) => {
          this.fileList.push({ url: item });
        });
      } else {
        const { data } = await reqGetOrderDetial(id, goodsId);
        this.goodsOrderInfo = data.data.order[0].orderGoods[0];
        this.addressInfo = data.data.order[0];
      }
    },
  },
  watch: {},
  // 页面周期函数--监听页面加载
  onLoad(options: {
    type: number;
    goodsId: any;
    orderId: number;
    goodsOrderId: number;
    afterSalesId: string;
    modify: boolean;
  }) {
    this.modify = options.modify ? options.modify : false;
    this.type = options.type;
    this.orderId = options.orderId;
    this.orderItemId = options.goodsOrderId;
    this.goodsId = options.goodsId;
    this.afterSalesId = options.afterSalesId;
    this.getGoodsDetail(options.orderId, options.goodsOrderId);
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
/* 全局容器 */
@include full-page('refund-return-goods', #f8f8f8);
.refund-return-goods {
  padding-top: 15rpx;
}
/* 退款金额 */
.after-sales-money {
  .title {
    padding-top: 10rpx;
  }
  .tips {
    padding-top: 25rpx;
    font-size: 24rpx;
    color: #acacac;
  }
  .u-field {
    font-size: 44rpx !important;
    color: #ff3d00 !important;
    font-weight: bold;
  }
}
/* 退款规则 */
.after-sales-rule {
  color: #acacac;
}
/* 退款说明容器 */
.refund-return-goods-explain {
  .title {
    font-size: 28rpx;
    font-weight: bold;
  }
}
/* 自定义上传组件 */
.slot-btn {
  width: 138rpx;
  height: 138rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(244, 245, 246);
  border-radius: 10rpx;
  .title {
    font-size: 28rpx;
    margin-bottom: 3rpx;
  }
  .tips {
    font-size: 21rpx;
  }
}
.slot-btn__hover {
  background-color: rgb(235, 236, 238);
}

/* 底部操作栏 */
.footer-btns {
  position: fixed;
  left: 0;
  right: 0;
  padding: 20rpx 56rpx;
  background-color: #fff;
  bottom: 0;
}
</style>
