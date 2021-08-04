<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:53:44
 * @LastEditTime: 2021-05-12 14:26:41
 * @Description: 导购操作区
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header icon="ad-shopping-guide" title="导购" />
  <edit-card-form title="组件风格">
    <el-form-item label="商品样式">
      <el-radio-group v-model="option.componentStyle.componentModal">
        <el-radio v-for="v in ['默认', '投影', '描边']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="内容编辑" label-width="90">
    <color-group v-model="option.contentEdit.color">
      <el-form-item label="图片">
        <image-item v-model="option.contentEdit.image" size="84" />
      </el-form-item>
      <el-form-item label="标题文字">
        <el-input
          maxlength="10"
          show-word-limit
          v-model="option.contentEdit.title"
          placeholder="请输入标题文字"
        />
      </el-form-item>
      <color-input keyword="background" label="背景颜色" />
      <el-form-item label="副标题文字" class="long-slider-input">
        <el-input
          maxlength="40"
          show-word-limit
          v-model="option.contentEdit.subTitle"
          placeholder="请输入副标题文字"
        />
      </el-form-item>
      <color-input keyword="subBackground" label="背景颜色" />
      <el-form-item label="联系方式名称" class="long-slider-input-6">
        <el-input
          maxlength="5"
          show-word-limit
          v-model="option.contentEdit.contactName"
          placeholder="请输入名称"
        />
      </el-form-item>
      <el-form-item label="联系方式内容" class="long-slider-input-6">
        <el-input
          maxlength="20"
          show-word-limit
          v-model="option.contentEdit.contactContent"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="按钮文字">
        <el-input
          maxlength="5"
          show-word-limit
          v-model="option.contentEdit.btnText"
          placeholder="请输入内容"
        />
      </el-form-item>
      <color-input keyword="text" label="文字颜色" />
      <color-input keyword="btn" label="按钮颜色" />
    </color-group>
  </edit-card-form>
  <edit-card-form title="单击效果">
    <el-radio-group v-model="option.effect.value">
      <el-radio
        v-for="v in ['复制联系方式', '拨打联系方式', '放大浏览图片', '保存图片']"
        :key="v"
        :label="v"
      />
    </el-radio-group>
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
  import { shoppingGuideOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  defineProps({
    option: {
      type: Object as () => typeof shoppingGuideOption,
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
  .long-slider-input-6 {
    :deep(.el-form-item__label) {
      width: 100px !important;
    }
  }
  :deep(.el-radio) {
    margin-right: 10px;
  }
</style>
