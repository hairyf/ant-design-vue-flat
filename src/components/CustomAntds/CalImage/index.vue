<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-06-10 17:43:44
 * @LastEditTime: 2021-06-10 17:43:56
 * @Description: 
 * @LastEditors: Pan.Yu.Lin
-->
<template>
  <a-image
    class="rounded-lg overflow-hidden object-cover h-full w-full block"
    v-bind="props"
    :fallback="fallbackImage"
    :preview="false"
  />
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue'
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
</style>
