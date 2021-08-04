<!--
 * @Author: Zhilong
 * @Date: 2021-04-21 16:08:40
 * @LastEditTime: 2021-05-17 19:05:54
 * @Description: 商品购买底部
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <auth-controller>
    <div class="commodity-purchase-container safe-area-inset-bottom">
      <div class="commodity-purchase-view">
        <!-- 左侧 -->
        <div class="u-flex purchase-left">
          <div v-if="isCollect" @click="addCollectCount">
            <view-icon
              size="46"
              :color="$hexColor['--color-primary']"
              name="cl-star-select"
            />
            <div class="u-f-s-20 u-m-t-5">收藏</div>
          </div>
          <div v-else @click="addCollectCount">
            <view-icon size="46" color="#000" name="cl-star" />
            <div class="u-f-s-20 u-m-t-5">收藏</div>
          </div>
          <link-controller :data="{ type: 'serve' }">
            <div>
              <view-icon size="46" color="#000" name="oe-serve" />
              <div class="u-f-s-20 u-m-t-5">客服</div>
            </div>
          </link-controller>
        </div>
        <!-- 右侧 -->
        <div class="u-flex u-flex-1 purchase-right">
          <div
            class="u-flex-1 shopping-cart-btn"
            @click="showSku"
            v-if="shopDetailsInfo && shopDetailsInfo.cart_type !== 0"
          >
            加入购物车
          </div>
          <div
            class="u-flex-1 purchase-btn"
            :class="{
              'one-button': !(
                shopDetailsInfo && shopDetailsInfo.cart_type !== 0
              ),
            }"
            :style="{ background: $hexColor['--color-primary'] }"
            @click="showSku"
          >
            立即购买
          </div>
        </div>
      </div>
    </div>
  </auth-controller>
</template>
<script lang="ts">
import { reqAddCollect, reqUnCollect } from '@/api';
import store from '@/store';
import {
  defineComponent,
  inject,
  Ref,
  watch,
  ref,
  computed,
} from '@vue/composition-api';
import { commodityInfoOption } from 'orange-components-config/options';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof commodityInfoOption,
    },
  },
  setup() {
    type ShopDetailsInfo = {
      id: number;
      stock: number;
      spec: any[];
      price: number;
      main_picture: string;
      thumb: string;
      option: any[];
      status?: boolean;
      enshrine: number;
      cart_type: number;
    };
    const isCollect = ref(false);
    const shopDetailsInfo = inject('shopDetailsInfo') as Ref<ShopDetailsInfo>;

    watch(
      () => shopDetailsInfo.value.option,
      () => {
        isCollect.value = shopDetailsInfo.value.enshrine == 1;
      }
    );
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { shopDetailsInfo, isCollect, $hexColor };
  },
  methods: {
    showSku: () => uni.$emit('showSku'),
    async addCollectCount() {
      if (this.isCollect) {
        await reqUnCollect(this.shopDetailsInfo.id);
        this.isCollect = false;
      } else {
        await reqAddCollect(this.shopDetailsInfo.id);
        this.isCollect = true;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.commodity-purchase-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  z-index: 2;
  box-shadow: 0 -2rpx 2rpx #0001;
  .commodity-purchase-view {
    padding: 6rpx 0;
    display: flex;
    flex: 1;
    .purchase-left {
      > div {
        margin-right: toRpx(6);
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding: toRpx(6);
        color: #333;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .purchase-right {
      text-align: center;
      margin: 0 toRpx(12);

      .one-button {
        border-radius: toRpx(20) !important;
      }
      .shopping-cart-btn {
        background: linear-gradient(90deg, #ff934b 0%, #ff6600 100%);
        border-radius: toRpx(20) toRpx(0) toRpx(0) toRpx(20);
        padding: toRpx(8) 0;
        font-size: toRpx(14);
        letter-spacing: 0.015em;
        color: #ffffff;
      }
      .purchase-btn {
        background: linear-gradient(90.33deg, #ff3d00 99.71%, #ff6b3d 0.26%);
        border-radius: toRpx(0) toRpx(20) toRpx(20) toRpx(0);
        padding: toRpx(8) 0;
        font-size: toRpx(14);
        letter-spacing: 0.015em;
        color: #ffffff;
      }
    }
  }
}
</style>
