<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-14 21:09:15
 * @LastEditTime: 2021-04-16 09:56:15
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="commodity-price">
    <div class="layer u-m-t-4">
      <span
        class="shop-price"
        :style="{ color: option.displayStyle.commodityPrice.color }"
        v-if="option.displayStyle.commodityPrice.state"
      >
        ￥{{ showItem.price || '--' }}
      </span>
      <span
        class="shop-scribing-price"
        :style="{ color: option.displayStyle.markingPrice.color }"
        v-if="option.displayStyle.markingPrice.state"
      >
        ￥{{ showItem.original_price || '--' }}
      </span>
    </div>
    <div class="layer u-m-t-6" v-if="option.displayStyle.salesVolume.state">
      <span
        class="shop-sales"
        :style="{ color: option.displayStyle.salesVolume.color }"
      >
        已售{{ showItem.virtual_sales || '--' }}
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import { commodityGroupOption } from 'orange-components-config/options';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof commodityGroupOption,
      required: true,
    },
    item: {
      type: [Object as () => Record<string, any>, Number],
      required: true,
    },
  },
  setup(props) {
    const showItem = computed(() =>
      typeof props.item !== 'object'
        ? { vice_title: '', title: '' }
        : props.item
    );
    return {
      showItem,
    };
  },
});
</script>
<style lang="scss">
/* 商品价格 */
.shop-price {
  font-size: toRpx(16);
  font-weight: bold;
  line-height: toRpx(23);
}
/* 商品划线价 */
.shop-scribing-price {
  margin-left: toRpx(3);
  font-size: toRpx(12);
  color: #acacac;
  text-decoration: line-through;
}
/* 商品销量 */
.shop-sales {
  font-size: toRpx(12);
}
</style>
