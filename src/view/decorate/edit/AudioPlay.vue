<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:53:44
 * @LastEditTime: 2021-05-06 10:40:03
 * @Description: 音频播放操作区
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header icon="ad-audio-play" title="音频播放" />
  <edit-card-form title="组件风格">
    <el-form-item label="风格类型" />
    <div class="type-select-view">
      <!-- 样式one -->
      <div
        :style="{
          border:
            option.componentStyle.styleType === 'styleOne'
              ? `1px solid var(--color-primary)`
              : '1px solid #C4C4C4'
        }"
        @click="option.componentStyle.styleType = 'styleOne'"
      >
        <div class="audio-style-one-view">
          <div>
            <span style="font-size: 14px; margin-right: 10px; color: #000">主标题</span>
            <span style="font-size: 12px; color: #8c8c8c">副标题</span>
          </div>
          <!-- <i class="oe-suspend" /> -->
          <i class="oe-play" style="color: #212121" />
        </div>
      </div>
      <!-- 样式two-->
      <div
        :style="{
          border:
            option.componentStyle.styleType === 'styleTwo'
              ? `1px solid var(--color-primary)`
              : '1px solid #C4C4C4'
        }"
        @click="option.componentStyle.styleType = 'styleTwo'"
      >
        <div class="audio-style-two-view">
          <div class="oe-flex">
            <div class="view-play-image">
              <view-image :size="20" src="/custom-assets/images/decorate/play.png" alt="" />
            </div>
            <div style="line-height: 23px; margin-left: 14px">
              <div style="font-size: 14px; margin-right: 10px; color: #000">主标题</div>
              <div style="font-size: 12px; color: #8c8c8c">副标题</div>
            </div>
          </div>
          <div style="font-size: 12px; color: #8c8c8c; margin-right: 21px">11:30</div>
        </div>
      </div>
      <!-- 样式three -->
      <div
        :style="{
          border:
            option.componentStyle.styleType === 'styleThree'
              ? `1px solid var(--color-primary)`
              : '1px solid #C4C4C4'
        }"
        @click="option.componentStyle.styleType = 'styleThree'"
      >
        <div class="audio-style-one-view">
          <div>
            <span style="font-size: 14px; margin-right: 10px; color: #000">主标题</span>
            <span style="font-size: 12px; color: #8c8c8c">副标题</span>
          </div>
          <div style="font-size: 12px; color: #8c8c8c; margin-right: 21px">11:30</div>
          <!-- 加载条线 -->
          <div :style="{ width: '30%' }" class="audio-progress-bar" />
        </div>
      </div>
      <!-- 样式four-->
      <div
        :style="{
          border:
            option.componentStyle.styleType === 'styleFour'
              ? `1px solid var(--color-primary)`
              : '1px solid #C4C4C4'
        }"
        @click="option.componentStyle.styleType = 'styleFour'"
      >
        <div class="audio-style-two-view">
          <div class="oe-flex">
            <div class="view-play-image" />
            <div style="line-height: 23px; margin-left: 14px">
              <div style="font-size: 14px; margin-right: 10px; color: #000">主标题</div>
              <div style="font-size: 12px; color: #8c8c8c">副标题</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </edit-card-form>
  <edit-card-form title="内容编辑">
    <el-form-item label="音频选择">
      <audio-item v-model="option.contentEdit.audio" />
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="option.contentEdit.text" maxlength="10" show-word-limit />
    </el-form-item>
    <el-form-item label="作者">
      <el-input v-model="option.contentEdit.subText" maxlength="10" show-word-limit />
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="组件样式">
    <el-form-item label="组件背景">
      <el-radio-group v-model="option.colorStyle.backgroundType">
        <el-radio v-for="v in ['透明', '颜色', '背景图片']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
    <!-- > 背景图片 -->
    <el-form-item label="背景图片" v-if="option.colorStyle.backgroundType === '背景图片'">
      <image-item v-model="option.colorStyle.image" />
    </el-form-item>
    <!-- > 颜色 -->
    <color-group v-model="option.colorStyle.color" reset>
      <color-input
        keyword="background"
        label="背景颜色"
        v-if="option.colorStyle.backgroundType === '颜色'"
      />
      <color-input keyword="subBackground" label="组件背景" />
      <color-input keyword="border" label="边框背景" />
      <color-input keyword="title" label="标题颜色" />
      <color-input keyword="subTitle" label="作者颜色" />
      <color-input
        keyword="btn"
        label="按钮颜色"
        v-if="option.componentStyle.styleType === 'styleOne'"
      />
    </color-group>
  </edit-card-form>
  <edit-card-form title="边距设置">
    <slider-group v-model="option.padding">
      <slider-input keyword="top" label="上边距" :max="50" tips="px" />
      <slider-input keyword="bottom" label="下边距" :max="20" tips="px" />
      <slider-input keyword="leftRight" label="左右边距" :max="20" tips="px" />
      <slider-input keyword="topRadius" label="上圆角" :max="20" tips="px" />
      <slider-input keyword="bottomRadius" label="下圆角" :max="20" tips="px" />
    </slider-group>
  </edit-card-form>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { audioPlayOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import AudioItem from '@/view/decorate/components/common/AudioItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'
  const props = defineProps({
    option: {
      type: Object as () => typeof audioPlayOption,
      required: true
    }
  })
</script>
<style lang="scss" scoped>
  .type-select-view {
    display: flex;
    margin: 0 10px;
    flex-direction: column;
    > div {
      width: 452px;
      height: 87px;
      display: flex;
      cursor: pointer;
      padding: 16px 28px;
      border-radius: 2px;
      margin-bottom: 24px;
      align-items: center;
      box-sizing: border-box;
      .audio-style-one-view {
        flex: 1;
        display: flex;
        padding: 15px;
        position: relative;
        align-items: center;
        background: #ffffff;
        box-sizing: border-box;
        border: 1px solid #d9d9d9;
        justify-content: space-between;
        .audio-progress-bar {
          left: 0;
          height: 1px;
          bottom: -1px;
          transition: 1s;
          position: absolute;
          background-color: #000000;
        }
      }
      .audio-style-two-view {
        display: flex;
        flex: 1;
        align-items: center;
        background: #ffffff;
        box-sizing: border-box;
        border: 1px solid #d9d9d9;
        justify-content: space-between;
        .view-play-image {
          width: 62px;
          height: 62px;
          display: flex;
          align-items: center;
          background: #c4c4c4;
          justify-content: center;
        }
      }
    }
  }
</style>
