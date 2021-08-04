<!--
 * @Author: Mr.Mao
 * @LastEditors: Pan.Yu.Lin
 * @Date: 2021-01-11 16:42:59
 * @LastEditTime: 2021-05-10 15:18:34
 * @Description: 多规格商品选择
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <u-popup
    :value="value"
    @close="$emit('input', false)"
    mode="bottom"
    height="1000"
    border-radius="15"
    negative-top="50"
    :closeable="true"
    v-if="goodsInfo"
  >
    <div class="common-sku-select">
      <union-blank :height="80" />
      <div class="common-sku-select-content" @touchmove.stop>
        <!-- 商品信息 -->
        <div class="shop-info u-flex">
          <u-image width="200" height="200" :src="goodsInfo.main_picture" />
          <div class="right-column u-flex">
            <div class="price">¥ {{ goodsInfo.price }}</div>
            <div class="tips">库存：{{ stock }}</div>
          </div>
        </div>
        <!-- 规格参数 -->
        <!-- 
          	<u-radio-group v-model="value" @change="radioGroupChange">
            <u-radio 
              @change="radioChange" 
              v-for="(item, index) in list" :key="index" 
              :name="item.name"
              :disabled="item.disabled"
            >
              {{item.name}}
            </u-radio>
          </u-radio-group> 
         -->

        <div class="specif-container">
          <u-checkbox-group
            class="specif-item"
            v-for="(item, index) in arrs"
            :key="index"
            :max="1"
          >
            <div class="title title-style">{{ item.title }}</div>
            <div class="option-container">
              <u-checkbox
                :class="['option-item']"
                :style="[citem.isFlag && $lineRectStyle]"
                v-for="(citem, cindex) in item.items"
                :key="cindex"
                v-model="citem.isFlag"
                :name="citem.id"
                @change="optionEvent(citem)"
              >
                {{ citem.title }}
              </u-checkbox>
            </div>
          </u-checkbox-group>
        </div>
        <!-- 所选数量 -->
        <div class="count-container u-flex u-row-between">
          <div class="title">数量</div>
          <u-number-box bg-color="#ffffff" :min="1" v-model="shopNum" />
        </div>
        <!-- 按钮组 -->
        <div class="button-container">
          <auth-controller>
            <div class="u-flex">
              <u-button
                class="u-flex-1 u-m-l-25"
                shape="circle"
                type="error"
                @click="addCartGoods"
              >
                加入购物车
              </u-button>
              <u-button
                class="u-flex-1 u-m-l-25"
                shape="circle"
                type="primary"
                @click="limaOrder"
              >
                立马下单
              </u-button>
            </div>
          </auth-controller>
        </div>
      </div>
    </div>
  </u-popup>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { showToast } from '@/utils';
import { computed } from '@vue/composition-api';

export default Vue.extend({
  props: {
    value: Boolean,
    goodsInfo: Object,
  },
  data: () => ({
    shopNum: 1,
    goodsInfomation: {} as any,
    // sku数组
    arrs: [] as any,
    // 商品信息
    stock: 0,
  }),
  computed: {
    // 总的数据
    cardTotal: (): number => store.getters.total,
  },
  setup: () => {
    const $lineRectStyle = computed(
      (): LineRectStyle => store.getters.lineRectStyle
    );
    return { $lineRectStyle };
  },
  methods: {
    optionEvent(item: any) {
      item.isFlag = !item.isFlag;
      this.$forceUpdate();
    },
    //  添加购物车
    async addCartGoods() {
      this.goodsInfo.num = 1;
      this.goodsInfo.select = true;
      // this.goodsInfo.
      // const reqGoodsInfo = {};
      // reqGoodsInfo.
      /**sku 开始 */
      if (this.goodsInfo.spec.length == 0) {
        store.dispatch('addCartGoods', [
          this.goodsInfo,
          this.shopNum,
          (this.goodsInfo.good_sku = 0),
        ]);
        this.$emit('closeEvent');
        await showToast({ title: '加入购物车成功' });

        return;
      }
      // 有多规格
      const trueArrs = this.arrs
        .map((item: any) => item.items)
        .flat(1)
        .filter((item: any) => {
          return item.isFlag;
        });
      // 获取选中id

      const arr = [] as any;
      trueArrs.forEach((element: any) => {
        arr.push(element.id);
      });
      // 选中id
      const option = this.goodsInfo.option.find((item: any) => {
        return arr.sort().toString() == item.specs.split(',').sort().toString();
      });
      // 判断是否登录
      this.stock = option.stock;

      if (option.stock >= 0) {
        await showToast({ title: '加入购物车成功' });
      } else {
        showToast({ title: '没有此商品请重新选择规格', icon: 'none' });
        return;
      }

      // this.goodsInfo 添加sku
      this.goodsInfo.good_sku = option;
      /**sku结束 */
      store.dispatch('addCartGoods', [this.goodsInfo, this.shopNum, option.id]);

      this.$emit('closeEvent');
    },

    // 下订单
    limaOrder() {
      // sku
      if (this.goodsInfo.spec.length == 0) {
        this.$navigateTo('/pages/shopOrders/editOrder', {
          ids: this.goodsInfo.id,
          flag: 1,
        });
        return;
      }
      const trueArrs = this.arrs
        .map((item: any) => item.items)
        .flat(1)
        .filter((item: any) => {
          return item.isFlag;
        });
      // 获取选中id
      const arr = [] as any;
      trueArrs.forEach((element: any) => {
        arr.push(element.id);
      });
      // 选中id
      const option = this.goodsInfo.option.find((item: any) => {
        return arr.sort().toString() == item.specs.split(',').sort().toString();
      });

      if (!store.getters.isAuthUserInfo) {
        (this.$refs.uToast as any).show({
          title: '请登录',
          type: 'error',
        });
      } else {
        if (option != undefined) {
          this.$navigateTo('/pages/shopOrders/editOrder', {
            ids: this.goodsInfo.id,
            flag: 1,
            skuId: option.id,
          });
        } else {
          this.stock = option.stock;
          showToast({ title: '没有此商品请重新选择规格', icon: 'none' });
        }
      }
      uni.$emit('sendEvent', option);
    },
  },
  watch: {
    // 商品信息
    goodsInfo(val: any) {
      const arr = val.spec.map((item: any) => {
        item.items.forEach((ele: any) => {
          ele.isFlag = false;
        });
        return item;
      });
      this.arrs = arr;
      this.stock = val.stock;
    },
  },

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
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
/* 全局容器 */
.common-sku-select {
  position: relative;
}
.common-sku-select-content {
  overflow-y: auto;
  padding: 0 40rpx;
  height: 919rpx;
}
::v-deep .u-checkbox__icon-wrap {
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
  }
  .tips {
    font-size: 28rpx;
    color: #acacac;
  }
}
/* 规格参数 */
.specif-item {
  margin-bottom: 58rpx;
  .title {
    margin-bottom: 28rpx;
    font-weight: bold;
    font-size: 28rpx;
    color: #000000;
  }
}
.option-item {
  display: inline-block;
  border: 1rpx solid #ececec;
  min-width: 50rpx;
  padding: 4rpx 15rpx;
  border-radius: 40rpx;
  background-color: #ececec;
  text-align: center;
  font-size: 28rpx;
  color: #000000;
  &:not(:first-child) {
    margin-left: 25rpx;
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
    margin: 0;
    margin-right: 25rpx;
  }
}
</style>
