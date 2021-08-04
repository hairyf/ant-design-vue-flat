<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:53:44
 * @LastEditTime: 2021-05-10 15:17:46
 * @Description: 瓷片区操作区
 * @LastEditors: Mr.wang
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header icon="ad-tile-region" title="瓷片区" />
  <edit-card-form title="组件风格">
    <el-form-item label="商品样式">
      <el-radio-group v-model="option.componentStyle.componentModal">
        <el-radio v-for="v in ['默认', '投影', '描边']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="组件边框">
      <el-radio-group v-model="option.componentStyle.borderStatus">
        <el-radio v-for="v in ['显示', '隐藏']" :key="v" :label="v === '显示'">
          {{ v }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="内容编辑">
    <div class="content-edit-view">
      <div class="content-edit-left" :class="{ on: currentSelect === 0 }" @click="selectItem(0)">
        <div> 280*480Px </div>
        <div> 或同等比例 </div>
      </div>
      <div class="content-edit-right">
        <div v-for="i of 4" :key="i" @click="selectItem(i)" :class="{ on: currentSelect === i }">
          <div> 202*236Px </div> <div> 或同等比例 </div>
        </div>
      </div>
    </div>
    <template v-for="(item, index) in option.contentEdit" :key="item.CACHE_KEY_LIST">
      <div v-show="index === currentSelect">
        <el-form-item label="图片">
          <image-item v-model="item.image" />
        </el-form-item>
        <el-form-item label="标题文字">
          <el-input
            maxlength="10"
            show-word-limit
            v-model="item.title"
            placeholder="请输入标题文字"
          />
        </el-form-item>
        <el-form-item label="背景颜色">
          <color-input v-model="item.background" />
        </el-form-item>
        <el-form-item label="副标题文字" class="long-slider-input">
          <el-input
            maxlength="10"
            show-word-limit
            v-model="item.subTitle"
            placeholder="请输入副标题文字"
          />
        </el-form-item>
        <el-form-item label="背景颜色">
          <color-input v-model="item.subBackground" />
        </el-form-item>
        <el-form-item label="链接">
          <link-item v-model="item.link" />
        </el-form-item>
      </div>
    </template>
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
      <slider-input keyword="topRadius" label="上圆角" :max="20" tips="px" />
      <slider-input keyword="bottomRadius" label="下圆角" :max="20" tips="px" />
    </slider-group>
  </edit-card-form>
</template>
<script lang="ts" setup>
  import { defineProps, ref } from '@vue/runtime-core'
  import { tileRegionOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import LinkItem from '@/view/decorate/components/common/LinkItem.vue'
  import { cloneDeep } from 'lodash'
  import { nanoid } from 'nanoid'
  const props = defineProps({
    option: {
      type: Object as () => typeof tileRegionOption,
      required: true
    }
  })
  //当前选择
  const currentSelect = ref(0)
  //修改选择
  const selectItem = (i: number) => (currentSelect.value = i)
  // 将配置增加为五个
  const defaultItem = cloneDeep(props.option.contentEdit[0])
  for (; props.option.contentEdit.length < 5; ) {
    props.option.contentEdit.push({ ...defaultItem, CACHE_KEY_LIST: nanoid(5) })
  }
</script>
<style lang="scss" scoped>
  .on {
    background: rgba(255, 157, 40, 0.3);
    border: 1px solid #ff9d28;
  }
  .content-edit-view {
    user-select: none;
    cursor: pointer;
    box-sizing: border-box;
    width: 360px;
    height: 360px;
    display: flex;
    margin: 18px auto;
    .content-edit-left {
      box-sizing: border-box;
      flex: 1;
      border: 0.5px solid #d9d9d9;
      margin-right: -1px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      line-height: 22px;
      color: #000000;
    }
    .content-edit-right {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      border: 0.5px solid #d9d9d9;

      > div {
        box-sizing: border-box;
        width: 50%;
        border: 0.5px solid #d9d9d9;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        line-height: 22px;
        color: #000000;
      }
    }
  }
  .long-slider-input {
    :deep(.el-form-item__label) {
      width: 90px !important;
    }
  }
</style>
