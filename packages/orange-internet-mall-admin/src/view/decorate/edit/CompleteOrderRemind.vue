<!--
 * @Author: Zhilong
 * @Date: 2021-04-17 16:20:36
 * @LastEditTime: 2021-04-29 10:20:25
 * @Description: 下单提醒 操作区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header title="下单提醒" icon="ad-complete-order-remind" />
  <edit-card-form title="组件定位">
    <el-form-item label="位置">
      <el-radio-group v-model="option.componentStyle.placement">
        <el-radio v-for="v in ['左上角', '右上角', '左下角', '右下角']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="内容编辑">
    <el-form-item label="显示内容" class="show-content-view">
      <div>
        <styled-input v-model="option.contentEdit.showContent.avatar" tips="用户头像" />
      </div>
      <div>
        <styled-input v-model="option.contentEdit.showContent.time" tips="下单时间" />
      </div>
    </el-form-item>
    <el-form-item label="数据类型" v-if="false">
      <div>
        <el-radio-group v-model="option.contentEdit.dataType">
          <el-radio v-for="v in ['真实数据', '虚拟数据']" :key="v" :label="v" />
        </el-radio-group>
      </div>
      <div style="position: absolute; top: 25px" class="remarks-text"> 显示3天之内的真实数据 </div>
    </el-form-item>
    <div style="height: 12px" />
    <el-form-item label="数据量">
      <slider-input v-model="option.contentEdit.dataAmount" :max="20" :min="1" tips="条" />
    </el-form-item>
    <!-- 滚动速度 -->
    <el-form-item label="滚动速度">
      <slider-input v-model="option.contentEdit.speed" tips="秒/次" :min="1" :max="50" />
    </el-form-item>
  </edit-card-form>
  <el-card shadow="never" class="edit-card-container">
    <div class="edit-card-text oe-m-b-28">
      <span style="font-size: 12px" class="oe-p-l-10">
        此处设置下单提醒组件样式，显示内容请前往下单提醒页面进行设置
        <span style="color: var(--color-primary); cursor: pointer" class="oe-m-l-10"> 去设置 </span>
      </span>
    </div>
    <div class="container-title">
      <span style="font-size: 16px">组件背景</span>
    </div>
    <el-form class="container-body" label-width="80px" label-position="right">
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
        <el-form-item label="背景透明度" class="long-slider-input">
          <slider-input v-model="option.colorStyle.opacity" :max="100" tips="%" />
        </el-form-item>
        <color-input keyword="text" label="文字颜色" />
        <color-input keyword="subText" label="时间颜色" />
      </color-group>
    </el-form>
  </el-card>
  <edit-card-form title="边距设置">
    <slider-group v-model="option.padding">
      <slider-input
        v-if="/上/g.test(option.componentStyle.placement)"
        keyword="top"
        label="上边距"
        tips="px"
      />
      <slider-input
        v-if="/下/g.test(option.componentStyle.placement)"
        keyword="bottom"
        label="下边距"
        tips="px"
      />
      <slider-input
        v-if="/左/g.test(option.componentStyle.placement)"
        keyword="left"
        label="左边距"
        tips="px"
      />
      <slider-input
        v-if="/右/g.test(option.componentStyle.placement)"
        keyword="right"
        label="右边距"
        tips="px"
      />
    </slider-group>
  </edit-card-form>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { completeOrderRemindOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import StyledGroup from '@/view/decorate/components/items/StyledGroup.vue'
  import StyledInput from '@/view/decorate/components/items/StyledInput.vue'
  const props = defineProps({
    option: {
      type: Object as () => typeof completeOrderRemindOption,
      required: true
    }
  })
  //导出配置为常量 供视图使用
</script>
<style lang="scss" scoped>
  .show-content-view {
    :deep(.el-form-item__content) {
      display: flex;
      .checkbox-form-item {
        margin-top: 0 !important;
      }
    }
  }
  :deep(.el-form-item) {
    display: flex;
    align-items: center;
    .el-form-item__label {
      line-height: auto !important;
    }
    .el-form-item__content {
      flex: 1;
      margin-left: 0 !important;
    }
  }
  .edit-card-container {
    border-top: 10px solid #f2f4f7;
  }
  .edit-card-text {
    line-height: 24px;
    color: #262626;
    background: var(--color-primary-light-8);
    border: 1px solid var(--color-primary);
    box-sizing: border-box;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 5px;
  }
  .container-title {
    margin-bottom: 10px;
    font-weight: bold;
  }

  .long-slider-input {
    :deep(.el-form-item__label) {
      width: 90px !important;
    }
  }
</style>
