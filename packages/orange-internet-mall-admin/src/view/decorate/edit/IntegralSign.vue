<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:53:44
 * @LastEditTime: 2021-04-26 11:16:43
 * @Description: 积分签到操作区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header icon="ad-integral-sign" title="积分签到" />
  <edit-card-form title="组件风格">
    <el-form-item label="商品样式">
      <el-radio-group v-model="option.componentStyle.componentModal">
        <el-radio v-for="v in ['默认', '投影', '描边']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="内容编辑">
    <el-form-item label="标题文字">
      <el-input
        maxlength="10"
        show-word-limit
        v-model="option.contentEdit.title"
        placeholder="请输入标题文字"
      />
    </el-form-item>
    <el-form-item label="背景图">
      <image-item v-model="option.contentEdit.image" size="84" />
    </el-form-item>
    <el-form-item label="组件边框">
      <el-radio-group v-model="option.contentEdit.effectiveTimeStatus">
        <el-radio v-for="v in ['显示', '不显示']" :key="v" :label="v === '显示'">
          {{ v }}
        </el-radio>
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
      <color-input keyword="subBackground" label="标题背景" />
      <el-form-item label="内部背景">
        <color-input v-model="option.colorStyle.color.insideBackground" />
      </el-form-item>
      <color-input keyword="title" label="标题颜色" />
      <color-input keyword="subTitle" label="副标题" />
      <el-form-item label="小标题">
        <color-input v-model="option.colorStyle.color.smallTitle" />
      </el-form-item>
      <el-form-item label="小副标题">
        <color-input v-model="option.colorStyle.color.smallSubTitle" />
      </el-form-item>
      <el-form-item label="积分颜色">
        <color-input v-model="option.colorStyle.color.integral" />
      </el-form-item>
      <el-form-item label="积分背景">
        <color-input v-model="option.colorStyle.color.integralBackground" />
      </el-form-item>
      <color-input keyword="btn" label="按钮颜色" />
      <el-form-item label="按钮背景">
        <color-input v-model="option.colorStyle.color.btnBackground" />
      </el-form-item>
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
  import { integralSignOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  defineProps({
    option: {
      type: Object as () => typeof integralSignOption,
      required: true
    }
  })
</script>
<style lang="scss" scoped></style>
