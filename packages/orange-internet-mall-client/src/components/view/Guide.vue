<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-24 11:12:28
 * @LastEditTime: 2021-04-14 10:54:14
 * @Description: 分割线
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="guide-container"
    :style="{
      backgroundColor: background,
      padding: padding,
    }"
  >
    <div
      class="guide-line top"
      :style="{ borderTopStyle: option.componentType }"
    ></div>
    <div
      class="guide-line bottom"
      :style="{ borderBottomStyle: option.componentType }"
    ></div>
  </div>
</template>
<script lang="ts">
import { guideOption } from 'orange-components-config/options';
import { defineComponent } from '@vue/composition-api';
import { useBackgroundColor, usePaddingRadius } from '@/hooks/use-view-style';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof guideOption,
      required: true,
    },
  },
  setup(props) {
    const { padding } = usePaddingRadius(props.option);
    const { background } = useBackgroundColor(props.option);
    return {
      padding,
      background,
    };
  },
});
</script>
<style lang="scss" scoped>
.guide-line {
  border-width: 2rpx;
  &.bottom {
    margin-top: -2rpx;
  }
  &.top {
    margin-bottom: -2rpx;
  }
}
</style>
