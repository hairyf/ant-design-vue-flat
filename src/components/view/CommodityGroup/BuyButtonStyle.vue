<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-14 21:12:31
 * @LastEditTime: 2021-04-16 14:40:37
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="tag-container"
    :style="{
      transform:
        (option.buyButtonStyle.size === '大' && 'scale(1.2)') ||
        (option.buyButtonStyle.size === '小' && 'scale(0.8)') ||
        'scale(1)',
    }"
    @click.stop="$emit('click')"
  >
    <view-icon
      class="icon-tag"
      v-if="
        option.buyButtonStyle.btnStyle.image != 'withBackground' &&
        option.buyButtonStyle.btnStyle.image != 'hollowedText'
      "
      :name="option.buyButtonStyle.btnStyle.image"
      :style="{
        color: option.buyButtonStyle.btnStyle.color,
      }"
    />
    <div
      class="text-tag"
      v-if="option.buyButtonStyle.btnStyle.image == 'withBackground'"
      :style="{
        backgroundColor: option.buyButtonStyle.wordsColor,
      }"
    >
      {{ option.buyButtonStyle.btnWords }}
    </div>
    <div
      class="text-tag"
      v-if="option.buyButtonStyle.btnStyle.image == 'hollowedText'"
      :style="{
        borderColor: option.buyButtonStyle.wordsColor,
        color: option.buyButtonStyle.wordsColor,
      }"
    >
      {{ option.buyButtonStyle.btnWords }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { commodityGroupOption } from 'orange-components-config/options';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof commodityGroupOption,
      required: true,
    },
  },
});
</script>
<style lang="scss">
/* 图标标签 */
.icon-tag {
  font-size: toRpx(28);
}
/* 文字标签 */
.text-tag {
  height: toRpx(22);
  // line-height: toRpx(22);
  display: flex;
  align-items: center;
  border-radius: toRpx(5);
  font-size: toRpx(12);
  padding: 0 toRpx(5);
  text-align: center;
  background-color: #ffffff;
  color: #ffffff;
  border: solid toRpx(1);
  border-color: transparent;
}
</style>
