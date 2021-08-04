<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-02 10:50:38
 * @LastEditTime: 2021-04-23 12:08:43
 * @Description: 浮动按钮
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="fixed-button">
    <edit-header :icon="'ad-fixed-button'" title="浮动按钮" />
    <edit-card-form title="组件风格">
      <el-form-item label="组件位置">
        <el-radio-group v-model="option.componentStyle.placement">
          <el-radio :label="v" v-for="v in ['左上角', '右上角', '左下角', '右下角']" :key="v" />
        </el-radio-group>
      </el-form-item>
    </edit-card-form>
    <edit-card-form title="内容编辑">
      <div class="tips-container oe-flex">
        <div class="oe-m-r-18">添加图片</div>
        <div class="tips">注：建议使用90x90Px的png图片</div>
      </div>
      <edit-card-item
        class="oe-flex"
        v-for="(item, index) in option.contentEdit"
        :key="index"
        :show-close="option.contentEdit.length > 1"
        @close="option.contentEdit.splice(index, 1)"
      >
        <image-item class="oe-m-r-15" v-model="item.image" />
        <link-item v-if="item.type === 'link'" class="oe-flex-1" v-model="item.link" />
        <link-item v-if="item.type === 'top'" class="oe-flex-1" text="返回顶部" />
        <link-item v-if="item.type === 'serve'" class="oe-flex-1" text="小程序客服" />
      </edit-card-item>
      <div class="oe-flex" v-if="option.contentEdit.length < 5">
        <div class="inc-button oe-flex-1 oe-m-r-12" @click="incFixedButtonItem('link')">
          +添加链接
        </div>
        <div class="inc-button oe-flex-1 oe-m-r-12" @click="incFixedButtonItem('top')">
          +添加返回顶部
        </div>
        <div class="inc-button oe-flex-1" @click="incFixedButtonItem('serve')">
          +添加小程序客服
        </div>
      </div>
    </edit-card-form>
    <edit-card-form title="边距设置">
      <slider-group v-model="option.padding">
        <slider-input keyword="iconSpacing" label="图标边距" />
        <slider-input
          v-if="
            option.componentStyle.placement == '左上角' ||
            option.componentStyle.placement == '右上角'
          "
          keyword="top"
          label="距离顶部"
        />
        <slider-input
          v-if="
            option.componentStyle.placement == '左下角' ||
            option.componentStyle.placement == '右下角'
          "
          keyword="bottom"
          label="距离底部"
        />
        <slider-input
          v-if="
            option.componentStyle.placement == '左上角' ||
            option.componentStyle.placement == '左下角'
          "
          keyword="left"
          label="距离左侧"
        />
        <slider-input
          v-if="
            option.componentStyle.placement == '右上角' ||
            option.componentStyle.placement == '右下角'
          "
          keyword="right"
          label="距离右侧"
        />
      </slider-group>
    </edit-card-form>
  </div>
</template>
<script lang="ts" setup>
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
  import { defineProps } from '@vue/runtime-core'
  import { fixedButtonOption } from '../config'
  import { cloneDeep } from 'lodash'
  const props = defineProps({
    option: {
      type: Object as () => typeof fixedButtonOption,
      required: true
    }
  })
  type FixedButtonType = typeof props.option.contentEdit[0]['type']
  const contentEditItem = cloneDeep(props.option.contentEdit[0])
  // 新增编辑项
  const incFixedButtonItem = (type: FixedButtonType) => {
    const newContentEditItem = cloneDeep(contentEditItem)
    newContentEditItem.type = type
    props.option.contentEdit.push(newContentEditItem)
  }
</script>
<style lang="scss" scoped>
  .tips-container {
    margin: 10px 0;
    .tips {
      font-size: 12px;
      color: #8c8c8c;
    }
  }
</style>
