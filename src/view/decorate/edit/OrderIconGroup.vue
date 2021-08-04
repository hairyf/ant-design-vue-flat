<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-21 16:29:08
 * @LastEditTime: 2021-05-11 10:22:49
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <edit-header icon="ri-contacts-line" title="订单图标组" />
  <edit-card-form title="组件风格">
    <el-form-item label="图标类型">
      <el-radio-group v-model="option.componentStyle.componentModal">
        <el-radio :label="v" v-for="v in ['图片', '图标']" :key="v" />
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="内容编辑">
    <el-form-item label="标题">
      <el-input v-model="option.contentEdit.title" maxlength="5" show-word-limit />
    </el-form-item>
    <el-form-item v-for="v in option.contentEdit.contents" :key="v.type" :label="v.typeText">
      <edit-card-item :show-close="false">
        <el-form label-width="50px">
          <el-form-item label="图片" v-show="option.componentStyle.componentModal === '图片'">
            <image-item v-model="v.image" />
          </el-form-item>
          <el-form-item label="图标" v-show="option.componentStyle.componentModal === '图标'">
            <icon-item v-model="v.icon" />
          </el-form-item>
          <el-form-item label="文字">
            <el-input v-model="v.text" maxlength="5" show-word-limit />
          </el-form-item>
        </el-form>
      </edit-card-item>
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="组件样式">
    <el-form-item label="组件背景">
      <el-radio-group v-model="option.colorStyle.backgroundType">
        <el-radio v-for="v in ['透明', '颜色', '背景图片']" :key="v" :label="v" />
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
    <color-group v-model="option.colorStyle.color" reset>
      <color-input keyword="cardBackground" label="卡片背景" />
      <color-input keyword="title" label="标题颜色" />
      <color-input keyword="icon" label="图标颜色" />
      <color-input keyword="text" label="文字颜色" />
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
  import { defineProps, watch } from '@vue/runtime-core'
  import { orderIconGroupOption } from '@/view/decorate/config'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import EditCardItem from '@/view/decorate/components/EditCardItem.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import StyledGroup from '@/view/decorate/components/items/StyledGroup.vue'
  import StyledInput from '@/view/decorate/components/items/StyledInput.vue'
  import GoodList from '@/view/decorate/components/common/GoodList.vue'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import IconItem from '@/view/decorate/components/common/IconItem.vue'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'
  const props = defineProps({
    option: {
      type: Object as () => typeof orderIconGroupOption,
      required: true
    }
  })
</script>
<style lang="scss"></style>
