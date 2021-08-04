<!--
 * @Author: Zhilong
 * @Date: 2021-03-30 14:58:27
 * @LastEditTime: 2021-05-11 19:39:48
 * @Description: 图片导航的视图...
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
    class="iamge-navigation-container"
  >
    <link-controller
      class="list-item-view"
      :data="item.link"
      v-for="(item, i) in imageList"
      :key="i"
    >
      <div
        :style="{
          backgroundColor: item.color.background,
          borderRadius,
        }"
      >
        <view-image
          :src="item.image"
          :empty-type="1"
          class="u-m-b-8 item-image"
          :size="{
            width: '100%',
            height: 122 * 2,
          }"
        />
        <span :style="{ color: item.color.title }" class="u-m-b-6 item-text">{{
          item.title
        }}</span>
        <span
          :style="{ color: item.color.subTitle, fontSize: '24rpx' }"
          class="u-m-b-8 item-text"
        >
          {{ item.subTitle }}
        </span>
      </div>
    </link-controller>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { imageNavigationOption } from 'orange-components-config/options';

import {
  useBackgroundColor,
  usePaddingRadius,
  useComponentModalStyle,
} from '@/hooks/use-view-style';

export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof imageNavigationOption,
      required: true,
    },
  },
  setup(props) {
    //导出并定义 各个配置
    const { imageList } = props.option;
    // 定义外层div边距和背景的计算属性
    const { padding, borderRadius } = usePaddingRadius(props.option);
    const { background } = useBackgroundColor(props.option.colorStyle);
    const { boxShadow, border } = useComponentModalStyle(
      props.option.componentStyle
    );
    return {
      imageList,
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
projection {
  box-shadow: 0 0 toRpx(10) rgb(226 231 244 / 70%);
}
.stroke {
  border: toRpx(1) solid rgb(237, 237, 237);
}
.iamge-navigation-container {
  display: flex;
  flex-wrap: wrap;
  .list-item-view {
    width: 33.33%;
    text-align: center;
    box-sizing: border-box;
    > div {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: toRpx(3);
      overflow: hidden;
      .item-image {
        box-sizing: border-box;
      }
      .item-text {
        display: block;
        font-size: toRpx(14);
        @include text-ellipsis(100%);
      }
    }
  }
}
</style>
