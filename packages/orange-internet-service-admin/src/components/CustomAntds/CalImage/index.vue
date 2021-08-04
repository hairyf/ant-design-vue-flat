<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-07 14:02:58
 * @LastEditTime: 2021-06-24 15:24:19
 * @Description: 图片
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-image
    class="cal-image rounded-lg overflow-hidden object-cover block"
    v-bind="props"
    :fallback="fallbackImage"
    :preview="false"
  />
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import { Image as AImage } from 'ant-design-vue'
  import fallbackImage from '@/assets/img/common/error.png'
  const props = defineProps()
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
