<!--
 * @Author: Zhilong
 * @Date: 2021-04-21 09:55:13
 * @LastEditTime: 2021-04-21 11:53:30
 * @Description: 商品评价 操作区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header title="商品信息" icon="ad-product-ranking" />
  <edit-card-form title="显示设置">
    <el-form-item label="评价数量">
      <el-radio-group v-model="option.showSetting.evaluateNum">
        <el-radio v-for="v in [1, 2, 3, 4]" :key="v" :label="v" />
      </el-radio-group>
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
      <color-input keyword="title" label="标题颜色" />
      <color-input keyword="btn" label="更多颜色" />
      <color-input keyword="icon" label="图标颜色" />
      <color-input keyword="subTitle" label="用户名称" />
      <color-input keyword="subIcon" label="星级颜色" />
      <color-input keyword="text" label="内容颜色" />
      <color-input class="long-slider-input" keyword="line" label="分割线颜色" />
    </color-group>
  </edit-card-form>
  <edit-card-form title="边距设置">
    <slider-group v-model="option.padding">
      <slider-input keyword="top" label="上边距" :max="50" tips="px" />
      <slider-input keyword="bottom" label="下边距" :max="20" tips="px" />
    </slider-group>
  </edit-card-form>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { commodityEvaluateOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  defineProps({
    option: {
      type: Object as () => typeof commodityEvaluateOption,
      required: true
    }
  })
</script>
<style lang="scss" scoped>
  .long-slider-input {
    :deep(.el-form-item__label) {
      width: 90px !important;
    }
  }
</style>
