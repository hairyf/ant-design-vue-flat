<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-20 15:58:53
 * @LastEditTime: 2021-06-07 16:17:56
 * @Description: 头像
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <img class="cal-avatar" :style="[bindStyle]" :src="src" />
</template>
<script lang="ts" setup>
  import { computed, defineProps } from 'vue-demi'
  import { analyUnit, sliceBaseUrl } from '@/utils'
  import defaultSrc from '@/assets/img/common/avatar.png'
  const props = defineProps({
    size: [Number, String],
    src: String,
    fit: String
  })
  const bindStyle = computed(() => ({
    width: analyUnit(props.size || ''),
    height: analyUnit(props.size || ''),
    fit: props.fit
  }))
  const src = computed(() => sliceBaseUrl(props.src || defaultSrc || ''))
</script>
