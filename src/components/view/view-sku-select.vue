<!--
 * @Author: Mr.Mao
 * @LastEditors: Zhilong
 * @Date: 2021-01-11 16:42:59
 * @LastEditTime: 2021-05-18 16:31:07
 * @Description: 多规格商品选择
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <u-popup
    z-index="100"
    v-model="showModal"
    @close="showModal = false"
    mode="bottom"
    border-radius="15"
    negative-top="50"
    :closeable="true"
  >
    <div class="common-sku-select">
      <union-blank :height="80" />
      <div class="common-sku-select-content">
        <!-- 商品信息 -->
        <div class="shop-info u-flex" v-if="!show">
          <u-image
            width="200"
            height="200"
            :src="
              showData.thumb ||
              showData.main_picture ||
              shopDetailsInfo.main_picture
            "
          />
          <div class="right-column u-flex">
            <div class="price u-flex">
              <div>¥ {{ showData.price }}</div>
              <!-- 会员价 -->
              <div class="content-member-price" v-if="memberPrice">
                <div
                  class="member-price-view"
                  :style="{ color: '#FF3D00', backgroundColor: '#ff3d0032' }"
                >
                  <span class="u-f-s-24" v-if="onlymemberType === 2">
                    会员价￥
                  </span>
                  <span class="u-f-s-24" v-if="onlymemberType === 3">
                    折扣价￥
                  </span>
                  <span class="u-f-s-34">{{ memberPrice }}</span>
                </div>
              </div>
            </div>
            <div class="tips">库存:{{ showData.stock }}</div>
          </div>
        </div>
        <template v-if="isMultiSpec">
          <div
            class="specif-container"
            v-for="(item, index) in shopDetailsInfo.spec"
            :key="index"
          >
            <div class="title title-style">{{ item.title }}</div>
            <div class="specif-item">
              <div
                class="option-container"
                v-for="(citem, cindex) in item.items"
                :key="cindex"
                @click="selectItem(citem, item)"
              >
                <div
                  :class="{
                    'option-item': true,
                    disable: !sonExistence(citem.id),
                  }"
                  :style="[single[item.id] === citem.id && $lineRectStyle]"
                >
                  {{ citem.title || '-' }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <!-- 所选数量 -->
        <div class="count-container u-flex u-row-between" v-if="!show">
          <div class="title">数量</div>
          <u-number-box
            bg-color="#ffffff"
            :min="1"
            :max="showData.stock"
            v-model="purchaseNum"
          />
        </div>
        <!-- 换货数量 -->
        <div class="count-container u-flex u-row-between" v-if="show">
          <div>
            <div class="title">换货数量</div>
            <div
              class="tips-num"
              :style="{ color: $hexColor['--color-primary'] }"
            >
              最多可换{{ goods_num }}个
            </div>
          </div>
          <u-number-box
            bg-color="#ffffff"
            :min="1"
            :max="goods_num"
            v-model="purchaseNum"
          />
        </div>
        <!-- 按钮组 -->
        <div class="button-container safe-area-inset-bottom" v-if="!show">
          <auth-controller>
            <div class="u-flex">
              <u-button
                class="u-flex-1 u-m-l-25"
                shape="circle"
                type="error"
                @click="addShopCart"
                v-if="shopDetailsInfo.cart_type === 1"
              >
                加入购物车
              </u-button>
              <u-button
                class="u-flex-1 u-m-l-25"
                shape="circle"
                type="primary"
                @click="onPlaceAnRrder"
                ripple
                :custom-style="{
                  background:
                    showData.stock === 0
                      ? '#00000055'
                      : $hexColor['--color-primary'],
                }"
              >
                {{ showData.stock === 0 ? '暂时缺货' : '立马下单' }}
              </u-button>
            </div>
          </auth-controller>
        </div>
        <u-button
          class="complete-btn"
          ripple
          :custom-style="{
            background: $hexColor['--color-primary'],
          }"
          type="primary"
          v-if="show"
          @click="sendOut"
          shape="circle"
          >完成</u-button
        >
      </div>
    </div>
  </u-popup>
</template>

