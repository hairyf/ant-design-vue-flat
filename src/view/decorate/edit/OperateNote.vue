<!--
 * @Author: Zhilong
 * @Date: 2021-04-23 19:53:44
 * @LastEditTime: 2021-04-23 20:31:47
 * @Description: 运营笔记操作区
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <edit-header icon="ad-operate-note" title="运营笔记" />
  <edit-card-form title="组件风格">
    <el-form-item label="商品样式">
      <el-radio-group v-model="option.componentStyle.componentModal">
        <el-radio v-for="v in ['默认', '投影', '描边']" :key="v" :label="v" />
      </el-radio-group>
    </el-form-item>
  </edit-card-form>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { operateNoteOption } from '@/view/decorate/config/options'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import ImageItem from '@/view/decorate/components/common/ImageItem.vue'
  import ColorGroup from '@/view/decorate/components/items/ColorGroup.vue'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import StyledGroup from '@/view/decorate/components/items/StyledGroup.vue'
  import StyledInput from '@/view/decorate/components/items/StyledInput.vue'
  const props = defineProps({
    option: {
      type: Object as () => typeof operateNoteOption,
      required: true
    }
  })
</script>
<style lang="scss" scoped></style>
