<!--
 * @Author: Zhilong
 * @Date: 2021-03-29 11:58:17
 * @LastEditTime: 2021-04-28 16:57:17
 * @Description: 操作区的固定搜索框
 * @LastEditors: Zhilong
 * @autograph: 那天~新的页面诞生了
-->
<template>
  <edit-header title="固定搜索框" icon="ad-fixedsearch-input" />
  <edit-card-form title="搜索设置">
    <color-group v-model="option.searchSetting.color" reset>
      <!-- <el-form-item label="定位显示">
        <el-radio-group v-model="option.searchSetting.positionShow">
          <el-radio :label="v" v-for="v in ['不显示', '显示']" :key="v" />
        </el-radio-group>
      </el-form-item> -->
      <color-input
        keyword="title"
        label="定位颜色"
        v-if="option.searchSetting.positionShow !== '不显示'"
      />
      <color-input keyword="text" label="文字颜色" />
      <el-form-item label="提示内容">
        <el-input v-model="option.searchSetting.tipsContent" maxlength="20" show-word-limit />
      </el-form-item>
      <el-form-item label="内容位置">
        <el-radio-group v-model="option.searchSetting.contentPosition" size="small">
          <el-radio-button label="flex-start">
            <i class="ri-align-left"></i>
          </el-radio-button>
          <el-radio-button label="center">
            <i class="ri-align-center"></i>
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
    </color-group>
    <!-- 左侧按钮组 -->
    <el-form-item label="左侧按钮">
      <el-radio-group v-model="option.searchSetting.leftButtonType">
        <el-radio :label="v" v-for="v in ['不显示', /* '图标', */ '图片']" :key="v" />
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="图标"
      v-if="option.searchSetting.leftButtonType === '图标'"
      class="icon-item"
    >
      <image-item v-model="option.searchSetting.leftIcon" />
      <span class="oe-m-l-12">建议图片/图标尺寸为40X40px</span>
    </el-form-item>
    <el-form-item
      label="图片"
      v-if="option.searchSetting.leftButtonType === '图片'"
      class="icon-item"
    >
      <image-item v-model="option.searchSetting.leftImage" />
      <span class="oe-m-l-12">建议图片/图标尺寸为40X40px</span>
    </el-form-item>
    <el-form-item label="图标颜色" v-if="option.searchSetting.leftButtonType === '图标'">
      <color-input v-model="option.searchSetting.color.leftIcon" />
    </el-form-item>
    <el-form-item label="链接" v-if="option.searchSetting.leftButtonType !== '不显示'">
      <link-item v-model="option.searchSetting.leftLink" reset />
    </el-form-item>
    <!-- 右侧按钮组 -->
    <el-form-item label="右侧按钮">
      <el-radio-group v-model="option.searchSetting.rightButtonType">
        <el-radio :label="v" v-for="v in ['不显示', /* '图标', */ '图片']" :key="v" />
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="图标"
      v-if="option.searchSetting.rightButtonType === '图标'"
      class="icon-item"
    >
      <image-item v-model="option.searchSetting.rightIcon" />
      <span class="oe-m-l-12">建议图片/图标尺寸为40X40px</span>
    </el-form-item>
    <el-form-item
      label="图片"
      v-if="option.searchSetting.rightButtonType === '图片'"
      class="icon-item"
    >
      <image-item v-model="option.searchSetting.rightImage" />
      <span class="oe-m-l-12">建议图片/图标尺寸为40X40px</span>
    </el-form-item>
    <el-form-item label="图标颜色" v-if="option.searchSetting.rightButtonType === '图标'">
      <color-input v-model="option.searchSetting.color.rightIcon" />
    </el-form-item>
    <el-form-item label="链接" v-if="option.searchSetting.rightButtonType !== '不显示'">
      <link-item v-model="option.searchSetting.rightLink" reset />
    </el-form-item>
  </edit-card-form>
  <!-- 颜色样式 -->
  <edit-card-form title="组件样式">
    <el-form-item label="组件背景">
      <el-radio-group v-model="option.colorStyle.backgroundType">
        <el-radio :label="v" v-for="v in ['透明', '颜色', '背景图片']" :key="v" />
      </el-radio-group>
    </el-form-item>
    <!-- 背景图片 -->
    <el-form-item label="选择图片" v-show="option.colorStyle.backgroundType === '背景图片'">
      <image-item v-model="option.colorStyle.image" />
    </el-form-item>
    <!-- 背景颜色 -->
    <color-group v-model="option.colorStyle.color">
      <color-input
        v-show="option.colorStyle.backgroundType === '颜色'"
        keyword="background"
        label="背景颜色"
        reset
      />
      <color-input keyword="icon" label="图标颜色" reset />
      <color-input keyword="text" label="文字颜色" reset />
      <color-input keyword="border" label="框背景颜色" reset class="long-slider-input" />
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
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import { fixedSearchInputOption } from '@/view/decorate/config/options'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'

  defineProps({
    option: {
      type: Object as () => typeof fixedSearchInputOption,
      required: true
    }
  })
</script>
<style lang="scss" scoped>
  .icon-item {
    align-items: flex-start !important;
    span {
      font-size: 12px;
      color: #8c8c8c;
    }
  }

  .long-slider-input {
    :deep(.el-form-item__label) {
      width: 90px !important;
    }
  }
</style>
