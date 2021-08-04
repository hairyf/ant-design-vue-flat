<!--
 * @Author: Zhilong
 * @Date: 2021-05-15 11:35:34
 * @LastEditTime: 2021-05-17 15:46:08
 * @Description: 优惠券价格组件
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="price-container">
    <div class="price-view" :style="{ flexDirection: flexType }">
      <div class="u-m-r-10">
        <span class="u-f-s-28" v-if="type === '￥'">￥</span>
        <span class="view_price">{{ priceView }}</span>
        <span class="u-f-s-28" v-if="type === '折' || type === '%'">折</span>
      </div>
      <div
        class="u-m-l-10 u-f-s-24 view_text"
        :style="{
          lineHeight: flexType === 'row' ? '35px' : '18px',
        }"
      >
        {{ text }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
export default defineComponent({
  props: {
    flexType: {
      type: String as () => 'row' | 'column',
      default: 'row',
    },
    text: String,
    price: [Number, String],
    type: String as () => '￥' | '%' | '折',
  },
  setup(props) {
    const priceView = computed(() => Number(props.price).toFixed(0));
    return { priceView };
  },
});
</script>
<style lang="scss" scoped>
.price-view {
  display: flex;
  text-align: center;
  padding: 10rpx;
  box-sizing: border-box;
}
.view_price {
  font-weight: 700;
  line-height: 70rpx;
  font-size: 60rpx;
}
.view_text {
  font-family: Source Han Sans CN;
  font-style: normal;
  font-weight: normal;
}
</style>
