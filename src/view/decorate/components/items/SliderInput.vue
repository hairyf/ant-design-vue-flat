<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-25 21:55:23
 * @LastEditTime: 2021-05-11 11:41:55
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="slider-item oe-flex" v-if="!isGroup">
    <el-slider class="oe-flex-1" v-model="offsetTop" :max="max" :min="min" />
    <el-input type="nunmber" v-model.number="offsetTop" class="custom-input">
      <template #suffix>
        <span class="oe-m-r-8">{{ tips }}</span>
      </template>
    </el-input>
  </div>
  <el-form-item :label="label" v-else>
    <div class="slider-item oe-flex">
      <el-slider class="oe-flex-1" v-model="offsetTop" :max="max" :min="min" />
      <el-input type="nunmber" v-model.number="offsetTop" class="custom-input">
        <template #suffix>
          <span class="oe-m-r-8">{{ tips }}</span>
        </template>
      </el-input>
    </div>
  </el-form-item>
</template>
<script lang="ts" setup>
  import { computed, defineEmit, defineProps, inject } from '@vue/runtime-core'
  const props = defineProps({
    /** 绑定数值 */
    modelValue: Number,
    /** 提示信息 */
    tips: String,
    /** 长度 */
    max: {
      type: Number,
      default: 20
    },
    min: {
      type: Number,
      default: 0
    },
    /** padding-group 字段标识 */
    keyword: String as () =>
      | // 边距
      'margin'
      // 商品间距
      | 'shopSpacing'
      // 图片间距
      | 'image'
      // 上边距
      | 'top'
      // 下边距
      | 'bottom'
      // 左右边距
      | 'leftRight'
      // 上圆角
      | 'topRadius'
      // 底部圆角
      | 'bottomRadius'
      // 图标间距
      | 'iconSpacing'
      // 右间距
      | 'right'
      // 左间距
      | 'left',
    /** padding-group 字段名称 */
    label: String
  })
  const emit = defineEmit()
  // 注入分组依赖信息
  const groupPadding = inject<Record<string, number>>('padding')
  // 是否存在与分组中
  const isGroup = computed(() => groupPadding && props.keyword)
  // 多层model绑定数据, 修改分组数据则直接修改, 对象引入为同一个地址
  const offsetTop = computed({
    get: () => {
      if (groupPadding && props.keyword) {
        return +groupPadding[props.keyword]
      }
      return props.modelValue
    },
    set: (value) => {
      if (groupPadding && props.keyword) {
        groupPadding[props.keyword] = value as number
      } else {
        emit('update:modelValue', value)
      }
    }
  })
</script>
<style lang="scss" scoped>
  .slider-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-slider {
    margin: 0 14px;
  }
  .custom-input {
    width: 134px;
  }
</style>
