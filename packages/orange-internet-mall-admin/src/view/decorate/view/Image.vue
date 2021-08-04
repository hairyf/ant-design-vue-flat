<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-26 10:49:33
 * @LastEditTime: 2021-04-26 11:56:13
 * @Description: 图片
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="image-view-container"
    :style="{
      background,
      padding
    }"
  >
    <div class="single-image-list" v-if="option.styleType === 'single'">
      <el-image
        v-for="(item, index) in option.images"
        :key="index"
        style="width: 100%; height: 100%; vertical-align: middle"
        :src="item.image || '/custom-assets/images/decorate/product-transverse.png'"
        :style="{
          borderRadius,
          marginBottom: `${option.padding.image}px`
        }"
        fit="contain"
      />
    </div>
    <div class="double-image-list" v-else :style="{ margin: `${-(option.padding.image / 2)}px` }">
      <div class="double-image-item" v-for="(item, index) in option.images" :key="index">
        <div
          class="inner"
          :style="{
            borderRadius,
            margin: `${option.padding.image / 2}px`
          }"
        >
          <el-image
            style="width: 100%; height: 100%; vertical-align: middle"
            :src="item.image || '/custom-assets/images/decorate/product-transverse.png'"
            fit="contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps, watchEffect } from '@vue/runtime-core'
  import { imageOption } from '@/view/decorate/config'
  import { useBackgroundColor, usePaddingRadius } from '../hooks/use-view-style'
  const props = defineProps({
    option: {
      type: Object as () => typeof imageOption,
      required: true
    }
  })
  const { padding, borderRadius } = usePaddingRadius(props.option)
  const { background } = useBackgroundColor(props.option)
  watchEffect(() => {})
</script>
<style lang="scss" scoped>
  .image-view-container {
    overflow: hidden;
  }
  .double-image-list {
    display: flex;
    flex-wrap: wrap;
  }
  .double-image-item {
    width: 50%;
  }
  .el-image {
    vertical-align: middle;
  }
  .inner {
    overflow: hidden;
  }
</style>
