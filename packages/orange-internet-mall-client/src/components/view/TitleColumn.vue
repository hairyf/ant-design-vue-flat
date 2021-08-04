<!--
 * @Author: Zhilong
 * @Date: 2021-04-09 14:32:31
 * @LastEditTime: 2021-04-14 16:51:31
 * @Description: 标题栏视图区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="title-column-container" :style="{ background, padding }">
    <div>
      <effect-text-frame
        :type="option.componentStyle.styleType"
        :color="option.titleText.color.line"
        :align="option.componentStyle.styleType === 3 ? 'left' : 'center'"
      >
        <div
          class="title-text"
          :style="{ color: option.titleText.color.title }"
        >
          {{ titleText.title }}
        </div>
      </effect-text-frame>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { titleColumnOption } from 'orange-components-config/options';
import EffectTextFrame from './EffectTextFrame.vue';
import { useBackgroundColor, usePaddingRadius } from '@/hooks/use-view-style';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof titleColumnOption,
      required: true,
    },
  },
  setup(props) {
    // 导出配置为常量 供视图使用
    const { componentStyle, titleText } = props.option;
    // 基本配置
    const { padding, borderRadius } = usePaddingRadius(props.option);
    const { background } = useBackgroundColor(props.option.colorStyle);
    return {
      componentStyle,
      titleText,
      padding,
      borderRadius,
      background,
    };
  },
  components: {
    EffectTextFrame,
  },
});
</script>
<style lang="scss">
.title-column-container {
  > div {
    display: flex;
    justify-content: center;
    overflow: hidden;
    .title-text {
      color: #333;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 560rpx;
      padding: toRpx(4) toRpx(10);
      margin: auto;
    }
  }
}
</style>
