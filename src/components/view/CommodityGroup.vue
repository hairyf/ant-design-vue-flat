<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-15 18:58:08
 * @LastEditTime: 2021-05-13 11:01:07
 * @Description: 商品组视图项
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="commodity-group-container"
    :style="{
      padding: `${option.padding.top * 2 + 0.1 || 1}rpx ${
        option.padding.leftRight * 2 || 0
      }rpx ${option.padding.bottom * 2 || 0}rpx`,
      background,
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
            marginBottom: `${option.padding.shopSpacing * 2}rpx`,
            boxShadow,
            border,
          }"
          :key="i"
          @click.stop="$handleLink(v)"
        >
          <!-- 角标 -->
          <corner-markersetting :option="option" />
          <view-image
            :size="{ width: '100%', height: 162 * 2 }"
            :empty-type="2"
            :src="v.value.data.main_picture"
          />
          <div
            class="item-foot"
            :style="{
              backgroundColor: option.colorStyle.color.good,
            }"
          >
            <!-- 商品标题 -->
            <commodity-title :option="option" :item="v.value.data" />
            <div class="u-flex u-row-between">
              <div class="left">
                <!-- 商品价格 -->
                <commodity-price :option="option" :item="v.value.data" />
              </div>
              <div class="right">
                <!-- 购买按钮 -->
                <buy-button-style
                  :option="option"
                  @click="$handleLink(false)"
                />
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
            marginBottom: `${option.padding.shopSpacing * 2}rpx`,
          }"
          @click.stop="$handleLink(v)"
        >
          <!-- 角标 -->
          <corner-markersetting :option="option" />
          <view-image
            :size="130 * 2"
            :empty-type="2"
            :src="v.value.data.main_picture"
          />
          <div
            class="info u-flex u-flex-1 u-p-8"
            :style="{
              backgroundColor: option.colorStyle.color.good,
            }"
          >
            <div class="u-flex-1" style="width: 100%">
              <!-- 商品标题 -->
              <commodity-title :option="option" :item="v.value.data" />
            </div>
            <div class="u-flex u-row-between" style="width: 100%">
              <div class="left">
                <!-- 商品价格 -->
                <commodity-price :option="option" :item="v.value.data" />
              </div>
              <div class="right">
                <!-- 购买按钮 -->
                <buy-button-style :option="option" @click="$handleLink(v)" />
                <!-- 按钮标记 -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- bothSides风格 -->
    <template v-if="option.componentStyle.styleType == 'bothSides'">
      <div
        class="bothSides-list"
        :style="{ margin: `${-option.padding.shopSpacing}rpx` }"
      >
        <div class="bothSides-item" v-for="(v, i) in list" :key="i">
          <div
            class="inner"
            :style="{
              boxShadow,
              border,
              borderRadius,
              margin: `${option.padding.shopSpacing}rpx`,
            }"
            @click.stop="$handleLink(v)"
          >
            <!-- 角标 -->
            <corner-markersetting :option="option" />
            <view-image
              :size="{ width: '100%', height: 172 * 2 }"
              :src="v.value.data.main_picture"
            />
            <div
              class="item-foot"
              :style="{
                backgroundColor: option.colorStyle.color.good,
              }"
            >
              <!-- 商品标题 -->
              <commodity-title :option="option" :item="v.value.data" />
              <div class="u-flex u-row-between">
                <div class="left">
                  <!-- 商品价格 -->
                  <commodity-price :option="option" :item="v.value.data" />
                </div>
                <div class="right">
                  <!-- 购买按钮 -->
                  <buy-button-style :option="option" @click="$handleLink(v)" />
                  <!-- 按钮标记 -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- fourSides风格 -->
    <template v-if="option.componentStyle.styleType == 'fourSides'">
      <div
        class="fourSides-list"
        :style="{ margin: `${-option.padding.shopSpacing * 2}rpx` }"
      >
        <div class="fourSides-item" v-for="(v, i) in list" :key="i">
          <div
            class="inner u-flex"
            :style="{
              boxShadow,
              border,
              borderRadius,
              margin: `${option.padding.shopSpacing * 2}rpx`,
            }"
            @click.stop="$handleLink(v)"
          >
            <!-- 角标 -->
            <corner-markersetting :option="option" />
            <view-image :size="80 * 2" :src="v.value.data.main_picture" />
            <div
              class="info u-flex u-flex-1 u-p-4"
              :style="{
                backgroundColor: option.colorStyle.color.good,
              }"
            >
              <div class="u-flex-1" style="width: 100%">
                <!-- 商品标题 -->
                <commodity-title
                  :title-ellipsis="80"
                  :subtitle-ellipsis="80"
                  :option="option"
                  :item="v.value.data"
                />
              </div>
              <div class="u-flex u-row-between" style="width: 100%">
                <div class="left">
                  <!-- 商品价格 -->
                  <commodity-price :option="option" :item="v.value.data" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- trilateral风格 -->
    <template v-if="option.componentStyle.styleType == 'trilateral'">
      <div
        class="trilateral-list"
        :style="{ margin: `${-option.padding.shopSpacing}rpx` }"
      >
        <div class="trilateral-item" v-for="(v, i) in list" :key="i">
          <div
            class="inner u-flex"
            :style="{
              boxShadow,
              border,
              borderRadius,
              margin: `${option.padding.shopSpacing}rpx`,
            }"
            @click.stop="$handleLink(v)"
          >
            <!-- 角标 -->
            <corner-markersetting :option="option" />
            <view-image
              :size="{ width: '100%', height: 112 * 2 }"
              :src="v.value.data.main_picture"
              style="width: 100%"
            />
            <div
              class="item-foot"
              :style="{
                backgroundColor: option.colorStyle.color.good,
              }"
            >
              <!-- 商品标题 -->
              <commodity-title :option="option" :item="v.value.data" />
              <!-- 商品价格 -->
              <commodity-price :option="option" :item="v.value.data" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- middle风格 -->
    <template v-if="option.componentStyle.styleType == 'middle'">
      <swiper
        class="middle-list"
        :style="{ margin: `${-option.padding.shopSpacing}rpx` }"
        @change="onSwiperChange"
        style="margin-left: 33.33%"
        :duration="600"
        previous-margin="250rpx"
        next-margin="250rpx"
        :current="currentIndex"
      >
        <swiper-item v-for="(v, i) in list" :key="i" class="middle-item">
          <div
            class="inner u-flex other-item"
            :class="{ 'current-item': currentIndex === i }"
            :style="{
              boxShadow,
              border,
              borderRadius,
              margin:
                currentIndex === i
                  ? `${option.padding.shopSpacing * 2}rpx`
                  : `${(option.padding.shopSpacing - 6.67) * 2}rpx`,
            }"
            @click.stop="$handleLink(v)"
          >
            <!-- 角标 -->
            <corner-markersetting :option="option" />
            <view-image
              :size="{ width: '100%', height: 112 * 2 }"
              :src="v.value.data.main_picture"
              style="width: 100%"
            />
            <div
              class="item-foot"
              :style="{
                backgroundColor: option.colorStyle.color.good,
              }"
            >
              <!-- 商品标题 -->
              <commodity-title :option="option" :item="v.value.data" />
              <!-- 商品价格 -->
              <commodity-price
                :option="option"
                :item="v.value.data"
                v-if="currentIndex === i"
              />
            </div>
          </div>
        </swiper-item>
      </swiper>
    </template>
    <!-- left风格 -->
    <template v-if="option.componentStyle.styleType == 'left'">
      <div
        class="left-list"
        :style="{ margin: `${-option.padding.shopSpacing}rpx` }"
      >
        <div class="left-item" v-for="(v, i) in list" :key="i">
          <div
            class="inner u-flex"
            :style="{
              boxShadow,
              border,
              borderRadius,
              margin: `${option.padding.shopSpacing}rpx`,
            }"
            @click.stop="$handleLink(v)"
          >
            <!-- 角标 -->
            <corner-markersetting :option="option" />
            <view-image
              :size="{ width: '100%', height: 112 * 2 }"
              :src="v.value.data.main_picture"
              style="width: 100%"
            />
            <div
              class="item-foot"
              :style="{ backgroundColor: option.colorStyle.color.good }"
            >
              <!-- 商品标题 -->
              <commodity-title :option="option" :item="v.value.data" />
              <!-- 商品价格 -->
              <commodity-price :option="option" :item="v.value.data" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import {
  commodityGroupOption,
  commodityRankingOption,
  linkOption,
} from 'orange-components-config/options';
import {
  useBackgroundColor,
  useComponentModalStyle,
  usePaddingRadius,
} from '@/hooks/use-view-style';
import CornerMarkersetting from './CommodityGroup/CornerMarkersetting.vue';
import CommodityTitle from './CommodityGroup/CommodityTitle.vue';
import CommodityPrice from './CommodityGroup/CommodityPrice.vue';
import BuyButtonStyle from './CommodityGroup/BuyButtonStyle.vue';
import { reqGoodsScreenList } from '@/api';
import { cloneDeep, sortBy } from 'lodash';

