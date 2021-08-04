<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-26 10:49:33
 * @LastEditTime: 2021-05-17 20:12:09
 * @Description: 图片
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="image-view-container"
    :style="{
      background,
      padding,
    }"
  >
    <div class="single-image-list" v-if="option.styleType === 'single'">
      <div
        v-for="(item, index) in option.images"
        :key="index"
        :style="{ width: '100%', position: 'relative' }"
      >
        <link-controller :data="item.link" :disable="option.type !== '标准'">
          <image
            :src="item.image || $spliceStaticUrl('product-transverse.png')"
            mode="widthFix"
            :style="{
              borderRadius,
              marginBottom: `${option.padding.image * 2}rpx`,
              width: '100%',
            }"
          />
        </link-controller>
        <div v-if="option.type !== '标准'" class="sad1asdasdasdsa">
          <link-controller
            v-for="(i, k) in item.hots"
            :key="k"
            :data="i.link"
            :style="{
              width: i.width * proportion + 'rpx',
              height: i.height * proportion + 'rpx',
              // 1.5偏差
              top: (i.top + 1.5) * proportion + 'rpx',
              left: (i.left + 1.5) * proportion + 'rpx',
              position: 'absolute',
            }"
          />
        </div>
      </div>
    </div>
    <!-- 双列 -->
    <div
      v-else
      class="double-image-list"
      :style="{ margin: `${-option.padding.image}rpx` }"
    >
      <link-controller
        class="double-image-item"
        v-for="(item, index) in option.images"
        :data="item.link"
        :key="index"
      >
        <div
          class="inner"
          :style="{
            borderRadius,
            margin: `${option.padding.image}rpx`,
          }"
        >
          <image
            class="row-image"
            :src="item.image || $spliceStaticUrl('product-transverse.png')"
            mode="widthFix"
          />
        </div>
      </link-controller>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { imageOption } from 'orange-components-config/options';
import { useBackgroundColor, usePaddingRadius } from '@/hooks/use-view-style';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof imageOption,
      required: true,
    },
  },
  setup(props) {
    const { padding, borderRadius } = usePaddingRadius(props.option);
    const { background } = useBackgroundColor(props.option);
    // 缩小的比例
    const proportion = computed(
      () => (750 - props.option.padding.leftRight * 4) / 750
    );
    return {
      padding,
      borderRadius,
      background,
      proportion,
    };
  },
});
</script>
<style lang="scss" scoped>
.single-image-list {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
}
.image-view-container {
  overflow: hidden;
  display: flex;
  justify-content: center;
}
.row-image {
  width: 100%;
}
image {
  vertical-align: middle;
}
.double-image-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.double-image-item {
  width: 50%;
}
.u-image {
  vertical-align: middle;
}
.inner {
  overflow: hidden;
}
</style>
