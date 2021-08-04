<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-11 10:57:59
 * @LastEditTime: 2021-05-19 16:36:20
 * @Description: 换货
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="exchange-good">
    <!-- 商品信息 -->
    <u-card
      :show-head="false"
      :border="false"
      padding="20"
      margin="20rpx 34rpx"
    >
      <div class="after-sales-order-container u-flex" slot="body">
        <div class="left-column">
          <u-image width="120" height="120" :src="goodsOrderInfo.goods_image" />
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
    <!-- 换货信息 -->
    <u-card
      :show-head="false"
      :border="false"
      padding="40"
      margin="20rpx 34rpx"
    >
      <view class="exchange-good-explain" slot="body">
        <div class="title">换货信息</div>
        <div class="exchange-flex-between u-margin-top-15">
          <p>换货商品</p>
          <div @click="showSku">
            <span
              style="font-size: 28rpx; color: #acacac"
              v-if="!goodsData.purchaseNum"
            >
              请选择规格</span
            >
            <template>
              <span
                style="font-size: 28rpx; color: #000"
                v-if="goodsData.purchaseNum"
                >{{ goodsData.purchaseNum }}件
                <span v-if="goodsData.showData">{{ goodsData.showData }}</span>
              </span>
            </template>
            <u-icon name="arrow-right" color="#acacac" size="30" />
          </div>
        </div>
        <div class="exchange-flex-between u-margin-top-15">
          <p>收货地址</p>
          <!-- <u-icon
            name="arrow-right"
            @click="$navigateTo('/pages/users/addressList')"
            color="#acacac"
            size="30"
          /> -->
        </div>
        <div class="u-margin-top-15">
          收货人：{{ wholeData.consignee }}({{ wholeData.phone }})
        </div>
        <div class="u-margin-top-15">
          {{ wholeData.province_name }}{{ wholeData.city_name
          }}{{ wholeData.area_name }}{{ wholeData.address }}
          <span
            class="tips-color"
            @click="
              onCopyText(
                `${wholeData.province_name}${wholeData.city_name}${wholeData.area_name}${wholeData.address}`
              )
            "
          >
            复制
          </span>
        </div>
      </view>
    </u-card>
    <!-- 换货说明 -->
    <u-card
      :show-head="false"
      :border="false"
      padding="40"
      margin="20rpx 34rpx"
    >
      <div class="exchange-good-explain" slot="body">
        <div class="title">换货说明</div>
        <custom-textarea
          v-model="exchangeInstructions"
          placeholder="请在这里输入需要换货的规格"
        />
        <u-upload
          :file-list="fileList"
          :custom-btn="true"
          :width="138"
          :height="138"
          :form-data="{ group_type: '1' }"
          :max-count="5"
          :header="requestHeader"
          :action="actionUrl + 'shop/clientUpload/add'"
          @on-uploaded="onAfterEachUpload"
          @on-list-change="onAfterEachUpload"
          ref="uUpload"
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
    <div class="footer-btns">
      <u-button
        shape="circle"
        ripple
        :custom-style="{
          background: $hexColor['--color-primary'],
        }"
        type="primary"
        @click="onSendRight"
      >
        提交
      </u-button>
    </div>
    <view-sku-select
      @exchangeData="exchangeData"
      :show="true"
      :goods_num="goodsOrderInfo.goods_num"
      v-if="!empty"
    />
  </div>
</template>