<script lang="ts">
import { reqAddCartList } from '@/api';
import { useSku } from '@/hooks/use-sku';
import store from '@/store';
import { navigateTo, showToast } from '@/utils';
import { Big } from 'big.js';
import {
  defineComponent,
  inject,
  Ref,
  ref,
  computed,
  watch,
  ComputedRef,
} from '@vue/composition-api';
import dayjs from 'dayjs';
export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    goods_num: {
      type: Number,
    },
    value: {
      type: Object,
      default: undefined,
    },
  },
  setup(props, context) {
    type ShopDetailsInfo = {
      id: string;
      stock: number;
      spec: any[];
      price: number;
      main_picture: string;
      thumb: string;
      option: any[];
      status?: boolean;
      norms_type: number;
      goods_state: number;
      goods_state_time: number;
      cart_type: number;
      titles: any;
      slideshow: any[];
      serviceName: any[];
      freight: string;
      sales: string;
      title: string;
      vice_title: string;
      original_price: string;
      goods_detail: string;
      virtual_sales: number;
      stock_show: number;
      sales_show: number;
      postage: number;
      goods_param: any;
      goods_param_type: Key;
      express_fee: number;
      price_interval: { max: number; min: number };
      vip_price_type: number;
      vip_price: any;
      video: string;
      video_cover: string;
      UserLevelDiscount: {
        discount: number;
        level: number;
      };
      member_equities: string[];
    };
    /**
     * @description 可配置类型
     *
     * @name memberTypePriority -> 会员价格优先级
     * @type Array<number>
     */
    // 会员价格优先级
    const memberTypePriority: (1 | 2 | 3)[] = [1, 2, 3];
    // 开关
    const showModal = ref(false);
    uni.$on('showSku', () => (showModal.value = true));

    const shopDetailsInfo = props.value
      ? (ref(props.value) as Ref<ShopDetailsInfo>)
      : (inject('shopDetailsInfo') as Ref<ShopDetailsInfo>);
    // 购买数量
    const purchaseNum = ref(1);
    // 使用skuHook
    const {
      isOptional,
      sonExistence,
      alterSelected,
      selectData,
      selectStatus,
    } = useSku(shopDetailsInfo.value.option);
    // 会员类型(不同折扣的类型)
    const memberTypeList = shopDetailsInfo.value?.member_equities || [];
    // 显示的数据
    const showData = computed(() => {
      return selectData.value ? selectData.value : shopDetailsInfo.value;
    });
    // 使用的会员价类型
    const onlymemberType = memberTypePriority.find((levelList) => {
      // 从优先级开始查找对应的会员价
      return memberTypeList.find((typeList) => +typeList === levelList);
    });
    const memberPrice: ComputedRef<string | boolean> = computed(() => {
      // 没有会员价格
      if (!shopDetailsInfo?.value?.UserLevelDiscount?.level) return false;
      // 我的会员价格
      let memberPriceInfo;

      switch (onlymemberType) {
        case 1:
          break;
        case 2:
          // 查看是否参与会员价格
          if (showData.value.vip_price_type !== 1) return false;
          // 查询对应会员价格
          memberPriceInfo = showData.value.vip_price?.info?.find(
            (i: any) =>
              i.level_id === shopDetailsInfo?.value?.UserLevelDiscount?.level
          );
          break;
        case 3:
          memberPriceInfo = {
            ...showData.value,
            price: Big(+showData.value.price)
              .times(shopDetailsInfo?.value?.UserLevelDiscount?.discount)
              .times(0.01)
              .toFixed(2),
          };
          break;
        default:
          return false;
      }
      if (memberPriceInfo === undefined || memberPriceInfo === null) {
        // 没有对应会员价格
        return false;
      }
      // 我的会员价格
      return memberPriceInfo.price;
    });
    // 监听如果修改规格 库存不足的时候 会自动调整库存
    watch(showData, (value) => {
      if (purchaseNum.value > value.stock) {
        setTimeout(() => {
          purchaseNum.value = value.stock ? value.stock : 1;
        }, 151);
      }
    });
    // 单选选择(选择项)
    const single = ref({} as any);
    // 是否为多规格
    const isMultiSpec = computed(() => shopDetailsInfo.value.norms_type === 1);
    // 自定义单选(一个父id只能选有一个sonID 子ID)
    const addSingle = (id: number, sonId: number) => {
      if (id === undefined) return;
      single.value = {
        ...single.value,
        [id]: single.value?.[id] === sonId ? undefined : sonId,
      };
      // 筛选掉undefined的父ID 然后将所有的sonID整理为一个数组后传入
      alterSelected(Object.values(single.value).filter((i) => i) as []);
    };
    // 点击进行下单&跳转
    const onPlaceAnRrder = async () => {
      if (showData.value.stock === 0)
        return await showToast({ title: '没有库存了', icon: 'none' });
      if (
        shopDetailsInfo.value.goods_state !== 2 &&
        shopDetailsInfo.value.goods_state_time > dayjs().unix()
      )
        return await showToast({ title: '商品尚未出售', icon: 'none' });

      if (!selectStatus.value && isMultiSpec.value) {
        return await showToast({ title: '请选择规格', icon: 'none' });
      }

      let placeAnRrderInfo: any = {
        goodsId: '',
        buynum: 1,
        skuId: '',
      };
      if (isMultiSpec.value) {
        // if (showData.value.status) {
        //   return uni.$u.toast('请选择完整规格');
        // }
        placeAnRrderInfo = {
          goodsId: shopDetailsInfo.value.id,
          buynum: purchaseNum.value || 1,
          skuId: showData.value.id,
        };
      } else {
        placeAnRrderInfo = {
          goodsId: shopDetailsInfo.value.id,
          buynum: purchaseNum.value || 1,
        };
      }
      navigateTo('/pages/shopOrders/editOrder', {
        placeAnRrders: JSON.stringify([placeAnRrderInfo]),
      });
    };
    const sendOut = () => {
      // if (showData.value.stock === 0) return showToast({ title: '没有库存了' });
      if (selectStatus) {
        let specificationsText = '';
        for (const key in showData.value.titles) {
          specificationsText += showData.value.titles[key];
        }
        context.emit('exchangeData', {
          purchaseNum: purchaseNum.value,
          sku_id: isMultiSpec.value ? showData.value.id : 0,
          showData: specificationsText,
        });
        showModal.value = false;
      } else {
        showToast({
          title: '请选择完整规格',
          icon: 'none',
        });
      }
    };
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    const $lineRectStyle = computed(
      (): LineRectStyle => store.getters.lineRectStyle
    );
    return {
      $lineRectStyle,
      $hexColor,
      onPlaceAnRrder,
      showModal,
      purchaseNum,
      shopDetailsInfo,
      single,
      addSingle,
      isOptional,
      showData,
      isMultiSpec,
      selectStatus,
      sendOut,
      sonExistence,
      memberPrice,
      onlymemberType,
    };
  },
  methods: {
    async addShopCart() {
      if (this.showData.stock === 0)
        return showToast({ title: '没有库存了', icon: 'none' });
      if (!this.selectStatus && this.isMultiSpec)
        return await showToast({ title: '请选择规格', icon: 'none' });
      await reqAddCartList({
        goods_id: this.shopDetailsInfo.id,
        sku_id: this.isMultiSpec ? this.showData.id : 0,
        num: this.purchaseNum || 1,
        price: this.showData.price,
      });
      showToast({ title: '加入购物车成功' });
    },

    selectItem(citem: any, item: any) {
      // 当前子规格没有任何可选项
      if (!this.sonExistence(citem.id)) return;
      // if (!this.isOptional(citem.id)) this.single = {};
      this.addSingle(item.id, citem.id);
    },
  },
});
</script>

