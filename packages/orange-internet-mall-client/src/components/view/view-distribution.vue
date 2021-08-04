<!--
 * @Author: Mr.Mao
 * @LastEditors: Zhilong
 * @Date: 2021-01-07 14:34:50
 * @LastEditTime: 2021-05-17 11:29:30
 * @Description: 页面组合-模板分配
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="o-distribution">
    <template v-for="(item, i) in templates">
      <template v-if="!item.hide">
        <div :key="i">
          <Coupon v-if="item.type === 'Coupon'" :option="item.option" />
          <ShoppingGuide
            v-if="item.type === 'ShoppingGuide'"
            :option="item.option"
          />
          <Blank v-if="item.type === 'Blank'" :option="item.option" />
          <BoutiqueRecommend
            v-if="item.type === 'BoutiqueRecommend'"
            :option="item.option"
          />
          <ButtonGroup
            v-if="item.type === 'ButtonGroup'"
            :option="item.option"
          />
          <CarouselCommodity
            v-if="item.type === 'CarouselCommodity'"
            :option="item.option"
          />
          <CarouselSearch
            v-if="item.type === 'CarouselSearch'"
            :option="item.option"
          />
          <CommodityExhibition
            v-if="item.type === 'CommodityExhibition'"
            :option="item.option"
          />
          <CommodityGroup
            v-if="item.type === 'CommodityGroup'"
            :option="item.option"
          />
          <CommodityRanking
            v-if="item.type === 'CommodityRanking'"
            :option="item.option"
          />
          <CommodityTab
            v-if="item.type === 'CommodityTab'"
            :option="item.option"
          />
          <FixedButton
            v-if="item.type === 'FixedButton'"
            :option="item.option"
          />
          <FixedSearchInput
            v-if="item.type === 'FixedSearchInput'"
            :option="item.option"
          />
          <Guide v-if="item.type === 'Guide'" :option="item.option" />
          <Images v-if="item.type === 'Image'" :option="item.option" />
          <ImageCarousel
            v-if="item.type === 'ImageCarousel'"
            :option="item.option"
          />
          <ImageExhibition
            v-if="item.type === 'ImageExhibition'"
            :option="item.option"
          />
          <ImageNavigation
            v-if="item.type === 'ImageNavigation'"
            :option="item.option"
          />
          <Notice v-if="item.type === 'Notice'" :option="item.option" />
          <SearchInput
            v-if="item.type === 'SearchInput'"
            :option="item.option"
          />
          <TitleColumn
            v-if="item.type === 'TitleColumn'"
            :option="item.option"
          />
          <CommodityInfo
            v-if="item.type === 'CommodityInfo'"
            :option="item.option"
          />
          <UserInfo v-if="item.type === 'UserInfo'" :option="item.option" />
          <OrderIconGroup
            v-if="item.type === 'OrderIconGroup'"
            :option="item.option"
          />
          <CommodityEvaluaten
            v-if="item.type === 'CommodityEvaluaten'"
            :option="item.option"
          />
          <CommonlyUsedGroup
            v-if="item.type === 'CommonlyUsedGroup'"
            :option="item.option"
          />
          <FollowOfficial
            v-if="item.type === 'FollowOfficial'"
            :option="item.option"
          />
          <CompleteOrderRemind
            v-if="item.type === 'CompleteOrderRemind'"
            :option="item.option"
          />
          <AudioPlay v-if="item.type === 'AudioPlay'" :option="item.option" />
          <ListNavigation
            v-if="item.type === 'ListNavigation'"
            :option="item.option"
          />
          <TileRegion v-if="item.type === 'TileRegion'" :option="item.option" />
          <VideoPlay v-if="item.type === 'VideoPlay'" :option="item.option" />
          <RichText v-if="item.type === 'RichText'" :option="item.option" />
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import Blank from '@/components/view/Blank.vue';
import Guide from '@/components/view/Guide.vue';
import Coupon from '@/components/view/Coupon.vue';
import Images from '@/components/view/Images.vue';
import Notice from '@/components/view/Notice.vue';
import RichText from '@/components/view/RichText.vue';
import UserInfo from '@/components/view/UserInfo.vue';
import AudioPlay from '@/components/view/AudioPlay.vue';
import VideoPlay from '@/components/view/VideoPlay.vue';
import TileRegion from '@/components/view/TileRegion.vue';
import ButtonGroup from '@/components/view/ButtonGroup.vue';
import FixedButton from '@/components/view/FixedButton.vue';
import SearchInput from '@/components/view/SearchInput.vue';
import TitleColumn from '@/components/view/TitleColumn.vue';
import CommodityTab from '@/components/view/CommodityTab.vue';
import ShoppingGuide from '@/components/view/ShoppingGuide.vue';
import CommodityInfo from '@/components/view/CommodityInfo.vue';
import ImageCarousel from '@/components/view/ImageCarousel.vue';
import CarouselSearch from '@/components/view/CarouselSearch.vue';
import CommodityGroup from '@/components/view/CommodityGroup.vue';
import FollowOfficial from '@/components/view/FollowOfficial.vue';
import ListNavigation from '@/components/view/ListNavigation.vue';
import OrderIconGroup from '@/components/view/OrderIconGroup.vue';
import ImageExhibition from '@/components/view/ImageExhibition.vue';
import ImageNavigation from '@/components/view/ImageNavigation.vue';
import CommodityRanking from '@/components/view/CommodityRanking.vue';
import FixedSearchInput from '@/components/view/FixedSearchInput.vue';
import CommonlyUsedGroup from '@/components/view/CommonlyUsedGroup.vue';
import CarouselCommodity from '@/components/view/CarouselCommodity.vue';
import BoutiqueRecommend from '@/components/view/BoutiqueRecommend.vue';
import CommodityEvaluaten from '@/components/view/CommodityEvaluaten.vue';
import CompleteOrderRemind from '@/components/view/CompleteOrderRemind.vue';
import CommodityExhibition from '@/components/view/CommodityExhibition.vue';
import { defineComponent, inject, Ref } from '@vue/composition-api';
import { ComponentMenuItem } from 'orange-components-config/options';
type CMI = ComponentMenuItem;
export default defineComponent({
  components: {
    Blank,
    Guide,
    Coupon,
    Images,
    Notice,
    RichText,
    UserInfo,
    AudioPlay,
    VideoPlay,
    TileRegion,
    ButtonGroup,
    FixedButton,
    SearchInput,
    TitleColumn,
    CommodityTab,
    CommodityInfo,
    ImageCarousel,
    ShoppingGuide,
    CarouselSearch,
    OrderIconGroup,
    CommodityGroup,
    FollowOfficial,
    ListNavigation,
    ImageNavigation,
    ImageExhibition,
    CommodityRanking,
    FixedSearchInput,
    BoutiqueRecommend,
    CarouselCommodity,
    CommonlyUsedGroup,
    CommodityEvaluaten,
    CommodityExhibition,
    CompleteOrderRemind,
  },
  setup() {
    const templates = inject<Ref<CMI[]>>('templates') as Ref<
      ComponentMenuItem[]
    >;
    return { templates };
  },
});
</script>
