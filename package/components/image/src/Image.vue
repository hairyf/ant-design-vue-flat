<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 16:23:04
 * @LastEditTime: 2021-07-20 10:18:44
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="cal-image rounded-lg overflow-hidden"
    :style="{ width: wh.width, height: wh.height, borderRadius: circle }"
  >
    <a-image class="object-cover block" v-bind="props" width="100%" height="100%" />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  export default defineComponent({ name: 'CalImage' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { Image as AImage } from 'ant-design-vue'
  import { analyUnit } from '@tuimao/utils'
  import { analySize } from '@tuimao/utils'
  import type { AnalySizeOption } from '@tuimao/utils'

  const props = defineProps({
    ...(AImage.props as {}),
    /** 子元素大小 */
    size: {
      type: Object as () => AnalySizeOption,
      default: '100%'
    },
    /** 圆角 */
    circle: {
      type: [Boolean, Number, String]
    },
    /** 开启点击查看 */
    preview:{
      type:Boolean,
      default:false
    }
  })

  // 宽高
  const wh = computed(() => analySize(props.size))

  // 圆角
  const circle = computed(() => {
    if (typeof props.circle === 'boolean' && props.circle) {
      return '99999px'
    }
    return analyUnit(props.circle || '')
  })
</script>
<style lang="scss">
  .ant-image {
    vertical-align: middle;
    width: 100%;
    height: 100%;
  }
  .ant-image-img {
    width: 100%;
    height: 100%;
  }
  .ant-image-preview-body {
    .ant-image-preview-img-wrapper::before {
      height: 50px;
    }
    .ant-image-preview-img {
      margin: 0 auto;
    }
  }
</style>
