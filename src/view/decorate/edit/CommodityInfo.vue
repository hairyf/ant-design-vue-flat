<!--
 * @Author: Zhilong
 * @Date: 2021-04-19 16:57:36
 * @LastEditTime: 2021-04-22 20:43:21
 * @Description: 商品信息 操作区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header title="商品信息" icon="ad-product-ranking" />
  <edit-card-form title="组件风格">
    <el-radio-group v-model="option.componentStyle.styleType" class="style-radio-list">
      <div class="oe-flex oe-row-between" style="width: 460px">
        <div>
          <el-radio-button label="one">
            <view-image fit="contain" :size="135" :src="imageUrl + 'commodity-info-one.png'" />
            <div class="style-radio-item" v-if="option.componentStyle.styleType === 'one'">
              <i class="el-icon-check" style="zoom: 0.5" />
            </div>
          </el-radio-button>
          <div style="line-height: 36px; text-align: center">风格一</div>
        </div>
        <div>
          <el-radio-button label="two">
            <view-image fit="contain" :size="135" :src="imageUrl + 'commodity-info-two.png'" />
            <div class="style-radio-item" v-if="option.componentStyle.styleType === 'two'">
              <i class="el-icon-check" style="zoom: 0.5" />
            </div>
          </el-radio-button>
          <div style="line-height: 36px; text-align: center">风格二</div>
        </div>
        <div>
          <el-radio-button label="three">
            <view-image fit="contain" :size="135" :src="imageUrl + 'commodity-info-three.png'" />
            <div class="style-radio-item" v-if="option.componentStyle.styleType === 'three'">
              <i class="el-icon-check" style="zoom: 0.5" />
            </div>
          </el-radio-button>
          <div style="line-height: 36px; text-align: center">风格三</div>
        </div>
      </div>
    </el-radio-group>
  </edit-card-form>
  <edit-card-form title="内容编辑">
    <!-- <el-form-item label="购买按钮">
      <el-input
        v-model="option.contentEdit.purchaseBtn"
        style="width: 283px"
        maxlength="6"
        show-word-limit
      />
    </el-form-item> -->
    <el-form-item label="产品价格">
      <el-radio-group v-model="option.contentEdit.productPrice">
        <el-radio v-for="v in ['区间', '最低价']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="快递">
      <el-radio-group v-model="option.contentEdit.express">
        <el-radio v-for="v in ['区间', '最低价']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="分享" v-if="false">
      <el-switch
        v-model="option.contentEdit.share"
        :active-value="false"
        :inactive-value="true"
        active-color="#DDD"
        inactive-color="#13ce66"
      />
    </el-form-item>
    <!-- <el-form-item label="活动入口">
      <el-switch
        v-model="option.contentEdit.activity"
        active-color="#13ce66"
        inactive-color="#DDD"
      />
    </el-form-item>
    <el-form-item label="购物车">
      <el-switch
        v-model="option.contentEdit.shoppingCart"
        active-color="#13ce66"
        inactive-color="#DDD"
      />
    </el-form-item> -->
  </edit-card-form>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { commodityInfoOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import StyledGroup from '@/view/decorate/components/items/StyledGroup.vue'
  import StyledInput from '@/view/decorate/components/items/StyledInput.vue'
  import ViewImage from '@/view/decorate/components/common/ViewImage.vue'
  const imageUrl = 'https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/'
  const props = defineProps({
    option: {
      type: Object as () => typeof commodityInfoOption,
      required: true
    }
  })
</script>
<style lang="scss" scoped>
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
  :deep(.el-switch__action) {
    width: 10px;
    height: 10px;
    margin-top: 3px;
    margin-left: 3px;
  }
</style>
