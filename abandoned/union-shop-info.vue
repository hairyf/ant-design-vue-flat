<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-07 14:34:50
 * @LastEditTime: 2021-05-06 14:47:58
 * @Description: 页面组合-商品信息
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="union-shop-info">
    <!-- 商品轮播 -->
    <u-swiper
      :list="shopInfo.slideshow"
      height="750"
      mode="number"
      indicator-pos="bottomRight"
      style="height: 750rpx"
    />
    <!-- 商品信息 -->
    <div class="shop-info">
      <div class="price-collection u-flex u-row-between">
        <span class="price">￥{{ shopInfo.price }}</span>
        <template v-if="isAuthUserInfo">
          <u-icon
            @click="addCollectCount"
            v-if="isCollect"
            size="44"
            color="#FE9B2A"
            name="star-fill"
          />
          <u-icon @click="addCollectCount" v-else size="40" name="star" />
        </template>
      </div>
      <div class="title">
        {{ shopInfo.title }}
      </div>
    </div>
    <!-- 优惠卷选择 -->
    <div class="custom-layer-container" @click="showDiscounts = true">
      <div class="fault-layer u-flex u-row-between">
        <div class="tips">优惠</div>
        <div class="content u-flex u-flex-1">
          <u-tag
            v-if="reduce.length != 0"
            size="mini"
            text="满减券"
            mode="dark"
          />
          <u-tag v-else size="mini" text="折扣卷" mode="dark" />
          <div class="coupon-text">
            {{
              JSON.stringify(coupon) == '{}' || coupon == undefined
                ? '没有优惠卷'
                : coupon.name
            }}
          </div>
        </div>
        <span>...</span>
      </div>
    </div>
    <!-- 规格选择 / 地址选择 / 运费模式 / 支持服务 -->
    <div class="custom-layer-container">
      <div
        class="fault-layer u-flex u-row-between"
        @click="showSkuSelect = true"
      >
        <div class="tips">已选</div>
        <div class="content u-flex-1">请选择商品规格</div>
        <span>...</span>
      </div>
      <div class="fault-layer u-flex u-row-between">
        <div class="tips">送至</div>
        <div class="content u-flex-1 u-flex" @click="isAddressList()">
          <view-icon size="30" color="#B8B8B8" name="cl-address" />
          <div class="address-text">
            {{
              JSON.stringify(addressDetail) == '{}' ||
              addressDetail == undefined
                ? '请填写收货地址'
                : addressDetail.province_name
            }}
            {{
              JSON.stringify(addressDetail) == '{}' ||
              addressDetail == undefined
                ? ''
                : addressDetail.city_name
            }}
            {{
              JSON.stringify(addressDetail) == '{}' ||
              addressDetail == undefined
                ? ''
                : addressDetail.area_name
            }}
          </div>
        </div>
        <span>...</span>
      </div>
      <div
        class="fault-layer u-flex u-row-between"
        v-if="shopInfo.express_fee == 2 || shopInfo.postage == 2"
      >
        <div class="tips">运费</div>
        <div class="content u-flex-1" v-if="shopInfo.postage == 2">
          商家包邮
        </div>
        <div class="content u-flex-1">
          {{ shopInfo.express_fee == 2 ? '￥' + shopInfo.freight : '' }}
        </div>
      </div>
      <div class="fault-layer u-flex u-row-between">
        <div class="tips">支持</div>
        <div
          class="content u-flex-1"
          v-for="(item, index) in shopInfo.serviceName"
          :key="index"
        >
          <span class="label">
            <u-icon name="checkmark-circle" color="#B8B8B8" />
            <span class="text">{{ item }}</span>
          </span>
        </div>
      </div>
      <!-- <div
        class="fault-layer u-flex u-row-between"
        @click="showShopParams = true"
      >
        <div class="tips">参数</div>
        <div class="content u-flex-1">品牌 材质...</div>
        <span>...</span>
      </div> -->
    </div>
    <!-- 多规格选择器 -->
    <common-sku-select
      v-model="showSkuSelect"
      :goodsInfo="shopInfo"
      @closeEvent="showSkuSelect = false"
    />
    <!-- 参数展示器 -->
    <common-shop-params v-model="showShopParams" :list="shopParams" />
    <!-- 优惠卷选择器 -->
    <common-coupon-select v-model="showDiscounts" :goodId="shopInfo.id" />
    <!-- 底部操作栏 -->
    <custom-fixed-footer :occupy-block="false" flex class="footer-container">
      <auth-controller identif="union-shop-info">
        <div
          class="control u-flex u-margin-right-25"
          v-if="isCollect"
          @click="addCollectCount"
        >
          <u-icon size="44" color="#FE9B2A" name="star-fill" />

          <span class="tips">收藏</span>
        </div>
        <div
          class="control u-flex u-margin-right-25"
          v-else
          @click="addCollectCount"
        >
          <u-icon size="44" color="#000" name="star" />
          <span class="tips">收藏</span>
        </div>
      </auth-controller>
      <div class="control u-flex u-flex-1">
        <view-icon size="44" color="#000" name="cl-serve" />
        <span class="tips">客服</span>
      </div>
      <div class="buttons u-flex">
        <u-button
          class="u-flex-1 u-margin-left-25"
          shape="circle"
          type="error"
          @click="showSkuSelect = true"
          >加入购物车</u-button
        >
        <u-button
          class="u-flex-1 u-margin-left-25"
          shape="circle"
          type="primary"
          @click="showSkuSelect = true"
        >
          立马下单
        </u-button>
      </div>
      <u-toast ref="uToast" />
    </custom-fixed-footer>
  </div>
