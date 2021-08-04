<!--
 * @Author: Zhilong
 * @Date: 2021-04-02 13:39:58
 * @LastEditTime: 2021-04-20 20:54:01
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div
    :style="{
      width: handleSize.width,
      height: handleSize.height,
    }"
    @click="$emit('click')"
  >
    <!--      v-bind="props"     -->
    <u-image
      :fit="fit"
      width="100%"
      height="100%"
      :src="imageSrc"
      :class="{ border: imageBorder }"
      :style="{
        width: handleSize.width,
        height: handleSize.height,
        borderRadius,
        overflow: 'hidden',
      }"
    />
    <div style="position: relative">
      <div class="bottom-text">
        <slot name="bottomText" />
      </div>
      <div class="top-text">
        <slot name="topText" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import AppVue from '@/App.vue';
import { analyUnit } from '@/utils';
import { computed, defineComponent } from '@vue/composition-api';
export default defineComponent({
  props: {
    src: String,
    borderRadius: String,
    size: {
      type: [
        Number,
        String,
        Object as () => { width: number | string; height: number | string },
      ],
    },
    // 如果为true 链接为空时 会显示虚线边框
    border: {
      type: Boolean,
      default: false,
    },
    // 链接为空时的内容 0表示不显示 1显示图片A...
    emptyType: {
      type: Number,
      default: 0,
    },
    fit: {
      type: String,
      default: 'cover',
    },
  },
  setup(props) {
    const { $spliceStaticUrl } = AppVue.prototype;
    // 空内容默认图片配置
    const imageSrc = computed(() => {
      let emptyContent: string;
      switch (props.emptyType) {
        case 0:
          emptyContent = '';
          break;
        case 1:
          emptyContent = $spliceStaticUrl('product-fifth.png');
          break;
        case 2:
          emptyContent = $spliceStaticUrl('product-sliver.png');
          break;
        default:
          emptyContent = '';
      }
      return props.src ? props.src : emptyContent;
    });
    // 空内容 显示边框配置
    const imageBorder = computed(() => props.border && !imageSrc.value);

    // 宽高
    const handleSize = computed((): { width: string; height: string } => {
      if (typeof props.size === 'string' || typeof props.size === 'number') {
        // 正方形的单条数据
        return { width: analyUnit(props.size), height: analyUnit(props.size) };
      } else if (typeof props.size === 'object') {
        // 对象类型的数据
        return {
          width: analyUnit(props.size.width),
          height: analyUnit(props.size.height),
        };
      }
      // 默认数据
      return { width: '', height: '' };
    });

    return {
      imageSrc,
      imageBorder,
      props,
      handleSize,
    };
  },
});
</script>
<style lang="scss" scoped>
u-image {
  display: block;
  height: 100%;
  width: 100%;
}
.border {
  border: 2rpx dashed rgb(217, 217, 217) !important;
}
.bottom-text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
}

.top-text {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    -180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
}
</style>
