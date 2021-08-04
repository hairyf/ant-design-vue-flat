<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-15 18:58:08
 * @LastEditTime: 2021-05-14 10:21:43
 * @Description: 商品组视图项
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="commodity-group-container"
    :style="{
      padding: `
      ${option.padding.top + 0.1 ?? 1}px 
      ${option.padding.leftRight ?? 0}px 
      ${option.padding.bottom ?? 0}px
      `,
      background
    }"
  >
    <slot name="header" />
    <!-- center风格 -->
    <template v-if="option.componentStyle.styleType == 'center'">
      <div class="center-list">
        <div
          class="center-item"
          v-for="(v, i) in list"
          :style="{
            borderRadius,
            marginBottom: `${option.padding.shopSpacing}px`,
            boxShadow,
            border
          }"
          :key="i"
        >
          <!-- 角标 -->
          <corner-markersetting :option="option" />
          <view-image
            :size="{ width: '100%', height: '162' }"
            :empty-type="2"
            :src="v.main_picture"
          />
          <div
            class="item-foot"
            :style="{
              backgroundColor: option.colorStyle.color.good
            }"
          >
            <!-- 商品标题 -->
            <commodity-title :option="option" :item="v" />
            <div class="oe-flex oe-row-between">
              <div class="left">
                <!-- 商品价格 -->
                <commodity-price :option="option" :item="v" />
              </div>
              <div class="right">
                <!-- 购买按钮 -->
                <buy-button-style :option="option" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- upDown风格 -->
    <template v-if="option.componentStyle.styleType == 'upDown'">
      <div class="upDown-list">
        <div
          class="upDown-item"
          v-for="(v, i) in list"
          :key="i"
          :style="{
            boxShadow,
            border,
            borderRadius,
            marginBottom: `${option.padding.shopSpacing}px`
          }"
        >
          <!-- 角标 -->
          <corner-markersetting :option="option" />
          <view-image size="130" :empty-type="2" :src="v.main_picture" />
          <div
            class="info oe-flex oe-flex-1 oe-p-8"
            :style="{
              backgroundColor: option.colorStyle.color.good
            }"
          >
            <div class="oe-flex-1" style="width: 100%">
              <!-- 商品标题 -->
              <commodity-title :option="option" :item="v" />
            </div>
            <div class="oe-flex oe-row-between" style="width: 100%">
              <div class="left">
                <!-- 商品价格 -->
                <commodity-price :option="option" :item="v" />
              </div>
              <div class="right">
                <!-- 购买按钮 -->
                <buy-button-style :option="option" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- bothSides风格 -->
    <template v-if="option.componentStyle.styleType == 'bothSides'">
      <div class="bothSides-list" :style="{ margin: `${-(option.padding.shopSpacing / 2)}px` }">
        <div class="bothSides-item" v-for="(v, i) in list" :key="i">
          <div
            class="inner"
            :style="{
              boxShadow,
              border,
              borderRadius,
              margin: `${option.padding.shopSpacing / 2}px`
            }"
          >
            <!-- 角标 -->
            <corner-markersetting :option="option" />
            <view-image :size="{ width: '100%', height: 172 }" :src="v.main_picture" />
            <div
              class="item-foot"
              :style="{
                backgroundColor: option.colorStyle.color.good
              }"
            >
              <!-- 商品标题 -->
              <commodity-title :option="option" :item="v" />
              <div class="oe-flex oe-row-between">
                <div class="left">
                  <!-- 商品价格 -->
                  <commodity-price :option="option" :item="v" />
                </div>
                <div class="right">
                  <!-- 购买按钮 -->
                  <buy-button-style :option="option" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- fourSides风格 -->
    <template v-if="option.componentStyle.styleType == 'fourSides'">
      <div class="fourSides-list" :style="{ margin: `${-(option.padding.shopSpacing / 2)}px` }">
        <div class="fourSides-item" v-for="(v, i) in list" :key="i">
          <div
            class="inner oe-flex"
            :style="{
              boxShadow,
              border,
              borderRadius,
              margin: `${option.padding.shopSpacing / 2}px`
            }"
          >
            <!-- 角标 -->
            <corner-markersetting :option="option" />
            <view-image :size="80" :src="v.main_picture" />
            <div
              class="info oe-flex oe-flex-1 oe-p-2"
              :style="{
                backgroundColor: option.colorStyle.color.good
              }"
            >
              <div class="oe-flex-1" style="width: 100%">
                <!-- 商品标题 -->
                <commodity-title
                  :title-ellipsis="80"
                  :subtitle-ellipsis="80"
                  :option="option"
                  :item="v"
                />
              </div>
              <div class="oe-flex oe-row-between" style="width: 100%">
                <div class="left">
                  <!-- 商品价格 -->
                  <commodity-price :option="option" :item="v" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- trilateral风格 -->
    <template v-if="option.componentStyle.styleType == 'trilateral'">
      <div class="trilateral-list" :style="{ margin: `${-(option.padding.shopSpacing / 2)}px` }">
        <div class="trilateral-item" v-for="(v, i) in list" :key="i">
          <div
            class="inner oe-flex"
            :style="{
              boxShadow,
              border,
              borderRadius,
              margin: `${option.padding.shopSpacing / 2}px`
            }"
          >
            <!-- 角标 -->
            <corner-markersetting :option="option" />
            <view-image :size="{ width: '100%', height: 112 }" :src="v.main_picture" />
            <div
              class="item-foot"
              :style="{
                backgroundColor: option.colorStyle.color.good
              }"
            >
              <!-- 商品标题 -->
              <commodity-title :option="option" :item="v" />
              <!-- 商品价格 -->
              <commodity-price :option="option" :item="v" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- middle风格 -->
    <template v-if="option.componentStyle.styleType == 'middle'">
      <div class="middle-list" :style="{ margin: `${-(option.padding.shopSpacing / 2)}px` }">
        <div class="middle-item" v-for="(v, i) in list" :key="i">
          <div
            class="inner oe-flex"
            :style="{
              boxShadow,
              border,
              borderRadius,
              margin: `${option.padding.shopSpacing}px`
            }"
          >
            <!-- 角标 -->
            <corner-markersetting :option="option" />
            <view-image :size="{ width: '100%', height: 112 }" :src="v.main_picture" />
            <div
              class="item-foot"
              :style="{
                backgroundColor: option.colorStyle.color.good
              }"
            >
              <!-- 商品标题 -->
              <commodity-title :option="option" :item="v" />
              <!-- 商品价格 -->
              <commodity-price :option="option" :item="v" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- left风格 -->
    <template v-if="option.componentStyle.styleType == 'left'">
      <div class="left-list" :style="{ margin: `${-(option.padding.shopSpacing / 2)}px` }">
        <div class="left-item" v-for="(v, i) in list" :key="i">
          <div
            class="inner oe-flex"
            :style="{
              boxShadow,
              border,
              borderRadius,
              margin: `${option.padding.shopSpacing / 2}px`
            }"
          >
            <!-- 角标 -->
            <corner-markersetting :option="option" />
            <view-image :size="{ width: '100%', height: 112 }" :src="v.main_picture" />
            <div
              class="item-foot"
              :style="{
                backgroundColor: option.colorStyle.color.good
              }"
            >
              <!-- 商品标题 -->
              <commodity-title :option="option" :item="v" />
              <!-- 商品价格 -->
              <commodity-price :option="option" :item="v" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps, watch, ref, computed } from 'vue'
  import { commodityGroupOption } from '@/view/decorate/config'
  import {
    useBackgroundColor,
    useComponentModalStyle,
    usePaddingRadius
  } from '../hooks/use-view-style'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'

  import CornerMarkersetting from './CommodityGroup/CornerMarkersetting.vue'
  import CommodityTitle from './CommodityGroup/CommodityTitle.vue'
  import CommodityPrice from './CommodityGroup/CommodityPrice.vue'
  import BuyButtonStyle from './CommodityGroup/BuyButtonStyle.vue'

  const props = defineProps({
    option: {
      type: Object as () => typeof commodityGroupOption,
      required: true
    }
  })
  const seleteListCount = computed(() => {
    if (props.option?.addProduct?.chooseProduct === '手动选择') {
      return props.option.addProduct.manualSelection.length
        ? props.option.addProduct.manualSelection
        : 1
    }
    return props.option?.addProduct?.productsNum
  })
  const { padding, borderRadius } = usePaddingRadius(props.option)
  const { background } = useBackgroundColor(props.option.colorStyle)
  const { boxShadow, border } = useComponentModalStyle(props.option.componentStyle)
  const list = ref<any[] | number>([])
  watch(
    seleteListCount,
    () => {
      if (typeof seleteListCount.value === 'number') {
        list.value = seleteListCount.value
      } else {
        list.value = seleteListCount.value.map((item) => item.value.data)
      }
    },
    { immediate: true, deep: true }
  )
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  /* 角标 */
  .corner-marker-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 36px;
    height: 20px;
    .corner-marker-icon {
      position: relative;
      font-size: 21px;
      span {
        position: absolute;
        left: -2px;
        right: 0;
        bottom: 0;
        top: 0;
        margin: 0 auto;
        z-index: 1;
        font-size: 12px;
        line-height: 24px;
        text-align: center;
        color: #fff;
      }
    }
    .oe-corner-lower-angle {
      font-size: 32px;
    }
  }
  /* 商品标题 */
  .shop-title {
    @include text-ellipsis(200px);
    font-size: 14px;
    color: #000000;
    &.ellipsis-150 {
      @include text-ellipsis(150px);
    }
    &.ellipsis-100 {
      @include text-ellipsis(100px);
    }
    &.ellipsis-80 {
      @include text-ellipsis(80px);
    }
  }
  /* 商品副标题 */
  .shop-subtitle-title {
    @include text-ellipsis(150px);
    &.ellipsis-60 {
      @include text-ellipsis(60px);
    }
    margin-top: 5px;
    font-size: 12px;
    color: #acacac;
  }
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
  /* 图标标签 */
  .icon-tag {
    font-size: 28px;
  }
  /* 文字标签 */
  .text-tag {
    height: 22px;
    line-height: 22px;
    border-radius: 5px;
    font-size: 12px;
    padding: 0 5px;
    text-align: center;
    background-color: #ffffff;
    color: #ffffff;
    border: solid 1px;
    border-color: transparent;
  }
  /* 栅格单元 */
  .inner {
    position: relative;
    overflow: hidden;
  }
  /* center风格 */
  .center-item {
    position: relative;
    overflow: hidden;
    &:last-child {
      margin-bottom: 0 !important;
    }
  }
  .item-foot {
    padding: 8px 12px;
    width: calc(100% - 24px);
  }
  /* upDown风格 */
  .upDown-item {
    position: relative;
    display: flex;
    &:last-child {
      margin-bottom: 0 !important;
    }
    .info {
      flex-direction: column;
    }
  }
  /* bothSides风格 */
  .bothSides-list {
    display: flex;
    flex-wrap: wrap;
  }
  .bothSides-item {
    width: 50%;
  }
  /* fourSides风格 */
  .fourSides-list {
    display: flex;
    flex-wrap: wrap;
  }
  .fourSides-item {
    width: 50%;
    .info {
      height: 76px;
      align-items: flex-start;
      flex-direction: column;
    }
  }
  /* trilateral风格 */
  .trilateral-list {
    display: flex;
    flex-wrap: wrap;
  }
  .trilateral-item {
    width: 33.33333333333333333333333333333333333333333%;
    .inner {
      flex-direction: column;
      .view-image {
        width: 100%;
      }
    }
  }
  /* middle风格 */
  .middle-list {
    display: flex;
    overflow: hidden;
    align-items: center;
  }
  .middle-item {
    width: 33.33333333333333333333333333333333333333333%;
    flex-shrink: 0;
    .inner {
      flex-direction: column;
    }
    .item-foot {
      padding: 4px 8px;
      width: calc(100% - 16px);
    }
    .view-image {
      width: 100%;
    }
    &:nth-child(1),
    &:nth-child(3) {
      .commodity-price {
        display: none;
      }
    }
  }
  /* left风格 */
  .left-list {
    display: flex;
    overflow: hidden;
    align-items: center;
  }
  .left-item {
    width: 30%;
    flex-shrink: 0;
    .inner {
      flex-direction: column;
    }
    .item-foot {
      padding: 4px 8px;
      width: calc(100% - 16px);
    }
    .view-image {
      width: 100%;
    }
  }
</style>
