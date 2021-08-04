<!--
 * @Author: Zhilong
 * @Date: 2021-03-30 15:12:30
 * @LastEditTime: 2021-04-23 12:07:51
 * @Description: 图片导航的控制区域
 * @LastEditors: Zhilong
 * @autograph: 那天~新的页面诞生了
-->
<template>
  <edit-header title="图片导航" icon="ad-image-navigation" />
  <edit-card-form title="组件风格">
    <el-form-item label="组件样式">
      <el-radio-group v-model="option.componentStyle.componentModal">
        <el-radio :label="v" v-for="v in ['默认', '投影', '描边']" :key="v" />
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="图片内容" tips="建议图片尺寸为宽226X高226px">
    <!-- 注意! key不能直接用i 必须是唯一key 否则进行删除时 key会相同 导致页面缓存不更新 -->
    <edit-card-item
      v-for="(item, i) in option.imageList"
      :key="item.CACHE_KEY_LIST"
      :show-close="option.imageList.length !== 1"
      @close="moveImageListItem(i)"
    >
      <div class="oe-flex oe-m-b-16">
        <image-item v-model="item.image" bgColor="#FFF" border="1px dashed #D9D9D9" size="84" />
        <div class="oe-flex-1">
          <el-form-item label="主标题">
            <el-input v-model="item.title" />
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="item.subTitle" />
          </el-form-item>
        </div>
      </div>
      <color-group v-model="item.color" class="oe-m-b-20 color-group">
        <color-input keyword="title" reset label="主标题颜色" />
        <color-input keyword="subTitle" reset label="副标题颜色" />
        <color-input keyword="background" reset label="背景颜色" />
      </color-group>
      <link-item v-model="item.link" />
    </edit-card-item>
    <div class="inc-button" @click="addImageListItem(defaultItem)">
      <span class="oe-m-r-6">+添加</span>
      <span>{{ option.imageList.length }}/{{ maxNumber }}</span>
    </div>
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
  import { imageNavigationOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import EditCardItem from '@/view/decorate/components/EditCardItem.vue'
  import { cloneDeep, pullAt } from 'lodash'
  import { nanoid } from 'nanoid'
  // 最大添加数量
  const maxNumber = 8
  const props = defineProps({
    option: {
      type: Object as () => typeof imageNavigationOption,
      required: true
    }
  })
  // 取默认imageList 里面的一项数据 用作添加的填充
  const defaultItem = cloneDeep(props.option.imageList[0])
  // 删除事件 传index 删除
  const moveImageListItem = (index: number) => {
    if (props.option.imageList.length === 1) return
    pullAt(props.option.imageList, index)
  }
  // 添加事件 传入数据 进行添加
  const addImageListItem = (data: typeof defaultItem) => {
    if (props.option.imageList.length >= maxNumber) return
    // 深度拷贝一个 让CACHE_KEY_LIST做一个新的唯一值
    const cloneDeepData = cloneDeep({ ...data, CACHE_KEY_LIST: nanoid(5) })
    props.option.imageList.push(cloneDeepData)
  }
</script>
<style lang="scss" scoped>
  .image-list-view {
    padding: 15px;
    margin-bottom: 5px;
    position: relative;
    transition: 0.3s background linear;
    box-sizing: border-box;
    border: 1px dashed rgba(0, 0, 0, 0);
    &:hover {
      background: #f5f5f5;
      border-color: #d9d9d9;
      .item-close {
        opacity: 1;
        display: block;
      }
    }
    .item-close {
      color: var(--color-primary);
      font-size: 20px;
      position: absolute;
      right: -10px;
      top: -10px;
      opacity: 0;
      transition: 0.5s opacity linear;
      cursor: pointer;
    }
  }
  .color-group {
    :deep(.el-form-item) {
      .el-form-item__label {
        width: 128px !important;
      }
    }
  }
</style>
