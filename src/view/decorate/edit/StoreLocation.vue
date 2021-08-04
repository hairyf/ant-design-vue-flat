<!--
 * @Author: Zhilong
 * @Date: 2021-04-17 14:29:39
 * @LastEditTime: 2021-04-17 17:43:05
 * @Description: 门店定位操作区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header title="门店定位" icon="ad-commodity-exhibition" />
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
    <color-group v-model="option.colorStyle.color" reset>
      <color-input
        v-show="option.colorStyle.backgroundType === '颜色'"
        keyword="background"
        label="背景颜色"
        reset
      />
      <color-input keyword="title" label="名称颜色" />
      <color-input keyword="text" label="距离颜色" />
      <color-input keyword="btn" label="按钮颜色" />
      <color-input keyword="icon" label="图标颜色" />
      <color-input keyword="subIcon" label="下拉颜色" />
    </color-group>
  </edit-card-form>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { storeLocationOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  defineProps({
    option: {
      type: Object as () => typeof storeLocationOption,
      required: true
    }
  })
</script>
<style lang="scss" scoped></style>