</template>
<!-- store.getters.isAuthUserInfo -->
<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import {
  reqAddCollect,
  reqUnCollect,
  reqShopCoupon,
  requserAddress,
  reqGoodsDetail,
} from '@/api';
export default Vue.extend({
  props: {
    shopId: String || Number,
  },
  data: () => ({
    // 弹窗展示状态
    showSkuSelect: false,
    showShopParams: false,
    showDiscounts: false,
    // 商品参数
    shopParams: [],
    // 商品信息
    // 轮播图数据

    // 是否收藏
    isCollect: false,
    // 优惠卷
    coupon: {} as any,
    // 减价优惠卷
    reduce: [] as any,
    // 地址详情
    addressDetail: {} as any,
    // 商品信息
    shopInfo: {} as any,
  }),
  computed: {
    isAuthUserInfo: (): boolean => store.getters.isAuthUserInfo,
  },
  methods: {
    // 是否跳转地址
    isAddressList() {
      if (
        JSON.stringify(this.addressDetail) == '{}' ||
        this.addressDetail == undefined
      ) {
        this.$navigateTo('/pages/users/addressList');
      }
    },
    async addCollectCount() {
      if (this.isCollect) {
        await reqUnCollect(this.shopInfo.id);
        this.isCollect = false;
      } else {
        await reqAddCollect(this.shopInfo.id);
        this.isCollect = true;
      }
    },
    // 立马下单
    limaOrder() {
      if (!store.getters.isAuthUserInfo) {
        (this.$refs.uToast as any).show({
          title: '请登录',
          type: 'error',
        });
      } else {
        this.$navigateTo('/pages/shopOrders/editOrder', {
          ids: this.shopInfo.id,
          flag: 1,
        });
      }
    },
    // 判断是否收藏
    isCollection() {
      this.isCollect = this.shopInfo.enshrine == 1;
    },
    // 获取商品可用的优惠卷
    async getMyCouponList() {
      const { data } = await reqShopCoupon(this.shopInfo.id);
      if (data.data.reduce?.length == 0) {
        this.coupon = data.data.discount[0];
      } else {
        this.coupon = data.data.reduce[0];
      }
      this.reduce = data.data.reduce;
    },
    // 获取地址信息
    async getDefaultAddress() {
      const { data } = await requserAddress();
      this.addressDetail = data.data.data.find(
        (item: any) => item.is_default == 1
      );
    },
    // 获取商品信息
    async getGoodsInfo() {
      const { data } = await reqGoodsDetail(this.shopId);
      this.shopInfo = data.data.data[0];
    },
  },
  watch: {
    shopInfo() {
      this.isCollection();
      this.getMyCouponList();
    },
  },
  created() {},
  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.getDefaultAddress();
    this.getGoodsInfo();
  },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {
    // 获取商品详情数据
    // this.shopParams = this.shopInfo.goods_param;
    // this.shopId = this.shopInfo.id;
  },
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
});
</script>

<style lang="scss">
/* 商品信息 */
.shop-info {
  padding: 28rpx 34rpx;
  background: #ffffff;
  .title {
    @include text-hidden-line(2);
    margin-top: 16rpx;
    font-size: 34rpx;
  }
  .price {
    font-size: 34rpx;
    color: #ff3d00;
    font-weight: bold;
  }
}
/* 自定义层容器 */
.custom-layer-container {
  margin: 20rpx 0;
}
/* 自定义层 */
.fault-layer {
  width: calc(100% - 34 * 2ppx);
  padding: 28rpx 34rpx;
  background: #ffffff;
  .tips {
    margin-right: 40rpx;
    font-size: 28rpx;
    font-weight: bold;
  }
  .coupon-text {
    @include text-ellipsis(390rpx);
    margin-left: 20rpx;
  }
  .address-text {
    @include text-ellipsis(450rpx);
    margin-left: 20rpx;
  }
  .label {
    margin-right: 25rpx;
    display: inline-flex;
    align-items: center;
    u-icon {
      margin-top: 5rpx;
    }
    .text {
      margin-left: 10rpx;
      font-size: 22rpx;
      color: #b8b8b8;
    }
  }
}
/* 底部操作栏 */
::v-deep .footer-container {
  .control {
    flex-direction: column;
  }
}
</style>
