<!--
 * @Author: Zhilong
 * @Date: 2021-04-06 17:41:07
 * @LastEditTime: 2021-05-11 20:46:05
 * @Description: 商品展播 视图页面
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="commodity-exhibition-container" :style="{ padding }">
    <div :style="{ borderRadius, background, overflow: 'hidden' }">
      <div
        class="u-flex u-row-between commodity-exhibition-view"
        :style="{
          backgroundImage: `url(${componentStyle.backgroundImage})`,
        }"
      >
        <div>
          <div
            class="u-m-b-5"
            :style="{ fontSize: '28rpx', color: contentStyle.color.title }"
          >
            {{ contentStyle.title }}
          </div>
          <div
            :style="{ fontSize: '24rpx', color: contentStyle.color.subTitle }"
          >
            {{ contentStyle.subTitle }}
          </div>
        </div>
        <link-controller
          class="top-view-btn"
          :data="contentStyle.link"
          :style="{
            backgroundColor: contentStyle.color.btn,
            color: contentStyle.color.text,
          }"
        >
          更多 <view-icon class="u-m-l-15" name="oe-arrow-right" />
        </link-controller>
      </div>
      <div class="u-flex u-p-l-5 u-p-r-5 u-p-b-5" style="overflow: auto">
        <div v-for="(item, index) in list" :key="index">
          <link-controller :data="item">
            <div
              class="commodity-exhibition-item"
              :style="{
                backgroundColor: colorStyle.color.subBackground,
                boxShadow,
                border,
              }"
            >
              <view-image
                v-if="item"
                :size="99 * 2"
                :src="item.value.data.main_picture"
                style="
                  overflow: hidden;
                  border-top-left-radius: 10rpx;
                  border-top-right-radius: 10rpx;
                "
              />
              <div
                class="item-text-title"
                :style="{ color: colorStyle.color.title }"
              >
                <div>{{ item.name }}</div>
              </div>
              <div class="u-flex">
                <!-- 价格 -->
                <div
                  class="item-text-view"
                  :style="{ color: colorStyle.color.text, flex: 1 }"
                >
                  <span style="font-size: 24rpx">￥</span>
                  <span style="font-size: 26rpx" v-if="item">
                    {{ item.value.data.price }}
                  </span>
                </div>
                <!-- 购买按钮 -->
                <view-icon
                  name="oe-btn-shopping"
                  :style="{
                    padding: '0 20rpx 20rpx 20rpx',
                    color: colorStyle.color.btn,
                  }"
                />
              </div>
            </div>
          </link-controller>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import {
  commodityExhibitionOption,
  linkOption,
} from 'orange-components-config/options';

import {
  useBackgroundColor,
  usePaddingRadius,
  useComponentModalStyle,
} from '@/hooks/use-view-style';
import { reqGoodsScreenList } from '@/api';
import { cloneDeep } from 'lodash';

export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof commodityExhibitionOption,
      required: true,
    },
  },
  setup({ option }) {
    const list = ref([] as typeof linkOption[]);
    const handelData = async () => {
      // 分类商品请求处理
      const handelGoodsClassList = async (reqData: ScreenParameter) => {
        const { data } = await reqGoodsScreenList(reqData);
        list.value = data.data.data.map((item: Record<string, any>) => {
          const newItem = cloneDeep(linkOption);
          newItem.type = 'shop';
          newItem.value.path = '/pages/commons/shopDetails';
          newItem.value.params = { id: item.id };
          newItem.value.data = item;
          return newItem;
        });
      };
      // 排序数据
      const order =
        option.addProduct.commodityRanking === '按销量' ? 'sales' : 'price';
      const ordersort =
        option.addProduct.commodityRanking === '价格升序' ? 'asc' : 'desc';
      // 数量数据
      const limit = option.addProduct.productsNum;
      switch (option.addProduct.chooseProduct) {
        case '手动选择':
          list.value = option.addProduct.manualSelection;
          break;
        case '选择分类':
          // 正常分类数据
          if (option.addProduct.selectCategories?.type === 'classification') {
            const classId: number | null =
              option.addProduct.selectCategories?.value?.params?.classId ||
              null;
            if (classId) {
              handelGoodsClassList({
                classId,
                limit,
                ordersort,
                order,
              });
            }
          }
          break;
        case '选择分组':
          // 正常分组数据
          if (option.addProduct.selectGroup?.type === 'grouping') {
            const groupId: number | null =
              option.addProduct.selectGroup?.value?.params?.id || null;
            if (groupId) {
              handelGoodsClassList({
                groupId,
                limit,
                ordersort,
                order,
              });
            }
          }
          break;
      }
    };
    handelData();
    //导出配置为常量 供视图使用
    const { addProduct, contentStyle, colorStyle, componentStyle } = option;

    // 使用hook获取基本配置
    const { padding, borderRadius } = usePaddingRadius(option);
    const { background } = useBackgroundColor(option.colorStyle);
    const { boxShadow, border } = useComponentModalStyle(option.componentStyle);
    return {
      addProduct,
      contentStyle,
      colorStyle,
      componentStyle,
      padding,
      borderRadius,
      background,
      boxShadow,
      border,
      list,
    };
  },
});
</script>
<style lang="scss" scoped>
.commodity-exhibition-container {
  .commodity-exhibition-view {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    padding: toRpx(10);
    .top-view-btn {
      padding: toRpx(3) toRpx(12);
      font-size: 32rpx;
      zoom: 0.7;
      background: rgba(0, 0, 0, 0.2);
      border: toRpx(0.5) solid #ffffff;
      box-sizing: border-box;
      border-radius: toRpx(27);
    }
  }
  .commodity-exhibition-item {
    border-radius: toRpx(5);
    width: toRpx(99);
    margin: toRpx(8) toRpx(5);
    .item-text-view {
      display: flex;
      align-items: flex-end;
      padding: toRpx(0) 0 toRpx(5) toRpx(6);
      @include text-ellipsis(70%);
    }
    .item-text-title {
      padding: toRpx(5);
      font-size: toRpx(14);
      > div {
        @include text-hidden-line(2);
      }
    }
  }
}
</style>
