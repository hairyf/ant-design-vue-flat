<!--
 * @Author: Zhilong
 * @Date: 2021-04-02 13:39:58
 * @LastEditTime: 2021-05-10 11:17:40
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <div class="view-image">
    <el-image
      v-if="isImage"
      v-bind="props"
      :src="src"
      :class="{ border }"
      :fit="fit"
      :style="{
        width: handleSize.width,
        height: handleSize.height,
        borderRadius,
        overflow: 'hidden'
      }"
    >
      <template #error><div /></template>
    </el-image>
    <i v-else :class="[src]" :style="{ fontSize: handleSize.width, color: labelColor }" />
    <div class="default-container">
      <slot />
    </div>
    <div class="bottom-text">
      <slot name="bottomText" />
    </div>
    <div class="top-text">
      <slot name="topText" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, defineProps } from '@vue/runtime-core'
  import { useStore } from 'vuex'
  const store = useStore()
  const props = defineProps({
    src: String,
    borderRadius: String,
    size: {
      type: [Number, String, Object as () => { width: number | string; height: number | string }]
    },
    // 如果为true 链接为空时 会显示虚线边框
    border: {
      type: Boolean,
      default: false
    },
    // 链接为空时的内容 0表示默认图片 1显示图片A...
    emptyType: {
      type: Number,
      default: 1
    },
    fit: {
      type: String,
      default: 'cover'
    },
    labelColor: String,
    isImage: {
      type: Boolean,
      default: false
    }
  })
  // 是否是图片
  const isImage = computed(
    () => props.src === '' || props.isImage || props.src?.indexOf('/') !== -1
  )
  // 空内容默认图片配置
  const src = computed(() => {
    let emptyContent: string
    switch (props.emptyType) {
      case 0:
        emptyContent = store.state.common.shopSet.load_image.value
        break
      case 1:
        emptyContent = '/custom-assets/images/decorate/product-fifth.png'
        break
      case 2:
        emptyContent = '/custom-assets/images/decorate/product-sliver.png'
        break
      default:
        emptyContent = ''
    }
    return props.src ? props.src : emptyContent
  })
  // 空内容 显示边框配置
  const border = computed(() => props.border && !src.value)
  const analyUnit = (unit: string | number) => {
    return typeof unit === 'string' && /[^0-9]/g.test(unit) ? unit : unit + 'px'
  }
  // 宽高
  const handleSize = computed((): { width: string; height: string } => {
    if (typeof props.size === 'string' || typeof props.size === 'number') {
      // 正方形的单条数据
      return { width: analyUnit(props.size), height: analyUnit(props.size) }
    } else if (typeof props.size === 'object') {
      // 对象类型的数据
      return { width: analyUnit(props.size.width), height: analyUnit(props.size.height) }
    }
    // 默认数据
    return { width: '', height: '' }
  })
</script>
<style lang="scss" scoped>
  .view-image {
    position: relative;
    /* 有圆角要显示 如需修改 => zhilong */
    overflow: hidden;
  }
  .el-image {
    vertical-align: middle;
    height: 100%;
    width: 100%;
  }
  .border {
    border: 1px dashed rgb(217, 217, 217) !important;
  }
  .bottom-text {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
  }
  .top-text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(-180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
  }
  .default-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