<style lang="scss">
/* 全局容器 */
.common-sku-select {
  position: relative;
}
.common-sku-select-content {
  overflow-y: auto;
  padding: 0 40rpx;
}
::v-deep .u-radio__icon-wrap {
  display: none !important;
}

/* 商品信息 */
.shop-info {
  margin-bottom: 40rpx;
  .right-column {
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    height: 200rpx;
    margin-left: 32rpx;
  }
  .price {
    margin-bottom: 20rpx;
    font-size: 34rpx;
    color: #ff3d00;
    font-weight: bold;
    .content-member-price {
      margin-left: toRpx(8);
      font-weight: 700;
      .member-price-view {
        padding: toRpx(2) toRpx(10);
        border-radius: toRpx(500);
      }
    }
  }
  .tips {
    font-size: 28rpx;
    color: #acacac;
  }
}
/* 规格参数 */
.specif-item {
  margin-bottom: 58rpx;
  display: flex;
  flex-wrap: wrap;
  .title {
    margin-bottom: 28rpx;
    font-weight: bold;
    font-size: 28rpx;
    color: #000000;
  }
  .option-container {
    margin-top: 16rpx;
    margin-right: 20rpx;
  }
}
.option-item {
  word-break: break-all;
  box-sizing: border-box;
  padding: 4rpx 48rpx;
  min-height: toRpx(24);
  // text-align: center;
  font-size: 28rpx;
  letter-spacing: -0.6rpx;
  box-sizing: border-box;
  background: #ececec;
  border-radius: 30rpx;
  color: #000000;
  border: 2rpx solid #ececec;
  &.disable {
    color: #00000055;
  }
}
.button-container {
  position: absolute;
  width: calc(100% - 80rpx);
  bottom: 20rpx;
}
.specif-container {
  .title-style {
    display: flex;
    align-items: center;
  }
}
.count-container {
  margin-bottom: 200rpx;
}
.tips-num {
  font-size: 20rpx;
}
.complete-btn {
  position: absolute;
  left: 25rpx;
  right: 25rpx;
  bottom: 20rpx;
}
</style>
