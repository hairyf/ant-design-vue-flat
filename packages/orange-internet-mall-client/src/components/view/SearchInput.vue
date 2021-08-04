<!--
 * @Author: Zhilong
 * @Date: 2021-03-29 12:53:00
 * @LastEditTime: 2021-05-11 19:25:45
 * @Description: 视图区的搜索框
 * @LastEditors: Zhilong
 * @autograph: 那天~新的页面诞生了
-->
<template>
  <div
    :style="{
      padding,
      background,
      boxShadow,
      border,
    }"
    class="search-input-container"
  >
    <div class="input-view">
      <div
        v-if="searchSetting.positionShow !== '不显示'"
        :style="{
          order: searchSetting.positionShow === '左侧' ? 0 : 1,
          padding:
            searchSetting.positionShow === '左侧'
              ? '0 16rpx 0 0'
              : '0 0 0 16rpx',
        }"
      >
        <view-icon name="oe-location-outline" />
        <span
          class="address-text"
          :style="{ color: searchSetting.addressColor }"
        >
          {{
            searchSetting.showAddress === '省'
              ? '广东省'
              : searchSetting.showAddress === '市'
              ? '深圳市'
              : '龙岗区'
          }}
        </span>
      </div>
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
          name="oe-search "
          class="u-m-r-8 u-m-t-3"
          :style="{ color: colorStyle.color.icon }"
        />
        <span :style="{ color: colorStyle.color.text }">{{
          searchSetting.tipsContent
        }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { searchInputOption } from 'orange-components-config/options';
import {
  useBackgroundColor,
  usePaddingRadius,
  useComponentModalStyle,
} from '@/hooks/use-view-style';

export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof searchInputOption,
      required: true,
    },
  },
  setup(props) {
    // 取出组变量
    const { componentStyle, searchSetting, colorStyle } = props.option;
    // 边距配置 使用Hook
    const { padding, borderRadius } = usePaddingRadius(props.option);
    // 背景配置 使用Hook
    const { background } = useBackgroundColor(colorStyle);
    // 风格样式 使用Hook
    const { boxShadow, border } = useComponentModalStyle(componentStyle);
    if (searchSetting.positionShow !== '不显示') {
      // uni.getLocation({
      //   success: (res) => {
      //     // uni.openLocation({
      //     //   latitude: res.latitude,
      //     //   longitude: res.longitude,
      //     // });
      //   },
      //   fail: (error) => {
      //   },
      //   complete: (over) => {
      //   },
      // });
    }
    return {
      componentStyle,
      searchSetting,
      colorStyle,
      padding,
      borderRadius,
      background,
      boxShadow,
      border,
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
  .input-view {
    clear: right;
    display: flex;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      .address-text {
        font-size: toRpx(14);
        white-space: nowrap;
        padding-left: toRpx(5);
      }
    }
    div.search-container {
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
