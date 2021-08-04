<!--
 * @Author: Zhilong
 * @Date: 2021-04-07 10:23:39
 * @LastEditTime: 2021-04-23 12:05:07
 * @Description: 精品推荐 操作区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   我就是个伞兵!!
-->
<template>
  <edit-header title="精品推荐" icon="ad-boutique-recommend" />
  <edit-card-form title="组件风格">
    <el-radio-group v-model="option.componentStyle.styleType" class="style-radio-list">
      <div class="oe-flex oe-row-between" style="width: 460px">
        <el-radio-button label="single">
          <view-image
            :size="135"
            src="/custom-assets/images/decorate/boutique-recommend-type1.png"
          />
          <div class="style-radio-item" v-if="option.componentStyle.styleType === 'single'">
            <i class="el-icon-check" style="zoom: 0.5" />
          </div>
        </el-radio-button>
        <el-radio-button label="array">
          <view-image
            :size="135"
            src="/custom-assets/images/decorate/boutique-recommend-type2.png"
          />
          <div class="style-radio-item" v-if="option.componentStyle.styleType === 'array'">
            <i class="el-icon-check" style="zoom: 0.5" />
          </div>
        </el-radio-button>
        <el-radio-button label="custom">
          <view-image
            :size="135"
            src="/custom-assets/images/decorate/boutique-recommend-type3.png"
          />
          <div class="style-radio-item" v-if="option.componentStyle.styleType === 'custom'">
            <i class="el-icon-check" style="zoom: 0.5" />
          </div>
        </el-radio-button>
      </div>
    </el-radio-group>
  </edit-card-form>
  <!-- 整体样式 -->
  <edit-card-form title="整体样式">
    <el-form-item label="商品样式">
      <el-radio-group v-model="option.contentStyle.componentModal">
        <el-radio v-for="v in ['默认', '投影', '描边']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
    <!-- custom选择区 -->
    <el-form-item v-if="option.componentStyle.styleType === 'custom'">
      <div class="custom-select-view">
        <div
          @click="customSelectTarget = 0"
          :class="['targer-view', customSelectTarget === 0 && 'target-select']"
        />
        <div style="flex-direction: column">
          <div
            @click="customSelectTarget = 1"
            :class="['targer-view', customSelectTarget === 1 && 'target-select']"
          />
          <div
            @click="customSelectTarget = 2"
            :class="['targer-view', customSelectTarget === 2 && 'target-select']"
          />
        </div>
      </div>
    </el-form-item>
    <!-- 复用操作区 -->
    <template v-for="(item, index) in option.contentStyle.list" :key="item.CACHE_KEY_LIST">
      <edit-card-item
        :reduction="option.componentStyle.styleType !== 'array'"
        :show-close="option.contentStyle.list?.length > 1"
        v-if="option.componentStyle.styleType !== 'custom' || customSelectTarget === index"
        @close="delItem(index)"
      >
        <color-group v-model="item.color" reset>
          <el-form-item label="主标题">
            <el-input class="oe-flex" v-model="item.title" maxlength="10" show-word-limit />
          </el-form-item>
          <color-input keyword="title" label="主标题" />
          <el-form-item label="副标题">
            <el-input class="oe-flex" v-model="item.subTitle" maxlength="10" show-word-limit />
          </el-form-item>
          <color-input keyword="subTitle" label="副标题" />
          <color-input keyword="btn" label="按钮颜色" />
          <color-input
            v-if="option.componentStyle.styleType === 'single'"
            keyword="text"
            label="文字颜色"
          />
          <el-form-item label="图片">
            <image-item v-model="item.image" />
          </el-form-item>
          <el-form-item label="链接">
            <link-item v-model="item.link" />
          </el-form-item>
          <color-input keyword="background" label="背景颜色" />
        </color-group>
      </edit-card-item>
    </template>
    <!-- array > 添加按钮 -->
    <div v-if="option.componentStyle.styleType === 'array'" @click="addItem" class="inc-button">
      添加
    </div>
  </edit-card-form>
  <!-- 颜色样式 -->
  <edit-card-form title="组件样式">
    <el-form-item label="组件背景">
      <el-radio-group v-model="option.colorStyle.backgroundType">
        <el-radio v-for="v in ['透明', '颜色', '背景图片']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
    <!-- > 背景图片 -->
    <el-form-item label="图片" v-if="option.colorStyle.backgroundType === '背景图片'">
      <image-item v-model="option.colorStyle.image" />
    </el-form-item>
    <color-group v-model="option.colorStyle.color" class="oe-m-b-20" reset>
      <color-input
        keyword="background"
        label="背景颜色"
        v-if="option.colorStyle.backgroundType === '颜色'"
      />
    </color-group>
  </edit-card-form>
  <edit-card-form title="边距设置">
    <slider-group v-model="option.padding">
      <slider-input keyword="top" label="上边距" tips="px" :max="50" />
      <slider-input keyword="bottom" label="下边距" :max="20" tips="px" />
      <slider-input keyword="leftRight" label="左右边距" :max="20" tips="px" />
      <slider-input keyword="topRadius" label="上圆角" :max="20" tips="px" />
      <slider-input keyword="bottomRadius" label="下圆角" :max="20" tips="px" />
    </slider-group>
  </edit-card-form>