export default defineComponent({
  props: {
    option: {
      type: [
        Object as () => typeof commodityRankingOption,
        Object as () => typeof commodityGroupOption,
      ],
      required: true,
    },
  },
  methods: {
    onSwiperChange({ detail: { current } }: { detail: { current: number } }) {
      this.currentIndex = current;
    },
  },
  setup({ option }) {
    const list = ref([] as typeof linkOption[]);
    const currentIndex = ref(0);

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
        currentIndex.value = list.value.length !== 1 ? 1 : 0;
      };
      // 排序数据
      const order =
        option.addProduct.commodityRanking === '按销量' ? 'sales' : 'price';
      const ordersort =
        option.addProduct.commodityRanking === '价格升序' ? 'asc' : 'desc';
      // 数量数据
      const limit = option.addProduct.productsNum;
      // 营销属性
      const marketing_tab = {
        '': '',
        推荐商品: 1,
        新品商品: 2,
        热卖商品: 3,
      }[option.addProduct.marketingAttributes];
      switch (option.addProduct.chooseProduct) {
        case '手动选择':
          list.value = option.addProduct.manualSelection;
          // 重置开始的index
          currentIndex.value = list.value.length !== 1 ? 1 : 0;
          break;
        case '选择分类':
          // 商品排行
          if ((option as typeof commodityRankingOption)?.showSetting) {
            const { showSetting } = option as typeof commodityRankingOption;
            const classId = showSetting.commodityClass;
            const title = showSetting.keyword;
            // const limit = showSetting.count;
            // 检测是填写完整
            const newPriceList = showSetting.priceRange.some(
              (i: number | string | undefined) => !i
            )
              ? showSetting.priceRange
              : sortBy(showSetting.priceRange);
            const price = newPriceList.map((i) =>
              isNaN(parseInt(i as string)) ? '' : parseInt(i as string)
            );
            // 获得分类数据并赋值
            handelGoodsClassList({
              classId: classId === 'all' ? '' : classId,
              title,
              limit,
              price,
            });
          }
          // 正常分类数据
          if (option.addProduct.selectCategories?.type === 'classification') {
            const classId: number | string | null =
              option.addProduct.selectCategories?.value?.params?.classId ||
              null;
            if (classId) {
              handelGoodsClassList({
                classId: classId === 'all' ? '' : classId,
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
        case '营销属性':
          handelGoodsClassList({
            marketing_tab,
            limit,
            ordersort,
            order,
          });
          break;
      }
    };
    handelData();
    const { padding, borderRadius } = usePaddingRadius(option);
    const { background } = useBackgroundColor(option.colorStyle);
    const { boxShadow, border } = useComponentModalStyle(option.componentStyle);
    return {
      padding,
      currentIndex,
      borderRadius,
      background,
      boxShadow,
      border,
      list,
    };
  },
  components: {
    CornerMarkersetting,
    CommodityTitle,
    CommodityPrice,
    BuyButtonStyle,
  },
});
</script>
<style lang="scss">
.current-item {
  transform: scale(1) !important;
  transition: 0.2s transform ease-in;
}
.other-item {
  transform: scale(0.9);
  transition: 0.2s transform ease-in;
}

/* 角标 */
.corner-marker-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: toRpx(36);
  height: toRpx(20);
  .corner-marker-icon {
    position: relative;
    font-size: toRpx(21);
    span {
      position: absolute;
      left: toRpx(-2);
      right: 0;
      bottom: 0;
      top: 0;
      margin: 0 auto;
      z-index: 1;
      font-size: toRpx(12);
      line-height: toRpx(24);
      text-align: center;
      color: #fff;
    }
  }
  .oe-corner-lower-angle {
    font-size: toRpx(32);
  }
}
/* 商品标题 */
.shop-title {
  @include text-ellipsis(toRpx(200));
  font-size: toRpx(14);
  color: #000000;
  &.ellipsis-150 {
    @include text-ellipsis(toRpx(150));
  }
  &.ellipsis-100 {
    @include text-ellipsis(toRpx(100));
  }
  &.ellipsis-80 {
    @include text-ellipsis(toRpx(80));
  }
}
/* 商品副标题 */
.shop-subtitle-title {
  @include text-ellipsis(toRpx(150));
  &.ellipsis-60 {
    @include text-ellipsis(toRpx(60));
  }
  margin-top: toRpx(5);
  font-size: toRpx(12);
  color: #acacac;
}
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
/* 图标标签 */
.icon-tag {
  font-size: toRpx(28);
}
/* 文字标签 */
.text-tag {
  height: toRpx(22);
  line-height: toRpx(22);
  border-radius: toRpx(5);
  font-size: toRpx(12);
  padding: 0 toRpx(5);
  text-align: center;
  background-color: #ffffff;
  color: #ffffff;
  border: solid toRpx(1);
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
  padding: toRpx(6) toRpx(8);
  width: 100%;
  box-sizing: border-box;
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
    height: toRpx(76);
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
  height: 340rpx;
}
.middle-item {
  width: 33.33333333333333333333333333333333333333333%;
  flex-shrink: 0;
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  ::v-deep .uni-swiper-wrapper {
    overflow: visible;
  }
  .inner {
    flex-direction: column;
  }
  .item-foot {
    padding: toRpx(4) toRpx(8);
    box-sizing: border-box;
    width: 100%;
  }
  .view-image {
    width: 100%;
  }
}
/* left风格 */
.left-list {
  display: flex;
  overflow: auto;
  align-items: center;
}
.left-item {
  width: 30%;
  flex-shrink: 0;
  .inner {
    flex-direction: column;
  }
  .item-foot {
    padding: toRpx(4) toRpx(8);
    width: 100%;
    box-sizing: border-box;
  }
  .view-image {
    width: 100%;
  }
}
</style>
