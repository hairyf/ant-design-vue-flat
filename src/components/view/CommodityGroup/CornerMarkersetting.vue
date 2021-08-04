<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-14 20:55:01
 * @LastEditTime: 2021-04-16 11:05:53
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="corner-marker-container"
    @click.stop
    v-if="option.cornerMarkersetting.commodityCorner !== '不显示'"
  >
    <view-icon
      class="corner-marker-icon"
      v-if="option.cornerMarkersetting.commodityCorner !== '自定义'"
      :name="option.cornerMarkersetting.cornerStyle.image"
      :style="{ color: option.cornerMarkersetting.cornerStyle.color }"
    >
      <span v-if="option.cornerMarkersetting.cornerText !== '自定义'">
        {{ option.cornerMarkersetting.cornerText }}
      </span>
      <span v-if="option.cornerMarkersetting.cornerText === '自定义'">
        {{ option.cornerMarkersetting.words }}
      </span>
    </view-icon>
    <view-image
      v-else
      :size="40 * 2"
      :src="option.cornerMarkersetting.cornerStylPicture"
    />
    <!-- sss<view-icon name="oe-corner-lower-angle"></view-icon> -->
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
/* 角标 */
.corner-marker-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: toRpx(36);
  height: toRpx(20);
  .corner-marker-icon {
    position: relative;
    font-size: toRpx(21);
    display: block;
    span {
      position: absolute;
      left: toRpx(-2);
      right: 0;
      bottom: 0;
      top: 0;
      margin: 0 auto;
      z-index: 1;
      font-size: toRpx(12);
      line-height: toRpx(24);
      text-align: center;
      color: #fff;
    }
  }
  .oe-corner-lower-angle {
    font-size: toRpx(32);
  }
}
</style>