</template>
<script lang="ts" setup>
  import { defineProps, ref, watch } from '@vue/runtime-core'
  import { boutiqueRecommendOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'
  import EditCardItem from '@/view/decorate/components/EditCardItem.vue'
  import { cloneDeep } from 'lodash'
  import { nanoid } from 'nanoid'
  const props = defineProps({
    option: {
      type: Object as () => typeof boutiqueRecommendOption,
      required: true
    }
  })
  // 取默认imageList 里面的一项数据 用作添加的填充
  const defaultItem = cloneDeep(props.option.contentStyle.list[0])
  // custom选择项
  const customSelectTarget = ref(0)
  // 删除一项
  const delItem = (i: number) => props.option.contentStyle.list.splice(i, 1)
  // 添加一项
  const addItem = () =>
    props.option.contentStyle.list.push({
      ...defaultItem,
      image:
        'https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/boutiqueRecommendDefaultImage2.png',
      CACHE_KEY_LIST: nanoid(5)
    })
  // 切换风格换默认数据
  watch(
    () => props.option.componentStyle.styleType,
    (value) => {
      // 网络图片固定地址
      const urlString = 'https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/'
      // 网络图片索引地址
      const images = [
        'boutiqueRecommendDefaultImage1.png',
        'boutiqueRecommendDefaultImage2.png',
        'boutiqueRecommendDefaultImage3-1.png',
        'boutiqueRecommendDefaultImage3-2.png',
        'boutiqueRecommendDefaultImage3-3.png'
      ]

      if (value === 'single') {
        props.option.contentStyle.list = [
          cloneDeep({ ...defaultItem, image: urlString + images[0], CACHE_KEY_LIST: nanoid(5) })
        ]
      } else if (value === 'array') {
        props.option.contentStyle.list = [
          cloneDeep({ ...defaultItem, image: urlString + images[1], CACHE_KEY_LIST: nanoid(5) }),
          cloneDeep({ ...defaultItem, image: urlString + images[1], CACHE_KEY_LIST: nanoid(5) }),
          cloneDeep({ ...defaultItem, image: urlString + images[1], CACHE_KEY_LIST: nanoid(5) }),
          cloneDeep({ ...defaultItem, image: urlString + images[1], CACHE_KEY_LIST: nanoid(5) })
        ]
      } else {
        // 重置选择项
        customSelectTarget.value = 0
        props.option.contentStyle.list = [
          cloneDeep({ ...defaultItem, image: urlString + images[2], CACHE_KEY_LIST: nanoid(5) }),
          cloneDeep({ ...defaultItem, image: urlString + images[3], CACHE_KEY_LIST: nanoid(5) }),
          cloneDeep({ ...defaultItem, image: urlString + images[4], CACHE_KEY_LIST: nanoid(5) })
        ]
      }
    }
  )
</script>
<style lang="scss" scoped>
  .target-select {
    border-color: var(--color-primary) !important;
  }
  .custom-select-view {
    display: flex;
    flex: 1;
    height: 230px;
    div {
      display: flex;
      flex: 1;
      &.targer-view {
        cursor: pointer;
        background: rgba(217, 217, 217, 0.2);
        border: 1px solid rgba(200, 200, 200, 0.5);
        box-sizing: border-box;
      }
    }
  }
  .style-radio-list {
    :deep(.el-radio-button__inner) {
      background-color: inherit;
      padding: 0;
    }
    .style-radio-item {
      position: absolute;
      right: 0;
      top: 0;
      width: 16px;
      line-height: 10px;
      height: 12px;
      color: #fff;
      background-color: var(--color-primary);
    }
  }
</style>
