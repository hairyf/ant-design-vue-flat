<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:19:15
 * @LastEditTime: 2021-05-11 19:41:08
 * @Description: 弹窗视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="list-navigation-container"
    :style="{
      padding,
      borderRadius,
      background,
    }"
  >
    <div
      class="list-navigation-view"
      :style="{ backgroundColor: option.colorStyle.color.subBackground }"
    >
      <link-controller
        v-for="item in option.listContent.list"
        :key="item.CACHE_KEY_LIST"
        :data="item.link"
        class="navigation-item u-flex"
        :style="{
          color: option.colorStyle.color.text,
          borderBottomColor: option.colorStyle.color.line,
        }"
      >
        <view-image
          class="image u-m-r-16"
          :label-color="option.colorStyle.color.icon"
          v-if="option.listContent.iconStatus && item.image"
          :src="item.image"
        />
        <div class="text u-flex-1">
          {{ item.title }}
        </div>
        <i
          class="u-icon-arrow-right"
          style="font-size: 28rpx; color: #9f9f9f"
        />
      </link-controller>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { listNavigationOption } from 'orange-components-config/options';
import { useBackgroundColor, usePaddingRadius } from '@/hooks/use-view-style';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof listNavigationOption,
      required: true,
    },
  },
  setup(props) {
    //导出配置为常量 供视图使用
    const { colorStyle } = props.option;
    const { background } = useBackgroundColor(colorStyle);
    const { padding, borderRadius } = usePaddingRadius(props.option);

    return {
      colorStyle,
      background,
      padding,
      borderRadius,
    };
  },
});
</script>
<style lang="scss" scoped>
.navigation-item {
  border-bottom: solid toRpx(1) #eeeeee;
  padding: toRpx(15);
  &:last-child {
    border: none;
  }
}
.image {
  width: toRpx(16);
  height: toRpx(16);
}
.text {
  font-size: toRpx(14);
}
</style>
