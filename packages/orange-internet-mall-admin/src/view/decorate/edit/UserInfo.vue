<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-25 21:39:06
 * @LastEditTime: 2021-05-08 15:34:49
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="user-info">
    <edit-header icon="ri-contacts-line" title="会员信息" />
    <edit-card-form title="组件风格">
      <el-form-item label="组件样式">
        <el-radio-group v-model="option.componentStyle.componentModal">
          <el-radio :label="v" v-for="v in ['默认', '自定义']" :key="v" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="风格选择"></el-form-item>
      <el-form-item>
        <el-radio-group v-model="option.componentStyle.styleType" class="style-radio-list">
          <div class="oe-flex oe-row-between" style="width: 460px">
            <el-radio-button label="one">
              <view-image
                fit="contain"
                :size="135"
                src="/custom-assets/images/decorate/user-card-1.png"
              />
              <div class="style-radio-item" v-if="option.componentStyle.styleType === 'one'">
                <i class="el-icon-check" style="zoom: 0.5" />
              </div>
            </el-radio-button>
            <el-radio-button label="two">
              <view-image
                fit="contain"
                :size="135"
                src="/custom-assets/images/decorate/user-card-2.png"
              />
              <div class="style-radio-item" v-if="option.componentStyle.styleType === 'two'">
                <i class="el-icon-check" style="zoom: 0.5" />
              </div>
            </el-radio-button>
            <el-radio-button label="three">
              <view-image
                fit="contain"
                :size="135"
                src="/custom-assets/images/decorate/user-card-3.png"
              />
              <div class="style-radio-item" v-if="option.componentStyle.styleType === 'three'">
                <i class="el-icon-check" style="zoom: 0.5" />
              </div>
            </el-radio-button>
          </div>
        </el-radio-group>
      </el-form-item>
    </edit-card-form>
    <edit-card-form
      label-width="90"
      title="内容编辑"
      v-if="option.componentStyle.componentModal === '自定义'"
    >
      <el-form-item label="显示内容">
        <el-checkbox-group v-model="option.contentEdit.contents">
          <!-- '消息', -->
          <el-checkbox v-for="v in ['余额', '积分', '优惠券', '设置']" :label="v" :key="v" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="卡片背景">
        <el-radio-group v-model="option.contentEdit.cardBackgroundType">
          <el-radio v-for="v in ['背景颜色', '自定义图片']" :key="v" :label="v" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label=" " v-if="option.contentEdit.cardBackgroundType === '自定义图片'">
        <image-item v-model="option.contentEdit.cardBackground" />
      </el-form-item>
      <el-form-item label=" " v-else>
        <color-input v-model="option.contentEdit.cardBackground" />
      </el-form-item>
      <el-form-item label="积分图标">
        <image-item v-model="option.contentEdit.integralIcon" />
      </el-form-item>
      <el-form-item label="余额图标">
        <image-item v-model="option.contentEdit.balanceIcon" />
      </el-form-item>
      <el-form-item label="优惠券图标">
        <image-item v-model="option.contentEdit.couponIcon" />
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
        <color-input keyword="gradeBackground" label="等级背景" />
        <color-input keyword="gradeText" label="等级文字" />
        <color-input keyword="name" label="名称颜色" />
        <color-input keyword="financeText" label="财务文字" />
      </color-group>
    </edit-card-form>
    <edit-card-form title="边距设置">
      <slider-group v-model="option.padding">
        <template v-if="option.componentStyle.styleType !== 'three'">
          <slider-input keyword="top" label="上边距" :max="50" tips="px" />
          <slider-input keyword="bottom" label="下边距" :max="20" tips="px" />
          <slider-input keyword="leftRight" label="左右边距" :max="20" tips="px" />
        </template>
        <slider-input keyword="topRadius" label="上圆角" :max="20" tips="px" />
        <template v-if="option.componentStyle.styleType !== 'three'">
          <slider-input keyword="bottomRadius" label="下圆角" :max="20" tips="px" />
        </template>
      </slider-group>
    </edit-card-form>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps, watch } from '@vue/runtime-core'
  import { userInfoOption } from '@/view/decorate/config'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import StyledGroup from '@/view/decorate/components/items/StyledGroup.vue'
  import StyledInput from '@/view/decorate/components/items/StyledInput.vue'
  import GoodList from '@/view/decorate/components/common/GoodList.vue'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'
  const props = defineProps({
    option: {
      type: Object as () => typeof userInfoOption,
      required: true
    }
  })
  const resetTargetStyle = (value = props.option.componentStyle.styleType) => {
    // 网络图片固定地址
    const baseUrl = 'https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/'
    // 网络图片索引地址
    const images = [
      'user-card-bg-1.png',
      'user-card-bg-2.png',
      'user-card-bg-3.png',
      'balance-icon.png',
      'integral-icon.png',
      'coupon-icon.png'
    ]
    if (value === 'one') {
      props.option.contentEdit.cardBackground = `${baseUrl + images[0]}`
      props.option.contentEdit.balanceIcon = `${baseUrl + images[3]}`
      props.option.contentEdit.integralIcon = `${baseUrl + images[4]}`
      props.option.contentEdit.couponIcon = `${baseUrl + images[5]}`
      props.option.contentEdit.cardBackground = `${baseUrl + images[0]}`
      props.option.colorStyle.color.gradeBackground = '#474758'
      props.option.colorStyle.color.gradeText = '#ffffff'
      props.option.colorStyle.color.name = '#ffffff'
      props.option.colorStyle.color.financeText = '#000'
      props.option.padding.top = 0
      props.option.padding.bottom = 0
      props.option.padding.leftRight = 0
      props.option.padding.topRadius = 0
      props.option.padding.bottomRadius = 0
      return undefined
    }
    if (value === 'two') {
      props.option.contentEdit.cardBackground = baseUrl + images[1]
      props.option.colorStyle.color.background = ''
      props.option.colorStyle.color.gradeBackground = '#474758'
      props.option.colorStyle.color.gradeText = '#E2C791'
      props.option.colorStyle.color.name = '#ffffff'
      props.option.colorStyle.color.financeText = '#ffffff'
      props.option.padding.top = 12
      props.option.padding.bottom = 12
      props.option.padding.leftRight = 12
      props.option.padding.topRadius = 10
      props.option.padding.bottomRadius = 10
      return undefined
    }
    if (value === 'three') {
      props.option.contentEdit.cardBackground = baseUrl + images[2]
      props.option.colorStyle.color.background = ''
      props.option.colorStyle.color.gradeBackground = '#474758'
      props.option.colorStyle.color.gradeText = '#ffffff'
      props.option.colorStyle.color.name = '#987238'
      props.option.colorStyle.color.financeText = '#987238'
      props.option.padding.top = 12
      props.option.padding.bottom = 0
      props.option.padding.leftRight = 12
      props.option.padding.topRadius = 10
      props.option.padding.bottomRadius = 0
      return undefined
    }
  }
  const watchTarget = () => props.option.componentStyle.styleType
  watch(watchTarget, resetTargetStyle)
</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .view-image {
    line-height: 30px !important;
  }
  .style-radio-list {
    :deep(.el-radio-button__inner) {
      background-color: inherit;
      padding: 2px;
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
  .el-checkbox {
    @include not-last-child(margin-right, 20px);
  }
</style>
