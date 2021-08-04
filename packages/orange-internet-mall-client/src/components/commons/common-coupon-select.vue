<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-12 16:01:10
 * @LastEditTime: 2021-04-22 21:52:31
 * @Description: 商品优惠卷选择器
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <u-popup
    closeable
    :value="value"
    @close="$emit('input', false)"
    mode="bottom"
    border-radius="15"
    height="800"
  >
    <div class="discounts-tabs u-flex">
      <div
        class="tab-item u-flex-1"
        @click="reduceEvent()"
        :class="{ on: currentDiscounts == 'full' }"
      >
        满减卷
      </div>
      <div
        class="tab-item u-flex-1"
        @click="discountEvent()"
        :class="{ on: currentDiscounts == 'discount' }"
      >
        折扣卷
      </div>
    </div>

    <div v-for="(item, index) in couponListAll" :key="index">
      <!-- 满减卷和折扣卷 -->
      <u-card
        :show-head="false"
        :border="false"
        :padding="0"
        v-if="item.coupon.status == 1 && item.status == 0"
      >
        <div
          :class="[
            'custom-discount__body',
            'u-flex',
            item.coupon.type == 1 ? 'full' : 'disc',
          ]"
          slot="body"
        >
          <div class="left-column u-flex">
            <!-- 满减类型 -->
            <div class="count-layer" v-if="item.coupon.type == 1">
              <span class="tips">¥</span>
              <span class="content">{{ item.coupon.money - 0 }}</span>
            </div>
            <!-- 折扣类型 -->
            <div v-if="item.coupon.type == 2" class="count-layer">
              <span class="content">{{ item.coupon.money - 0 }}</span>
              <span class="tips">折</span>
            </div>
            <!-- 优惠卷使用条件 -->
            <div class="tips-layer">
              满{{ item.coupon.condition_order_amount - 0 }}元可使用
            </div>
          </div>
          <div class="right-column u-flex u-flex-1 u-row-center">
            <div class="title">{{ item.coupon.name }}</div>
            <div class="tips-btns u-flex u-row-between">
              <span class="tips over-text">{{ item.coupon.explain }}</span>
              <span class="btns" @click="onSelectItem(item)">立即使用</span>
              <!-- <span class="btns" @click="onSelectItem">已领取</span> -->
            </div>
            <div class="times">
              有效期：{{
                $formatUnix(item.coupon.start_time, 'YYYY-MM-DD')
              }}至{{ $formatUnix(item.coupon.end_time, 'YYYY-MM-DD') }}
            </div>
          </div>
        </div>
      </u-card>
    </div>
  </u-popup>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    value: Boolean,
    // 选择器类型 领取(receive); 使用(use)
    type: {
      type: String,
      default: 'receive',
    },
    goodId: {
      type: Number || String,
    },
    // 优惠卷列表
    couponList: {
      type: Object,
      default() {
        return {
          current: null,
          current_fee: 0,
          discount: [],
          reduce: [],
        };
      },
    },
    // 判断是否是下订单 2是下订单
    flagUp: Number,
  },
  data: () => ({
    // 当前展示优惠卷类型 满减(full) 折扣(discount)
    currentDiscounts: 'full' as 'full' | 'discount',

    // 显示折扣还是减价
    isCoupon: true,
    // 全部优惠卷
    couponListAll: [] as any,
  }),
  computed: {},
  methods: {
    /**满减卷*/
    reduceEvent() {
      this.currentDiscounts = 'full';
      this.couponListAll = this.couponList.reduce;
    },
    /**折扣卷*/
    discountEvent() {
      this.currentDiscounts = 'discount';
      this.couponListAll = this.couponList.discount;
    },
    /**立即使用*/
    onSelectItem(item: any) {
      uni.$emit('use-now', item);
    },
  },
  watch: {
    couponList(obj: {
      current: number | null;
      current_fee: number;
      discount: any;
      reduce: any;
    }) {
      this.currentDiscounts = 'full';
      this.couponListAll = obj.reduce;
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
/* 优惠卷导航区 */
.discounts-tabs {
  height: 100rpx;
  margin: 0 200rpx;
  .tab-item {
    font-size: 34rpx;
    color: #acacac;
    text-align: center;
    line-height: 80rpx;
    transition: 0.5s;
    &::after {
      content: '';
      position: absolute;
      transition: 0.5s;
      width: 40rpx;
      height: 4rpx;
      background: #fff;
      bottom: 10rpx;
      left: 0;
      right: 0;
      margin: auto;
    }
    &.on {
      position: relative;
      color: #fe9b2a;
      &::after {
        background: #fe9b2a;
      }
    }
  }
  // .coupon-mask::after {
  //   position: relative;
  //   left: 0;
  //   top: 0;
  //   z-index: 100;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba($color: #000000, $alpha: 0.7);
  // }
}
.over-text {
  width: 330rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
