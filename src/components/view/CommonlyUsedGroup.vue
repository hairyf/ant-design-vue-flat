<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-25 21:39:06
 * @LastEditTime: 2021-05-12 15:14:33
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div :style="{ padding, overflow: 'hidden', background }">
    <div
      class="order-icon-group"
      :style="{
        borderRadius,
        backgroundColor: option.colorStyle.color.cardBackground,
      }"
    >
      <div class="hedaer u-flex">
        <div
          class="title u-flex-1"
          :style="{ color: option.colorStyle.color.title }"
        >
          {{ option.contentEdit.title }}
        </div>
      </div>
      <div class="main u-flex" v-for="(cv, ci) in contentsGroup" :key="ci">
        <link-controller
          :data="v.link"
          v-for="(v, i) in cv"
          :key="i"
          class="u-flex-1"
        >
          <div class="item u-flex">
            <div class="icon">
              <view-image
                :size="24 * 2"
                :src="
                  option.componentStyle.componentModal === '图片'
                    ? v.image
                    : v.icon
                "
                :label-color="option.colorStyle.color.icon"
              />
            </div>
            <span class="text" :style="{ color: option.colorStyle.color.text }">
              {{ v.text }}
            </span>
          </div>
        </link-controller>
        <div
          class="item u-flex u-flex-1"
          v-for="v in iconCount - cv.length"
          :key="v + 1000"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { commonlyUsedGroupOption } from 'orange-components-config/options';
import { useBackgroundColor, usePaddingRadius } from '@/hooks/use-view-style';
import { chunk } from 'lodash';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof commonlyUsedGroupOption,
      required: true,
    },
  },
  setup: (props) => {
    const { padding, borderRadius } = usePaddingRadius(props.option);
    const { background } = useBackgroundColor(props.option.colorStyle);
    const iconCount = computed(
      () => +props.option.componentStyle.iconCount.replace(/[^\d]/g, '')
    );
    const contentsGroup = computed(() => {
      const contentEditContents = props.option.contentEdit.contents;
      return chunk(contentEditContents, iconCount.value);
    });
    return { padding, borderRadius, background, iconCount, contentsGroup };
  },
});
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.hedaer {
  padding: toRpx(17);
  .title {
    font-weight: bold;
    font-size: toRpx(14);
  }
  .tips {
    font-size: toRpx(12);
    color: #999ca7;
  }
}
.main {
  padding-bottom: toRpx(17);
}
.item {
  flex-direction: column;
  .text {
    margin-top: toRpx(5);
    font-size: toRpx(12);
  }
  .icon {
    display: inline-block;
    width: toRpx(24);
    height: toRpx(24);
  }
}
</style>
