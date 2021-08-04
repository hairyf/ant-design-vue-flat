<!--
 * @Author: Zhilong
 * @Date: 2021-04-15 10:58:44
 * @LastEditTime: 2021-04-28 09:36:31
 * @Description: 图标
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <text :class="[iconfont, name]" @click="$emit('click')" :style="[textStyle]">
    <slot />
  </text>
</template>
<script lang="ts">
import { analyUnit } from '@/utils';
import { computed, defineComponent } from '@vue/composition-api';
export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    size: [String, Number],
    color: String,
  },
  setup(props) {
    const iconfont = computed(() => {
      return props.name.split('-')[0] + '-iconfont';
    });
    const textStyle = computed(() => {
      const current: Record<string, any> = {};
      if (typeof props.size !== 'undefined') {
        current.fontSize = analyUnit(props.size);
      }
      if (typeof props.color !== 'undefined') {
        current.color = props.color;
      }
      return current;
    });
    return { iconfont, textStyle };
  },
});
</script>
<style lang="scss"></style>
