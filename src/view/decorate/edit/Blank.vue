<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-25 21:39:06
 * @LastEditTime: 2021-04-23 12:07:20
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <edit-header title="辅助空白" icon="ad-blank" />
  <edit-card-form>
    <el-form-item label="背景">
      <color-input v-model="option.background" />
    </el-form-item>
  </edit-card-form>
  <edit-card-form>
    <el-form-item label="组件高度">
      <slider-input tips="px" v-model="option.height" :max="200" />
    </el-form-item>
  </edit-card-form>
</template>
<script lang="ts" setup>
  import { defineProps } from '@vue/runtime-core'
  import { blankOption } from '@/view/decorate/config'
  import ColorInput from '@/view/decorate/components/items/ColorInput.vue'
  import SliderInput from '@/view/decorate/components/items/SliderInput.vue'
  import EditHeader from '@/view/decorate/components/EditHeader.vue'
  import EditCardForm from '@/view/decorate/components/EditCardForm.vue'
  defineProps({
    option: {
      type: Object as () => typeof blankOption,
      required: true
    }
  })
</script>
