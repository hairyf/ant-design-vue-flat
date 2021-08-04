<!--
 * @Author: Zhilong
 * @Date: 2021-03-29 12:53:00
 * @LastEditTime: 2021-05-11 18:15:03
 * @Description: 视图区的固定搜索框
 * @LastEditors: Zhilong
 * @autograph: 那天~新的页面诞生了
-->
<template>
  <div
    :style="{
      padding,
      background,
    }"
    class="search-input-container"
  >
    <div class="u-flex u-m-b-10" v-if="searchSetting.positionShow !== '不显示'">
      <view-icon
        name="oe-location-outline"
        :style="{ color: searchSetting.color.title }"
      />
      <span class="address-text" :style="{ color: searchSetting.color.text }">
        {{
          '聚客科技试验中心-F区计期点(目标手机向东,距北一处WC向东偏移12.58度5.32米位置)'
        }}
      </span>
      <view-icon name="oe-arrow-right" />
    </div>
    <div class="input-view">
      <link-controller :data="searchSetting.leftLink">
        <div class="imput-view-div">
          <view-image
            v-if="searchSetting.rightButtonType === '图片'"
            style="margin: 0 32rpx 0 8rpx"
            border
            :src="searchSetting.leftImage"
            :size="22 * 2"
          />
          <view-icon
            v-else-if="searchSetting.leftButtonType === '图标'"
            class="input-default-image"
            style="margin: 0 32rpx 0 8rpx"
            :style="{
              border: searchSetting.leftIcon ? 'none' : '2rpx dashed #D9D9D9',
            }"
            :name="searchSetting.leftIcon"
          />
        </div>
      </link-controller>

      <div
        class="search-container u-flex-1"
        :style="{
          justifyContent: searchSetting.contentPosition,
          borderColor: colorStyle.color.border,
          borderRadius,
        }"
        @click="$navigateTo('/pages/commons/search')"
      >
        <view-icon
          name="oe-search"
          class="u-m-r-8 u-m-t-3"
          :style="{ color: colorStyle.color.icon }"
        />
        <span :style="{ color: colorStyle.color.text }">
          {{ searchSetting.tipsContent }}
        </span>
      </div>
      <link-controller
        v-if="searchSetting.rightButtonType === '图片'"
        :data="searchSetting.rightLink"
      >
        <view-image
          style="margin: 0 8rpx 0 32rpx"
          border
          :src="searchSetting.rightImage"
          :size="22 * 2"
        />
      </link-controller>
      <view-icon
        v-else-if="searchSetting.rightButtonType === '图标'"
        class="input-default-image"
        style="margin: 0 8rpx 0 32rpx"
        :style="{
          border: searchSetting.rightIcon ? 'none' : '2rpx dashed #D9D9D9',
        }"
        :name="searchSetting.rightIcon"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { fixedSearchInputOption } from 'orange-components-config/options';
import { useBackgroundColor, usePaddingRadius } from '@/hooks/use-view-style';

export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof fixedSearchInputOption,
      required: true,
    },
  },
  setup(props) {
    // 取出组变量
    const { searchSetting, colorStyle } = props.option;
    // 边距配置 使用Hook
    const { padding, borderRadius } = usePaddingRadius(props.option);
    // 背景配置 使用Hook
    const { background } = useBackgroundColor(colorStyle);
    return {
      searchSetting,
      colorStyle,
      padding,
      borderRadius,
      background,
    };
  },
});
</script>
<style lang="scss" scoped>
.search-input-container {
  .title-text {
    float: right;
    font-size: toRpx(14);
  }
  .address-text {
    font-size: toRpx(14);
    padding: 0 toRpx(6);
    @include text-ellipsis(toRpx(130));
  }
  .input-view {
    clear: right;
    display: flex;
    align-items: center;

    .input-default-image {
      width: toRpx(22);
      height: toRpx(22);
      box-sizing: border-box;
    }

    .input-view-div {
      display: flex;
      align-items: center;
    }
    .search-container {
      background-color: #fff;
      text-align: center;
      color: #999;
      padding: toRpx(8) toRpx(14);
      font-size: toRpx(12);
      display: flex;
      align-items: center;
      border: toRpx(1) solid rgba(0, 0, 0, 0);
    }
  }
}
</style>
