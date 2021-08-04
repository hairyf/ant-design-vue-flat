<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-14 21:05:29
 * @LastEditTime: 2021-04-16 10:01:42
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div>
    <div
      class="shop-title"
      :style="{
        color: option.displayStyle.commodityTitle.color,
        maxWidth: `${Number(titleEllipsis) * 2}rpx`,
      }"
      v-if="option.displayStyle.commodityTitle.state"
    >
      {{ showItem.title || '这是主标题' }}
    </div>
    <div
      class="shop-subtitle-title"
      :style="{
        color: option.displayStyle.subtitle.color,
        maxWidth: `${Number(subtitleEllipsis) * 2}rpx`,
      }"
      :class="['ellipsis-' + subtitleEllipsis]"
      v-if="
        option.displayStyle.subtitle.state &&
        showSubtitle &&
        showItem.vice_title
      "
    >
      {{ showItem.vice_title }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import { commodityGroupOption } from 'orange-components-config/options';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof commodityGroupOption,
      required: true,
    },
    titleEllipsis: {
      type: [String, Number],
      default: '200',
    },
    subtitleEllipsis: {
      type: [String, Number],
      default: '150',
    },
    item: {
      type: [Object as () => Record<string, any>, Number],
      required: true,
    },
  },
  setup(props) {
    const showSubtitle = computed(() => {
      return (
        props.option.componentStyle.styleType === 'center' ||
        props.option.componentStyle.styleType === 'upDown'
      );
    });
    const showItem = computed(() =>
      typeof props.item !== 'object'
        ? { vice_title: '', title: '' }
        : props.item
    );
    return {
      showSubtitle,
      showItem,
    };
  },
});
</script>
<style lang="scss">
/* 商品标题 */
.shop-title {
  font-size: toRpx(14);
  color: #000000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 商品副标题 */
.shop-subtitle-title {
  margin-top: toRpx(5);
  font-size: toRpx(12);
  color: #acacac;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
