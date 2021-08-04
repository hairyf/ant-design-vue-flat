<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-24 11:12:28
 * @LastEditTime: 2021-04-23 12:08:01
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <edit-header icon="ad-guide" title="辅助线" />
  <edit-card-form title="组件风格">
    <el-form-item label="组件风格">
      <el-radio-group v-model="option.componentType" size="small">
        <el-radio-button label="solid">
          <span class="line solid" />
        </el-radio-button>
        <el-radio-button label="dotted">
          <span class="line dotted" />
        </el-radio-button>
        <el-radio-button label="dashed">
          <span class="line dashed" />
        </el-radio-button>
      </el-radio-group>
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
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  import SliderGroup from '@/view/decorate/components/items/SliderGroup.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import { guideOption } from '@/view/decorate/config'
  import { defineProps } from '@vue/runtime-core'
  defineProps({
    data: {
      type: Array,
      required: true
    },
    option: {
      type: Object as () => typeof guideOption,
      required: true
    }
  })
</script>
<style lang="scss" scoped>
  .el-radio-group {
    .line {
      display: inline-block;
      width: 30px;
      margin-bottom: 4px;
      border-color: gray;
      border-width: 1px;
    }
    .solid {
      border-style: solid;
    }
    .dotted {
      border-style: dotted;
    }
    .dashed {
      border-style: dashed;
    }
    .is-active {
      .line {
        border-color: #ffffff;
      }
    }
  }
</style>
