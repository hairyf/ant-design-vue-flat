<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-14 21:09:15
 * @LastEditTime: 2021-05-14 10:39:59
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="commodity-price">
    <div class="layer oe-m-t-2">
      <span
        class="shop-price"
        :style="{ color: option.displayStyle.commodityPrice.color }"
        v-if="option.displayStyle.commodityPrice.state"
      >
        <div class="member-price-container">
          <!-- <img
            class="member-price-icon"
            src="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/member-babel.png"
          /> -->
        </div>
        <span> ￥{{ item.price || '--' }} </span>
      </span>
      <span
        class="shop-scribing-price"
        :style="{ color: option.displayStyle.markingPrice.color }"
        v-if="option.displayStyle.markingPrice.state"
      >
        ￥{{ item.original_price || '--' }}
      </span>
    </div>
    <div class="layer oe-m-t-3" v-if="option.displayStyle.salesVolume.state">
      <span class="shop-sales" :style="{ color: option.displayStyle.salesVolume.color }">
        {{ option.displayStyle.salesVolume.text }} {{ item.virtual_sales || '--' }}
      </span>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from '@vue/runtime-core'
  import { commodityGroupOption } from '../../config'
  export default defineComponent({
    props: {
      option: {
        type: Object as () => typeof commodityGroupOption,
        required: true
      },
      item: {
        type: Object as () => Record<string, any>,
        required: true
      }
    }
  })
</script>
<style lang="scss" scoped>
  /* 商品价格 */
  .shop-price {
    font-size: 16px;
    font-weight: bold;
    line-height: 23px;
  }
  /* 商品划线价 */
  .shop-scribing-price {
    margin-left: 3px;
    font-size: 12px;
    color: #acacac;
    text-decoration: line-through;
  }
  /* 商品销量 */
  .shop-sales {
    font-size: 12px;
  }
  .member-price-container {
    display: inline-block;
  }
</style>