<script lang="ts">
import {
  reqApplyRight,
  reqLegitimateDetail,
  httpConfig,
  reqGoodsDetail,
  reqApplyProtectionAgain,
  reqGetOrderDetial,
} from '@/api';
import store from '@/store';
import { redirectTo, showToast } from '@/utils';
import { defineComponent, ref, provide, computed } from '@vue/composition-api';
import { setClipboardData } from 'uni-clipboard';
import { onLoad } from 'uni-composition-api';
export default defineComponent({
  setup() {
    // 商品详情数据下发
    const shopDetailsInfo = ref<any>();
    provide('shopDetailsInfo', shopDetailsInfo);
    // 请求商品数据
    onLoad(async ({ goodsId } = { undefined }) => {
      if (goodsId === undefined) return false;
      const { data } = await reqGoodsDetail(goodsId);
      shopDetailsInfo.value = data?.data?.data?.[0];
    });
    const empty = computed(() => typeof shopDetailsInfo.value === 'undefined');
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { shopDetailsInfo, empty, $hexColor };
  },
  components: {},
  data: () => ({
    form: {
      images: [] as any,
    },
    fileList: [] as any,
    // 换货说明
    exchangeInstructions: '',
    // 商品信息
    goodsOrderInfo: {} as any,
    // 维权类型
    type: 0,
    // 商品ID
    goodsId: 0,
    // 订单Id
    orderId: 0,
    // 订单商品Id
    orderItemId: 0,
    actionUrl: httpConfig.baseURL,
    requestHeader: httpConfig.header as any,
    // 地址信息
    addressInfo: {} as any,
    // 维权再次申请id
    afterSalesId: '',
    // 换货选中的数据
    goodsData: {} as any,
    wholeData: {} as any,
    // 是否是修改申请
    modify: false,
  }),
  computed: {},
  methods: {
    showSku: () => uni.$emit('showSku'),
    // 图片上传完毕/删除钩子, 将上传数据重新组合, 并赋值到表单信息中
    onAfterEachUpload(lists: any[]) {
      console.log(lists);

      const updatePaths: string[] = lists.map((item) => {
        console.log(item.response);
        return item.response?.data?.path?.show;
      });
      if (updatePaths.findIndex((item) => !item) === -1) {
        this.form.images = updatePaths.filter((v) => v);
      }
    },
    // 发起申请
    async onSendRight() {
      // let files = [];
      // // 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
      // files = (this.$refs.uUpload as any).lists.filter((val: any) => {
      //   return val.progress == 100;
      // });
      // files.forEach((element: any) => {
      //   this.form.images.push(element.file.path);
      // });
      if (this.goodsData.purchaseNum) {
        if (this.modify) {
          await reqApplyRight({
            id: this.afterSalesId,
            type: this.type,
            order_id: this.orderId,
            order_item_id: this.orderItemId,
            shop_user_apply_reason: this.exchangeInstructions,
            images: this.form.images,
            goods_id: this.goodsId,
            refund_num: this.goodsData.purchaseNum,
            goods_sku_id: this.goodsData.sku_id,
            protect_rights_goods_sku_text: this.goodsData.showData,
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
              refund_num: this.goodsData.purchaseNum,
              goods_sku_id: this.goodsData.sku_id,
              protect_rights_goods_sku_text: this.goodsData.showData,
            });
          } else {
            await reqApplyRight({
              type: this.type,
              order_id: this.orderId,
              order_item_id: this.orderItemId,
              shop_user_apply_reason: this.exchangeInstructions,
              images: this.form.images,
              goods_id: this.goodsId,
              refund_num: this.goodsData.purchaseNum,
              goods_sku_id: this.goodsData.sku_id,
              protect_rights_goods_sku_text: this.goodsData.showData,
            });
          }
        }
        const that = this as any;
        await showToast({
          title: '提交成功!',
          mask: true,
          success() {
            setTimeout(() => {
              redirectTo('/pages/shopOrders/refundReturnDetail', {
                orderId: that.orderId,
                shopId: that.orderItemId,
              });
            }, 1500);
          },
        });
      } else {
        showToast({
          icon: 'none',
          title: '请选择换货商品规格',
        });
      }
    },
    exchangeData(data: any) {
      this.goodsData = data;
    },
    // 复制功能
    onCopyText(text: string) {
      setClipboardData(text);
      uni.hideToast();
      uni.showToast({ title: '已复制联系方式!' });
    },
    // 请求商品详情或者维权详情
    async getGoodsDetail(id: Key, goodsId: Key) {
      if (this.modify) {
        const { data } = await reqLegitimateDetail(id, goodsId);
        this.goodsOrderInfo = data.data.orderGoods[0];
        this.wholeData = data.data;
        this.exchangeInstructions = data.data.afterSales.shop_user_apply_reason;
        this.goodsData.purchaseNum = data.data.afterSales.refund_num;
        this.goodsData.sku_id = data.data.afterSales.goods_sku_id;
        this.goodsData.showData =
          data.data.afterSales.protect_rights_goods_sku_text;
        JSON.parse(data.data.afterSales.images).forEach((item: any) => {
          this.fileList.push({ url: item });
        });
      } else {
        const { data } = await reqGetOrderDetial(id, goodsId);
        this.goodsOrderInfo = data.data.order[0].orderGoods[0];
        this.wholeData = data.data.order[0];
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
  onUnload() {
    // uni.$off('applyOrder');
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
@include full-page('exchange-good', #f8f8f8);
.exchange-good {
  padding: 15rpx 0 0;
  .exchange-flex-between {
    display: flex;
    justify-content: space-between;
  }
}
.exchange-good-explain {
  .title {
    font-size: 28rpx;
    font-weight: bold;
  }
}
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

.tips-color {
  margin-left: 8rpx;
  color: $u-type-primary;
}
.footer-btns {
  margin-top: 80rpx;
  padding: 20rpx 56rpx;
}
</style>
