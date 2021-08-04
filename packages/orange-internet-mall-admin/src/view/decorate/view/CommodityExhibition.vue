<!--
 * @Author: Zhilong
 * @Date: 2021-04-06 17:41:07
 * @LastEditTime: 2021-04-27 17:48:23
 * @Description: 商品展播 视图页面
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="commodity-exhibition-container" :style="{ padding }">
    <div :style="{ borderRadius, background, overflow: 'hidden' }">
      <div
        class="oe-flex oe-row-between commodity-exhibition-view"
        :style="{
          backgroundImage: `url(${componentStyle.backgroundImage})`
        }"
      >
        <div>
          <div class="oe-m-b-5" :style="{ fontSize: '14px', color: contentStyle.color.title }">
            {{ contentStyle.title }}
          </div>
          <div :style="{ fontSize: '12px', color: contentStyle.color.subTitle }">
            {{ contentStyle.subTitle }}
          </div>
        </div>
        <div
          class="top-view-btn"
          :style="{ backgroundColor: contentStyle.color.btn, color: contentStyle.color.text }"
        >
          更多 <i class="el-icon-arrow-right" />
        </div>
      </div>
      <div class="oe-flex oe-p-l-5 oe-p-r-5 oe-p-b-5">
        <template v-if="addProduct.chooseProduct === '手动选择'">
          <div
            class="commodity-exhibition-item"
            v-for="(item, index) in addProduct.manualSelection"
            :style="{ backgroundColor: colorStyle.color.subBackground, border, boxShadow }"
            :key="index"
          >
            <view-image
              v-if="item"
              :size="99"
              :src="item.value.data.main_picture"
              style="overflow: hidden; border-top-left-radius: 5px; border-top-right-radius: 5px"
            />
            <div class="item-text-title" :style="{ color: colorStyle.color.title }">
              <div>{{ item.name }}</div>
            </div>
            <div class="oe-flex">
              <!-- 价格 -->
              <div class="item-text-view" :style="{ color: colorStyle.color.text, flex: 1 }">
                <span style="font-size: 12px">￥</span>
                <span style="font-size: 13px" v-if="item">{{ item.value.data.price }}</span>
              </div>
              <!-- 购买按钮 -->
              <i
                class="oe-btn-shopping"
                :style="{ padding: '0 10px 10px 10px', color: colorStyle.color.btn }"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <div
            class="commodity-exhibition-item"
            v-for="v of addProduct.productsNum"
            :style="{ backgroundColor: colorStyle.color.subBackground, border, boxShadow }"
            :key="v"
          >
            <view-image
              :size="99"
              style="
                overflow: hidden;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                background-color: #0001;
              "
            />
            <div class="item-text-title" :style="{ color: colorStyle.color.title }">
              <div>这里是商品标题</div>
            </div>
            <div class="oe-flex">
              <!-- 价格 -->
              <div class="item-text-view" :style="{ color: colorStyle.color.text, flex: 1 }">
                <span style="font-size: 12px">￥</span>
                <span style="font-size: 13px">--</span>
              </div>
              <!-- 购买按钮 -->
              <i
                class="oe-btn-shopping"
                :style="{ padding: '0 10px 10px 10px', color: colorStyle.color.btn }"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { commodityExhibitionOption } from '@/view/decorate/config/options'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'
  import {
    useBackgroundColor,
    usePaddingRadius,
    useComponentModalStyle
  } from '@/view/decorate/hooks/use-view-style'

  const props = defineProps({
    option: {
      type: Object as () => typeof commodityExhibitionOption,
      required: true
    }
  })
  //导出配置为常量 供视图使用
  const { addProduct, contentStyle, colorStyle, componentStyle } = props.option

  // 使用hook获取基本配置
  const { padding, borderRadius } = usePaddingRadius(props.option)
  const { background } = useBackgroundColor(props.option.colorStyle)
  const { border, boxShadow } = useComponentModalStyle(props.option.componentStyle)
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .commodity-exhibition-container {
    .commodity-exhibition-view {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      padding: 10px;
      .top-view-btn {
        padding: 3px 9px;
        font-size: 5pt;
        background: rgba(0, 0, 0, 0.2);
        border: 0.5px solid #ffffff;
        box-sizing: border-box;
        border-radius: 27px;
      }
    }
    .commodity-exhibition-item {
      border-radius: 5px;
      width: 99px;
      margin: 8px 5px;
      .item-text-view {
        display: flex;
        align-items: flex-end;
        padding: 0px 0 5px 6px;
        @include text-ellipsis(70%);
      }
      .item-text-title {
        padding: 5px;
        font-size: 14px;
        > div {
          @include text-hidden-line(2);
        }
      }
    }
  }
</style>
