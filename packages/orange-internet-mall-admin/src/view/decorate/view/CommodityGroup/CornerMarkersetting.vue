<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-14 20:55:01
 * @LastEditTime: 2021-04-14 21:06:28
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="corner-marker-container"
    @click.stop
    v-if="option.cornerMarkersetting.commodityCorner != '不显示'"
  >
    <i
      class="corner-marker-icon"
      v-if="option.cornerMarkersetting.commodityCorner != '自定义'"
      :class="[option.cornerMarkersetting.cornerStyle.image]"
      :style="{
        color: option.cornerMarkersetting.cornerStyle.color
      }"
    >
      <span v-if="option.cornerMarkersetting.cornerText != '自定义'">
        {{ option.cornerMarkersetting.cornerText }}
      </span>
      <span v-if="option.cornerMarkersetting.cornerText == '自定义'">
        {{ option.cornerMarkersetting.words }}
      </span>
    </i>
    <view-image v-else size="40" :src="option.cornerMarkersetting.cornerStylPicture" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from '@vue/runtime-core'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'
  import { commodityGroupOption } from '../../config'
  export default defineComponent({
    components: { ViewImage },
    props: {
      option: {
        type: Object as () => typeof commodityGroupOption,
        required: true
      }
    }
  })
</script>
<style lang="scss" scoped>
  /* 角标 */
  .corner-marker-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 36px;
    height: 20px;
    .corner-marker-icon {
      position: relative;
      font-size: 21px;
      span {
        position: absolute;
        left: -2px;
        right: 0;
        bottom: 0;
        top: 0;
        margin: 0 auto;
        z-index: 1;
        font-size: 12px;
        line-height: 24px;
        text-align: center;
        color: #fff;
      }
    }
    .oe-corner-lower-angle {
      font-size: 32px;
    }
  }
</style>
