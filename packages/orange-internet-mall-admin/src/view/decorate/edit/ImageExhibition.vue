<!--
 * @Author: Zhilong
 * @Date: 2021-04-09 09:27:01
 * @LastEditTime: 2021-04-23 12:07:34
 * @Description: 图片展播 操作区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header title="图片展播" icon="ad-image-exhibition" />
  <edit-card-form title="轮播图设置">
    <color-group v-model="option.carouselSetting.color">
      <el-form-item label="主标题">
        <el-radio-group v-model="option.carouselSetting.title">
          <el-radio :label="true">开启</el-radio>
          <el-radio :label="false">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <color-input label="颜色" keyword="title" v-if="option.carouselSetting.title" />
      <el-form-item label="副标题">
        <el-radio-group v-model="option.carouselSetting.subTitle">
          <el-radio :label="true">开启</el-radio>
          <el-radio :label="false">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <color-input label="颜色" keyword="subTitle" v-if="option.carouselSetting.subTitle" />
      <el-form-item label="对齐方式">
        <el-radio-group v-model="option.carouselSetting.align" size="small">
          <el-radio-button label="left"><i class="ri-align-left" /></el-radio-button>
          <el-radio-button label="center"><i class="ri-align-center" /></el-radio-button>
          <el-radio-button label="right"><i class="ri-align-right" /></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片内容">
        <span class="remarks-text">建议图片尺寸为宽128X高128px</span>
      </el-form-item>
      <template v-for="(item, i) in option.carouselSetting.imageList" :key="item.CACHE_KEY_LIST">
        <div v-if="i !== 0" style="height: 0.5px; background-color: #d9d9d9; margin: 0.5px 15px" />
        <edit-card-item
          class="card-item"
          :show-close="option.carouselSetting.imageList.length !== 1"
          :style="{
            borderTopStyle: i === 0 && 'solid',
            borderBottomStyle: i + 1 === option.carouselSetting.imageList.length ? 'solid' : ''
          }"
          @close="delItem(i)"
        >
          <div class="oe-flex oe-m-b-16">
            <image-item v-model="item.image" bgColor="#FFF" border="1px dashed #D9D9D9" size="84" />
            <div class="oe-flex-1">
              <el-form-item label="主标题" v-if="option.carouselSetting.title">
                <el-input v-model="item.title" />
              </el-form-item>
              <el-form-item label="副标题" v-if="option.carouselSetting.subTitle">
                <el-input v-model="item.subTitle" />
              </el-form-item>
            </div>
          </div>
          <link-item v-model="item.link" />
        </edit-card-item>
      </template>

      <div class="inc-button" @click="addItem(defaultItem)">
        <span class="oe-m-r-6">+添加</span>
        <span>{{ option.carouselSetting.imageList.length }}/{{ maxNumber }}</span>
      </div>
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
      <slider-input keyword="topRadius" label="上圆角" :max="20" tips="px" />
      <slider-input keyword="bottomRadius" label="下圆角" :max="20" tips="px" />
    </slider-group>
  </edit-card-form>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { imageExhibitionOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import EditCardItem from '@/view/decorate/components/EditCardItem.vue'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'
  import { cloneDeep } from 'lodash'
  import { nanoid } from 'nanoid'
  const props = defineProps({
    option: {
      type: Object as () => typeof imageExhibitionOption,
      required: true
    }
  })
  // 默认item
  const defaultItem = cloneDeep(props.option.carouselSetting.imageList[0])
  // 最大数量
  const maxNumber = 8
  // 删除操作
  const delItem = (i: number) => props.option.carouselSetting.imageList.splice(i, 1)
  // 添加操作
  const addItem = (item: typeof defaultItem) =>
    props.option.carouselSetting.imageList.length < maxNumber &&
    props.option.carouselSetting.imageList.push(cloneDeep({ ...item, CACHE_KEY_LIST: nanoid(5) }))
  /* 默认加三条 */
  addItem(defaultItem)
  addItem(defaultItem)
  addItem(defaultItem)
</script>
<style lang="scss" scoped>
  .card-item {
    border-style: solid;
    border-top-style: none;
    border-bottom-style: none;
    margin-bottom: 0 !important;
  }
</style>
