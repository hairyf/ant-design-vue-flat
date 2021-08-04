<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:53:44
 * @LastEditTime: 2021-04-27 13:54:28
 * @Description: 视频播放操作区
 * @LastEditors: Mr.Mao
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header icon="ad-video-play" title="视频播放" />
  <edit-card-form title="组件风格">
    <el-form-item label="组件样式">
      <el-radio-group v-model="option.componentStyle.componentModal">
        <el-radio v-for="v in ['默认', '投影', '描边']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="视频类型">
      <el-radio-group v-model="option.componentStyle.videoType">
        <el-radio v-for="v in ['手动上传', '视频链接']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
  <edit-card-form title="添加视频" label-width="90">
    <el-form-item label="选择视频" v-if="option.componentStyle.videoType === '手动上传'">
      <video-item v-model="option.addVideo.video" />
    </el-form-item>
    <template v-else>
      <el-form-item label="商品比例">
        <el-radio-group v-model="option.addVideo.proportion">
          <el-radio v-for="v in ['16:9', '4:3', '1:1']" :key="v" :label="v" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="视频链接">
        <el-input v-model="option.addVideo.video" placeholder="请输入三方视频链接" />
      </el-form-item>
    </template>
    <el-form-item label="选择封面图">
      <image-item v-model="option.addVideo.image" />
    </el-form-item>
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
  import { videoPlayOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import VideoItem from '@/view/decorate/components/common/VideoItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import StyledGroup from '@/view/decorate/components/items/StyledGroup.vue'
  import StyledInput from '@/view/decorate/components/items/StyledInput.vue'
  const props = defineProps({
    option: {
      type: Object as () => typeof videoPlayOption,
      required: true
    }
  })
</script>
<style lang="scss" scoped></style>
