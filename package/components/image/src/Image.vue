<!--
 * @Author: Mr.wang
 * @Date: 2021-07-12 16:23:04
 * @LastEditTime: 2021-07-16 22:31:52
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-image
    class="cal-image rounded-lg overflow-hidden object-cover block"
    v-bind="props"
    :preview="false"
    :width="handelSize.width"
    :height="handelSize.height"
  />
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  export default defineComponent({ name: 'CalImage' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { Image as AImage } from 'ant-design-vue'
  import { toSize } from '../../../utils/common'
  import type { ToSize } from '../../../utils/common'

  const props = defineProps({
    /** 子元素大小 */
    size: {
      type: Object as () => ToSize,
      required: true
    }
  })

  // 宽高
  const handelSize = computed(() => toSize(props.size))
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
