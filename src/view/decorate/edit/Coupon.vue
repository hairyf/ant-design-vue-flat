<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:53:44
 * @LastEditTime: 2021-04-27 17:54:30
 * @Description: 优惠券操作区
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header icon="ad-coupon" title="优惠券" />
  <edit-card-form title="组件风格">
    <el-form-item label="风格类型">
      <el-radio-group v-model="option.componentStyle.styleType" size="small">
        <el-radio-button v-for="i in ['right', 'bottom', 'center', 'top']" :label="i" :key="i">
          <i :class="'ad-coupon-layout-' + i" class="oe-f-s-24" />
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="风格类型">
      <el-radio-group v-model="option.componentStyle.showType" size="small">
        <el-radio-button label="single">
          <el-image :src="`${imageUrl}layout-bottom.png`" class="btn-image" />
        </el-radio-button>
        <el-radio-button label="pair">
          <el-image :src="`${imageUrl}layout-pair.png`" class="btn-image" />
        </el-radio-button>
        <el-radio-button label="three">
          <el-image :src="`${imageUrl}layout-three.png`" class="btn-image" />
        </el-radio-button>
        <el-radio-button label="row">
          <el-image :src="`${imageUrl}layout-subsidiary.png`" class="btn-image" />
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="内容编辑">
    <nested-sort-table style="width: 100%" v-model="option.contentEdit">
      <template #item="{ item }">
        <div class="edit-item oe-flex">
          <i class="ad-tableIcon oe-m-r-16" style="color: #fea841" />
          <el-tag
            :style="{ color: item.link.value.data.type == 1 ? '#1ad370' : '#F7C4C4' }"
            v-if="item.link.value.data.type == 1"
            :color="item.link.value.data.type == 1 ? '#d1f6e2' : '#FE1919'"
            type="success"
            hit
          >
            {{ item.link.value.data.type == 1 ? '折扣券' : '满减券' }}
          </el-tag>
          <div class="tips oe-m-l-12" style="font-size: 14px">
            <div class="oe-m-b-5">{{ item.link.value.data.name }}</div>
            <div>{{ item.link.value.data.content }}</div>
          </div>
        </div>
      </template>
    </nested-sort-table>
    <div class="inc-button" @click="addItem" v-if="option.contentEdit.length < 10">+ 添加</div>
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
  import { couponOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import NestedSortTable from '@/components/nested-sort-table/nested-sort-table.vue'
  import { LinkSelect } from '@/components/selectors'
  import { nanoid } from 'nanoid'
  const props = defineProps({
    option: {
      type: Object as () => typeof couponOption,
      required: true
    }
  })
  const imageUrl = '/custom-assets/images/decorate/'
  const addItem = async () => {
    const linkItem = await LinkSelect({ option: { marketing: true } })
    props.option.contentEdit.push({
      CACHE_KEY_LIST: nanoid(5),
      link: linkItem
    })
  }
</script>
<style lang="scss" scoped>
  .edit-item {
    padding: 14px;
    background-color: #f5f5f5;
    margin-bottom: 20px;
    cursor: pointer;
  }
</style>
