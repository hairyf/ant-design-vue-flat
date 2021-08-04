<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:19:15
 * @LastEditTime: 2021-04-27 20:41:31
 * @Description: 富文本视图区
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    class="richt-ext-container"
    :style="{
      boxShadow,
      border,
      padding,
      borderRadius,
      background,
    }"
  >
    <u-parse :html="option.contentEdit.value" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { richTextOption } from 'orange-components-config/options';
import {
  useBackgroundColor,
  usePaddingRadius,
  useComponentModalStyle,
} from '@/hooks/use-view-style';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof richTextOption,
      required: true,
    },
  },
  setup(props) {
    //导出配置为常量 供视图使用
    const { componentStyle, colorStyle } = props.option;
    const { background } = useBackgroundColor(colorStyle);
    const { padding, borderRadius } = usePaddingRadius(props.option);
    const { boxShadow, border } = useComponentModalStyle(componentStyle);
    return {
      componentStyle,
      colorStyle,
      background,
      padding,
      borderRadius,
      boxShadow,
      border,
    };
  },
});
</script>
<style lang="scss" scoped>
.richt-ext-container {
  .richt-ext-view {
    overflow: hidden;
  }
}
</style>
