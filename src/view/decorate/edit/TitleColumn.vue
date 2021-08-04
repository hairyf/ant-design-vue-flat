<!--
 * @Author: Zhilong
 * @Date: 2021-04-09 14:32:27
 * @LastEditTime: 2021-04-23 12:08:16
 * @Description: 标题栏 操作区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header title="标题栏" icon="ad-title-column" />
  <edit-card-form title="组件风格">
    <el-form-item label="风格样式" />
    <div class="type-select-view">
      <div
        v-for="i of 8"
        :key="i"
        :style="{
          border: option.componentStyle.styleType === i ? `1px solid var(--color-primary)` : '',
          color: option.componentStyle.styleType === i ? 'var(--color-primary)' : ''
        }"
        @click="option.componentStyle.styleType = i"
      >
        <effect-text-frame
          :type="i"
          :color="option.componentStyle.styleType === i ? 'var(--color-primary)' : '#333'"
        >
          <div style="padding: 4px 10px">标题</div>
        </effect-text-frame>
      </div>
    </div>
  </edit-card-form>
  <edit-card-form title="标题文字">
    <el-form-item label="标题">
      <el-input v-model="option.titleText.title" maxlength="8" show-word-limit />
    </el-form-item>
    <color-group v-model="option.titleText.color" reset>
      <color-input label="文字颜色" keyword="title" />
      <color-input label="线条颜色" keyword="line" />
    </color-group>
  </edit-card-form>
  <edit-card-form title="组件样式">
    <el-form-item label="组件背景">
      <el-radio-group v-model="option.colorStyle.backgroundType">
        <el-radio :label="v" v-for="v in ['透明', '颜色', '背景图片']" :key="v" />
      </el-radio-group>
    </el-form-item>
    <!-- 背景颜色 -->
    <el-form-item v-show="option.colorStyle.backgroundType === '颜色'" label="背景颜色">
      <color-input v-model="option.colorStyle.color.background" reset />
    </el-form-item>
    <!-- 背景图片 -->
    <el-form-item label="选择图片" v-show="option.colorStyle.backgroundType === '背景图片'">
      <image-item v-model="option.colorStyle.image" />
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="边距设置">
    <slider-group v-model="option.padding">
      <slider-input keyword="top" label="上边距" :max="50" tips="px" />
      <slider-input keyword="bottom" label="下边距" :max="20" tips="px" />
      <slider-input keyword="leftRight" label="左右边距" :max="20" tips="px" />
    </slider-group>
  </edit-card-form>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { titleColumnOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import EffectTextFrame from '@/view/decorate/components/common/EffectTextFrame.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'

  const props = defineProps({
    option: {
      type: Object as () => typeof titleColumnOption,
      required: true
    }
  })
</script>
<style lang="scss" scoped>
  .type-select-view {
    display: flex;
    flex-wrap: wrap;
    margin: 0 10px;

    > div {
      cursor: pointer;
      width: 134px;
      height: 72px;
      margin-bottom: 14px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border: 1px solid #d9d9d9;
      border-radius: 2px 0px 0px 2px;
      &:not(:nth-child(3n)) {
        // margin-right: 25px;
        margin-right: calc((100% - (134px * 3)) / 2);
      }
    }
  }
</style>
