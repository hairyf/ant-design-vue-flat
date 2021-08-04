<!--
 * @Author: Zhilong
 * @Date: 2021-04-06 15:07:46
 * @LastEditTime: 2021-04-23 12:05:36
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header title="轮播商品" icon="ad-carousel-commodity" />
  <edit-card-form title="组件风格">
    <el-form-item label="组件样式">
      <el-radio-group v-model="option.componentStyle.componentModal">
        <el-radio v-for="v in ['默认', '投影', '描边']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="添加商品">
    <el-form-item label="商品类型">
      <el-radio-group v-model="option.addProduct.chooseProduct">
        <el-radio v-for="v in ['手动选择', '选择分类', '选择分组']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
    <good-list
      v-if="option.addProduct.chooseProduct === '手动选择'"
      v-model="option.addProduct.manualSelection"
    />
    <el-form-item label="分类" v-if="option.addProduct.chooseProduct === '选择分类'">
      <link-item v-model="option.addProduct.selectCategories" type="classification" reset />
    </el-form-item>
    <el-form-item label="分组" v-if="option.addProduct.chooseProduct === '选择分组'">
      <link-item v-model="option.addProduct.selectGroup" type="grouping" reset />
    </el-form-item>
    <template v-if="option.addProduct.chooseProduct !== '手动选择'">
      <el-form-item label="商品条数">
        <slider-input v-model="option.addProduct.productsNum" :max="20" tips="个" />
      </el-form-item>
      <div class="el-form-item"> 最多可显示 20 件商品 </div>
      <el-form-item label="商品排序">
        <el-radio-group v-model="option.addProduct.commodityRanking">
          <el-radio
            v-for="v in [/*'千人千面',*/ '按销量', '价格降序', '价格升序']"
            :key="v"
            :label="v"
            style="margin-right: 15px"
          />
        </el-radio-group>
      </el-form-item>
      <el-form-item label=" " v-if="option.addProduct.commodityRanking === '千人千面'">
        <span style="font-size: 12px">
          <span style="color: red">*</span>
          根据会员特征千人千面展现，可大幅提升点击和成交转化率。
        </span>
      </el-form-item>
    </template>
  </edit-card-form>
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
      <color-input keyword="subBackground" label="商品背景" />
      <color-input keyword="text" label="商品价格" />
    </color-group>
    <el-form-item label="图片">
      <image-item v-model="option.colorStyle.backgroundImage" />
    </el-form-item>
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
  import { defineProps } from '@vue/runtime-core'
  import { carouselCommodityOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import GoodList from '@/view/decorate/components/common/GoodList.vue'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'

  defineProps({
    option: {
      type: Object as () => typeof carouselCommodityOption,
      required: true
    }
  })
</script>
