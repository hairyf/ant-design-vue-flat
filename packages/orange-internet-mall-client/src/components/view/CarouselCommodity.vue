<!--
 * @Author: Zhilong
 * @Date: 2021-04-06 15:07:38
 * @LastEditTime: 2021-05-11 20:25:15
 * @Description: 轮播商品 视图区...
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="carouserl-commodity-container" :style="{ padding, background }">
    <div
      class="u-p-b-18 u-flex carouserl-commodity-view"
      :style="{
        borderRadius,
        backgroundImage: `url(${colorStyle.backgroundImage})`,
      }"
    >
      <div class="u-flex">
        <link-controller
          v-for="(item, index) in list"
          :data="item"
          :key="index"
          class="carouserl-commodity-item"
          :class="index === list.length - 1 ? 'u-m-r-50' : 'u-m-r-20'"
          :style="{
            backgroundColor: colorStyle.color.subBackground,
            boxShadow,
            border,
          }"
        >
          <view-image
            v-if="item"
            :size="105 * 2"
            :src="item.value.data.main_picture"
          />
          <div class="item-text-view" :style="{ color: colorStyle.color.text }">
            <span style="font-size: 24rpx; line-height: 30rpx">￥</span>
            <span style="font-size: 32rpx" v-if="item">
              {{ item.value.data.price }}
            </span>
          </div>
        </link-controller>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import {
  carouselCommodityOption,
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
      type: Object as () => typeof carouselCommodityOption,
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
    // 导出配置为常量 供视图使用
    const { addProduct, colorStyle } = option;
    // 使用hook获取基本配置
    const { padding, borderRadius } = usePaddingRadius(option);
    const { background } = useBackgroundColor(option.colorStyle);
    const { boxShadow, border } = useComponentModalStyle(option.componentStyle);
    return {
      addProduct,
      colorStyle,
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
<style lang="scss">
::-webkit-scrollbar {
  display: none;
}
.carouserl-commodity-container {
  .carouserl-commodity-view {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    overflow: auto;
    padding: toRpx(100) toRpx(16) toRpx(16) toRpx(16);
    .carouserl-commodity-item {
      width: toRpx(105);
      height: toRpx(136);
      .item-text-view {
        display: flex;
        align-items: flex-end;
        padding: toRpx(6) toRpx(10);
      }
    }
  }
}
</style>
