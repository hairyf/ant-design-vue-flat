<!--
 * @Author: Zhilong
 * @Date: 2021-04-08 09:21:05
 * @LastEditTime: 2021-05-13 18:07:03
 * @Description: 图片轮播 操作区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header title="图片轮播" icon="ad-image-carousel" />
  <!-- 组件风格 -->
  <edit-card-form title="组件风格">
    <el-form-item label="组件样式">
      <el-radio-group v-model="option.componentStyle.componentModal">
        <el-radio v-for="v in ['默认', '投影', '描边']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="风格类型">
      <el-radio-group v-model="option.componentStyle.styleType" size="small">
        <el-radio-button label="default">
          <view-image :size="24" src="/custom-assets/images/decorate/carousel-default.png" />
        </el-radio-button>
        <el-radio-button label="column">
          <view-image :size="24" src="/custom-assets/images/decorate/carousel-column.png" />
        </el-radio-button>
        <el-radio-button label="projection">
          <view-image :size="24" src="/custom-assets/images/decorate/carousel-projection.png" />
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
  <!-- 轮播图设置 -->
  <edit-card-form title="轮播图设置">
    <el-form-item label="轮播点">
      <el-radio-group v-model="option.carouselSetting.pagingSpot">
        <el-radio v-for="v in ['显示', '不显示']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="样式" v-if="option.carouselSetting.pagingSpot === '显示'">
      <el-radio-group
        v-model="option.carouselSetting.spotStyle"
        size="mini"
        class="spot-setting-view"
      >
        <el-radio-button label="transverse">
          <view-image :size="24" src="/custom-assets/images/decorate/carousel-transverse.png" />
        </el-radio-button>
        <el-radio-button label="spot">
          <view-image :size="24" src="/custom-assets/images/decorate/carousel-spot.png" />
        </el-radio-button>
        <el-radio-button label="ellipse">
          <view-image :size="24" src="/custom-assets/images/decorate/carousel-ellipse.png" />
        </el-radio-button>
        <el-radio-button label="hollow">
          <view-image :size="24" src="/custom-assets/images/decorate/carousel-hollow.png" />
        </el-radio-button>
        <el-radio-button label="number">
          <view-image :size="24" src="/custom-assets/images/decorate/carousel-number.png" />
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="位置" v-if="option.carouselSetting.pagingSpot === '显示'">
      <el-radio-group v-model="option.carouselSetting.position" size="small">
        <el-radio-button label="left"><i class="ri-align-left" /></el-radio-button>
        <el-radio-button label="center"><i class="ri-align-center" /></el-radio-button>
        <el-radio-button label="right"><i class="ri-align-right" /></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="选中颜色"
      v-if="
        option.carouselSetting.pagingSpot === '显示' &&
        option.carouselSetting.spotStyle !== 'number'
      "
    >
      <color-input v-model="option.carouselSetting.selectColor" />
    </el-form-item>
    <el-form-item label="轮播图片" />
    <nested-sort-table
      v-model="option.carouselSetting.imageList"
      style="margin: 0px 10px 6px 10px"
      handle=".ad-tableIcon"
    >
      <template #item="{ item, index }">
        <edit-card-item
          class="oe-flex oe-m-b-15"
          :key="item.CACHE_KEY_LIST"
          :show-close="option.carouselSetting.imageList.length > 1"
          @close="delItem(index)"
        >
          <i
            class="ad-tableIcon item-icon oe-m-r-16"
            style="font-size: 12px; cursor: move"
            @click.stop
          />
          <image-item class="oe-m-r-14" v-model="item.image" />
          <link-item class="oe-flex-1" v-model="item.link" />
        </edit-card-item>
      </template>
    </nested-sort-table>
    <div style="font-size: 12px; color: #8c8c8c">建议图片尺寸为宽750X高420px</div>
    <div class="inc-button oe-m-t-28" @click="addItem(defaultItem)">
      <span class="oe-m-r-2">+添加</span>
      {{ option.carouselSetting.imageList.length }}/{{ maxNumber }}
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
      <slider-input keyword="image" label="图片间距" tips="px" />
      <slider-input keyword="top" label="上边距" :max="50" tips="px" />
      <slider-input keyword="bottom" label="下边距" :max="20" tips="px" />
      <slider-input keyword="leftRight" label="左右边距" :max="100" tips="px" />
      <slider-input keyword="topRadius" label="上圆角" :max="20" tips="px" />
      <slider-input keyword="bottomRadius" label="下圆角" :max="20" tips="px" />
    </slider-group>
  </edit-card-form>
  <edit-card-form title="高度设置">
    <el-form-item label="高度">
      <slider-input v-model="option.heightSetting.height" :min="1" :max="1000" tips="px" />
    </el-form-item>
  </edit-card-form>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { imageCarouselOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import EditCardItem from '@/view/decorate/components/EditCardItem.vue'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'
  import NestedSortTable from '@/components/nested-sort-table/nested-sort-table.vue'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'

  import { cloneDeep } from 'lodash'
  import { nanoid } from 'nanoid'
  const props = defineProps({
    option: {
      type: Object as () => typeof imageCarouselOption,
      required: true
    }
  })
  // 最大数量
  const maxNumber = 8
  // 默认添加的item
  const defaultItem = cloneDeep(props.option.carouselSetting.imageList[0])
  // 删除一项
  const delItem = (index: number) => props.option.carouselSetting.imageList.splice(index, 1)
  // 添加一项
  const addItem = (item: typeof defaultItem) => {
    if (props.option.carouselSetting.imageList.length >= maxNumber) return
    props.option.carouselSetting.imageList.push(cloneDeep({ ...item, CACHE_KEY_LIST: nanoid(5) }))
  }
</script>
<style lang="scss" scoped>
  .spot-setting-view {
    :deep(.el-radio-button__inner) {
      background-color: inherit !important;
    }
  }
</style>
