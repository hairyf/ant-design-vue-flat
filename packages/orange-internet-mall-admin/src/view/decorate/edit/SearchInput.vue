<!--
 * @Author: Zhilong
 * @Date: 2021-03-29 11:58:17
 * @LastEditTime: 2021-04-28 16:37:35
 * @Description: 操作区的搜索框
 * @LastEditors: Zhilong
 * @autograph: 那天~新的页面诞生了
-->
<template>
  <edit-header title="搜索框" icon="ad-search-input" />
  <!-- 组件风格 -->
  <edit-card-form title="组件风格">
    <el-form-item label="组件样式">
      <el-radio-group v-model="option.componentStyle.componentModal">
        <el-radio :label="v" v-for="v in ['默认', '投影', '描边']" :key="v" />
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="搜索设置">
    <!-- <el-form-item label="定位显示">
      <el-radio-group v-model="option.searchSetting.positionShow">
        <el-radio :label="v" v-for="v in ['不显示', '左侧', '右侧']" :key="v" />
      </el-radio-group>
    </el-form-item> -->
    <el-form-item label="显示地区" v-if="option.searchSetting.positionShow !== '不显示'">
      <el-radio-group v-model="option.searchSetting.showAddress">
        <el-radio :label="v" v-for="v in ['省', '市', '区']" :key="v" />
      </el-radio-group>
    </el-form-item>
    <!-- <el-form-item label="定位颜色" v-if="option.searchSetting.positionShow !== '不显示'">
      <color-input v-model="option.searchSetting.addressColor" reset />
    </el-form-item> -->
    <el-form-item label="提示内容">
      <el-input v-model="option.searchSetting.tipsContent" maxlength="20" show-word-limit />
    </el-form-item>
    <el-form-item label="内容位置">
      <el-radio-group v-model="option.searchSetting.contentPosition" size="small">
        <el-radio-button label="flex-start"><i class="ri-align-left"></i></el-radio-button>
        <el-radio-button label="center"><i class="ri-align-center"></i></el-radio-button>
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
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
      />
      <color-input keyword="icon" label="图标颜色" />
      <color-input keyword="text" label="文字颜色" />
      <color-input keyword="border" label="框背景颜色" />
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
  import { searchInputOption } from '@/view/decorate/config/options'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'

  defineProps({
    option: {
      type: Object as () => typeof searchInputOption,
      required: true
    }
  })
</script>
<style lang="scss" scoped>
  .component-style-view {
    display: flex;
    align-items: center;
    & > p {
      margin: 0 18px 0 3px;
    }
  }
</style>
